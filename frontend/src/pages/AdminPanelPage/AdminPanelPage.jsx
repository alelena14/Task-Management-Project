import Navbar from "../../components/layout/Navbar.jsx";
import UsersTable from "./components/UsersTable.jsx";

import {
	useDeleteUser,
	useUpdateUserRole,
	useUsers,
} from "../../hooks/useUsers.js";
import { useQueryClient } from "@tanstack/react-query";

export default function AdminPanelPage() {
	const queryClient = useQueryClient();

	const { data: users = [], isLoading } = useUsers();

	const deleteUserMutation = useDeleteUser();
	const updateRoleMutation = useUpdateUserRole();

	const handleDelete = async (userId) => {
		const previousUsers = queryClient.getQueryData(["users"]);

		queryClient.setQueryData(["users"], (old = []) =>
			old.filter((u) => u.id !== userId),
		);

		try {
			await deleteUserMutation.mutateAsync(userId);
		} catch (error) {
			queryClient.setQueryData(["users"], previousUsers);
		}
	};

	const handleRoleChange = async (userId, role) => {
		const previousUsers = queryClient.getQueryData(["users"]);

		queryClient.setQueryData(["users"], (old = []) =>
			old.map((u) => (u.id === userId ? { ...u, role } : u)),
		);

		try {
			await updateRoleMutation.mutateAsync({
				userId,
				role,
			});
		} catch (error) {
			queryClient.setQueryData(["users"], previousUsers);
		}
	};

	return (
		<div className="min-h-screen bg-[#e8ebe4]">
			<Navbar />

			<div className="max-w-7xl mx-auto px-8 py-10">
				<div className="mb-8">
					<p className="text-4xl font-rotunda text-[#34113F]">
						Admin Panel
					</p>

					<p className="mt-2 text-gray-500">
						Manage users, update roles and remove accounts.
					</p>
				</div>

				{isLoading ? (
					<div className="bg-white border border-gray-200 h-96 animate-pulse" />
				) : (
					<UsersTable
						users={users}
						onDelete={handleDelete}
						onRoleChange={handleRoleChange}
					/>
				)}
			</div>
		</div>
	);
}
