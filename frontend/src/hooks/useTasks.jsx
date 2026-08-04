import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
	createTask,
	deleteTasks,
	getMyTasks,
	getMyTaskStats,
	updateTask,
} from "../api/tasks";

export function useMyTasks({ status, priority } = {}) {
	return useQuery({
		queryKey: ["myTasks", status, priority],
		queryFn: () => getMyTasks(status, priority),
	});
}

export function useCreateTask() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: createTask,

		onSuccess: (_, variables) => {
			queryClient.invalidateQueries({
				queryKey: ["tasks", variables.projectId],
			});

			queryClient.invalidateQueries({
				queryKey: ["stats", variables.projectId],
			});
		},
	});
}

export function useUpdateTask() {
	return useMutation({
		mutationFn: updateTask,
	});
}

export function useMyTaskStats() {
	return useQuery({
		queryKey: ["myTaskStats"],
		queryFn: () => {
			console.log("queryFn executed");
			return getMyTaskStats();
		},
	});
}

export function useDeleteTask() {
	return useMutation({
		mutationFn: deleteTasks,
	});
}
