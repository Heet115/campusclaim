"use client";

import { Check, CheckCheck, Clock } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";

export interface Message {
  id: string;
  sender: "me" | "other";
  senderName: string;
  text: string;
  time: string;
  status?: "sending" | "sent" | "delivered" | "read";
  type?: "text" | "system" | "handoff-proposal";
  proposedLocation?: string;
  proposedTime?: string;
}

function StatusIcon({ status }: { status: Message["status"] }) {
  if (!status) return null;
  switch (status) {
    case "sending":
      return <Clock className="w-3 h-3 text-black/20" />;
    case "sent":
      return <Check className="w-3 h-3 text-black/25" />;
    case "delivered":
      return <CheckCheck className="w-3 h-3 text-black/25" />;
    case "read":
      return <CheckCheck className="w-3 h-3 text-[#3B7FD4]" />;
  }
}

export function ChatBubble({ message }: { message: Message }) {
  const isMe = message.sender === "me";

  // ─── System message ───
  if (message.type === "system") {
    return (
      <div className="flex items-center justify-center gap-3 py-3">
        <div className="h-px flex-1 bg-black/5" />
        <p className="text-[11px] font-bold text-black/25 uppercase tracking-wider shrink-0 px-2">
          {message.text}
        </p>
        <div className="h-px flex-1 bg-black/5" />
      </div>
    );
  }

  // ─── Handoff proposal ───
  if (message.type === "handoff-proposal") {
    return (
      <div
        className={`flex gap-2.5 ${isMe ? "justify-end" : "justify-start"} mb-1`}
      >
        {!isMe && <Avatar name={message.senderName} size="xs" />}
        <div
          className={`max-w-[320px] rounded-[20px] overflow-hidden ${isMe ? "bg-[#111010]" : "bg-white border border-black/6 shadow-sm"}`}
        >
          <div
            className={`px-4 py-2.5 border-b ${isMe ? "border-white/10" : "border-black/5"}`}
          >
            <p
              className={`text-[11px] font-bold uppercase tracking-wider ${isMe ? "text-[#A8E6C2]" : "text-[#2E7D45]"}`}
            >
              📍 Handoff proposal
            </p>
          </div>
          <div className="px-4 py-3 space-y-1.5">
            <p
              className={`text-[13px] font-medium leading-relaxed ${isMe ? "text-white/90" : "text-black/70"}`}
            >
              {message.text}
            </p>
            {message.proposedLocation && (
              <p
                className={`text-[12px] font-semibold ${isMe ? "text-white/60" : "text-black/45"}`}
              >
                📌 {message.proposedLocation}
              </p>
            )}
            {message.proposedTime && (
              <p
                className={`text-[12px] font-semibold ${isMe ? "text-white/60" : "text-black/45"}`}
              >
                🕐 {message.proposedTime}
              </p>
            )}
          </div>
          <div
            className={`px-4 py-2 flex items-center justify-between ${isMe ? "bg-white/5" : "bg-[#F7F4F0]/60"}`}
          >
            <span
              className={`text-[10px] font-medium ${isMe ? "text-white/30" : "text-black/25"}`}
            >
              {message.time}
            </span>
            {isMe && <StatusIcon status={message.status} />}
          </div>
        </div>
      </div>
    );
  }

  // ─── Normal text message ───
  return (
    <div
      className={`flex gap-2.5 ${isMe ? "justify-end" : "justify-start"} mb-1`}
    >
      {!isMe && <Avatar name={message.senderName} size="xs" />}
      <div
        className={`
        max-w-[320px] px-4 py-2.5
        ${
          isMe
            ? "bg-[#111010] text-white rounded-[20px] rounded-br-lg"
            : "bg-white border border-black/6 text-black/70 rounded-[20px] rounded-bl-lg shadow-sm"
        }
      `}
      >
        <p
          className={`text-[13px] font-medium leading-relaxed ${isMe ? "text-white/90" : "text-black/70"}`}
        >
          {message.text}
        </p>
        <div
          className={`flex items-center justify-end gap-1.5 mt-1 ${isMe ? "text-white/30" : "text-black/25"}`}
        >
          <span className="text-[10px] font-medium">{message.time}</span>
          {isMe && <StatusIcon status={message.status} />}
        </div>
      </div>
    </div>
  );
}

// ─── Date separator ────────────────────────────────────────────────────────────

export function DateSeparator({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-center py-4">
      <span className="bg-[#F7F4F0] border border-black/5 text-[10px] font-bold text-black/30 uppercase tracking-widest rounded-full px-3.5 py-1">
        {label}
      </span>
    </div>
  );
}
