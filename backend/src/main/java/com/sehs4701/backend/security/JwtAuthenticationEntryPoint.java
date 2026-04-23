package com.sehs4701.backend.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sehs4701.backend.dto.response.ApiErrorResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;

@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response,
                         AuthenticationException authException) throws IOException {
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);

        ApiErrorResponse errorResponse = ApiErrorResponse.builder()
                .status(401)
                .message("Unauthorized - Please login to access this resource")
                .errors(List.of(authException.getMessage()))
                .timestamp(LocalDateTime.now())
                .build();

        new ObjectMapper().findAndRegisterModules().writeValue(response.getOutputStream(), errorResponse);
    }
}
