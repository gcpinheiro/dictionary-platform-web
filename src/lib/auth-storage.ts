import type { AuthSession } from "@/types/auth";

const AUTH_SESSION_KEY = "dictionary-platform-session";

export function saveAuthSession(session: AuthSession): void {
  localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(session));
}

