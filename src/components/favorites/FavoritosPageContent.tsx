"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AppHeader } from "@/components/layout/AppHeader";
import { FavoriteListSkeleton } from "@/components/ui/Skeletons";
import { getAuthSession } from "@/lib/auth-storage";
import { getFavorites, removeFavorite } from "@/services/favorites.service";
import type { FavoriteWord } from "@/types/favorite";
import { ListaFavoritos } from "./ListaFavoritos";
import { ModalConfirmacaoRemocao } from "./ModalConfirmacaoRemocao";

export function FavoritosPageContent() {
  const [favorites, setFavorites] = useState<FavoriteWord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [feedback, setFeedback] = useState("");
  const [removingId, setRemovingId] = useState("");
  const [favoriteToRemove, setFavoriteToRemove] =
    useState<FavoriteWord | null>(null);

  useEffect(() => {
    async function loadFavorites() {
      const session = getAuthSession();

      if (!session) {
        setIsLoading(false);
        return;
      }

      try {
        const userFavorites = await getFavorites(session.user.id);
        setFavorites(userFavorites);
      } catch {
        setError("Não foi possível carregar seus favoritos.");
      } finally {
        setIsLoading(false);
      }
    }

    loadFavorites();
  }, []);

  async function handleRemoveFavorite() {
    if (!favoriteToRemove) {
      return;
    }

    const favorite = favoriteToRemove;

    setRemovingId(favorite.id);
    setFeedback("");
    setError("");

    try {
      await removeFavorite(favorite.id);
      setFavorites((currentFavorites) =>
        currentFavorites.filter((item) => item.id !== favorite.id),
      );
      setFeedback(`${favorite.word} foi removida dos favoritos.`);
      setFavoriteToRemove(null);
    } catch {
      setError("Não foi possível remover o favorito. Tente novamente.");
    } finally {
      setRemovingId("");
    }
  }

  return (
    <>
      <AppHeader />
      <main className="min-h-screen bg-[#F8FAFC] px-4 py-8 sm:px-6 lg:px-8">
      <section className="mx-auto w-full max-w-5xl">
        <header className="animate-fade-in-up flex flex-col gap-4 rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-[#2563EB]">
              Favoritos
            </p>
            <h1 className="mt-3 text-[32px] font-bold leading-tight text-[#0F172A]">
              Palavras favoritas
            </h1>
            <p className="mt-3 text-base text-[#475569]">
              Acesse rapidamente as palavras que você salvou.
            </p>
          </div>

          <Link
            className="inline-flex h-11 items-center justify-center rounded-xl bg-[#2563EB] px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1D4ED8] focus:outline-none focus:ring-4 focus:ring-[#DBEAFE]"
            href="/"
          >
            Voltar para início
          </Link>
        </header>

        <div className="mt-6">
          {isLoading ? <FavoriteListSkeleton /> : null}

          {error ? (
            <section className="rounded-2xl border border-red-100 bg-red-50 p-6">
              <p className="text-sm text-[#DC2626]">{error}</p>
            </section>
          ) : null}

          {feedback ? (
            <section className="mb-4 rounded-2xl border border-green-100 bg-green-50 p-4">
              <p className="text-sm text-[#16A34A]">{feedback}</p>
            </section>
          ) : null}

          {!isLoading && !error && !favorites.length ? (
            <section className="rounded-2xl border border-[#E2E8F0] bg-white p-8 text-center shadow-sm">
              <p className="text-base font-medium text-[#475569]">
                Você ainda não possui palavras favoritas.
              </p>
              <Link
                className="mt-5 inline-flex h-11 items-center justify-center rounded-xl bg-[#2563EB] px-4 text-sm font-semibold text-white transition hover:bg-[#1D4ED8] focus:outline-none focus:ring-4 focus:ring-[#DBEAFE]"
                href="/dicionario"
              >
                Explorar dicionário
              </Link>
            </section>
          ) : null}

          {!isLoading && !error && favorites.length ? (
            <ListaFavoritos
              favorites={favorites}
              onRemove={setFavoriteToRemove}
              removingId={removingId}
            />
          ) : null}
        </div>
      </section>
    </main>

      {favoriteToRemove ? (
        <ModalConfirmacaoRemocao
          favorite={favoriteToRemove}
          isRemoving={removingId === favoriteToRemove.id}
          onCancel={() => setFavoriteToRemove(null)}
          onConfirm={handleRemoveFavorite}
        />
      ) : null}
    </>
  );
}
