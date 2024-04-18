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


// * This is the schema for the user data that we will use to register the user
// auth 
const userSchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
});

export type User = z.infer<typeof userSchema>;