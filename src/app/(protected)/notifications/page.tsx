"use client";

import {
  Bell,
  CheckCircle,
  Package,
  FileText,
  Handshake,
  ShieldCheck,
  AlertCircle,
  Trash2,
  Check,
  Filter,
  ArrowRight,
} from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";

// ─── Types ────────────────────────────────────────────────────────────────────

type NotifKind =
  | "claim"
  | "match"
  | "approved"
  | "handoff"
  | "resolved"
  | "system";

interface Notification {
  id: string;
  kind: NotifKind;
  title: string;
  body: string;
  time: string;
  read: boolean;
  actor?: string;
  actionLabel?: string;
  actionHref?: string;
}

// ─── Mock data ────────────────────────────────────────────────────────────────

const INITIAL: Notification[] = [
  {
    id: "n1",
    kind: "claim",
    title: "New claim on your item",
    body: 'Maya Patel submitted a claim on "MacBook Pro 14″" you found at the library.',
    time: "2 min ago",
    read: false,
    actor: "Maya Patel",
    actionLabel: "Review claim",
    actionHref: "/claims",
  },
  {
    id: "n2",
    kind: "approved",
    title: "Your claim was approved!",
    body: 'Alex R. approved your claim on "Sony WH-1000XM4 Headphones". Coordinate a handoff.',
    time: "18 min ago",
    read: false,
    actor: "Alex R.",
    actionLabel: "Arrange handoff",
    actionHref: "/claims",
  },
  {
    id: "n3",
    kind: "match",
    title: "Possible match found",
    body: 'A newly reported found item resembles "Blue Hydroflask 32oz" you reported lost. Check it out.',
    time: "1 hr ago",
    read: false,
    actionLabel: "View item",
    actionHref: "/items",
  },
  {
    id: "n4",
    kind: "handoff",
    title: "Handoff reminder",
    body: 'You have a pending handoff for "TI-84 Calculator" with Sam T. — arrange pickup today.',
    time: "3 hr ago",
    read: true,
    actor: "Sam T.",
    actionLabel: "Message finder",
    actionHref: "/claims",
  },
  {
    id: "n5",
    kind: "resolved",
    title: "Item marked as resolved",
    body: '"House Keys (Blue Lanyard)" was successfully returned. Thanks for using CampusClaim!',
    time: "Yesterday",
    read: true,
  },
  {
    id: "n6",
    kind: "claim",
    title: "Claim rejected on your report",
    body: 'A claim on your found item "Red Umbrella" was rejected after verification.',
    time: "Yesterday",
    read: true,
    actionLabel: "View report",
    actionHref: "/items",
  },
  {
    id: "n7",
    kind: "system",
    title: "Welcome to CampusClaim!",
    body: "Your account is verified and ready. Start by browsing found items or reporting something lost.",
    time: "Feb 10",
    read: true,
    actionLabel: "Browse items",
    actionHref: "/items",
  },
];

// ─── Kind config ──────────────────────────────────────────────────────────────

const KIND: Record<
  NotifKind,
  {
    icon: React.ReactNode;
    bg: string;
    text: string;
  }
> = {
  claim: {
    icon: <FileText className="w-4 h-4" />,
    bg: "#C8DFFE",
    text: "#3B7FD4",
  },
  match: {
    icon: <Package className="w-4 h-4" />,
    bg: "#EDE8FD",
    text: "#6B3EDE",
  },
  approved: {
    icon: <CheckCircle className="w-4 h-4" />,
    bg: "#D4F4DC",
    text: "#2E7D45",
  },
  handoff: {
    icon: <Handshake className="w-4 h-4" />,
    bg: "#FDE8D8",
    text: "#C2622A",
  },
  resolved: {
    icon: <ShieldCheck className="w-4 h-4" />,
    bg: "#D4F4DC",
    text: "#2E7D45",
  },
  system: {
    icon: <Bell className="w-4 h-4" />,
    bg: "#F7F4F0",
    text: "#111010",
  },
};

// ─── Notification row ─────────────────────────────────────────────────────────

function NotifRow({
  notif,
  onRead,
  onDelete,
}: {
  notif: Notification;
  onRead: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  const k = KIND[notif.kind];

  return (
    <div
      className={`group flex items-start gap-4 px-6 py-4 border-b border-black/5 transition-colors hover:bg-[#F7F4F0]/60 ${
        !notif.read ? "bg-[#F0F6FF]/50" : ""
      }`}
    >
      {/* Kind icon */}
      <div
        className="w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 mt-0.5"
        style={{ background: k.bg }}
      >
        <span style={{ color: k.text }}>{k.icon}</span>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 space-y-1">
        <div className="flex items-start justify-between gap-3">
          <p
            className={`text-[13px] leading-snug ${notif.read ? "font-medium text-black/60" : "font-bold text-[#111010]"}`}
          >
            {notif.title}
            {!notif.read && (
              <span className="inline-block ml-2 w-1.5 h-1.5 rounded-full bg-[#7EB3F7] align-middle" />
            )}
          </p>
          <span className="text-[11px] font-medium text-black/25 shrink-0 whitespace-nowrap">
            {notif.time}
          </span>
        </div>

        {notif.actor && (
          <div className="flex items-center gap-1.5">
            <Avatar name={notif.actor} size="xs" />
            <span className="text-[11px] font-semibold text-black/40">
              {notif.actor}
            </span>
          </div>
        )}

        <p className="text-[12px] font-medium text-black/45 leading-relaxed">
          {notif.body}
        </p>

        {notif.actionLabel && (
          <a
            href={notif.actionHref ?? "#"}
            className="inline-flex items-center gap-1 text-[12px] font-bold text-[#3B7FD4] hover:text-[#2563b0] transition-colors mt-1"
          >
            {notif.actionLabel}
            <ArrowRight className="w-3 h-3" />
          </a>
        )}
      </div>

      {/* Row actions — revealed on hover */}
      <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
        {!notif.read && (
          <button
            onClick={() => onRead(notif.id)}
            title="Mark as read"
            className="w-7 h-7 rounded-xl flex items-center justify-center text-black/25 hover:text-[#2E7D45] hover:bg-[#D4F4DC] transition-all"
          >
            <Check className="w-3.5 h-3.5" />
          </button>
        )}
        <button
          onClick={() => onDelete(notif.id)}
          title="Delete"
          className="w-7 h-7 rounded-xl flex items-center justify-center text-black/25 hover:text-red-400 hover:bg-red-50 transition-all"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

// ─── Empty state ──────────────────────────────────────────────────────────────

function NotifEmpty({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="w-14 h-14 rounded-[20px] bg-[#F7F4F0] flex items-center justify-center mb-4 border border-black/5">
        <Bell className="w-6 h-6 text-black/20" />
      </div>
      <p className="text-[14px] font-bold text-black/30">{label}</p>
      <p className="text-[12px] font-medium text-black/20 mt-1">
        Check back later for updates.
      </p>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function NotificationsPage() {
  const [notifs, setNotifs] = useState(INITIAL);

  const unread = notifs.filter((n) => !n.read);
  const allClaim = notifs.filter(
    (n) => n.kind === "claim" || n.kind === "approved",
  );
  const allMatch = notifs.filter(
    (n) => n.kind === "match" || n.kind === "resolved" || n.kind === "handoff",
  );

  function markRead(id: string) {
    setNotifs((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  }

  function markAllRead() {
    setNotifs((prev) => prev.map((n) => ({ ...n, read: true })));
  }

  function remove(id: string) {
    setNotifs((prev) => prev.filter((n) => n.id !== id));
  }

  function renderList(list: Notification[], emptyLabel: string) {
    if (list.length === 0) return <NotifEmpty label={emptyLabel} />;
    return list.map((n) => (
      <NotifRow key={n.id} notif={n} onRead={markRead} onDelete={remove} />
    ));
  }

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      {/* ── Header ── */}
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-black/30 mb-2">
            Inbox
          </p>
          <h1 className="font-display text-[44px] md:text-[56px] italic text-[#111010] leading-[0.9]">
            Notifications.
          </h1>
        </div>

        <div className="flex items-center gap-3 shrink-0 pb-1">
          {unread.length > 0 && (
            <Badge variant="status-blue" size="sm" dot>
              {unread.length} unread
            </Badge>
          )}
          {unread.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={markAllRead}
              icon={<Check className="w-3.5 h-3.5" />}
              iconPosition="left"
            >
              Mark all read
            </Button>
          )}
        </div>
      </div>

      {/* ── Tabs ── */}
      <Card variant="default" padding="none" className="overflow-hidden">
        <Tabs defaultValue="all" variant="underline">
          <div className="px-5 pt-5 border-b border-black/5">
            <TabsList>
              <TabsTrigger value="all" badge={notifs.length}>
                All
              </TabsTrigger>
              <TabsTrigger value="unread" badge={unread.length}>
                Unread
              </TabsTrigger>
              <TabsTrigger
                value="claims"
                badge={allClaim.length}
                icon={<FileText className="w-3.5 h-3.5" />}
              >
                Claims
              </TabsTrigger>
              <TabsTrigger
                value="matches"
                badge={allMatch.length}
                icon={<Filter className="w-3.5 h-3.5" />}
              >
                Activity
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all">
            {renderList(notifs, "No notifications yet.")}
          </TabsContent>
          <TabsContent value="unread">
            {renderList(unread, "You're all caught up!")}
          </TabsContent>
          <TabsContent value="claims">
            {renderList(allClaim, "No claim notifications.")}
          </TabsContent>
          <TabsContent value="matches">
            {renderList(allMatch, "No activity notifications.")}
          </TabsContent>
        </Tabs>
      </Card>

      {/* ── Bottom tip ── */}
      <div className="bg-[#111010] rounded-[24px] p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-[#7EB3F7] rounded-full blur-[60px] opacity-15 pointer-events-none" />
        <div className="relative flex flex-col sm:flex-row sm:items-center gap-5">
          <div className="space-y-1.5 flex-1">
            <AlertCircle className="w-4 h-4 text-[#7EB3F7]" />
            <p className="font-display text-[16px] italic text-white leading-tight">
              Stay in the loop.
            </p>
            <p className="text-[12px] text-white/40 font-medium leading-relaxed">
              Manage which notifications you receive in{" "}
              <a
                href="/settings"
                className="text-white/70 font-semibold hover:text-white transition-colors underline underline-offset-2"
              >
                Settings → Notifications
              </a>
              .
            </p>
          </div>
          <Button
            href="/settings"
            size="sm"
            className="bg-white/10 border border-white/10 text-white hover:bg-white/20 transition-colors backdrop-blur-md shrink-0"
            icon={<ArrowRight className="w-3.5 h-3.5" />}
          >
            Manage
          </Button>
        </div>
      </div>
    </div>
  );
}
