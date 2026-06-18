"use client";

import { CircleAlert, CircleCheck, Info, X } from "lucide-react";
import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import type { ReactNode } from "react";

type ToastType = "success" | "error" | "info";

interface Toast {
  id: string;
  type: ToastType;
  message: string;
}

interface ToastInput {
  type: ToastType;
  message: string;
}

interface ToastContextValue {
  showToast: (toast: ToastInput) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const toastStyles: Record<ToastType, string> = {
  success: "border-green-100 bg-green-50 text-[#166534]",
  error: "border-red-100 bg-red-50 text-[#991B1B]",
  info: "border-sky-100 bg-sky-50 text-[#075985]",
};

const toastIcons = {
  success: CircleCheck,
  error: CircleAlert,
  info: Info,
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const toastId = useRef(0);

  const removeToast = useCallback((id: string) => {
    setToasts((currentToasts) =>
      currentToasts.filter((toast) => toast.id !== id),
    );
  }, []);

  const showToast = useCallback(
    ({ type, message }: ToastInput) => {
      toastId.current += 1;

      const id = `${Date.now()}-${toastId.current}`;

      setToasts((currentToasts) => [
        ...currentToasts,
        {
          id,
          type,
          message,
        },
      ]);

      window.setTimeout(() => removeToast(id), 4000);
    },
    [removeToast],
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div
        aria-live="polite"
        className="fixed right-4 top-4 z-[80] grid w-[calc(100%-2rem)] max-w-sm gap-3 sm:right-6 sm:top-6"
      >
        {toasts.map((toast) => {
          const Icon = toastIcons[toast.type];

          return (
            <section
              className={`animate-fade-in-up rounded-2xl border p-4 shadow-md ${toastStyles[toast.type]}`}
              key={toast.id}
              role="status"
            >
              <div className="flex items-start gap-3">
                <Icon aria-hidden="true" className="mt-0.5 shrink-0" size={18} />
                <p className="text-sm font-medium">{toast.message}</p>
                <button
                  aria-label="Fechar notificação"
                  className="ml-auto flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition hover:bg-white/60 focus:outline-none focus:ring-4 focus:ring-white/80"
                  onClick={() => removeToast(toast.id)}
                  type="button"
                >
                  <X aria-hidden="true" size={16} />
                </button>
              </div>
            </section>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast deve ser usado dentro de ToastProvider");
  }

  return context;
}
