import { AuthGuard } from "@/components/auth/AuthGuard";

export default function DictionaryPage() {
  return (
    <AuthGuard>
      <main className="min-h-screen bg-[#F8FAFC] px-4 py-8">
        <section className="mx-auto w-full max-w-5xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-[#2563EB]">
            Dicionário
          </p>
          <h1 className="mt-3 text-[32px] font-bold leading-tight text-[#0F172A]">
            Navegue por todas as palavras
          </h1>
        </section>
      </main>
    </AuthGuard>
  );
}

