'use client';
import { useStore } from "@/store/ui-sidebar";
import { CiMenuBurger } from "react-icons/ci";
import Logo from "./Logo";
import { IoCalendarOutline, IoListOutline, IoPersonOutline } from "react-icons/io5";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import LoggingOut from "./LoggingOut";

const menuItems = [
    {
        icon: <IoCalendarOutline />,
        title: "Mis Proyectos",
        path: "/dashboard",
    },
    {
        icon: <IoListOutline />,
        title: "Mi Perfil",
        path: "/dashboard/profile",
    }
];

export default function Header() {
    const sidebarOpen = useStore((state) => state.open);
    const pathName = usePathname();

    return (
        <header className="bg-slate-800 py-5">
            <div className="flex flex-row items-center lg:justify-between lg:px-0 px-7 max-w-5xl mx-auto">
                <div>
                    <button
                        className="w-12 h-16 -mr-2 border-r lg:hidden text-white"
                        onClick={sidebarOpen}
                    >
                        <CiMenuBurger size={30} />
                    </button>
                </div>
                <div className="w-64">
                    <Link href={'/dashboard'}>
                    <Logo alt="Logo de la imagen"
                        width={200}
                        height={200} />

                    </Link>
                </div>
                <nav>
                    <ul className="lg:flex space-x-4 hidden">
                        {menuItems.map((item, index) => (
                            <li key={index}>
                                <Link href={item.path}
                                    className={clsx(
                                        "px-4 py-3 flex items-center space-x-4 rounded-md text-gray-300 group hover:bg-gray-700 hover:text-white gap-4 transition-colors duration-200 w-44",
                                        item.path === pathName && "text-white bg-gradient-to-r from-violet-600 to-purple-400"
                                    )}>
                                    {item.icon}
                                    {item.title}
                                </Link>
                            </li>
                        ))}
                        <LoggingOut />
                    </ul>
                </nav>
            </div>
        </header>
    );
}
