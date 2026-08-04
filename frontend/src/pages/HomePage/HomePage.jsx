import Navbar from "../../components/layout/Navbar.jsx";
import React, { useState } from "react";
import TaskCard from "./components/TaskCard.jsx";
import ProjectCard from "./components/ProjectCard.jsx";
import { ProjectSidebar } from "./components/ProjectSidebar.jsx";
import { TaskSidebar } from "./components/TaskSidebar.jsx";
import { useNavigate } from "react-router-dom";
import { useMyTasks } from "../../hooks/useTasks.jsx";
import { useProjects } from "../../hooks/useProject.js";
import NotesPanel from "./components/NotesPanel.jsx";

function HomePage() {
	const [selectedTask, setSelectedTask] = useState(null);
	const [selectedProject, setSelectedProject] = useState(null);
	const navigate = useNavigate();

	const pickTask = (task) => {
		setSelectedTask(task);
		setSelectedProject(null);
	};
	const pickProject = (project) => {
		setSelectedProject(project);
		setSelectedTask(null);
	};

	const { data: projects = [], isLoading: isProjectsLoading } = useProjects();

	const { data: tasks = [], isLoading: isTasksLoading } = useMyTasks();

	const displayedProjects = projects.slice(0, 4);
	const displayedTasks = tasks.slice(0, 3);

	const isLoading = isProjectsLoading || isTasksLoading;

	return (
		<div className="bg-[#e8ebe4]">
			<Navbar />

			<div className="min-h-screen flex flex-col p-4">
				{/* Page title */}
				<div className="flex flex-col gap-2 px-4">
					<p className=" text-4xl text-[#34113F] font-rotunda">
						Workspace Overview
					</p>
					<p className="text-l text-gray-600">
						Welcome back, dev. Focus on your tasks based on
						priority.
					</p>
				</div>

				{/* Projects */}
				<div className="flex flex-col gap-4 p-4 max-w-336">
					<div className="flex flex-row gap-6">
						<p className=" text-xl text-[#34113F] font-rotunda">
							Your Projects
						</p>

						<p
							className=" text- text-[#34113F] font-fabrikat underline underline-offset-6 decoration-1 cursor-pointer pr-10"
							onClick={() => navigate("/projects")}
						>
							VIEW ALL
						</p>
					</div>

					<div className="grid grid-cols-4 gap-12">
						{isLoading ? (
							Array.from({ length: 4 }).map((_, index) => (
								<ProjectCardSkeleton key={index} />
							))
						) : displayedProjects.length === 0 ? (
							<p className="text-sm text-gray-500">
								No projects found.
							</p>
						) : (
							displayedProjects.map((project) => (
								<ProjectCard
									key={project.id}
									project={project}
									active={selectedProject?.id === project.id}
									onClick={() => pickProject(project)}
								/>
							))
						)}
					</div>
				</div>

				{/* Tasks */}
				<div className="flex gap-14.5">
					<div className="flex flex-col gap-4 p-4">
						<div className="flex flex-row gap-6 w-full">
							<p className="text-xl text-[#34113F] font-rotunda">
								Your Tasks
							</p>

							<p
								className=" text- text-[#34113F] font-fabrikat underline underline-offset-6 decoration-1 cursor-pointer"
								onClick={() => navigate("/tasks")}
							>
								VIEW ALL
							</p>
						</div>

						{isLoading ? (
							<div className="flex flex-col">
								{Array.from({ length: 3 }).map((_, index) => (
									<TaskCardSkeleton
										key={index}
										isFirst={index === 0}
									/>
								))}
							</div>
						) : displayedTasks.length === 0 ? (
							<p className="text-sm w-156 text-gray-500">
								No tasks found.
							</p>
						) : (
							<div className="flex flex-col">
								{displayedTasks.map((task, index) => (
									<TaskCard
										key={task.id}
										task={task}
										isFirst={index === 0}
										onClick={() => pickTask(task)}
									/>
								))}
							</div>
						)}
					</div>
					<div className="w-2/5 pt-15">
						<NotesPanel />
					</div>
				</div>
			</div>

			<ProjectSidebar
				project={selectedProject}
				onClose={() => setSelectedProject(null)}
			/>
			<TaskSidebar
				task={selectedTask}
				onClose={() => setSelectedTask(null)}
			/>
		</div>
	);
}

function ProjectCardSkeleton() {
	return (
		<div className="relative w-76 h-56 border-2 border-gray-200 bg-white p-4 overflow-hidden">
			<div className="flex flex-col gap-3">
				<div className="h-2 w-1/3 mb-2 bg-gray-200" />
				<div className="h-3 w-1/2 mb-2 bg-gray-200" />

				<div className="mt-4 flex flex-col gap-2">
					<div className="h-2 w-full bg-gray-200" />
					<div className="h-2 w-5/6 bg-gray-200" />
				</div>

				<div className="mt-auto h-2 w-1/3 bg-gray-200" />
			</div>

			{/* wave shimmer overlay */}
			<div className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-white/60 to-transparent" />
		</div>
	);
}

function TaskCardSkeleton({ isFirst }) {
	return (
		<div
			className={`relative w-156 h-20 flex items-center justify-between p-4 border-gray-200 bg-white overflow-hidden ${
				isFirst ? "border-t border-b" : "border-b"
			}`}
		>
			<div className="flex flex-col gap-2 w-1/2">
				<div className="h-3.5 w-1/4 bg-gray-200" />
				<div className="h-2.5 w-1/2 bg-gray-200" />
			</div>

			<div className="h-5 w-16 m-8 bg-gray-200" />

			{/* wave shimmer overlay */}
			<div className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-white/60 to-transparent" />
		</div>
	);
}

export default HomePage;
