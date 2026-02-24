"use client";

import { useState } from "react";
import {
  Package,
  MapPin,
  MessageSquare,
  Send,
  X,
  CheckCircle,
  Handshake,
  RotateCcw,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";
import { Timeline } from "@/components/ui/Timeline";
import { Textarea } from "@/components/ui/Input";
import { CLAIM_STATUS } from "./ClaimStatus";
import type { Claim } from "./ClaimCard";

export function ClaimDetail({
  claim,
  onClose,
}: {
  claim: Claim;
  onClose: () => void;
}) {
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const s = CLAIM_STATUS[claim.status];

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
            claim.status === "approved" || claim.status === "completed"
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

        {/* Claim message */}
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

      {/* Message composer */}
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
