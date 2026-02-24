"use client";

import { useState } from "react";
import { Eye, Trash2, MoreHorizontal } from "lucide-react";
import { Card } from "@/components/ui/Card";

// ─── KPI card ─────────────────────────────────────────────────────────────────

export function KpiCard({
  label,
  value,
  sub,
  color,
  text,
  icon,
}: {
  label: string;
  value: string | number;
  sub?: string;
  color: string;
  text: string;
  icon: React.ReactNode;
}) {
  return (
    <Card
      variant="default"
      padding="none"
      className="p-6 flex items-start gap-4 group hover:-translate-y-0.5 transition-all duration-300"
    >
      <div
        className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform"
        style={{ background: color }}
      >
        <span style={{ color: text }}>{icon}</span>
      </div>
      <div>
        <p className="font-display text-[32px] italic text-[#111010] leading-none">
          {value}
        </p>
        <p className="text-[13px] font-semibold text-black/45 mt-1">{label}</p>
        {sub && (
          <p className="text-[11px] font-medium text-black/25 mt-0.5">{sub}</p>
        )}
      </div>
    </Card>
  );
}

// ─── Action menu (3-dot) ──────────────────────────────────────────────────────

export function ActionMenu({
  onView,
  onDelete,
}: {
  onView?: () => void;
  onDelete?: () => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative inline-block" onClick={(e) => e.stopPropagation()}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-7 h-7 rounded-lg flex items-center justify-center text-black/25 hover:text-black/60 hover:bg-black/5 transition-all"
        aria-label="Actions"
      >
        <MoreHorizontal className="w-4 h-4" />
      </button>
      {open && (
        <div
          onMouseLeave={() => setOpen(false)}
          className="absolute right-0 top-full mt-1 w-40 bg-white rounded-2xl border border-black/6 shadow-[0_16px_40px_-8px_rgba(0,0,0,0.12)] overflow-hidden z-20 py-1"
        >
          {onView && (
            <button
              onClick={() => {
                onView();
                setOpen(false);
              }}
              className="flex items-center gap-2.5 w-full px-4 py-2.5 text-[13px] font-semibold text-black/70 hover:bg-[#F7F4F0] transition-colors"
            >
              <Eye className="w-3.5 h-3.5 text-black/30" /> View
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => {
                onDelete();
                setOpen(false);
              }}
              className="flex items-center gap-2.5 w-full px-4 py-2.5 text-[13px] font-semibold text-red-500 hover:bg-red-50 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5 text-red-400" /> Remove
            </button>
          )}
        </div>
      )}
    </div>
  );
}
