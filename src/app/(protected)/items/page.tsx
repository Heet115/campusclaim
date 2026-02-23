"use client";

import {
  Search,
  SlidersHorizontal,
  MapPin,
  Clock,
  Package,
  ArrowRight,
  Grid3X3,
  List,
  X,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";

// ─── Mock data ────────────────────────────────────────────────────────────────

const ITEMS = [
  {
    id: "1",
    name: 'Space Gray MacBook Pro 14"',
    category: "Electronics",
    location: "Library, 3F",
    status: "found",
    daysAgo: 1,
    color: "#C8DFFE",
    text: "#3B7FD4",
  },
  {
    id: "2",
    name: "Sony WH-1000XM4 Headphones",
    category: "Electronics",
    location: "Cafeteria, Block B",
    status: "lost",
    daysAgo: 2,
    color: "#FDE8D8",
    text: "#C2622A",
  },
  {
    id: "3",
    name: "House Keys (Blue Lanyard)",
    category: "Keys",
    location: "Engineering Block, 2F",
    status: "found",
    daysAgo: 3,
    color: "#D4F4DC",
    text: "#2E7D45",
  },
  {
    id: "4",
    name: "Blue Hydroflask 32oz",
    category: "Accessories",
    location: "Library, 3F",
    status: "found",
    daysAgo: 4,
    color: "#C8DFFE",
    text: "#3B7FD4",
  },
  {
    id: "5",
    name: "Campus ID Card – STU-7821",
    category: "Documents",
    location: "Admin Block, 1F",
    status: "found",
    daysAgo: 1,
    color: "#EDE8FD",
    text: "#6B3EDE",
  },
  {
    id: "6",
    name: "Black Leather Wallet",
    category: "Accessories",
    location: "Sports Complex",
    status: "lost",
    daysAgo: 5,
    color: "#FDE8D8",
    text: "#C2622A",
  },
  {
    id: "7",
    name: "HP Pavilion 15 Charger",
    category: "Electronics",
    location: "Library, 2F",
    status: "found",
    daysAgo: 2,
    color: "#C8DFFE",
    text: "#3B7FD4",
  },
  {
    id: "8",
    name: "Stethoscope (Medical Dept.)",
    category: "Medical",
    location: "Medical Sciences, B1",
    status: "found",
    daysAgo: 6,
    color: "#D4F4DC",
    text: "#2E7D45",
  },
  {
    id: "9",
    name: "Red Umbrella",
    category: "Accessories",
    location: "Main Gate",
    status: "found",
    daysAgo: 1,
    color: "#FDE8D8",
    text: "#C2622A",
  },
  {
    id: "10",
    name: "TI-84 Calculator",
    category: "Electronics",
    location: "Maths Block, R303",
    status: "lost",
    daysAgo: 3,
    color: "#EDE8FD",
    text: "#6B3EDE",
  },
  {
    id: "11",
    name: "Green Tote Bag",
    category: "Bags",
    location: "Cafeteria, Block A",
    status: "found",
    daysAgo: 7,
    color: "#D4F4DC",
    text: "#2E7D45",
  },
  {
    id: "12",
    name: "Reading Glasses (Black Frame)",
    category: "Accessories",
    location: "Library, 1F",
    status: "found",
    daysAgo: 2,
    color: "#C8DFFE",
    text: "#3B7FD4",
  },
];

const CATEGORIES = [
  "All",
  "Electronics",
  "Keys",
  "Accessories",
  "Documents",
  "Medical",
  "Bags",
];
const STATUSES = ["All", "Found", "Lost"];

const statusConfig = {
  found: { label: "Found", variant: "status-green" as const },
  lost: { label: "Lost", variant: "status-red" as const },
};

// ─── Card component ───────────────────────────────────────────────────────────

function ItemCard({
  item,
  layout,
}: {
  item: (typeof ITEMS)[0];
  layout: "grid" | "list";
}) {
  if (layout === "list") {
    return (
      <Link href={`/items/${item.id}`} className="block group">
        <div className="flex items-center gap-4 px-6 py-4 hover:bg-[#F7F4F0]/60 transition-colors cursor-pointer">
          {/* Icon */}
          <div
            className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform"
            style={{ background: item.color }}
          >
            <Package className="w-5 h-5" style={{ color: item.text }} />
          </div>
          {/* Info */}
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-[14px] text-[#111010] truncate group-hover:text-[#3B7FD4] transition-colors">
              {item.name}
            </p>
            <p className="text-[12px] text-black/35 font-medium flex items-center gap-1.5 mt-0.5">
              <MapPin className="w-3 h-3 shrink-0" />
              {item.location}
            </p>
          </div>
          {/* Meta */}
          <div className="flex items-center gap-3 shrink-0">
            <Badge
              variant={
                statusConfig[item.status as keyof typeof statusConfig].variant
              }
              size="sm"
              dot
            >
              {statusConfig[item.status as keyof typeof statusConfig].label}
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
        {/* Colour header */}
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
            <Badge
              variant={
                statusConfig[item.status as keyof typeof statusConfig].variant
              }
              size="sm"
              dot
            >
              {statusConfig[item.status as keyof typeof statusConfig].label}
            </Badge>
          </div>
        </div>
        {/* Body */}
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

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ItemsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");
  const [layout, setLayout] = useState<"grid" | "list">("grid");

  const filtered = ITEMS.filter((item) => {
    const matchSearch =
      !search ||
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.location.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "All" || item.category === category;
    const matchStatus =
      status === "All" || item.status === status.toLowerCase();
    return matchSearch && matchCat && matchStatus;
  });

  const hasFilters = search || category !== "All" || status !== "All";

  return (
    <div className="space-y-8">
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-black/30 mb-2">
            Directory
          </p>
          <h1 className="font-display text-[44px] md:text-[56px] italic text-[#111010] leading-[0.9]">
            Lost &amp; Found
            <br />
            <span className="not-italic text-black/25">items.</span>
          </h1>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <Button href="/report/lost" variant="outline" size="sm">
            Lost something?
          </Button>
          <Button
            href="/report/found"
            variant="primary"
            size="sm"
            className="btn-magnetic"
            icon={<Package className="w-3.5 h-3.5" />}
            iconPosition="left"
          >
            Report found
          </Button>
        </div>
      </div>

      {/* ── Search + filters bar ── */}
      <div className="bg-white/80 backdrop-blur-xl rounded-[24px] border border-black/6 shadow-sm p-4 space-y-4">
        {/* Search input */}
        <div className="flex items-center gap-3 bg-[#F7F4F0] rounded-2xl px-4 py-3 border border-black/5 focus-within:bg-white focus-within:border-[#7EB3F7]/40 focus-within:ring-4 focus-within:ring-[#7EB3F7]/5 transition-all">
          <Search className="w-4 h-4 text-black/30 shrink-0" />
          <input
            type="text"
            placeholder="Search by name, location, or category…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-[14px] text-[#111010] placeholder:text-black/30 outline-none"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="text-black/30 hover:text-black/60 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Filter row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          {/* Status pills */}
          <div className="flex items-center gap-1.5">
            <SlidersHorizontal className="w-3.5 h-3.5 text-black/30 shrink-0" />
            {STATUSES.map((s) => (
              <button
                key={s}
                onClick={() => setStatus(s)}
                className={`px-3 py-1 rounded-xl text-[12px] font-semibold transition-all ${
                  status === s
                    ? "bg-[#111010] text-white"
                    : "text-black/40 hover:text-black/70 hover:bg-black/5"
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="w-px h-5 bg-black/8 hidden sm:block" />

          {/* Category pills */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-3 py-1 rounded-xl text-[12px] font-semibold transition-all ${
                  category === c
                    ? "bg-[#7EB3F7]/20 text-[#3B7FD4] border border-[#7EB3F7]/30"
                    : "text-black/40 hover:text-black/70 hover:bg-black/5"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Layout toggle + result count */}
          <div className="flex items-center gap-2 sm:ml-auto">
            <span className="text-[12px] font-medium text-black/35">
              {filtered.length} item{filtered.length !== 1 ? "s" : ""}
            </span>
            <div className="flex items-center bg-[#F7F4F0] rounded-xl p-1 gap-0.5">
              <button
                onClick={() => setLayout("grid")}
                className={`p-1.5 rounded-lg transition-all ${layout === "grid" ? "bg-white shadow-sm text-[#111010]" : "text-black/30 hover:text-black/60"}`}
                aria-label="Grid view"
              >
                <Grid3X3 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setLayout("list")}
                className={`p-1.5 rounded-lg transition-all ${layout === "list" ? "bg-white shadow-sm text-[#111010]" : "text-black/30 hover:text-black/60"}`}
                aria-label="List view"
              >
                <List className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Active filter chips */}
        {hasFilters && (
          <div className="flex items-center gap-2 flex-wrap pt-1">
            <span className="text-[11px] font-bold text-black/30 uppercase tracking-wider">
              Active:
            </span>
            {search && (
              <button
                onClick={() => setSearch("")}
                className="flex items-center gap-1.5 px-2.5 py-1 bg-[#C8DFFE] text-[#3B7FD4] rounded-lg text-[11px] font-bold hover:bg-[#b3cfee] transition-colors"
              >
                &ldquo;{search}&rdquo; <X className="w-2.5 h-2.5" />
              </button>
            )}
            {category !== "All" && (
              <button
                onClick={() => setCategory("All")}
                className="flex items-center gap-1.5 px-2.5 py-1 bg-[#EDE8FD] text-[#6B3EDE] rounded-lg text-[11px] font-bold hover:bg-[#ddd6fb] transition-colors"
              >
                {category} <X className="w-2.5 h-2.5" />
              </button>
            )}
            {status !== "All" && (
              <button
                onClick={() => setStatus("All")}
                className="flex items-center gap-1.5 px-2.5 py-1 bg-[#FDE8D8] text-[#C2622A] rounded-lg text-[11px] font-bold hover:bg-[#f5d9c4] transition-colors"
              >
                {status} <X className="w-2.5 h-2.5" />
              </button>
            )}
            <button
              onClick={() => {
                setSearch("");
                setCategory("All");
                setStatus("All");
              }}
              className="text-[11px] font-bold text-black/30 hover:text-black/60 transition-colors underline-slide"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* ── Grid / List ── */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={<Package />}
          title="No items found"
          description="Try adjusting your search or filters to find what you're looking for."
          action={
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                setSearch("");
                setCategory("All");
                setStatus("All");
              }}
            >
              Clear filters
            </Button>
          }
        />
      ) : layout === "grid" ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((item) => (
            <ItemCard key={item.id} item={item} layout="grid" />
          ))}
        </div>
      ) : (
        <Card
          variant="default"
          padding="none"
          className="overflow-hidden divide-y divide-black/4"
        >
          {filtered.map((item) => (
            <ItemCard key={item.id} item={item} layout="list" />
          ))}
        </Card>
      )}
    </div>
  );
}
