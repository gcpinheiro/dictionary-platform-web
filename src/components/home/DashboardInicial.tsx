"use client";

import { BookOpenText, Heart } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LogoutButton } from "@/components/auth/LogoutButton";
import { getAuthSession } from "@/lib/auth-storage";
import type { AuthSession } from "@/types/auth";
import { BuscaPalavras } from "./BuscaPalavras";

export function DashboardInicial() {
  const [session, setSession] = useState<AuthSession | null>(null);

  useEffect(() => {
    setSession(getAuthSession());
  }, []);

  if (!session) {
    return (
      <main className="min-h-screen bg-[#F8FAFC] px-4 py-8">
        <p className="text-sm font-medium text-[#475569]">
          Carregando sessão...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8FAFC] px-4 py-6 sm:px-6 lg:px-8">
      <header className="mx-auto flex w-full max-w-6xl flex-col gap-4 rounded-2xl border border-[#E2E8F0] bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <Link className="flex items-center gap-3" href="/">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#DBEAFE] text-[#2563EB]">
            <BookOpenText aria-hidden="true" size={20} />
          </span>
          <span className="text-base font-bold text-[#0F172A]">
            Plataforma de Dicionário
          </span>
        </Link>

        <nav
          aria-label="Navegação principal"
          className="flex flex-wrap items-center gap-3"
        >
          <Link
            className="text-sm font-semibold text-[#475569] transition hover:text-[#2563EB] focus:outline-none focus:ring-4 focus:ring-[#DBEAFE]"
            href="/favoritos"
          >
            Favoritos
          </Link>
          <Link
            className="text-sm font-semibold text-[#475569] transition hover:text-[#2563EB] focus:outline-none focus:ring-4 focus:ring-[#DBEAFE]"
            href="/dicionario"
          >
            Dicionário
          </Link>
          <LogoutButton />
        </nav>
      </header>

      <section className="mx-auto mt-8 grid w-full max-w-6xl gap-6 lg:grid-cols-[1fr_320px]">
        <div className="grid gap-6">
          <section className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-wide text-[#2563EB]">
              Bem-vindo de volta
            </p>
            <h1 className="mt-3 text-[32px] font-bold leading-tight text-[#0F172A]">
              Olá, {session.user.name}
            </h1>
            <p className="mt-3 max-w-2xl text-base text-[#475569]">
              Pesquise palavras em inglês, consulte definições e retome buscas recentes.
            </p>
          </section>

          <BuscaPalavras userId={session.user.id} />
        </div>

        <aside className="grid content-start gap-4">
          <Link
            className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm transition hover:border-[#2563EB] hover:shadow-md focus:outline-none focus:ring-4 focus:ring-[#DBEAFE]"
            href="/favoritos"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#DBEAFE] text-[#2563EB]">
              <Heart aria-hidden="true" size={20} />
            </span>
            <h2 className="mt-4 text-lg font-semibold text-[#0F172A]">
              Favoritos
            </h2>
            <p className="mt-2 text-sm text-[#475569]">
              Acesse rapidamente as palavras que você salvou.
            </p>
          </Link>

          <Link
            className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm transition hover:border-[#2563EB] hover:shadow-md focus:outline-none focus:ring-4 focus:ring-[#DBEAFE]"
            href="/dicionario"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#DBEAFE] text-[#2563EB]">
              <BookOpenText aria-hidden="true" size={20} />
            </span>
            <h2 className="mt-4 text-lg font-semibold text-[#0F172A]">
              Dicionário
            </h2>
            <p className="mt-2 text-sm text-[#475569]">
              Navegue pela lista completa de palavras disponíveis.
            </p>
          </Link>
        </aside>
      </section>
    </main>
  );
}
