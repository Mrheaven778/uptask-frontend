
import { useState } from 'react'; 
import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Task } from '@/interface/project';
import { gormaDate } from '@/utils/utils';
import { useParams } from 'next/navigation';
import { updateSatatusTask } from '@/api/ProjectAPI';
import { toast } from 'sonner';
interface TaskModalDetailsProps {
    open: boolean;
    onClose: () => void;
    task: Task;
    resetdata: () => void;

}

const statusTranslation: { [key: string]: string } = {
    pending: 'Pendiente',
    onHold: 'En Espera',
    inProgress: 'En Progreso',
    underReview: 'En Revisión',
    completed: 'Completado',
}

export default function TaskModalDetails({ open, onClose, task, resetdata }: TaskModalDetailsProps) {

    const { id } = useParams();
    const ButtonupdateSatatusTask = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        await updateSatatusTask(id.toString(), task.id || '', e.target.value);
         toast.success('Estado modificado correctamente', {
            duration: 5000,
            position: 'top-center',
            style: { backgroundColor: "#4B5563", color: "#F3F4F6" }
        })
        onClose();
        await resetdata();
    };
    return (
        <>
            <Transition appear show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={onClose}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/60" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-gray-900 text-white text-left align-middle shadow-xl transition-all p-16">
                                    <p className='text-sm text-gray-400'>Agregada el: {gormaDate(task.createdAt || '')}</p>
                                    <p className='text-sm text-gray-400'>Última actualización: {gormaDate(task.updatedAt || '')}</p>
                                    <Dialog.Title
                                        as="h3"
                                        className="font-black text-4xl text-gray-200 my-5"
                                    >{task.name}
                                    </Dialog.Title>
                                    <p className='text-lg text-gray-200 mb-2'>Descripción: {task.description}</p>
                                    <div className='my-5 space-y-3'>
                                        <label className='font-bold text-gray-400'>Estado Actual: </label>
                                        <select className='bg-gray-800 text-gray-200 p-2 rounded-md w-full' name="taskStatus" id="taskStatus" defaultValue={task.taskStatus} onChange={ButtonupdateSatatusTask}>
                                            {Object.keys(statusTranslation).map((status) => (
                                                <option key={status} value={status}>{statusTranslation[status]}</option>
                                            ))}
                                        </select>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}