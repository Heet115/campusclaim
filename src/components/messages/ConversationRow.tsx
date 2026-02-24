"use client";

import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";

export interface Conversation {
  id: string;
  participant: string;
  participantRole: "finder" | "claimer";
  itemName: string;
  itemColor: string;
  itemText: string;
  itemPhoto?: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  status: "active" | "handoff" | "completed";
  online?: boolean;
}

const statusConfig = {
  active: { label: "Active", variant: "status-blue" as const },
  handoff: { label: "Handoff", variant: "status-amber" as const },
  completed: { label: "Returned", variant: "status-green" as const },
};

export function ConversationRow({
  conversation,
  active,
  onClick,
}: {
  conversation: Conversation;
  active: boolean;
  onClick: () => void;
}) {
  const s = statusConfig[conversation.status];
  const hasUnread = conversation.unreadCount > 0;

  return (
    <button
      onClick={onClick}
      className={`
        w-full text-left flex items-start gap-3.5 px-5 py-4 transition-all duration-200 border-b border-black/4
        ${
          active
            ? "bg-[#C8DFFE]/20 border-l-[3px] border-l-[#3B7FD4]"
            : hasUnread
              ? "bg-[#F0F6FF]/40 hover:bg-[#F7F4F0]/70"
              : "hover:bg-[#F7F4F0]/50"
        }
      `}
    >
      {/* Avatar with online status */}
      <div className="relative shrink-0 mt-0.5">
        <Avatar
          name={conversation.participant}
          size="md"
          status={conversation.online ? "online" : undefined}
        />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 space-y-1">
        <div className="flex items-center justify-between gap-2">
          <p
            className={`text-[13px] leading-snug truncate ${hasUnread ? "font-bold text-[#111010]" : "font-semibold text-black/70"}`}
          >
            {conversation.participant}
          </p>
          <span
            className={`text-[10px] font-medium shrink-0 ${hasUnread ? "text-[#3B7FD4] font-bold" : "text-black/25"}`}
          >
            {conversation.lastMessageTime}
          </span>
        </div>

        <p className="text-[11px] font-semibold text-black/35 truncate flex items-center gap-1.5">
          <span
            className="w-2.5 h-2.5 rounded-md shrink-0"
            style={{ background: conversation.itemColor }}
          />
          {conversation.itemName}
        </p>

        <p
          className={`text-[12px] truncate leading-snug ${hasUnread ? "font-semibold text-black/60" : "font-medium text-black/40"}`}
        >
          {conversation.lastMessage}
        </p>
      </div>

      {/* Right badges */}
      <div className="flex flex-col items-end gap-1.5 shrink-0 mt-0.5">
        {conversation.unreadCount > 0 && (
          <span className="w-5 h-5 rounded-full bg-[#3B7FD4] text-white text-[10px] font-bold flex items-center justify-center shadow-sm">
            {conversation.unreadCount}
          </span>
        )}
        <Badge variant={s.variant} size="sm">
          {s.label}
        </Badge>
      </div>
    </button>
  );
}
