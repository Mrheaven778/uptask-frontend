import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'
import { Post } from '@/interface/project';

interface ProjectCardProps {
    project: Post;
    onDeleteProject: (id: string) => void;
}

export default function ProjectCard({ project, onDeleteProject }: ProjectCardProps) {
    const handleDeleteProject = async () => {
        await onDeleteProject(project.id);
    };

    return (
        <>
            <div className="flex min-w-0 gap-x-">
                <div className="min-w-0 flex-auto space-y-2">
                    <Link href={`/dashboard/project/${project.id}/view`} className="text-gray-300 cursor-pointer hover:underline text-3xl font-bold">
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
                                <Link href={`dashboard/project/${project.id}/view`} className="block px-3 py-1 text-sm leading-6 text-gray-300 hover:text-gray-400">
                                    Ver Proyecto
                                </Link>
                            </Menu.Item>
                            <Menu.Item>
                                <Link href={`/dashboard/project/${project.id}/edit`} className="block px-3 py-1 text-sm leading-6 text-gray-300 hover:text-gray-400">
                                    Editar Proyecto
                                </Link>
                            </Menu.Item>
                            <Menu.Item>
                                <button type="button" className="block px-3 py-1 text-sm leading-6 text-red-500 hover:text-red-600" onClick={handleDeleteProject}>
                                    Eliminar Proyecto
                                </button>
                            </Menu.Item>
                        </Menu.Items>
                    </Transition>
                </Menu>
            </div>
        </>
    );
}

