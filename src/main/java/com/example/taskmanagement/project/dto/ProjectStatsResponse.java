package com.example.taskmanagement.project.dto;

public record ProjectStatsResponse(

        Long projectId,

        String projectName,

        long totalTasks,

        long todo,

        long inProgress,

        long done
) {
}