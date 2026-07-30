import { InfoRow, Sidebar, SidebarHeader } from "./SidebarHelpers.jsx";
import React from "react";
import {
	CalendarIcon,
	FolderOpenIcon,
	LucideClock,
	UserRoundIcon,
} from "lucide-react";
import { formatDeadline } from "../../../utils/Utils.jsx";

export function TaskSidebar({ task, onClose, onSetDone }) {
	if (!task) return null;

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
		<Sidebar open={!!task} onClose={onClose}>
			<SidebarHeader onClose={onClose}>
				<p className="font-rotunda text-[#34113F] text-2xl leading-snug pr-2">
					{task.title}
				</p>
				<div className="flex flex-row gap-4">
					<span className="text-xs font-fabrikat border bg-gray-200 p-1 text-black">
						{task.status}
					</span>

					<div
						className={`flex p-1 ${priorityDivStyles[task.priority]}`}
					>
						<span
							className={`text-xs font-fabrikat ${prioritySpanStyles[task.priority]}`}
						>
							{task.priority}
						</span>
					</div>
				</div>
			</SidebarHeader>

			<div
				className="px-5 py-2 overflow-y-auto"
				style={{ maxHeight: "calc(100% - 180px)" }}
			>
				<div className="divide-y divide-slate-50 mb-5">
					<InfoRow
						icon={CalendarIcon}
						label="Deadline"
						value={formatDeadline(task.deadline)}
					/>
					<InfoRow
						icon={UserRoundIcon}
						label="Assignee"
						value={task.assignedUserName}
					/>
					<InfoRow
						icon={UserRoundIcon}
						label="Creator"
						value={task.creator}
					/>
					<InfoRow
						icon={FolderOpenIcon}
						label="Project"
						value={task.projectId}
					/>
					<InfoRow
						icon={LucideClock}
						label="Created"
						value={formatDeadline(task.createdAt)}
					/>
				</div>

				<h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">
					Description
				</h3>
				<p className="text-sm text-slate-600 leading-relaxed">
					{task.description}
				</p>

				{task.status !== "DONE" && (
					<div className="mt-6">
						<button
							onClick={() => onSetDone(task.id)}
							className="w-full bg-[#34113F] text-white py-3 font-fabrikat hover:opacity-90"
						>
							Mark as Done
						</button>
					</div>
				)}
			</div>
		</Sidebar>
	);
}
