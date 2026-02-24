import Link from "next/link";
import { ArrowRight, Package, MapPin, Plus } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

const statusMap: Record<
  string,
  {
    label: string;
    variant: "status-amber" | "status-green" | "status-blue" | "solid";
  }
> = {
  pending: { label: "Pending", variant: "status-amber" },
  reviewing: { label: "Reviewing", variant: "status-blue" },
  open: { label: "Open", variant: "solid" },
};

interface MyItem {
  name: string;
  location: string;
  status: string;
  category: string;
  daysAgo: number;
}

export function MyItemsCard({ items }: { items: MyItem[] }) {
  return (
    <Card variant="default" padding="none" className="overflow-hidden">
      <div className="flex items-center justify-between px-7 py-5 border-b border-black/5">
        <div>
          <h2 className="font-display text-[22px] italic text-[#111010]">
            My items
          </h2>
          <p className="text-[12px] text-black/35 font-medium mt-0.5">
            Items you&apos;ve reported or claimed
          </p>
        </div>
        <Link
          href="/items"
          className="text-[12px] font-bold text-[#7EB3F7] hover:text-[#3B7FD4] transition-colors flex items-center gap-1"
        >
          View all <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
      <div className="divide-y divide-black/4">
        {items.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-4 px-7 py-4 hover:bg-[#F7F4F0]/60 transition-colors group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-2xl bg-[#F7F4F0] border border-black/5 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Package className="w-4 h-4 text-black/25" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-[14px] text-[#111010] truncate">
                {item.name}
              </p>
              <p className="text-[12px] text-black/35 font-medium flex items-center gap-1.5 mt-0.5">
                <MapPin className="w-3 h-3" />
                {item.location}
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <Badge variant={statusMap[item.status].variant} size="sm" dot>
                {statusMap[item.status].label}
              </Badge>
              <span className="text-[11px] text-black/25 font-medium hidden sm:block">
                {item.daysAgo}d ago
              </span>
              <ArrowRight className="w-4 h-4 text-black/15 group-hover:text-black/40 group-hover:translate-x-0.5 transition-all" />
            </div>
          </div>
        ))}
      </div>
      <div className="px-7 py-4 bg-[#F7F4F0]/40 border-t border-black/5">
        <Button
          href="/report/lost"
          variant="outline"
          size="sm"
          icon={<Plus className="w-3.5 h-3.5" />}
          iconPosition="left"
          fullWidth
        >
          Report another item
        </Button>
      </div>
    </Card>
  );
}
