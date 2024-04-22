"use client";

import { loginUser } from "@/api/AuthAPI";
import { ErrorMessage } from "@/components/ui";
import { UserLogin } from "@/interface/user.interface";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";



export default function LoginView() {
  const router = useRouter();
  const initialValues: UserLogin = {
    email: "",
    password: "",
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const handleLogin = async (formData: UserLogin) => {
    try {
      await loginUser(formData);
      router.push("/dashboard");
    } catch (error: any) {
      toast.error(`Error al iniciar sesión: ${error.message}`, {
        duration: 5000,
        position: "top-center",
        style: { backgroundColor: "#F87171", color: "#1F2937" },
      });
    }
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="space-y-8 p-10 bg-gray-800 text-white rounded-xl"
        noValidate
      >
        <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl">Email</label>

          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="w-full p-3  border border-gray-700 bg-gray-800 rounded-lg"
            {...register("email", {
              required: "El Email es obligatorio",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "E-mail no válido",
              },
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>

        <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl">Password</label>

          <input
            type="password"
            placeholder="Password de Registro"
            className="w-full p-3  border border-gray-700 bg-gray-800  rounded-lg"
            {...register("password", {
              required: "El Password es obligatorio",
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          value="Iniciar Sesión"
          className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer rounded-lg"
        />
      </form>
      <nav className="mt-10 flex flex-col space-y-4">
        <Link href="/auth/register" className="text-center font-normal">
            ¿No tienes cuenta? Regístrate
        </Link>
      </nav>
    </>
  );
}
