"use client";

import { useEffect, useRef, useState } from "react";
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
  const ref = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const selectId = label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`} ref={ref}>
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
        id={selectId}
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={`
          flex items-center justify-between w-full border border-black/8 rounded-2xl bg-[#F7F4F0] px-4 py-3.5 text-left transition-all duration-200 hover:bg-[#F0EDE9] focus:outline-none focus:bg-white focus:border-[#7EB3F7]/50 focus:ring-4 focus:ring-[#7EB3F7]/15
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
          <span className="w-4 h-4 shrink-0 text-black/40 [&>svg]:w-full [&>svg]:h-full">
            {selected.icon}
          </span>
        )}
        <span
          className={`flex-1 truncate ${selected ? "text-[#111010]" : "text-black/25"}`}
        >
          {selected?.label ?? placeholder}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-black/30 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div
          role="listbox"
          className="absolute z-50 mt-1 w-full bg-white rounded-2xl border border-black/[0.07] shadow-[0_16px_48px_-8px_rgba(0,0,0,0.15)] py-1.5 overflow-auto max-h-64"
          style={{
            animation: "dropIn 0.18s cubic-bezier(0.23,1,0.32,1)",
            top: "100%",
            left: 0,
          }}
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
        @keyframes dropIn {
          from { opacity:0; transform:translateY(-6px) scale(0.97) }
          to   { opacity:1; transform:none }
        }
      `}</style>
    </div>
  );
}
