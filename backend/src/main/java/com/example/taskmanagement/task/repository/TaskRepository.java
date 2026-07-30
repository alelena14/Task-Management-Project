package com.example.taskmanagement.task.repository;

import com.example.taskmanagement.task.entity.Task;
import com.example.taskmanagement.task.entity.TaskPriority;
import com.example.taskmanagement.task.entity.TaskStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TaskRepository extends JpaRepository<Task, Long> {

    Page<Task> findByDeletedFalse(
            Pageable pageable
    );

    Page<Task> findByProjectMembersIdAndDeletedFalse(
            Long userId,
            Pageable pageable
    );

    Optional<Task> findByIdAndDeletedFalse(Long id);

    Page<Task> findByDeletedFalseAndStatus(
            TaskStatus status,
            Pageable pageable
    );

    Page<Task> findByDeletedFalseAndPriority(
            TaskPriority priority,
            Pageable pageable
    );

    Page<Task> findByDeletedFalseAndStatusAndPriority(
            TaskStatus status,
            TaskPriority priority,
            Pageable pageable
    );

    List<Task> findByProjectMembersIdAndDeletedFalse(Long userId);

    List<Task> findByProjectIdAndDeletedFalse(Long projectId);

    Page<Task> findByAssignedUserIdAndDeletedFalse(
            Long userId,
            Pageable pageable
    );

    List<Task> findByAssignedUserIdAndDeletedFalse(
            Long userId
    );

    long countByProjectIdAndDeletedFalse(
            Long projectId
    );

    long countByProjectIdAndStatusAndDeletedFalse(
            Long projectId,
            TaskStatus status
    );

}