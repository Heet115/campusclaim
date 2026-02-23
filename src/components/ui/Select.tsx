"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";

// ─── Select ───────────────────────────────────────────────────────────────────

export interface SelectOption {
  value: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

interface SelectProps {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  hint?: string;
  error?: string;
  disabled?: boolean;
  className?: string;
}

// ─── Dropdown position ────────────────────────────────────────────────────────
// We render the listbox with `position: fixed` so it escapes any parent with
// overflow:hidden / overflow:auto (e.g. scrollable cards, modals, panels).
// useLayoutEffect measures the trigger and re-positions on every open.

interface DropdownPos {
  top: number;
  left: number;
  width: number;
  /** true = opens upward */
  flip: boolean;
}

const DROPDOWN_MAX_H = 256; // px — keep in sync with max-h-64 below
const DROPDOWN_GAP = 6; // px gap between trigger and listbox

export function Select({
  options,
  value,
  onChange,
  placeholder = "Select an option…",
  label,
  hint,
  error,
  disabled = false,
  className = "",
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState<DropdownPos | null>(null);

  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.value === value);

  // ── Close on outside click or Escape ──────────────────────────────────────
  useEffect(() => {
    if (!open) return;
    const onMouse = (e: MouseEvent) => {
      if (
        triggerRef.current?.contains(e.target as Node) ||
        listRef.current?.contains(e.target as Node)
      )
        return;
      setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onMouse);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onMouse);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // ── Recalculate position whenever the dropdown opens ──────────────────────
  // useLayoutEffect runs synchronously before the browser paints, so the
  // listbox is never briefly at the wrong position.
  useLayoutEffect(() => {
    if (!open || !triggerRef.current) return;

    const measure = () => {
      const rect = triggerRef.current!.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      const flip =
        spaceBelow < DROPDOWN_MAX_H + DROPDOWN_GAP && spaceAbove > spaceBelow;

      setPos({
        top: flip ? rect.top - DROPDOWN_GAP : rect.bottom + DROPDOWN_GAP,
        left: rect.left,
        width: rect.width,
        flip,
      });
    };

    measure();

    // Re-measure while the page scrolls so the dropdown tracks the trigger
    window.addEventListener("scroll", measure, true);
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("scroll", measure, true);
      window.removeEventListener("resize", measure);
    };
  }, [open]);

  const selectId = label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      {label && (
        <label
          htmlFor={selectId}
          className="text-[13px] font-semibold text-[#111010]/70 select-none"
        >
          {label}
        </label>
      )}

      {/* Trigger */}
      <button
        ref={triggerRef}
        id={selectId}
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={`
          flex items-center justify-between w-full border rounded-2xl bg-[#F7F4F0]
          px-4 py-3.5 text-left transition-all duration-200
          hover:bg-[#F0EDE9] focus:outline-none focus:bg-white
          focus:border-[#7EB3F7]/50 focus:ring-4 focus:ring-[#7EB3F7]/15
          disabled:opacity-50 disabled:pointer-events-none
          ${
            open
              ? "bg-white border-[#7EB3F7] ring-4 ring-[#7EB3F7]/10"
              : error
                ? "border-red-300"
                : "border-black/8 hover:border-black/15"
          }
        `}
      >
        {selected?.icon && (
          <span className="w-4 h-4 shrink-0 text-black/40 [&>svg]:w-full [&>svg]:h-full mr-2">
            {selected.icon}
          </span>
        )}
        <span
          className={`flex-1 truncate text-[14px] ${selected ? "text-[#111010]" : "text-black/25"}`}
        >
          {selected?.label ?? placeholder}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-black/30 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/*
        Listbox rendered with position:fixed so it is never clipped by an
        overflow:hidden / overflow:auto ancestor (scrollable cards, modals…).
        Positioned by measuring the trigger's bounding rect in useLayoutEffect.
      */}
      {open && pos && (
        <div
          ref={listRef}
          role="listbox"
          style={{
            position: "fixed",
            top: pos.flip ? undefined : pos.top,
            bottom: pos.flip ? window.innerHeight - pos.top : undefined,
            left: pos.left,
            width: pos.width,
            zIndex: 9999,
            animation: "selectDropIn 0.15s cubic-bezier(0.23,1,0.32,1)",
            transformOrigin: pos.flip ? "bottom center" : "top center",
          }}
          className="bg-white rounded-2xl border border-black/[0.07] shadow-[0_16px_48px_-8px_rgba(0,0,0,0.18)] py-1.5 overflow-auto max-h-64"
        >
          {options.map((opt) => (
            <div
              key={opt.value}
              role="option"
              aria-selected={opt.value === value}
              aria-disabled={opt.disabled}
              onClick={() => {
                if (!opt.disabled) {
                  onChange?.(opt.value);
                  setOpen(false);
                }
              }}
              className={`
                flex items-center gap-2.5 px-3.5 py-2.5 cursor-pointer
                transition-colors text-[13px]
                ${opt.disabled ? "opacity-40 pointer-events-none" : "hover:bg-[#F7F4F0]"}
                ${opt.value === value ? "text-[#111010] font-semibold" : "text-[#111010]/70 font-medium"}
              `}
            >
              {opt.icon && (
                <span className="w-4 h-4 shrink-0 text-black/35 [&>svg]:w-full [&>svg]:h-full">
                  {opt.icon}
                </span>
              )}
              <div className="flex-1 min-w-0">
                <p className="truncate">{opt.label}</p>
                {opt.description && (
                  <p className="text-[11px] text-black/35 font-normal truncate">
                    {opt.description}
                  </p>
                )}
              </div>
              {opt.value === value && (
                <Check className="w-3.5 h-3.5 text-[#111010] shrink-0" />
              )}
            </div>
          ))}
        </div>
      )}

      {(hint || error) && (
        <p
          className={`text-[12px] font-medium ${error ? "text-red-500" : "text-black/35"}`}
        >
          {error ?? hint}
        </p>
      )}

      <style>{`
        @keyframes selectDropIn {
          from { opacity: 0; transform: translateY(-6px) scaleY(0.96); }
          to   { opacity: 1; transform: none; }
        }
      `}</style>
    </div>
  );
}
