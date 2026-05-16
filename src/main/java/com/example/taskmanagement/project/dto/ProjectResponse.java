package com.example.taskmanagement.project.dto;

import com.example.taskmanagement.project.entity.ProjectStatus;

import java.time.LocalDateTime;
import java.util.Set;

public record ProjectResponse(
        Long id,
        String name,
        String description,
        ProjectStatus status,
        String ownerEmail,
        Set<String> members,
        LocalDateTime createdAt
) {}