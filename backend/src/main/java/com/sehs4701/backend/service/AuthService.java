package com.sehs4701.backend.service;

import com.sehs4701.backend.dto.request.LoginRequest;
import com.sehs4701.backend.dto.request.RegisterRequest;
import com.sehs4701.backend.dto.request.VerifyEmailRequest;
import com.sehs4701.backend.dto.response.AuthResponse;
import com.sehs4701.backend.entity.Customer;
import com.sehs4701.backend.entity.EmailVerification;
import com.sehs4701.backend.exception.BadRequestException;
import com.sehs4701.backend.exception.ResourceNotFoundException;
import com.sehs4701.backend.repository.CustomerRepository;
import com.sehs4701.backend.repository.EmailVerificationRepository;
import com.sehs4701.backend.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final CustomerRepository customerRepository;
    private final EmailVerificationRepository verificationRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;
    private final EmailService emailService;

    private static final SecureRandom RANDOM = new SecureRandom();

    @Transactional
    public String register(RegisterRequest request) {
        // === UPDATED: Allow re-registration and send new OTP if previous registration was not verified ===
        // This fixes the issue where you couldn't register again after failing or skipping OTP
        Customer existingCustomer = customerRepository.findByEmail(request.getEmail()).orElse(null);

        if (existingCustomer != null) {
            if (existingCustomer.isEmailVerified()) {
                // Already successfully verified → block as normal
                throw new BadRequestException("Email already registered and verified. Please login.");
            } else {
                // Not verified → update the existing customer with new details and generate new OTP
                existingCustomer.setName(request.getName());
                existingCustomer.setTelephone(request.getTelephone());
                existingCustomer.setPasswordHash(passwordEncoder.encode(request.getPassword()));
                existingCustomer.setCustomerType(request.getCustomerType());
                existingCustomer.setEmailVerified(false);

                customerRepository.save(existingCustomer);
                System.out.println("Updated existing unverified customer. New OTP will be sent to: " + request.getEmail());
            }
        } else {
            // Normal new registration
            Customer customer = Customer.builder()
                    .name(request.getName())
                    .telephone(request.getTelephone())
                    .email(request.getEmail())
                    .passwordHash(passwordEncoder.encode(request.getPassword()))
                    .customerType(request.getCustomerType())
                    .emailVerified(false)
                    .build();

            customerRepository.save(customer);
        }

        // Always generate and send a NEW OTP
        String otpCode = generateOtp();
        EmailVerification verification = EmailVerification.builder()
                .customer(existingCustomer != null ? existingCustomer : customerRepository.findByEmail(request.getEmail()).orElseThrow())
                .otpCode(otpCode)
                .expiresAt(LocalDateTime.now().plusMinutes(5))
                .verified(false)
                .build();

        verificationRepository.save(verification);

        emailService.sendVerificationEmail(request.getEmail(), otpCode);

        return "Registration successful. Please check your email for the verification code.";
    }

    @Transactional
    public String verifyEmail(VerifyEmailRequest request) {
        Customer customer = customerRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found"));

        if (customer.isEmailVerified()) {
            throw new BadRequestException("Email already verified");
        }

        EmailVerification verification = verificationRepository
                .findTopByCustomerIdOrderByCreatedAtDesc(customer.getId())
                .orElseThrow(() -> new BadRequestException("No verification code found. Please register again."));

        if (verification.getExpiresAt().isBefore(LocalDateTime.now())) {
            throw new BadRequestException("Verification code has expired. Please register again.");
        }

        if (!verification.getOtpCode().equals(request.getOtpCode())) {
            throw new BadRequestException("Invalid verification code");
        }

        verification.setVerified(true);
        verificationRepository.save(verification);

        customer.setEmailVerified(true);
        customerRepository.save(customer);

        emailService.sendRegistrationSuccess(customer.getEmail(), customer.getName());

        return "Email verified successfully. You can now login.";
    }

    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        Customer customer = customerRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found"));

        String token = jwtUtil.generateToken(customer.getEmail());

        return AuthResponse.builder()
                .token(token)
                .email(customer.getEmail())
                .name(customer.getName())
                .verified(customer.isEmailVerified())  
                .build();
    }

    private String generateOtp() {
        int otp = 100000 + RANDOM.nextInt(900000);
        return String.valueOf(otp);
    }
}