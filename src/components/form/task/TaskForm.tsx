import { FieldErrors, UseFormRegister } from "react-hook-form";
import { Task } from "@/interface/project";
import { ErrorMessage } from "@/components/ui";

type TaskFormProps = {
    errors: FieldErrors<Task>;
    register: UseFormRegister<Task>;
};

export default function TaskForm({ errors, register }: TaskFormProps) {
    return (
        <>
            <div className="flex flex-col gap-5">
                <label
                    className="font-normal text-2xl text-gray-300"
                    htmlFor="name"
                >
                    Nombre de la tarea
                </label>
                <input
                    id="name"
                    type="text"
                    placeholder="Nombre de la tarea"
                    className="w-full p-3 border border-gray-700 bg-gray-800 text-white rounded-2xl"
                    {...register("name", {
                        required: "El nombre de la tarea es obligatorio",
                    })}
                />
                {errors.name && (
                    <ErrorMessage>{errors.name.message}</ErrorMessage>
                )}
            </div>

            <div className="flex flex-col gap-5">
                <label
                    className="font-normal text-2xl text-gray-300"
                    htmlFor="description"
                >
                    Descripción de la tarea
                </label>
                <textarea
                    id="description"
                    placeholder="Descripción de la tarea"
                    className="w-full p-3 border border-gray-700 bg-gray-800 text-white rounded-2xl"
                    {...register("description", {
                        required: "La descripción de la tarea es obligatoria"
                    })}
                />
                {errors.description && (
                    <ErrorMessage>{errors.description.message}</ErrorMessage>
                )}
            </div>
        </>
    );
}
