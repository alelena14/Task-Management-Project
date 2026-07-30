package com.example.taskmanagement.task.service;

import com.example.taskmanagement.task.dto.*;
import com.example.taskmanagement.task.entity.TaskPriority;
import com.example.taskmanagement.task.entity.TaskStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface TaskService {

    TaskResponse create(
            CreateTaskRequest request
    );

    List<TaskResponse> getProjectTasks(
            Long projectId
    );

    Page<TaskResponse> getAll(

            TaskStatus status,

            TaskPriority priority,

            Pageable pageable
    );

    MyTaskStatsResponse getMyTaskStats();

    TaskResponse update(
            Long id,
            UpdateTaskRequest request
    );

    void delete(
            Long id
    );

    Page<TaskResponse> getMyTasks(
            Pageable pageable
    );
}