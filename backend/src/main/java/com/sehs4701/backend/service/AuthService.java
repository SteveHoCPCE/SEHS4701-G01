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
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Slf4j
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
        String email = normalizeEmail(request.getEmail());
        // === UPDATED: Allow re-registration and send new OTP if previous registration was not verified ===
        // This fixes the issue where you couldn't register again after failing or skipping OTP
        Customer customer = customerRepository.findByEmail(email).orElse(null);

        if (customer != null) {
            if (customer.isEmailVerified()) {
                // Already successfully verified → block as normal
                throw new BadRequestException("Email already registered and verified. Please login.");
            } else {
                // Not verified → update the existing customer with new details and generate new OTP
                customer.setName(request.getName().trim());
                customer.setTelephone(request.getTelephone().trim());
                customer.setPasswordHash(passwordEncoder.encode(request.getPassword()));
                customer.setCustomerType(request.getCustomerType());
                customer.setEmailVerified(false);

                customer = customerRepository.save(customer);
                log.info("Updated unverified customer and regenerated OTP for {}", email);
            }
        } else {
            // Normal new registration
            customer = Customer.builder()
                    .name(request.getName().trim())
                    .telephone(request.getTelephone().trim())
                    .email(email)
                    .passwordHash(passwordEncoder.encode(request.getPassword()))
                    .customerType(request.getCustomerType())
                    .emailVerified(false)
                    .build();

            customer = customerRepository.save(customer);
        }

        // Always generate and send a NEW OTP
        String otpCode = generateOtp();
        EmailVerification verification = EmailVerification.builder()
                .customer(customer)
                .otpCode(otpCode)
                .expiresAt(LocalDateTime.now().plusMinutes(10))
                .verified(false)
                .build();

        verificationRepository.save(verification);

        try {
            emailService.sendVerificationEmailOrThrow(email, otpCode);
        } catch (Exception e) {
            log.warn("Unable to send verification email to {}. Keeping OTP record for local verification.", email, e);
            return "Registration successful, but the verification email could not be sent. Please retrieve the OTP from the database.";
        }

        return "Registration successful. Please check your email for the verification code.";
    }

    @Transactional
    public AuthResponse verifyEmail(VerifyEmailRequest request) {
        String email = normalizeEmail(request.getEmail());
        Customer customer = customerRepository.findByEmail(email)
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

        // Auto-login: issue a JWT so the frontend can sign the user in immediately
        String token = jwtUtil.generateToken(customer.getEmail());

        return AuthResponse.builder()
                .token(token)
                .email(customer.getEmail())
                .name(customer.getName())
                .verified(true)
                .build();
    }

    public AuthResponse login(LoginRequest request) {
        String email = normalizeEmail(request.getEmail());
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(email, request.getPassword())
        );

        Customer customer = customerRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found"));

        if (!customer.isEmailVerified()) {
            throw new BadRequestException("Please verify your email before logging in");
        }

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

    private String normalizeEmail(String email) {
        return email.trim().toLowerCase();
    }
}
