"use client";

import { SessionProvider } from "next-auth/react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Toaster } from "@/components/ui/sonner";
import { usePathname } from "next/navigation";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname() ?? "";

  // ✅ Show footer only on homepage
  const isHome = pathname === "/";

  return (
    <SessionProvider>
      {/* Navbar (optional - if you also want to hide it, do the same check) */}
      <Navbar />

      <main className="min-h-screen flex flex-col">{children}</main>

      {/* ✅ Footer only on homepage */}
      {isHome && <Footer />}

      <Toaster />
    </SessionProvider>
  );
}
