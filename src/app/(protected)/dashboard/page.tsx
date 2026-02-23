import {
  Search,
  Package,
  CheckCircle,
  Clock,
  ArrowRight,
  MapPin,
  Plus,
  Bell,
  TrendingUp,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";

// ─── Mock data ────────────────────────────────────────────────────────────────

const stats = [
  {
    label: "Items reported",
    value: "3",
    delta: "+1 this week",
    icon: <Package className="w-4 h-4" />,
    color: "#C8DFFE",
    text: "#3B7FD4",
  },
  {
    label: "Active claims",
    value: "2",
    delta: "Pending review",
    icon: <Clock className="w-4 h-4" />,
    color: "#FDE8D8",
    text: "#C2622A",
  },
  {
    label: "Items recovered",
    value: "1",
    delta: "All time",
    icon: <CheckCircle className="w-4 h-4" />,
    color: "#D4F4DC",
    text: "#2E7D45",
  },
  {
    label: "Match rate",
    value: "67%",
    delta: "Above average",
    icon: <TrendingUp className="w-4 h-4" />,
    color: "#EDE8FD",
    text: "#6B3EDE",
  },
];

const recentActivity = [
  {
    title: "Your claim for MacBook Pro was approved",
    time: "2 hours ago",
    type: "approved",
    dot: "#A8E6C2",
    badge: { label: "Approved", variant: "status-green" as const },
  },
  {
    title: "New match found for Sony WH-1000XM4",
    time: "5 hours ago",
    type: "match",
    dot: "#7EB3F7",
    badge: { label: "Match", variant: "status-blue" as const },
  },
  {
    title: "House keys (blue lanyard) claim submitted",
    time: "Yesterday",
    type: "claim",
    dot: "#FDB8A0",
    badge: { label: "Pending", variant: "status-amber" as const },
  },
  {
    title: "You reported Blue Hydroflask (Library)",
    time: "2 days ago",
    type: "report",
    dot: "#EDE8FD",
    badge: { label: "Reported", variant: "solid" as const },
  },
];

const myItems = [
  {
    name: "Sony WH-1000XM4",
    location: "Cafeteria, Block B",
    status: "pending",
    category: "Electronics",
    daysAgo: 5,
  },
  {
    name: "House Keys (Blue Lanyard)",
    location: "Engineering Block, 2F",
    status: "reviewing",
    category: "Keys",
    daysAgo: 1,
  },
  {
    name: "Blue Hydroflask 32oz",
    location: "Library, 3F",
    status: "open",
    category: "Accessories",
    daysAgo: 2,
  },
];

const quickActions = [
  {
    title: "Report lost item",
    desc: "Something missing? File a report.",
    href: "/report/lost",
    icon: <Search className="w-5 h-5 text-[#3B7FD4]" />,
    bg: "#C8DFFE",
  },
  {
    title: "Report found item",
    desc: "Found something? Help reunite it.",
    href: "/report/found",
    icon: <Package className="w-5 h-5 text-[#2E7D45]" />,
    bg: "#D4F4DC",
  },
  {
    title: "Browse directory",
    desc: "Search 400+ reported items.",
    href: "/items",
    icon: <MapPin className="w-5 h-5 text-[#C2622A]" />,
    bg: "#FDE8D8",
  },
];

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

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  return (
    <div className="space-y-10 pb-4">
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-black/30 mb-2">
            Dashboard
          </p>
          <h1 className="font-display text-[44px] md:text-[56px] italic text-[#111010] leading-[0.9]">
            Welcome back,
            <br />
            <span className="not-italic text-black/25">Maya.</span>
          </h1>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <Button
            variant="outline"
            size="sm"
            icon={<Bell className="w-4 h-4" />}
            iconPosition="left"
            className="relative"
          >
            Alerts
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#7EB3F7] rounded-full" />
          </Button>
          <Button
            href="/report/lost"
            variant="primary"
            size="sm"
            icon={<Plus className="w-4 h-4" />}
            iconPosition="left"
            className="btn-magnetic"
          >
            New report
          </Button>
        </div>
      </div>

      {/* ── Stat cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <Card
            key={i}
            variant="default"
            padding="none"
            className="p-6 flex flex-col gap-4 group hover:-translate-y-1 transition-all duration-300"
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform"
              style={{ background: s.color, color: s.text }}
            >
              {s.icon}
            </div>
            <div>
              <p className="font-display text-[36px] italic text-[#111010] leading-none mb-1">
                {s.value}
              </p>
              <p className="text-[12px] font-semibold text-black/40">
                {s.label}
              </p>
            </div>
            <p className="text-[11px] font-medium text-black/30 mt-auto">
              {s.delta}
            </p>
          </Card>
        ))}
      </div>

      {/* ── Main grid ── */}
      <div className="grid lg:grid-cols-[1fr_380px] gap-6">
        {/* Left column */}
        <div className="space-y-6">
          {/* My items */}
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
              {myItems.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 px-7 py-4 hover:bg-[#F7F4F0]/60 transition-colors group cursor-pointer"
                >
                  {/* Icon */}
                  <div className="w-10 h-10 rounded-2xl bg-[#F7F4F0] border border-black/5 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Package className="w-4 h-4 text-black/25" />
                  </div>
                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-[14px] text-[#111010] truncate">
                      {item.name}
                    </p>
                    <p className="text-[12px] text-black/35 font-medium flex items-center gap-1.5 mt-0.5">
                      <MapPin className="w-3 h-3" />
                      {item.location}
                    </p>
                  </div>
                  {/* Meta */}
                  <div className="flex items-center gap-3 shrink-0">
                    <Badge
                      variant={statusMap[item.status].variant}
                      size="sm"
                      dot
                    >
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

          {/* Quick actions */}
          <div>
            <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-black/30 mb-4">
              Quick actions
            </p>
            <div className="grid sm:grid-cols-3 gap-4">
              {quickActions.map((qa, i) => (
                <Link key={i} href={qa.href} className="block group">
                  <Card
                    variant="default"
                    padding="none"
                    hover
                    className="p-5 h-full"
                  >
                    <div
                      className="w-10 h-10 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                      style={{ background: qa.bg }}
                    >
                      {qa.icon}
                    </div>
                    <p className="font-semibold text-[14px] text-[#111010] mb-1">
                      {qa.title}
                    </p>
                    <p className="text-[12px] text-black/40 font-medium leading-relaxed">
                      {qa.desc}
                    </p>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Activity feed */}
          <Card variant="default" padding="none" className="overflow-hidden">
            <div className="flex items-center justify-between px-6 py-5 border-b border-black/5">
              <h2 className="font-display text-[20px] italic text-[#111010]">
                Recent activity
              </h2>
              <div className="w-2 h-2 bg-[#7EB3F7] rounded-full animate-pulse" />
            </div>
            <div className="divide-y divide-black/4">
              {recentActivity.map((item, i) => (
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

          {/* Profile snapshot */}
          <Card variant="flat" padding="none" className="p-6">
            <div className="flex items-center gap-3 mb-5">
              <Avatar name="Maya Patel" size="lg" />
              <div>
                <p className="font-semibold text-[15px] text-[#111010]">
                  Maya Patel
                </p>
                <p className="text-[12px] text-black/40 font-medium">
                  maya@stanford.edu
                </p>
              </div>
            </div>
            <div className="space-y-2.5">
              {[
                { label: "University", value: "Stanford University" },
                { label: "Student ID", value: "STU-2024-8821" },
                { label: "Member since", value: "Jan 2024" },
              ].map((row, i) => (
                <div key={i} className="flex justify-between items-center">
                  <span className="text-[12px] font-medium text-black/40">
                    {row.label}
                  </span>
                  <span className="text-[12px] font-semibold text-[#111010]">
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
            <hr className="border-none h-px bg-black/6 my-4" />
            <Button
              href="/profile"
              variant="outline"
              size="sm"
              fullWidth
              icon={<ArrowRight className="w-3.5 h-3.5" />}
            >
              Edit profile
            </Button>
          </Card>

          {/* Tip card */}
          <div className="relative bg-[#111010] rounded-[28px] p-6 overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#7EB3F7] rounded-full blur-[60px] opacity-20 pointer-events-none" />
            <div className="relative z-10">
              <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center mb-4 border border-white/10">
                <Zap className="w-4 h-4 text-[#7EB3F7]" />
              </div>
              <p className="font-display text-[20px] italic text-white leading-tight mb-2">
                Tip: Add photos.
              </p>
              <p className="text-[12px] text-white/40 font-medium leading-relaxed mb-4">
                Reports with photos get matched{" "}
                <span className="text-white/70 font-bold">3× faster</span>.
                Update your existing reports now.
              </p>
              <Button
                href="/items"
                size="sm"
                className="bg-white/10 border border-white/10 text-white hover:bg-white/20 transition-colors backdrop-blur-md text-[13px]"
                icon={<ArrowRight className="w-3.5 h-3.5" />}
              >
                Update reports
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
