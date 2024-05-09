import { createNote } from "@/api/NoteAPI";
import { NoteFormData } from "@/types";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
interface AddNoteFormProps {
  taskID: any;
  onNoteAdded: () => void;
}

function AddNoteForm({ taskID, onNoteAdded }: AddNoteFormProps) {
  const initialValues: NoteFormData = {
    content: "",
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
  });
  const handleAddNote = async (formData: NoteFormData) => {
    try {
      const data = await createNote(formData.content, taskID);
      reset();
      onNoteAdded();
    } catch (error) {
      toast.error("Ocurrió un error al crear la nota", {
        position: "top-center",
        style: {
          background: "#FCA5A5",
          color: "#9B2C2C",
        },
      });
    }
  };
  return (
    <form
      action=""
      onSubmit={handleSubmit(handleAddNote)}
      className="space-y-3"
      noValidate
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="content" className="font-bold">
          Crear nota
        </label>
        <input
          type="text"
          id="content"
          placeholder="Contenido de la nota"
          className="w-full p-3 border border-gray-700 rounded-2xl transition-colors bg-gray-800 text-gray-200 dark:bg-gray-900 dark:text-white"
          {...register("content", {
            required: "El contenido de la nota es obligatorio",
          })}
        />
        {errors.content && (
          <span className="text-red-500 text-sm">{errors.content.message}</span>
        )}
      </div>
      <input
        type="submit"
        value="Crear Nota"
        className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full font-bold cursor-pointer p-3 rounded-2xl text-white transition-colors"
      />
    </form>
  );
}

export default AddNoteForm;
