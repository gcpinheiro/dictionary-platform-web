"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { AuthenticatedPageSkeleton } from "@/components/ui/Skeletons";
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
    return <AuthenticatedPageSkeleton />;
  }

  if (!hasSession) {
    return null;
  }

  return children;
}
