import Navbar from '../../components/layout/Navbar.jsx'
import React, {useEffect, useState} from "react";
import ProjectCard2 from "./components/ProjectCard2.jsx";
import CreateProjectModal from "./components/CreateProjectModal.jsx";
import {Rocket} from "lucide-react";

function ProjectsPage() {

    const [projects, setProjects] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

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

    return (
        <div className="bg-[#e8ebe4]">
            <Navbar />

            <div className="min-h-screen flex flex-col p-6">
                {/* Page title */}
                <div className="flex flex-col gap-2 px-4 pb-6">
                    <p className=" text-4xl text-[#34113F] font-rotunda">
                        Projects
                    </p>
                </div>

                {/* Projects */}
                <div className="flex flex-col gap-4 p-4">

                    <div className="grid grid-cols-4 gap-8">
                        {projects.map(project => (
                            <ProjectCard2
                                key={project.id}
                                project={project}
                                onClick={() => console.log(project.id)}
                            />
                        ))}

                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="group relative w-80 border-2 border-dashed p-4 shadow hover:shadow-lg gap-2 flex flex-col cursor-pointer items-center justify-center"
                        >
                            <div className="flex flex-col items-center justify-center">

                                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                                    <Rocket size={22} className="text-gray-500" />
                                </div>

                                <p className="text-base font-rotunda text-gray-800">
                                    Launch a new idea?
                                </p>

                                <p className="font-fabrikat text-gray-400 underline transition-colors group-hover:text-[#34113F] group-hover:text-lg trasition-all delay-100 duration-300 ease-in-out-">
                                    Add New Project
                                </p>

                            </div>
                        </button>
                    </div>
                </div>
            </div>

            <CreateProjectModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />

        </div> )
}

export default ProjectsPage;