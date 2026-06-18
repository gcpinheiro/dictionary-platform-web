"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { getAuthSession } from "@/lib/auth-storage";

interface AuthGuardProps {
  children: ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [hasSession, setHasSession] = useState(false);

  useEffect(() => {
    const session = getAuthSession();

    if (!session) {
      router.replace("/entrar");
      return;
    }

    setHasSession(true);
    setIsCheckingSession(false);
  }, [router]);

  if (isCheckingSession) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F8FAFC] px-4">
        <p className="text-sm font-medium text-[#475569]">
          Verificando sessão...
        </p>
      </main>
    );
  }

  if (!hasSession) {
    return null;
  }

  return children;
}

