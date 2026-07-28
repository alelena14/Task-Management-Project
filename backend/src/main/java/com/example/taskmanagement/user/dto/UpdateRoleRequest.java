package com.example.taskmanagement.user.dto;

import com.example.taskmanagement.user.entity.Role;
import jakarta.validation.constraints.NotNull;

public record UpdateRoleRequest(
        @NotNull(message = "Role is required")
        Role role
) {
}