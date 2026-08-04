import { Link, useNavigate } from "react-router-dom";

import { FiLogOut } from "react-icons/fi";
import { useCurrentUser } from "../../hooks/useUsers.js";

function Navbar() {
	const { data: currentUser } = useCurrentUser();
	const isAdmin = currentUser && currentUser.role === "ADMIN";
	const navigate = useNavigate();

	const handleLogout = () => {
		localStorage.removeItem("token");
		navigate("/login");
	};

	return (
		<nav className="w-full sticky top-0 border-b z-40 bg-white">
			<div className="mx-6 flex h-16 items-center justify-between px-4">
				{/* Left */}
				<div className="flex items-center gap-10">
					<Link to="/" className="text-2xl font-bold text-slate-900">
						DevZen
					</Link>

					<div className="flex items-center gap-8 text-sm text-gray-600">
						<Link
							to="/tasks"
							className="transition hover:text-black"
						>
							Tasks
						</Link>
						<Link
							to="/projects"
							className="transition hover:text-black"
						>
							Projects
						</Link>

						{isAdmin && (
							<Link
								to="/admin"
								className="transition hover:text-black"
							>
								Admin Panel
							</Link>
						)}
					</div>
				</div>

				{/* Right */}
				<div className="flex items-center gap-6">
					<button
						onClick={handleLogout}
						className="text-gray-600 transition hover:text-red-600"
						title="Logout"
					>
						<FiLogOut size={18} />
					</button>
				</div>
			</div>
		</nav>
	);
}

export default Navbar;
