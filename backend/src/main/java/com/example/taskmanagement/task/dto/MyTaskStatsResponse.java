package com.example.taskmanagement.task.dto;

import lombok.Builder;

@Builder
public record MyTaskStatsResponse(

        long totalTasks,

        long todo,

        long inProgress,

        long done,

        long overdue,

        long dueToday,

        long dueThisWeek

) {
}