import { useDroppable } from "@dnd-kit/core";
import { MoreHorizontal } from "lucide-react";
import TaskBoardCard from "./TaskBoardCard.jsx";

export default function KanbanColumn({
	title,
	tasks,
	dotColor,
	accent,
	onTaskClick,
	id,
	currentUser,
	isOwner,
	onDeleteTask,
}) {
	const { setNodeRef } = useDroppable({
		id,
	});

	return (
		<div
			ref={setNodeRef}
			className={`flex flex-col gap-3 w-65 flex-1 ${
				accent ? "border-l-2 pl-4" : ""
			}`}
			style={accent ? { borderColor: "#34113F" } : {}}
		>
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<span
						className="w-2 h-2 rounded-full"
						style={{ backgroundColor: dotColor }}
					/>
					<span className="text-xs font-fabrikat tracking-wide text-gray-500 uppercase">
						{title}
					</span>
					<span className="text-xs font-fabrikat text-gray-400">
						{tasks.length}
					</span>
				</div>
				<MoreHorizontal className="w-4 h-4 text-gray-300 cursor-pointer" />
			</div>

			<div className="flex flex-col gap-3">
				{tasks.map((task) => (
					<TaskBoardCard
						key={task.id}
						task={task}
						currentUser={currentUser}
						isOwner={isOwner}
						onClick={() => onTaskClick(task)}
						onDelete={onDeleteTask}
					/>
				))}
			</div>
		</div>
	);
}
