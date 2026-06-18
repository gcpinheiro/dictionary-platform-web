import Link from "next/link";
import type { SearchHistoryItem } from "@/types/history";

interface HistoricoPesquisasProps {
  history: SearchHistoryItem[];
}

export function HistoricoPesquisas({ history }: HistoricoPesquisasProps) {
  return (
    <section className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-[#0F172A]">
        Pesquisas recentes
      </h2>

      {history.length ? (
        <ul className="mt-4 flex flex-wrap gap-2">
          {history.map((item) => (
            <li key={item.id}>
              <Link
                className="inline-flex h-10 items-center rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 text-sm font-semibold text-[#0F172A] transition hover:border-[#2563EB] hover:text-[#2563EB] focus:outline-none focus:ring-4 focus:ring-[#DBEAFE]"
                href={`/palavras/${encodeURIComponent(item.word)}`}
              >
                {item.word}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 text-sm text-[#475569]">
          Suas pesquisas recentes aparecerão aqui.
        </p>
      )}
    </section>
  );
}

