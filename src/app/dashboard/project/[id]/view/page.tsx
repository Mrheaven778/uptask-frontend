"use client";
import { getProject } from "@/api/ProjectAPI";
import AddTaskModal from "@/components/project/AddTaskModal";
import TaskList from "@/components/task/TaskList";
import PageNotFound from "@/components/ui/not-found/PageNotFound";
import { Post } from "@/interface/project";
import { useAuth } from "@/store/use-auth";
import { isManager } from "@/utils/policies";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

function ViewPage() {
  const { user } = useAuth();
  const { id } = useParams();
  const [newTask, setNewTask] = useState(false);
  const [project, setProject] = useState<Post>();
  const fetchProject = async () => {
    try {
      const project: Post = await getProject(id.toString());
      setProject(project);
    } catch (error) {
      toast.error("No se pudo cargar el proyecto");
    }
  };
  const resetData = async () => {
    await fetchProject();
  };
  useEffect(() => {
    fetchProject();
  });

  if (project === undefined) return <PageNotFound />;

  return (
    <div>
      <h1 className="text-5xl font-bold">{project.title}</h1>
      <p className="text-2xl font-light text-gray-300 mt-5">
        {project.content}
      </p>
      {isManager(user, project.managerId) && (
        <nav className="my-5 flex gap-3">
          <button
            type="button"
            className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors rounded-2xl"
            onClick={() => setNewTask(true)}
          >
            Agregar tarea
          </button>
          <Link
            href={`/dashboard/project/${project?.id}/team`}
            className="bg-fuchsia-600 hover:bg-fuchsia-700 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors rounded-2xl"
          >
            Colaboradores
          </Link>
        </nav>
      )}
      <AddTaskModal
        open={newTask}
        onClose={() => setNewTask(false)}
        id={project?.id || ""}
        resetdata={resetData}
      />
      <TaskList tasks={project?.tasks || []} resetdata={resetData} />
    </div>
  );
}

export default ViewPage;
