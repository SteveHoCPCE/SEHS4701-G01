package com.sehs4701.backend.repository;

import com.sehs4701.backend.entity.Registration;
import com.sehs4701.backend.entity.enums.RegistrationStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface RegistrationRepository extends JpaRepository<Registration, Long> {

    @Query("SELECT COALESCE(SUM(r.seatsBooked), 0) FROM Registration r WHERE r.seminar.id = :seminarId AND r.status = :status")
    int sumBookedSeatsBySeminarIdAndStatus(@Param("seminarId") Long seminarId, @Param("status") RegistrationStatus status);

    List<Registration> findBySeminarIdAndStatusOrderByCreatedAtAsc(Long seminarId, RegistrationStatus status);

    List<Registration> findByCustomerIdAndCreatedAtAfterOrderByCreatedAtDesc(Long customerId, LocalDateTime after);

    Optional<Registration> findByIdAndCustomerId(Long id, Long customerId);
}
