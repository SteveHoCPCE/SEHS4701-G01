package com.sehs4701.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
public class SeminarResponse {
    private Long id;
    private Long vehicleId;
    private String vehicleModelNumber;
    private String vehicleDescription;
    private LocalDateTime seminarDate;
    private int maxSeats;
    private int bookedSeats;
    private int availableSeats;
}
