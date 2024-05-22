"use client";
import React, { useEffect, useState } from "react";
import { getProject, getTasks } from "@/api/ProjectAPI";
import AddTaskModal from "@/components/project/AddTaskModal";
import TaskList from "@/components/task/TaskList";
import PageNotFound from "@/components/ui/not-found/PageNotFound";
import { Post, Task } from "@/interface/project";
import { useAuth } from "@/store/use-auth";
import { isManager } from "@/utils/policies";
import Link from "next/link";
import { useParams } from "next/navigation";
import { toast } from "sonner";

function ViewPage() {
  const { user } = useAuth();
  const { id } = useParams();
  const [newTask, setNewTask] = useState(false);
  const [project, setProject] = useState<Post>();
  const [tasks, setTasks] = useState<Task[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const fetchProject = async (): Promise<void> => {
    try {
      const project: Post = await getProject(id.toString());
      setProject(project);
      setIsLoading(false);
    } catch (error) {
      toast.error("No se pudo cargar el proyecto", {
        duration: 5000,
        position: "top-center",
        style: { backgroundColor: "#4B5563", color: "#F3F4F6" },
      });
      setIsLoading(false);
    }
  };
  const fecthTasks = async (): Promise<void> => {
    try {
      const tasks = await getTasks(id.toString());
      setTasks(tasks);
    } catch (error) {
      toast.error("No se pudo cargar las tareas", {
        duration: 5000,
        position: "top-center",
        style: { backgroundColor: "#4B5563", color: "#F3F4F6" },
      });
    }
  };
  const resetData = async (): Promise<void> => {
    await fetchProject();
    await fecthTasks();
  };
  useEffect((): void => {
    fetchProject();
    fecthTasks();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }
  if (project === undefined) return <PageNotFound />;

  return (
    <div>
      <h1 className="text-5xl font-bold">{project.title}</h1>
      <p className="text-2xl font-light text-gray-300 mt-5">
        {project.content}
      </p>
      <nav className="my-5 flex gap-3">
        <button
          type="button"
          className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors rounded-2xl"
          onClick={() => setNewTask(true)}
        >
          Agregar tarea
        </button>
        {isManager(user, project.managerId) && (
          <Link
            href={`/dashboard/project/${project?.id}/team`}
            className="bg-fuchsia-600 hover:bg-fuchsia-700 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors rounded-2xl"
          >
            Colaboradores
          </Link>
        )}
      </nav>
      <AddTaskModal
        open={newTask}
        onClose={() => setNewTask(false)}
        id={project?.id || ""}
        resetdata={resetData}
      />
      <TaskList tasks={tasks || []} resetdata={resetData} />
    </div>
  );
}

export default ViewPage;
