import { Post } from '@/interface/project'
import React from 'react'
import EditProjectForm from '../form/EditProjectForm'

interface ProjectViewProps {
    project: Post
}

function ProjectEdit({ project }: ProjectViewProps) {
    return (
        <div>
           <EditProjectForm project={project}/> 
        </div>
    )
}

export default ProjectEdit