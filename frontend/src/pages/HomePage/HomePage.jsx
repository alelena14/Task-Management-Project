import Navbar from '../../components/layout/Navbar.jsx'
import React, {useEffect, useState} from "react";
import TaskCard from "./components/TaskCard.jsx";
import ProjectCard from "./components/ProjectCard.jsx";
import {ProjectSidebar} from "./components/ProjectSidebar.jsx";
import {TaskSidebar} from "./components/TaskSidebar.jsx";

function HomePage() {

    const [projects, setProjects] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);
    const [selectedProject, setSelectedProject] = useState(null);

    const pickTask = (task) => {
        setSelectedTask(task);
        setSelectedProject(null);
    };
    const pickProject = (project) => {
        setSelectedProject(project);
        setSelectedTask(null);
    };


    useEffect(() => {
        const fetchProjects = async () => {
            const token = localStorage.getItem("token");

            try {
                const response = await fetch("http://localhost:8080/projects", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch projects");
                }

                const data = await response.json();
                setProjects(data);

            } catch (error) {
                console.error(error);
            }
        };

        fetchProjects()
    }, []);

    useEffect(() => {
        const fetchTasks = async () => {
            const token = localStorage.getItem("token");

            try {
                const response = await fetch("http://localhost:8080/tasks/my-tasks", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch projects");
                }

                const data = await response.json();
                setTasks(data.content);

            } catch (error) {
                console.error(error);
            }
        };

        fetchTasks()
    }, []);

    return (
        <div className="bg-[#e8ebe4]">
            <Navbar />

            <div className="min-h-screen flex flex-col p-4">
                {/* Page title */}
                <div className="flex flex-col gap-2 px-4">
                    <p className=" text-4xl text-[#34113F] font-rotunda">
                        Workspace Overview
                    </p>
                    <p className="text-l text-gray-600">
                        Welcome back, dev. Focus on your tasks based on priority.
                    </p>
                </div>

                {/* Projects */}
                <div className="flex flex-col gap-4 p-4">
                    <p className=" text-xl text-[#34113F] font-rotunda">
                        Active projects
                    </p>

                    <div className="flex flex-wrap gap-4">
                        {projects.map(project => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                active={selectedProject?.id === project.id}
                                onClick={() => pickProject(project)}

                            />
                        ))}
                    </div>

                </div>


                {/* Tasks */}
                <div>
                    <div className="flex flex-col gap-4 p-4">
                        <p className="text-xl text-[#34113F] font-rotunda">
                            Recent Tasks
                        </p>

                        {tasks.length === 0 ? (
                            <p className="text-sm text-gray-500">
                                No tasks found.
                            </p>
                        ) : (
                            <div className="flex flex-col">
                                {tasks.map((task, index) => (
                                    <TaskCard
                                        key={task.id}
                                        task={task}
                                        isFirst={index === 0}
                                        onClick={() => pickTask(task)}
                                    />
                                ))}
                            </div>
                            )
                        }
                    </div>
                </div>
            </div>

            <ProjectSidebar project={selectedProject} onClose={() => setSelectedProject(null)} />
            <TaskSidebar task={selectedTask} onClose={() => setSelectedTask(null)} />

        </div> )
}

export default HomePage;