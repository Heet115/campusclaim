"use client";

import { useState } from "react";
import { Package } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { ItemCard, SearchFilterBar } from "@/components/items";

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

  return (
    <div className="space-y-8">
      {/* Header */}
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

      <SearchFilterBar
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        status={status}
        setStatus={setStatus}
        layout={layout}
        setLayout={setLayout}
        resultCount={filtered.length}
      />

      {/* Grid / List */}
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
