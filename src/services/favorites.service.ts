import { request } from "@/services/http";
import type { FavoriteWord } from "@/types/favorite";

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
  await request<void>(`/favorites/${id}`, {
    method: "DELETE",
  });
}
