import { FilterGroup } from "./FilterGroup.jsx";

const STATUS_OPTIONS = [
	{ value: "", label: "All" },
	{ value: "TODO", label: "To Do" },
	{ value: "IN_PROGRESS", label: "In Progress" },
	{ value: "DONE", label: "Done" },
];

const PRIORITY_OPTIONS = [
	{ value: "", label: "All" },
	{ value: "LOW", label: "Low" },
	{ value: "MEDIUM", label: "Medium" },
	{ value: "HIGH", label: "High" },
];

export function FilterPanel({ status, setStatus, priority, setPriority }) {
	const hasActiveFilters = status !== "" || priority !== "";

	return (
		<div className="bg-white border p-5 flex flex-col gap-6 h-fit">
			<div className="flex items-center justify-between">
				<span className="text-lg font-rotunda text-[#34113F]">
					Filters
				</span>
				{hasActiveFilters && (
					<button
						onClick={() => {
							setStatus("");
							setPriority("");
						}}
						className="text-xs font-fabrikat tracking-wide uppercase text-gray-400 hover:text-[#34113F]"
					>
						Clear
					</button>
				)}
			</div>

			<FilterGroup
				label="Status"
				options={STATUS_OPTIONS}
				value={status}
				onChange={setStatus}
			/>

			<FilterGroup
				label="Priority"
				options={PRIORITY_OPTIONS}
				value={priority}
				onChange={setPriority}
			/>
		</div>
	);
}
