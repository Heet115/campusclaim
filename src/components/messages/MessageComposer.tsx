"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Paperclip } from "lucide-react";

export function MessageComposer({
  onSend,
  disabled = false,
}: {
  onSend: (text: string) => void;
  disabled?: boolean;
}) {
  const [text, setText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
  }, [text]);

  function handleSend() {
    if (!text.trim() || disabled) return;
    onSend(text.trim());
    setText("");
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="border-t border-black/5 p-4 bg-white/80 backdrop-blur-xl shrink-0">
      <div className="flex items-center gap-2 bg-[#F7F4F0] rounded-2xl border border-black/5 px-4 py-3 focus-within:bg-white focus-within:border-[#7EB3F7]/40 focus-within:ring-4 focus-within:ring-[#7EB3F7]/5 transition-all">
        {/* Attachment actions */}
        <div className="flex items-center gap-0.5 shrink-0 pb-0.5">
          <button
            className="w-7 h-7 rounded-lg flex items-center justify-center text-black/25 hover:text-black/50 hover:bg-black/5 transition-all"
            title="Attach file"
          >
            <Paperclip className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Text input */}
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message…"
          rows={1}
          className="flex-1 bg-transparent text-[14px] text-[#111010] placeholder:text-black/30 outline-none resize-none leading-snug max-h-[120px]"
          disabled={disabled}
        />

        {/* Send button */}
        <button
          onClick={handleSend}
          disabled={!text.trim() || disabled}
          className={`
            w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200
            ${
              text.trim()
                ? "bg-[#111010] text-white shadow-sm hover:bg-[#222] active:scale-95"
                : "bg-black/5 text-black/20 cursor-not-allowed"
            }
          `}
          aria-label="Send message"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>

      <p className="text-[10px] font-medium text-black/20 text-center mt-2">
        Press{" "}
        <kbd className="px-1 py-0.5 bg-[#F7F4F0] border border-black/8 rounded text-[9px] font-bold">
          Enter
        </kbd>{" "}
        to send ·{" "}
        <kbd className="px-1 py-0.5 bg-[#F7F4F0] border border-black/8 rounded text-[9px] font-bold">
          Shift+Enter
        </kbd>{" "}
        for new line
      </p>
    </div>
  );
}
