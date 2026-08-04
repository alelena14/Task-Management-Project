package com.example.taskmanagement.task.repository;

import com.example.taskmanagement.task.entity.Task;
import com.example.taskmanagement.task.entity.TaskPriority;
import com.example.taskmanagement.task.entity.TaskStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

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

    @Query("""
    SELECT t
    FROM Task t
    WHERE t.deleted = false
      AND (:status IS NULL OR t.status = :status)
      AND (:priority IS NULL OR t.priority = :priority)
    """)
    Page<Task> findAllWithFilters(
            @Param("status") TaskStatus status,
            @Param("priority") TaskPriority priority,
            Pageable pageable
    );

    @Query("""
    SELECT t
    FROM Task t
    WHERE t.deleted = false
      AND t.assignedUser.id = :userId
      AND (:status IS NULL OR t.status = :status)
      AND (:priority IS NULL OR t.priority = :priority)
    """)
    Page<Task> findMyTasksWithFilters(
            @Param("userId") Long userId,
            @Param("status") TaskStatus status,
            @Param("priority") TaskPriority priority,
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