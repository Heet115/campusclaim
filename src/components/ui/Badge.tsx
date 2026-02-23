import { HTMLAttributes, ReactNode } from "react";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  variant?:
    | "glass"
    | "solid"
    | "light"
    | "outline"
    | "status-amber"
    | "status-green"
    | "status-red"
    | "status-blue";
  size?: "sm" | "md";
  dot?: boolean;
}

export function Badge({
  children,
  variant = "light",
  size = "sm",
  dot = false,
  className = "",
  ...rest
}: BadgeProps) {
  const base =
    "inline-flex items-center gap-1.5 rounded-full font-medium whitespace-nowrap";

  const sizes = {
    sm: "px-2.5 py-1 text-[11px]",
    md: "px-3.5 py-1.5 text-xs",
  };

  const variants: Record<string, string> = {
    glass:
      "bg-white/50 border border-white/60 backdrop-blur-md shadow-sm text-[#111010]",
    solid: "bg-[#111010] text-white",
    light:
      "bg-[#F7F4F0] border border-black/[0.06] text-[#111010] font-semibold tracking-wide uppercase",
    outline: "bg-transparent border border-black/15 text-[#111010]",
    "status-amber": "bg-amber-50 border border-amber-200/60 text-amber-700",
    "status-green":
      "bg-emerald-50 border border-emerald-200/60 text-emerald-700",
    "status-red": "bg-red-50 border border-red-200/60 text-red-700",
    "status-blue": "bg-sky-50 border border-sky-200/60 text-sky-700",
  };

  const dotColors: Record<string, string> = {
    glass: "bg-[#111010]/40",
    solid: "bg-white/60",
    light: "bg-[#111010]/30",
    outline: "bg-[#111010]/30",
    "status-amber": "bg-amber-400",
    "status-green": "bg-emerald-400",
    "status-red": "bg-red-400",
    "status-blue": "bg-sky-400",
  };

  return (
    <span
      {...rest}
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
    >
      {dot && (
        <span
          className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotColors[variant]}`}
        />
      )}
      {children}
    </span>
  );
}
