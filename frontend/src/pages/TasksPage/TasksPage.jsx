import Navbar from "../../components/layout/Navbar.jsx";
import StatsGrid from "../../components/layout/StatsGrid.jsx";
import {
	useMyTasks,
	useMyTaskStats,
	useUpdateTask,
} from "../../hooks/useTasks.jsx";
import TasksTable from "./components/TaskTable.jsx";
import { TaskSidebar } from "../HomePage/components/TaskSidebar.jsx";
import React, { useState } from "react";

function TasksPage() {
	const { data: tasks = [], isLoading } = useMyTasks();
	const { data: stats } = useMyTaskStats();

	const [selectedTask, setSelectedTask] = useState(null);

	const pickTask = (task) => {
		setSelectedTask(task);
	};

	const updateTaskMutation = useUpdateTask();

	const markTaskAsDone = (taskId) => {
		setSelectedTask((prev) => ({
			...prev,
			status: "DONE",
		}));

		updateTaskMutation.mutate({
			taskId,
			body: {
				status: "DONE",
			},
		});
	};

	return (
		<div className="min-h-screen bg-[#f7f7f7]">
			<Navbar />

			<div className="max-w-7xl p-8 pl-12">
				<div className="mb-8">
					<p className="text-4xl font-rotunda text-[#34113F]">
						My Tasks
					</p>
					<p className="text-gray-500 font-fabrikat mt-2">
						Track your assigned work and stay focused.
					</p>
				</div>

				<StatsGrid stats={stats} />

				<div className="mt-8 grid grid-cols-3 gap-8">
					<div className="col-span-2">
						<div className="bg-white border border-gray-200">
							{isLoading ? (
								<p className="p-10 text-center text-gray-700 font-fabrikat">
									Loading tasks...
								</p>
							) : (
								<TasksTable
									tasks={tasks}
									onTaskClick={pickTask}
								/>
							)}
						</div>
					</div>
				</div>
			</div>

			<TaskSidebar
				task={selectedTask}
				onClose={() => setSelectedTask(null)}
				onSetDone={markTaskAsDone}
			/>
		</div>
	);
}

export default TasksPage;
