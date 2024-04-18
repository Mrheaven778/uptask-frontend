import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { Post } from "@/interface/project";
import { toast } from "sonner";
import { User } from "@/interface/user.interface";

interface ProjectCardProps {
  project: Post;
  onDeleteProject: (id: string) => void;
  user: User;
}

export default function ProjectCard({
  project,
  onDeleteProject,
  user,
}: ProjectCardProps) {
  const handleDeleteProject = async () => {
    try {
      await onDeleteProject(project.id);
      toast.success("Proyecto eliminado correctamente", {
        duration: 5000,
        position: "top-center",
        style: { backgroundColor: "#4B5563", color: "#F3F4F6" },
      });
    } catch (error: any) {
      toast.error("Error al eliminar el proyecto no estas autorizado", {
        duration: 5000,
        position: "top-center",
        style: { backgroundColor: "#F87171", color: "#1F2937" },
      });
    }
  };

  return (
    <>
      <div className="flex min-w-0 gap-x-">
        <div className="min-w-0 flex-auto space-y-2">
          <div className="mb-4">
            {project.managerId === user.id ? (
              <p className="font-bold text-xs uppercase bg-indigo-50  text-indigo-600 border-2 border-indigo-600 rounded-lg inline-block py-1 px-5">
                Manager
              </p>
            ) : (
              <p className="font-bold text-xs uppercase bg-green-50  text-green-500 border-2 border-green-600 rounded-lg inline-block py-1 px-5">
                Miembro del Equipo
              </p>
            )}
          </div>
          <Link
            href={`/dashboard/project/${project.id}/view`}
            className="text-gray-300 cursor-pointer hover:underline text-3xl font-bold"
          >
            {project.title}
          </Link>
          <p className="text-sm text-gray-400">Cliente: {project.clientName}</p>
          <p className="text-sm text-gray-400">{project.content}</p>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-x-6">
        <Menu as="div" className="relative flex-none">
          <Menu.Button className="-m-2.5 block p-2.5 text-gray-300 hover:text-gray-700">
            <span className="sr-only">opciones</span>
            <EllipsisVerticalIcon className="h-9 w-9" aria-hidden="true" />
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-gray-800 py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
              <Menu.Item>
                <Link
                  href={`dashboard/project/${project.id}/view`}
                  className="block px-3 py-1 text-sm leading-6 text-gray-300 hover:text-gray-400"
                >
                  Ver Proyecto
                </Link>
              </Menu.Item>
              {user.id === project.managerId && (
                <>
                  <Menu.Item>
                    <Link
                      href={`/dashboard/project/${project.id}/edit`}
                      className="block px-3 py-1 text-sm leading-6 text-gray-300 hover:text-gray-400"
                    >
                      Editar Proyecto
                    </Link>
                  </Menu.Item>
                  <Menu.Item>
                    <button
                      type="button"
                      className="block px-3 py-1 text-sm leading-6 text-red-500 hover:text-red-600"
                      onClick={handleDeleteProject}
                    >
                      Eliminar Proyecto
                    </button>
                  </Menu.Item>
                </>
              )}
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </>
  );
}
