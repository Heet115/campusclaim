import { ReactNode } from "react";

// ─── EmptyState ───────────────────────────────────────────────────────────────

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  size?: "sm" | "md" | "lg";
  /** true = renders inside a card-style container */
  contained?: boolean;
  className?: string;
}

const sizeStyles = {
  sm: {
    icon: "w-10 h-10 rounded-2xl",
    iconInner: "w-5 h-5",
    title: "text-[14px]",
    desc: "text-[12px]",
  },
  md: {
    icon: "w-14 h-14 rounded-[20px]",
    iconInner: "w-7 h-7",
    title: "text-[16px]",
    desc: "text-[13px]",
  },
  lg: {
    icon: "w-20 h-20 rounded-[28px]",
    iconInner: "w-9 h-9",
    title: "text-[20px]",
    desc: "text-[15px]",
  },
};

export function EmptyState({
  icon,
  title,
  description,
  action,
  size = "md",
  contained = false,
  className = "",
}: EmptyStateProps) {
  const {
    icon: iconSize,
    iconInner,
    title: titleSize,
    desc: descSize,
  } = sizeStyles[size];

  const inner = (
    <div className="flex flex-col items-center text-center gap-4">
      {icon && (
        <div
          className={`${iconSize} bg-[#F7F4F0] border border-black/6 flex items-center justify-center text-black/25`}
        >
          <span
            className={`${iconInner} flex items-center justify-center [&>svg]:w-full [&>svg]:h-full`}
          >
            {icon}
          </span>
        </div>
      )}
      <div className="space-y-1.5 max-w-xs">
        <p className={`font-semibold text-[#111010] ${titleSize}`}>{title}</p>
        {description && (
          <p
            className={`text-black/40 font-medium leading-relaxed ${descSize}`}
          >
            {description}
          </p>
        )}
      </div>
      {action && <div className="mt-1">{action}</div>}
    </div>
  );

  if (contained) {
    return (
      <div
        className={`
          bg-white rounded-[28px] border border-black/6 border-dashed
          py-16 px-8 flex items-center justify-center
          ${className}
        `}
      >
        {inner}
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-center py-12 px-6 ${className}`}>
      {inner}
    </div>
  );
}
