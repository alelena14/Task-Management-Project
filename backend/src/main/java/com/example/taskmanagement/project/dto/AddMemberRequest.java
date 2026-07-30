package com.example.taskmanagement.project.dto;

import jakarta.validation.constraints.NotNull;

public record AddMemberRequest(

        @NotNull(message = "User email is required")
        String userEmail
) {}
