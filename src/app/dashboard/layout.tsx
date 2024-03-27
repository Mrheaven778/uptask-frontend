import { Metadata } from "next";
import { Roboto } from "next/font/google";
export const metadata: Metadata = {
    title: "Up task - Dashboard",
    description: "Esta es una aplicación de tareas y proyectos",
};

const roboto = Roboto({
    weight: ["100","300","400", "500","700","900"],
    subsets: ["latin"],
});

export default function LayoutDashboard({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div className={`${roboto.className} `}>{children}</div>
        </>
    )
}