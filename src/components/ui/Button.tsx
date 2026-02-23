import Link from "next/link";
import { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "glass"
  | "outline"
  | "ghost"
  | "danger";
type ButtonSize = "xs" | "sm" | "md" | "lg";

interface ButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  href?: string;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  href,
  icon,
  iconPosition = "right",
  loading = false,
  disabled = false,
  fullWidth = false,
  ...props
}: ButtonProps &
  ButtonHTMLAttributes<HTMLButtonElement> &
  AnchorHTMLAttributes<HTMLAnchorElement>) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-2xl font-semibold transition-all duration-200 cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#7EB3F7] disabled:opacity-50 disabled:pointer-events-none active:scale-[0.97]";

  const variants: Record<ButtonVariant, string> = {
    primary:
      "bg-[#111010] text-white hover:bg-black/80 hover:-translate-y-px shadow-[0_4px_16px_rgba(0,0,0,0.15)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.18)]",
    secondary:
      "bg-white text-[#111010] border border-black/[0.08] hover:bg-[#F7F4F0] shadow-sm hover:shadow-md hover:-translate-y-px",
    glass:
      "bg-white/50 backdrop-blur-md border border-white/60 text-[#111010] hover:bg-white/70 shadow-sm",
    outline:
      "bg-transparent border border-black/15 text-[#111010] hover:bg-black/[0.04] hover:border-black/25",
    ghost:
      "bg-transparent text-[#111010]/60 hover:text-[#111010] hover:bg-black/[0.05]",
    danger:
      "bg-red-50 text-red-700 border border-red-200/60 hover:bg-red-100 hover:border-red-300/60",
  };

  const sizes: Record<ButtonSize, string> = {
    xs: "px-3 py-1.5 text-[11px] rounded-xl gap-1",
    sm: "px-4 py-2 text-[13px]",
    md: "px-6 py-3 text-[14px]",
    lg: "px-8 py-4 text-[15px]",
  };

  const combinedClasses = [
    base,
    variants[variant],
    sizes[size],
    fullWidth ? "w-full" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      {loading && (
        <svg
          className="w-4 h-4 animate-spin shrink-0"
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
      {!loading && icon && iconPosition === "left" && (
        <span className="shrink-0">{icon}</span>
      )}
      <span>{children}</span>
      {!loading && icon && iconPosition === "right" && (
        <span className="shrink-0">{icon}</span>
      )}
    </>
  );

  if (href && !disabled) {
    return (
      <Link
        href={href}
        className={combinedClasses}
        {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      className={combinedClasses}
      disabled={disabled || loading}
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {content}
    </button>
  );
}
