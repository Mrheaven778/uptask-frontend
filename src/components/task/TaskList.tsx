import { Task } from '@/interface/project'
import React from 'react'
import TaskCard from './TaskCard'

interface TaskListProps {
    tasks: Task[],
    resetdata: () => void;

}

type GroupedTasks = {
    [key: string]: Task[],
}

const initialStatus: GroupedTasks = {
    pending: [],
    onHold: [],
    inProgress: [],
    underReview: [],
    completed: [],
}

const statusTranslation: { [key: string]: string } = {
    pending: 'Pendiente',
    onHold: 'En Espera',
    inProgress: 'En Progreso',
    underReview: 'En Revisión',
    completed: 'Completado',
}

const statusStyles: { [key: string]: string } = {
    pending: 'border-t-red-500',
    onHold: 'border-t-fuchsia-500',
    inProgress: 'border-t-blue-500',
    underReview: 'border-t-amber-500',
    completed: 'border-t-emerald-500',
}

function TaskList({ tasks, resetdata}: TaskListProps) {
    const groupedTasks: GroupedTasks = tasks.reduce((acc, task) => {
        const currentGroup = acc[task.taskStatus!] || [];
        return { ...acc, [task.taskStatus!]: [...currentGroup, task] };
    }, initialStatus);

    return (
        <>
            <h2 className="text-5xl font-black my-10 text-white">Tareas</h2>
            
            <div className='flex gap-5 overflow-x-scroll 2xl:overflow-auto pb-32'>
                {Object.entries(groupedTasks).map(([status, tasks]) => (
                    <div key={status} className='min-w-[300px] 2xl:min-w-0 2xl:w-1/5'>
                        <h3
                            className={`capitalize text-xl font-light border-gray-700 bg-gray-800 rounded-md  p-3 border-t-8 ${statusStyles[status]}`}>
                            {statusTranslation[status]}
                        </h3>
                        <ul className='mt-5 space-y-5'>
                            {tasks.length === 0 ? (
                                <li className="text-gray-300 text-center pt-3">No hay tareas</li>
                            ) : (
                                tasks.map(task => (
                                    <TaskCard key={task.id} task={task} resetdata={resetdata}/>
                                ))
                            )}
                        </ul>
                    </div>
                ))}
            </div>
        </>
    )
}

export default TaskList;
