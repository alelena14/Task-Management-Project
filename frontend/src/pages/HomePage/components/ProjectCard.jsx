import React from "react";
import ProjectTag from "../../../components/ui/ProjectTag.jsx";
import ProjectStatusTag from "../../../components/ui/ProjectStatusTag.jsx";

export default function ProjectCard({ project, onClick, active }) {
	const { id, name, description, status, members, progress } = project;

	return (
		<button
			onClick={onClick}
			className={`relative w-76 h-56 bg-white border p-4 shadow hover:shadow-lg gap-2 transition cursor-pointer flex flex-col ${
				active ? "border-slate-900 shadow-md" : "border"
			}`}
		>
			<ProjectTag project={`PROJ-${id}`} />

			<div className="flex absolute top-4 right-4 justify-end">
				<ProjectStatusTag status={status} />
			</div>

			<p className="mt-2 text-lg font-rotunda text-[#44294d] text-left">
				{name}
			</p>

			<p className="mt-2 text-sm text-gray-600 text-left line-clamp-2">
				{description}
			</p>

			<div className="mt-4">
				<div className="flex justify-between text-xs text-gray-500 font-fabrikat mb-1">
					<span>Progress</span>
					<span>{progress}%</span>
				</div>

				<div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
					<div
						className="h-full bg-[#34113F] transition-all duration-500"
						style={{ width: `${progress}%` }}
					/>
				</div>
			</div>

			<p className="mt-4 text-xs text-gray-500 text-left">
				{members.length} members
			</p>
		</button>
	);
}
