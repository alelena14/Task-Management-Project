import React from "react";
import { ArrowRightIcon } from "lucide-react";
import ProjectTag from "../../../components/ui/ProjectTag.jsx";

export default function ProjectCard2({ project, onClick, active }) {
	const { id, name, description, status, members, progress } = project;

	return (
		<button onClick={onClick} className="h-60">
			<div
				className={`group relative w-80 h-full bg-[#f8f9ff] border p-4 shadow hover:shadow-lg hover:translate-2 gap-2 transition flex flex-col cursor-pointer ${
					active ? "border-slate-900 shadow-md" : "border"
				}`}
			>
				<ProjectTag project={`PROJ-${id}`} />

				<div className="flex absolute top-4 right-4 justify-end">
					<span className="text-xs font-fabrikat border bg-gray-200 p-1 text-black">
						{status}
					</span>
				</div>

				<p className="mt-2 text-lg font-rotunda text-[#44294d] text-left">
					{name}
				</p>

				<p className="mt-2 text-sm text-gray-600 text-left line-clamp-2">
					{description}
				</p>

				<div className="mt-auto">
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

					<div className="flex items-center justify-between mt-auto border-t border-gray-200 pt-4">
						<div className="flex -space-x-2">
							{members.map((m) => (
								<div
									key={m.id}
									title={m.id}
									className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-[11px] font-medium text-slate-600"
								>
									{m.fullName.slice(0, 2).toUpperCase()}
								</div>
							))}
						</div>

						<ArrowRightIcon className="w-8 h-8 text-[#34113F] transition-transform duration-500 ease-out group-hover:translate-x-2 group-hover:scale-125" />
					</div>
				</div>
			</div>
		</button>
	);
}

export function ProjectCard2Skeleton() {
	return (
		<div className="relative w-80 h-60 border-2 border-gray-200 bg-white p-4 overflow-hidden">
			<div className="flex flex-col gap-3">
				<div className="h-2 w-1/3 mb-2 bg-gray-200" />
				<div className="h-3 w-1/2 mb-2 bg-gray-200" />

				<div className="mt-4 flex flex-col gap-2">
					<div className="h-2 w-full bg-gray-200" />
					<div className="h-2 w-5/6 bg-gray-200" />
				</div>

				<div className="mt-auto h-2 w-1/3 bg-gray-200" />
			</div>

			<div className="flex flex-row justify-between mt-8 border-t border-gray-200 pt-4">
				<div className="flex flex-row -space-x-2">
					{Array.from({ length: 3 }).map((_, index) => (
						<div
							key={index}
							className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-[11px] font-medium text-slate-600"
						></div>
					))}
				</div>

				<div>
					<ArrowRightIcon className="w-8 h-8 text-gray-500" />
				</div>
			</div>

			{/* wave shimmer overlay */}
			<div className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-white/60 to-transparent" />
		</div>
	);
}
