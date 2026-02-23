"use client";

import { forwardRef, InputHTMLAttributes, useCallback, useState } from "react";

interface SwitchProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size" | "type"
> {
  label?: string;
  description?: string;
  size?: "sm" | "md" | "lg";
  labelPosition?: "left" | "right";
}

// ─── Switch ───────────────────────────────────────────────────────────────────

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      label,
      description,
      size = "md",
      labelPosition = "right",
      className = "",
      id,
      checked, // controlled
      defaultChecked, // uncontrolled
      onChange,
      disabled,
      ...props
    },
    ref,
  ) => {
    // Internal state drives the visual — works for both controlled & uncontrolled.
    const [internalChecked, setInternalChecked] = useState(
      defaultChecked ?? false,
    );

    // isChecked is the single source of truth for visuals.
    const isChecked = checked !== undefined ? checked : internalChecked;

    // Toggle handler — called on track click or label text click.
    const toggle = useCallback(() => {
      if (disabled) return;

      const next = !isChecked;

      // Update internal state (for uncontrolled mode).
      if (checked === undefined) {
        setInternalChecked(next);
      }

      // Fire onChange with a minimal synthetic event so callers that do
      //   onChange={() => setState(v => !v)}         (ignoring event)
      //   onChange={(e) => setState(e.target.checked)}  (reading event)
      // both work correctly.
      if (onChange) {
        const syntheticEvent = {
          target: { checked: next },
          currentTarget: { checked: next },
          bubbles: true,
          cancelable: true,
          defaultPrevented: false,
          isTrusted: false,
          nativeEvent: new Event("change"),
          preventDefault: () => {},
          stopPropagation: () => {},
          persist: () => {},
          type: "change",
        } as unknown as React.ChangeEvent<HTMLInputElement>;
        (onChange as React.ChangeEventHandler<HTMLInputElement>)(
          syntheticEvent,
        );
      }
    }, [isChecked, checked, disabled, onChange]);

    const switchId =
      id ??
      (label
        ? `switch-${label.toLowerCase().replace(/\s+/g, "-")}`
        : undefined);

    // ── Size-specific static class literals (Tailwind needs these verbatim) ──
    const trackSize =
      size === "sm" ? "w-8 h-4" : size === "lg" ? "w-14 h-7" : "w-11 h-6";
    const thumbSize =
      size === "sm" ? "w-3 h-3" : size === "lg" ? "w-6 h-6" : "w-5 h-5";
    // All translate values must be literally present so Tailwind emits them.
    const thumbTranslate = isChecked
      ? size === "sm"
        ? "translate-x-4"
        : size === "lg"
          ? "translate-x-7"
          : "translate-x-5"
      : "translate-x-0.5";
    const trackBg = isChecked
      ? "bg-[#111010] border-transparent"
      : "bg-black/10 border-black/8";

    // ── Visual track (button so clicking always works, regardless of id) ──────
    const track_ = (
      <div className="relative shrink-0">
        {/* Hidden input for form values + forwarded ref */}
        <input
          ref={ref}
          id={switchId}
          type="checkbox"
          role="switch"
          readOnly
          checked={isChecked}
          disabled={disabled}
          aria-checked={isChecked}
          className="sr-only"
          {...props}
        />

        {/*
          Visual track as a <button> — onClick always fires regardless of
          whether switchId is set. This avoids the htmlFor gotcha.
        */}
        <button
          type="button"
          role="switch"
          aria-checked={isChecked}
          disabled={disabled}
          tabIndex={0}
          onClick={toggle}
          className={`
            ${trackSize} flex items-center rounded-full border cursor-pointer
            transition-all duration-200 outline-none
            focus-visible:ring-4 focus-visible:ring-[#7EB3F7]/25
            disabled:opacity-40 disabled:cursor-not-allowed
            ${trackBg}
          `}
        >
          <span
            className={`
              ${thumbSize} rounded-full bg-white shadow-sm border border-black/8
              transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]
              ${thumbTranslate}
            `}
          />
        </button>
      </div>
    );

    if (!label) return track_;

    return (
      <div
        className={`flex items-start gap-3 ${
          labelPosition === "left" ? "flex-row-reverse justify-end" : "flex-row"
        } ${className}`}
      >
        {track_}
        <div className="space-y-0.5">
          {/* Clicking the label text also toggles */}
          <p
            role="button"
            tabIndex={-1}
            onClick={toggle}
            className="text-[14px] font-semibold text-[#111010] leading-tight select-none cursor-pointer"
          >
            {label}
          </p>
          {description && (
            <p className="text-[12px] text-black/40 font-medium leading-relaxed">
              {description}
            </p>
          )}
        </div>
      </div>
    );
  },
);
Switch.displayName = "Switch";
