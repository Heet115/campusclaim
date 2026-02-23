"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Check, ChevronRight } from "lucide-react";

// ─── Context ──────────────────────────────────────────────────────────────────

interface DropdownContextValue {
  open: boolean;
  close: () => void;
}

const DropdownContext = createContext<DropdownContextValue>({
  open: false,
  close: () => {},
});

// ─── Root ─────────────────────────────────────────────────────────────────────

interface DropdownProps {
  children: ReactNode;
  align?: "left" | "right";
}

export function Dropdown({ children, align = "left" }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  return (
    <DropdownContext.Provider value={{ open, close: () => setOpen(false) }}>
      <div ref={ref} className="relative inline-block">
        {/* Trigger: first child; wraps with click handler */}
        <div onClick={() => setOpen((v) => !v)}>
          {Array.isArray(children) ? children[0] : null}
        </div>

        {/* Content: second child, conditionally rendered */}
        {open && (
          <div
            className={`
              absolute z-50 top-[calc(100%+8px)] ${align === "right" ? "right-0" : "left-0"}
              min-w-[200px] bg-white rounded-2xl border border-black/[0.07]
              shadow-[0_16px_48px_-8px_rgba(0,0,0,0.15),0_0_0_1px_rgba(0,0,0,0.04)]
              py-1.5 overflow-hidden
            `}
            style={{ animation: "dropIn 0.18s cubic-bezier(0.23,1,0.32,1)" }}
          >
            {Array.isArray(children) ? children.slice(1) : children}
          </div>
        )}
      </div>
      <style>{`
        @keyframes dropIn {
          from { opacity:0; transform:translateY(-6px) scale(0.97) }
          to   { opacity:1; transform:none }
        }
      `}</style>
    </DropdownContext.Provider>
  );
}

// ─── Item ─────────────────────────────────────────────────────────────────────

interface DropdownItemProps {
  children: ReactNode;
  icon?: ReactNode;
  checked?: boolean;
  shortcut?: string;
  disabled?: boolean;
  destructive?: boolean;
  onClick?: () => void;
}

export function DropdownItem({
  children,
  icon,
  checked,
  shortcut,
  disabled = false,
  destructive = false,
  onClick,
}: DropdownItemProps) {
  const { close } = useContext(DropdownContext);

  return (
    <button
      disabled={disabled}
      onClick={() => {
        onClick?.();
        close();
      }}
      className={`
        w-full flex items-center gap-2.5 px-3.5 py-2 text-[13px] font-medium
        transition-colors cursor-pointer
        ${
          destructive
            ? "text-red-600 hover:bg-red-50 focus-visible:bg-red-50"
            : "text-[#111010]/80 hover:bg-[#F7F4F0] focus-visible:bg-[#F7F4F0]"
        }
        disabled:opacity-40 disabled:pointer-events-none
        outline-none focus-visible:outline-none
      `}
    >
      {checked !== undefined && (
        <span className="w-4 h-4 flex items-center justify-center shrink-0">
          {checked && <Check className="w-3.5 h-3.5" />}
        </span>
      )}
      {icon && !checked && (
        <span className="w-4 h-4 flex items-center justify-center shrink-0 text-black/35 [&>svg]:w-4 [&>svg]:h-4">
          {icon}
        </span>
      )}
      <span className="flex-1 text-left">{children}</span>
      {shortcut && (
        <span className="text-[11px] text-black/25 font-normal tracking-wide">
          {shortcut}
        </span>
      )}
    </button>
  );
}

// ─── Label ────────────────────────────────────────────────────────────────────

export function DropdownLabel({ children }: { children: ReactNode }) {
  return (
    <div className="px-3.5 py-1.5 text-[11px] font-bold text-black/30 uppercase tracking-widest select-none">
      {children}
    </div>
  );
}

// ─── Separator ────────────────────────────────────────────────────────────────

export function DropdownSeparator() {
  return <hr className="my-1.5 border-none h-px bg-black/5" />;
}

// ─── Sub-menu (basic) ─────────────────────────────────────────────────────────

interface DropdownSubProps {
  label: string;
  icon?: ReactNode;
  children: ReactNode;
}

export function DropdownSub({ label, icon, children }: DropdownSubProps) {
  const [hover, setHover] = useState(false);
  return (
    <div
      className="relative"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-black/5 transition-colors text-left text-[#111010]/80 cursor-pointer">
        {icon && (
          <span className="w-4 h-4 flex items-center justify-center shrink-0 text-black/35 [&>svg]:w-4 [&>svg]:h-4">
            {icon}
          </span>
        )}
        <span className="flex-1">{label}</span>
        <ChevronRight className="w-3.5 h-3.5 text-black/25" />
      </div>
      {hover && (
        <div className="absolute left-full top-0 ml-1 min-w-[180px] bg-white rounded-2xl border border-black/[0.07] shadow-[0_16px_48px_-8px_rgba(0,0,0,0.15)] py-1.5 overflow-hidden z-50">
          {children}
        </div>
      )}
    </div>
  );
}
