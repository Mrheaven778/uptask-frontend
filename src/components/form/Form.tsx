'use client'
import { useForm } from "react-hook-form"
import ProjectForm from "./ProjectForm"
import { ProjectFormData } from "@/types"
import { createProject } from "@/api/ProjectAPI"
import {  toast } from "sonner"
import { useRouter } from "next/navigation"


function Form() {
    const router = useRouter()
    const initialValues: ProjectFormData = {
        title: "",
        content: "",
        clientName: ""
    }
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ProjectFormData>({ defaultValues: initialValues })

    const onSubmit = async (data: ProjectFormData) => {
        await createProject(data).then(() => {
              toast.success("Proyecto creado correctamente",
              { duration: 5000, position: "top-center", style: { backgroundColor: "#4B5563", color: "#F3F4F6" }})
         }).catch((error) => {   
                toast.error("Error al crear el proyecto no tienes permisos",{
                duration: 5000, position: "top-center", style: { backgroundColor: "#F87171", color: "#1F2937" } 
                })
             })
            router.push("/dashboard")
    }
    
    return (
        <form className="mt-10  dark:bg-gray-900 shadow-lg p-10 rounded-lg bg-slate-900" onSubmit={handleSubmit(onSubmit)} noValidate>
            <ProjectForm
            register={register}
            errors={errors}
            />
            <input type="submit" value='Crear Proyecto' className="bg-fuchsia-600 dark:bg-fuchsia-500 w-full p-2 uppercase font-bold rounded-xl hover:bg-fuchsia-700 dark:hover:bg-fuchsia-600 transition-colors cursor-pointer text-white"/>
        </form>
    )
}

export default Form