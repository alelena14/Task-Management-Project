export function formatDeadline(deadline) {
	const today = new Date();
	const due = new Date(deadline);

	today.setHours(0, 0, 0, 0);
	due.setHours(0, 0, 0, 0);

	const diff = (due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);

	if (diff === 0) return "Today";
	if (diff === 1) return "Tomorrow";
	if (diff === -1) return "Yesterday";

	return due.toLocaleDateString("en-GB", {
		day: "2-digit",
		month: "short",
		year: "numeric",
	});
}
