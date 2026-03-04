"use client";

import { useState } from "react";
import { FileText, Filter, Check, AlertCircle, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";
import {
  NotifRow,
  NotifEmpty,
  type Notification,
} from "@/components/notifications";

// ─── Mock data ────────────────────────────────────────────────────────────────

const INITIAL: Notification[] = [
  {
    id: "n1",
    kind: "claim",
    title: "New claim on your item",
    body: 'Heet Viradiya submitted a claim on "MacBook Pro 14″" you found at the library.',
    time: "2 min ago",
    read: false,
    actor: "Heet Viradiya",
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
      {/* Header */}
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

      {/* Tabs */}
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

      {/* Bottom tip */}
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
