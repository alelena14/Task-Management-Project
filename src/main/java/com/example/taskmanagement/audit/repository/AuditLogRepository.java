package com.example.taskmanagement.audit.repository;

import com.example.taskmanagement.audit.entity.AuditLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuditLogRepository
        extends JpaRepository<AuditLog, Long> {
}