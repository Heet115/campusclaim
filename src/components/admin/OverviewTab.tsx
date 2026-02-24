"use client";

import {
  Package,
  FileText,
  Users,
  ShieldCheck,
  TrendingUp,
  AlertCircle,
  ArrowRight,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Timeline } from "@/components/ui/Timeline";
import { KpiCard } from "./KpiCard";
import {
  ADMIN_ITEMS,
  ADMIN_CLAIMS,
  ADMIN_USERS,
  ADMIN_ACTIVITY,
} from "@/lib/mock-data";

export function OverviewTab() {
  const kpis = [
    {
      label: "Total items",
      value: ADMIN_ITEMS.length,
      sub: "+3 this week",
      color: "#C8DFFE",
      text: "#3B7FD4",
      icon: <Package className="w-5 h-5" />,
    },
    {
      label: "Open claims",
      value: ADMIN_CLAIMS.filter((c) => c.status === "pending").length,
      sub: "Needs review",
      color: "#FDE8D8",
      text: "#C2622A",
      icon: <FileText className="w-5 h-5" />,
    },
    {
      label: "Registered users",
      value: ADMIN_USERS.length,
      sub: "+1 today",
      color: "#D4F4DC",
      text: "#2E7D45",
      icon: <Users className="w-5 h-5" />,
    },
    {
      label: "Resolved cases",
      value: ADMIN_ITEMS.filter((i) => i.status === "resolved").length,
      sub: "All time",
      color: "#EDE8FD",
      text: "#6B3EDE",
      icon: <ShieldCheck className="w-5 h-5" />,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((k, i) => (
          <KpiCard key={i} {...k} />
        ))}
      </div>

      <div className="grid lg:grid-cols-[1fr_360px] gap-6">
        {/* Recovery rate card */}
        <Card variant="default" padding="none" className="p-6 space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-black/30">
                Recovery rate
              </p>
              <p className="font-display text-[36px] italic text-[#111010] leading-tight">
                67%
              </p>
            </div>
            <div className="flex items-center gap-1.5 bg-[#D4F4DC] px-3 py-1.5 rounded-xl">
              <TrendingUp className="w-3.5 h-3.5 text-[#2E7D45]" />
              <span className="text-[12px] font-bold text-[#2E7D45]">
                +4% this month
              </span>
            </div>
          </div>
          <div className="space-y-3">
            {[
              { label: "Found → Resolved", value: 67, color: "#A8E6C2" },
              { label: "Lost → Matched", value: 48, color: "#7EB3F7" },
              { label: "Claims approved", value: 72, color: "#C8DFFE" },
              { label: "Avg. response", value: 85, color: "#EDE8FD" },
            ].map((bar) => (
              <div key={bar.label} className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[12px] font-semibold text-black/50">
                    {bar.label}
                  </span>
                  <span className="text-[12px] font-bold text-[#111010]">
                    {bar.value}%
                  </span>
                </div>
                <div className="h-2 bg-black/5 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${bar.value}%`, background: bar.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Activity feed */}
        <Card variant="default" padding="none" className="p-6 space-y-5">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-bold uppercase tracking-widest text-black/30">
              Live activity
            </p>
            <button className="text-[11px] font-bold text-[#7EB3F7] hover:text-[#3B7FD4] transition-colors flex items-center gap-1">
              <RefreshCw className="w-3 h-3" /> Refresh
            </button>
          </div>
          <Timeline events={ADMIN_ACTIVITY} variant="compact" />
        </Card>
      </div>

      {/* Flagged items */}
      <Card
        variant="default"
        padding="none"
        className="p-5 flex items-start gap-4 border-l-4 border-amber-400"
      >
        <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
        <div className="flex-1 min-w-0">
          <p className="font-bold text-[14px] text-[#111010]">
            1 claim flagged for review
          </p>
          <p className="text-[13px] text-black/45 font-medium mt-0.5">
            Item <span className="font-semibold">i7 (TI-84 Calculator)</span>{" "}
            has a suspicious claim pattern. Review it in the Claims tab.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          icon={<ArrowRight className="w-3.5 h-3.5" />}
        >
          Review
        </Button>
      </Card>
    </div>
  );
}
