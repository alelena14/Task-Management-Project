package com.example.taskmanagement.user.dto;

import com.example.taskmanagement.user.entity.Role;

public record UserResponse(

        Long id,
        String firstName,
        String lastName,
        String email,
        Role role,
        Boolean isActive
) {
}