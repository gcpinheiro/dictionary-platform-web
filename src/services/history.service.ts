import { request } from "@/services/http";
import type { SearchHistoryItem } from "@/types/history";

export async function getRecentSearches(
  userId: string,
): Promise<SearchHistoryItem[]> {
  return request<SearchHistoryItem[]>(
    `/history?userId=${encodeURIComponent(userId)}&_sort=createdAt&_order=desc&_limit=6`,
  );
}

export async function addSearchHistory(
  userId: string,
  word: string,
): Promise<SearchHistoryItem> {
  return request<SearchHistoryItem>("/history", {
    method: "POST",
    body: JSON.stringify({
      userId,
      word,
      createdAt: new Date().toISOString(),
    }),
  });
}

export const getSearchHistory = getRecentSearches;
