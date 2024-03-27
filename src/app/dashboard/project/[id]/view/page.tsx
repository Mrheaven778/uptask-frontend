
'use client'
import { getProject } from '@/api/ProjectAPI'
import AddTaskModal from '@/components/project/AddTaskModal'
import TaskList from '@/components/task/TaskList'
import TaskModalDetails from '@/components/task/TaskModalDetails'
import PageNotFound from '@/components/ui/not-found/PageNotFound'
import { Post } from '@/interface/project'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

function ViewPage() {
    const { id } = useParams()
    const [newTask, setNewTask] = useState(false)
    const [project, setProject] = useState<Post>()
    useEffect(() => {
        fetchProject()
    }, [])

    const fetchProject = async () => {
        const project: Post = await getProject(id.toString())
        setProject(project)
    }
    const resetData = async () => {
        await fetchProject()
    }

    if (!project) return <PageNotFound />

    return (
        <div>
            <h1 className='text-5xl font-bold'>{project.title}</h1>
            <p className='text-2xl font-light text-gray-300 mt-5'>{project.content}</p>
            <nav className='my-5 flex gap-3'>
                <button type='button' className='bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors rounded-2xl' onClick={() => setNewTask(true)}>
                    Agregar tarea
                </button>
            </nav>
            <AddTaskModal open={newTask} onClose={() => setNewTask(false)} id={project.id} resetdata={resetData} />
            <TaskList tasks={project.tasks} resetdata={resetData}/>
            
        </div>
    )
}

export default ViewPage

