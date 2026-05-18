package com.example.taskmanagement.task.dto;

import com.example.taskmanagement.task.entity.TaskStatus;
import com.example.taskmanagement.task.entity.TaskPriority;

import java.time.LocalDateTime;

public record UpdateTaskRequest(
        String title,
        String description,
        TaskPriority priority,
        TaskStatus status,
        LocalDateTime deadline,
        Long assignedUserId
) {
}