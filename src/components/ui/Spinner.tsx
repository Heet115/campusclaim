// ─── Spinner ──────────────────────────────────────────────────────────────────

interface SpinnerProps {
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
}

const spinnerSizes = {
  xs: "w-3 h-3 border",
  sm: "w-4 h-4 border-2",
  md: "w-6 h-6 border-2",
  lg: "w-9 h-9 border-[3px]",
};

export function Spinner({ size = "md", className = "" }: SpinnerProps) {
  return (
    <span
      role="status"
      aria-label="Loading"
      className={`
        ${spinnerSizes[size]} inline-block rounded-full
        border-black/10 border-t-[#111010]
        animate-spin
        ${className}
      `}
    />
  );
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

interface SkeletonProps {
  className?: string;
  rounded?: "sm" | "md" | "lg" | "full";
}

export function Skeleton({ className = "", rounded = "md" }: SkeletonProps) {
  const roundedMap = {
    sm: "rounded-lg",
    md: "rounded-xl",
    lg: "rounded-2xl",
    full: "rounded-full",
  };

  return (
    <div
      aria-hidden="true"
      className={`bg-black/6 ${roundedMap[rounded]} animate-pulse ${className}`}
    />
  );
}

// ─── Pre-built Skeleton patterns ──────────────────────────────────────────────

export function SkeletonCard() {
  return (
    <div className="bg-white rounded-[28px] border border-black/6 p-7 space-y-4">
      <div className="flex items-center gap-3">
        <Skeleton className="w-10 h-10 shrink-0" rounded="lg" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-3.5 w-2/5" />
          <Skeleton className="h-2.5 w-3/5" />
        </div>
      </div>
      <Skeleton className="h-px w-full" rounded="full" />
      <div className="space-y-2.5">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-4/5" />
        <Skeleton className="h-3 w-3/5" />
      </div>
      <div className="flex gap-2 pt-1">
        <Skeleton className="h-7 w-20" rounded="full" />
        <Skeleton className="h-7 w-16" rounded="full" />
      </div>
    </div>
  );
}

export function SkeletonRow() {
  return (
    <div className="flex items-center gap-4 py-3">
      <Skeleton className="w-9 h-9 shrink-0" rounded="lg" />
      <div className="flex-1 space-y-1.5">
        <Skeleton className="h-3 w-1/3" />
        <Skeleton className="h-2.5 w-1/5" />
      </div>
      <Skeleton className="h-6 w-16" rounded="full" />
    </div>
  );
}

// ─── Full-page loading overlay ────────────────────────────────────────────────

export function LoadingOverlay({ message = "Loading…" }: { message?: string }) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-white/80 backdrop-blur-md">
      <Spinner size="lg" />
      <p className="text-[14px] font-semibold text-black/40">{message}</p>
    </div>
  );
}
