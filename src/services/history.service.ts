import { request } from "@/services/http";
import type { SearchHistoryItem } from "@/types/word";

export async function getSearchHistory(
  userId: string,
): Promise<SearchHistoryItem[]> {
  return request<SearchHistoryItem[]>(
    `/history?userId=${encodeURIComponent(userId)}&_sort=createdAt&_order=desc`,
  );
}

export async function addSearchHistory(
  item: Omit<SearchHistoryItem, "id" | "createdAt">,
): Promise<SearchHistoryItem> {
  return request<SearchHistoryItem>("/history", {
    method: "POST",
    body: JSON.stringify({
      ...item,
      createdAt: new Date().toISOString(),
    }),
  });
}

