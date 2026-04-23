package com.sehs4701.backend.controller;

import com.sehs4701.backend.dto.request.SeminarRegistrationRequest;
import com.sehs4701.backend.dto.response.RegistrationResponse;
import com.sehs4701.backend.service.RegistrationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class RegistrationController {

    private final RegistrationService registrationService;

    @PostMapping("/api/seminars/{seminarId}/register")
    public ResponseEntity<RegistrationResponse> register(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long seminarId,
            @Valid @RequestBody SeminarRegistrationRequest request) {
        
        // userDetails.getUsername() returns the email from JWT
        return ResponseEntity.ok(
                registrationService.register(userDetails.getUsername(), seminarId, request.getSeatsBooked()));
    }

    @PutMapping("/api/registrations/{id}/cancel")
    public ResponseEntity<RegistrationResponse> cancel(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long id) {
        return ResponseEntity.ok(
                registrationService.cancel(userDetails.getUsername(), id));
    }

    @GetMapping("/api/registrations/history")
    public ResponseEntity<List<RegistrationResponse>> getHistory(
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(
                registrationService.getHistory(userDetails.getUsername()));
    }

    @GetMapping("/api/registrations/{id}")
    public ResponseEntity<RegistrationResponse> getRegistration(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long id) {
        return ResponseEntity.ok(
                registrationService.getById(userDetails.getUsername(), id));
    }
}