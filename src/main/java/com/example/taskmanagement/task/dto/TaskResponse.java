package com.example.taskmanagement.task.dto;

import com.example.taskmanagement.task.entity.TaskPriority;
import com.example.taskmanagement.task.entity.TaskStatus;

import java.time.LocalDateTime;

public record TaskResponse(
        Long id,
        String title,
        String description,
        TaskPriority priority,
        TaskStatus status,
        LocalDateTime deadline,
        String assignedUser,
        String creator,
        Long projectId,
        LocalDateTime createdAt
) {
}