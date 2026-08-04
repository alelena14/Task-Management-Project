import React, { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { useCreateTask } from "../../../hooks/useTasks.jsx";

function CreateTaskModal({ isOpen, onClose, onTaskCreated, project }) {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [priority, setPriority] = useState("LOW");
	const [deadline, setDeadline] = useState("");
	const [assignedUserId, setAssignedUserId] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const modalRef = useRef(null);
	const createTaskMutation = useCreateTask();
	const [error, setError] = useState("");

	useEffect(() => {
		if (!isOpen) return;
		const handleKeyDown = (e) => {
			if (e.key === "Escape") onClose();
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [isOpen, onClose]);

	if (!isOpen) return null;

	const handleBackdropClick = (e) => {
		if (modalRef.current && !modalRef.current.contains(e.target)) {
			onClose();
		}
	};

	const handleCreateTask = async () => {
		setError("");

		if (!title.trim()) {
			setError("Task title is required.");
			return;
		}

		if (!deadline) {
			setError("Deadline is required.");
			return;
		}

		if (!assignedUserId) {
			setError("Assigned user is required.");
			return;
		}

		setIsSubmitting(true);

		try {
			await createTaskMutation.mutateAsync({
				title,
				description,
				priority,
				deadline,
				assignedUserId,
				projectId: project.id,
			});

			setTitle("");
			setDescription("");
			setPriority("LOW");
			setDeadline("");
			setAssignedUserId("");
			setError("");

			onClose();
		} catch (error) {
			setError(error.response?.data?.message || "Failed to create task.");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center bg-[#220b29]/40 backdrop-blur-sm"
			onClick={handleBackdropClick}
		>
			<div
				ref={modalRef}
				className="w-full max-w-md bg-[#f4f4f2] rounded-lg border border-gray-300 shadow-xl"
			>
				{/* Header */}
				<div className="flex items-center justify-between px-6 py-4 border-b border-gray-300">
					<p className="text-lg font-rotunda text-[#34113F]">
						Create New Project
					</p>
					<button
						onClick={onClose}
						className="text-gray-400 hover:text-gray-600 transition"
					>
						<X size={20} />
					</button>
				</div>

				{/* Body */}
				<div className="flex flex-col gap-5 px-6 py-6">
					<div className="flex flex-col gap-2">
						<label className="text-xs font-fabrikat tracking-wide text-gray-500 uppercase">
							Task Title
						</label>
						<input
							type="text"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							placeholder="e.g. Plan the Quantum Neural Bridge"
							className="w-full bg-white border border-gray-300 px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#34113F]"
						/>
					</div>

					<div className="flex flex-col gap-2">
						<label className="text-xs font-fabrikat tracking-wide text-gray-500 uppercase">
							Description
						</label>
						<textarea
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							placeholder="Briefly describe the task goals..."
							rows={4}
							className="w-full bg-white border border-gray-300 px-3 py-2 text-sm text-gray-700 resize-none focus:outline-none focus:ring-1 focus:ring-[#34113F]"
						/>
					</div>

					<div className="flex flex-col gap-2">
						<label className="text-xs font-fabrikat tracking-wide text-gray-500 uppercase">
							Priority
						</label>

						<select
							value={priority}
							onChange={(e) => setPriority(e.target.value)}
							className="bg-white border border-gray-300 px-3 py-2 text-sm"
						>
							<option value="LOW">Low</option>
							<option value="MEDIUM">Medium</option>
							<option value="HIGH">High</option>
						</select>
					</div>

					<div className="flex flex-col gap-2">
						<label className="text-xs font-fabrikat tracking-wide text-gray-500 uppercase">
							Deadline
						</label>

						<input
							type="datetime-local"
							value={deadline}
							onChange={(e) => setDeadline(e.target.value)}
							className="bg-white border border-gray-300 px-3 py-2 text-sm"
						/>
					</div>

					<div className="flex flex-col gap-2">
						<label className="text-xs font-fabrikat tracking-wide text-gray-500 uppercase">
							Assigned User
						</label>

						<select
							value={assignedUserId}
							onChange={(e) =>
								setAssignedUserId(Number(e.target.value))
							}
							className="bg-white border border-gray-300 px-3 py-2 text-sm"
						>
							<option value="">Select a member...</option>

							{project.members.map((member) => (
								<option key={member.id} value={member.id}>
									{member.fullName}
								</option>
							))}
						</select>
					</div>
				</div>

				{error && (
					<p className="px-6 pb-2 text-sm text-red-600">{error}</p>
				)}

				{/* Footer */}
				<div className="flex gap-3 px-6 pb-6">
					<button
						onClick={handleCreateTask}
						disabled={isSubmitting}
						className="flex-1 bg-[#34113F] text-white text-sm font-fabrikat tracking-wide py-2.5 hover:bg-[#4a1b58] disabled:opacity-50 transition cursor-pointer"
					>
						{isSubmitting ? "CREATING..." : "CREATE TASK"}
					</button>

					<button
						onClick={onClose}
						className="flex-1 border border-gray-300 text-gray-600 text-sm font-fabrikat tracking-wide py-2.5 hover:bg-gray-100 transition cursor-pointer"
					>
						CANCEL
					</button>
				</div>
			</div>
		</div>
	);
}

export default CreateTaskModal;
