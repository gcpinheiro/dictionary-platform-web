"use client";

import { X } from "lucide-react";
import { useEffect, useId, useState } from "react";
import { WordDetailsSkeleton } from "@/components/ui/Skeletons";
import { PronunciationButton } from "@/components/words/PronunciationButton";
import { getWordDetails } from "@/services/words.service";
import type { WordDetail } from "@/types/word";

interface ModalDetalhesPalavraProps {
  word: string;
  onClose: () => void;
}

export function ModalDetalhesPalavra({
  word,
  onClose,
}: ModalDetalhesPalavraProps) {
  const titleId = useId();
  const [details, setDetails] = useState<WordDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isActive = true;

    async function loadDetails() {
      setIsLoading(true);
      setError("");

      try {
        const wordDetails = await getWordDetails(word);

        if (isActive) {
          setDetails(wordDetails);
        }
      } catch {
        if (isActive) {
          setError("Não foi possível carregar os detalhes da palavra.");
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    }

    loadDetails();

    return () => {
      isActive = false;
    };
  }, [word]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0F172A]/40 px-4 py-6">
      <section
        aria-labelledby={titleId}
        aria-modal="true"
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-md"
        role="dialog"
      >
        <header className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-[#2563EB]">
              Detalhes da palavra
            </p>
            <h2
              className="mt-2 text-[32px] font-bold leading-tight text-[#0F172A]"
              id={titleId}
            >
              {word}
            </h2>
            <div className="mt-4">
              <PronunciationButton word={word} />
            </div>
          </div>
          <button
            aria-label="Fechar modal"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#E2E8F0] text-[#475569] transition hover:bg-[#F8FAFC] focus:outline-none focus:ring-4 focus:ring-[#DBEAFE]"
            onClick={onClose}
            type="button"
          >
            <X aria-hidden="true" size={18} />
          </button>
        </header>

        {isLoading ? <WordDetailsSkeleton /> : null}

        {error ? (
          <p className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-[#DC2626]">
            {error}
          </p>
        ) : null}

        {details && !isLoading && !error ? (
          <div className="mt-6 grid gap-6">
            {details.phonetic ? (
              <p className="rounded-xl bg-[#F8FAFC] px-4 py-3 text-base font-medium text-[#475569]">
                Fonética: {details.phonetic}
              </p>
            ) : null}

            {details.meanings.map((meaning) => (
              <article
                className="rounded-2xl border border-[#E2E8F0] p-5"
                key={meaning.partOfSpeech}
              >
                <h3 className="text-lg font-semibold text-[#0F172A]">
                  {meaning.partOfSpeech}
                </h3>

                <ol className="mt-4 grid list-decimal gap-4 pl-5 text-[#475569]">
                  {meaning.definitions.map((definition) => (
                    <li key={definition.definition}>
                      <p>{definition.definition}</p>
                      {definition.example ? (
                        <p className="mt-2 text-sm text-[#64748B]">
                          Exemplo: {definition.example}
                        </p>
                      ) : null}
                    </li>
                  ))}
                </ol>

                {meaning.synonyms?.length ? (
                  <div className="mt-5">
                    <p className="text-sm font-semibold text-[#0F172A]">
                      Sinônimos
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {meaning.synonyms.map((synonym) => (
                        <span
                          className="rounded-xl bg-[#DBEAFE] px-3 py-1 text-sm font-medium text-[#2563EB]"
                          key={synonym}
                        >
                          {synonym}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        ) : null}

        <footer className="mt-6 flex justify-end">
          <button
            className="inline-flex h-11 items-center justify-center rounded-xl bg-[#2563EB] px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1D4ED8] focus:outline-none focus:ring-4 focus:ring-[#DBEAFE]"
            onClick={onClose}
            type="button"
          >
            Fechar
          </button>
        </footer>
      </section>
    </div>
  );
}
