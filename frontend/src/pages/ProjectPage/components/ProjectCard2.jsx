import React from "react";
import {ArrowRightIcon} from "lucide-react";

export default function ProjectCard2({ project, onClick, active }) {

    const {
        id,
        name,
        description,
        status,
        members,
        progress
    } = project;

    return (
        <button
            onClick={onClick}
            className={`relative w-80 bg-[#f8f9ff] border p-4 shadow hover:shadow-lg gap-2 transition flex flex-col cursor-pointer ${
                active ? "border-slate-900 shadow-md" : "border"
            }`}
        >
            <span className="text-xs text-gray-500 text-left font-fabrikat">
                    PROJ-{id}
                </span>

            <div className="flex absolute top-4 right-4 justify-end">
                <span className="text-xs font-fabrikat border bg-gray-200 p-1 text-black">
                    {status}
                </span>
            </div>

            <p className="mt-2 text-lg font-rotunda text-[#44294d] text-left">
                {name}
            </p>

            <p className="mt-2 text-sm text-gray-600 text-left">
                {description}
            </p>

            <div className="mt-4">
                <div className="flex justify-between text-xs text-gray-500 font-fabrikat mb-1">
                    <span>Progress</span>
                    <span>{progress}%</span>
                </div>

                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-[#34113F] transition-all duration-500"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            <div className="flex flex-row justify-between mt-auto border-t border-gray-200 pt-4">
                <div className="flex flex-row -space-x-2">
                    {members.map((m) => (
                        <div
                            key={m}
                            title={m}
                            className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-[11px] font-medium text-slate-600"
                        >
                            {m.slice(0, 2).toUpperCase()}
                        </div>
                    ))}
                </div>

                <div>
                    <ArrowRightIcon className="w-8 h-8 text-[#34113F]" />
                </div>

            </div>

        </button>
    );
}