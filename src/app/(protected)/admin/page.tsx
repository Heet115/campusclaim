"use client";

import {
  Package,
  FileText,
  Users,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  ShieldCheck,
  AlertCircle,
  Eye,
  Trash2,
  MoreHorizontal,
  Search,
  MapPin,
  ArrowRight,
  RefreshCw,
  Ban,
  UserCheck,
} from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";
import { Table, TableColumn } from "@/components/ui/Table";
import { Timeline } from "@/components/ui/Timeline";

// ─────────────────────────────────────────────────────────────────────────────
// Mock data
// ─────────────────────────────────────────────────────────────────────────────

type ItemStatus = "found" | "lost" | "claimed" | "resolved";
type ClaimStatus = "pending" | "approved" | "rejected";
type UserRole = "student" | "admin" | "staff";

interface AdminItem {
  id: string;
  name: string;
  category: string;
  location: string;
  status: ItemStatus;
  reportedBy: string;
  date: string;
  claims: number;
  color: string;
  text: string;
}

interface AdminClaim {
  id: string;
  item: string;
  claimer: string;
  finder: string;
  status: ClaimStatus;
  submitted: string;
  message: string;
}

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  joined: string;
  reports: number;
  claims: number;
  active: boolean;
}

const ITEMS: AdminItem[] = [
  {
    id: "i1",
    name: 'MacBook Pro 14"',
    category: "Electronics",
    location: "Library, 3F",
    status: "found",
    reportedBy: "Alex R.",
    date: "Feb 22",
    claims: 2,
    color: "#C8DFFE",
    text: "#3B7FD4",
  },
  {
    id: "i2",
    name: "Sony XM4 Headphones",
    category: "Electronics",
    location: "Cafeteria B",
    status: "lost",
    reportedBy: "Maya P.",
    date: "Feb 23",
    claims: 0,
    color: "#FDE8D8",
    text: "#C2622A",
  },
  {
    id: "i3",
    name: "House Keys (Blue Lanyard)",
    category: "Keys",
    location: "Engineering Blk",
    status: "resolved",
    reportedBy: "Rohan K.",
    date: "Feb 10",
    claims: 1,
    color: "#D4F4DC",
    text: "#2E7D45",
  },
  {
    id: "i4",
    name: "Campus ID STU-7821",
    category: "Documents",
    location: "Admin Block",
    status: "found",
    reportedBy: "Sam T.",
    date: "Feb 21",
    claims: 1,
    color: "#EDE8FD",
    text: "#6B3EDE",
  },
  {
    id: "i5",
    name: "HP Pavilion Charger",
    category: "Electronics",
    location: "Library, 2F",
    status: "claimed",
    reportedBy: "Divya S.",
    date: "Feb 19",
    claims: 1,
    color: "#C8DFFE",
    text: "#3B7FD4",
  },
  {
    id: "i6",
    name: "Blue Hydroflask 32oz",
    category: "Accessories",
    location: "Library, 3F",
    status: "resolved",
    reportedBy: "Priya M.",
    date: "Feb 10",
    claims: 1,
    color: "#FDE8D8",
    text: "#C2622A",
  },
  {
    id: "i7",
    name: "TI-84 Calculator",
    category: "Electronics",
    location: "Maths Block R303",
    status: "lost",
    reportedBy: "Jay B.",
    date: "Feb 23",
    claims: 0,
    color: "#EDE8FD",
    text: "#6B3EDE",
  },
  {
    id: "i8",
    name: "Red Umbrella",
    category: "Accessories",
    location: "Main Gate",
    status: "found",
    reportedBy: "Nisha K.",
    date: "Feb 22",
    claims: 0,
    color: "#FDE8D8",
    text: "#C2622A",
  },
];

const CLAIMS: AdminClaim[] = [
  {
    id: "c1",
    item: 'MacBook Pro 14"',
    claimer: "Maya P.",
    finder: "Alex R.",
    status: "pending",
    submitted: "Feb 23",
    message: "My laptop, scratch on lid, serial starts C02ZK.",
  },
  {
    id: "c2",
    item: "Campus ID STU-7821",
    claimer: "Raj S.",
    finder: "Sam T.",
    status: "approved",
    submitted: "Feb 21",
    message: "My student ID, I can show verification on my phone.",
  },
  {
    id: "c3",
    item: "HP Pavilion Charger",
    claimer: "Anika V.",
    finder: "Divya S.",
    status: "pending",
    submitted: "Feb 20",
    message: "Blue HP charger with a tape label 'A.V.' near the plug.",
  },
  {
    id: "c4",
    item: "House Keys",
    claimer: "Karan M.",
    finder: "Rohan K.",
    status: "rejected",
    submitted: "Feb 11",
    message: "Had Stanford 2025 lanyard.",
  },
  {
    id: "c5",
    item: "Sony XM4 Headphones",
    claimer: "Leena T.",
    finder: "Maya P.",
    status: "pending",
    submitted: "Feb 23",
    message: "Midnight black, guitar-pick keychain on case.",
  },
];

const USERS: AdminUser[] = [
  {
    id: "u1",
    name: "Maya Patel",
    email: "maya@stanford.edu",
    role: "student",
    joined: "Sep 2024",
    reports: 3,
    claims: 5,
    active: true,
  },
  {
    id: "u2",
    name: "Alex Ramirez",
    email: "alex@stanford.edu",
    role: "student",
    joined: "Aug 2023",
    reports: 7,
    claims: 2,
    active: true,
  },
  {
    id: "u3",
    name: "Priya Mehta",
    email: "priya@stanford.edu",
    role: "student",
    joined: "Jan 2025",
    reports: 1,
    claims: 3,
    active: true,
  },
  {
    id: "u4",
    name: "Rohan Kumar",
    email: "rohan@stanford.edu",
    role: "staff",
    joined: "Mar 2022",
    reports: 12,
    claims: 0,
    active: true,
  },
  {
    id: "u5",
    name: "Divya Sharma",
    email: "divya@stanford.edu",
    role: "student",
    joined: "Sep 2024",
    reports: 2,
    claims: 1,
    active: false,
  },
  {
    id: "u6",
    name: "Sam Thompson",
    email: "sam@stanford.edu",
    role: "admin",
    joined: "Jan 2022",
    reports: 0,
    claims: 0,
    active: true,
  },
  {
    id: "u7",
    name: "Karan Mehta",
    email: "karan@stanford.edu",
    role: "student",
    joined: "Aug 2024",
    reports: 1,
    claims: 4,
    active: true,
  },
  {
    id: "u8",
    name: "Leena Thomas",
    email: "leena@stanford.edu",
    role: "student",
    joined: "Sep 2023",
    reports: 2,
    claims: 2,
    active: true,
  },
];

const ACTIVITY = [
  {
    title: 'New found report: MacBook Pro 14"',
    description: "Reported by Alex R. at Library, 3F.",
    timestamp: "2 min ago",
    color: "blue" as const,
    icon: <Package className="w-4 h-4" />,
  },
  {
    title: "Claim approved: Campus ID",
    description: "Raj S.'s claim verified by Sam T.",
    timestamp: "18 min ago",
    color: "green" as const,
    icon: <CheckCircle className="w-4 h-4" />,
  },
  {
    title: "New user registered",
    description: "Leena Thomas joined from stanford.edu.",
    timestamp: "1 hr ago",
    color: "default" as const,
    icon: <Users className="w-4 h-4" />,
  },
  {
    title: "Claim rejected: House Keys",
    description: "Karan M.'s claim could not be verified.",
    timestamp: "3 hr ago",
    color: "red" as const,
    icon: <XCircle className="w-4 h-4" />,
  },
  {
    title: "Item resolved: Hydroflask",
    description: "Successfully returned to Priya M.",
    timestamp: "5 hr ago",
    color: "green" as const,
    icon: <ShieldCheck className="w-4 h-4" />,
  },
  {
    title: "Flag raised: suspicious claim",
    description: "Auto-flagged for admin review on item i7.",
    timestamp: "8 hr ago",
    color: "amber" as const,
    icon: <AlertCircle className="w-4 h-4" />,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Status config helpers
// ─────────────────────────────────────────────────────────────────────────────

const ITEM_STATUS: Record<
  ItemStatus,
  {
    label: string;
    variant:
      | "status-green"
      | "status-amber"
      | "status-blue"
      | "status-red"
      | "solid";
  }
> = {
  found: { label: "Found", variant: "status-blue" },
  lost: { label: "Lost", variant: "status-red" },
  claimed: { label: "Claimed", variant: "status-amber" },
  resolved: { label: "Resolved", variant: "status-green" },
};

const CLAIM_STATUS: Record<
  ClaimStatus,
  {
    label: string;
    variant:
      | "status-green"
      | "status-amber"
      | "status-blue"
      | "status-red"
      | "solid";
  }
> = {
  pending: { label: "Pending", variant: "status-amber" },
  approved: { label: "Approved", variant: "status-green" },
  rejected: { label: "Rejected", variant: "status-red" },
};

const USER_ROLE: Record<
  UserRole,
  { label: string; variant: "status-green" | "status-amber" | "solid" }
> = {
  student: { label: "Student", variant: "status-amber" },
  staff: { label: "Staff", variant: "solid" },
  admin: { label: "Admin", variant: "status-green" },
};

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────────────────────

function KpiCard({
  label,
  value,
  sub,
  color,
  text,
  icon,
}: {
  label: string;
  value: string | number;
  sub?: string;
  color: string;
  text: string;
  icon: React.ReactNode;
}) {
  return (
    <Card
      variant="default"
      padding="none"
      className="p-6 flex items-start gap-4 group hover:-translate-y-0.5 transition-all duration-300"
    >
      <div
        className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform"
        style={{ background: color }}
      >
        <span style={{ color: text }}>{icon}</span>
      </div>
      <div>
        <p className="font-display text-[32px] italic text-[#111010] leading-none">
          {value}
        </p>
        <p className="text-[13px] font-semibold text-black/45 mt-1">{label}</p>
        {sub && (
          <p className="text-[11px] font-medium text-black/25 mt-0.5">{sub}</p>
        )}
      </div>
    </Card>
  );
}

function ActionMenu({
  onView,
  onDelete,
}: {
  onView?: () => void;
  onDelete?: () => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative inline-block" onClick={(e) => e.stopPropagation()}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-7 h-7 rounded-lg flex items-center justify-center text-black/25 hover:text-black/60 hover:bg-black/5 transition-all"
        aria-label="Actions"
      >
        <MoreHorizontal className="w-4 h-4" />
      </button>
      {open && (
        <div
          onMouseLeave={() => setOpen(false)}
          className="absolute right-0 top-full mt-1 w-40 bg-white rounded-2xl border border-black/6 shadow-[0_16px_40px_-8px_rgba(0,0,0,0.12)] overflow-hidden z-20 py-1"
        >
          {onView && (
            <button
              onClick={() => {
                onView();
                setOpen(false);
              }}
              className="flex items-center gap-2.5 w-full px-4 py-2.5 text-[13px] font-semibold text-black/70 hover:bg-[#F7F4F0] transition-colors"
            >
              <Eye className="w-3.5 h-3.5 text-black/30" /> View
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => {
                onDelete();
                setOpen(false);
              }}
              className="flex items-center gap-2.5 w-full px-4 py-2.5 text-[13px] font-semibold text-red-500 hover:bg-red-50 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5 text-red-400" /> Remove
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Tab: Overview
// ─────────────────────────────────────────────────────────────────────────────

function OverviewTab() {
  const kpis = [
    {
      label: "Total items",
      value: ITEMS.length,
      sub: "+3 this week",
      color: "#C8DFFE",
      text: "#3B7FD4",
      icon: <Package className="w-5 h-5" />,
    },
    {
      label: "Open claims",
      value: CLAIMS.filter((c) => c.status === "pending").length,
      sub: "Needs review",
      color: "#FDE8D8",
      text: "#C2622A",
      icon: <FileText className="w-5 h-5" />,
    },
    {
      label: "Registered users",
      value: USERS.length,
      sub: "+1 today",
      color: "#D4F4DC",
      text: "#2E7D45",
      icon: <Users className="w-5 h-5" />,
    },
    {
      label: "Resolved cases",
      value: ITEMS.filter((i) => i.status === "resolved").length,
      sub: "All time",
      color: "#EDE8FD",
      text: "#6B3EDE",
      icon: <ShieldCheck className="w-5 h-5" />,
    },
  ];

  return (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((k, i) => (
          <KpiCard key={i} {...k} />
        ))}
      </div>

      <div className="grid lg:grid-cols-[1fr_360px] gap-6">
        {/* Quick stats chart stand-in */}
        <Card variant="default" padding="none" className="p-6 space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-black/30">
                Recovery rate
              </p>
              <p className="font-display text-[36px] italic text-[#111010] leading-tight">
                67%
              </p>
            </div>
            <div className="flex items-center gap-1.5 bg-[#D4F4DC] px-3 py-1.5 rounded-xl">
              <TrendingUp className="w-3.5 h-3.5 text-[#2E7D45]" />
              <span className="text-[12px] font-bold text-[#2E7D45]">
                +4% this month
              </span>
            </div>
          </div>
          {/* Bar chart mock */}
          <div className="space-y-3">
            {[
              { label: "Found → Resolved", value: 67, color: "#A8E6C2" },
              { label: "Lost → Matched", value: 48, color: "#7EB3F7" },
              { label: "Claims approved", value: 72, color: "#C8DFFE" },
              { label: "Avg. response", value: 85, color: "#EDE8FD" },
            ].map((bar) => (
              <div key={bar.label} className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[12px] font-semibold text-black/50">
                    {bar.label}
                  </span>
                  <span className="text-[12px] font-bold text-[#111010]">
                    {bar.value}%
                  </span>
                </div>
                <div className="h-2 bg-black/5 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${bar.value}%`, background: bar.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Activity feed */}
        <Card variant="default" padding="none" className="p-6 space-y-5">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-bold uppercase tracking-widest text-black/30">
              Live activity
            </p>
            <button className="text-[11px] font-bold text-[#7EB3F7] hover:text-[#3B7FD4] transition-colors flex items-center gap-1">
              <RefreshCw className="w-3 h-3" /> Refresh
            </button>
          </div>
          <Timeline events={ACTIVITY} variant="compact" />
        </Card>
      </div>

      {/* Flagged items */}
      <Card
        variant="default"
        padding="none"
        className="p-5 flex items-start gap-4 border-l-4 border-amber-400"
      >
        <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
        <div className="flex-1 min-w-0">
          <p className="font-bold text-[14px] text-[#111010]">
            1 claim flagged for review
          </p>
          <p className="text-[13px] text-black/45 font-medium mt-0.5">
            Item <span className="font-semibold">i7 (TI-84 Calculator)</span>{" "}
            has a suspicious claim pattern. Review it in the Claims tab.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          icon={<ArrowRight className="w-3.5 h-3.5" />}
        >
          Review
        </Button>
      </Card>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Tab: Items
// ─────────────────────────────────────────────────────────────────────────────

function ItemsTab() {
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState<(string | number)[]>([]);

  const filtered = ITEMS.filter(
    (i) =>
      !search ||
      i.name.toLowerCase().includes(search.toLowerCase()) ||
      i.location.toLowerCase().includes(search.toLowerCase()) ||
      i.category.toLowerCase().includes(search.toLowerCase()),
  );

  const columns: TableColumn<AdminItem>[] = [
    {
      key: "name",
      header: "Item",
      sortable: true,
      render: (row) => (
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: row.color }}
          >
            <Package className="w-3.5 h-3.5" style={{ color: row.text }} />
          </div>
          <div>
            <p className="font-semibold text-[13px] text-[#111010]">
              {row.name}
            </p>
            <p className="text-[11px] text-black/35 font-medium flex items-center gap-1">
              <MapPin className="w-2.5 h-2.5" />
              {row.location}
            </p>
          </div>
        </div>
      ),
    },
    { key: "category", header: "Category", sortable: true },
    { key: "reportedBy", header: "Reported by", sortable: true },
    { key: "date", header: "Date", sortable: true },
    {
      key: "status",
      header: "Status",
      render: (row) => (
        <Badge variant={ITEM_STATUS[row.status].variant} size="sm" dot>
          {ITEM_STATUS[row.status].label}
        </Badge>
      ),
    },
    {
      key: "claims",
      header: "Claims",
      align: "center",
      render: (row) => (
        <span
          className={`text-[13px] font-bold ${row.claims > 0 ? "text-[#3B7FD4]" : "text-black/25"}`}
        >
          {row.claims}
        </span>
      ),
    },
    {
      key: "actions",
      header: "",
      align: "right",
      render: () => <ActionMenu onView={() => {}} onDelete={() => {}} />,
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="flex items-center gap-2.5 flex-1 bg-[#F7F4F0] rounded-2xl px-4 py-2.5 border border-black/5 focus-within:bg-white focus-within:border-[#7EB3F7]/40 focus-within:ring-4 focus-within:ring-[#7EB3F7]/5 transition-all">
          <Search className="w-3.5 h-3.5 text-black/30 shrink-0" />
          <input
            type="text"
            placeholder="Search items…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-[13px] text-[#111010] placeholder:text-black/30 outline-none"
          />
        </div>
        {selectedIds.length > 0 && (
          <Button
            variant="danger"
            size="sm"
            icon={<Trash2 className="w-3.5 h-3.5" />}
            iconPosition="left"
          >
            Remove {selectedIds.length} selected
          </Button>
        )}
      </div>

      <Table
        columns={columns}
        data={filtered}
        selectable
        selectedIds={selectedIds}
        onSelectionChange={setSelectedIds}
        stickyHeader
        emptyState={
          <p className="text-[13px] font-medium text-black/30">
            No items match your search.
          </p>
        }
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Tab: Claims
// ─────────────────────────────────────────────────────────────────────────────

function ClaimsTab() {
  const [claimsData, setClaimsData] = useState(CLAIMS);

  function approve(id: string) {
    setClaimsData((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, status: "approved" as ClaimStatus } : c,
      ),
    );
  }
  function reject(id: string) {
    setClaimsData((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, status: "rejected" as ClaimStatus } : c,
      ),
    );
  }

  const columns: TableColumn<AdminClaim>[] = [
    {
      key: "item",
      header: "Item",
      sortable: true,
      render: (row) => (
        <p className="font-semibold text-[13px] text-[#111010]">{row.item}</p>
      ),
    },
    {
      key: "claimer",
      header: "Claimer",
      render: (row) => (
        <div className="flex items-center gap-2">
          <Avatar name={row.claimer} size="xs" />
          <span className="text-[13px] font-semibold text-[#111010]">
            {row.claimer}
          </span>
        </div>
      ),
    },
    {
      key: "finder",
      header: "Finder",
      render: (row) => (
        <div className="flex items-center gap-2">
          <Avatar name={row.finder} size="xs" />
          <span className="text-[13px] font-medium text-black/60">
            {row.finder}
          </span>
        </div>
      ),
    },
    { key: "submitted", header: "Submitted", sortable: true },
    {
      key: "status",
      header: "Status",
      render: (row) => (
        <Badge variant={CLAIM_STATUS[row.status].variant} size="sm" dot>
          {CLAIM_STATUS[row.status].label}
        </Badge>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      align: "right",
      render: (row) =>
        row.status === "pending" ? (
          <div className="flex items-center gap-2 justify-end">
            <button
              onClick={() => approve(row.id)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 bg-[#D4F4DC] text-[#2E7D45] rounded-xl text-[11px] font-bold hover:bg-[#bfeed0] transition-colors"
            >
              <CheckCircle className="w-3 h-3" /> Approve
            </button>
            <button
              onClick={() => reject(row.id)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 bg-red-50 text-red-500 rounded-xl text-[11px] font-bold hover:bg-red-100 transition-colors"
            >
              <XCircle className="w-3 h-3" /> Reject
            </button>
          </div>
        ) : (
          <span className="text-[12px] font-medium text-black/25">—</span>
        ),
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 bg-[#FDE8D8]/60 border border-[#FDB8A0]/50 rounded-2xl px-4 py-2.5">
          <Clock className="w-4 h-4 text-[#C2622A] shrink-0" />
          <span className="text-[13px] font-bold text-[#C2622A]">
            {claimsData.filter((c) => c.status === "pending").length} claim
            {claimsData.filter((c) => c.status === "pending").length !== 1
              ? "s"
              : ""}{" "}
            pending review
          </span>
        </div>
      </div>
      <Table columns={columns} data={claimsData} stickyHeader />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Tab: Users
// ─────────────────────────────────────────────────────────────────────────────

function UsersTab() {
  const [search, setSearch] = useState("");

  const filtered = USERS.filter(
    (u) =>
      !search ||
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()),
  );

  const columns: TableColumn<AdminUser>[] = [
    {
      key: "name",
      header: "User",
      sortable: true,
      render: (row) => (
        <div className="flex items-center gap-3">
          <Avatar
            name={row.name}
            size="sm"
            status={row.active ? "online" : "offline"}
          />
          <div>
            <p className="font-semibold text-[13px] text-[#111010]">
              {row.name}
            </p>
            <p className="text-[11px] text-black/35 font-medium">{row.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: "role",
      header: "Role",
      sortable: true,
      render: (row) => (
        <Badge variant={USER_ROLE[row.role].variant} size="sm">
          {USER_ROLE[row.role].label}
        </Badge>
      ),
    },
    { key: "joined", header: "Joined", sortable: true },
    {
      key: "reports",
      header: "Reports",
      align: "center",
      sortable: true,
      render: (row) => (
        <span className="font-bold text-[13px] text-[#111010]">
          {row.reports}
        </span>
      ),
    },
    {
      key: "claims",
      header: "Claims",
      align: "center",
      sortable: true,
      render: (row) => (
        <span className="font-bold text-[13px] text-[#111010]">
          {row.claims}
        </span>
      ),
    },
    {
      key: "active",
      header: "Status",
      render: (row) => (
        <Badge
          variant={row.active ? "status-green" : "status-red"}
          size="sm"
          dot
        >
          {row.active ? "Active" : "Suspended"}
        </Badge>
      ),
    },
    {
      key: "actions",
      header: "",
      align: "right",
      render: (row) => (
        <div className="flex items-center gap-1.5 justify-end">
          {row.active ? (
            <button className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-[11px] font-bold text-red-400 hover:bg-red-50 transition-colors">
              <Ban className="w-3 h-3" /> Suspend
            </button>
          ) : (
            <button className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-[11px] font-bold text-[#2E7D45] hover:bg-[#D4F4DC] transition-colors">
              <UserCheck className="w-3 h-3" /> Reinstate
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <div className="flex items-center gap-2.5 flex-1 bg-[#F7F4F0] rounded-2xl px-4 py-2.5 border border-black/5 focus-within:bg-white focus-within:border-[#7EB3F7]/40 focus-within:ring-4 focus-within:ring-[#7EB3F7]/5 transition-all">
          <Search className="w-3.5 h-3.5 text-black/30 shrink-0" />
          <input
            type="text"
            placeholder="Search users by name or email…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-[13px] text-[#111010] placeholder:text-black/30 outline-none"
          />
        </div>
      </div>
      <Table
        columns={columns}
        data={filtered}
        stickyHeader
        emptyState={
          <p className="text-[13px] font-medium text-black/30">
            No users match your search.
          </p>
        }
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function AdminPage() {
  const pendingClaims = CLAIMS.filter((c) => c.status === "pending").length;

  return (
    <div className="space-y-8">
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-black/30 mb-2">
            Administration
          </p>
          <h1 className="font-display text-[44px] md:text-[56px] italic text-[#111010] leading-[0.9]">
            Admin panel.
          </h1>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          {pendingClaims > 0 && (
            <div className="flex items-center gap-2 bg-[#FDE8D8]/70 border border-[#FDB8A0]/60 rounded-2xl px-4 py-2.5">
              <AlertCircle className="w-4 h-4 text-[#C2622A] shrink-0" />
              <span className="text-[13px] font-bold text-[#C2622A]">
                {pendingClaims} pending
              </span>
            </div>
          )}
          <Badge variant="solid" size="sm">
            <ShieldCheck className="w-3 h-3 mr-1" /> Admin
          </Badge>
        </div>
      </div>

      {/* ── Tabs ── */}
      <Tabs defaultValue="overview" variant="pill">
        <div className="bg-white/80 backdrop-blur-xl rounded-[24px] border border-black/6 shadow-sm px-5 py-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="items" badge={ITEMS.length}>
              Items
            </TabsTrigger>
            <TabsTrigger value="claims" badge={pendingClaims}>
              Claims
            </TabsTrigger>
            <TabsTrigger value="users" badge={USERS.length}>
              Users
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="overview">
          <OverviewTab />
        </TabsContent>
        <TabsContent value="items">
          <ItemsTab />
        </TabsContent>
        <TabsContent value="claims">
          <ClaimsTab />
        </TabsContent>
        <TabsContent value="users">
          <UsersTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
