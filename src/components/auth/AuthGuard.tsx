"use client";

import { useRouter } from "next/navigation";
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { AuthenticatedPageSkeleton } from "@/components/ui/Skeletons";
import { getAuthSession } from "@/lib/auth-storage";
import type { AuthSession } from "@/types/auth";
import type { ReactNode } from "react";

interface AuthGuardProps {
  children: ReactNode;
}

const AuthSessionContext = createContext<AuthSession | null>(null);

export function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [session, setSession] = useState<AuthSession | null>(null);

  useEffect(() => {
    const currentSession = getAuthSession();

    if (!currentSession) {
      router.replace("/entrar");
      return;
    }

    setSession(currentSession);
    setIsCheckingSession(false);
  }, [router]);

  if (isCheckingSession) {
    return <AuthenticatedPageSkeleton />;
  }

  if (!session) {
    return null;
  }

  return (
    <AuthSessionContext.Provider value={session}>
      {children}
    </AuthSessionContext.Provider>
  );
}

export function useAuthSession() {
  const session = useContext(AuthSessionContext);

  if (!session) {
    throw new Error("useAuthSession deve ser usado dentro de AuthGuard");
  }

  return session;
}
