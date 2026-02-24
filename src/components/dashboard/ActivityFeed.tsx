import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

interface ActivityItem {
  title: string;
  time: string;
  type: string;
  dot: string;
  badge: {
    label: string;
    variant: "status-green" | "status-blue" | "status-amber" | "solid";
  };
}

export function ActivityFeed({ items }: { items: ActivityItem[] }) {
  return (
    <Card variant="default" padding="none" className="overflow-hidden">
      <div className="flex items-center justify-between px-6 py-5 border-b border-black/5">
        <h2 className="font-display text-[20px] italic text-[#111010]">
          Recent activity
        </h2>
        <div className="w-2 h-2 bg-[#7EB3F7] rounded-full animate-pulse" />
      </div>
      <div className="divide-y divide-black/4">
        {items.map((item, i) => (
          <div
            key={i}
            className="flex gap-3 px-6 py-4 group hover:bg-[#F7F4F0]/50 transition-colors"
          >
            <div className="mt-1 shrink-0">
              <span
                className="block w-2 h-2 rounded-full mt-1"
                style={{ background: item.dot }}
              />
            </div>
            <div className="flex-1 min-w-0 space-y-1.5">
              <p className="text-[13px] font-medium text-[#111010] leading-snug">
                {item.title}
              </p>
              <div className="flex items-center gap-2">
                <Badge variant={item.badge.variant} size="sm">
                  {item.badge.label}
                </Badge>
                <span className="text-[11px] text-black/30 font-medium">
                  {item.time}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
