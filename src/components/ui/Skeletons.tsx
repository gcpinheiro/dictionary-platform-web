import { Skeleton } from "./Skeleton";

export function SearchResultsSkeleton() {
  return (
    <div className="mt-4 grid gap-3" aria-label="Carregando resultados">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          className="rounded-xl border border-[#E2E8F0] bg-white px-4 py-3"
          key={index}
        >
          <div className="flex items-center justify-between gap-4">
            <Skeleton className="h-5 w-28" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function HistorySkeleton() {
  return (
    <section
      aria-label="Carregando histórico"
      className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm"
    >
      <Skeleton className="h-6 w-44" />
      <div className="mt-4 flex flex-wrap gap-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton className="h-10 w-24" key={index} />
        ))}
      </div>
    </section>
  );
}

export function FavoriteListSkeleton() {
  return (
    <div className="grid gap-4" aria-label="Carregando favoritos">
      {Array.from({ length: 3 }).map((_, index) => (
        <section
          className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm"
          key={index}
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <Skeleton className="h-4 w-32" />
              <Skeleton className="mt-3 h-7 w-36" />
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Skeleton className="h-11 w-28" />
              <Skeleton className="h-11 w-44" />
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}

export function DictionaryGridSkeleton() {
  return (
    <div
      aria-label="Carregando dicionário"
      className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
    >
      {Array.from({ length: 9 }).map((_, index) => (
        <section
          className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm"
          key={index}
        >
          <Skeleton className="h-4 w-20" />
          <Skeleton className="mt-4 h-7 w-32" />
          <Skeleton className="mt-3 h-4 w-24" />
        </section>
      ))}
    </div>
  );
}

export function WordDetailsSkeleton() {
  return (
    <div className="mt-6 grid gap-6" aria-label="Carregando detalhes">
      <Skeleton className="h-12 w-full" />
      {Array.from({ length: 2 }).map((_, index) => (
        <section
          className="rounded-2xl border border-[#E2E8F0] p-5"
          key={index}
        >
          <Skeleton className="h-6 w-28" />
          <div className="mt-4 grid gap-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-11/12" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </section>
      ))}
    </div>
  );
}

export function PageLoadingSkeleton() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] px-4 py-8 sm:px-6 lg:px-8">
      <section className="mx-auto grid w-full max-w-5xl gap-6">
        <Skeleton className="h-5 w-48" />
        <section className="rounded-2xl border border-[#E2E8F0] bg-white p-8 shadow-sm">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="mt-4 h-9 w-64" />
          <Skeleton className="mt-4 h-5 w-80 max-w-full" />
        </section>
        <WordDetailsSkeleton />
      </section>
    </main>
  );
}

export function AuthenticatedPageSkeleton() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] px-4 py-8 sm:px-6 lg:px-8">
      <section className="mx-auto grid w-full max-w-6xl gap-6 lg:grid-cols-[1fr_320px]">
        <div className="grid gap-6">
          <section className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm sm:p-8">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="mt-4 h-10 w-72 max-w-full" />
            <Skeleton className="mt-4 h-5 w-96 max-w-full" />
          </section>
          <section className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
            <Skeleton className="h-6 w-44" />
            <Skeleton className="mt-4 h-14 w-full" />
            <SearchResultsSkeleton />
          </section>
        </div>
        <aside className="grid content-start gap-4">
          {Array.from({ length: 2 }).map((_, index) => (
            <section
              className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm"
              key={index}
            >
              <Skeleton className="h-10 w-10" />
              <Skeleton className="mt-4 h-6 w-28" />
              <Skeleton className="mt-3 h-4 w-full" />
              <Skeleton className="mt-2 h-4 w-3/4" />
            </section>
          ))}
        </aside>
      </section>
    </main>
  );
}
