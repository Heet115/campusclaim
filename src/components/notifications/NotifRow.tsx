"use client";

import { useState } from "react";
import {
  Bell,
  CheckCircle,
  Package,
  FileText,
  Handshake,
  ShieldCheck,
  Trash2,
  Check,
  ArrowRight,
} from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";

// ─── Types ────────────────────────────────────────────────────────────────────

export type NotifKind =
  | "claim"
  | "match"
  | "approved"
  | "handoff"
  | "resolved"
  | "system";

export interface Notification {
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

// ─── Kind config ──────────────────────────────────────────────────────────────

export const KIND: Record<
  NotifKind,
  { icon: React.ReactNode; bg: string; text: string }
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

// ─── NotifRow ─────────────────────────────────────────────────────────────────

export function NotifRow({
  notif,
  onRead,
  onDelete,
}: {
  notif: Notification;
  onRead: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  const k = KIND[notif.kind];
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <>
      <div
        className={`group flex items-start gap-4 px-6 py-4 border-b border-black/5 transition-colors hover:bg-[#F7F4F0]/60 ${!notif.read ? "bg-[#F0F6FF]/50" : ""}`}
      >
        <div
          className="w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 mt-0.5"
          style={{ background: k.bg }}
        >
          <span style={{ color: k.text }}>{k.icon}</span>
        </div>
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
              {notif.actionLabel} <ArrowRight className="w-3 h-3" />
            </a>
          )}
        </div>
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
            onClick={() => setConfirmOpen(true)}
            title="Delete"
            className="w-7 h-7 rounded-xl flex items-center justify-center text-black/25 hover:text-red-400 hover:bg-red-50 transition-all"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={() => {
          onDelete(notif.id);
          setConfirmOpen(false);
        }}
        variant="danger"
        title="Delete notification?"
        description={`"${notif.title}" will be permanently removed.`}
        confirmLabel="Delete"
        cancelLabel="Cancel"
      />
    </>
  );
}

// ─── Empty state ──────────────────────────────────────────────────────────────

export function NotifEmpty({ label }: { label: string }) {
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
