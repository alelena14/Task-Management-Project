package com.example.taskmanagement.user.repository;

import com.example.taskmanagement.user.entity.User;
import com.example.taskmanagement.user.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);

    long countByRole(Role role);

    Optional<User> findByIdAndActiveTrue(Long id);

    Optional<User> findByEmailAndActiveTrue(String email);
}