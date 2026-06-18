import { request } from "@/services/http";
import type {
  AuthSession,
  LoginPayload,
  RegisterPayload,
  UserRecord,
} from "@/types/auth";

function createMockToken(userId: string): string {
  if (globalThis.crypto?.randomUUID) {
    return globalThis.crypto.randomUUID();
  }

  return `mock-token-${userId}`;
}

export async function loginUser(
  payload: LoginPayload,
): Promise<AuthSession> {
  const users = await request<UserRecord[]>(
    `/users?email=${encodeURIComponent(payload.email)}`,
  );
  const user = users[0];

  if (!user || user.password !== payload.password) {
    throw new Error("E-mail ou senha inválidos");
  }

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    token: createMockToken(user.id),
  };
}

export async function registerUser(
  payload: RegisterPayload,
): Promise<AuthSession> {
  const users = await request<UserRecord[]>(
    `/users?email=${encodeURIComponent(payload.email)}`,
  );

  if (users.length > 0) {
    throw new Error("Este e-mail já está cadastrado");
  }

  const user = await request<UserRecord>("/users", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    token: createMockToken(user.id),
  };
}
