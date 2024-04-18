'use client';
import {
  IoCalendarOutline,
  IoListOutline,
  IoPersonOutline,
} from "react-icons/io5";
import { useStore } from "@/store/ui-sidebar";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RxCross2 } from "react-icons/rx";
import LoggingOut from "./LoggingOut";

const menuItems = [
  {
    icon: <IoCalendarOutline />,
    title: "Dashboard",
    path: "/dashboard",
  },
  // {
  //   icon: <IoCheckboxOutline />,
  //   title: "Rest TODOS",
  //   path: "/dashboard/rest-todos",
  // },
  {
    icon: <IoListOutline />,
    title: "Ver tareas",
    path: "/dashboard/server-todos",
  }
];

export default function NavMobile() {
  const isSidebarOpen = useStore((state) => state.isOpen);
  const closeSidebar = useStore((state) => state.close);
  const pathName = usePathname();

  return (
    <>
      {isSidebarOpen && <div className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30" />}
      {isSidebarOpen && <div className="fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm" onClick={closeSidebar} />}

      <div className={clsx("fixed p-5 right-0 top-0 w-[300px] ms:w-[500px] h-screen bg-gray-900 z-20 shadow-2xl transform transition-all duration-300", isSidebarOpen ? "translate-x-0" : "translate-x-full")}>
        <button className="mb-10" onClick={closeSidebar}>
          <RxCross2 size={30} className="fixed right-5 text-white" />
        </button>
        
        {menuItems.map((item, index) => (
          <div key={index} className="flex items-center p-2">
            <Link href={item.path}
               className={clsx(
                "px-4 py-3 flex items-center space-x-4 rounded-md text-gray-300 group hover:bg-gray-700 hover:text-white",
                item.path === pathName && "text-white bg-gradient-to-r from-violet-600 to-purple-400"
              )}>
                {item.icon}
                <span className="group-hover:text-white">{item.title}</span>
              
            </Link>
          </div>
        ))}
        <div className="w-full h-px bg-gray-700 my-10" />
        <LoggingOut />
      </div>
    </>
  );
}
