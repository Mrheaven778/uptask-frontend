import { z } from "zod";
import ProjectForm from "../components/form/ProjectForm";
import { create } from "domain";

export const projectSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  clientName: z.string(),
});

export type Project = z.infer<typeof projectSchema>;

export type ProjectFormData = Pick<Project, "title" | "content" | "clientName">;

// * This is the schema for the user data that we will use to register the user
// auth
const userSchema = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  roles: z.array(z.string()).optional(),
});

export type User = z.infer<typeof userSchema>;

// note
export const noteSchema = z.object({
  id: z.string(),
  content: z.string(),
  taskId: z.string(),
  createdAt: z.string(),
  createdBy: userSchema,
});
export type Note = z.infer<typeof noteSchema>;
export type NoteFormData = Pick<Note, "content">;
