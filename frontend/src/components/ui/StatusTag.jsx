import React from "react";

const statusSpanStyles = {
	DONE: "text-[#21662a]",
	IN_PROGRESS: "text-[#4c444d]",
	TODO: "text-gray-600",
};

function StatusTag({ status }) {
	return (
		<span className={`text-sm font-fabrikat ${statusSpanStyles[status]}`}>
			{status}
		</span>
	);
}

export default StatusTag;
