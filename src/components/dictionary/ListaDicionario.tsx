import type { WordSummary } from "@/types/word";

interface ListaDicionarioProps {
  words: WordSummary[];
  onSelectWord: (word: string) => void;
}

export function ListaDicionario({ words, onSelectWord }: ListaDicionarioProps) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {words.map((item) => (
        <li key={item.id}>
          <button
            className="flex h-full w-full flex-col items-start rounded-2xl border border-[#E2E8F0] bg-white p-5 text-left shadow-sm transition hover:border-[#2563EB] hover:shadow-md focus:outline-none focus:ring-4 focus:ring-[#DBEAFE]"
            onClick={() => onSelectWord(item.word)}
            type="button"
          >
            <span className="text-sm font-semibold uppercase tracking-wide text-[#2563EB]">
              Palavra
            </span>
            <span className="mt-3 text-xl font-bold text-[#0F172A]">
              {item.word}
            </span>
            <span className="mt-2 text-sm text-[#475569]">
              Abrir detalhes
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}

