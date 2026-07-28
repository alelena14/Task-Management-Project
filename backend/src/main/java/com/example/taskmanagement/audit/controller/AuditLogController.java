package com.example.taskmanagement.audit.controller;

import com.example.taskmanagement.audit.entity.AuditLog;
import com.example.taskmanagement.audit.repository.AuditLogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Sort;

import java.util.List;

@RestController
@RequestMapping("/audit")
@RequiredArgsConstructor
public class AuditLogController {

    private final AuditLogRepository auditLogRepository;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<AuditLog> getLogs() {

        return auditLogRepository
                .findAll(
                        Sort.by(
                                Sort.Direction.DESC,
                                "timestamp"
                        )
                );
    }
}