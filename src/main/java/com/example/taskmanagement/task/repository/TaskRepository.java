package com.example.taskmanagement.task.repository;

import com.example.taskmanagement.task.entity.Task;
import com.example.taskmanagement.task.entity.TaskPriority;
import com.example.taskmanagement.task.entity.TaskStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findByDeletedFalse();

    List<Task> findByStatusAndDeletedFalse(TaskStatus status);

    List<Task> findByPriorityAndDeletedFalse(TaskPriority priority);

    List<Task> findByAssignedUserIdAndDeletedFalse(Long userId);
}