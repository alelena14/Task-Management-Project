import React from "react";
import {
	CheckCircle2,
	CircleAlert,
	ListChecks,
	RefreshCcw,
} from "lucide-react";
import StatCard from "./StatCard";

function StatsGrid({ stats }) {
	return (
		<div className="grid grid-cols-4 gap-6">
			<StatCard
				icon={ListChecks}
				value={stats?.totalTasks ?? 0}
				label="Total Tasks"
				color="#34113F"
				progress={100}
			/>
			<StatCard
				icon={RefreshCcw}
				value={stats?.inProgress ?? 0}
				label="In Progress"
				color="#6366F1"
				progress={
					stats?.totalTasks
						? (stats.inProgress / stats.totalTasks) * 100
						: 0
				}
			/>
			<StatCard
				icon={CheckCircle2}
				value={stats?.done ?? 0}
				label="Done"
				color="#10B981"
				progress={
					stats?.totalTasks
						? (stats.done / stats.totalTasks) * 100
						: 0
				}
			/>

			<StatCard
				icon={CircleAlert}
				value={stats?.overdue ?? 0}
				label="Overdue"
			/>
		</div>
	);
}

export default StatsGrid;
