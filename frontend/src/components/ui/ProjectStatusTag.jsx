import React from "react";

const projectStatusStyles = {
	ACTIVE: "bg-[#DCFCE7] text-[#166534] border border-[#86EFAC]",
	COMPLETED: "bg-[#EDE9FE] text-[#5B21B6] border border-[#C4B5FD]",
};

function ProjectStatusTag({ status }) {
	return (
		<span
			className={`text-xs font-fabrikat px-2 py-1 rounded-md border ${projectStatusStyles[status]}`}
		>
			{status}
		</span>
	);
}

export default ProjectStatusTag;
