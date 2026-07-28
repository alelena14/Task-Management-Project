import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";

function CreateProjectModal({ isOpen, onClose }) {
    const modalRef = useRef(null);

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
                            Project Name
                        </label>
                        <input
                            type="text"
                            placeholder="e.g. Quantum Neural Bridge"
                            className="w-full bg-white border border-gray-300 px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#34113F]"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-fabrikat tracking-wide text-gray-500 uppercase">
                            Description
                        </label>
                        <textarea
                            placeholder="Briefly describe the project goals..."
                            rows={4}
                            className="w-full bg-white border border-gray-300 px-3 py-2 text-sm text-gray-700 resize-none focus:outline-none focus:ring-1 focus:ring-[#34113F]"
                        />
                    </div>
                </div>

                {/* Footer */}
                <div className="flex gap-3 px-6 pb-6">
                    <button
                        onClick={() => {
                            // TODO: aici vei adauga logica de creare a proiectului
                        }}
                        className="flex-1 bg-[#34113F] text-white text-sm font-fabrikat tracking-wide py-2.5 hover:bg-[#4a1b58] transition"
                    >
                        CREATE PROJECT
                    </button>
                    <button
                        onClick={onClose}
                        className="flex-1 border border-gray-300 text-gray-600 text-sm font-fabrikat tracking-wide py-2.5 hover:bg-gray-100 transition"
                    >
                        CANCEL
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CreateProjectModal;