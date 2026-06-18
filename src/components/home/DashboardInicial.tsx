"use client";

import { BookOpenText, Heart } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AppHeader } from "@/components/layout/AppHeader";
import { AuthenticatedPageSkeleton } from "@/components/ui/Skeletons";
import { getAuthSession } from "@/lib/auth-storage";
import type { AuthSession } from "@/types/auth";
import { BuscaPalavras } from "./BuscaPalavras";

export function DashboardInicial() {
  const [session, setSession] = useState<AuthSession | null>(null);

  useEffect(() => {
    setSession(getAuthSession());
  }, []);

  if (!session) {
    return <AuthenticatedPageSkeleton />;
  }

  return (
    <>
      <AppHeader />
      <main className="min-h-screen bg-[#F8FAFC] px-4 py-8 sm:px-6 lg:px-8">
        <section className="mx-auto grid w-full max-w-6xl gap-6 lg:grid-cols-[1fr_320px]">
        <div className="grid gap-6">
          <section className="animate-fade-in-up rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm sm:p-8">
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
            className="cursor-pointer rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm transition hover:border-[#2563EB] hover:shadow-md focus:outline-none focus:ring-4 focus:ring-[#DBEAFE]"
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
            className="cursor-pointer rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm transition hover:border-[#2563EB] hover:shadow-md focus:outline-none focus:ring-4 focus:ring-[#DBEAFE]"
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
    </>
  );
}
