"use client";

import { Search, SlidersHorizontal, Grid3X3, List, X } from "lucide-react";

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

export function SearchFilterBar({
  search,
  setSearch,
  category,
  setCategory,
  status,
  setStatus,
  layout,
  setLayout,
  resultCount,
}: {
  search: string;
  setSearch: (v: string) => void;
  category: string;
  setCategory: (v: string) => void;
  status: string;
  setStatus: (v: string) => void;
  layout: "grid" | "list";
  setLayout: (v: "grid" | "list") => void;
  resultCount: number;
}) {
  const hasFilters = search || category !== "All" || status !== "All";

  return (
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
        <div className="flex items-center gap-1.5">
          <SlidersHorizontal className="w-3.5 h-3.5 text-black/30 shrink-0" />
          {STATUSES.map((s) => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              className={`px-3 py-1 rounded-xl text-[12px] font-semibold transition-all ${status === s ? "bg-[#111010] text-white" : "text-black/40 hover:text-black/70 hover:bg-black/5"}`}
            >
              {s}
            </button>
          ))}
        </div>
        <div className="w-px h-5 bg-black/8 hidden sm:block" />
        <div className="flex items-center gap-1.5 flex-wrap">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-3 py-1 rounded-xl text-[12px] font-semibold transition-all ${category === c ? "bg-[#7EB3F7]/20 text-[#3B7FD4] border border-[#7EB3F7]/30" : "text-black/40 hover:text-black/70 hover:bg-black/5"}`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 sm:ml-auto">
          <span className="text-[12px] font-medium text-black/35">
            {resultCount} item{resultCount !== 1 ? "s" : ""}
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
  );
}
