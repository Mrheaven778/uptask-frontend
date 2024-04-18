import Logo from "@/components/ui/Logo";
import { Metadata } from "next";
import { Roboto } from "next/font/google";
export const metadata: Metadata = {
  title: "Up task - Login",
  description: "Login to your account",
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
  <div className="bg-gray-900 min-h-screen flex items-center justify-center">
    <div className="py-10 lg:py-20 mx-auto w-[450px]">
      <Logo alt="Logo de la empresa" height={400} width={400}/>
      <div className={`${roboto.className} mt-10 text-white`}>
        {children}
      </div>
    </div>
  </div>
</>

  );
}
