"use client";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "../ui";
import { User } from "@/interface/user.interface";
import { changeUser } from "@/api/UserAPI";
import { toast } from "sonner";
import { UserFormData } from "@/types";

type ProfileFormProps = {
  data: User;
};

export default function ProfileForm({ data }: ProfileFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: data });

  const handleEditProfile = async (formData: UserFormData) => {
    try {
      await changeUser(formData.email, formData.username);
      toast.success("Perfil actualizado", {
        duration: 4000,
        style: {
          background: "#333",
          color: "#fff",
        },
        position: "top-center",
      });
    } catch (e: any) {
      toast.error(e.message, {
        duration: 4000,
        style: {
          background: "#333",
          color: "#fff",
        },
        position: "top-center",
      });
    }
  };

  return (
    <>
      <div className="mx-auto max-w-3xl g text-white">
        <h1 className="text-5xl font-black ">Mi Perfil</h1>
        <p className="text-2xl font-light text-gray-300 mt-5">
          Aquí puedes actualizar tu información
        </p>

        <form
          onSubmit={handleSubmit(handleEditProfile)}
          className="mt-14 space-y-5 bg-gray-800 shadow-lg p-10 rounded-l"
          noValidate
        >
          <label
            className="text-sm uppercase font-bold text-gray-300"
            htmlFor="name"
          >
            Nombre
          </label>
          <input
            id="name"
            type="text"
            placeholder="Tu Nombre"
            className="w-full p-3 border border-gray-700 text-gray-300 bg-gray-800"
            {...register("username", {
              required: "Nombre de usuario es obligatorio",
            })}
          />

          <div className="mb-5 space-y-3">
            <label
              className="text-sm uppercase font-bold text-gray-300"
              htmlFor="password"
            >
              E-mail
            </label>
            <input
              id="text"
              type="email"
              placeholder="Tu Email"
              className="w-full p-3 border border-gray-700 text-gray-300 bg-gray-800"
              {...register("email", {
                required: "EL e-mail es obligatorio",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "E-mail no válido",
                },
              })}
            />
            {errors.email && (
              <ErrorMessage>{errors.email.message}</ErrorMessage>
            )}
          </div>
          <input
            type="submit"
            value="Guardar Cambios"
            className="bg-gradient-to-b from-violet-700 to-fuchsia-700 w-full p-3 text-white uppercase font-bold hover:from-violet-600 hover:to-fuchsia-600 cursor-pointer transition-colors rounded-xl"
          />
        </form>
      </div>
    </>
  );
}
