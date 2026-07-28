        import {InfoRow, Sidebar, SidebarHeader} from "./SidebarHelpers.jsx";
        import React, {useEffect, useState} from "react";
        import { ClockCheckIcon } from "lucide-react";


        export function ProjectSidebar({ project, onClose }) {
            if (!project) return null;
            const [stats, setStats] = useState([]);

            useEffect(() => {
                if (!project) return;

                const fetchStats = async () => {
                    const token = localStorage.getItem("token");

                    try {
                        const response = await fetch(
                            `http://localhost:8080/projects/${project.id}/stats`,
                            {
                                method: "GET",
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                    "Content-Type": "application/json",
                                },
                            }
                        );

                        if (!response.ok) {
                            throw new Error(`HTTP ${response.status}`);
                        }

                        const data = await response.json();
                        setStats(data);
                    } catch (error) {
                        console.error(error);
                    }
                };

                fetchStats();
            }, [project]);

            function formatDate(dateString) {
                const date = new Date(dateString);

                return date.toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                });
            }

            return (
                <Sidebar open={!!project} onClose={onClose}>
                    <SidebarHeader onClose={onClose}>
                        <p className="font-rotunda text-[#34113F] text-2xl leading-snug pr-2">{project.name}</p>
                        <span className="text-xs font-fabrikat border bg-gray-200 p-1 text-black">
                            {project.status}
                        </span>
                    </SidebarHeader>

                    <div className="px-5 py-2 overflow-y-auto" style={{ maxHeight: "calc(100% - 180px)" }}>
                        <div className="mt-2">
                            <div className="flex justify-between text-xs text-gray-500 font-fabrikat mb-1">
                                <span>Progress</span>
                                <span>{project.progress}%</span>
                            </div>

                            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-[#34113F] transition-all duration-500"
                                    style={{ width: `${project.progress}%` }}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-2 mb-5 pt-4">
                            <div className="w-24 h-16 border bg-slate-50 p-2 text-center ">
                                <p className="text-lg font-fabrikat text-slate-900">{stats.todo}</p>
                                <p className="text-[12px] font-fabrikat text-slate-400">To do</p>
                            </div>
                            <div className="w-24 h-16 border bg-blue-50  p-2 text-center">
                                <p className="text-lg font-fabrikat text-blue-700">{stats.inProgress}</p>
                                <p className="text-[12px] font-fabrikat text-blue-400">In progress</p>
                            </div>
                            <div className="w-24 h-16 border bg-emerald-50  p-2 text-center">
                                <p className="text-lg font-fabrikat text-emerald-700">{stats.done}</p>
                                <p className="text-[12px] font-fabrikat text-emerald-400">Done</p>
                            </div>
                        </div>

                        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Members</h3>
                        <div className="flex -space-x-2 mb-5">
                            {project.members.map((m) => (
                                <div
                                    key={m}
                                    title={m}
                                    className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-[11px] font-medium text-slate-600"
                                >
                                    {m.slice(0, 2).toUpperCase()}
                                </div>
                            ))}
                        </div>

                        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Description</h3>
                        <p className="text-sm text-slate-600 leading-relaxed mb-5">{project.description}</p>

                        <div className="divide-y divide-slate-50">
                            <InfoRow icon={ClockCheckIcon} label="Created" value={formatDate(project.createdAt)} />
                            {project.deadline && <InfoRow label="Deadline" value={formatDate(project.deadline)} />}
                        </div>
                    </div>
                </Sidebar>
            );
        }
