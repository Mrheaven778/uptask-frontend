"use client";
import Project from "@/components/project/Project";
import { useAuth } from "@/store/use-auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PageDashboard() {  // Cambié el nombre aquí
  const { isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const router = useRouter();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    router.push("/auth/login");
  }

  return (
    <div>
      <h1 className="text-5xl font-black text-white">Mis proyectos</h1>
      <p className="text-2xl font-light text-gray-300 mt-5">
        Maneja y organiza tus proyectos de manera sencilla
      </p>
      <nav className="my-6">
        <Link
          href="/dashboard/project/create"
          className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors rounded-xl"
        >
          Nuevo proyecto
        </Link>
      </nav>
      <Project />
    </div>
  );
}
