"use client";

import { ReactNode } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface RadioOption {
  value: string;
  label: string;
  description?: string;
  icon?: ReactNode;
  badge?: string;
  disabled?: boolean;
}

interface RadioGroupProps {
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
  hint?: string;
  error?: string;
  /** "default" = pill row, "card" = bordered card tiles, "list" = full-width stacked */
  variant?: "default" | "card" | "list";
  direction?: "horizontal" | "vertical";
  size?: "sm" | "md" | "lg";
  className?: string;
}

// ─── RadioGroup ───────────────────────────────────────────────────────────────

export function RadioGroup({
  options,
  value,
  onChange,
  label,
  hint,
  error,
  variant = "default",
  direction = "horizontal",
  size = "md",
  className = "",
}: RadioGroupProps) {
  return (
    <fieldset className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <legend className="text-[13px] font-semibold text-[#111010]/70 mb-1">
          {label}
        </legend>
      )}

      <div
        className={`flex gap-2.5 ${
          variant === "card" || direction === "vertical"
            ? "flex-col"
            : "flex-row flex-wrap"
        }`}
      >
        {options.map((opt) => {
          const isSelected = opt.value === value;

          if (variant === "card") {
            return (
              <CardRadio
                key={opt.value}
                option={opt}
                selected={isSelected}
                size={size}
                onSelect={() => !opt.disabled && onChange?.(opt.value)}
              />
            );
          }

          if (variant === "list") {
            return (
              <ListRadio
                key={opt.value}
                option={opt}
                selected={isSelected}
                size={size}
                onSelect={() => !opt.disabled && onChange?.(opt.value)}
              />
            );
          }

          // default: pill
          return (
            <PillRadio
              key={opt.value}
              option={opt}
              selected={isSelected}
              size={size}
              onSelect={() => !opt.disabled && onChange?.(opt.value)}
            />
          );
        })}
      </div>

      {(hint || error) && (
        <p
          className={`text-[12px] font-medium ${error ? "text-red-500" : "text-black/35"}`}
        >
          {error ?? hint}
        </p>
      )}
    </fieldset>
  );
}

// ─── Pill variant ─────────────────────────────────────────────────────────────

function PillRadio({
  option,
  selected,
  size,
  onSelect,
}: {
  option: RadioOption;
  selected: boolean;
  size: string;
  onSelect: () => void;
}) {
  const sizes: Record<string, string> = {
    sm: "px-3 py-1.5 text-[12px]",
    md: "px-4 py-2 text-[13px]",
    lg: "px-5 py-2.5 text-[14px]",
  };

  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      disabled={option.disabled}
      onClick={onSelect}
      className={`
        ${sizes[size]} rounded-xl font-semibold transition-all duration-200
        flex items-center gap-2 border
        ${
          selected
            ? "bg-[#111010] text-white border-transparent shadow-sm"
            : "bg-[#F7F4F0] text-black/50 border-transparent hover:bg-[#F0EDE9] hover:text-black/70"
        }
        disabled:opacity-40 disabled:pointer-events-none
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7EB3F7]
      `}
    >
      {option.icon && (
        <span className="w-4 h-4 [&>svg]:w-full [&>svg]:h-full">
          {option.icon}
        </span>
      )}
      {option.label}
    </button>
  );
}

// ─── Card variant ─────────────────────────────────────────────────────────────

function CardRadio({
  option,
  selected,
  onSelect,
}: {
  option: RadioOption;
  selected: boolean;
  size: string;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      disabled={option.disabled}
      onClick={onSelect}
      className={`
        w-full flex items-start gap-4 p-4 rounded-2xl border-2 text-left
        transition-all duration-200 cursor-pointer group
        ${
          selected
            ? "border-[#111010] bg-white shadow-sm"
            : "border-black/8 bg-[#F7F4F0] hover:border-black/20 hover:bg-white"
        }
        disabled:opacity-40 disabled:pointer-events-none
        focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#7EB3F7]/20
      `}
    >
      {/* Radio dot */}
      <span
        className={`
          mt-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0
          transition-all duration-150
          ${selected ? "border-[#111010]" : "border-black/20 group-hover:border-black/40"}
        `}
      >
        {selected && <span className="w-2 h-2 rounded-full bg-[#111010]" />}
      </span>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          {option.icon && (
            <span className="w-4 h-4 text-black/40 [&>svg]:w-full [&>svg]:h-full">
              {option.icon}
            </span>
          )}
          <span
            className={`text-[14px] font-semibold leading-tight ${selected ? "text-[#111010]" : "text-black/60"}`}
          >
            {option.label}
          </span>
          {option.badge && (
            <span className="px-2 py-0.5 bg-[#C8DFFE] text-[#3B7FD4] text-[10px] font-bold rounded-full">
              {option.badge}
            </span>
          )}
        </div>
        {option.description && (
          <p className="text-[12px] text-black/40 font-medium mt-1 leading-relaxed">
            {option.description}
          </p>
        )}
      </div>
    </button>
  );
}

// ─── List variant ─────────────────────────────────────────────────────────────

function ListRadio({
  option,
  selected,
  onSelect,
}: {
  option: RadioOption;
  selected: boolean;
  size: string;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      disabled={option.disabled}
      onClick={onSelect}
      className={`
        w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left
        transition-all duration-150 cursor-pointer
        ${selected ? "bg-[#F7F4F0]" : "hover:bg-[#F7F4F0]/60"}
        disabled:opacity-40 disabled:pointer-events-none
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7EB3F7]
      `}
    >
      <span
        className={`
          w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0
          transition-all ${selected ? "border-[#111010]" : "border-black/20"}
        `}
      >
        {selected && <span className="w-2 h-2 rounded-full bg-[#111010]" />}
      </span>
      {option.icon && (
        <span className="w-4 h-4 text-black/35 [&>svg]:w-full [&>svg]:h-full">
          {option.icon}
        </span>
      )}
      <div className="flex-1 min-w-0">
        <p
          className={`text-[13px] font-semibold ${selected ? "text-[#111010]" : "text-black/60"}`}
        >
          {option.label}
        </p>
        {option.description && (
          <p className="text-[11px] text-black/35 font-medium">
            {option.description}
          </p>
        )}
      </div>
      {option.badge && (
        <span className="text-[11px] font-bold text-black/30">
          {option.badge}
        </span>
      )}
    </button>
  );
}