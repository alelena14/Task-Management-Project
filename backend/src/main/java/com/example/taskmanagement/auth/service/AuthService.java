package com.example.taskmanagement.auth.service;

import com.example.taskmanagement.audit.entity.AuditAction;
import com.example.taskmanagement.audit.service.AuditLogService;
import com.example.taskmanagement.security.JwtService;
import com.example.taskmanagement.user.dto.AuthResponse;
import com.example.taskmanagement.user.dto.LoginRequest;
import com.example.taskmanagement.user.dto.RegisterRequest;
import com.example.taskmanagement.user.entity.Role;
import com.example.taskmanagement.user.entity.User;
import com.example.taskmanagement.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.example.taskmanagement.exception.BusinessException;
import com.example.taskmanagement.exception.UnauthorizedException;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuditLogService auditService;

    public void register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.email())) {
            throw new BusinessException("Email already exists");
        }

        Role role;

        if (userRepository.count() == 0) {
            role = Role.ADMIN;
        } else {
            role = Role.USER;
        }

        User user = User.builder()
                .firstName(request.firstName())
                .lastName(request.lastName())
                .email(request.email())
                .password(passwordEncoder.encode(request.password()))
                .role(role)
                .active(true)
                .createdAt(LocalDateTime.now())
                .build();

        userRepository.save(user);

        auditService.log(
                AuditAction.REGISTER,
                "USER",
                user.getId(),
                user.getEmail()
        );
    }

    public AuthResponse login(LoginRequest request) {

        User user = userRepository.findByEmail(request.email())
                .orElseThrow(() ->
                        new UnauthorizedException("Invalid credentials")
                );

        // Deactivated users are not allowed to authenticate
        if (!user.isActive()) {
            throw new UnauthorizedException(
                    "User account is deactivated"
            );
        }

        if (!passwordEncoder.matches(
                request.password(),
                user.getPassword()
        )) {
            throw new UnauthorizedException("Invalid credentials");
        }

        String token = jwtService.generateToken(user.getEmail());

        auditService.log(
                AuditAction.LOGIN,
                "AUTH",
                user.getId(),
                user.getEmail()
        );

        return new AuthResponse(token);
    }
}