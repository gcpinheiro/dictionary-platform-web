"use client";

import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuthSession } from "@/components/auth/AuthGuard";
import { Skeleton } from "@/components/ui/Skeleton";
import { useToast } from "@/components/ui/ToastProvider";
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
  const { showToast } = useToast();
  const session = useAuthSession();
  const [favorite, setFavorite] = useState<FavoriteWord | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadFavoriteState() {
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
  }, [session.user.id, wordId]);

  async function handleToggleFavorite() {
    setIsUpdating(true);
    setError("");

    try {
      if (favorite) {
        await removeFavorite(favorite.id);
        setFavorite(null);
        showToast({
          type: "success",
          message: "Palavra removida dos favoritos.",
        });
        return;
      }

      const newFavorite = await addFavorite({
        userId: session.user.id,
        wordId,
        word,
      });

      setFavorite(newFavorite);
      showToast({
        type: "success",
        message: "Palavra adicionada aos favoritos.",
      });
    } catch {
      showToast({
        type: "error",
        message: "Não foi possível atualizar o favorito. Tente novamente.",
      });
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

      {error ? <p className="text-sm font-medium text-[#DC2626]">{error}</p> : null}
    </div>
  );
}
