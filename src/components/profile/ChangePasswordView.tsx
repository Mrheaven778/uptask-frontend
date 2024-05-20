"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "../ui";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { ChangePassword } from "@/types";
import { changePassword } from "@/api/UserAPI";
import { toast } from "sonner";

export default function ChangePasswordView() {
  const initialValues: ChangePassword = {
    current_password: "",
    password: "",
    password_confirmation: "",
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const password = watch("password");

  const handleChangePassword = async (formData: ChangePassword) => {
    try {
      await changePassword(formData.current_password, formData.password);
      toast.success("Contraseña cambiado correctamente", {
        duration: 5000,
        style: {
          backgroundColor: "#4B5563",
          color: "#F3F4F6",
        },
        position: "top-center",
      });
    } catch (error: any) {
      toast.error(error.response.data.message, {
        duration: 5000,
        style: {
          backgroundColor: "#4B5563",
          color: "#F3F4F6",
        },
        position: "top-center",
      });
    }
  };
  const [showPassword, setShowPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowCurrentPassword = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <>
      <div className="mx-auto max-w-3xl text-white">
        <h1 className="text-5xl font-black ">Cambiar Password</h1>
        <p className="text-2xl font-light text-gray-300 mt-5">
          Utiliza este formulario para cambiar tu password
        </p>

        <form
          onSubmit={handleSubmit(handleChangePassword)}
          className=" mt-14 space-y-5 bg-gray-800 shadow-lg p-10 rounded-lg"
          noValidate
        >
          <div className="mb-5 space-y-3 relative">
            <label
              className="text-sm uppercase font-bold"
              htmlFor="current_password"
            >
              Contraseña Actual
            </label>
            <input
              id="current_password"
              type={showCurrentPassword ? "text" : "password"}
              placeholder="Contraseña Actual"
              className="w-full p-3  border border-gray-700 text-gray-300 bg-gray-800"
              {...register("current_password", {
                required: "La contraseña actual es obligatorio",
              })}
            />
            <button
              type="button"
              onClick={handleShowCurrentPassword}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-300"
            >
              {showCurrentPassword ? (
                <FiEyeOff size={20} />
              ) : (
                <FiEye size={20} />
              )}
            </button>
            {errors.current_password && (
              <ErrorMessage>{errors.current_password.message}</ErrorMessage>
            )}
          </div>
          <div className="mx-auto max-w-3xl text-white">
            <div className="mb-5 space-y-3 relative">
              <label className="text-sm uppercase font-bold" htmlFor="password">
                Nueva Contraseña
              </label>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Nueva Contraseña"
                className="w-full p-3 border border-gray-700 text-gray-300 bg-gray-800"
                {...register("password", {
                  required: "La nueva contraseña es obligatoria",
                  minLength: {
                    value: 8,
                    message: "La contraseña debe ser mínimo de 8 caracteres",
                  },
                })}
              />
              <button
                type="button"
                onClick={handleShowPassword}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-300"
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
              {errors.password && (
                <ErrorMessage>{errors.password.message}</ErrorMessage>
              )}
            </div>
          </div>

          <div className="mb-5 space-y-3 relative">
            <label
              htmlFor="password_confirmation"
              className="text-sm uppercase font-bold"
            >
              Repetir Contraseña
            </label>

            <input
              id="password_confirmation"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Repetir Contraseña"
              className="w-full p-3  border border-gray-700 text-gray-300 bg-gray-800"
              {...register("password_confirmation", {
                required: "Este campo es obligatorio",
                validate: (value) =>
                  value === password || "Las contraseñas no son iguales",
              })}
            />
            <button
              type="button"
              onClick={handleShowConfirmPassword}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-300"
            >
              {showConfirmPassword ? (
                <FiEyeOff size={20} />
              ) : (
                <FiEye size={20} />
              )}
            </button>
            {errors.password_confirmation && (
              <ErrorMessage>
                {errors.password_confirmation.message}
              </ErrorMessage>
            )}
          </div>

          <input
            type="submit"
            value="Cambiar Password"
            className="bg-gradient-to-b from-violet-700 to-fuchsia-700 w-full p-3 text-white uppercase font-bold hover:from-violet-600 hover:to-fuchsia-600 cursor-pointer transition-colors rounded-xl"
          />
        </form>
      </div>
    </>
  );
}
