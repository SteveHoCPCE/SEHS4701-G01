package com.sehs4701.backend.repository;

import com.sehs4701.backend.entity.Seminar;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface SeminarRepository extends JpaRepository<Seminar, Long> {

    List<Seminar> findBySeminarDateAfterOrderBySeminarDateAsc(LocalDateTime date);

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT s FROM Seminar s WHERE s.id = :id")
    Optional<Seminar> findByIdWithLock(@Param("id") Long id);
}
