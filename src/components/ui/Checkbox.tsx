"use client";

import { forwardRef, InputHTMLAttributes, useEffect, useRef } from "react";
import { Check, Minus } from "lucide-react";

// ─── Checkbox ─────────────────────────────────────────────────────────────────

interface CheckboxProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size" | "type"
> {
  label?: string;
  description?: string;
  /** Shows a dash instead of a checkmark — useful for "select all" */
  indeterminate?: boolean;
  size?: "sm" | "md" | "lg";
  error?: string;
}

const checkboxSizes = {
  sm: {
    box: "w-3.5 h-3.5 rounded-md",
    icon: "w-2.5 h-2.5",
    label: "text-[12px]",
    desc: "text-[11px]",
  },
  md: {
    box: "w-4.5 h-4.5 rounded-[6px]",
    icon: "w-3 h-3",
    label: "text-[13px]",
    desc: "text-[12px]",
  },
  lg: {
    box: "w-5 h-5 rounded-lg",
    icon: "w-3.5 h-3.5",
    label: "text-[14px]",
    desc: "text-[13px]",
  },
};

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      description,
      indeterminate = false,
      size = "md",
      error,
      className = "",
      id,
      disabled,
      ...props
    },
    ref,
  ) => {
    const innerRef = useRef<HTMLInputElement>(null);
    const resolvedRef = (ref as React.RefObject<HTMLInputElement>) ?? innerRef;
    const checkboxId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
    const { box, icon, label: labelSize, desc: descSize } = checkboxSizes[size];

    // Sync indeterminate DOM property (can't be set via HTML attribute)
    useEffect(() => {
      if (resolvedRef.current) {
        resolvedRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate, resolvedRef]);

    return (
      <div className={`flex flex-col gap-1 ${className}`}>
        <label
          htmlFor={checkboxId}
          className={`flex items-start gap-2.5 cursor-pointer select-none group ${disabled ? "opacity-50 pointer-events-none" : ""}`}
        >
          {/* Hidden native input */}
          <input
            ref={resolvedRef}
            id={checkboxId}
            type="checkbox"
            disabled={disabled}
            className="sr-only peer"
            {...props}
          />

          {/* Visual box */}
          <span
            className={`
              relative shrink-0 ${box} border-2 flex items-center justify-center
              transition-all duration-150
              border-black/15 bg-white
              peer-checked:bg-[#111010] peer-checked:border-[#111010]
              peer-indeterminate:bg-[#111010] peer-indeterminate:border-[#111010]
              peer-focus-visible:ring-4 peer-focus-visible:ring-[#7EB3F7]/20
              group-hover:border-black/30
              ${error ? "border-red-400 peer-checked:bg-red-500 peer-checked:border-red-500" : ""}
            `}
          >
            {indeterminate ? (
              <Minus className={`${icon} text-white`} strokeWidth={3} />
            ) : (
              <Check
                className={`${icon} text-white opacity-0 peer-checked:opacity-100 scale-75 peer-checked:scale-100 transition-all duration-150`}
                strokeWidth={3}
              />
            )}
          </span>

          {/* Label text */}
          {(label || description) && (
            <div className="pt-px space-y-0.5">
              {label && (
                <p
                  className={`font-semibold text-[#111010] leading-tight ${labelSize}`}
                >
                  {label}
                </p>
              )}
              {description && (
                <p
                  className={`text-black/40 font-medium leading-relaxed ${descSize}`}
                >
                  {description}
                </p>
              )}
            </div>
          )}
        </label>

        {error && (
          <p className="text-[12px] font-medium text-red-500 ml-7">{error}</p>
        )}
      </div>
    );
  },
);
Checkbox.displayName = "Checkbox";

// ─── CheckboxGroup ────────────────────────────────────────────────────────────

interface CheckboxOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

interface CheckboxGroupProps {
  options: CheckboxOption[];
  value: string[];
  onChange: (value: string[]) => void;
  label?: string;
  hint?: string;
  error?: string;
  size?: "sm" | "md" | "lg";
  /** Renders a "Select all" checkbox at the top */
  selectAll?: boolean;
  selectAllLabel?: string;
  /** Layout direction */
  direction?: "vertical" | "horizontal";
  className?: string;
}

export function CheckboxGroup({
  options,
  value,
  onChange,
  label,
  hint,
  error,
  size = "md",
  selectAll = false,
  selectAllLabel = "Select all",
  direction = "vertical",
  className = "",
}: CheckboxGroupProps) {
  const allChecked = options.every((o) => value.includes(o.value));
  const someChecked =
    options.some((o) => value.includes(o.value)) && !allChecked;

  const handleSelectAll = () => {
    if (allChecked) onChange([]);
    else onChange(options.filter((o) => !o.disabled).map((o) => o.value));
  };

  const handleToggle = (optValue: string) => {
    if (value.includes(optValue)) onChange(value.filter((v) => v !== optValue));
    else onChange([...value, optValue]);
  };

  return (
    <fieldset className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <legend className="text-[13px] font-semibold text-[#111010]/70 mb-1">
          {label}
        </legend>
      )}

      {selectAll && (
        <>
          <Checkbox
            label={selectAllLabel}
            size={size}
            checked={allChecked}
            indeterminate={someChecked}
            onChange={handleSelectAll}
          />
          <hr className="border-none h-px bg-black/6 my-1" />
        </>
      )}

      <div
        className={`flex gap-3 ${direction === "vertical" ? "flex-col" : "flex-row flex-wrap"}`}
      >
        {options.map((opt) => (
          <Checkbox
            key={opt.value}
            label={opt.label}
            description={opt.description}
            size={size}
            checked={value.includes(opt.value)}
            disabled={opt.disabled}
            onChange={() => handleToggle(opt.value)}
          />
        ))}
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
