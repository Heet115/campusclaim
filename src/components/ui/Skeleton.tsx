// ─── Skeleton primitives ──────────────────────────────────────────────────────
// All pieces share the same pulse animation defined in globals.css via
// Tailwind's `animate-pulse`. Compose them to match any real layout.

import { ReactNode } from "react";

// ─── Base ─────────────────────────────────────────────────────────────────────

interface SkeletonProps {
  /** Extra Tailwind classes — use for sizing, rounding, margin, etc. */
  className?: string;
}

/** A single rectangular shimmer block. */
export function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <div
      className={`bg-black/6 animate-pulse rounded-xl ${className}`}
      aria-hidden="true"
    />
  );
}

// ─── Text lines ───────────────────────────────────────────────────────────────

/** One or more shimmer text lines with realistic varying widths. */
export function SkeletonText({
  lines = 3,
  className = "",
}: {
  lines?: number;
  className?: string;
}) {
  const widths = ["w-full", "w-5/6", "w-4/5", "w-3/4", "w-2/3", "w-1/2"];
  return (
    <div className={`space-y-2 ${className}`} aria-hidden="true">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={`h-3 ${i === lines - 1 ? widths[(lines + 2) % widths.length] : "w-full"}`}
        />
      ))}
    </div>
  );
}

// ─── Avatar ───────────────────────────────────────────────────────────────────

const avatarSizes = {
  xs: "w-6 h-6",
  sm: "w-8 h-8",
  md: "w-10 h-10",
  lg: "w-12 h-12",
  xl: "w-16 h-16",
};

export function SkeletonAvatar({
  size = "md",
  className = "",
}: {
  size?: keyof typeof avatarSizes;
  className?: string;
}) {
  return (
    <Skeleton
      className={`${avatarSizes[size]} rounded-full shrink-0 ${className}`}
    />
  );
}

// ─── Card ─────────────────────────────────────────────────────────────────────

export function SkeletonCard({
  className = "",
  children,
}: {
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div
      className={`bg-white rounded-[24px] border border-black/6 shadow-sm p-6 ${className}`}
      aria-hidden="true"
    >
      {children ?? (
        <div className="space-y-4">
          <Skeleton className="h-5 w-1/3" />
          <SkeletonText lines={3} />
        </div>
      )}
    </div>
  );
}

// ─── Item card ────────────────────────────────────────────────────────────────

export function SkeletonItemCard() {
  return (
    <div
      className="bg-white rounded-[24px] border border-black/6 shadow-sm overflow-hidden"
      aria-hidden="true"
    >
      {/* Photo */}
      <Skeleton className="h-44 w-full rounded-none" />
      {/* Body */}
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between gap-3">
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>
        <SkeletonText lines={2} />
        <div className="flex items-center gap-2 pt-1">
          <SkeletonAvatar size="xs" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
    </div>
  );
}

// ─── Stat card ────────────────────────────────────────────────────────────────

export function SkeletonStatCard() {
  return (
    <div
      className="bg-white rounded-[24px] border border-black/6 shadow-sm p-6 flex items-center gap-4"
      aria-hidden="true"
    >
      <Skeleton className="w-12 h-12 rounded-2xl shrink-0" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-7 w-12" />
        <Skeleton className="h-3 w-28" />
      </div>
    </div>
  );
}

// ─── Table row ────────────────────────────────────────────────────────────────

export function SkeletonTableRow({ cols = 5 }: { cols?: number }) {
  return (
    <tr aria-hidden="true">
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} className="px-4 py-4">
          <Skeleton
            className={`h-3 rounded-full ${i === 0 ? "w-3/4" : i === cols - 1 ? "w-1/2" : "w-full"}`}
          />
        </td>
      ))}
    </tr>
  );
}

// ─── Notification row ─────────────────────────────────────────────────────────

export function SkeletonNotificationRow() {
  return (
    <div
      className="flex items-start gap-4 px-6 py-4 border-b border-black/4"
      aria-hidden="true"
    >
      <SkeletonAvatar size="sm" className="mt-0.5" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-3.5 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
      <Skeleton className="h-3 w-12 shrink-0" />
    </div>
  );
}
