package com.example.taskmanagement.task.dto;

import com.example.taskmanagement.task.entity.TaskStatus;
import com.example.taskmanagement.task.entity.TaskPriority;
import jakarta.validation.constraints.Size;

import java.time.LocalDateTime;

public record UpdateTaskRequest(

        @Size(max = 100, message = "Title cannot exceed 100 characters")
        String title,

        @Size(max = 500, message = "Description cannot exceed 500 characters")
        String description,

        TaskPriority priority,
        TaskStatus status,
        LocalDateTime deadline,
        Long assignedUserId
) {
}