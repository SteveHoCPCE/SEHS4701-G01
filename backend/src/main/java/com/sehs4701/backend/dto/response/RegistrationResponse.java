package com.sehs4701.backend.dto.response;

import com.sehs4701.backend.entity.enums.RegistrationStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
public class RegistrationResponse {
    private Long id;
    private Long seminarId;
    private String vehicleModelNumber;
    private LocalDateTime seminarDate;
    private int seatsBooked;
    private RegistrationStatus status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
