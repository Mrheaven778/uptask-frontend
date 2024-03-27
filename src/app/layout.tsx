import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header, NavMobile, Footer } from '@/components/ui/index';
import { Toaster } from "sonner";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Up task",
  description: "Esta es una aplicación de tareas y proyectos",
  icons: [
    '/logo.svg'
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <NavMobile />
        <section className="mt-10 p-5 max-w-screen-xl mx-auto">
          {children}
          <Footer />
        </section>
        <Toaster />
      </body>
    </html>
  );
}
