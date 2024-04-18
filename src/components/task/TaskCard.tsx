import { Task } from '@/interface/project';
import { Menu, Transition } from '@headlessui/react';
import { EllipsisVerticalIcon } from '@heroicons/react/16/solid';
import { Fragment, useState } from 'react';
import EditTaskModal from './EditTaskModal';
import { useParams } from 'next/navigation';
import { deleteTask } from '@/api/ProjectAPI';
import { toast } from 'sonner';
import TaskModalDetails from './TaskModalDetails';

interface TaskCardProps {
    task: Task;
    resetdata: () => void;
}

function TaskCard({ task, resetdata }: TaskCardProps) {

    const [modal, setModal] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const { id } = useParams();
    const ButtondeleteTask = async () => {
        try {
            await deleteTask(id.toString(), task.id || '')
            toast.success('Tarea eliminada', {
                duration: 5000,
                position: 'top-center',
                style: { backgroundColor: "#4B5563", color: "#F3F4F6" }
            })
            resetdata()
        } catch (error) {
            toast.error('No se pudo eliminar la tarea ' + error, {
                duration: 5000,
                position: 'top-center',
                style: { backgroundColor: "#F87171", color: "#F3F4F6" }
            })
        }

    }

    return (
        <>
            <li className='p-5 bg-gray-800 rounded border border-gray-700 flex justify-between gap-3'>
                <div className='min-w-0 flex flex-col gap-y-4'>
                    <button
                        type='button' className='text-xl font-bold text-slate-300 text-left'>
                        {task.name}
                    </button>
                    <p className='text-slate-200'>{task.description}</p>
                </div>
                <div className="flex shrink-0 gap-x-6">
                    <Menu as="div" className="relative flex-none">
                        <Menu.Button className="-m-2.5 block p-2.5 text-gray-400 hover:text-gray-600">
                            <span className="sr-only">opciones</span>
                            <EllipsisVerticalIcon className="h-9 w-9" aria-hidden="true" />
                        </Menu.Button>
                        <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
                            <Menu.Items
                                className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-gray-800 py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                                <Menu.Item>
                                    <button type='button' className='block px-3 py-1 text-sm leading-6 text-gray-100' onClick={() => setModal(true)}>
                                        Ver Tarea
                                    </button>
                                </Menu.Item>
                                <Menu.Item>
                                    <button type='button' className='block px-3 py-1 text-sm leading-6 text-gray-100' onClick={() => setIsEditModalOpen(true)}>
                                        Editar Tarea
                                    </button>
                                </Menu.Item>

                                <Menu.Item>
                                    <button type='button' className='block px-3 py-1 text-sm leading-6 text-red-500'
                                        onClick={ButtondeleteTask}>
                                        Eliminar Tarea
                                    </button>
                                </Menu.Item>
                            </Menu.Items>
                        </Transition>
                    </Menu>
                </div>
            </li>
            <EditTaskModal open={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} task={task} resetdata={resetdata} />
            <TaskModalDetails onClose={() => { setModal(false) }} open={modal} task={task} resetdata={resetdata} />
        </>
    )
}

export default TaskCard;
