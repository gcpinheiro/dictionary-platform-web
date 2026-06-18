import { BookOpenText, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import type { ReactNode } from "react";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
}

export function AuthLayout({
  title,
  subtitle,
  children,
  footer,
}: AuthLayoutProps) {
  return (
    <main className="grid min-h-screen bg-[#F8FAFC] lg:grid-cols-[1.05fr_0.95fr]">
      <section className="relative hidden min-h-screen overflow-hidden bg-[#0F172A] lg:block">
        <Image
          alt="Interface visual da plataforma de dicionário"
          className="h-full w-full object-cover opacity-90"
          fill
          priority
          sizes="50vw"
          src="/images/auth-visual.png"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A]/35 via-[#0F172A]/10 to-[#2563EB]/35" />
        <div className="absolute bottom-10 left-10 right-10 rounded-2xl border border-white/20 bg-white/12 p-6 text-white shadow-md backdrop-blur-md">
          <p className="text-sm font-semibold uppercase tracking-wide text-[#DBEAFE]">
            Plataforma de Dicionário
          </p>
          <h2 className="mt-3 max-w-xl text-3xl font-bold leading-tight">
            Pesquise, favorite e retome palavras com uma experiência clara.
          </h2>
          <div className="mt-5 grid gap-3 text-sm text-white/90">
            <span className="flex items-center gap-2">
              <CheckCircle2 aria-hidden="true" size={18} />
              Busca com histórico recente
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 aria-hidden="true" size={18} />
              Dicionário completo e responsivo
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 aria-hidden="true" size={18} />
              Favoritos sincronizados com a API mockada
            </span>
          </div>
        </div>
      </section>

      <section className="flex min-h-screen items-center justify-center px-4 py-8 sm:px-6 lg:px-12">
        <div className="w-full max-w-md animate-soft-scale">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-[#DBEAFE] text-[#2563EB] shadow-sm">
              <BookOpenText aria-hidden="true" size={24} strokeWidth={2.2} />
            </div>
            <h1 className="text-[32px] font-bold leading-tight text-[#0F172A]">
              {title}
            </h1>
            <p className="mt-3 text-lg font-medium text-[#475569]">
              {subtitle}
            </p>
          </div>

          <section className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-md sm:p-8">
            {children}
            {footer}
          </section>
        </div>
      </section>
    </main>
  );
}
