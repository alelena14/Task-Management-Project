package com.example.taskmanagement.project.controller;

import com.example.taskmanagement.project.dto.AddMemberRequest;
import com.example.taskmanagement.project.dto.CreateProjectRequest;
import com.example.taskmanagement.project.dto.ProjectResponse;
import com.example.taskmanagement.project.dto.UpdateProjectRequest;
import com.example.taskmanagement.project.service.ProjectService;
import com.example.taskmanagement.task.dto.TaskResponse;
import com.example.taskmanagement.task.service.TaskService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/projects")
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectService projectService;
    private final TaskService taskService;

    @PostMapping
    public ResponseEntity<ProjectResponse> createProject(
            @Valid @RequestBody CreateProjectRequest request
    ) {

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(projectService.createProject(request));
    }

    @GetMapping
    public ResponseEntity<List<ProjectResponse>> getProjects() {

        return ResponseEntity.ok(
                projectService.getProjects()
        );
    }

    @GetMapping("/{projectId}")
    public ResponseEntity<ProjectResponse> getProjectById(
            @PathVariable Long projectId
    ) {

        return ResponseEntity.ok(
                projectService.getProjectById(projectId)
        );
    }

    @PutMapping("/{projectId}")
    public ResponseEntity<ProjectResponse> updateProject(
            @PathVariable Long projectId,
            @Valid @RequestBody UpdateProjectRequest request
    ) {

        return ResponseEntity.ok(
                projectService.updateProject(projectId, request)
        );
    }

    @DeleteMapping("/{projectId}")
    public ResponseEntity<Void> deleteProject(
            @PathVariable Long projectId
    ) {

        projectService.deleteProject(projectId);

        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{projectId}/members")
    public ResponseEntity<Void> addMember(
            @PathVariable Long projectId,
            @Valid @RequestBody AddMemberRequest request
    ) {

        projectService.addMember(projectId, request);

        return ResponseEntity.ok().build();
    }

    @GetMapping("/{projectId}/tasks")
    public ResponseEntity<List<TaskResponse>> getProjectTasks(
            @PathVariable Long projectId
    ) {

        return ResponseEntity.ok(
                taskService.getProjectTasks(projectId)
        );
    }
}