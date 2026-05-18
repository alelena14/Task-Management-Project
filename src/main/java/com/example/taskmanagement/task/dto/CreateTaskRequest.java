package com.example.taskmanagement.task.dto;

import com.example.taskmanagement.task.entity.TaskPriority;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public record CreateTaskRequest(

        @NotBlank
        String title,

        String description,

        @NotNull
        TaskPriority priority,

        LocalDateTime deadline,

        Long assignedUserId,

        @NotNull
        Long projectId
) {
}