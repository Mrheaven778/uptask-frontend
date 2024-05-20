"use client";
import { FingerPrintIcon, UserIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { redirect, usePathname, useRouter } from "next/navigation";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Tabs() {
  const tabs = [
    { name: "Mi Cuenta", href: "/dashboard/profile", icon: UserIcon },
    {
      name: "Cambiar Contraseña",
      href: "/dashboard/profile/password",
      icon: FingerPrintIcon,
    },
  ];
  const router = usePathname();
  const currentTab = tabs.find((tab) => tab.href === router)?.href || "";
  const redirect = useRouter();

  return (
    <div className="mb-10 bg-gray-800 text-white">
      <div className="sm:hidden">
        <select
          id="tabs"
          name="tabs"
          className="block w-full rounded-md bg-gray-700 text-white focus:border-purple-800 focus:ring-purple-800"
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            redirect.push(e.target.value)
          }
          value={currentTab}
        >
          {tabs.map((tab) => {
            return (
              <option value={tab.href} key={tab.name}>
                {tab.name}
              </option>
            );
          })}
        </select>
      </div>

      <div className="hidden sm:block">
        <div className="border-b border-gray-700">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {tabs.map((tab) => (
              <Link
                href={tab.href}
                key={tab.name}
                className={classNames(
                  router === tab.href
                    ? "border-purple-400 text-purple-400"
                    : "border-transparent text-gray-500 hover:border-purple-400 hover:text-purple-400",
                  "group inline-flex items-center border-b-2 py-4 px-1 text-sm font-medium transition-colors duration-200"
                )}
              >
                <tab.icon
                  className={classNames(
                    router === tab.href
                      ? "text-purple-400"
                      : "text-gray-400 group-hover:text-purple-400 transition-colors duration-200",
                    "-ml-0.5 mr-2 h-5 w-5"
                  )}
                  aria-hidden="true"
                />
                <span>{tab.name}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
