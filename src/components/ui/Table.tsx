"use client";

import { ReactNode, useState } from "react";
import { ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface TableColumn<T> {
  key: keyof T | string;
  header: string;
  render?: (row: T, index: number) => ReactNode;
  sortable?: boolean;
  width?: string;
  align?: "left" | "center" | "right";
}

interface TableProps<T extends { id?: string | number }> {
  columns: TableColumn<T>[];
  data: T[];
  /** Enables row checkboxes */
  selectable?: boolean;
  selectedIds?: Array<string | number>;
  onSelectionChange?: (ids: Array<string | number>) => void;
  /** Row click handler */
  onRowClick?: (row: T) => void;
  /** Sticky header — wrap table in a container with overflow-auto and a fixed height */
  stickyHeader?: boolean;
  emptyState?: ReactNode;
  loading?: boolean;
  className?: string;
}

type SortDir = "asc" | "desc" | null;

// ─── Table ────────────────────────────────────────────────────────────────────

export function Table<T extends { id?: string | number }>({
  columns,
  data,
  selectable = false,
  selectedIds = [],
  onSelectionChange,
  onRowClick,
  stickyHeader = false,
  emptyState,
  loading = false,
  className = "",
}: TableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>(null);

  const handleSort = (key: string) => {
    if (sortKey !== key) {
      setSortKey(key);
      setSortDir("asc");
      return;
    }
    if (sortDir === "asc") {
      setSortDir("desc");
      return;
    }
    setSortKey(null);
    setSortDir(null);
  };

  const sorted = [...data].sort((a, b) => {
    if (!sortKey || !sortDir) return 0;
    const av = (a as Record<string, unknown>)[sortKey];
    const bv = (b as Record<string, unknown>)[sortKey];
    if (av == null) return 1;
    if (bv == null) return -1;
    const cmp = String(av).localeCompare(String(bv), undefined, {
      numeric: true,
    });
    return sortDir === "asc" ? cmp : -cmp;
  });

  const getRowId = (row: T, i: number): string | number => row.id ?? i;
  const allSelected =
    data.length > 0 &&
    data.every((r, i) => selectedIds.includes(getRowId(r, i)));
  const someSelected =
    !allSelected && data.some((r, i) => selectedIds.includes(getRowId(r, i)));

  const toggleAll = () => {
    if (allSelected) onSelectionChange?.([]);
    else onSelectionChange?.(data.map((r, i) => getRowId(r, i)));
  };

  const toggleRow = (id: string | number) => {
    if (selectedIds.includes(id))
      onSelectionChange?.(selectedIds.filter((x) => x !== id));
    else onSelectionChange?.([...selectedIds, id]);
  };

  const alignClass = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  return (
    <div
      className={`rounded-2xl border border-black/6 overflow-hidden bg-white ${className}`}
    >
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className={stickyHeader ? "sticky top-0 z-10" : ""}>
            <tr className="bg-[#F7F4F0] border-b border-black/6">
              {selectable && (
                <th className="w-12 px-4 py-3">
                  <IndeterminateCheckbox
                    checked={allSelected}
                    indeterminate={someSelected}
                    onChange={toggleAll}
                  />
                </th>
              )}
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  className={`
                    px-4 py-3 text-[11px] font-bold text-black/40 uppercase tracking-widest
                    whitespace-nowrap ${alignClass[col.align ?? "left"]}
                    ${col.width ?? ""}
                    ${col.sortable ? "cursor-pointer select-none hover:text-black/60 transition-colors" : ""}
                  `}
                  onClick={
                    col.sortable ? () => handleSort(String(col.key)) : undefined
                  }
                >
                  <span className="inline-flex items-center gap-1.5">
                    {col.header}
                    {col.sortable && (
                      <SortIcon
                        active={sortKey === String(col.key)}
                        dir={sortDir}
                      />
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-black/4">
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <tr key={i}>
                  {selectable && (
                    <td className="px-4 py-4">
                      <div className="w-4 h-4 bg-black/5 rounded animate-pulse" />
                    </td>
                  )}
                  {columns.map((col) => (
                    <td key={String(col.key)} className="px-4 py-4">
                      <div
                        className="h-3 bg-black/5 rounded-full animate-pulse"
                        style={{ width: `${50 + Math.random() * 40}%` }}
                      />
                    </td>
                  ))}
                </tr>
              ))
            ) : sorted.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (selectable ? 1 : 0)}
                  className="py-16 text-center"
                >
                  {emptyState ?? (
                    <p className="text-[13px] font-medium text-black/30">
                      No results found
                    </p>
                  )}
                </td>
              </tr>
            ) : (
              sorted.map((row, i) => {
                const id = getRowId(row, i);
                const isSelected = selectedIds.includes(id);
                return (
                  <tr
                    key={id}
                    onClick={onRowClick ? () => onRowClick(row) : undefined}
                    className={`
                      transition-colors duration-100
                      ${onRowClick ? "cursor-pointer" : ""}
                      ${isSelected ? "bg-[#C8DFFE]/10" : "hover:bg-[#F7F4F0]/60"}
                    `}
                  >
                    {selectable && (
                      <td
                        className="px-4 py-3.5"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <IndeterminateCheckbox
                          checked={isSelected}
                          onChange={() => toggleRow(id)}
                        />
                      </td>
                    )}
                    {columns.map((col) => (
                      <td
                        key={String(col.key)}
                        className={`px-4 py-3.5 text-[13px] font-medium text-[#111010]/80 ${alignClass[col.align ?? "left"]}`}
                      >
                        {col.render
                          ? col.render(row, i)
                          : String(
                              (row as Record<string, unknown>)[
                                String(col.key)
                              ] ?? "—",
                            )}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function SortIcon({ active, dir }: { active: boolean; dir: SortDir }) {
  if (!active) return <ChevronsUpDown className="w-3 h-3 opacity-40" />;
  if (dir === "asc") return <ChevronUp className="w-3 h-3 text-[#111010]" />;
  return <ChevronDown className="w-3 h-3 text-[#111010]" />;
}

function IndeterminateCheckbox({
  checked,
  indeterminate = false,
  onChange,
}: {
  checked: boolean;
  indeterminate?: boolean;
  onChange: () => void;
}) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={indeterminate ? "mixed" : checked}
      onClick={onChange}
      className={`
        w-4 h-4 rounded-[4px] border-2 flex items-center justify-center transition-all shrink-0
        ${
          checked || indeterminate
            ? "bg-[#111010] border-[#111010]"
            : "bg-white border-black/15 hover:border-black/30"
        }
      `}
    >
      {indeterminate ? (
        <span className="w-2 h-0.5 bg-white rounded-full" />
      ) : checked ? (
        <ChevronUp
          className="w-2.5 h-2.5 text-white"
          style={{ transform: "scaleY(0.8) rotate(0deg)" }}
        >
          <path d="M4 11 9 6 14 11" />
        </ChevronUp>
      ) : null}
    </button>
  );
}
