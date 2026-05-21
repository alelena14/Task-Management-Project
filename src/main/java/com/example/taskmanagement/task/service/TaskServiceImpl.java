package com.example.taskmanagement.task.service;

import com.example.taskmanagement.audit.entity.AuditAction;
import com.example.taskmanagement.audit.service.AuditLogService;
import com.example.taskmanagement.exception.BusinessException;
import com.example.taskmanagement.exception.ForbiddenException;
import com.example.taskmanagement.exception.ResourceNotFoundException;
import com.example.taskmanagement.project.entity.Project;
import com.example.taskmanagement.project.repository.ProjectRepository;
import com.example.taskmanagement.task.dto.CreateTaskRequest;
import com.example.taskmanagement.task.dto.TaskResponse;
import com.example.taskmanagement.task.dto.UpdateTaskRequest;
import com.example.taskmanagement.task.entity.Task;
import com.example.taskmanagement.task.entity.TaskPriority;
import com.example.taskmanagement.task.entity.TaskStatus;
import com.example.taskmanagement.task.repository.TaskRepository;
import com.example.taskmanagement.user.entity.Role;
import com.example.taskmanagement.user.entity.User;
import com.example.taskmanagement.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;
    private final ProjectRepository projectRepository;
    private final AuditLogService auditService;

    public TaskResponse create(CreateTaskRequest request) {

        User creator = getAuthenticatedUser();

        Project project = projectRepository
                .findByIdAndDeletedFalse(
                        request.projectId()
                )
                .orElseThrow(() -> new ResourceNotFoundException("Project not found"));

        boolean isAdmin =
                creator.getRole() == Role.ADMIN;

        boolean isOwner =
                project.getOwner().getId().equals(creator.getId());

        boolean isMember =
                project.getMembers()
                        .stream()
                        .anyMatch(m -> m.getId().equals(creator.getId()));

        if (!isAdmin && !isOwner && !isMember) {
            throw new ForbiddenException(
                    "Only project members can create tasks"
            );
        }

        User assignedUser = null;

        if (request.assignedUserId() != null) {

            assignedUser = userRepository
                    .findByIdAndActiveTrue(
                            request.assignedUserId()
                    )
                    .orElseThrow(() ->
                            new ResourceNotFoundException(
                                    "Assigned user not found"
                            ));

            Long assignedUserId = assignedUser.getId();

            boolean assignedIsMember = project.getMembers()
                    .stream()
                    .anyMatch(member ->
                            member.getId().equals(assignedUserId));

            if (!assignedIsMember) {
                throw new ForbiddenException(
                        "Assigned user must be a project member"
                );
            }
        }

        Task task = Task.builder()
                .title(request.title())
                .description(request.description())
                .priority(request.priority())
                .status(TaskStatus.TODO)
                .deadline(request.deadline())
                .assignedUser(assignedUser)
                .creator(creator)
                .project(project)
                .build();

        Task savedTask = taskRepository.save(task);

        auditService.log(
                AuditAction.CREATE_TASK,
                "TASK",
                savedTask.getId(),
                creator.getEmail()
        );

        return mapToResponse(task);
    }

    @Transactional(readOnly = true)
    public List<TaskResponse> getProjectTasks(Long projectId) {

        User user = getAuthenticatedUser();

        Project project = projectRepository
                .findByIdAndDeletedFalse(
                        projectId
                )
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Project not found"
                        ));

        boolean isAdmin =
                user.getRole() == Role.ADMIN;

        boolean isMember =
                project.getMembers()
                        .stream()
                        .anyMatch(member ->
                                member.getId().equals(user.getId()));

        if (!isAdmin && !isMember) {
            throw new ForbiddenException(
                    "You cannot access this project"
            );
        }

        return taskRepository
                .findByProjectIdAndDeletedFalse(projectId)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public Page<TaskResponse> getAll(

            TaskStatus status,
            TaskPriority priority,
            Pageable pageable
    ) {

        User user = getAuthenticatedUser();

        validateSortFields(pageable);

        Page<Task> tasks;

        if (user.getRole() == Role.ADMIN) {

            if (status != null && priority != null) {

                tasks = taskRepository
                        .findByDeletedFalseAndStatusAndPriority(
                                status,
                                priority,
                                pageable
                        );

            } else if (status != null) {

                tasks = taskRepository
                        .findByDeletedFalseAndStatus(
                                status,
                                pageable
                        );

            } else if (priority != null) {

                tasks = taskRepository
                        .findByDeletedFalseAndPriority(
                                priority,
                                pageable
                        );

            } else {

                tasks = taskRepository
                        .findByDeletedFalse(pageable);
            }

        } else {

            tasks = taskRepository
                    .findByProjectMembersIdAndDeletedFalse(
                            user.getId(),
                            pageable
                    );
        }

        return tasks.map(this::mapToResponse);
    }

    public TaskResponse update(Long id, UpdateTaskRequest request) {

        User currentUser = getAuthenticatedUser();

        Task task = taskRepository
                .findByIdAndDeletedFalse(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Task not found"
                        ));

        boolean isAdmin =
                currentUser.getRole() == Role.ADMIN;

        boolean isTaskCreator =
                task.getCreator()
                        .getId()
                        .equals(currentUser.getId());

        boolean isProjectOwner =
                task.getProject()
                        .getOwner()
                        .getId()
                        .equals(currentUser.getId());

        boolean isAssignedUser =
                task.getAssignedUser() != null
                        && task.getAssignedUser()
                        .getId()
                        .equals(currentUser.getId());

        // ADMIN or OWNER -> full update
        if (isAdmin || isTaskCreator || isProjectOwner) {

            if (request.title() != null) {
                task.setTitle(request.title());
            }

            if (request.description() != null) {
                task.setDescription(request.description());
            }

            if (request.priority() != null) {
                task.setPriority(request.priority());
            }

            if (request.status() != null) {
                task.setStatus(request.status());
            }

            if (request.deadline() != null) {
                task.setDeadline(request.deadline());
            }

            if (request.assignedUserId() != null) {

                User assignedUser =
                        userRepository
                                .findByIdAndActiveTrue(
                                        request.assignedUserId()
                                )
                                .orElseThrow(() ->
                                        new ResourceNotFoundException(
                                                "Assigned user not found"
                                        ));

                boolean assignedIsMember =
                        task.getProject()
                                .getMembers()
                                .stream()
                                .anyMatch(member ->
                                        member.getId()
                                                .equals(assignedUser.getId()));

                if (!assignedIsMember) {
                    throw new ForbiddenException(
                            "Assigned user must be a project member"
                    );
                }

                task.setAssignedUser(assignedUser);
            }
        }

        // ASSIGNED USER -> only status update
        else if (isAssignedUser) {

            boolean tryingToUpdateOtherFields =
                    request.title() != null ||
                            request.description() != null ||
                            request.priority() != null ||
                            request.deadline() != null ||
                            request.assignedUserId() != null;

            if (tryingToUpdateOtherFields) {
                throw new ForbiddenException(
                        "Assigned user can only update task status"
                );
            }

            if (request.status() == null) {
                throw new BusinessException("Status is required");
            }

            task.setStatus(request.status());
        }

        // NO ACCESS
        else {
            throw new ForbiddenException("You are not allowed to update this task");
        }

        Task savedTask = taskRepository.save(task);

        auditService.log(
                AuditAction.UPDATE_TASK,
                "TASK",
                savedTask.getId(),
                currentUser.getEmail()
        );

        return mapToResponse(task);
    }

    public void delete(Long id) {

        User currentUser = getAuthenticatedUser();

        Task task = taskRepository
                .findByIdAndDeletedFalse(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Task not found"
                        ));

        boolean isAdmin = currentUser.getRole() == Role.ADMIN;

        boolean isTaskCreator =
                task.getCreator()
                        .getId()
                        .equals(currentUser.getId());

        boolean isProjectOwner =
                task.getProject()
                        .getOwner()
                        .getId()
                        .equals(currentUser.getId());

        if (!isAdmin
                && !isTaskCreator
                && !isProjectOwner) {

            throw new ForbiddenException(
                    "You are not allowed to delete this task"
            );
        }

        task.setDeleted(true);

        Task savedTask = taskRepository.save(task);

        auditService.log(
                AuditAction.DELETE_TASK,
                "TASK",
                savedTask.getId(),
                currentUser.getEmail()
        );
    }

    public Page<TaskResponse> getMyTasks(
            Pageable pageable
    ) {

        User currentUser =
                getAuthenticatedUser();

        Page<Task> tasks =
                taskRepository
                        .findByAssignedUserIdAndDeletedFalse(
                                currentUser.getId(),
                                pageable
                        );

        return tasks
                .map(this::mapToResponse);
    }

    // internal service methods
    private User getAuthenticatedUser() {

        String email = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();

        return userRepository
                .findByEmailAndActiveTrue(email)
                .orElseThrow(() ->
                        new BusinessException(
                                "User not found"
                        ));
    }

    private TaskResponse mapToResponse(Task task) {

        return new TaskResponse(
                task.getId(),
                task.getTitle(),
                task.getDescription(),
                task.getPriority(),
                task.getStatus(),
                task.getDeadline(),
                task.getAssignedUser() != null
                        ? task.getAssignedUser().getFirstName()
                        : null,
                task.getCreator().getFirstName(),
                task.getProject().getId(),
                task.getCreatedAt()
        );
    }

    private static final Set<String> ALLOWED_SORT_FIELDS =
            Set.of(
                    "createdAt",
                    "title",
                    "priority",
                    "status"
            );

    private void validateSortFields(
            Pageable pageable
    ) {

        for (Sort.Order order
                : pageable.getSort()) {

            if (!ALLOWED_SORT_FIELDS
                    .contains(order.getProperty())) {

                throw new BusinessException(
                        "Invalid sort field: "
                                + order.getProperty()
                );
            }
        }
    }
}