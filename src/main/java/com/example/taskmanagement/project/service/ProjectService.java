package com.example.taskmanagement.project.service;

import com.example.taskmanagement.project.dto.AddMemberRequest;
import com.example.taskmanagement.project.dto.CreateProjectRequest;
import com.example.taskmanagement.project.dto.ProjectResponse;
import com.example.taskmanagement.project.dto.UpdateProjectRequest;

import java.util.List;

public interface ProjectService {

    ProjectResponse createProject(CreateProjectRequest request);

    List<ProjectResponse> getProjects();

    ProjectResponse getProjectById(Long projectId);

    ProjectResponse updateProject(Long projectId,
                                  UpdateProjectRequest request);

    void deleteProject(Long projectId);

    void addMember(Long projectId,
                   AddMemberRequest request);
}
