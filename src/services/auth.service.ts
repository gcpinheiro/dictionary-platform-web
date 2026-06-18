import { request } from "@/services/http";
import type {
  AuthSession,
  AuthUser,
  LoginPayload,
  RegisterPayload,
} from "@/types/auth";

export async function loginUser(
  payload: LoginPayload,
): Promise<AuthSession> {
  const users = await request<AuthUser[]>(
    `/users?email=${encodeURIComponent(payload.email)}`,
  );
  const user = users[0];

  if (!user || user.password !== payload.password) {
    throw new Error("E-mail ou senha inválidos");
  }

  return {
    userId: user.id,
    name: user.name,
    email: user.email,
    token: crypto.randomUUID(),
  };
}

export async function registerUser(
  payload: RegisterPayload,
): Promise<AuthSession> {
  const users = await request<AuthUser[]>(
    `/users?email=${encodeURIComponent(payload.email)}`,
  );

  if (users.length > 0) {
    throw new Error("Este e-mail já está cadastrado");
  }

  const user = await request<AuthUser>("/users", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  return {
    userId: user.id,
    name: user.name,
    email: user.email,
    token: crypto.randomUUID(),
  };
}
