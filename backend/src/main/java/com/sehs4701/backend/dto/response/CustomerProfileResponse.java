package com.sehs4701.backend.dto.response;

import com.sehs4701.backend.entity.enums.CustomerType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
public class CustomerProfileResponse {
    private Long id;
    private String name;
    private String telephone;
    private String email;
    private CustomerType customerType;
    private boolean emailVerified;
    private LocalDateTime createdAt;
}
