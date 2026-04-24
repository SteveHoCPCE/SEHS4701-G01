package com.sehs4701.backend.service;

import com.sehs4701.backend.entity.Customer;
import com.sehs4701.backend.entity.Seminar;
import com.sehs4701.backend.entity.Vehicle;
import com.sehs4701.backend.entity.enums.CustomerType;
import com.sehs4701.backend.entity.enums.RegistrationStatus;
import com.sehs4701.backend.exception.BadRequestException;
import com.sehs4701.backend.repository.CustomerRepository;
import com.sehs4701.backend.repository.RegistrationRepository;
import com.sehs4701.backend.repository.SeminarRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class RegistrationServiceTest {

    @Mock
    private RegistrationRepository registrationRepository;

    @Mock
    private SeminarRepository seminarRepository;

    @Mock
    private CustomerRepository customerRepository;

    @Mock
    private EmailService emailService;

    @InjectMocks
    private RegistrationService registrationService;

    @Test
    void registerRejectsDuplicateActiveRegistrationForSameSeminar() {
        Customer customer = Customer.builder()
                .id(1L)
                .email("user@example.com")
                .name("User")
                .telephone("91234567")
                .customerType(CustomerType.PERSONAL)
                .emailVerified(true)
                .build();
        Seminar seminar = Seminar.builder()
                .id(10L)
                .vehicle(Vehicle.builder().modelNumber("EV-1").build())
                .seminarDate(LocalDateTime.now().plusDays(1))
                .maxSeats(20)
                .build();

        when(customerRepository.findByEmail("user@example.com")).thenReturn(Optional.of(customer));
        when(seminarRepository.findByIdWithLock(10L)).thenReturn(Optional.of(seminar));
        when(registrationRepository.existsByCustomerIdAndSeminarIdAndStatusIn(
                eq(1L), eq(10L), eq(List.of(RegistrationStatus.SUCCESS, RegistrationStatus.WAIT))))
                .thenReturn(true);

        BadRequestException exception = assertThrows(
                BadRequestException.class,
                () -> registrationService.register("user@example.com", 10L, 1));

        assertEquals("You already have an active registration for this seminar", exception.getMessage());
        verify(registrationRepository, never()).sumBookedSeatsBySeminarIdAndStatus(any(), any());
        verify(registrationRepository, never()).save(any());
    }
}
