"use client";

import { ReactNode, useEffect } from "react";
import { X } from "lucide-react";

// ─── Modal ────────────────────────────────────────────────────────────────────

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "full";
  /** Clicking the backdrop closes the modal. Default: true */
  closeOnBackdrop?: boolean;
}

const sizes = {
  sm: "max-w-sm",
  md: "max-w-lg",
  lg: "max-w-2xl",
  full: "max-w-[96vw] max-h-[96vh]",
};

export function Modal({
  open,
  onClose,
  children,
  size = "md",
  closeOnBackdrop = true,
}: ModalProps) {
  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  // Lock body scroll
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        style={{ animation: "backdropIn 0.2s ease-out" }}
        onClick={closeOnBackdrop ? onClose : undefined}
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        className={`
          relative z-10 w-full ${sizes[size]}
          bg-white rounded-[40px] border border-black/6 shadow-[0_32px_80px_-16px_rgba(0,0,0,0.2)]
          overflow-hidden
        `}
        style={{ animation: "modalIn 0.25s cubic-bezier(0.23,1,0.32,1)" }}
      >
        {children}
      </div>

      <style>{`
        @keyframes backdropIn { from { opacity:0 } to { opacity:1 } }
        @keyframes modalIn { from { opacity:0; transform:scale(0.94) translateY(8px) } to { opacity:1; transform:none } }
      `}</style>
    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

interface ModalHeaderProps {
  title: string;
  description?: string;
  onClose?: () => void;
  icon?: ReactNode;
}

export function ModalHeader({
  title,
  description,
  onClose,
  icon,
}: ModalHeaderProps) {
  return (
    <div className="flex items-start gap-4 px-8 pt-8 pb-6 border-b border-black/6">
      {icon && (
        <div className="w-10 h-10 rounded-xl bg-[#F7F4F0] flex items-center justify-center shrink-0 border border-black/5">
          {icon}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <h2 className="text-[17px] font-bold text-[#111010] leading-tight">
          {title}
        </h2>
        {description && (
          <p className="text-[13px] text-black/40 font-medium mt-1 leading-relaxed">
            {description}
          </p>
        )}
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-xl bg-[#F7F4F0] border border-black/6 flex items-center justify-center text-black/35 hover:text-black/60 hover:bg-[#F0EDE9] transition-all"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

export function ModalBody({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`px-8 py-6 ${className}`}>{children}</div>;
}

export function ModalFooter({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center justify-end gap-3 px-8 py-5 border-t border-black/6 bg-[#F7F4F0]/50 ${className}`}
    >
      {children}
    </div>
  );
}
