import { request, requestWithMeta } from "@/services/http";
import type { PaginatedResponse } from "@/types/api";
import type { WordDetail, WordSummary } from "@/types/word";

export async function searchWords(query: string): Promise<WordSummary[]> {
  if (!query.trim()) {
    return [];
  }

  return request<WordSummary[]>(`/words?q=${encodeURIComponent(query)}`, {
    cache: "no-store",
    retry: true,
  });
}

export async function getWordDetails(word: string): Promise<WordDetail> {
  const words = await request<WordDetail[]>(
    `/words?word=${encodeURIComponent(word)}`,
    {
      cache: "force-cache",
      next: {
        revalidate: 3600,
      },
      retry: true,
    },
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
  const response = await requestWithMeta<WordDetail[]>(
    `/words?_page=${page}&_limit=${perPage}`,
    {
      cache: "force-cache",
      next: {
        revalidate: 300,
      },
      retry: true,
    },
  );
  const totalItems = Number(response.headers.get("X-Total-Count"));

  if (Number.isFinite(totalItems) && totalItems > 0) {
    const totalPages = Math.ceil(totalItems / perPage);

    return {
      data: response.data,
      items: totalItems,
      pages: totalPages,
      prev: page > 1 ? page - 1 : undefined,
      next: page < totalPages ? page + 1 : undefined,
    };
  }

  return {
    data: response.data,
    items: response.data.length,
    next: response.data.length === perPage ? page + 1 : undefined,
    pages: response.data.length === perPage ? page + 1 : page,
  };
}
