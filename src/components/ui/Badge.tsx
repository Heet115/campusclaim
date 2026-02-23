import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?:
    | "glass"
    | "solid"
    | "light"
    | "status-amber"
    | "status-green"
    | "status-red";
  className?: string;
}

export function Badge({
  children,
  variant = "light",
  className = "",
}: BadgeProps) {
  const baseStyles =
    "inline-flex items-center gap-2 rounded-full font-medium whitespace-nowrap";

  const variants = {
    glass:
      "px-3 py-1.5 bg-white/50 border border-white/60 backdrop-blur-md shadow-sm text-[#1A1615] text-sm",
    solid: "px-3 py-1 bg-[#1A1615] text-white text-xs",
    light:
      "px-3 py-1.5 bg-[#F5F2EF] border border-black/5 shadow-sm text-[#1A1615] text-xs font-bold tracking-wider uppercase",
    "status-amber":
      "px-3 py-1 bg-amber-100 text-amber-800 text-xs font-semibold",
    "status-green":
      "px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold",
    "status-red": "px-3 py-1 bg-red-100 text-red-800 text-xs font-semibold",
  };

  return (
    <div className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </div>
  );
}
