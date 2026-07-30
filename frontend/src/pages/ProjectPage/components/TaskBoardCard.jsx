import { useDraggable } from "@dnd-kit/core";
import React from "react";
import { formatDeadline } from "../../../utils/Utils.jsx";
import { Trash } from "lucide-react";

export default function TaskBoardCard({
	task,
	currentUser,
	onClick,
	isOwner,
	onDelete,
}) {
	const canDrag = task.assignedUserId === currentUser?.id || isOwner;

	const { attributes, listeners, setNodeRef, transform } = useDraggable({
		id: task.id,
		disabled: !canDrag,
	});

	const priorityStyles = {
		HIGH: "bg-[#34113f] text-white",
		MEDIUM: "bg-[#d0d1ff] border border-[#595b83] text-[#170020]",
		LOW: "bg-[#e5e8f0] border border-[#cfc3cd] text-[#4c444d]",
	};
	const style = transform
		? {
				transform: `translate(${transform.x}px, ${transform.y}px)`,
			}
		: undefined;

	return (
		<div
			ref={setNodeRef}
			{...listeners}
			{...attributes}
			style={style}
			onClick={onClick}
			className="text-left bg-white border border-gray-200 p-4 flex flex-col gap-2 hover:shadow-md transition-shadow cursor-pointer"
		>
			<div className="flex items-center justify-between">
				<span className="text-xs font-fabrikat text-gray-400">
					TASK-{task.id}
				</span>
				<div className="flex items-center justify-between gap-1">
					<span
						className={`text-xs font-fabrikat px-2 py-0.5 uppercase tracking-wide ${
							priorityStyles[task.priority] || priorityStyles.LOW
						}`}
					>
						{task.priority}
					</span>

					{isOwner && (
						<button
							onClick={(e) => {
								e.stopPropagation();
								onDelete(task);
							}}
							className="border border-red-500 text-red-600 px-2 py-1 text-xs font-fabrikat hover:bg-red-50 z-40"
						>
							<Trash size={15} />
						</button>
					)}
				</div>
			</div>

			<p className="text-sm font-rotunda text-[#34113F] leading-snug">
				{task.title}
			</p>

			<div className="flex items-center justify-between mt-2">
				<p className="text-xs text-gray-500 text-right font-fabrikat px-2">
					{task.assignedUserName}
				</p>

				<p className="text-xs text-gray-500 text-left font-fabrikat px-2">
					Due {formatDeadline(task.deadline)}
				</p>
			</div>
		</div>
	);
}
