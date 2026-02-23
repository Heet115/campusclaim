"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import { CheckCircle, X, AlertTriangle, Info, XCircle } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type ToastVariant = "success" | "error" | "warning" | "info";

interface Toast {
  id: string;
  message: string;
  description?: string;
  variant: ToastVariant;
  duration?: number;
}

interface ToastContextValue {
  toasts: Toast[];
  toast: (opts: Omit<Toast, "id">) => void;
  dismiss: (id: string) => void;
}

// ─── Context ──────────────────────────────────────────────────────────────────

const ToastContext = createContext<ToastContextValue>({
  toasts: [],
  toast: () => {},
  dismiss: () => {},
});

export function useToast() {
  return useContext(ToastContext);
}

// ─── Provider ─────────────────────────────────────────────────────────────────

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((t) => t.filter((x) => x.id !== id));
  }, []);

  const toast = useCallback(
    ({ duration = 4000, ...opts }: Omit<Toast, "id">) => {
      const id = Math.random().toString(36).slice(2);
      setToasts((t) => [...t, { id, duration, ...opts }]);
      if (duration > 0) setTimeout(() => dismiss(id), duration);
    },
    [dismiss],
  );

  return (
    <ToastContext.Provider value={{ toasts, toast, dismiss }}>
      {children}
      <ToastViewport toasts={toasts} onDismiss={dismiss} />
    </ToastContext.Provider>
  );
}

// ─── Viewport ─────────────────────────────────────────────────────────────────

const icons: Record<ToastVariant, ReactNode> = {
  success: <CheckCircle className="w-4 h-4" />,
  error: <XCircle className="w-4 h-4" />,
  warning: <AlertTriangle className="w-4 h-4" />,
  info: <Info className="w-4 h-4" />,
};

const styles: Record<ToastVariant, { container: string; icon: string }> = {
  success: {
    container: "bg-white border-emerald-200/60",
    icon: "bg-emerald-50 text-emerald-600 border border-emerald-200/60",
  },
  error: {
    container: "bg-white border-red-200/60",
    icon: "bg-red-50 text-red-500 border border-red-200/60",
  },
  warning: {
    container: "bg-white border-amber-200/60",
    icon: "bg-amber-50 text-amber-600 border border-amber-200/60",
  },
  info: {
    container: "bg-white border-sky-200/60",
    icon: "bg-sky-50 text-sky-600 border border-sky-200/60",
  },
};

function ToastViewport({
  toasts,
  onDismiss,
}: {
  toasts: Toast[];
  onDismiss: (id: string) => void;
}) {
  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      className="fixed bottom-6 right-6 z-100 flex flex-col gap-3 pointer-events-none"
    >
      {toasts.map((t) => {
        const { container, icon } = styles[t.variant];
        return (
          <div
            key={t.id}
            role="status"
            className={`
              pointer-events-auto flex items-start gap-3 px-4 py-3.5 rounded-2xl
              border shadow-[0_8px_32px_-8px_rgba(0,0,0,0.15)]
              min-w-[280px] max-w-[380px] backdrop-blur-sm
              ${container}
            `}
            style={{ animation: "toastIn 0.3s cubic-bezier(0.23,1,0.32,1)" }}
          >
            <div
              className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 ${icon}`}
            >
              {icons[t.variant]}
            </div>
            <div className="flex-1 min-w-0 pt-0.5">
              <p className="text-[13px] font-semibold text-[#111010] leading-tight">
                {t.message}
              </p>
              {t.description && (
                <p className="text-[12px] text-black/40 font-medium mt-0.5 leading-relaxed">
                  {t.description}
                </p>
              )}
            </div>
            <button
              onClick={() => onDismiss(t.id)}
              className="w-6 h-6 rounded-lg flex items-center justify-center text-black/25 hover:text-black/50 hover:bg-black/4 transition-colors shrink-0 mt-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}

      <style>{`
        @keyframes toastIn {
          from { opacity:0; transform:translateX(16px) scale(0.96) }
          to   { opacity:1; transform:none }
        }
      `}</style>
    </div>
  );
}
