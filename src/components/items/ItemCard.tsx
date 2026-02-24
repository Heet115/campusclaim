"use client";

import Link from "next/link";
import { Package, MapPin, Clock, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

const statusConfig = {
  found: { label: "Found", variant: "status-green" as const },
  lost: { label: "Lost", variant: "status-red" as const },
};

interface ItemData {
  id: string;
  name: string;
  category: string;
  location: string;
  status: string;
  daysAgo: number;
  color: string;
  text: string;
}

export function ItemCard({
  item,
  layout,
}: {
  item: ItemData;
  layout: "grid" | "list";
}) {
  const stat = statusConfig[item.status as keyof typeof statusConfig];

  if (layout === "list") {
    return (
      <Link href={`/items/${item.id}`} className="block group">
        <div className="flex items-center gap-4 px-6 py-4 hover:bg-[#F7F4F0]/60 transition-colors cursor-pointer">
          <div
            className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform"
            style={{ background: item.color }}
          >
            <Package className="w-5 h-5" style={{ color: item.text }} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-[14px] text-[#111010] truncate group-hover:text-[#3B7FD4] transition-colors">
              {item.name}
            </p>
            <p className="text-[12px] text-black/35 font-medium flex items-center gap-1.5 mt-0.5">
              <MapPin className="w-3 h-3 shrink-0" />
              {item.location}
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Badge variant={stat.variant} size="sm" dot>
              {stat.label}
            </Badge>
            <span className="text-[11px] text-black/25 font-medium hidden sm:block">
              {item.daysAgo}d ago
            </span>
            <Badge
              variant="outline"
              size="sm"
              className="hidden md:inline-flex"
            >
              {item.category}
            </Badge>
            <ArrowRight className="w-4 h-4 text-black/15 group-hover:text-[#7EB3F7] group-hover:translate-x-0.5 transition-all" />
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/items/${item.id}`} className="block group">
      <Card
        variant="default"
        padding="none"
        hover
        className="overflow-hidden h-full"
      >
        <div
          className="h-28 flex items-center justify-center relative overflow-hidden"
          style={{ background: `${item.color}60` }}
        >
          <div
            className="w-14 h-14 rounded-[20px] flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
            style={{ background: item.color }}
          >
            <Package className="w-7 h-7" style={{ color: item.text }} />
          </div>
          <div className="absolute top-3 right-3">
            <Badge variant={stat.variant} size="sm" dot>
              {stat.label}
            </Badge>
          </div>
        </div>
        <div className="p-5 space-y-3">
          <div>
            <p className="font-semibold text-[14px] text-[#111010] leading-snug group-hover:text-[#3B7FD4] transition-colors">
              {item.name}
            </p>
            <Badge variant="outline" size="sm" className="mt-1.5">
              {item.category}
            </Badge>
          </div>
          <p className="text-[12px] text-black/35 font-medium flex items-center gap-1.5">
            <MapPin className="w-3 h-3 shrink-0" />
            {item.location}
          </p>
          <div className="flex items-center justify-between pt-1 border-t border-black/5">
            <span className="text-[11px] text-black/25 font-medium flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {item.daysAgo === 1 ? "Today" : `${item.daysAgo} days ago`}
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-black/20 group-hover:text-[#7EB3F7] group-hover:translate-x-0.5 transition-all" />
          </div>
        </div>
      </Card>
    </Link>
  );
}
