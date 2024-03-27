'use client';
import { deleteProject, getProjects } from '@/api/ProjectAPI'
import { Post } from '@/interface/project';
import React, { useEffect, useState } from 'react'
import ProjectCard from './ProjectCard';
import { toast } from "sonner";

function Project() {
    const [projects, setProjects] = useState([] as Post[]);
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const data: Post[] = await getProjects();
        setProjects(data);
    };

    const handleDeleteProject = async (id: string) => {
        await deleteProject(id);
        await fetchData();
        toast.success("Proyecto eliminado correctamente", { duration: 5000, position: "top-center", style: { backgroundColor: "#4B5563", color: "#F3F4F6" } });
    };

    if (!projects || projects.length === 0) return (<div className="text-center text-2xl text-gray-300 mt-10">No hay proyectos</div>);

    return (
        <ul role="list" className="divide-y divide-gray-700 border border-gray-700 mt-10 bg-gray-800 shadow-lg">
            {projects.map((project) => (
                <li key={project.id} className="flex justify-between gap-x-6 px-5 py-10 ">
                    <ProjectCard project={project} onDeleteProject={handleDeleteProject} />
                </li>
            ))}
        </ul>
    );
}

export default Project;
