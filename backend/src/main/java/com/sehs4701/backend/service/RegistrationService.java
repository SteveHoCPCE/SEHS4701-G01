package com.sehs4701.backend.service;

import com.sehs4701.backend.dto.response.RegistrationResponse;
import com.sehs4701.backend.entity.Customer;
import com.sehs4701.backend.entity.Registration;
import com.sehs4701.backend.entity.Seminar;
import com.sehs4701.backend.entity.enums.RegistrationStatus;
import com.sehs4701.backend.exception.BadRequestException;
import com.sehs4701.backend.exception.ResourceNotFoundException;
import com.sehs4701.backend.repository.CustomerRepository;
import com.sehs4701.backend.repository.RegistrationRepository;
import com.sehs4701.backend.repository.SeminarRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RegistrationService {

    private final RegistrationRepository registrationRepository;
    private final SeminarRepository seminarRepository;
    private final CustomerRepository customerRepository;
    private final EmailService emailService;

    @Transactional
    public RegistrationResponse register(String email, Long seminarId, int seatsBooked) {
        Customer customer = customerRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found"));

        if (!customer.isEmailVerified()) {
            throw new BadRequestException("Email must be verified before registering for a seminar");
        }

        // Pessimistic lock on seminar row to prevent race conditions
        Seminar seminar = seminarRepository.findByIdWithLock(seminarId)
                .orElseThrow(() -> new ResourceNotFoundException("Seminar not found with id: " + seminarId));

        if (seminar.getSeminarDate().isBefore(LocalDateTime.now())) {
            throw new BadRequestException("Cannot register for a past seminar");
        }

        // Calculate current booked seats (only SUCCESS registrations count)
        int currentBookedSeats = registrationRepository.sumBookedSeatsBySeminarIdAndStatus(
                seminarId, RegistrationStatus.SUCCESS);

        RegistrationStatus status;
        if (currentBookedSeats + seatsBooked <= seminar.getMaxSeats()) {
            status = RegistrationStatus.SUCCESS;
        } else {
            status = RegistrationStatus.WAIT;
        }

        Registration registration = Registration.builder()
                .customer(customer)
                .seminar(seminar)
                .seatsBooked(seatsBooked)
                .status(status)
                .build();

        registration = registrationRepository.save(registration);

        // Send email notification (non-blocking)
        String vehicleModel = seminar.getVehicle().getModelNumber();
        String seminarDate = seminar.getSeminarDate().toString();

        if (status == RegistrationStatus.SUCCESS) {
            emailService.sendSeminarRegistrationSuccess(
                    customer.getEmail(), customer.getName(), vehicleModel, seminarDate, seatsBooked);
        } else {
            emailService.sendSeminarRegistrationWait(
                    customer.getEmail(), customer.getName(), vehicleModel, seminarDate, seatsBooked);
        }

        return toResponse(registration);
    }

    @Transactional
    public RegistrationResponse cancel(String email, Long registrationId) {
        Customer customer = customerRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found"));

        Registration registration = registrationRepository.findByIdAndCustomerId(registrationId, customer.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Registration not found"));

        if (registration.getStatus() == RegistrationStatus.CANCEL) {
            throw new BadRequestException("Registration is already cancelled");
        }

        RegistrationStatus previousStatus = registration.getStatus();
        registration.setStatus(RegistrationStatus.CANCEL);
        registrationRepository.save(registration);

        Seminar seminar = registration.getSeminar();
        String vehicleModel = seminar.getVehicle().getModelNumber();
        String seminarDate = seminar.getSeminarDate().toString();

        // Send cancellation email
        emailService.sendCancellationNotice(
                customer.getEmail(), customer.getName(), vehicleModel, seminarDate);

        // Only promote waitlisted customers if a SUCCESS registration was cancelled
        if (previousStatus == RegistrationStatus.SUCCESS) {
            promoteWaitlisted(seminar);
        }

        return toResponse(registration);
    }

    private void promoteWaitlisted(Seminar seminar) {
        // Recompute available seats
        int currentBookedSeats = registrationRepository.sumBookedSeatsBySeminarIdAndStatus(
                seminar.getId(), RegistrationStatus.SUCCESS);
        int availableSeats = seminar.getMaxSeats() - currentBookedSeats;

        if (availableSeats <= 0) {
            return;
        }

        // Find all WAIT registrations ordered by creation time (earliest first)
        List<Registration> waitList = registrationRepository
                .findBySeminarIdAndStatusOrderByCreatedAtAsc(seminar.getId(), RegistrationStatus.WAIT);

        String vehicleModel = seminar.getVehicle().getModelNumber();
        String seminarDate = seminar.getSeminarDate().toString();

        for (Registration waitReg : waitList) {
            if (waitReg.getSeatsBooked() <= availableSeats) {
                waitReg.setStatus(RegistrationStatus.SUCCESS);
                registrationRepository.save(waitReg);
                availableSeats -= waitReg.getSeatsBooked();

                // Send promotion email
                Customer waitCustomer = waitReg.getCustomer();
                emailService.sendWaitlistPromotion(
                        waitCustomer.getEmail(), waitCustomer.getName(),
                        vehicleModel, seminarDate, waitReg.getSeatsBooked());

                if (availableSeats <= 0) {
                    break;
                }
            }
        }
    }

    public List<RegistrationResponse> getHistory(String email) {
        Customer customer = customerRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found"));

        LocalDateTime oneYearAgo = LocalDateTime.now().minusYears(1);
        return registrationRepository
                .findByCustomerIdAndCreatedAtAfterOrderByCreatedAtDesc(customer.getId(), oneYearAgo)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public RegistrationResponse getById(String email, Long registrationId) {
        Customer customer = customerRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found"));

        Registration registration = registrationRepository.findByIdAndCustomerId(registrationId, customer.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Registration not found"));

        return toResponse(registration);
    }

    private RegistrationResponse toResponse(Registration r) {
        return RegistrationResponse.builder()
                .id(r.getId())
                .seminarId(r.getSeminar().getId())
                .vehicleModelNumber(r.getSeminar().getVehicle().getModelNumber())
                .seminarDate(r.getSeminar().getSeminarDate())
                .seatsBooked(r.getSeatsBooked())
                .status(r.getStatus())
                .createdAt(r.getCreatedAt())
                .updatedAt(r.getUpdatedAt())
                .build();
    }
}