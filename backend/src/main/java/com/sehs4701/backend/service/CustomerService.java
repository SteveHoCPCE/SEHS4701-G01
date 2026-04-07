package com.sehs4701.backend.service;

import com.sehs4701.backend.dto.response.CustomerProfileResponse;
import com.sehs4701.backend.entity.Customer;
import com.sehs4701.backend.exception.ResourceNotFoundException;
import com.sehs4701.backend.repository.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomerService {

    private final CustomerRepository customerRepository;

    public CustomerProfileResponse getProfile(String email) {
        Customer customer = customerRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found"));

        return CustomerProfileResponse.builder()
                .id(customer.getId())
                .name(customer.getName())
                .telephone(customer.getTelephone())
                .email(customer.getEmail())
                .customerType(customer.getCustomerType())
                .emailVerified(customer.isEmailVerified())
                .createdAt(customer.getCreatedAt())
                .build();
    }
}
