import React, {useState} from "react";

export default function TaskCard({ task, onClick, isFirst }) {

    const {
        id,
        title,
        description,
        priority,
        status,
        deadline,
        assignedUser,
        creator,
        projectId,
        createdAt
    } = task;

    function formatDeadline(deadline) {
        const today = new Date();
        const due = new Date(deadline);

        today.setHours(0, 0, 0, 0);
        due.setHours(0, 0, 0, 0);

        const diff =
            (due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);

        if (diff === 0) return "Today";
        if (diff === 1) return "Tomorrow";
        if (diff === -1) return "Yesterday";

        return due.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    }

    const priorityDivStyles = {
        HIGH: "bg-[#34113f]",
        MEDIUM: "bg-[#d0d1ff] border border-[#595b83]",
        LOW: "bg-[#e5e8f0] border border-[#cfc3cd]",
    };

    const prioritySpanStyles = {
        HIGH: "text-white",
        MEDIUM: "text-[#170020]",
        LOW: "text-[#4c444d]",
    };

    return (
        <button
            onClick={() => onClick?.(id)}
            className={`
              relative w-124 h-20 bg-white
              border-x border-b
              ${isFirst ? "border-t" : ""}
              border-[#cfc3cd]
              p-4
              shadow
              hover:shadow-2xl
              hover:scale-[1.02]
              transition-all
              duration-200
              cursor-pointer
              flex flex-col
            `}
        >
            <div className="flex flex-row justify-between h-full items-center align-middle">

                <div className="flex flex-col pt-1">

                    <p className="px-2 py-1 text-base font-rotunda text-[#44294d] text-left">
                        {title}
                    </p>

                    <div className="flex flex-row">

                        <span className="text-xs text-gray-500 text-left font-fabrikat px-2">
                                TASK-{id}
                        </span>

                        <span className="text-xs text-gray-500 text-left font-fabrikat px-2">
                                {formatDeadline(deadline)}
                        </span>

                    </div>

                </div>


                <div className={`flex p-1 m-8 ${priorityDivStyles[priority]}`}>
                    <span
                        className={`text-xs font-fabrikat ${prioritySpanStyles[priority]}`}
                    >
                        {priority}
                    </span>
                </div>

            </div>

        </button>
    );
}