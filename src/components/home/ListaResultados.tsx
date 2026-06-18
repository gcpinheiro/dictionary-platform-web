import type { WordSummary } from "@/types/word";

interface ListaResultadosProps {
  results: WordSummary[];
  onSelectWord: (word: string) => void;
}

export function ListaResultados({
  results,
  onSelectWord,
}: ListaResultadosProps) {
  return (
    <ul className="mt-4 grid gap-3" aria-label="Resultados encontrados">
      {results.slice(0, 8).map((item) => (
        <li key={item.id}>
          <button
            className="flex w-full items-center justify-between rounded-xl border border-[#E2E8F0] bg-white px-4 py-3 text-left text-base font-semibold text-[#0F172A] transition hover:border-[#2563EB] hover:bg-[#F8FAFC] focus:outline-none focus:ring-4 focus:ring-[#DBEAFE]"
            onClick={() => onSelectWord(item.word)}
            type="button"
          >
            <span>{item.word}</span>
            <span className="text-sm font-medium text-[#94A3B8]">Ver detalhes</span>
          </button>
        </li>
      ))}
    </ul>
  );
}

