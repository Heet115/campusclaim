"use client";

import { createContext, ReactNode, useContext, useState } from "react";

// ─── Context ──────────────────────────────────────────────────────────────────

interface TabsContextValue {
  active: string;
  setActive: (id: string) => void;
  variant: "pill" | "underline" | "card";
}

const TabsContext = createContext<TabsContextValue>({
  active: "",
  setActive: () => {},
  variant: "pill",
});

// ─── Root ─────────────────────────────────────────────────────────────────────

interface TabsProps {
  defaultValue: string;
  children: ReactNode;
  variant?: "pill" | "underline" | "card";
  className?: string;
}

export function Tabs({
  defaultValue,
  children,
  variant = "pill",
  className = "",
}: TabsProps) {
  const [active, setActive] = useState(defaultValue);
  return (
    <TabsContext.Provider value={{ active, setActive, variant }}>
      <div className={`flex flex-col gap-5 ${className}`}>{children}</div>
    </TabsContext.Provider>
  );
}

// ─── List ─────────────────────────────────────────────────────────────────────

interface TabsListProps {
  children: ReactNode;
  className?: string;
}

export function TabsList({ children, className = "" }: TabsListProps) {
  const { variant } = useContext(TabsContext);

  const listStyles = {
    pill: "inline-flex p-1 bg-[#F7F4F0] rounded-2xl border border-black/5 gap-0.5",
    underline: "flex border-b border-black/8 gap-1",
    card: "flex gap-2",
  };

  return (
    <div role="tablist" className={`${listStyles[variant]} ${className}`}>
      {children}
    </div>
  );
}

// ─── Trigger ──────────────────────────────────────────────────────────────────

interface TabsTriggerProps {
  value: string;
  children: ReactNode;
  icon?: ReactNode;
  badge?: string | number;
  className?: string;
}

export function TabsTrigger({
  value,
  children,
  icon,
  badge,
  className = "",
}: TabsTriggerProps) {
  const { active, setActive, variant } = useContext(TabsContext);
  const isActive = active === value;

  const baseStyles =
    "flex items-center gap-2 font-semibold transition-all duration-200 cursor-pointer select-none outline-none focus-visible:ring-2 focus-visible:ring-[#7EB3F7]";

  const variantStyles = {
    pill: isActive
      ? "px-4 py-2 text-[13px] bg-white text-[#111010] rounded-xl shadow-sm border border-black/6"
      : "px-4 py-2 text-[13px] text-black/40 hover:text-black/70 rounded-xl",
    underline: isActive
      ? "px-3 py-2.5 text-[13px] text-[#111010] border-b-2 border-[#111010] -mb-px"
      : "px-3 py-2.5 text-[13px] text-black/40 hover:text-black/70 border-b-2 border-transparent -mb-px",
    card: isActive
      ? "px-4 py-2.5 text-[13px] bg-[#111010] text-white rounded-2xl shadow-sm"
      : "px-4 py-2.5 text-[13px] text-black/50 bg-[#F7F4F0] hover:bg-[#F0EDE9] rounded-2xl",
  };

  return (
    <button
      role="tab"
      aria-selected={isActive}
      onClick={() => setActive(value)}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {icon && <span className="w-4 h-4">{icon}</span>}
      {children}
      {badge !== undefined && (
        <span
          className={`text-[10px] font-bold rounded-full px-1.5 py-0.5 min-w-[18px] text-center ${
            isActive
              ? variant === "card"
                ? "bg-white/20 text-white"
                : "bg-[#7EB3F7]/20 text-[#3B7FD4]"
              : "bg-black/6 text-black/40"
          }`}
        >
          {badge}
        </span>
      )}
    </button>
  );
}

// ─── Content ──────────────────────────────────────────────────────────────────

interface TabsContentProps {
  value: string;
  children: ReactNode;
  className?: string;
}

export function TabsContent({
  value,
  children,
  className = "",
}: TabsContentProps) {
  const { active } = useContext(TabsContext);
  if (active !== value) return null;
  return (
    <div
      role="tabpanel"
      className={`animate-fade-in ${className}`}
      style={{ animation: "fadeIn 0.2s ease-out" }}
    >
      <style>{`@keyframes fadeIn { from { opacity:0; transform:translateY(4px) } to { opacity:1; transform:none } }`}</style>
      {children}
    </div>
  );
}
