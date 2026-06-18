import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F8FAFC] px-4 py-8">
      <section className="w-full max-w-2xl rounded-2xl border border-[#E2E8F0] bg-white p-8 text-center shadow-md">
        <p className="text-sm font-semibold uppercase tracking-wide text-[#2563EB]">
          Plataforma de dicionário
        </p>
        <h1 className="mt-4 text-[32px] font-bold leading-tight text-[#0F172A]">
          Explore palavras em inglês com uma experiência simples e moderna.
        </h1>
        <p className="mt-4 text-base text-[#475569]">
          Busque definições, exemplos, sinônimos e organize suas palavras favoritas.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            className="inline-flex h-12 items-center justify-center rounded-xl bg-[#2563EB] px-6 text-base font-semibold text-white shadow-sm transition hover:bg-[#1D4ED8] focus:outline-none focus:ring-4 focus:ring-[#DBEAFE]"
            href="/cadastro"
          >
            Criar conta
          </Link>
          <Link
            className="inline-flex h-12 items-center justify-center rounded-xl border border-[#E2E8F0] bg-white px-6 text-base font-semibold text-[#0F172A] transition hover:bg-[#F8FAFC] focus:outline-none focus:ring-4 focus:ring-[#DBEAFE]"
            href="/entrar"
          >
            Entrar
          </Link>
        </div>
      </section>
    </main>
  );
}
