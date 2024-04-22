"use client";

import { UseFormRegister, FieldErrors } from "react-hook-form";
import { ErrorMessage } from "../ui";
import { ProjectFormData } from "@/types";

type ProjectFormProps = {
  register: UseFormRegister<ProjectFormData>;
  errors: FieldErrors<ProjectFormData>;
};

export default function ProjectForm({ register, errors }: ProjectFormProps) {
  return (
    <>
      <div className="mb-5 space-y-3">
        <label
          htmlFor="title"
          className="text-sm uppercase font-bold dark:text-gray-300"
        >
          Nombre del Proyecto
        </label>
        <input
          id="title"
          className="w-full p-3 border border-gray-700 bg-gray-800 rounded-2xl"
          type="text"
          placeholder="Nombre del Proyecto"
          {...register("title", {
            required: "El Titulo del Proyecto es obligatorio",
          })}
        />

        {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
      </div>

      <div className="mb-5 space-y-3">
        <label
          htmlFor="clientName"
          className="text-sm uppercase font-bold dark:text-gray-300"
        >
          Nombre Cliente
        </label>
        <input
          id="clientName"
          className="w-full p-3 border border-gray-700 bg-gray-800 rounded-2xl"
          type="text"
          placeholder="Nombre del Cliente"
          {...register("clientName", {
            required: "El Nombre del Cliente es obligatorio",
          })}
        />

        {errors.clientName && (
          <ErrorMessage>{errors.clientName.message}</ErrorMessage>
        )}
      </div>

      <div className="mb-5 space-y-3">
        <label
          htmlFor="content"
          className="text-sm uppercase font-bold dark:text-gray-300"
        >
          Descripción
        </label>
        <textarea
          id="content"
          className="w-full p-3 border  border-gray-700 bg-gray-800 rounded-2xl"
          placeholder="Descripción del Proyecto"
          {...register("content", {
            required: "Una descripción del proyecto es obligatoria",
          })}
        />

        {errors.content && (
          <ErrorMessage>{errors.content.message}</ErrorMessage>
        )}
      </div>
    </>
  );
}
