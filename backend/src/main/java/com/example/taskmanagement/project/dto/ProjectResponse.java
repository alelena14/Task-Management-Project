package com.example.taskmanagement.project.dto;

import com.example.taskmanagement.project.entity.ProjectStatus;

import java.time.LocalDateTime;
import java.util.Set;

public record ProjectResponse(
        Long id,
        String name,
        String description,
        ProjectStatus status,
        Long ownerId,
        String ownerName,
        Set<ProjectMemberResponse> members,
        int progress,
        LocalDateTime createdAt
) {}