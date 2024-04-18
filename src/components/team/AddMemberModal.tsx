import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import AddMemberForm from './AddMemberForm';

interface AddTaskModalProps {
    open: boolean;
    onClose: () => void;
    fetchProject: () => void;
}

export default function AddMemberModal({ open, onClose, fetchProject }: AddTaskModalProps) {
  
    

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
                <div className="fixed inset-0 bg-black/60 dark:bg-slate-600/60" />
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
                        <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 text-left align-middle shadow-xl transition-all p-16">
                            <Dialog.Title
                                as="h3"
                                className="font-black text-4xl text-gray-900 dark:text-white my-5"
                            >
                                Agregar Integrante al equipo
                            </Dialog.Title>
                            <p className="text-xl font-bold text-gray-700 dark:text-gray-300">
                                Busca el nuevo integrante por email{' '}
                                <span className="text-fuchsia-600">para agregarlo al proyecto</span>
                            </p>
                            <AddMemberForm fetchProject={fetchProject}/>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </div>
        </Dialog>
    </Transition>
</>

    )
}