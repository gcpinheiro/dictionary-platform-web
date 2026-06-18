import { API_URL } from "@/config/env";
import { request } from "@/services/http";
import type { FavoriteWord } from "@/types/word";

export async function getFavorites(userId: string): Promise<FavoriteWord[]> {
  return request<FavoriteWord[]>(
    `/favorites?userId=${encodeURIComponent(userId)}`,
  );
}

export async function addFavorite(
  favorite: Omit<FavoriteWord, "id">,
): Promise<FavoriteWord> {
  return request<FavoriteWord>("/favorites", {
    method: "POST",
    body: JSON.stringify(favorite),
  });
}

export async function removeFavorite(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/favorites/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Não foi possível remover o favorito");
  }
}
