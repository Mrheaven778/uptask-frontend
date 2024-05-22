"use client";

import { useAuth } from "@/store/use-auth";
import { deleteCookie } from "@/utils/cookis";
import { useRouter } from "next/navigation";
import { IoPersonOutline } from "react-icons/io5";

function LoggingOut() {
  const { setIsAuthenticated } = useAuth();
  const router = useRouter();
  const handleLogout = async () => {
    setIsAuthenticated(false);
    await deleteCookie();
    router.push("/auth/login");
  };
  return (
    <button
      className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-300 group hover:bg-gray-700 hover:text-white ml-3 gap-5"
      onClick={handleLogout}
    >
      <IoPersonOutline size={20} /> Cerrar Sesión
    </button>
  );
}

export default LoggingOut;
