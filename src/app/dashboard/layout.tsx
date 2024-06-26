import UserAuth from "@/components/auth/UserAuth";
import { Header, NavMobile } from "@/components/ui";
import { Metadata } from "next";
import { Roboto } from "next/font/google";
export const metadata: Metadata = {
  title: "Up task - Dashboard",
  description: "Esta es una aplicación de tareas y proyectos",
};

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
});

export default function LayoutDashboard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <UserAuth>
        <Header />
        <NavMobile />
        <div
          className={`${roboto.className} mt-10 p-5 max-w-screen-xl mx-auto`}
        >
          {children}
        </div>
      </UserAuth>
    </>
  );
}
