package com.example.taskmanagement.user.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record RegisterRequest(

        @NotBlank(message = "First name is required")
        String firstName,

        @NotBlank(message = "Last name is required")
        String lastName,

        @Email(message = "Invalid email")
        @NotBlank(message = "Email is required")
        String email,

        @Size(min = 6, message = "Password must be at least 6 characters")
        @NotBlank(message = "Password is required")
        String password
) {
}