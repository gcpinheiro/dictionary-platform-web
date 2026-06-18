import { AuthGuard } from "@/components/auth/AuthGuard";
import { LogoutButton } from "@/components/auth/LogoutButton";

export default function Home() {
  return (
    <AuthGuard>
      <main className="min-h-screen bg-[#F8FAFC] px-4 py-8">
        <section className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-[#2563EB]">
              Plataforma de dicionário
            </p>
            <h1 className="mt-3 text-[32px] font-bold leading-tight text-[#0F172A]">
              Explore palavras em inglês.
            </h1>
          </div>
          <LogoutButton />
        </section>
      </main>
    </AuthGuard>
  );
}
