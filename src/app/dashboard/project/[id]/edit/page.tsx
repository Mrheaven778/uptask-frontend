'use client'
import { getProject } from '@/api/ProjectAPI'
import ProjectEdit from '@/components/project/ProjectEdit'
import PageNotFound from '@/components/ui/not-found/PageNotFound'
import { Post } from '@/interface/project'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

function EditPage() {
    const {id} = useParams()
    const [project, setProject] = useState<Post>()
    useEffect(() => {
        const fetchProject = async () => {
            const project: Post = await getProject(id.toString()) 
            setProject(project)
        }
        fetchProject()
    }, [id])
    
    return project ? (
        <ProjectEdit project={project} />
     ) : null
}

export default EditPage 