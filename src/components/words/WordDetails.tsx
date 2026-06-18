import Link from "next/link";
import type { WordDetail } from "@/types/word";
import { FavoriteButton } from "./FavoriteButton";

interface WordDetailsProps {
  word: WordDetail | null;
  requestedWord: string;
  errorMessage: string;
}

export function WordDetails({
  word,
  requestedWord,
  errorMessage,
}: WordDetailsProps) {
  if (errorMessage || !word) {
    const isNotFound = errorMessage === "Palavra não encontrada" || !word;

    return (
      <section className="mx-auto w-full max-w-5xl">
        <div className="rounded-2xl border border-[#E2E8F0] bg-white p-8 text-center shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-wide text-[#2563EB]">
            Palavra
          </p>
          <h1 className="mt-3 text-[32px] font-bold leading-tight text-[#0F172A]">
            {requestedWord}
          </h1>
          <p className="mt-4 text-base text-[#475569]">
            {isNotFound
              ? "Palavra não encontrada"
              : "Não foi possível carregar os detalhes da palavra."}
          </p>
          <Link
            className="mt-6 inline-flex h-11 items-center justify-center rounded-xl bg-[#2563EB] px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1D4ED8] focus:outline-none focus:ring-4 focus:ring-[#DBEAFE]"
            href="/"
          >
            Voltar para início
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto grid w-full max-w-5xl gap-6">
      <header className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-[#2563EB]">
              Detalhes da palavra
            </p>
            <h1 className="mt-3 text-[32px] font-bold leading-tight text-[#0F172A]">
              {word.word}
            </h1>
            {word.phonetic ? (
              <p className="mt-3 text-base font-medium text-[#475569]">
                Fonética: {word.phonetic}
              </p>
            ) : null}
          </div>
          <FavoriteButton word={word.word} wordId={word.id} />
        </div>
      </header>

      <section className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-2xl font-bold text-[#0F172A]">Definições</h2>

        <div className="mt-6 grid gap-6">
          {word.meanings.map((meaning) => (
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
                      <div className="mt-3 rounded-xl bg-[#F8FAFC] px-4 py-3">
                        <p className="text-sm font-semibold text-[#0F172A]">
                          Exemplos
                        </p>
                        <p className="mt-1 text-sm text-[#475569]">
                          {definition.example}
                        </p>
                      </div>
                    ) : null}
                  </li>
                ))}
              </ol>

              {meaning.synonyms?.length ? (
                <div className="mt-6">
                  <h4 className="text-sm font-semibold text-[#0F172A]">
                    Sinônimos
                  </h4>
                  <div className="mt-3 flex flex-wrap gap-2">
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
      </section>
    </section>
  );
}

