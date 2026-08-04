    package com.example.taskmanagement.task.entity;


    import com.example.taskmanagement.project.entity.Project;
    import com.example.taskmanagement.user.entity.User;
    import jakarta.persistence.*;
    import lombok.*;

    import java.time.LocalDateTime;

    @Entity
    @Table(name = "tasks")
    @Getter
    @Setter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public class Task {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @Column(nullable = false)
        private String title;

        @Column(columnDefinition = "TEXT")
        private String description;

        @Enumerated(EnumType.STRING)
        @Column(nullable = false)
        private TaskPriority priority;

        @Enumerated(EnumType.STRING)
        @Column(nullable = false)
        private TaskStatus status;

        @Column(nullable = false)
        private LocalDateTime deadline;

        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "assigned_user_id", nullable = false)
        private User assignedUser;

        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "creator_id", nullable = false)
        private User creator;

        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "project_id", nullable = false)
        private Project project;

        private boolean deleted = false;

        private LocalDateTime createdAt;

        private LocalDateTime updatedAt;

        @PrePersist
        public void prePersist() {
            createdAt = LocalDateTime.now();
            updatedAt = LocalDateTime.now();
        }

        @PreUpdate
        public void preUpdate() {
            updatedAt = LocalDateTime.now();
        }
    }