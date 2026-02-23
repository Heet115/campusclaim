// app/(protected)/items/[id]/loading.tsx
// Shown while a single item detail page is loading.

import {
  Skeleton,
  SkeletonText,
  SkeletonAvatar,
  SkeletonCard,
} from "@/components/ui/Skeleton";

export default function ItemDetailLoading() {
  return (
    <div className="space-y-6" aria-label="Loading item…" aria-busy="true">
      {/* Back link */}
      <Skeleton className="h-4 w-20 rounded-full" />

      <div className="grid lg:grid-cols-[1fr_320px] gap-8 items-start">
        {/* Main */}
        <div className="space-y-6">
          {/* Photo hero */}
          <Skeleton className="h-72 w-full rounded-[24px]" />

          {/* Title + meta */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-24 rounded-full" />
            </div>
            <Skeleton className="h-9 w-3/4 rounded-2xl" />
            <div className="flex gap-4">
              <Skeleton className="h-3.5 w-32 rounded-full" />
              <Skeleton className="h-3.5 w-28 rounded-full" />
              <Skeleton className="h-3.5 w-24 rounded-full" />
            </div>
          </div>

          {/* Description */}
          <SkeletonCard>
            <div className="space-y-3">
              <Skeleton className="h-4 w-28" />
              <SkeletonText lines={4} />
            </div>
          </SkeletonCard>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* CTA card */}
          <SkeletonCard>
            <div className="space-y-4">
              <Skeleton className="h-4 w-36" />
              <Skeleton className="h-11 w-full rounded-2xl" />
              <Skeleton className="h-11 w-full rounded-2xl" />
            </div>
          </SkeletonCard>

          {/* Reporter card */}
          <SkeletonCard>
            <div className="flex items-center gap-3">
              <SkeletonAvatar size="md" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-3.5 w-28" />
                <Skeleton className="h-3 w-20" />
              </div>
            </div>
          </SkeletonCard>
        </div>
      </div>
    </div>
  );
}
