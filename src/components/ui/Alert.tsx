"use client";

import { ReactNode, useState } from "react";
import { CheckCircle, AlertTriangle, XCircle, Info, X } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface AlertProps {
  variant?: "info" | "success" | "warning" | "error";
  title?: string;
  children: ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  icon?: ReactNode;
  action?: { label: string; onClick: () => void };
  size?: "sm" | "md";
  className?: string;
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = {
  info: {
    container: "bg-sky-50 border-sky-200/70 text-sky-900",
    icon:      "text-sky-500",
    iconBg:    "bg-sky-100",
    action:    "text-sky-700 hover:text-sky-900",
    dismiss:   "text-sky-400 hover:text-sky-600 hover:bg-sky-100",
    DefaultIcon: Info,
  },
  success: {
    container: "bg-emerald-50 border-emerald-200/70 text-emerald-900",
    icon:      "text-emerald-500",
    iconBg:    "bg-emerald-100",
    action:    "text-emerald-700 hover:text-emerald-900",
    dismiss:   "text-emerald-400 hover:text-emerald-600 hover:bg-emerald-100",
    DefaultIcon: CheckCircle,
  },
  warning: {
    container: "bg-amber-50 border-amber-200/70 text-amber-900",
    icon:      "text-amber-500",
    iconBg:    "bg-amber-100",
    action:    "text-amber-700 hover:text-amber-900",
    dismiss:   "text-amber-400 hover:text-amber-600 hover:bg-amber-100",
    DefaultIcon: AlertTriangle,
  },
  error: {
    container: "bg-red-50 border-red-200/70 text-red-900",
    icon:      "text-red-500",
    iconBg:    "bg-red-100",
    action:    "text-red-700 hover:text-red-900",
    dismiss:   "text-red-400 hover:text-red-600 hover:bg-red-100",
    DefaultIcon: XCircle,
  },
};

// ─── Alert ────────────────────────────────────────────────────────────────────

export function Alert({
  variant = "info",
  title,
  children,
  dismissible = false,
  onDismiss,
  icon,
  action,
  size = "md",
  className = "",
}: AlertProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const s = styles[variant];
  const { DefaultIcon } = s;
  const iconEl = icon ?? <DefaultIcon className="w-4 h-4" />;

  const handleDismiss = () => {
    setDismissed(true);
    onDismiss?.();
  };

  return (
    <div
      role="alert"
      className={`
        flex items-start gap-3 rounded-2xl border p-4 ${size === "sm" ? "p-3" : "p-4"}
        ${s.container}
        ${className}
      `}
      style={{ animation: "alertIn 0.2s ease-out" }}
    >
      {/* Icon */}
      <div className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 ${s.iconBg} ${s.icon}`}>
        {iconEl}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 space-y-1">
        {title && (
          <p className={`font-bold leading-tight ${size === "sm" ? "text-[13px]" : "text-[14px]"}`}>
            {title}
          </p>
        )}
        <div className={`font-medium leading-relaxed opacity-80 ${size === "sm" ? "text-[12px]" : "text-[13px]"}`}>
          {children}
        </div>
        {action && (
          <button
            type="button"
            onClick={action.onClick}
            className={`text-[12px] font-bold underline-offset-2 underline transition-colors mt-1 ${s.action}`}
          >
            {action.label}
          </button>
        )}
      </div>

      {/* Dismiss */}
      {dismissible && (
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Dismiss"
          className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors shrink-0 ${s.dismiss}`}
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}

      <style>{`@keyframes alertIn { from { opacity:0; transform:translateY(-4px) } to { opacity:1; transform:none } }`}</style>
    </div>
  );
}
