package com.example.taskmanagement.user.controller;

import com.example.taskmanagement.user.dto.UpdateRoleRequest;
import com.example.taskmanagement.user.dto.UpdateUserRequest;
import com.example.taskmanagement.user.dto.UserResponse;
import com.example.taskmanagement.user.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/me")
    public UserResponse getCurrentUser(
            Authentication authentication
    ) {

        return userService.getCurrentUser(authentication);
    }

    @PutMapping("/me")
    public UserResponse updateCurrentUser(
            Authentication authentication,
            @Valid @RequestBody UpdateUserRequest request
    ) {

        return userService.updateCurrentUser(
                authentication,
                request
        );
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<UserResponse> getAllUsers() {

        return userService.getAllUsers();
    }

    @PutMapping("/{id}/role")
    @PreAuthorize("hasRole('ADMIN')")
    public UserResponse updateUserRole(
            @PathVariable Long id,
            @Valid @RequestBody UpdateRoleRequest request
    ) {

        return userService.updateUserRole(id, request);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deactivateUser(
            @PathVariable Long id
    ) {

        userService.deactivateUser(id);

        return ResponseEntity.noContent().build();
    }
}