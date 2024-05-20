import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";

import "./globals.css";
import { Footer, Header, NavMobile } from "@/components/ui/index";
import { Toaster } from "sonner";
import { cn } from "@/lib/utils";
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});
export const metadata: Metadata = {
  title: "Up task",
  description: "Esta es una aplicación de tareas y proyectos",
  icons: ["/logo.svg"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased bg-gray-900",
          fontSans.variable
        )}
      >
          <section>
            {children}
            <Footer />
          </section>
          <Toaster />
      </body>
    </html>
  );
}
