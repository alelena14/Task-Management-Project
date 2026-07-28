import { Link } from "react-router-dom";
import {
    FiBell,
    FiSettings
} from "react-icons/fi";

function Navbar() {
    return (
        <nav className="w-full sticky top-0 border-b z-40 bg-white">
            <div className="mx-6 flex h-16 items-center justify-between px-4">
                {/* Left */}
                <div className="flex items-center gap-10">
                    <Link
                        to="/"
                        className="text-2xl font-bold text-slate-900"
                    >
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

                        <Link
                            to="/users/me"
                            className="transition hover:text-black"
                        >
                            Profile
                        </Link>

                    </div>
                </div>

                {/* Right */}
                <div className="flex items-center gap-6">
                    <button className="text-gray-600 transition hover:text-black">
                        <FiBell size={18} />
                    </button>

                    <button className="text-gray-600 transition hover:text-black">
                        <FiSettings size={18} />
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;