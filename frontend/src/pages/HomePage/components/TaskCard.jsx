import React from "react";
import { formatDeadline } from "../../../utils/Utils.jsx";
import PriorityTag from "../../../components/ui/PriorityTag.jsx";

export default function TaskCard({ task, onClick, isFirst }) {
	const {
		id,
		title,
		description,
		priority,
		status,
		deadline,
		assignedUser,
		creator,
		projectId,
		createdAt,
	} = task;

	const priorityDivStyles = {
		HIGH: "bg-[#34113f]",
		MEDIUM: "bg-[#d0d1ff] border border-[#595b83]",
		LOW: "bg-[#e5e8f0] border border-[#cfc3cd]",
	};

	const prioritySpanStyles = {
		HIGH: "text-white",
		MEDIUM: "text-[#170020]",
		LOW: "text-[#4c444d]",
	};

	return (
		<button
			onClick={onClick}
			className={`
              relative w-156 h-20 bg-white
              border-x border-b
              ${isFirst ? "border-t" : ""}
              border-[#cfc3cd]
              p-4
              shadow
              hover:shadow-2xl
              hover:scale-[1.02]
              transition-all
              duration-200
              cursor-pointer
              flex flex-col
            `}
		>
			<div className="flex flex-row justify-between h-full items-center align-middle">
				<div className="flex flex-col pt-1">
					<p className="px-2 py-1 text-base font-rotunda text-[#44294d] text-left">
						{title}
					</p>

					<div className="flex flex-row">
						<span className="text-xs text-gray-500 text-left font-fabrikat px-2">
							TASK-{id}
						</span>

						<span className="text-xs text-gray-500 text-left font-fabrikat px-2">
							Due {formatDeadline(deadline)}
						</span>
					</div>
				</div>

				<PriorityTag priority={priority} />
			</div>
		</button>
	);
}
