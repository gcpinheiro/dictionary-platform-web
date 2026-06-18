"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { addSearchHistory, getRecentSearches } from "@/services/history.service";
import { searchWords } from "@/services/words.service";
import { HistorySkeleton, SearchResultsSkeleton } from "@/components/ui/Skeletons";
import type { SearchHistoryItem } from "@/types/history";
import type { WordSummary } from "@/types/word";
import { HistoricoPesquisas } from "./HistoricoPesquisas";
import { ListaResultados } from "./ListaResultados";

interface BuscaPalavrasProps {
  userId: string;
}

export function BuscaPalavras({ userId }: BuscaPalavrasProps) {
  const router = useRouter();
  const [term, setTerm] = useState("");
  const [results, setResults] = useState<WordSummary[]>([]);
  const [history, setHistory] = useState<SearchHistoryItem[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const [selectedWord, setSelectedWord] = useState("");
  const [searchError, setSearchError] = useState("");
  const [historyError, setHistoryError] = useState("");
  const debouncedTerm = useDebounce(term, 400);
  const shouldSearch = debouncedTerm.trim().length >= 2;

  useEffect(() => {
    async function loadHistory() {
      try {
        const recentSearches = await getRecentSearches(userId);
        setHistory(recentSearches);
      } catch {
        setHistoryError("Não foi possível carregar o histórico.");
      } finally {
        setIsLoadingHistory(false);
      }
    }

    loadHistory();
  }, [userId]);

  useEffect(() => {
    if (!shouldSearch) {
      setResults([]);
      setSearchError("");
      setIsSearching(false);
      return;
    }

    let isActive = true;

    async function loadResults() {
      setIsSearching(true);
      setSearchError("");

      try {
        const words = await searchWords(debouncedTerm.trim());

        if (isActive) {
          setResults(words);
        }
      } catch {
        if (isActive) {
          setResults([]);
          setSearchError("Não foi possível realizar a pesquisa. Tente novamente.");
        }
      } finally {
        if (isActive) {
          setIsSearching(false);
        }
      }
    }

    loadResults();

    return () => {
      isActive = false;
    };
  }, [debouncedTerm, shouldSearch]);

  async function handleSelectWord(word: string) {
    if (selectedWord) {
      return;
    }

    setSelectedWord(word);

    try {
      const historyItem = await addSearchHistory(userId, word);
      setHistory((currentHistory) => [
        historyItem,
        ...currentHistory.filter((item) => item.word !== word),
      ].slice(0, 6));
    } finally {
      router.push(`/palavras/${encodeURIComponent(word)}`);
    }
  }

  return (
    <div className="grid gap-6">
      <section className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
        <label
          className="block text-lg font-semibold text-[#0F172A]"
          htmlFor="word-search"
        >
          Pesquisar palavras
        </label>
        <div className="relative mt-4">
          <Search
            aria-hidden="true"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]"
            size={20}
          />
          <input
            aria-label="Pesquisar palavras"
            className="h-14 w-full rounded-xl border border-[#E2E8F0] bg-white pl-12 pr-4 text-base text-[#0F172A] outline-none transition placeholder:text-[#94A3B8] focus:border-[#2563EB] focus:ring-4 focus:ring-[#DBEAFE]"
            id="word-search"
            onChange={(event) => setTerm(event.target.value)}
            placeholder="Digite uma palavra em inglês..."
            type="search"
            value={term}
          />
        </div>

        {!term.trim() ? (
          <p className="mt-4 text-sm text-[#475569]">
            Digite pelo menos 2 caracteres para iniciar a pesquisa.
          </p>
        ) : null}

        {term.trim() && !shouldSearch ? (
          <p className="mt-4 text-sm text-[#475569]">
            Continue digitando para pesquisar.
          </p>
        ) : null}

        {isSearching ? <SearchResultsSkeleton /> : null}

        {searchError ? (
          <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-[#DC2626]">
            {searchError}
          </p>
        ) : null}

        {shouldSearch && !isSearching && !searchError && !results.length ? (
          <p className="mt-4 rounded-xl bg-[#F8FAFC] px-4 py-3 text-sm text-[#475569]">
            Nenhuma palavra encontrada.
          </p>
        ) : null}

        {results.length ? (
          <ListaResultados
            isSelecting={Boolean(selectedWord)}
            onSelectWord={handleSelectWord}
            results={results}
            selectedWord={selectedWord}
          />
        ) : null}
      </section>

      {isLoadingHistory ? (
        <HistorySkeleton />
      ) : historyError ? (
        <section className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
          <p className="text-sm text-[#DC2626]">{historyError}</p>
        </section>
      ) : (
        <HistoricoPesquisas history={history} />
      )}
    </div>
  );
}
