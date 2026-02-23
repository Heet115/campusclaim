import Link from "next/link";
import { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "glass" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  href?: string;
  icon?: ReactNode;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  href,
  icon,
  ...props
}: ButtonProps &
  ButtonHTMLAttributes<HTMLButtonElement> &
  AnchorHTMLAttributes<HTMLAnchorElement>) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all active:scale-95 text-center";

  const variants = {
    primary:
      "bg-[#1A1615] text-white hover:bg-black/80 hover:-translate-y-0.5 shadow-xl",
    secondary:
      "bg-white text-[#1A1615] hover:bg-[#F5F2EF] card-shadow border border-white",
    glass: "glass hover:bg-white/80",
    outline:
      "bg-transparent border border-black/10 text-[#1A1615] hover:bg-black/5",
    ghost: "bg-transparent text-[#1A1615] hover:text-black hover:bg-black/5",
  };

  const sizes = {
    sm: "px-5 py-2.5 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-base",
  };

  const combinedClasses = `${baseStyles} ${variants[variant]} ${sizes[size]} w-full sm:w-auto ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedClasses} {...props}>
        {children}
        {icon}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {children}
      {icon}
    </button>
  );
}
