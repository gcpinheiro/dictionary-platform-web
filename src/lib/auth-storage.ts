import type { AuthSession } from "@/types/auth";

const AUTH_SESSION_KEY = "dictionary_platform_session";

export function getAuthSession(): AuthSession | null {
  const session = localStorage.getItem(AUTH_SESSION_KEY);

  if (!session) {
    return null;
  }

  try {
    return JSON.parse(session) as AuthSession;
  } catch {
    clearAuthSession();
    return null;
  }
}

export function saveAuthSession(session: AuthSession): void {
  localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(session));
}

export function clearAuthSession(): void {
  localStorage.removeItem(AUTH_SESSION_KEY);
}

export function isAuthenticated(): boolean {
  return Boolean(getAuthSession());
}

export function logout(redirect: (path: string) => void): void {
  clearAuthSession();
  redirect("/entrar");
}
