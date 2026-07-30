import Navbar from "../../components/layout/Navbar.jsx";
import React, { useState } from "react";
import { Plus, UserPlus } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import {
	closestCorners,
	DndContext,
	DragOverlay,
	PointerSensor,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import CreateTaskModal from "./components/CreateTaskModal.jsx";
import { useCurrentUser } from "../../hooks/useUser.js";
import {
	useDeleteProject,
	useInviteMember,
	useProject,
	useProjectStats,
	useProjectTasks,
} from "../../hooks/useProject.js";
import { useDeleteTask, useUpdateTask } from "../../hooks/useTasks.jsx";
import { useQueryClient } from "@tanstack/react-query";
import TaskBoardCard from "./components/TaskBoardCard.jsx";
import KanbanColumn from "./components/KanbanColumn.jsx";
import ProjectTag from "../../components/ui/ProjectTag.jsx";
import StatsGrid from "../../components/layout/StatsGrid.jsx";
import { TaskSidebar } from "../HomePage/components/TaskSidebar.jsx";

function SingleProjectsPage() {
	// Routing
	const { state } = useLocation();
	const navigate = useNavigate();

	const initialProject = state?.project;

	// React Queries
	const { data: project } = useProject(initialProject?.id);
	const { data: tasks = [], isLoading } = useProjectTasks(project?.id);
	const { data: stats = {} } = useProjectStats(project?.id);
	const { data: currentUser } = useCurrentUser();

	// React State
	const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
	const [showInvite, setShowInvite] = useState(false);
	const [email, setEmail] = useState("");
	const [isInviting, setIsInviting] = useState(false);
	const [activeTask, setActiveTask] = useState(null);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [selectedTask, setSelectedTask] = useState(null);

	const pickTask = (task) => {
		setSelectedTask(task);
	};

	// React Query - Mutations
	const queryClient = useQueryClient();

	const updateTaskMutation = useUpdateTask(project?.id);
	const inviteMemberMutation = useInviteMember();
	const deleteProjectMutation = useDeleteProject();
	const deleteTaskMutation = useDeleteTask();

	// Permissions
	const isOwner = currentUser?.id === project?.ownerId;

	// DnD Sensors
	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: { distance: 5 },
		}),
	);

	if (!project) {
		return null;
	}

	// Drag & Drop
	const handleDragEnd = async ({ active, over }) => {
		if (!over) return;

		const taskId = active.id;
		const newStatus = over.id;

		const task = tasks.find((t) => t.id === taskId);

		if (!task || task.status === newStatus) return;

		const previousTasks = queryClient.getQueryData(["tasks", project.id]);
		const previousStats = queryClient.getQueryData(["stats", project.id]);

		queryClient.setQueryData(["tasks", project.id], (old = []) =>
			old.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t)),
		);

		const statKeyOf = (status) =>
			status === "TODO"
				? "todo"
				: status === "IN_PROGRESS"
					? "inProgress"
					: "done";

		queryClient.setQueryData(["stats", project.id], (old) => {
			if (!old) return old;

			const updated = { ...old };

			const fromKey = statKeyOf(task.status);
			const toKey = statKeyOf(newStatus);

			updated[fromKey] = Math.max(0, (updated[fromKey] ?? 0) - 1);
			updated[toKey] = (updated[toKey] ?? 0) + 1;

			return updated;
		});

		try {
			await updateTaskMutation.mutateAsync({
				taskId,
				body: {
					title: task.title,
					description: task.description,
					priority: task.priority,
					status: newStatus,
					deadline: task.deadline,
					assignedUserId: task.assignedUserId,
				},
			});
		} catch (error) {
			console.error(error);

			queryClient.setQueryData(["tasks", project.id], previousTasks);
			queryClient.setQueryData(["stats", project.id], previousStats);
		}
	};

	// Invite Member
	const handleInviteMember = async () => {
		try {
			await inviteMemberMutation.mutateAsync({
				projectId: project.id,
				userEmail: email,
			});

			setEmail("");
			setShowInvite(false);
		} catch (error) {
			console.log(error.response?.data);
		}
	};

	// Delete Project
	const handleDeleteProject = async () => {
		try {
			await deleteProjectMutation.mutateAsync(project.id);

			navigate("/projects");
		} catch (error) {
			console.error(error);
			alert("Failed to delete project.");
		}
	};

	// Mark task as done
	const markTaskAsDone = async (taskId) => {
		const task = tasks.find((t) => t.id === taskId);

		if (!task) return;

		setSelectedTask((prev) => ({
			...prev,
			status: "DONE",
		}));

		queryClient.setQueryData(["tasks", project.id], (old = []) =>
			old.map((t) => (t.id === taskId ? { ...t, status: "DONE" } : t)),
		);

		try {
			await updateTaskMutation.mutateAsync({
				taskId,
				body: {
					...task,
					status: "DONE",
				},
			});
		} catch (error) {
			queryClient.invalidateQueries({
				queryKey: ["tasks", project.id],
			});
		}
	};

	// Delete task
	const handleTaskDelete = async (task) => {
		const previousTasks = queryClient.getQueryData(["tasks", project.id]);
		const previousStats = queryClient.getQueryData(["stats", project.id]);

		queryClient.setQueryData(["tasks", project.id], (old = []) =>
			old.filter((t) => t.id !== task.id),
		);

		queryClient.setQueryData(["stats", project.id], (old) => {
			if (!old) return old;

			const updated = { ...old };

			if (task.status === "TODO") {
				updated.todo--;
			} else if (task.status === "IN_PROGRESS") {
				updated.inProgress--;
			} else {
				updated.done--;
			}

			return updated;
		});

		try {
			await deleteTaskMutation.mutateAsync(task.id);

			await queryClient.invalidateQueries({
				queryKey: ["tasks", project.id],
			});

			await queryClient.invalidateQueries({
				queryKey: ["stats", project.id],
			});
		} catch (error) {
			queryClient.setQueryData(["tasks", project.id], previousTasks);
			queryClient.setQueryData(["stats", project.id], previousStats);
		}
	};

	const todoTasks = tasks.filter((task) => task.status === "TODO");
	const doingTasks = tasks.filter((task) => task.status === "IN_PROGRESS");
	const doneTasks = tasks.filter((task) => task.status === "DONE");

	return (
		<div className="min-h-screen flex flex-col">
			<Navbar />

			<div className="flex flex-1">
				{/* Sidebar */}
				<div className="fixed inset-0 top-16 w-64 bg-[#f1f3fc] border-r border-gray-300 p-6 flex flex-col gap-8">
					<div>
						<p className="text-xs font-fabrikat tracking-wide text-gray-400 uppercase pb-4">
							Project Members
						</p>

						<div className="flex flex-col gap-4">
							{(project.members || []).map((m) => (
								<div
									key={m.id}
									className="flex items-center gap-3"
								>
									<div className="relative">
										<div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center text-xs font-medium text-slate-600">
											{m.fullName
												.slice(0, 2)
												.toUpperCase()}
										</div>
									</div>
									<div className="flex flex-col">
										<span className="text-sm text-[#34113F] font-medium">
											{m.fullName}
										</span>
									</div>
								</div>
							))}
						</div>
					</div>

					<div className="mt-auto">
						{showInvite && (
							<div className=" border border-gray-300 bg-white p-4 rounded-md">
								<label className="text-xs font-fabrikat tracking-wide text-gray-500 uppercase">
									Email Address
								</label>

								<input
									type="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									placeholder="example@gmail.com"
									className="mt-2 w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#34113F]"
								/>

								<button
									onClick={handleInviteMember}
									disabled={isInviting}
									className="mt-4 w-full bg-[#34113F] text-white py-2 text-sm font-fabrikat hover:bg-[#4a1b58]"
								>
									{isInviting ? "ADDING..." : "ADD MEMBER"}
								</button>
							</div>
						)}

						{isOwner && (
							<button
								onClick={() => setShowInvite((prev) => !prev)}
								className="w-full flex items-center justify-center gap-2 border border-gray-300 text-sm font-fabrikat text-[#34113F] py-2.5 hover:bg-gray-50 transition-colors"
							>
								<UserPlus size={15} /> Invite Member
							</button>
						)}
					</div>
				</div>

				{/* Main content */}
				<div className="flex-1 p-8 flex flex-col gap-8 pl-70 bg-[#f8f9ff]">
					{/* Header */}
					<div className="flex items-start justify-between">
						<div className="flex flex-col gap-3">
							<div className="flex items-center gap-3">
								<span className="text-[10px] font-fabrikat tracking-wide bg-violet-100 text-violet-700 px-2 py-1 uppercase">
									{project.status}
								</span>
								<ProjectTag project={`PROJ-${project.id}`} />
							</div>
							<p className="text-4xl text-[#34113F] font-rotunda leading-tight">
								{project.name}
							</p>
						</div>

						{isOwner && (
							<div className="flex gap-3">
								<button
									onClick={() => setIsTaskModalOpen(true)}
									className="flex items-center gap-2 bg-[#34113F] text-white text-sm font-fabrikat tracking-wide px-4 py-2.5 hover:bg-[#4a1b58] transition-colors"
								>
									<Plus size={15} /> New Task
								</button>

								<button
									onClick={() => setShowDeleteModal(true)}
									className="border border-red-500 text-red-600 px-4 py-2 text-sm font-fabrikat hover:bg-red-50"
								>
									Delete Project
								</button>
							</div>
						)}
					</div>

					{/* Stats */}
					<StatsGrid stats={stats} />

					{/* Kanban board */}
					{isLoading ? (
						<p className="text-sm text-gray-500">
							Loading tasks...
						</p>
					) : (
						<DndContext
							sensors={sensors}
							collisionDetection={closestCorners}
							onDragEnd={handleDragEnd}
						>
							<div className="flex gap-8 overflow-x-auto max-w-6xl pb-4">
								<KanbanColumn
									id="TODO"
									title="To Do"
									dotColor="#9CA3AF"
									tasks={todoTasks}
									currentUser={currentUser}
									isOwner={isOwner}
									onTaskClick={pickTask}
									onDeleteTask={handleTaskDelete}
								/>
								<KanbanColumn
									id="IN_PROGRESS"
									title="In Progress"
									dotColor="#34113F"
									tasks={doingTasks}
									accent
									currentUser={currentUser}
									isOwner={isOwner}
									onTaskClick={pickTask}
									onDeleteTask={handleTaskDelete}
								/>
								<KanbanColumn
									id="DONE"
									title="Completed"
									dotColor="#10B981"
									tasks={doneTasks}
									accent
									currentUser={currentUser}
									isOwner={isOwner}
									onTaskClick={pickTask}
									onDeleteTask={handleTaskDelete}
								/>
							</div>

							<DragOverlay>
								{activeTask ? (
									<TaskBoardCard
										task={activeTask}
										currentUser={currentUser}
										isOwner={isOwner}
									/>
								) : null}
							</DragOverlay>
						</DndContext>
					)}
				</div>

				<CreateTaskModal
					isOpen={isTaskModalOpen}
					onClose={() => setIsTaskModalOpen(false)}
					project={project}
					onTaskCreated={() => {
						setIsTaskModalOpen(false);
					}}
				/>

				<TaskSidebar
					task={selectedTask}
					onClose={() => setSelectedTask(null)}
					onSetDone={markTaskAsDone}
				/>

				{showDeleteModal && (
					<div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
						<div className="bg-white w-105 rounded-lg shadow-xl p-6">
							<p className="text-xl font-rotunda text-black pb-2">
								Delete Project
							</p>

							<p className="mt-3 text-sm text-black font-rotunda">
								Are you sure you want to delete this project?
								<br />
								<span className="text-red-900 font-bold text-lg">
									This action cannot be undone.
								</span>
							</p>

							<div className="flex justify-end gap-3 mt-8">
								<button
									onClick={() => setShowDeleteModal(false)}
									className="px-4 py-2 border border-gray-300 text-sm font-fabrikat hover:bg-gray-100"
								>
									Cancel
								</button>

								<button
									onClick={async () => {
										await handleDeleteProject();
										setShowDeleteModal(false);
									}}
									className="px-4 py-2 bg-red-900 text-white text-sm font-fabrikat hover:bg-red-700"
								>
									Delete
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default SingleProjectsPage;
