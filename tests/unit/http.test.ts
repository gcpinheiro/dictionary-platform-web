import { afterEach, describe, expect, it, vi } from "vitest";
import { ApiError, request, requestWithMeta } from "@/services/http";

function createJsonResponse(body: unknown, init?: ResponseInit): Response {
  return new Response(JSON.stringify(body), {
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
    status: init?.status ?? 200,
  });
}

describe("request", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it("retorna o body tipado quando a resposta é bem-sucedida", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
      createJsonResponse({ word: "energy" }),
    );

    const response = await request<{ word: string }>("/words/energy");

    expect(response.word).toBe("energy");
  });

  it("lança ApiError com mensagem da API quando a resposta falha", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
      createJsonResponse({ message: "Palavra não encontrada" }, { status: 404 }),
    );

    await expect(request("/words/unknown")).rejects.toMatchObject({
      name: "ApiError",
      message: "Palavra não encontrada",
      status: 404,
    } satisfies Partial<ApiError>);
  });

  it("retenta chamadas GET com erro transitório", async () => {
    vi.useFakeTimers();

    const fetchMock = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValueOnce(createJsonResponse({}, { status: 500 }))
      .mockResolvedValueOnce(createJsonResponse({ ok: true }));

    const promise = request<{ ok: boolean }>("/words", {
      retry: {
        attempts: 2,
        baseDelayMs: 100,
      },
    });

    await vi.advanceTimersByTimeAsync(100);

    await expect(promise).resolves.toEqual({ ok: true });
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("não retenta mutações POST automaticamente", async () => {
    const fetchMock = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue(createJsonResponse({}, { status: 500 }));

    await expect(
      request("/favorites", {
        method: "POST",
        retry: true,
      }),
    ).rejects.toBeInstanceOf(ApiError);

    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});

describe("requestWithMeta", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("retorna dados e headers da resposta", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
      createJsonResponse([{ word: "energy" }], {
        headers: {
          "X-Total-Count": "100",
        },
      }),
    );

    const response = await requestWithMeta<Array<{ word: string }>>("/words");

    expect(response.data).toEqual([{ word: "energy" }]);
    expect(response.headers.get("X-Total-Count")).toBe("100");
  });
});
