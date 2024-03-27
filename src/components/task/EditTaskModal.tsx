'use client'
import { Dialog, Transition } from '@headlessui/react';
import { Task } from '@/interface/project';
import { useForm } from 'react-hook-form';
import { createTask, updateTask } from '@/api/ProjectAPI';
import { toast } from 'sonner';
import { Fragment } from 'react';
import { useParams } from 'next/navigation';
import TaskForm from '../form/task/TaskForm';


interface EditTaskModalProps {
  open: boolean
  onClose: () => void
  task: Task
  resetdata: () => void
}

function EditTaskModal({ open, onClose, task, resetdata }: EditTaskModalProps) {
  const { id } = useParams();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<Task>({
    defaultValues: { name: task.name, description: task.description }
  });

  const onSubmit = async (data: Task) => {
    await updateTask(id.toString(), task.id || '', data)
      .then(() => {
        toast.success("Actualizado correctamente!!", { duration: 5000, position: "top-center", style: { backgroundColor: "#4B5563", color: "#F3F4F6" } })
      })
      .catch(() => {
        toast.error("Error al crear el proyecto", { duration: 5000, position: "top-center", style: { backgroundColor: "#4B5563", color: "#F3F4F6" } })
      });
    reset();
    onClose();
    resetdata();
  }

  return (
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
                  Editar Tarea
                </Dialog.Title>

                <p className="text-xl font-bold">Realiza cambios a una tarea en {''}
                  <span className="text-fuchsia-600">este formulario</span>
                </p>

                <form
                  className="mt-10 space-y-3"
                  noValidate
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <TaskForm register={register} errors={errors} />
                  <input
                    type="submit"
                    className=" bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer rounded-xl"
                    value='Guardar Tarea'
                  />
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default EditTaskModal;