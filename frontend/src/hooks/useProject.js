import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProjectTasks } from "../api/tasks";
import {
	createProject,
	deleteProject,
	getProject,
	getProjects,
	getProjectStats,
	inviteMember,
	updateProject,
} from "../api/projects";

export function useProject(projectId) {
	return useQuery({
		queryKey: ["project", projectId],
		queryFn: () => getProject(projectId),
		enabled: !!projectId,
	});
}

export function useProjectTasks(projectId) {
	return useQuery({
		queryKey: ["tasks", projectId],
		queryFn: () => getProjectTasks(projectId),
		enabled: !!projectId,
	});
}

export function useCreateProject() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: createProject,

		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["projects"],
			});
		},
	});
}

export function useProjectStats(projectId) {
	return useQuery({
		queryKey: ["stats", projectId],
		queryFn: () => getProjectStats(projectId),
		enabled: !!projectId,
	});
}

export function useProjects() {
	return useQuery({
		queryKey: ["projects"],
		queryFn: getProjects,
	});
}

export function useInviteMember() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: inviteMember,

		onSuccess: (_, variables) => {
			queryClient.invalidateQueries({
				queryKey: ["project", variables.projectId],
			});

			queryClient.invalidateQueries({
				queryKey: ["projects"],
			});
		},
	});
}

export function useUpdateProject() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: updateProject,

		onSuccess: (updatedProject) => {
			queryClient.invalidateQueries({
				queryKey: ["projects"],
			});

			queryClient.invalidateQueries({
				queryKey: ["project", updatedProject.id],
			});
		},
	});
}

export function useDeleteProject() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: deleteProject,

		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["projects"],
			});
		},
	});
}
