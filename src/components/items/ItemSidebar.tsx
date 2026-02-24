"use client";

import Link from "next/link";
import {
  Package,
  MapPin,
  Expand,
  AlertCircle,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";
import { Card } from "@/components/ui/Card";

interface ItemData {
  status: "found" | "lost";
  claimCount: number;
  photos: { src: string; alt: string; caption?: string }[];
  color: string;
  text: string;
  reportedBy: string;
}

const statusConfig = {
  found: { label: "Found", variant: "status-green" as const },
  lost: { label: "Lost", variant: "status-red" as const },
};

export function ItemSidebar({
  item,
  claimDone,
  onOpenClaim,
  onOpenLightbox,
}: {
  item: ItemData;
  claimDone: boolean;
  onOpenClaim: () => void;
  onOpenLightbox: (index: number) => void;
}) {
  const { label: statusLabel, variant: statusVariant } =
    statusConfig[item.status];

  return (
    <div className="space-y-5 lg:sticky lg:top-28">
      {/* CTA card */}
      <Card variant="default" padding="none" className="p-6 space-y-5">
        <div className="space-y-1.5">
          <h2 className="font-display text-[22px] italic text-[#111010]">
            {item.status === "found" ? "Is this yours?" : "Did you find it?"}
          </h2>
          <p className="text-[13px] text-black/45 font-medium leading-relaxed">
            {item.status === "found"
              ? "Submit a claim and the finder will reach out to verify and coordinate a handoff."
              : "If you've found this item, report it so we can reunite it with the owner."}
          </p>
        </div>

        {item.claimCount > 0 && (
          <div className="flex items-center gap-2 bg-[#FDE8D8]/60 rounded-xl px-3 py-2.5 border border-[#FDB8A0]/40">
            <AlertCircle className="w-3.5 h-3.5 text-[#C2622A] shrink-0" />
            <p className="text-[12px] font-semibold text-[#C2622A]">
              {item.claimCount} claim{item.claimCount > 1 ? "s" : ""} already
              submitted
            </p>
          </div>
        )}

        {!claimDone ? (
          <Button
            variant="primary"
            size="md"
            fullWidth
            className="btn-magnetic"
            icon={<ArrowRight className="w-4 h-4" />}
            onClick={onOpenClaim}
          >
            {item.status === "found" ? "Submit a claim" : "I found this!"}
          </Button>
        ) : (
          <Button variant="ghost" size="md" fullWidth disabled>
            <CheckCircle className="w-4 h-4 mr-2" /> Claim submitted
          </Button>
        )}

        <Button variant="outline" size="sm" fullWidth href="/items">
          Browse other items
        </Button>
      </Card>

      {/* Photo grid */}
      {item.photos.length > 0 && (
        <Card variant="flat" padding="none" className="p-5">
          <p className="text-[11px] font-bold uppercase tracking-widest text-black/30 mb-3">
            Photos ({item.photos.length})
          </p>
          <div className="grid grid-cols-3 gap-2">
            {item.photos.map((photo, i) => (
              <button
                key={i}
                onClick={() => onOpenLightbox(i)}
                className="relative aspect-square rounded-xl overflow-hidden group border-2 border-transparent hover:border-[#7EB3F7] transition-all"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {i === item.photos.length - 1 && item.photos.length > 3 && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-white font-bold text-[13px]">
                      +{item.photos.length - 2}
                    </span>
                  </div>
                )}
              </button>
            ))}
          </div>
          <button
            onClick={() => onOpenLightbox(0)}
            className="mt-3 text-[12px] font-bold text-[#7EB3F7] hover:text-[#3B7FD4] transition-colors flex items-center gap-1"
          >
            <Expand className="w-3 h-3" /> View all photos
          </button>
        </Card>
      )}

      {/* Reporter card */}
      <Card variant="flat" padding="none" className="p-5">
        <p className="text-[11px] font-bold uppercase tracking-widest text-black/30 mb-4">
          Reported by
        </p>
        <div className="flex items-center gap-3">
          <Avatar name={item.reportedBy} size="md" />
          <div>
            <p className="font-semibold text-[14px] text-[#111010]">
              {item.reportedBy}
            </p>
            <p className="text-[12px] text-black/35 font-medium">
              Verified student
            </p>
          </div>
          <Badge variant="status-green" size="sm" className="ml-auto">
            Verified
          </Badge>
        </div>
      </Card>

      {/* Safety tip */}
      <div className="relative bg-[#111010] rounded-[24px] p-5 space-y-3 overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#7EB3F7] rounded-full blur-[50px] opacity-20 pointer-events-none" />
        <div className="relative">
          <AlertCircle className="w-4 h-4 text-[#7EB3F7] mb-2" />
          <p className="font-display text-[16px] italic text-white leading-tight mb-1.5">
            Stay safe.
          </p>
          <p className="text-[12px] text-white/40 font-medium leading-relaxed">
            Always meet in a{" "}
            <span className="text-white/70 font-semibold">
              public campus location
            </span>{" "}
            for handoffs. Never share personal financial details.
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Related items grid ───────────────────────────────────────────────────────

interface RelatedItem {
  id: string;
  name: string;
  location: string;
  status: string;
  color: string;
  text: string;
}

export function RelatedItems({ items }: { items: RelatedItem[] }) {
  return (
    <div>
      <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-black/30 mb-4">
        Other recent items
      </p>
      <div className="grid sm:grid-cols-3 gap-4">
        {items.map((rel) => (
          <Link key={rel.id} href={`/items/${rel.id}`} className="block group">
            <Card
              variant="flat"
              padding="none"
              hover
              className="p-4 flex flex-col gap-3"
            >
              <div
                className="w-10 h-10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform"
                style={{ background: rel.color }}
              >
                <Package className="w-5 h-5" style={{ color: rel.text }} />
              </div>
              <div>
                <p className="text-[13px] font-semibold text-[#111010] leading-snug group-hover:text-[#3B7FD4] transition-colors">
                  {rel.name}
                </p>
                <p className="text-[11px] text-black/35 font-medium mt-1 flex items-center gap-1">
                  <MapPin className="w-2.5 h-2.5" />
                  {rel.location}
                </p>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
