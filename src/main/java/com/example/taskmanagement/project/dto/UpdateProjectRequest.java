package com.example.taskmanagement.project.dto;

import com.example.taskmanagement.project.entity.ProjectStatus;

public record UpdateProjectRequest(
        String name,
        String description,
        ProjectStatus status
) {}
