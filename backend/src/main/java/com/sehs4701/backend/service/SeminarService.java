package com.sehs4701.backend.service;

import com.sehs4701.backend.dto.response.SeminarResponse;
import com.sehs4701.backend.entity.Seminar;
import com.sehs4701.backend.entity.enums.RegistrationStatus;
import com.sehs4701.backend.repository.RegistrationRepository;
import com.sehs4701.backend.repository.SeminarRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SeminarService {

    private final SeminarRepository seminarRepository;
    private final RegistrationRepository registrationRepository;

    public List<SeminarResponse> getUpcomingSeminars() {
        List<Seminar> seminars = seminarRepository.findBySeminarDateAfterOrderBySeminarDateAsc(LocalDateTime.now());
        return seminars.stream().map(this::toResponse).toList();
    }

    private SeminarResponse toResponse(Seminar s) {
        int bookedSeats = registrationRepository.sumBookedSeatsBySeminarIdAndStatus(s.getId(), RegistrationStatus.SUCCESS);
        return SeminarResponse.builder()
                .id(s.getId())
                .vehicleId(s.getVehicle().getId())
                .vehicleModelNumber(s.getVehicle().getModelNumber())
                .vehicleDescription(s.getVehicle().getDescription())
                .seminarDate(s.getSeminarDate())
                .maxSeats(s.getMaxSeats())
                .bookedSeats(bookedSeats)
                .availableSeats(Math.max(0, s.getMaxSeats() - bookedSeats))
                .build();
    }
}
