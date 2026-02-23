"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

// ─── Tooltip ──────────────────────────────────────────────────────────────────

interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  delay?: number;
  className?: string;
}

export function Tooltip({
  content,
  children,
  side = "top",
  delay = 400,
  className = "",
}: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const show = () => {
    timerRef.current = setTimeout(() => setVisible(true), delay);
  };
  const hide = () => {
    clearTimeout(timerRef.current);
    setVisible(false);
  };
  useEffect(() => () => clearTimeout(timerRef.current), []);

  const sideStyles = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  const arrowStyles = {
    top: "top-full left-1/2 -translate-x-1/2 border-t-[#111010]  border-t-4 border-x-4 border-x-transparent border-b-0",
    bottom:
      "bottom-full left-1/2 -translate-x-1/2 border-b-[#111010] border-b-4 border-x-4 border-x-transparent border-t-0",
    left: "left-full top-1/2 -translate-y-1/2 border-l-[#111010]  border-l-4 border-y-4 border-y-transparent border-r-0",
    right:
      "right-full top-1/2 -translate-y-1/2 border-r-[#111010] border-r-4 border-y-4 border-y-transparent border-l-0",
  };

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {children}

      {visible && (
        <div
          role="tooltip"
          className={`
            absolute ${sideStyles[side]} z-50 pointer-events-none
            whitespace-nowrap
            ${className}
          `}
          style={{ animation: "tooltipIn 0.12s ease-out" }}
        >
          <div className="bg-[#111010] text-white text-[12px] font-semibold px-2.5 py-1.5 rounded-xl shadow-lg">
            {content}
          </div>
          <span
            className={`absolute w-0 h-0 border-solid ${arrowStyles[side]}`}
          />
        </div>
      )}
      <style>{`@keyframes tooltipIn { from { opacity:0; transform:scale(0.92) } to { opacity:1; transform:scale(1) } }`}</style>
    </div>
  );
}

// ─── Popover ──────────────────────────────────────────────────────────────────

interface PopoverProps {
  trigger: ReactNode;
  children: ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
  width?: string;
  /** "click" opens on click, "hover" opens on hover */
  openOn?: "click" | "hover";
  className?: string;
}

export function Popover({
  trigger,
  children,
  side = "bottom",
  align = "start",
  width = "w-64",
  openOn = "click",
  className = "",
}: PopoverProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const sidePos = {
    top: "bottom-full mb-2",
    bottom: "top-full mt-2",
    left: "right-full mr-2 top-0",
    right: "left-full ml-2 top-0",
  };

  const alignPos = {
    start: "left-0",
    center: "left-1/2 -translate-x-1/2",
    end: "right-0",
  };

  const hoverProps =
    openOn === "hover"
      ? {
          onMouseEnter: () => setOpen(true),
          onMouseLeave: () => setOpen(false),
        }
      : {};

  return (
    <div
      ref={ref}
      className={`relative inline-block ${className}`}
      {...hoverProps}
    >
      <div onClick={openOn === "click" ? () => setOpen((v) => !v) : undefined}>
        {trigger}
      </div>

      {open && (
        <div
          className={`
            absolute z-50 ${sidePos[side]} ${alignPos[align]} ${width}
            bg-white rounded-2xl border border-black/[0.07]
            shadow-[0_16px_48px_-8px_rgba(0,0,0,0.15),0_0_0_1px_rgba(0,0,0,0.04)]
            overflow-hidden
          `}
          style={{ animation: "popIn 0.18s cubic-bezier(0.23,1,0.32,1)" }}
        >
          {children}
        </div>
      )}
      <style>{`@keyframes popIn { from { opacity:0; transform:scale(0.95) translateY(-4px) } to { opacity:1; transform:none } }`}</style>
    </div>
  );
}

export function PopoverHeader({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="px-4 py-3.5 border-b border-black/6">
      <p className="text-[14px] font-bold text-[#111010]">{title}</p>
      {description && (
        <p className="text-[12px] text-black/40 font-medium mt-0.5">
          {description}
        </p>
      )}
    </div>
  );
}

export function PopoverBody({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`p-4 ${className}`}>{children}</div>;
}

export function PopoverFooter({ children }: { children: ReactNode }) {
  return (
    <div className="px-4 py-3 border-t border-black/6 bg-[#F7F4F0]/50 flex items-center justify-end gap-2">
      {children}
    </div>
  );
}
