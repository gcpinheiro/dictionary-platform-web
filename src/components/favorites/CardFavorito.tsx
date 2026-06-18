import Link from "next/link";
import type { FavoriteWord } from "@/types/favorite";

interface CardFavoritoProps {
  favorite: FavoriteWord;
  isRemoving: boolean;
  onRemove: (favorite: FavoriteWord) => void;
}

export function CardFavorito({
  favorite,
  isRemoving,
  onRemove,
}: CardFavoritoProps) {
  return (
    <article className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-[#2563EB]">
            Palavra favorita
          </p>
          <h2 className="mt-2 text-2xl font-bold text-[#0F172A]">
            {favorite.word}
          </h2>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            className="inline-flex h-11 items-center justify-center rounded-xl border border-[#E2E8F0] bg-white px-4 text-sm font-semibold text-[#0F172A] transition hover:bg-[#F8FAFC] focus:outline-none focus:ring-4 focus:ring-[#DBEAFE]"
            href={`/palavras/${encodeURIComponent(favorite.word)}`}
          >
            Ver detalhes
          </Link>
          <button
            className="inline-flex h-11 items-center justify-center rounded-xl bg-[#DC2626] px-4 text-sm font-semibold text-white transition hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-100 disabled:cursor-not-allowed disabled:opacity-70"
            disabled={isRemoving}
            onClick={() => onRemove(favorite)}
            type="button"
          >
            {isRemoving ? "Removendo..." : "Remover dos favoritos"}
          </button>
        </div>
      </div>
    </article>
  );
}

