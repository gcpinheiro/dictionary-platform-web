"use client";

import { BookOpenText } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoutButton } from "@/components/auth/LogoutButton";

const navigationItems = [
  { href: "/", label: "Início" },
  { href: "/dicionario", label: "Dicionário" },
  { href: "/favoritos", label: "Favoritos" },
];

export function AppHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 border-b border-[#E2E8F0]/80 bg-[#F8FAFC]/95 px-4 py-4 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 rounded-2xl border border-[#E2E8F0] bg-white/95 p-3 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <Link
          className="flex items-center gap-3 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#DBEAFE]"
          href="/"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#DBEAFE] text-[#2563EB]">
            <BookOpenText aria-hidden="true" size={20} />
          </span>
          <span className="text-base font-bold text-[#0F172A]">
            Plataforma de Dicionário
          </span>
        </Link>

        <nav
          aria-label="Navegação principal"
          className="flex flex-wrap items-center gap-2"
        >
          {navigationItems.map((item) => {
            const isActive =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

            return (
              <Link
                className={`inline-flex h-10 items-center rounded-xl px-4 text-sm font-semibold transition focus:outline-none focus:ring-4 focus:ring-[#DBEAFE] ${
                  isActive
                    ? "bg-[#DBEAFE] text-[#2563EB]"
                    : "text-[#475569] hover:bg-[#F8FAFC] hover:text-[#2563EB]"
                }`}
                href={item.href}
                key={item.href}
              >
                {item.label}
              </Link>
            );
          })}
          <LogoutButton />
        </nav>
      </div>
    </header>
  );
}
