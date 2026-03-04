import {
  Search,
  Package,
  CheckCircle,
  Clock,
  MapPin,
  Plus,
  Bell,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  StatCard,
  MyItemsCard,
  QuickActions,
  ActivityFeed,
  ProfileSnapshot,
  TipCard,
} from "@/components/dashboard";

// ─── Data ─────────────────────────────────────────────────────────────────────

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

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  return (
    <div className="space-y-10 pb-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-black/30 mb-2">
            Dashboard
          </p>
          <h1 className="font-display text-[44px] md:text-[56px] italic text-[#111010] leading-[0.9]">
            Welcome back,
            <br />
            <span className="not-italic text-black/25">Heet.</span>
          </h1>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <Button
            variant="outline"
            size="sm"
            href="/notifications"
            icon={<Bell className="w-4 h-4" />}
            iconPosition="left"
            className="relative"
          >
            notifications
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

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <StatCard key={i} {...s} />
        ))}
      </div>

      {/* Main grid */}
      <div className="grid lg:grid-cols-[1fr_380px] gap-6">
        {/* Left column */}
        <div className="space-y-6">
          <MyItemsCard items={myItems} />
          <QuickActions actions={quickActions} />
        </div>

        {/* Right column */}
        <div className="space-y-6">
          <ActivityFeed items={recentActivity} />
          <ProfileSnapshot />
          <TipCard />
        </div>
      </div>
    </div>
  );
}
