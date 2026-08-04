import { useEffect, useState } from "react";
import { useCurrentUser } from "../../../hooks/useUsers.js";

export default function NotesPanel() {
	const [notes, setNotes] = useState("");
	const { data: currentUser } = useCurrentUser();

	useEffect(() => {
		const saved = localStorage.getItem(`home-notes-${currentUser?.id}`);

		if (saved) {
			setNotes(saved);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem("home-notes", notes);
	}, [notes]);

	return (
		<div className="bg-white h-60 border border-gray-300 p-5 flex flex-col">
			<p className="text-xl font-rotunda text-[#34113F] mb-4">
				Personal Notes
			</p>

			<textarea
				value={notes}
				onChange={(e) => setNotes(e.target.value)}
				placeholder="Write anything here..."
				className="flex-1 w-full resize-none border border-gray-300 p-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#34113F]"
			/>
		</div>
	);
}
