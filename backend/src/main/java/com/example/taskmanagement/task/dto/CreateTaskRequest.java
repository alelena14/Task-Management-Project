package com.example.taskmanagement.task.dto;

import com.example.taskmanagement.task.entity.TaskPriority;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDateTime;

public record CreateTaskRequest(

        @NotBlank(message = "Title is required")
        @Size(max = 100, message ="Title cannot exceed 100 characters")
        String title,

        @Size(max = 500, message ="Description cannot exceed 500 characters")
        String description,

        @NotNull(message = "Priority is required")
        TaskPriority priority,

        @NotNull(message = "Deadline is required")
        LocalDateTime deadline,

        @NotNull(message = "Assigned user is required")
        Long assignedUserId,

        @NotNull(message = "Project id is required")
        Long projectId
) {
}