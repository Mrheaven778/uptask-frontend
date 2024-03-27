import { z } from 'zod';
import ProjectForm from '../components/form/ProjectForm';


export const projectSchema = z.object({
    id: z.string(),
    title: z.string(),
    content: z.string(),
    clientName: z.string() ,
});



export type Project = z.infer<typeof projectSchema>;

export type ProjectFormData= Pick<Project, 'title' | 'content' | 'clientName'>;