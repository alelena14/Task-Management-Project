import api from "./axios";

export const getProjectTasks = async (projectId) => {
	const { data } = await api.get(`/projects/${projectId}/tasks`);
	return data;
};

export const updateTask = async ({ taskId, body }) => {
	const { data } = await api.put(`/tasks/${taskId}`, body);
	return data;
};

export const createTask = async (body) => {
	const { data } = await api.post("/tasks", body);
	return data;
};

export const getMyTasks = async (status, priority) => {
	const { data } = await api.get("/tasks/my-tasks", {
		params: {
			status: status || undefined,
			priority: priority || undefined,
		},
	});

	return data.content;
};

export const getMyTaskStats = async () => {
	console.log("getMyTaskStats called");

	const { data } = await api.get("/tasks/my-tasks/stats");

	return data;
};

export const deleteTasks = async (taskId) => {
	const { data } = await api.delete(`/tasks/${taskId}`);
	return data;
};
