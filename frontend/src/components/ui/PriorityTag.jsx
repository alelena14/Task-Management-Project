import React from "react";

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

function PriorityTag({ priority }) {
	return (
		<div
			className={`inline-flex items-center px-2 py-1 ${priorityDivStyles[priority]}`}
		>
			<span
				className={`text-xs font-fabrikat ${prioritySpanStyles[priority]}`}
			>
				{priority}
			</span>
		</div>
	);
}

export default PriorityTag;
