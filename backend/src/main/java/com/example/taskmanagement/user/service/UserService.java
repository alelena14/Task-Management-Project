package com.example.taskmanagement.user.service;

import com.example.taskmanagement.exception.BusinessException;
import com.example.taskmanagement.exception.ResourceNotFoundException;
import com.example.taskmanagement.user.dto.UpdateRoleRequest;
import com.example.taskmanagement.user.dto.UpdateUserRequest;
import com.example.taskmanagement.user.dto.UserResponse;
import com.example.taskmanagement.user.entity.Role;
import com.example.taskmanagement.user.entity.User;
import com.example.taskmanagement.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public UserResponse getCurrentUser(
            Authentication authentication
    ) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found"
                        )
                );

        return new UserResponse(
                user.getId(),
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getRole(),
                user.isActive()
        );
    }

    public UserResponse updateCurrentUser(
            Authentication authentication,
            UpdateUserRequest request
    ) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found"
                        )
                );

        user.setFirstName(request.firstName());
        user.setLastName(request.lastName());

        userRepository.save(user);

        return new UserResponse(
                user.getId(),
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getRole(),
                user.isActive()
        );
    }

    public List<UserResponse> getAllUsers() {

        return userRepository.findAll()
                .stream()
                .map(user -> new UserResponse(
                        user.getId(),
                        user.getFirstName(),
                        user.getLastName(),
                        user.getEmail(),
                        user.getRole(),
                        user.isActive()
                ))
                .toList();
    }

    public UserResponse updateUserRole(
            Long userId,
            UpdateRoleRequest request
    ) {

        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found"
                        )
                );

        if (
                user.getRole() == Role.ADMIN
                        && request.role() == Role.USER
        ) {

            long adminCount =
                    userRepository.countByRole(Role.ADMIN);

            // Prevent removing the last admin from the system
            if (adminCount == 1) {
                throw new BusinessException(
                        "Cannot remove the last admin"
                );
            }
        }

        user.setRole(request.role());

        userRepository.save(user);

        return new UserResponse(
                user.getId(),
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getRole(),
                user.isActive()
        );
    }

    public void deactivateUser(Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found"
                        )
                );

        if (user.getRole() == Role.ADMIN) {

            long adminCount =
                    userRepository.countByRole(Role.ADMIN);

            // Prevent removing the last admin from the system
            if (adminCount == 1) {
                throw new BusinessException(
                        "Cannot deactivate the last admin"
                );
            }
        }

        // Soft delete instead of physical deletion
        user.setActive(false);

        userRepository.save(user);
    }
}