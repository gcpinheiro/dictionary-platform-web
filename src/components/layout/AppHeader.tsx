"use client";

import { BookOpenText, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LogoutButton } from "@/components/auth/LogoutButton";

const navigationItems = [
  { href: "/", label: "Início" },
  { href: "/dicionario", label: "Dicionário" },
  { href: "/favoritos", label: "Favoritos" },
];

export function AppHeader() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-30 border-b border-[#E2E8F0]/80 bg-[#F8FAFC]/95 px-4 py-4 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 rounded-2xl border border-[#E2E8F0] bg-white/95 p-3 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center justify-between gap-3">
          <Link
            className="flex min-w-0 items-center gap-3 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#DBEAFE]"
            href="/"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#DBEAFE] text-[#2563EB]">
              <BookOpenText aria-hidden="true" size={20} />
            </span>
            <span className="truncate text-base font-bold text-[#0F172A]">
              Plataforma de Dicionário
            </span>
          </Link>

          <button
            aria-controls="app-navigation"
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-[#E2E8F0] bg-white text-[#475569] transition hover:bg-[#F8FAFC] hover:text-[#2563EB] focus:outline-none focus:ring-4 focus:ring-[#DBEAFE] sm:hidden"
            onClick={() => setIsMenuOpen((currentValue) => !currentValue)}
            type="button"
          >
            {isMenuOpen ? (
              <X aria-hidden="true" size={20} />
            ) : (
              <Menu aria-hidden="true" size={20} />
            )}
          </button>
        </div>

        <nav
          aria-label="Navegação principal"
          className={`${
            isMenuOpen ? "grid" : "hidden"
          } gap-2 sm:flex sm:flex-wrap sm:items-center`}
          id="app-navigation"
        >
          {navigationItems.map((item) => {
            const isActive =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

            return (
              <Link
                className={`inline-flex h-10 w-full items-center justify-center rounded-xl px-4 text-sm font-semibold transition focus:outline-none focus:ring-4 focus:ring-[#DBEAFE] sm:w-auto ${
                  isActive
                    ? "bg-[#DBEAFE] text-[#2563EB]"
                    : "text-[#475569] hover:bg-[#F8FAFC] hover:text-[#2563EB]"
                }`}
                href={item.href}
                key={item.href}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            );
          })}
          <LogoutButton className="w-full sm:w-auto" />
        </nav>
      </div>
    </header>
  );
}
