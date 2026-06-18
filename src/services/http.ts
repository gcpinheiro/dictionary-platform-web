import { API_URL } from "@/config/env";

interface ApiErrorBody {
  message?: string;
}

interface RetryOptions {
  attempts?: number;
  baseDelayMs?: number;
}

export interface RequestOptions extends RequestInit {
  retry?: boolean | RetryOptions;
}

export interface ApiResponse<T> {
  data: T;
  headers: Headers;
  status: number;
}

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

function getRetryConfig(retry: RequestOptions["retry"]): Required<RetryOptions> {
  if (!retry) {
    return {
      attempts: 1,
      baseDelayMs: 300,
    };
  }

  if (retry === true) {
    return {
      attempts: 3,
      baseDelayMs: 300,
    };
  }

  return {
    attempts: retry.attempts ?? 3,
    baseDelayMs: retry.baseDelayMs ?? 300,
  };
}

function canRetry(status: number): boolean {
  return status === 408 || status === 429 || status >= 500;
}

function isRetryableMethod(method?: string): boolean {
  const normalizedMethod = method?.toUpperCase() ?? "GET";
  return normalizedMethod === "GET" || normalizedMethod === "HEAD";
}

function wait(milliseconds: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

async function readErrorMessage(response: Response): Promise<string> {
  const fallbackMessage = `A requisição falhou com status ${response.status}`;

  try {
    const body = (await response.json()) as ApiErrorBody;
    return body.message ?? fallbackMessage;
  } catch {
    return fallbackMessage;
  }
}

async function parseResponse<T>(response: Response): Promise<T> {
  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

async function executeRequest<T>(
  path: string,
  options?: RequestOptions,
): Promise<ApiResponse<T>> {
  const { retry, ...init } = options ?? {};
  const retryConfig = getRetryConfig(retry);
  const shouldRetry = Boolean(retry) && isRetryableMethod(init.method);
  let lastError: unknown;

  for (let attempt = 1; attempt <= retryConfig.attempts; attempt += 1) {
    try {
      const response = await fetch(`${API_URL}${path}`, {
        ...init,
        headers: {
          "Content-Type": "application/json",
          ...init.headers,
        },
      });

      if (!response.ok) {
        const message = await readErrorMessage(response);
        const error = new ApiError(message, response.status);

        if (
          shouldRetry &&
          canRetry(response.status) &&
          attempt < retryConfig.attempts
        ) {
          await wait(retryConfig.baseDelayMs * 2 ** (attempt - 1));
          continue;
        }

        throw error;
      }

      return {
        data: await parseResponse<T>(response),
        headers: response.headers,
        status: response.status,
      };
    } catch (error) {
      lastError = error;

      if (
        error instanceof ApiError ||
        !shouldRetry ||
        attempt >= retryConfig.attempts
      ) {
        throw error;
      }

      await wait(retryConfig.baseDelayMs * 2 ** (attempt - 1));
    }
  }

  throw lastError;
}

export async function request<T>(
  path: string,
  options?: RequestOptions,
): Promise<T> {
  const response = await executeRequest<T>(path, options);
  return response.data;
}

export async function requestWithMeta<T>(
  path: string,
  options?: RequestOptions,
): Promise<ApiResponse<T>> {
  return executeRequest<T>(path, options);
}
