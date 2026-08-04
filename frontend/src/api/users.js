import api from "./axios";

// GET /users/me
export const getCurrentUser = async () => {
	const { data } = await api.get("/users/me");
	return data;
};

// GET /users
export const getUsers = async () => {
	const { data } = await api.get("/users");
	return data;
};

// DELETE /users/{id}
export const deleteUser = async (userId) => {
	const { data } = await api.delete(`/users/${userId}`);
	return data;
};

// PUT /users/{id}/role
export const updateUserRole = async ({ userId, role }) => {
	const { data } = await api.put(`/users/${userId}/role`, {
		role,
	});

	return data;
};
