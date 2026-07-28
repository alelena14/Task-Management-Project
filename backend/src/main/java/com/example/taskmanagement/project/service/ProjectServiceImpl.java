package com.example.taskmanagement.project.service;

import com.example.taskmanagement.audit.entity.AuditAction;
import com.example.taskmanagement.audit.entity.AuditLog;
import com.example.taskmanagement.audit.service.AuditLogService;
import com.example.taskmanagement.exception.ForbiddenException;
import com.example.taskmanagement.exception.ResourceNotFoundException;
import com.example.taskmanagement.project.dto.*;
import com.example.taskmanagement.project.entity.Project;
import com.example.taskmanagement.project.entity.ProjectStatus;
import com.example.taskmanagement.project.repository.ProjectRepository;
import com.example.taskmanagement.task.entity.TaskStatus;
import com.example.taskmanagement.task.repository.TaskRepository;
import com.example.taskmanagement.user.entity.Role;
import com.example.taskmanagement.user.entity.User;
import com.example.taskmanagement.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class ProjectServiceImpl implements ProjectService {

    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;
    private final AuditLogService auditService;
    private final TaskRepository taskRepository;

    @Override
    public ProjectResponse createProject(CreateProjectRequest request) {

        User currentUser = getCurrentUser();

        Project project = Project.builder()
                .name(request.name())
                .description(request.description())
                .status(ProjectStatus.ACTIVE)
                .owner(currentUser)
                .deleted(false)
                .build();

        // Automatically add project owner as member
        project.getMembers().add(currentUser);

        Project savedProject = projectRepository.save(project);

        auditService.log(
                AuditAction.CREATE_PROJECT,
                "PROJECT",
                savedProject.getId(),
                currentUser.getEmail()
        );

        return mapToResponse(savedProject);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProjectResponse> getProjects() {

        User currentUser = getCurrentUser();

        if (currentUser.getRole() == Role.ADMIN) {
            return projectRepository.findByDeletedFalse()
                    .stream()
                    .map(this::mapToResponse)
                    .toList();
        }

        // Regular users can access only projects where they are members
        return projectRepository.findByDeletedFalse()
                .stream()
                .filter(project ->
                        project.getMembers()
                                .contains(currentUser))
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public ProjectResponse getProjectById(Long projectId) {

        Project project = getProject(projectId);

        User currentUser = getCurrentUser();

        boolean isMember = project.getMembers()
                .contains(currentUser);

        boolean isAdmin = currentUser.getRole() == Role.ADMIN;

        // Regular users can access only projects where they are members
        if (!isMember && !isAdmin) {
            throw new ForbiddenException(
                    "You are not a member of this project"
            );
        }

        return mapToResponse(project);
    }

    @Override
    public ProjectResponse updateProject(Long projectId,
                                         UpdateProjectRequest request) {

        Project project = getProject(projectId);

        User currentUser = getCurrentUser();

        boolean isOwner =
                project.getOwner()
                        .getId()
                        .equals(currentUser.getId());

        boolean isAdmin =
                currentUser.getRole() == Role.ADMIN;

        if (!isOwner && !isAdmin) {
            throw new ForbiddenException(
                    "Only owner or admin can update project"
            );
        }

        if (request.name() != null) {
            project.setName(request.name());
        }

        if (request.description() != null) {
            project.setDescription(request.description());
        }

        if (request.status() != null) {
            project.setStatus(request.status());
        }

        Project updatedProject =
                projectRepository.save(project);

        auditService.log(
                AuditAction.UPDATE_PROJECT,
                "PROJECT",
                project.getId(),
                currentUser.getEmail()
        );

        return mapToResponse(updatedProject);
    }

    @Override
    public ProjectStatsResponse
    getProjectStats(
            Long projectId
    ) {

        User currentUser = getCurrentUser();

        Project project =
                projectRepository
                        .findByIdAndDeletedFalse(
                                projectId
                        )
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Project not found"
                                ));

        boolean isAdmin =
                currentUser.getRole()
                        == Role.ADMIN;

        boolean isMember =
                project.getMembers()
                        .stream()
                        .anyMatch(member ->
                                member.getId()
                                        .equals(
                                                currentUser.getId()
                                        ));

        if (!isAdmin && !isMember) {

            throw new ForbiddenException(
                    "Access denied"
            );
        }

        long total =
                taskRepository
                        .countByProjectIdAndDeletedFalse(
                                projectId
                        );

        long todo =
                taskRepository
                        .countByProjectIdAndStatusAndDeletedFalse(
                                projectId,
                                TaskStatus.TODO
                        );

        long inProgress =
                taskRepository
                        .countByProjectIdAndStatusAndDeletedFalse(
                                projectId,
                                TaskStatus.IN_PROGRESS
                        );

        long done =
                taskRepository
                        .countByProjectIdAndStatusAndDeletedFalse(
                                projectId,
                                TaskStatus.DONE
                        );

        return new ProjectStatsResponse(
                project.getId(),
                project.getName(),
                total,
                todo,
                inProgress,
                done
        );
    }

    @Override
    public void deleteProject(Long projectId) {

        Project project = getProject(projectId);

        User currentUser = getCurrentUser();

        boolean isOwner =
                project.getOwner()
                        .getId()
                        .equals(currentUser.getId());

        boolean isAdmin =
                currentUser.getRole() == Role.ADMIN;

        if (!isOwner && !isAdmin) {
            throw new ForbiddenException(
                    "Only owner or admin can delete project"
            );
        }

        project.setDeleted(true);

        projectRepository.save(project);

        auditService.log(
                AuditAction.DELETE_PROJECT,
                "PROJECT",
                project.getId(),
                currentUser.getEmail()
        );
    }

    @Override
    public void addMember(Long projectId,
                          AddMemberRequest request) {

        Project project = getProject(projectId);

        User currentUser = getCurrentUser();

        boolean isOwner =
                project.getOwner()
                        .getId()
                        .equals(currentUser.getId());

        boolean isAdmin =
                currentUser.getRole() == Role.ADMIN;

        if (!isOwner && !isAdmin) {
            throw new ForbiddenException(
                    "Only owner or admin can add members"
            );
        }

        User user = userRepository
                .findByIdAndActiveTrue(
                        request.userId()
                )
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found"
                        ));

        project.getMembers().add(user);

        projectRepository.save(project);

        auditService.log(
                AuditAction.ADD_MEMBER,
                "PROJECT",
                project.getId(),
                currentUser.getEmail()
        );
    }

    // internal service methods
    @Transactional(readOnly = true)
    private Project getProject(Long projectId) {

        return projectRepository
                .findByIdAndDeletedFalse(projectId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Project not found"
                        ));
    }

    @Transactional(readOnly = true)
    private User getCurrentUser() {

        Authentication authentication =
                SecurityContextHolder.getContext()
                        .getAuthentication();

        String email = authentication.getName();

        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found"
                        ));
    }

    private ProjectResponse mapToResponse(Project project) {

        Set<String> members = project.getMembers()
                .stream()
                .map(User::getEmail)
                .collect(Collectors.toSet());

        long total = taskRepository.countByProjectIdAndDeletedFalse(project.getId());

        long done = taskRepository.countByProjectIdAndStatusAndDeletedFalse(
                project.getId(),
                TaskStatus.DONE
        );

        int progress = total == 0 ? 0 : (int) (done * 100 / total);

        return new ProjectResponse(
                project.getId(),
                project.getName(),
                project.getDescription(),
                project.getStatus(),
                project.getOwner().getEmail(),
                members,
                progress,
                project.getCreatedAt()
        );
    }
}