import { useState } from "react";
import { ChevronLeft, ChevronRight, Trash2 } from "lucide-react";

const PAGE_SIZE = 4;

function Avatar({ firstName, lastName }) {
	const initials =
		`${firstName?.[0] ?? ""}${lastName?.[0] ?? ""}`.toUpperCase();

	return (
		<div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center text-xs font-medium text-slate-600">
			{initials}
		</div>
	);
}

function RoleToggle({ role, onChange }) {
	return (
		<div className="inline-flex border border-gray-200 overflow-hidden">
			<button
				onClick={() => onChange?.("ADMIN")}
				className={`px-3 py-1.5 text-xs font-fabrikat tracking-wide uppercase transition-colors ${
					role === "ADMIN"
						? "bg-[#34113F] text-white"
						: "bg-[#f1f3fc] text-gray-400"
				}`}
			>
				Admin
			</button>

			<button
				onClick={() => onChange?.("USER")}
				className={`px-3 py-1.5 text-xs font-fabrikat tracking-wide uppercase transition-colors ${
					role === "USER"
						? "bg-[#34113F] text-white"
						: "bg-[#f1f3fc] text-gray-400"
				}`}
			>
				User
			</button>
		</div>
	);
}

function ActiveBadge({ isActive }) {
	return (
		<span
			className={`text-xs font-fabrikat tracking-wide uppercase px-2 py-1 border ${
				isActive
					? "bg-[#ECFDF5] border-[#10B981]/30 text-[#10B981]"
					: "bg-[#FEF2F2] border-[#EF4444]/30 text-[#EF4444]"
			}`}
		>
			{isActive ? "True" : "False"}
		</span>
	);
}

export default function UsersTable({ users, onDelete, onRoleChange }) {
	const [page, setPage] = useState(0);

	if (!users.length) {
		return (
			<div className="p-10 text-center text-gray-500 font-fabrikat">
				No users found.
			</div>
		);
	}

	const pageCount = Math.max(1, Math.ceil(users.length / PAGE_SIZE));
	const safePage = Math.min(page, pageCount - 1);

	const pageUsers = users.slice(
		safePage * PAGE_SIZE,
		safePage * PAGE_SIZE + PAGE_SIZE,
	);

	return (
		<div className="bg-white border border-gray-200 flex flex-col">
			<table className="w-full">
				<thead className="border-b border-gray-100 bg-[#f8f9ff]">
					<tr className="text-left text-xs font-fabrikat tracking-wide uppercase text-gray-400">
						<th className="p-4 font-normal">User</th>
						<th className="font-normal">Role</th>
						<th className="font-normal">Active</th>
						<th className="font-normal">Delete</th>
					</tr>
				</thead>

				<tbody>
					{pageUsers.map((user) => (
						<tr
							key={user.id}
							className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition"
						>
							<td className="p-4">
								<div className="flex items-center gap-3">
									<Avatar
										firstName={user.firstName}
										lastName={user.lastName}
									/>

									<div className="flex flex-col">
										<span className="font-rotunda text-sm text-[#34113F]">
											{user.firstName} {user.lastName}
										</span>

										<span className="text-xs text-gray-400 font-fabrikat">
											{user.email}
										</span>
									</div>
								</div>
							</td>

							<td>
								<RoleToggle
									role={user.role}
									onChange={(role) =>
										onRoleChange?.(user.id, role)
									}
								/>
							</td>

							<td>
								<ActiveBadge isActive={user.isActive} />
							</td>

							<td>
								<button
									onClick={() => onDelete?.(user.id)}
									className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-[#EF4444] hover:bg-red-50 transition-colors"
								>
									<Trash2 size={16} />
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>

			<div className="flex items-center justify-between px-4 py-3 border-t border-gray-100 bg-[#f8f9ff]">
				<span className="text-xs font-fabrikat tracking-wide uppercase text-gray-400">
					Page {String(safePage + 1).padStart(2, "0")} of{" "}
					{String(pageCount).padStart(2, "0")}
				</span>

				<div className="flex items-center gap-2">
					<button
						onClick={() => setPage((p) => Math.max(0, p - 1))}
						disabled={safePage === 0}
						className="flex items-center gap-1 px-3 py-1.5 border border-gray-300 text-xs font-fabrikat tracking-wide uppercase text-gray-500 disabled:opacity-30 hover:bg-white"
					>
						<ChevronLeft size={14} />
						Prev
					</button>

					<button
						onClick={() =>
							setPage((p) => Math.min(pageCount - 1, p + 1))
						}
						disabled={safePage >= pageCount - 1}
						className="flex items-center gap-1 px-3 py-1.5 border border-gray-300 text-xs font-fabrikat tracking-wide uppercase text-[#34113F] disabled:opacity-30 hover:bg-white"
					>
						Next
						<ChevronRight size={14} />
					</button>
				</div>
			</div>
		</div>
	);
}
