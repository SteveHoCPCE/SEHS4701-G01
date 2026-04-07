package com.sehs4701.backend.dto.request;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.Data;

@Data
public class SeminarRegistrationRequest {

    @Min(value = 1, message = "Must book at least 1 seat")
    @Max(value = 2, message = "Maximum 2 seats per registration")
    private int seatsBooked;
}
