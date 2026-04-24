package com.sehs4701.backend.service;

import com.sehs4701.backend.dto.request.LoginRequest;
import com.sehs4701.backend.dto.request.RegisterRequest;
import com.sehs4701.backend.entity.Customer;
import com.sehs4701.backend.entity.EmailVerification;
import com.sehs4701.backend.entity.enums.CustomerType;
import com.sehs4701.backend.exception.BadRequestException;
import com.sehs4701.backend.repository.CustomerRepository;
import com.sehs4701.backend.repository.EmailVerificationRepository;
import com.sehs4701.backend.security.JwtUtil;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.ArgumentMatchers.matches;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private CustomerRepository customerRepository;

    @Mock
    private EmailVerificationRepository verificationRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtUtil jwtUtil;

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private EmailService emailService;

    @InjectMocks
    private AuthService authService;

    @Test
    void registerSendsOtpToNormalizedRequestEmail() {
        RegisterRequest request = new RegisterRequest();
        request.setName(" New User ");
        request.setTelephone(" 91234567 ");
        request.setEmail(" New.User@Example.COM ");
        request.setPassword("secret1");
        request.setCustomerType(CustomerType.PERSONAL);

        when(customerRepository.findByEmail("new.user@example.com")).thenReturn(Optional.empty());
        when(passwordEncoder.encode("secret1")).thenReturn("hashed-password");
        when(customerRepository.save(any(Customer.class))).thenAnswer(invocation -> invocation.getArgument(0));
        when(verificationRepository.save(any(EmailVerification.class))).thenAnswer(invocation -> invocation.getArgument(0));

        authService.register(request);

        ArgumentCaptor<Customer> customerCaptor = ArgumentCaptor.forClass(Customer.class);
        verify(customerRepository).save(customerCaptor.capture());
        Customer savedCustomer = customerCaptor.getValue();

        assertEquals("new.user@example.com", savedCustomer.getEmail());
        assertEquals("New User", savedCustomer.getName());
        assertEquals("91234567", savedCustomer.getTelephone());
        assertFalse(savedCustomer.isEmailVerified());
        verify(emailService).sendVerificationEmailOrThrow(eq("new.user@example.com"), matches("\\d{6}"));
    }

    @Test
    void loginRejectsUnverifiedCustomer() {
        LoginRequest request = new LoginRequest();
        request.setEmail("User@Example.COM");
        request.setPassword("password1");
        Customer customer = Customer.builder()
                .email("user@example.com")
                .emailVerified(false)
                .build();

        when(customerRepository.findByEmail("user@example.com")).thenReturn(Optional.of(customer));

        BadRequestException exception = assertThrows(BadRequestException.class, () -> authService.login(request));

        assertEquals("Please verify your email before logging in", exception.getMessage());
    }
}
