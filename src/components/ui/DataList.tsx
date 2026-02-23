import { ReactNode } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface DataListItem {
  label: string;
  value: ReactNode;
  /** Optional helper text below the value */
  hint?: string;
  /** Span full width in grid layout */
  fullWidth?: boolean;
  copyable?: boolean;
}

interface DataListProps {
  items: DataListItem[];
  /** "stacked" = label above value, "inline" = label left / value right, "grid" = 2-column grid */
  layout?: "stacked" | "inline" | "grid";
  /** Wrap in a card */
  contained?: boolean;
  title?: string;
  action?: ReactNode;
  /** Show dividers between items */
  dividers?: boolean;
  className?: string;
}

// ─── DataList ─────────────────────────────────────────────────────────────────

export function DataList({
  items,
  layout = "inline",
  contained = false,
  title,
  action,
  dividers = true,
  className = "",
}: DataListProps) {
  const content = (
    <dl
      className={
        layout === "grid"
          ? "grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5"
          : `flex flex-col ${dividers ? "divide-y divide-black/5" : "gap-4"}`
      }
    >
      {items.map((item, i) => (
        <DataListRow key={i} item={item} layout={layout} />
      ))}
    </dl>
  );

  if (!contained) return <div className={className}>{content}</div>;

  return (
    <div
      className={`bg-white rounded-[28px] border border-black/6 overflow-hidden ${className}`}
    >
      {(title || action) && (
        <div className="flex items-center justify-between gap-4 px-7 py-5 border-b border-black/5">
          {title && (
            <h3 className="text-[15px] font-semibold text-[#111010]">
              {title}
            </h3>
          )}
          {action && <div>{action}</div>}
        </div>
      )}
      <div className="px-7 py-6">{content}</div>
    </div>
  );
}

// ─── Row ──────────────────────────────────────────────────────────────────────

function DataListRow({ item, layout }: { item: DataListItem; layout: string }) {
  if (layout === "inline") {
    return (
      <div className="flex items-start justify-between gap-6 py-3.5">
        <dt className="text-[13px] font-semibold text-black/40 shrink-0 min-w-[120px]">
          {item.label}
        </dt>
        <dd className="flex flex-col items-end gap-0.5 min-w-0">
          <span className="text-[13px] font-semibold text-[#111010] text-right wrap-break-word max-w-xs">
            {item.value}
          </span>
          {item.hint && (
            <span className="text-[11px] text-black/30 font-medium">
              {item.hint}
            </span>
          )}
        </dd>
      </div>
    );
  }

  if (layout === "grid") {
    return (
      <div
        className={`flex flex-col gap-1 ${item.fullWidth ? "sm:col-span-2" : ""}`}
      >
        <dt className="text-[11px] font-bold text-black/30 uppercase tracking-widest">
          {item.label}
        </dt>
        <dd className="text-[14px] font-semibold text-[#111010]">
          {item.value}
        </dd>
        {item.hint && (
          <span className="text-[12px] text-black/35 font-medium">
            {item.hint}
          </span>
        )}
      </div>
    );
  }

  // stacked
  return (
    <div className="flex flex-col gap-1">
      <dt className="text-[12px] font-bold text-black/35 uppercase tracking-widest">
        {item.label}
      </dt>
      <dd className="text-[14px] font-semibold text-[#111010]">{item.value}</dd>
      {item.hint && (
        <span className="text-[12px] text-black/35 font-medium">
          {item.hint}
        </span>
      )}
    </div>
  );
}

// ─── DataListStat — big-number variant ───────────────────────────────────────

interface StatProps {
  label: string;
  value: string | number;
  delta?: string;
  deltaType?: "positive" | "negative" | "neutral";
  icon?: ReactNode;
  className?: string;
}

export function Stat({
  label,
  value,
  delta,
  deltaType = "neutral",
  icon,
  className = "",
}: StatProps) {
  const deltaColor = {
    positive: "text-emerald-600 bg-emerald-50",
    negative: "text-red-600 bg-red-50",
    neutral: "text-black/40 bg-black/[0.05]",
  }[deltaType];

  return (
    <div
      className={`flex flex-col gap-3 bg-white rounded-[24px] border border-black/6 p-6 ${className}`}
    >
      <div className="flex items-center justify-between">
        <p className="text-[12px] font-bold text-black/35 uppercase tracking-widest">
          {label}
        </p>
        {icon && (
          <div className="w-8 h-8 rounded-xl bg-[#F7F4F0] flex items-center justify-center text-black/30 [&>svg]:w-4 [&>svg]:h-4">
            {icon}
          </div>
        )}
      </div>
      <p className="text-[36px] font-bold text-[#111010] leading-none tracking-tight">
        {value}
      </p>
      {delta && (
        <span
          className={`self-start px-2 py-0.5 rounded-lg text-[11px] font-bold ${deltaColor}`}
        >
          {delta}
        </span>
      )}
    </div>
  );
}
