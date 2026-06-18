"use client";

import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/Skeleton";
import { getAuthSession } from "@/lib/auth-storage";
import {
  addFavorite,
  getFavorites,
  removeFavorite,
} from "@/services/favorites.service";
import type { FavoriteWord } from "@/types/favorite";

interface FavoriteButtonProps {
  word: string;
  wordId: string;
}

export function FavoriteButton({ word, wordId }: FavoriteButtonProps) {
  const [favorite, setFavorite] = useState<FavoriteWord | null>(null);
  const [userId, setUserId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadFavoriteState() {
      const session = getAuthSession();

      if (!session) {
        setIsLoading(false);
        return;
      }

      setUserId(session.user.id);

      try {
        const favorites = await getFavorites(session.user.id);
        const currentFavorite =
          favorites.find((item) => item.wordId === wordId) ?? null;

        setFavorite(currentFavorite);
      } catch {
        setError("Não foi possível verificar seus favoritos.");
      } finally {
        setIsLoading(false);
      }
    }

    loadFavoriteState();
  }, [wordId]);

  async function handleToggleFavorite() {
    if (!userId) {
      return;
    }

    setIsUpdating(true);
    setFeedback("");
    setError("");

    try {
      if (favorite) {
        await removeFavorite(favorite.id);
        setFavorite(null);
        setFeedback("Palavra removida dos favoritos.");
        return;
      }

      const newFavorite = await addFavorite({
        userId,
        wordId,
        word,
      });

      setFavorite(newFavorite);
      setFeedback("Palavra adicionada aos favoritos.");
    } catch {
      setError("Não foi possível atualizar o favorito. Tente novamente.");
    } finally {
      setIsUpdating(false);
    }
  }

  return (
    <div className="grid gap-3">
      <button
        className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1D4ED8] focus:outline-none focus:ring-4 focus:ring-[#DBEAFE] disabled:cursor-not-allowed disabled:opacity-70"
        disabled={isLoading || isUpdating}
        onClick={handleToggleFavorite}
        type="button"
      >
        <Heart
          aria-hidden="true"
          fill={favorite ? "currentColor" : "none"}
          size={18}
        />
        {favorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
      </button>

      {isLoading ? <Skeleton className="h-4 w-40" /> : null}

      {feedback ? (
        <p className="text-sm font-medium text-[#16A34A]">{feedback}</p>
      ) : null}

      {error ? <p className="text-sm font-medium text-[#DC2626]">{error}</p> : null}
    </div>
  );
}
