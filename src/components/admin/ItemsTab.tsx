"use client";

import { useState } from "react";
import { Search, Package, MapPin, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Table, type TableColumn } from "@/components/ui/Table";
import { ActionMenu } from "./KpiCard";
import { ADMIN_ITEMS } from "@/lib/mock-data";
import { ITEM_STATUS_CONFIG } from "@/lib/constants";
import type { AdminItem } from "@/lib/types";

export function ItemsTab() {
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState<(string | number)[]>([]);

  const filtered = ADMIN_ITEMS.filter(
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
        <Badge variant={ITEM_STATUS_CONFIG[row.status].variant} size="sm" dot>
          {ITEM_STATUS_CONFIG[row.status].label}
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
