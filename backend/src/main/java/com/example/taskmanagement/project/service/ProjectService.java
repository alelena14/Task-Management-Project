package com.example.taskmanagement.project.service;

import com.example.taskmanagement.project.dto.*;

import java.util.List;

public interface ProjectService {

    ProjectResponse createProject(CreateProjectRequest request);

    List<ProjectResponse> getProjects();

    ProjectResponse getProjectById(Long projectId);

    ProjectResponse updateProject(Long projectId,
                                  UpdateProjectRequest request);

    ProjectStatsResponse getProjectStats(Long projectId);

    void deleteProject(Long projectId);

    void addMember(Long projectId,
                   AddMemberRequest request);
}
