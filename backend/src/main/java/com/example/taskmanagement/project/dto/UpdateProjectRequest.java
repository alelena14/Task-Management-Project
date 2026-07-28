package com.example.taskmanagement.project.dto;

import com.example.taskmanagement.project.entity.ProjectStatus;
import jakarta.validation.constraints.Size;

public record UpdateProjectRequest(

        @Size(max = 100, message ="Project name cannot exceed 100 characters")
        String name,

        @Size(max = 500, message = "Description cannot exceed 500 characters")
        String description,

        ProjectStatus status
) {}
