"use client";

import {
  ArrowRight,
  Package,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  MapPin,
  MessageSquare,
  FileText,
  Send,
  X,
  ChevronRight,
  Handshake,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";
import { Timeline } from "@/components/ui/Timeline";
import { Textarea } from "@/components/ui/Input";
import { EmptyState } from "@/components/ui/EmptyState";

// ─── Types ────────────────────────────────────────────────────────────────────

type ClaimStatus =
  | "pending"
  | "reviewing"
  | "approved"
  | "rejected"
  | "completed";

interface Claim {
  id: string;
  itemName: string;
  itemCategory: string;
  itemLocation: string;
  itemColor: string;
  itemText: string;
  itemPhoto?: string;
  status: ClaimStatus;
  submittedAt: string;
  updatedAt: string;
  message: string;
  finderName: string;
  myRole: "claimer" | "finder";
  timeline: {
    title: string;
    description?: string;
    timestamp: string;
    color: "default" | "blue" | "green" | "amber" | "red";
    icon?: React.ReactNode;
  }[];
}

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

// ─── Status config ─────────────────────────────────────────────────────────────

const STATUS: Record<
  ClaimStatus,
  {
    label: string;
    variant:
      | "status-green"
      | "status-amber"
      | "status-blue"
      | "status-red"
      | "solid";
    icon: React.ReactNode;
    description: string;
  }
> = {
  pending: {
    label: "Pending",
    variant: "status-amber",
    icon: <Clock className="w-3.5 h-3.5" />,
    description: "Waiting for the finder to review.",
  },
  reviewing: {
    label: "Reviewing",
    variant: "status-blue",
    icon: <AlertCircle className="w-3.5 h-3.5" />,
    description: "The finder is actively reviewing your claim.",
  },
  approved: {
    label: "Approved",
    variant: "status-green",
    icon: <CheckCircle className="w-3.5 h-3.5" />,
    description: "Claim approved! Arrange a handoff with the finder.",
  },
  rejected: {
    label: "Rejected",
    variant: "status-red",
    icon: <XCircle className="w-3.5 h-3.5" />,
    description: "The finder could not verify your description.",
  },
  completed: {
    label: "Completed",
    variant: "status-green",
    icon: <ShieldCheck className="w-3.5 h-3.5" />,
    description: "Item successfully returned to you.",
  },
};

// ─── Claim card ───────────────────────────────────────────────────────────────

function ClaimCard({
  claim,
  onClick,
  active,
}: {
  claim: Claim;
  onClick: () => void;
  active: boolean;
}) {
  const s = STATUS[claim.status];
  return (
    <button
      onClick={onClick}
      className={`w-full text-left flex items-center gap-4 px-5 py-4 transition-all group ${
        active ? "bg-[#F7F4F0]" : "hover:bg-[#F7F4F0]/60"
      }`}
    >
      {/* Item thumbnail / icon */}
      <div className="relative shrink-0">
        {claim.itemPhoto ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={claim.itemPhoto}
            alt={claim.itemName}
            className="w-12 h-12 rounded-2xl object-cover border border-black/6"
          />
        ) : (
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{ background: claim.itemColor }}
          >
            <Package className="w-5 h-5" style={{ color: claim.itemText }} />
          </div>
        )}
        {/* Active dot */}
        {(claim.status === "approved" || claim.status === "reviewing") && (
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-white bg-[#7EB3F7]" />
        )}
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0 space-y-1">
        <p className="font-semibold text-[14px] text-[#111010] truncate leading-tight">
          {claim.itemName}
        </p>
        <p className="text-[12px] text-black/35 font-medium flex items-center gap-1.5">
          <MapPin className="w-3 h-3 shrink-0" />
          {claim.itemLocation}
        </p>
      </div>

      {/* Right */}
      <div className="shrink-0 flex flex-col items-end gap-1.5">
        <Badge variant={s.variant} size="sm" dot>
          {s.label}
        </Badge>
        <span className="text-[10px] text-black/25 font-medium">
          {claim.updatedAt}
        </span>
      </div>

      <ChevronRight
        className={`w-4 h-4 shrink-0 transition-all ${active ? "text-[#111010]" : "text-black/15 group-hover:text-black/40"}`}
      />
    </button>
  );
}

// ─── Detail panel ─────────────────────────────────────────────────────────────

function ClaimDetail({
  claim,
  onClose,
}: {
  claim: Claim;
  onClose: () => void;
}) {
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const s = STATUS[claim.status];

  async function sendMessage() {
    if (!message.trim()) return;
    setSending(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSending(false);
    setSent(true);
    setMessage("");
    setTimeout(() => setSent(false), 3000);
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 p-6 border-b border-black/5">
        <div className="flex items-center gap-3">
          {claim.itemPhoto ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={claim.itemPhoto}
              alt={claim.itemName}
              className="w-12 h-12 rounded-2xl object-cover border border-black/6 shrink-0"
            />
          ) : (
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
              style={{ background: claim.itemColor }}
            >
              <Package className="w-5 h-5" style={{ color: claim.itemText }} />
            </div>
          )}
          <div className="min-w-0">
            <h2 className="font-display text-[20px] italic text-[#111010] leading-tight truncate">
              {claim.itemName}
            </h2>
            <p className="text-[12px] text-black/35 font-medium mt-0.5 flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {claim.itemLocation}
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-xl bg-[#F7F4F0] border border-black/6 flex items-center justify-center text-black/35 hover:text-black/60 hover:bg-[#F0EDE9] transition-all shrink-0"
          aria-label="Close"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Status banner */}
        <div
          className={`rounded-2xl px-4 py-3.5 flex items-start gap-3 ${
            claim.status === "approved"
              ? "bg-[#D4F4DC]/60 border border-[#A8E6C2]/50"
              : claim.status === "completed"
                ? "bg-[#D4F4DC]/60 border border-[#A8E6C2]/50"
                : claim.status === "rejected"
                  ? "bg-red-50 border border-red-200/60"
                  : claim.status === "reviewing"
                    ? "bg-[#C8DFFE]/30 border border-[#C8DFFE]"
                    : "bg-[#FDE8D8]/40 border border-[#FDB8A0]/40"
          }`}
        >
          <span
            className={
              claim.status === "approved" || claim.status === "completed"
                ? "text-[#2E7D45]"
                : claim.status === "rejected"
                  ? "text-red-500"
                  : claim.status === "reviewing"
                    ? "text-[#3B7FD4]"
                    : "text-[#C2622A]"
            }
          >
            {s.icon}
          </span>
          <div>
            <p className="text-[13px] font-bold text-[#111010]">{s.label}</p>
            <p className="text-[12px] font-medium text-black/50 mt-0.5 leading-relaxed">
              {s.description}
            </p>
          </div>
        </div>

        {/* CTA for approved */}
        {claim.status === "approved" && (
          <div className="bg-[#111010] rounded-2xl p-5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#A8E6C2] rounded-full blur-[50px] opacity-20 pointer-events-none" />
            <div className="relative space-y-3">
              <Handshake className="w-4 h-4 text-[#A8E6C2]" />
              <p className="font-display text-[17px] italic text-white leading-tight">
                Ready for handoff!
              </p>
              <p className="text-[12px] text-white/40 font-medium leading-relaxed">
                Send a message below to coordinate pickup with the finder.
              </p>
            </div>
          </div>
        )}

        {/* CTA for rejected — retry */}
        {claim.status === "rejected" && (
          <Button
            href="/items"
            variant="outline"
            size="sm"
            fullWidth
            icon={<RotateCcw className="w-3.5 h-3.5" />}
            iconPosition="left"
          >
            Browse other found items
          </Button>
        )}

        {/* Finder info */}
        <div>
          <p className="text-[11px] font-bold uppercase tracking-widest text-black/30 mb-3">
            Finder
          </p>
          <div className="flex items-center gap-3 bg-[#F7F4F0] rounded-2xl px-4 py-3 border border-black/5">
            <Avatar name={claim.finderName} size="sm" />
            <div>
              <p className="text-[13px] font-bold text-[#111010]">
                {claim.finderName}
              </p>
              <p className="text-[11px] text-black/35 font-medium">
                Verified student
              </p>
            </div>
            <Badge variant="status-green" size="sm" className="ml-auto">
              Verified
            </Badge>
          </div>
        </div>

        {/* My claim message */}
        <div>
          <p className="text-[11px] font-bold uppercase tracking-widest text-black/30 mb-3">
            Your claim message
          </p>
          <div className="bg-[#F7F4F0] rounded-2xl px-4 py-3.5 border border-black/5">
            <p className="text-[13px] font-medium text-black/60 leading-relaxed">
              {claim.message}
            </p>
          </div>
        </div>

        {/* Timeline */}
        <div>
          <p className="text-[11px] font-bold uppercase tracking-widest text-black/30 mb-4">
            Activity
          </p>
          <Timeline events={claim.timeline} variant="compact" />
        </div>

        {/* Metadata */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "Submitted", value: claim.submittedAt },
            { label: "Last update", value: claim.updatedAt },
            { label: "Category", value: claim.itemCategory },
            {
              label: "Your role",
              value: claim.myRole === "claimer" ? "Claimant" : "Finder",
            },
          ].map((r, i) => (
            <div
              key={i}
              className="bg-[#F7F4F0] rounded-xl px-3.5 py-3 border border-black/5"
            >
              <p className="text-[10px] font-bold uppercase tracking-wider text-black/30">
                {r.label}
              </p>
              <p className="text-[13px] font-semibold text-[#111010] mt-0.5">
                {r.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Message composer — shown for active claims */}
      {(claim.status === "approved" ||
        claim.status === "pending" ||
        claim.status === "reviewing") && (
        <div className="border-t border-black/5 p-5 bg-white space-y-3">
          <p className="text-[11px] font-bold uppercase tracking-widest text-black/30 flex items-center gap-1.5">
            <MessageSquare className="w-3 h-3" /> Message finder
          </p>
          {sent && (
            <p className="text-[12px] font-semibold text-[#2E7D45] animate-fade-up flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5" /> Message sent!
            </p>
          )}
          <div className="flex gap-2">
            <Textarea
              placeholder="e.g. Hi! When can we meet? I'm available tomorrow at the library…"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={2}
            />
          </div>
          <Button
            variant="primary"
            size="sm"
            fullWidth
            loading={sending}
            disabled={!message.trim() || sending}
            className="btn-magnetic"
            icon={<Send className="w-3.5 h-3.5" />}
            onClick={sendMessage}
          >
            {sending ? "Sending…" : "Send message"}
          </Button>
        </div>
      )}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

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
      {/* ── Header ── */}
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

      {/* ── Summary stat strip ── */}
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

      {/* ── Main content: list + detail panel ── */}
      <div
        className={`grid gap-6 transition-all duration-300 ${selected ? "lg:grid-cols-[1fr_400px]" : "grid-cols-1"}`}
      >
        {/* List panel */}
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

        {/* Detail panel */}
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

      {/* ── Bottom tip ── */}
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
