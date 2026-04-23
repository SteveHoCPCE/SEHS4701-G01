package com.sehs4701.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
@AllArgsConstructor
public class VehicleResponse {
    private Long id;
    private String modelNumber;
    private String description;
    private String pictureUrl;
    private String features;
    private BigDecimal unitPrice;
}
