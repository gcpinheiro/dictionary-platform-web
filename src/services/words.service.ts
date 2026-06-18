import { request } from "@/services/http";
import type { PaginatedResponse } from "@/types/api";
import type { WordDetail, WordSummary } from "@/types/word";

export async function searchWords(query: string): Promise<WordSummary[]> {
  if (!query.trim()) {
    return [];
  }

  return request<WordSummary[]>(`/words?q=${encodeURIComponent(query)}`);
}

export async function getWordDetails(word: string): Promise<WordDetail> {
  const words = await request<WordDetail[]>(
    `/words?word=${encodeURIComponent(word)}`,
  );
  const [wordDetails] = words;

  if (!wordDetails) {
    throw new Error("Palavra não encontrada");
  }

  return wordDetails;
}

export async function getDictionaryWords(
  page: number,
  perPage: number,
): Promise<PaginatedResponse<WordDetail>> {
  return request<PaginatedResponse<WordDetail>>(
    `/words?_page=${page}&_per_page=${perPage}`,
  );
}
