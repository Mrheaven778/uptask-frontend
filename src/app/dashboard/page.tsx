import Project from "@/components/project/Project";
import Link from "next/link";

export default function PageDashboard() {

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
