"use client";

import { ArrowLeft, MoreHorizontal, Handshake } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import type { Conversation } from "./ConversationRow";

const statusConfig = {
  active: { label: "Active", variant: "status-blue" as const },
  handoff: { label: "Handoff", variant: "status-amber" as const },
  completed: { label: "Returned", variant: "status-green" as const },
};

export function ChatHeader({
  conversation,
  onBack,
}: {
  conversation: Conversation;
  onBack: () => void;
}) {
  const s = statusConfig[conversation.status];

  return (
    <div className="flex items-center gap-3 px-5 py-4 border-b border-black/5 bg-white/80 backdrop-blur-xl shrink-0">
      {/* Back arrow (mobile) */}
      <button
        onClick={onBack}
        className="lg:hidden w-8 h-8 rounded-xl flex items-center justify-center text-black/40 hover:text-black/70 hover:bg-black/5 transition-all shrink-0"
      >
        <ArrowLeft className="w-4 h-4" />
      </button>

      {/* Participant info */}
      <Avatar
        name={conversation.participant}
        size="md"
        status={conversation.online ? "online" : undefined}
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="font-bold text-[14px] text-[#111010] truncate">
            {conversation.participant}
          </p>
          <Badge variant={s.variant} size="sm">
            {s.label}
          </Badge>
        </div>
        <p className="text-[11px] text-black/35 font-medium flex items-center gap-1.5 mt-0.5 truncate">
          <span
            className="w-2 h-2 rounded shrink-0"
            style={{ background: conversation.itemColor }}
          />
          {conversation.itemName}
          <span className="mx-0.5 text-black/15">·</span>
          <span className="capitalize">{conversation.participantRole}</span>
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1.5 shrink-0">
        {conversation.status === "active" && (
          <button
            className="w-8 h-8 rounded-xl flex items-center justify-center text-[#C2622A] bg-[#FDE8D8]/60 hover:bg-[#FDE8D8] transition-all"
            title="Propose handoff"
          >
            <Handshake className="w-3.5 h-3.5" />
          </button>
        )}
        <button
          className="w-8 h-8 rounded-xl flex items-center justify-center text-black/30 hover:text-black/60 hover:bg-black/5 transition-all"
          title="More options"
        >
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
