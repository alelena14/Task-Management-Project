import Navbar from '../../components/layout/Navbar.jsx'
import React, {useEffect, useState} from "react";
import ProjectCard from "../../components/ui/ProjectCard.jsx";

function HomePage() {

    const [projects, setProjects] = useState([]);

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

            <div className="min-h-screen flex flex-col p-4">
                {/* Page title */}
                <div className="flex flex-col gap-2 p-4">
                    <p className=" text-4xl text-[#34113F] font-rotunda">
                        Workspace Overview
                    </p>
                    <p className="text-l text-gray-600">
                        Welcome back, dev. Focus on your tasks based on priority.
                    </p>
                </div>

                {/* Active projects */}
                <div className="flex flex-col gap-4 p-4">
                    <p className=" text-xl text-[#34113F] font-rotunda">
                        Active projects
                    </p>

                    <div className="flex flex-wrap gap-4">
                        {projects.map(project => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                onClick={(id) => console.log(id)}
                            />
                        ))}
                    </div>

                </div>


                {/* Tasks */}
                <div>

                </div>
            </div>
        </div> )
}

export default HomePage;