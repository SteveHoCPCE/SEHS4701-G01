package com.sehs4701.backend.service;

import com.sehs4701.backend.dto.response.VehicleResponse;
import com.sehs4701.backend.entity.Vehicle;
import com.sehs4701.backend.exception.ResourceNotFoundException;
import com.sehs4701.backend.repository.VehicleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class VehicleService {

    private final VehicleRepository vehicleRepository;

    public List<VehicleResponse> getAllVehicles() {
        return vehicleRepository.findAll().stream()
                .map(this::toResponse)
                .toList();
    }

    public VehicleResponse getVehicleById(Long id) {
        Vehicle vehicle = vehicleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Vehicle not found with id: " + id));
        return toResponse(vehicle);
    }

    private VehicleResponse toResponse(Vehicle v) {
        return VehicleResponse.builder()
                .id(v.getId())
                .modelNumber(v.getModelNumber())
                .description(v.getDescription())
                .pictureUrl(v.getPictureUrl())
                .features(v.getFeatures())
                .unitPrice(v.getUnitPrice())
                .build();
    }
}
