package com.example.taskmanagement.task.dto;

import com.example.taskmanagement.task.entity.TaskPriority;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public record CreateTaskRequest(

        @NotBlank(message = "Title is required")
        String title,

        String description,

        @NotNull(message = "Priority is required")
        TaskPriority priority,

        LocalDateTime deadline,

        Long assignedUserId,

        @NotNull(message = "Project id is required")
        Long projectId
) {
}