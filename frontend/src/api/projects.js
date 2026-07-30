import api from "./axios";

export const getProject = async (projectId) => {
	const { data } = await api.get(`/projects/${projectId}`);
	return data;
};

export const getProjectStats = async (projectId) => {
	const { data } = await api.get(`/projects/${projectId}/stats`);
	return data;
};

export const inviteMember = async ({ projectId, userEmail }) => {
	const { data } = await api.post(`/projects/${projectId}/members`, {
		userEmail,
	});
	return data;
};

export const getProjects = async () => {
	const { data } = await api.get("/projects");
	return data;
};

export async function createProject(body) {
	const { data } = await api.post("/projects", body);
	return data;
}

export const deleteProject = async (projectId) => {
	const { data } = await api.delete(`/projects/${projectId}`);
	return data;
};
