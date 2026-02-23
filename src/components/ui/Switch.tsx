"use client";

import { forwardRef, InputHTMLAttributes } from "react";

interface SwitchProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size" | "type"
> {
  label?: string;
  description?: string;
  size?: "sm" | "md" | "lg";
  labelPosition?: "left" | "right";
}

const sizeStyles = {
  sm: {
    track: "w-8 h-4",
    thumb: "w-3 h-3",
    translate: "translate-x-4",
  },
  md: {
    track: "w-11 h-6",
    thumb: "w-5 h-5",
    translate: "translate-x-5",
  },
  lg: {
    track: "w-14 h-7",
    thumb: "w-6 h-6",
    translate: "translate-x-7",
  },
};

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      label,
      description,
      size = "md",
      labelPosition = "right",
      className = "",
      id,
      ...props
    },
    ref,
  ) => {
    const switchId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
    const { track, thumb, translate } = sizeStyles[size];

    const track_ = (
      <div className="relative shrink-0">
        <input
          ref={ref}
          id={switchId}
          type="checkbox"
          role="switch"
          className="sr-only peer"
          {...props}
        />
        <label
          htmlFor={switchId}
          className={`
            ${track} flex items-center rounded-full cursor-pointer
            bg-black/10 border border-black/8
            peer-checked:bg-[#111010] peer-checked:border-transparent
            peer-focus-visible:ring-4 peer-focus-visible:ring-[#7EB3F7]/20
            peer-disabled:opacity-40 peer-disabled:cursor-not-allowed
            transition-all duration-200
          `}
        >
          <span
            className={`
              ${thumb} rounded-full bg-white shadow-sm border border-black/8
              translate-x-0.5
              peer-checked:${translate}
              transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]
            `}
          />
        </label>
      </div>
    );

    if (!label) return track_;

    return (
      <div
        className={`flex items-start gap-3 ${labelPosition === "left" ? "flex-row-reverse justify-end" : "flex-row"} ${className}`}
      >
        {track_}
        <div className="space-y-0.5">
          <p
            className="text-[14px] font-semibold text-[#111010] leading-tight select-none cursor-pointer"
            onClick={() => document.getElementById(switchId ?? "")?.click()}
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
