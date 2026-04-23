package com.sehs4701.backend.controller;

import com.sehs4701.backend.dto.response.SeminarResponse;
import com.sehs4701.backend.service.SeminarService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/seminars")
@RequiredArgsConstructor
public class SeminarController {

    private final SeminarService seminarService;

    @GetMapping("/upcoming")
    public ResponseEntity<List<SeminarResponse>> getUpcomingSeminars() {
        return ResponseEntity.ok(seminarService.getUpcomingSeminars());
    }
}
