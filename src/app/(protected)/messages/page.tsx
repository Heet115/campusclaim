"use client";

import { useState, useRef, useEffect } from "react";
import {
  MessageSquare,
  Search,
  X,
  ArrowRight,
  Shield,
  CheckCircle,
  Package,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import {
  ConversationRow,
  ChatBubble,
  DateSeparator,
  ChatHeader,
  MessageComposer,
  type Conversation,
  type Message,
} from "@/components/messages";

// ─── Mock conversations ───────────────────────────────────────────────────────

const CONVERSATIONS: Conversation[] = [
  {
    id: "c1",
    participant: "Alex R.",
    participantRole: "finder",
    itemName: 'MacBook Pro 14"',
    itemColor: "#C8DFFE",
    itemText: "#3B7FD4",
    itemPhoto:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=200&q=80",
    lastMessage: "Great, see you at the library entrance tomorrow at 2 PM!",
    lastMessageTime: "2 min",
    unreadCount: 2,
    status: "handoff",
    online: true,
  },
  {
    id: "c2",
    participant: "Priya M.",
    participantRole: "finder",
    itemName: "Sony WH-1000XM4",
    itemColor: "#FDE8D8",
    itemText: "#C2622A",
    lastMessage: "I'm still reviewing the details you sent. Give me a moment.",
    lastMessageTime: "38 min",
    unreadCount: 0,
    status: "active",
    online: true,
  },
  {
    id: "c3",
    participant: "Sam T.",
    participantRole: "finder",
    itemName: "TI-84 Calculator",
    itemColor: "#EDE8FD",
    itemText: "#6B3EDE",
    lastMessage: "Can you describe any marks on the case?",
    lastMessageTime: "2 hr",
    unreadCount: 1,
    status: "active",
    online: false,
  },
  {
    id: "c4",
    participant: "Rohan K.",
    participantRole: "finder",
    itemName: "Blue Hydroflask 32oz",
    itemColor: "#D4F4DC",
    itemText: "#2E7D45",
    lastMessage: "Thanks for picking it up! Glad you got it back 🎉",
    lastMessageTime: "Feb 15",
    unreadCount: 0,
    status: "completed",
  },
  {
    id: "c5",
    participant: "Divya S.",
    participantRole: "claimer",
    itemName: "Red Umbrella",
    itemColor: "#FDE8D8",
    itemText: "#C2622A",
    lastMessage: "Hi! I think the red umbrella at Main Gate might be mine.",
    lastMessageTime: "Feb 20",
    unreadCount: 0,
    status: "active",
  },
];

// ─── Mock messages per conversation ───────────────────────────────────────────

const MOCK_MESSAGES: Record<string, Message[]> = {
  c1: [
    {
      id: "m1",
      sender: "other",
      senderName: "Alex R.",
      text: "Hi Heet! I found your MacBook on the 3rd floor library desk. I verified the small scratch on the lid matches your description.",
      time: "10:15 AM",
      type: "text",
    },
    {
      id: "m2",
      sender: "me",
      senderName: "Heet Viradiya",
      text: "Oh that's amazing! Thank you so much! The serial starts with C02ZK — can you confirm?",
      time: "10:18 AM",
      status: "read",
      type: "text",
    },
    {
      id: "m3",
      sender: "other",
      senderName: "Alex R.",
      text: "Yes that matches! Your claim is approved. Let's arrange a handoff.",
      time: "10:22 AM",
      type: "text",
    },
    {
      id: "m4",
      sender: "me",
      senderName: "Heet Viradiya",
      text: "",
      time: "10:22 AM",
      status: "read",
      type: "system",
    },
    {
      id: "m4s",
      sender: "me",
      senderName: "System",
      text: "Claim approved — handoff mode activated",
      time: "10:22 AM",
      type: "system",
    },
    {
      id: "m5",
      sender: "me",
      senderName: "Heet Viradiya",
      text: "Can we meet at the Library main entrance? I'm free tomorrow between 1-4 PM.",
      time: "10:30 AM",
      status: "read",
      type: "handoff-proposal",
      proposedLocation: "Library, Main Entrance",
      proposedTime: "Tomorrow, 1:00–4:00 PM",
    },
    {
      id: "m6",
      sender: "other",
      senderName: "Alex R.",
      text: "Perfect! Let's do 2 PM. I'll be wearing a blue jacket.",
      time: "10:45 AM",
      type: "text",
    },
    {
      id: "m7",
      sender: "other",
      senderName: "Alex R.",
      text: "Great, see you at the library entrance tomorrow at 2 PM!",
      time: "11:02 AM",
      type: "text",
    },
  ],
  c2: [
    {
      id: "m1",
      sender: "me",
      senderName: "Heet Viradiya",
      text: "Hi Priya! I submitted a claim for the Sony headphones. They're midnight black with a guitar pick keychain on the case zip.",
      time: "9:00 AM",
      status: "read",
      type: "text",
    },
    {
      id: "m2",
      sender: "other",
      senderName: "Priya M.",
      text: "Thanks for the details! Let me check. The ones I found do have a black case.",
      time: "9:05 AM",
      type: "text",
    },
    {
      id: "m3",
      sender: "me",
      senderName: "Heet Viradiya",
      text: "The left ear-cup has a tiny nick near the hinge. Does that match?",
      time: "9:08 AM",
      status: "read",
      type: "text",
    },
    {
      id: "m4",
      sender: "other",
      senderName: "Priya M.",
      text: "I'm still reviewing the details you sent. Give me a moment.",
      time: "9:20 AM",
      type: "text",
    },
  ],
  c3: [
    {
      id: "m1",
      sender: "me",
      senderName: "Heet Viradiya",
      text: "Hi Sam, I claimed the TI-84 calculator from Maths Block R303. It has my name 'Heet Viradiya' in permanent marker on the back.",
      time: "8:30 AM",
      status: "delivered",
      type: "text",
    },
    {
      id: "m2",
      sender: "other",
      senderName: "Sam T.",
      text: "Hi Heet! I can see a name on the back. Let me verify.",
      time: "8:40 AM",
      type: "text",
    },
    {
      id: "m3",
      sender: "other",
      senderName: "Sam T.",
      text: "Can you describe any marks on the case?",
      time: "11:00 AM",
      type: "text",
    },
  ],
  c4: [
    {
      id: "m0",
      sender: "me",
      senderName: "System",
      text: "Handoff completed",
      time: "Feb 15",
      type: "system",
    },
    {
      id: "m1",
      sender: "other",
      senderName: "Rohan K.",
      text: "Just handed off the Hydroflask! Glad it made it back to you.",
      time: "1:00 PM",
      type: "text",
    },
    {
      id: "m2",
      sender: "me",
      senderName: "Heet Viradiya",
      text: "Got it! Thanks so much Rohan, you're a legend 🙏",
      time: "1:02 PM",
      status: "read",
      type: "text",
    },
    {
      id: "m3",
      sender: "other",
      senderName: "Rohan K.",
      text: "Thanks for picking it up! Glad you got it back 🎉",
      time: "1:05 PM",
      type: "text",
    },
  ],
  c5: [
    {
      id: "m1",
      sender: "other",
      senderName: "Divya S.",
      text: "Hi! I think the red umbrella at Main Gate might be mine. It has a wooden handle with a small scratch near the tip.",
      time: "4:30 PM",
      type: "text",
    },
    {
      id: "m2",
      sender: "me",
      senderName: "Heet Viradiya",
      text: "Hi Divya! Yes, the one I found does have a wooden handle. Can you describe anything else specific about it?",
      time: "4:45 PM",
      status: "read",
      type: "text",
    },
  ],
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function MessagesPage() {
  const [selected, setSelected] = useState<Conversation | null>(null);
  const [messages, setMessages] =
    useState<Record<string, Message[]>>(MOCK_MESSAGES);
  const [search, setSearch] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom on new messages / selection change
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selected, messages]);

  // Filter conversations by search
  const filtered = CONVERSATIONS.filter((c) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      c.participant.toLowerCase().includes(q) ||
      c.itemName.toLowerCase().includes(q)
    );
  });

  const totalUnread = CONVERSATIONS.reduce((a, c) => a + c.unreadCount, 0);

  function handleSend(text: string) {
    if (!selected) return;
    const newMsg: Message = {
      id: `new-${Date.now()}`,
      sender: "me",
      senderName: "Heet Viradiya",
      text,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      status: "sent",
      type: "text",
    };
    setMessages((prev) => ({
      ...prev,
      [selected.id]: [...(prev[selected.id] || []), newMsg],
    }));
  }

  const currentMessages = selected ? messages[selected.id] || [] : [];

  return (
    <div className="flex flex-col h-[calc(100vh-11rem)] md:h-[calc(100vh-10rem)]">
      {/* ── Header (fixed) ── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 shrink-0 pb-5">
        <div>
          <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-black/30 mb-2">
            Inbox
          </p>
          <h1 className="font-display text-[44px] md:text-[56px] italic text-[#111010] leading-[0.9]">
            Messages.
          </h1>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          {totalUnread > 0 && (
            <Badge variant="status-blue" size="sm" dot>
              {totalUnread} unread
            </Badge>
          )}
          <Button
            href="/claims"
            variant="outline"
            size="sm"
            icon={<Package className="w-3.5 h-3.5" />}
            iconPosition="left"
          >
            My claims
          </Button>
        </div>
      </div>

      {/* ── Split panel (fills remaining height) ── */}
      <div className="grid lg:grid-cols-[360px_1fr] gap-0 rounded-[28px] overflow-hidden border border-black/6 bg-white shadow-[0_4px_32px_rgba(0,0,0,0.06)] flex-1 min-h-0">
        {/* ── Left: Conversation list ── */}
        <div
          className={`border-r border-black/5 flex flex-col bg-white min-h-0 ${selected ? "hidden lg:flex" : "flex"}`}
        >
          {/* Search header (fixed) */}
          <div className="px-5 pt-5 pb-4 border-b border-black/5 space-y-3 shrink-0">
            <div className="flex items-center justify-between">
              <p className="text-[15px] font-bold text-[#111010]">
                Conversations
              </p>
              <span className="text-[11px] font-bold px-2.5 py-1 bg-[#C8DFFE] text-[#3B7FD4] rounded-full">
                {CONVERSATIONS.length}
              </span>
            </div>
            <div className="flex items-center gap-2 bg-[#F7F4F0] rounded-xl px-3.5 py-2.5 border border-black/5 focus-within:bg-white focus-within:border-[#7EB3F7]/40 focus-within:ring-4 focus-within:ring-[#7EB3F7]/5 transition-all">
              <Search className="w-3.5 h-3.5 text-black/30 shrink-0" />
              <input
                type="text"
                placeholder="Search conversations…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 bg-transparent text-[13px] text-[#111010] placeholder:text-black/30 outline-none"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="text-black/30 hover:text-black/60 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>

          {/* List (scrollable) */}
          <div className="flex-1 overflow-y-auto min-h-0">
            {filtered.length === 0 ? (
              <EmptyState
                icon={<MessageSquare />}
                title="No conversations found"
                description="Try a different search term."
                size="sm"
              />
            ) : (
              filtered.map((c) => (
                <ConversationRow
                  key={c.id}
                  conversation={c}
                  active={selected?.id === c.id}
                  onClick={() => setSelected(c)}
                />
              ))
            )}
          </div>

          {/* Safety tip (fixed at bottom of sidebar) */}
          <div className="shrink-0 px-4 py-3 border-t border-black/5 bg-[#F7F4F0]/60">
            <div className="flex items-start gap-2.5">
              <Shield className="w-3.5 h-3.5 text-[#7EB3F7] shrink-0 mt-0.5" />
              <p className="text-[11px] font-medium text-black/35 leading-relaxed">
                All messages are between{" "}
                <span className="font-semibold text-black/50">
                  verified campus users
                </span>
                . Meet in public for handoffs.
              </p>
            </div>
          </div>
        </div>

        {/* ── Right: Chat area ── */}
        <div
          className={`flex flex-col bg-[#FAFAF8] min-h-0 ${!selected ? "hidden lg:flex" : "flex"}`}
        >
          {selected ? (
            <>
              {/* Chat header (fixed) */}
              <ChatHeader
                conversation={selected}
                onBack={() => setSelected(null)}
              />

              {/* Messages body (only this scrolls) */}
              <div className="flex-1 overflow-y-auto min-h-0 px-5 py-4 space-y-2">
                {/* Item context card */}
                <div className="flex justify-center mb-4">
                  <div className="inline-flex items-center gap-2.5 bg-white rounded-2xl border border-black/6 px-4 py-2.5 shadow-sm">
                    {selected.itemPhoto ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={selected.itemPhoto}
                        alt={selected.itemName}
                        className="w-8 h-8 rounded-xl object-cover shrink-0"
                      />
                    ) : (
                      <div
                        className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: selected.itemColor }}
                      >
                        <Package
                          className="w-4 h-4"
                          style={{ color: selected.itemText }}
                        />
                      </div>
                    )}
                    <div>
                      <p className="text-[12px] font-bold text-[#111010] leading-tight">
                        {selected.itemName}
                      </p>
                      <p className="text-[10px] text-black/35 font-medium">
                        {selected.participantRole === "finder"
                          ? "Finder"
                          : "Claimer"}
                        : {selected.participant}
                      </p>
                    </div>
                  </div>
                </div>

                <DateSeparator label="Today" />

                {currentMessages.map((msg) => (
                  <ChatBubble key={msg.id} message={msg} />
                ))}
                <div ref={chatEndRef} />
              </div>

              {/* Composer (fixed at bottom) */}
              {selected.status !== "completed" ? (
                <MessageComposer onSend={handleSend} />
              ) : (
                <div className="border-t border-black/5 p-5 bg-white/80 backdrop-blur-xl shrink-0">
                  <div className="flex items-center gap-3 bg-[#D4F4DC]/40 rounded-2xl border border-[#A8E6C2]/40 px-4 py-3">
                    <CheckCircle className="w-4 h-4 text-[#2E7D45] shrink-0" />
                    <p className="text-[13px] font-semibold text-[#2E7D45]">
                      This item has been returned. Conversation closed.
                    </p>
                  </div>
                </div>
              )}
            </>
          ) : (
            /* Empty state when nothing selected */
            <div className="flex-1 flex items-center justify-center p-8">
              <div className="text-center space-y-5 max-w-xs">
                <div className="w-20 h-20 rounded-[28px] bg-[#F7F4F0] border border-black/6 flex items-center justify-center mx-auto">
                  <MessageSquare className="w-9 h-9 text-black/15" />
                </div>
                <div className="space-y-2">
                  <p className="font-display text-[24px] italic text-[#111010] leading-tight">
                    Select a conversation
                  </p>
                  <p className="text-[13px] text-black/40 font-medium leading-relaxed">
                    Choose a conversation from the sidebar to start messaging.
                    All conversations are linked to an active claim.
                  </p>
                </div>
                <Button
                  href="/claims"
                  variant="outline"
                  size="sm"
                  icon={<ArrowRight className="w-3.5 h-3.5" />}
                >
                  View my claims
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
