"use client";

import { Package, MapPin, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { CLAIM_STATUS } from "./ClaimStatus";

export interface Claim {
  id: string;
  itemName: string;
  itemCategory: string;
  itemLocation: string;
  itemColor: string;
  itemText: string;
  itemPhoto?: string;
  status: "pending" | "reviewing" | "approved" | "rejected" | "completed";
  submittedAt: string;
  updatedAt: string;
  message: string;
  finderName: string;
  myRole: "claimer" | "finder";
  timeline: {
    title: string;
    description?: string;
    timestamp: string;
    color: "default" | "blue" | "green" | "amber" | "red";
    icon?: React.ReactNode;
  }[];
}

export function ClaimCard({
  claim,
  onClick,
  active,
}: {
  claim: Claim;
  onClick: () => void;
  active: boolean;
}) {
  const s = CLAIM_STATUS[claim.status];
  return (
    <button
      onClick={onClick}
      className={`w-full text-left flex items-center gap-4 px-5 py-4 transition-all group ${
        active ? "bg-[#F7F4F0]" : "hover:bg-[#F7F4F0]/60"
      }`}
    >
      <div className="relative shrink-0">
        {claim.itemPhoto ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={claim.itemPhoto}
            alt={claim.itemName}
            className="w-12 h-12 rounded-2xl object-cover border border-black/6"
          />
        ) : (
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{ background: claim.itemColor }}
          >
            <Package className="w-5 h-5" style={{ color: claim.itemText }} />
          </div>
        )}
        {(claim.status === "approved" || claim.status === "reviewing") && (
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-white bg-[#7EB3F7]" />
        )}
      </div>

      <div className="flex-1 min-w-0 space-y-1">
        <p className="font-semibold text-[14px] text-[#111010] truncate leading-tight">
          {claim.itemName}
        </p>
        <p className="text-[12px] text-black/35 font-medium flex items-center gap-1.5">
          <MapPin className="w-3 h-3 shrink-0" />
          {claim.itemLocation}
        </p>
      </div>

      <div className="shrink-0 flex flex-col items-end gap-1.5">
        <Badge variant={s.variant} size="sm" dot>
          {s.label}
        </Badge>
        <span className="text-[10px] text-black/25 font-medium">
          {claim.updatedAt}
        </span>
      </div>

      <ChevronRight
        className={`w-4 h-4 shrink-0 transition-all ${active ? "text-[#111010]" : "text-black/15 group-hover:text-black/40"}`}
      />
    </button>
  );
}
