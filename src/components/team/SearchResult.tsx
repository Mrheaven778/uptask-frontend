import { addUserToProject } from "@/api/TeamAPI";
import { User } from "@/interface/user.interface";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

interface SearchResultProps {
  user: User;
  idProject: string;
  fetchProject: () => void;
}

function SearchResult({ user, idProject ,fetchProject}: 
SearchResultProps) {
  const router = useRouter();
  const addUser = async () => {
    try {
      const data = {
        id: user.id.toString(),
        projectId: idProject,
      };
      await addUserToProject(data);
      toast.success("Usuario agregado correctamente", {
        duration: 5000,
        style: {
          backgroundColor: "#333",
          color: "#fff",
        },
        position: "top-center",
      });
      fetchProject();
      router.push(`/dashboard/project/${idProject}/team`);
    } catch (error) {
      toast.error("No se pudo agregar al usuario: " + error, {
        duration: 5000,
        style: {
          backgroundColor: "#333",
          color: "#fff",
        },
        position: "top-center",
      });
    }
  };
  return (
    <>
      <p className="mt-10 text-center font-bold">Resultado de la búsqueda:</p>
      <div className="flex flex-col sm:flex-row justify-between items-center">
        <p className="text-center text-xl font-bold mt-5">{user.username}</p>
        <button
          onClick={addUser}
          className="hover:text-purple-100 px-10 py-3 font-bold cursor-pointer transition-colors bg-violet-400 hover:bg-violet-500 rounded-2xl dark:bg-violet-700 dark:hover:bg-violet-800"
        >
          Agregar al equipo
        </button>
      </div>
    </>
  );
}

export default SearchResult;
