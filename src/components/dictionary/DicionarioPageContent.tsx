"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AppHeader } from "@/components/layout/AppHeader";
import { DictionaryGridSkeleton } from "@/components/ui/Skeletons";
import { getDictionaryWords } from "@/services/words.service";
import type { WordDetail } from "@/types/word";
import { ListaDicionario } from "./ListaDicionario";
import { ModalDetalhesPalavra } from "./ModalDetalhesPalavra";
import { PaginacaoDicionario } from "./PaginacaoDicionario";

const WORDS_PER_PAGE = 9;

export function DicionarioPageContent() {
  const [words, setWords] = useState<WordDetail[]>([]);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [selectedWord, setSelectedWord] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isActive = true;

    async function loadWords() {
      setIsLoading(true);
      setError("");

      try {
        const response = await getDictionaryWords(page, WORDS_PER_PAGE);

        if (isActive) {
          setWords(response.data);
          setHasNextPage(Boolean(response.next));
        }
      } catch {
        if (isActive) {
          setWords([]);
          setError("Não foi possível carregar o dicionário.");
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    }

    loadWords();

    return () => {
      isActive = false;
    };
  }, [page]);

  return (
    <>
      <AppHeader />
      <main className="min-h-screen bg-[#F8FAFC] px-4 py-8 sm:px-6 lg:px-8">
      <section className="mx-auto w-full max-w-6xl">
        <header className="animate-fade-in-up flex flex-col gap-4 rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-[#2563EB]">
              Dicionário
            </p>
            <h1 className="mt-3 text-[32px] font-bold leading-tight text-[#0F172A]">
              Dicionário completo
            </h1>
            <p className="mt-3 text-base text-[#475569]">
              Explore palavras em inglês e consulte seus significados.
            </p>
          </div>

          <Link
            className="inline-flex h-11 items-center justify-center rounded-xl border border-[#E2E8F0] bg-white px-4 text-sm font-semibold text-[#0F172A] transition hover:bg-[#F8FAFC] focus:outline-none focus:ring-4 focus:ring-[#DBEAFE]"
            href="/"
          >
            Voltar para início
          </Link>
        </header>

        <div className="mt-6">
          {isLoading ? <DictionaryGridSkeleton /> : null}

          {error ? (
            <section className="rounded-2xl border border-red-100 bg-red-50 p-6">
              <p className="text-sm text-[#DC2626]">{error}</p>
            </section>
          ) : null}

          {!isLoading && !error && !words.length ? (
            <section className="rounded-2xl border border-[#E2E8F0] bg-white p-8 text-center shadow-sm">
              <p className="text-base font-medium text-[#475569]">
                Nenhuma palavra encontrada.
              </p>
            </section>
          ) : null}

          {!isLoading && !error && words.length ? (
            <>
              <ListaDicionario words={words} onSelectWord={setSelectedWord} />
              <PaginacaoDicionario
                currentPage={page}
                hasNextPage={hasNextPage}
                isLoading={isLoading}
                onNextPage={() => setPage((currentPage) => currentPage + 1)}
                onPreviousPage={() =>
                  setPage((currentPage) => Math.max(currentPage - 1, 1))
                }
              />
            </>
          ) : null}
        </div>
      </section>

      {selectedWord ? (
        <ModalDetalhesPalavra
          onClose={() => setSelectedWord("")}
          word={selectedWord}
        />
      ) : null}
    </main>
    </>
  );
}
