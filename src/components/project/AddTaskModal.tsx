'use client'
import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import TaskForm from '../form/task/TaskForm';
import { useForm } from 'react-hook-form';
import {  Task } from '@/interface/project';
import { createTask } from '@/api/ProjectAPI';
import { toast } from 'sonner';

interface AddTaskModalProps {
    open: boolean;
    onClose: () => void;
    id: string;
    resetdata: () => void;
}

export default function AddTaskModal({ open, onClose, id, resetdata }: AddTaskModalProps) {

    const initialForm: Task = {
        name: '',
        description: '',
    }
    const { register, handleSubmit, formState:
        { errors }} = useForm<Task>({ defaultValues: initialForm });

    const onSubmit = async (data: Task) => {
        await createTask(id, data).then(() => {
            toast.success("Proyecto creado correctamente",
                { duration: 5000, position: "top-center", style: { backgroundColor: "#4B5563", color: "#F3F4F6" } })
        }).catch(() => {
            toast.error("Error al crear el proyecto",
                { duration: 5000, position: "top-center", style: { backgroundColor: "#4B5563", color: "#F3F4F6" } })
        })
        resetdata();
        onClose();
    }

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
                                    <Dialog.Title
                                        as="h3"
                                        className="font-black text-4xl  my-5"
                                    >
                                        Nueva Tarea
                                    </Dialog.Title>

                                    <p className="text-xl font-bold">Llena el formulario y crea  {''}
                                        <span className="text-fuchsia-600">una tarea</span>
                                    </p>
                                    <form className='mt-10 space-y-3 ' noValidate onSubmit={handleSubmit(onSubmit)}>
                                        <TaskForm register={register} errors={errors} />
                                        <input type="submit" value='Guardar tarea' className="bg-fuchsia-600 dark:bg-fuchsia-500 w-full p-2 uppercase font-bold rounded-xl hover:bg-fuchsia-700 dark:hover:bg-fuchsia-600 transition-colors cursor-pointer text-white" />
                                    </form>

                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

