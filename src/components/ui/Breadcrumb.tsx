"use client";

import Link from "next/link";
import { ReactNode, useState } from "react";
import { ChevronRight, MoreHorizontal, Home } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: ReactNode;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  /** How many items to show before collapsing the middle. Default: 4 */
  maxVisible?: number;
  /** Show a home icon as the first crumb */
  showHome?: boolean;
  separator?: ReactNode;
  className?: string;
}

// ─── Breadcrumb ───────────────────────────────────────────────────────────────

export function Breadcrumb({
  items,
  maxVisible = 4,
  showHome = false,
  separator,
  className = "",
}: BreadcrumbProps) {
  const [expanded, setExpanded] = useState(false);

  const allItems: BreadcrumbItem[] = [
    ...(showHome ? [{ label: "Home", href: "/", icon: <Home className="w-3.5 h-3.5" /> }] : []),
    ...items,
  ];

  const shouldCollapse = !expanded && allItems.length > maxVisible;

  const visibleItems: Array<BreadcrumbItem | "ellipsis"> = shouldCollapse
    ? [
        ...allItems.slice(0, 1),
        "ellipsis" as const,
        ...allItems.slice(allItems.length - (maxVisible - 2)),
      ]
    : allItems;

  const sep = separator ?? <ChevronRight className="w-3.5 h-3.5 text-black/20 shrink-0" />;

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex items-center flex-wrap gap-1">
        {visibleItems.map((item, i) => {
          const isLast = i === visibleItems.length - 1;

          if (item === "ellipsis") {
            return (
              <li key="ellipsis" className="flex items-center gap-1">
                {sep}
                <button
                  type="button"
                  onClick={() => setExpanded(true)}
                  aria-label="Show all breadcrumbs"
                  className="flex items-center px-2 py-1 rounded-lg text-black/35 hover:text-black/60 hover:bg-[#F7F4F0] transition-colors"
                >
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </li>
            );
          }

          return (
            <li key={i} className="flex items-center gap-1">
              {i > 0 && sep}
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="flex items-center gap-1.5 px-2 py-1 rounded-lg text-[13px] font-medium text-black/40 hover:text-black/70 hover:bg-[#F7F4F0] transition-colors"
                >
                  {item.icon && <span className="text-black/30">{item.icon}</span>}
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className={`flex items-center gap-1.5 px-2 py-1 rounded-lg text-[13px] font-semibold ${
                    isLast ? "text-[#111010]" : "text-black/40"
                  }`}
                >
                  {item.icon && <span>{item.icon}</span>}
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
