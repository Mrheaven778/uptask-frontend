'use client'
import { useForm } from "react-hook-form"
import ProjectForm from "./ProjectForm"
import { ProjectFormData } from "@/types"
import { updateProject } from "@/api/ProjectAPI"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { Post } from "@/interface/project"

interface ProjectViewProps {
    project: Post
}

function EditFrom({ project }: ProjectViewProps) {
    const router = useRouter()
    const initialValues: ProjectFormData = {
        title: project.title,
        content: project.content,
        clientName: project.clientName
    }
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ProjectFormData>({ defaultValues: initialValues })

    const onSubmit = async (data: ProjectFormData) => {
        await updateProject(project.id, data).then(() => {
            toast.success("Se actualizó el proyecto correctamente",
                { duration: 5000, position: "top-center", style: { backgroundColor: "#4B5563", color: "#F3F4F6" } })
        }).catch(() => {
            toast.error("Error al crear el proyecto")
        })

        router.push("/dashboard")

    }

    return (
        <form className="mt-10 bg-gray-800 dark:bg-gray-800 shadow-lg p-10 rounded-lg" onSubmit={handleSubmit(onSubmit)} noValidate>
            <ProjectForm
                register={register}
                errors={errors}
            />
            <input type="submit" value='Editar proyecto' className="bg-fuchsia-600 dark:bg-fuchsia-500 w-full p-2 uppercase font-bold rounded-xl hover:bg-fuchsia-700 dark:hover:bg-fuchsia-600 transition-colors cursor-pointer text-white" />
        </form>
    )
}

export default EditFrom