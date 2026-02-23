"use client";

import { ReactNode, useEffect } from "react";
import { AlertTriangle, Trash2, X } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  title?: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "danger" | "warning" | "info";
  icon?: ReactNode;
  loading?: boolean;
  children?: ReactNode;
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const variantStyles = {
  danger: {
    iconBg: "bg-red-50 border-red-100",
    iconColor: "text-red-500",
    confirmBtn:
      "bg-red-600 hover:bg-red-700 text-white shadow-sm shadow-red-200",
    DefaultIcon: Trash2,
  },
  warning: {
    iconBg: "bg-amber-50 border-amber-100",
    iconColor: "text-amber-500",
    confirmBtn:
      "bg-amber-500 hover:bg-amber-600 text-white shadow-sm shadow-amber-200",
    DefaultIcon: AlertTriangle,
  },
  info: {
    iconBg: "bg-sky-50 border-sky-100",
    iconColor: "text-sky-500",
    confirmBtn: "bg-[#111010] hover:bg-black/80 text-white shadow-sm",
    DefaultIcon: AlertTriangle,
  },
};

// ─── ConfirmDialog ────────────────────────────────────────────────────────────

export function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title = "Are you sure?",
  description = "This action cannot be undone.",
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "danger",
  icon,
  loading = false,
  children,
}: ConfirmDialogProps) {
  // Escape to close
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  // Lock scroll
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  const s = variantStyles[variant];
  const { DefaultIcon } = s;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        style={{ animation: "backdropIn 0.2s ease-out" }}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        aria-describedby="confirm-desc"
        className="relative z-10 w-full max-w-md bg-white rounded-[32px] border border-black/6 shadow-[0_32px_80px_-12px_rgba(0,0,0,0.25)] overflow-hidden"
        style={{ animation: "modalIn 0.25s cubic-bezier(0.23,1,0.32,1)" }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-xl bg-[#F7F4F0] flex items-center justify-center text-black/35 hover:text-black/60 hover:bg-[#F0EDE9] transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Content */}
        <div className="px-8 pt-8 pb-6 flex flex-col items-center text-center gap-5">
          {/* Icon */}
          <div
            className={`w-14 h-14 rounded-2xl border flex items-center justify-center ${s.iconBg} ${s.iconColor}`}
          >
            {icon ?? <DefaultIcon className="w-6 h-6" />}
          </div>

          <div className="space-y-2">
            <h2
              id="confirm-title"
              className="text-[18px] font-bold text-[#111010]"
            >
              {title}
            </h2>
            <p
              id="confirm-desc"
              className="text-[14px] text-black/45 font-medium leading-relaxed max-w-xs mx-auto"
            >
              {description}
            </p>
          </div>

          {children && (
            <div className="w-full bg-[#F7F4F0] rounded-2xl p-4 text-left">
              {children}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3 px-8 py-5 border-t border-black/5 bg-[#F7F4F0]/40">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="flex-1 py-3 px-4 rounded-2xl border border-black/10 text-[14px] font-semibold text-[#111010]/70 hover:bg-white hover:text-[#111010] transition-all disabled:opacity-50"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={() => onConfirm()}
            disabled={loading}
            className={`flex-1 py-3 px-4 rounded-2xl text-[14px] font-bold transition-all active:scale-[0.97] disabled:opacity-60 flex items-center justify-center gap-2 ${s.confirmBtn}`}
          >
            {loading && (
              <svg
                className="w-4 h-4 animate-spin"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="3"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
            )}
            {confirmLabel}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes backdropIn { from { opacity:0 } to { opacity:1 } }
        @keyframes modalIn { from { opacity:0; transform:scale(0.94) translateY(8px) } to { opacity:1; transform:none } }
      `}</style>
    </div>
  );
}
