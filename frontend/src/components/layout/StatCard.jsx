export default function StatCard({
	icon: Icon,
	value,
	label,
	color = "#34113F",
	progress = null,
}) {
	return (
		<div className="bg-[#f8f9ff] border  p-4 flex flex-col gap-3">
			<div className="flex items-center justify-between">
				<Icon className="w-5 h-5" style={{ color }} />
				<span className="text-2xl font-fabrikat" style={{ color }}>
					{value}
				</span>
			</div>

			<span className="text-xs font-fabrikat tracking-wide text-gray-400 uppercase">
				{label}
			</span>

			{progress !== null && (
				<div className="w-full h-1.5 bg-gray-300 rounded-full overflow-hidden">
					<div
						className="h-full rounded-full transition-all duration-500"
						style={{
							width: `${progress}%`,
							backgroundColor: color,
						}}
					/>
				</div>
			)}
		</div>
	);
}
