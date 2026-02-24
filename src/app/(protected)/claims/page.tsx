"use client";

import { useState } from "react";
import {
  ArrowRight,
  FileText,
  Send,
  CheckCircle,
  XCircle,
  Clock,
  Handshake,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";
import { EmptyState } from "@/components/ui/EmptyState";
import { ClaimCard, ClaimDetail, type Claim } from "@/components/claims";

// ─── Mock data ────────────────────────────────────────────────────────────────

const CLAIMS: Claim[] = [
  {
    id: "c1",
    itemName: 'Space Gray MacBook Pro 14"',
    itemCategory: "Electronics",
    itemLocation: "Library, 3rd Floor",
    itemColor: "#C8DFFE",
    itemText: "#3B7FD4",
    itemPhoto:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=200&q=80",
    status: "approved",
    submittedAt: "Feb 22, 2026",
    updatedAt: "2 hours ago",
    message:
      "This is my laptop. It has a small scratch on the bottom-left corner of the lid and my university ID is saved as the wallpaper. Serial number begins with C02ZK.",
    finderName: "Alex R.",
    myRole: "claimer",
    timeline: [
      {
        title: "Claim submitted",
        description: "You submitted a claim with supporting description.",
        timestamp: "Feb 22 · 2:15 PM",
        color: "default",
        icon: <FileText className="w-4 h-4" />,
      },
      {
        title: "Finder notified",
        description: "Alex R. received your claim and is reviewing it.",
        timestamp: "Feb 22 · 2:16 PM",
        color: "blue",
        icon: <Send className="w-4 h-4" />,
      },
      {
        title: "Claim approved!",
        description:
          "Alex R. verified your description and approved the claim. Reach out to arrange a handoff.",
        timestamp: "Feb 23 · 10:45 AM",
        color: "green",
        icon: <CheckCircle className="w-4 h-4" />,
      },
    ],
  },
  {
    id: "c2",
    itemName: "Sony WH-1000XM4 Headphones",
    itemCategory: "Electronics",
    itemLocation: "Cafeteria, Block B",
    itemColor: "#FDE8D8",
    itemText: "#C2622A",
    status: "pending",
    submittedAt: "Feb 23, 2026",
    updatedAt: "5 hours ago",
    message:
      "Mine are midnight black with a small keychain of a guitar pick attached to the case zip. The left ear-cup has a tiny nick.",
    finderName: "Priya M.",
    myRole: "claimer",
    timeline: [
      {
        title: "Claim submitted",
        description: "Your claim is waiting for the finder to review.",
        timestamp: "Feb 23 · 9:00 AM",
        color: "default",
        icon: <FileText className="w-4 h-4" />,
      },
      {
        title: "Finder notified",
        description: "Priya M. has been notified of your claim.",
        timestamp: "Feb 23 · 9:01 AM",
        color: "blue",
        icon: <Send className="w-4 h-4" />,
      },
    ],
  },
  {
    id: "c3",
    itemName: "Blue Hydroflask 32oz",
    itemCategory: "Accessories",
    itemLocation: "Library, 3rd Floor",
    itemColor: "#C8DFFE",
    itemText: "#3B7FD4",
    status: "completed",
    submittedAt: "Feb 10, 2026",
    updatedAt: "Feb 15, 2026",
    message:
      "Has a sticker of a mountain on the bottom and 'MP' initials scratched into the lid.",
    finderName: "Rohan K.",
    myRole: "claimer",
    timeline: [
      {
        title: "Claim submitted",
        timestamp: "Feb 10 · 11:00 AM",
        color: "default",
        icon: <FileText className="w-4 h-4" />,
      },
      {
        title: "Claim approved",
        timestamp: "Feb 12 · 3:00 PM",
        color: "green",
        icon: <CheckCircle className="w-4 h-4" />,
      },
      {
        title: "Handoff completed",
        description:
          "You collected your Hydroflask from Rohan K. at Library entrance.",
        timestamp: "Feb 15 · 1:00 PM",
        color: "green",
        icon: <Handshake className="w-4 h-4" />,
      },
    ],
  },
  {
    id: "c4",
    itemName: "House Keys (Blue Lanyard)",
    itemCategory: "Keys",
    itemLocation: "Engineering Block, 2F",
    itemColor: "#D4F4DC",
    itemText: "#2E7D45",
    status: "rejected",
    submittedAt: "Feb 20, 2026",
    updatedAt: "Feb 21, 2026",
    message: "My keys with a blue lanyard that says 'Stanford 2025'.",
    finderName: "Divya S.",
    myRole: "claimer",
    timeline: [
      {
        title: "Claim submitted",
        timestamp: "Feb 20 · 4:30 PM",
        color: "default",
        icon: <FileText className="w-4 h-4" />,
      },
      {
        title: "Claim rejected",
        description:
          "The finder could not verify your description. The keys remain unclaimed.",
        timestamp: "Feb 21 · 10:00 AM",
        color: "red",
        icon: <XCircle className="w-4 h-4" />,
      },
    ],
  },
  {
    id: "c5",
    itemName: "TI-84 Calculator",
    itemCategory: "Electronics",
    itemLocation: "Maths Block, R303",
    itemColor: "#EDE8FD",
    itemText: "#6B3EDE",
    status: "reviewing",
    submittedAt: "Feb 23, 2026",
    updatedAt: "1 hour ago",
    message:
      "Has my name 'Maya P.' written in permanent marker on the back. Blue case.",
    finderName: "Sam T.",
    myRole: "claimer",
    timeline: [
      {
        title: "Claim submitted",
        timestamp: "Feb 23 · 8:30 AM",
        color: "default",
        icon: <FileText className="w-4 h-4" />,
      },
      {
        title: "Under review",
        description:
          "Sam T. is actively reviewing your claim. This usually takes less than 24 hours.",
        timestamp: "Feb 23 · 11:00 AM",
        color: "amber",
        icon: <Clock className="w-4 h-4" />,
      },
    ],
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

type ClaimStatus = Claim["status"];

export default function ClaimsPage() {
  const [selected, setSelected] = useState<Claim | null>(null);

  const byStatus = (statuses: ClaimStatus[]) =>
    CLAIMS.filter((c) => statuses.includes(c.status));

  const tabs = [
    {
      value: "active",
      label: "Active",
      claims: byStatus(["pending", "reviewing", "approved"]),
      badge: byStatus(["pending", "reviewing", "approved"]).length,
    },
    { value: "all", label: "All", claims: CLAIMS, badge: CLAIMS.length },
    {
      value: "completed",
      label: "Completed",
      claims: byStatus(["completed"]),
      badge: byStatus(["completed"]).length,
    },
    {
      value: "rejected",
      label: "Rejected",
      claims: byStatus(["rejected"]),
      badge: byStatus(["rejected"]).length,
    },
  ];

  function renderList(claims: Claim[]) {
    if (claims.length === 0) {
      return (
        <EmptyState
          icon={<FileText />}
          title="No claims here"
          description="Claims you submit will appear in this list."
          action={
            <Button
              href="/items"
              variant="primary"
              size="sm"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Browse found items
            </Button>
          }
        />
      );
    }
    return (
      <div className="divide-y divide-black/4">
        {claims.map((c) => (
          <ClaimCard
            key={c.id}
            claim={c}
            active={selected?.id === c.id}
            onClick={() =>
              setSelected((prev) => (prev?.id === c.id ? null : c))
            }
          />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-black/30 mb-2">
            My Claims
          </p>
          <h1 className="font-display text-[44px] md:text-[56px] italic text-[#111010] leading-[0.9]">
            Claim tracker.
          </h1>
        </div>
        <Button
          href="/items"
          variant="primary"
          size="sm"
          className="btn-magnetic shrink-0"
          icon={<ArrowRight className="w-4 h-4" />}
        >
          Browse found items
        </Button>
      </div>

      {/* Stat strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          {
            label: "Total claims",
            value: CLAIMS.length,
            color: "#C8DFFE",
            text: "#3B7FD4",
          },
          {
            label: "Pending review",
            value: byStatus(["pending", "reviewing"]).length,
            color: "#FDE8D8",
            text: "#C2622A",
          },
          {
            label: "Approved",
            value: byStatus(["approved", "completed"]).length,
            color: "#D4F4DC",
            text: "#2E7D45",
          },
          {
            label: "Recovered",
            value: byStatus(["completed"]).length,
            color: "#EDE8FD",
            text: "#6B3EDE",
          },
        ].map((s, i) => (
          <Card
            key={i}
            variant="default"
            padding="none"
            className="p-5 flex items-center gap-4 group hover:-translate-y-0.5 transition-all duration-300"
          >
            <div
              className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0"
              style={{ background: s.color }}
            >
              <span
                className="font-display text-[20px] italic font-bold"
                style={{ color: s.text }}
              >
                {s.value}
              </span>
            </div>
            <p className="text-[12px] font-semibold text-black/50 leading-snug">
              {s.label}
            </p>
          </Card>
        ))}
      </div>

      {/* List + detail panel */}
      <div
        className={`grid gap-6 transition-all duration-300 ${selected ? "lg:grid-cols-[1fr_400px]" : "grid-cols-1"}`}
      >
        <Card variant="default" padding="none" className="overflow-hidden">
          <Tabs defaultValue="active" variant="underline">
            <div className="px-5 pt-5 border-b border-black/5">
              <TabsList>
                {tabs.map((t) => (
                  <TabsTrigger key={t.value} value={t.value} badge={t.badge}>
                    {t.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            {tabs.map((t) => (
              <TabsContent key={t.value} value={t.value}>
                {renderList(t.claims)}
              </TabsContent>
            ))}
          </Tabs>
        </Card>

        {selected && (
          <Card
            variant="default"
            padding="none"
            className="overflow-hidden lg:max-h-[calc(100vh-12rem)] lg:sticky lg:top-28 animate-fade-up"
          >
            <ClaimDetail claim={selected} onClose={() => setSelected(null)} />
          </Card>
        )}
      </div>

      {/* Bottom tip */}
      {!selected && (
        <div className="bg-[#111010] rounded-[24px] p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#7EB3F7] rounded-full blur-[70px] opacity-15 pointer-events-none" />
          <div className="relative flex flex-col sm:flex-row sm:items-center gap-5">
            <div className="space-y-2 flex-1">
              <ShieldCheck className="w-4 h-4 text-[#7EB3F7]" />
              <p className="font-display text-[18px] italic text-white leading-tight">
                How claims work.
              </p>
              <p className="text-[13px] text-white/40 font-medium leading-relaxed max-w-lg">
                You submit a claim with a description of why an item is yours.
                The finder reviews it and approves or rejects within{" "}
                <span className="text-white/70 font-semibold">24 hours</span>.
                On approval, you coordinate a handoff directly through
                CampusClaim.
              </p>
            </div>
            <Button
              href="/items"
              size="sm"
              className="bg-white/10 border border-white/10 text-white hover:bg-white/20 transition-colors backdrop-blur-md shrink-0"
              icon={<ArrowRight className="w-3.5 h-3.5" />}
            >
              Browse items
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
