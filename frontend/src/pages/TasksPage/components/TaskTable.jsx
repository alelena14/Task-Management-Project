import { useState } from "react";
import { ChevronLeft, ChevronRight, Clock3 } from "lucide-react";
import ProjectTag from "../../../components/ui/ProjectTag.jsx";
import PriorityTag from "../../../components/ui/PriorityTag.jsx";
import { formatDeadline } from "../../../utils/Utils.jsx";
import StatusTag from "../../../components/ui/StatusTag.jsx";

const PAGE_SIZE = 4;

export default function TasksTable({ tasks, onTaskClick }) {
	const [page, setPage] = useState(0);

	if (!tasks.length) {
		return (
			<div className="p-10 text-center text-gray-500 font-fabrikat">
				No tasks found.
			</div>
		);
	}

	const pageCount = Math.max(1, Math.ceil(tasks.length / PAGE_SIZE));
	const safePage = Math.min(page, pageCount - 1);

	const pageTasks = tasks.slice(
		safePage * PAGE_SIZE,
		safePage * PAGE_SIZE + PAGE_SIZE,
	);

	const from = safePage * PAGE_SIZE + 1;
	const to = Math.min(safePage * PAGE_SIZE + PAGE_SIZE, tasks.length);

	return (
		<div className="flex flex-col">
			<table className="w-full">
				<thead className="border-b bg-gray-50 border-t">
					<tr className="text-left text-xs uppercase tracking-wide text-gray-500">
						<th className="w-[35%] p-4">Task</th>
						<th className="w-[15%]">Priority</th>
						<th className="w-[18%]">Status</th>
						<th className="w-[17%]">Project</th>
						<th className="w-[15%]">Deadline</th>
					</tr>
				</thead>

				<tbody>
					{pageTasks.map((task) => (
						<tr
							key={task.id}
							onClick={() => onTaskClick(task)}
							className="border-b hover:bg-gray-50 transition cursor-pointer border-x"
						>
							<td className="p-4">
								<p className="font-semibold text-[#34113F]">
									{task.title}
								</p>

								{task.description && (
									<p className="text-sm text-gray-600 mt-1 line-clamp-1">
										{task.description}
									</p>
								)}
							</td>

							<td>
								<PriorityTag priority={task.priority} />
							</td>

							<td>
								<StatusTag status={task.status} />
							</td>

							<td>
								<ProjectTag
									project={
										task.projectName ??
										`PROJ-${task.projectId}`
									}
								/>
							</td>

							<td>
								<div className="flex items-center gap-2 text-sm text-gray-600">
									<Clock3 size={16} />
									<p>{formatDeadline(task.deadline)}</p>
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>

			<div className="flex items-center justify-between px-4 py-3 border-b">
				<span className="text-xs font-fabrikat text-gray-700">
					Showing {from}-{to} of {tasks.length} tasks
				</span>

				<div className="flex items-center gap-2">
					<button
						onClick={() => setPage((p) => Math.max(0, p - 1))}
						disabled={safePage === 0}
						className="w-7 h-7 flex items-center justify-center border border-gray-300 text-gray-500 disabled:opacity-30 hover:bg-gray-50"
					>
						<ChevronLeft className="w-4 h-4" />
					</button>
					<button
						onClick={() =>
							setPage((p) => Math.min(pageCount - 1, p + 1))
						}
						disabled={safePage >= pageCount - 1}
						className="w-7 h-7 flex items-center justify-center border border-gray-300 text-gray-500 disabled:opacity-30 hover:bg-gray-50"
					>
						<ChevronRight className="w-4 h-4" />
					</button>
				</div>
			</div>
		</div>
	);
}
