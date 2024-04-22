import { useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "../ui";
import { useParams } from "next/navigation";
import { TeamMemberForm } from "@/interface/team.interface";
import { toast } from "sonner";
import { findUserByEmail } from "@/api/TeamAPI";
import SearchResult from "./SearchResult";
import { User } from "@/interface/user.interface";

interface AddMemberFormProps {
  fetchProject: () => void;
}

export default function AddMemberForm({fetchProject }: AddMemberFormProps) {
  const [loading, setLoading] = useState(false);
  const initialValues: TeamMemberForm = {
    email: "",
  };
  const [searchResult, setSearchResult] = useState<User>();

  const params = useParams();
  const projectId = params.id as string;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const handleSearchUser = async (formData: TeamMemberForm) => {
    try {
      setLoading(true);
      const user = await findUserByEmail(formData);
      setSearchResult(user);
      reset();
    } catch (error) {
      toast.error("No se pudo buscar el usuario: "+ error, {
        duration: 5000,
        style: {
          backgroundColor: "#333",
          color: "#fff",
        },
        position: "top-center",
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form
        className="mt-10 space-y-5 dark:text-white"
        onSubmit={handleSubmit(handleSearchUser)}
        noValidate
      >
        <div className="flex flex-col gap-3">
          <label
            className="font-normal text-2xl dark:text-white"
            htmlFor="name"
          >
            E-mail de Usuario
          </label>
          <input
            id="name"
            type="text"
            placeholder="E-mail del usuario a Agregar"
            className="w-full p-3 border border-gray-700 bg-gray-800   dark:bg-gray-900 dark:text-white rounded-2xl transition-colors"
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
        <input
          type="submit"
          className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white font-black text-xl cursor-pointer rounded-2xl transition-colors"
          value="Buscar Usuario"
        />
      </form>
      <div className="mt-10">
        {loading && <p className="text-center ">Cargado...</p>}
      </div>
      {searchResult && (
        <SearchResult user={searchResult} idProject={projectId} fetchProject={fetchProject}/>
      )}
    </>
  );
}
