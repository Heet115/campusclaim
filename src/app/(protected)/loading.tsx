// app/(protected)/loading.tsx
// Shown by Next.js whenever any (protected) page is suspended/loading.

import {
  SkeletonStatCard,
  SkeletonCard,
  Skeleton,
  SkeletonText,
  SkeletonAvatar,
} from "@/components/ui/Skeleton";

export default function ProtectedLoading() {
  return (
    <div
      className="space-y-8 animate-pulse"
      aria-label="Loading…"
      aria-busy="true"
    >
      {/* Page header */}
      <div className="space-y-3">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-12 w-56 rounded-2xl" />
      </div>

      {/* Stat cards row */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <SkeletonStatCard key={i} />
        ))}
      </div>

      {/* Two-column layout */}
      <div className="grid lg:grid-cols-[1fr_360px] gap-6">
        <SkeletonCard className="min-h-[280px]">
          <div className="space-y-5">
            <Skeleton className="h-4 w-32" />
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <SkeletonAvatar size="sm" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-3 w-3/4" />
                  <Skeleton className="h-2.5 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </SkeletonCard>

        <SkeletonCard>
          <div className="space-y-4">
            <Skeleton className="h-4 w-24" />
            <SkeletonText lines={4} />
          </div>
        </SkeletonCard>
      </div>
    </div>
  );
}
