"use client";
import { daleteUerFromTeam, getTeamProject } from "@/api/TeamAPI";
import AddMemberModal from "@/components/team/AddMemberModal";
import { User } from "@/interface/user.interface";
import { Transition, Menu } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { Fragment, useEffect, useState } from "react";
import { toast } from "sonner";

export default function TeamPage() {
  const [Colaborador, setColaborador] = useState(false);
  const params = useParams();
  const idProject = params.id as string;

  const [userTeam, setUserTeam] = useState<User[]>([]);

  useEffect(() => {
    fetchProject();
  }, []);
  const fetchProject = async () => {
    try {
      const usersTeam: User[] = await getTeamProject({ projectId: idProject });
      setUserTeam(usersTeam);
    } catch (error) {
      toast.error("No se pudo cargar el proyecto");
    }
  };
  const daleteUser = async (idUser: string, idProject: string) => {
    await daleteUerFromTeam({ idUser, idProject })
      .then(() => {
        toast.success("Usuario eliminado correctamente", {
          duration: 5000,
          style: {
            backgroundColor: "#4B5563",
            color: "#F3F4F6",
          },
          position: "top-center",
        });
        fetchProject();
      })
      .catch(() => {
        toast.error("No se pudo eliminar el usuario", {
          duration: 5000,
          style: {
            backgroundColor: "#4B5563",
            color: "#F3F4F6",
          },
          position: "top-center",
        });
      });
  };

  const id = params.id;

  return (
    <>
      <h1 className="text-5xl font-bold dark:text-white">Administrar Equipo</h1>
      <p className="text-2xl font-light text-gray-300 mt-5 dark:text-gray-400">
        Administrar el equipo de trabajo para este proyecto
      </p>
      <nav className="my-5 flex gap-3">
        <button
          type="button"
          className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors rounded-2xl dark:bg-purple-700"
          onClick={() => setColaborador(true)}
        >
          Agregar Colaborador
        </button>
        <Link
          href={`/dashboard/project/${id}/view`}
          className="bg-fuchsia-600 hover:bg-fuchsia-700 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors rounded-2xl dark:bg-fuchsia-700"
        >
          Volver al Proyecto
        </Link>
      </nav>
      <h2 className="text-5xl font-black my-10 dark:text-white">
        Miembros actuales
      </h2>
      {userTeam.length ? (
        <ul
          role="list"
          className="divide-y divide-gray-700 border border-gray-700 mt-10 bg-gray-900 shadow-lg dark:bg-gray-800 dark:border-gray-800"
        >
          {userTeam?.map((member, index) => (
            <li key={index} className="flex justify-between gap-x-6 px-5 py-10">
              <div className="flex min-w-0 gap-x-4">
                <div className="min-w-0 flex-auto space-y-2">
                  <p className="text-2xl font-black text-gray-200">
                    {member.username}
                  </p>
                  <p className="text-sm text-gray-400">{member.email}</p>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-x-6">
                <Menu as="div" className="relative flex-none">
                  <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900 dark:text-white">
                    <span className="sr-only">opciones</span>
                    <EllipsisVerticalIcon
                      className="h-9 w-9"
                      aria-hidden="true"
                    />
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
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-gray-800 py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none dark:bg-gray-700 dark:ring-gray-800 ">
                      <Menu.Item>
                        <button
                          type="button"
                          className="block px-3 py-1 text-sm leading-6 text-red-500 dark:text-red-600"
                          onClick={() => daleteUser(member.id, idProject)}
                        >
                          Eliminar del Proyecto
                        </button>
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center py-20 dark:text-gray-400">
          No hay miembros en este equipo
        </p>
      )}
      <AddMemberModal
        open={Colaborador}
        onClose={() => setColaborador(false)}
        fetchProject={fetchProject}
      />
    </>
  );
}
