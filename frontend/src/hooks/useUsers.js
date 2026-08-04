import { useMutation, useQuery } from "@tanstack/react-query";
import {
	deleteUser,
	getCurrentUser,
	getUsers,
	updateUserRole,
} from "../api/users";

// GET /users/me
export function useCurrentUser() {
	return useQuery({
		queryKey: ["currentUser"],
		queryFn: getCurrentUser,
	});
}

// GET /users
export function useUsers() {
	return useQuery({
		queryKey: ["users"],
		queryFn: getUsers,
	});
}

// DELETE /users/{id}
export function useDeleteUser() {
	return useMutation({
		mutationFn: deleteUser,
	});
}

// PUT /users/{id}/role
export function useUpdateUserRole() {
	return useMutation({
		mutationFn: updateUserRole,
	});
}
