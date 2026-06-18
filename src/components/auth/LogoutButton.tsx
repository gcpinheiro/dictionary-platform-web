"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { logout } from "@/lib/auth-storage";

export function LogoutButton() {
  const router = useRouter();

  return (
    <button
      className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-[#E2E8F0] bg-white px-4 text-sm font-semibold text-[#0F172A] transition hover:bg-[#F8FAFC] focus:outline-none focus:ring-4 focus:ring-[#DBEAFE]"
      onClick={() => logout((path) => router.replace(path))}
      type="button"
    >
      <LogOut aria-hidden="true" size={16} />
      Sair
    </button>
  );
}
