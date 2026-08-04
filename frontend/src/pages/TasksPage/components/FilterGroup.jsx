import React from "react";

export function FilterGroup({ label, options, value, onChange }) {
	return (
		<div className="flex flex-col gap-1.5">
			<span className="text-xs font-fabrikat tracking-wide uppercase text-gray-400">
				{label}
			</span>

			<div className="flex flex-col gap-1">
				{options.map((opt) => (
					<button
						key={opt.value}
						onClick={() => onChange(opt.value)}
						className={`text-left px-3 py-1.5 text-xs font-rotunda transition-colors ${
							value === opt.value
								? "bg-[#34113F] text-white"
								: "bg-[#f8f9ff] text-gray-500 hover:bg-gray-100"
						}`}
					>
						{opt.label}
					</button>
				))}
			</div>
		</div>
	);
}
