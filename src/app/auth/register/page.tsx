"use client";
import { registerUser } from "@/api/AuthAPI";
import { ErrorMessage } from "@/components/ui";
import { UserRegister } from "@/interface/user.interface";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function RegisterView() {
  const router = useRouter();
  const initialValues: UserRegister = {
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  };

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<UserRegister>({ defaultValues: initialValues });

  const password = watch("password");

  const handleRegister = async (formData: UserRegister) => {
    await registerUser(formData)
      .then(() => {
        toast.success("Usuario registrado correctamente", {
          duration: 5000,
          position: "top-center",
          style: { backgroundColor: "#4B5563", color: "#F3F4F6" },
        });
        reset();
        router.push("/auth/login");
      })
      .catch((error) => {
        toast.error(`Error al registrar el usuario: ${error.message}`, {
          duration: 5000,
          position: "top-center",
          style: { backgroundColor: "#F87171", color: "#1F2937" },
        });
      });
  };
  return (
    <>
      <h1 className="text-5xl font-black text-white">Crear Cuenta</h1>
      <p className="text-2xl font-light text-white mt-5">
        Llena el formulario para{" "}
        <span className="text-fuchsia-500 font-bold">crear tu cuenta</span>
      </p>

      <form
        onSubmit={handleSubmit(handleRegister)}
        className="space-y-8 p-10 bg-gray-800 mt-10 rounded-2xl"
        noValidate
      >
        <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl text-white" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="w-full p-3 border-gray-600 border text-white rounded-lg"
            {...register("email", {
              required: "El Email de registro es obligatorio",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "E-mail no válido",
              },
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>

        <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl text-white" htmlFor="name">
            Nombre
          </label>
          <input
            id="name"
            type="name"
            placeholder="Nombre de Registro"
            className="w-full p-3 border-gray-600 border text-white rounded-lg"
            {...register("name", {
              required: "El Nombre de usuario es obligatorio",
            })}
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </div>

        <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl text-white" htmlFor="password">
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password de Registro"
            className="w-full p-3 border-gray-600 border text-white rounded-lg"
            {...register("password", {
              required: "El Password es obligatorio",
              minLength: {
                value: 8,
                message: "El Password debe ser mínimo de 8 caracteres",
              },
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <div className="flex flex-col gap-5">
          <label
            className="font-normal text-2xl text-white"
            htmlFor="password_confirmation"
          >
            Repetir Contraseña
          </label>
          <input
            id="password_confirmation"
            type="password"
            placeholder="Repite Password de Registro"
            className="w-full p-3 border-gray-600 border text-white rounded-lg"
            {...register("password_confirmation", {
              required: "Repetir Password es obligatorio",
              validate: (value) =>
                value === password || "Los Passwords no son iguales",
            })}
          />
          {errors.password_confirmation && (
            <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          value="Registrarme"
          className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white font-black text-xl cursor-pointer rounded-lg"
        />
      </form>
      <nav className="mt-10 flex flex-col space-y-4">
        <Link href="/auth/login" className="text-center font-normal">
          ¿Ya tienes cuenta? Inicia Sesión
        </Link>
      </nav>
    </>
  );
}
