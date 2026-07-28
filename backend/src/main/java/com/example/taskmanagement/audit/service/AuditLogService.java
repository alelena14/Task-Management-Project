package com.example.taskmanagement.audit.service;

import com.example.taskmanagement.audit.entity.AuditAction;
import com.example.taskmanagement.audit.entity.AuditLog;
import com.example.taskmanagement.audit.repository.AuditLogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AuditLogService {

    private final AuditLogRepository auditLogRepository;

    public void log(
            AuditAction action,
            String entityType,
            Long entityId,
            String userEmail
    ) {

        AuditLog auditLog = AuditLog.builder()
                .action(action)
                .entityType(entityType)
                .entityId(entityId)
                .userEmail(userEmail)
                .timestamp(LocalDateTime.now())
                .build();

        auditLogRepository.save(auditLog);
    }
}