// app/(protected)/items/loading.tsx
// Shown while the items directory is fetching.

import { Skeleton, SkeletonItemCard } from "@/components/ui/Skeleton";

export default function ItemsLoading() {
  return (
    <div className="space-y-8" aria-label="Loading items…" aria-busy="true">
      {/* Header */}
      <div className="space-y-3">
        <Skeleton className="h-3 w-14" />
        <Skeleton className="h-12 w-48 rounded-2xl" />
      </div>

      {/* Search + filters */}
      <div className="flex gap-3">
        <Skeleton className="h-11 flex-1 rounded-2xl" />
        <Skeleton className="h-11 w-24 rounded-2xl" />
        <Skeleton className="h-11 w-24 rounded-2xl" />
        <Skeleton className="h-11 w-10 rounded-2xl ml-auto" />
      </div>

      {/* Filter pills */}
      <div className="flex gap-2">
        {["w-20", "w-16", "w-24", "w-[72px]", "w-[88px]"].map((w, i) => (
          <Skeleton key={i} className={`h-8 rounded-full ${w}`} />
        ))}
      </div>

      {/* Item grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonItemCard key={i} />
        ))}
      </div>
    </div>
  );
}
