import { ReactNode } from "react";

// ─── Card ─────────────────────────────────────────────────────────────────────

interface CardProps {
  children: ReactNode;
  variant?: "default" | "flat" | "dark" | "glass" | "cream";
  hover?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
}

export function Card({
  children,
  variant = "default",
  hover = false,
  padding = "md",
  className = "",
  onClick,
}: CardProps) {
  const base = "rounded-[28px] transition-all duration-300";

  const variants = {
    default: "bg-white border border-black/[0.06] shadow-sm",
    flat: "bg-[#F7F4F0] border border-black/[0.04]",
    dark: "bg-[#111010] text-white border border-white/[0.06]",
    glass: "bg-white/50 backdrop-blur-xl border border-white/60 shadow-sm",
    cream: "bg-[#F7F4F0] border border-black/[0.06]",
  };

  const paddings = {
    none: "",
    sm: "p-5",
    md: "p-7",
    lg: "p-10",
  };

  const hoverStyles = hover
    ? "cursor-pointer hover:-translate-y-1.5 hover:shadow-[0_20px_48px_-12px_rgba(0,0,0,0.12)]"
    : "";

  return (
    <div
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      className={`${base} ${variants[variant]} ${paddings[padding]} ${hoverStyles} ${className}`}
    >
      {children}
    </div>
  );
}

// ─── Card sub-components ──────────────────────────────────────────────────────

interface CardHeaderProps {
  title: string;
  description?: string;
  action?: ReactNode;
  icon?: ReactNode;
}

export function CardHeader({
  title,
  description,
  action,
  icon,
}: CardHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-4 mb-6">
      <div className="flex items-center gap-3">
        {icon && (
          <div className="w-10 h-10 rounded-xl bg-[#F7F4F0] flex items-center justify-center shrink-0 border border-black/5">
            {icon}
          </div>
        )}
        <div>
          <h3 className="text-[15px] font-semibold text-[#111010] leading-tight">
            {title}
          </h3>
          {description && (
            <p className="text-[13px] text-black/40 font-medium mt-0.5">
              {description}
            </p>
          )}
        </div>
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

export function CardDivider() {
  return (
    <hr className="border-none h-px bg-linear-to-r from-transparent via-black/6 to-transparent my-5" />
  );
}

interface CardFooterProps {
  children: ReactNode;
  className?: string;
}

export function CardFooter({ children, className = "" }: CardFooterProps) {
  return (
    <div
      className={`pt-5 mt-5 border-t border-black/5 flex items-center justify-between gap-3 ${className}`}
    >
      {children}
    </div>
  );
}
