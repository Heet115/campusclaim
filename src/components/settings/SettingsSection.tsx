"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Switch } from "@/components/ui/Switch";
import { Select } from "@/components/ui/Select";

// ─── Section wrapper ──────────────────────────────────────────────────────────

export function SettingsSection({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <Card variant="default" padding="none" className="overflow-hidden">
      <div className="px-7 py-5 border-b border-black/5 bg-[#F7F4F0]/40">
        <h2 className="text-[15px] font-bold text-[#111010]">{title}</h2>
        {description && (
          <p className="text-[13px] font-medium text-black/40 mt-0.5">
            {description}
          </p>
        )}
      </div>
      <div className="divide-y divide-black/4">{children}</div>
    </Card>
  );
}

// ─── Switch row ───────────────────────────────────────────────────────────────

export function SwitchRow({
  label,
  description,
  defaultChecked = false,
}: {
  label: string;
  description?: string;
  defaultChecked?: boolean;
}) {
  const [checked, setChecked] = useState(defaultChecked);
  return (
    <div className="flex items-center justify-between gap-6 px-7 py-5">
      <div className="space-y-0.5 min-w-0">
        <p className="text-[14px] font-semibold text-[#111010]">{label}</p>
        {description && (
          <p className="text-[12px] font-medium text-black/40 leading-snug">
            {description}
          </p>
        )}
      </div>
      <Switch
        checked={checked}
        onChange={() => setChecked((v) => !v)}
        size="md"
        className="shrink-0"
      />
    </div>
  );
}

// ─── Select row ───────────────────────────────────────────────────────────────

export function SelectRow({
  label,
  description,
  options,
  defaultValue,
}: {
  label: string;
  description?: string;
  options: { value: string; label: string }[];
  defaultValue: string;
}) {
  const [value, setValue] = useState(defaultValue);
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4 px-7 py-5">
      <div className="flex-1 space-y-0.5 min-w-0">
        <p className="text-[14px] font-semibold text-[#111010]">{label}</p>
        {description && (
          <p className="text-[12px] font-medium text-black/40 leading-snug">
            {description}
          </p>
        )}
      </div>
      <div className="w-full sm:w-48 shrink-0">
        <Select options={options} value={value} onChange={setValue} />
      </div>
    </div>
  );
}
