import { ReactNode } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface TimelineEvent {
  id?: string | number;
  title: string;
  description?: string;
  timestamp?: string;
  icon?: ReactNode;
  /** Overrides the default dot color */
  color?: "default" | "blue" | "green" | "amber" | "red" | "purple";
  /** Renders a content card below the title */
  content?: ReactNode;
  /** User who performed the action */
  actor?: { name: string; avatar?: string };
}

interface TimelineProps {
  events: TimelineEvent[];
  /** "compact" removes the card shell around content */
  variant?: "default" | "compact" | "feed";
  className?: string;
}

// ─── Colors ───────────────────────────────────────────────────────────────────

const dotColors = {
  default: {
    dot: "bg-[#111010]",
    ring: "ring-[#111010]/10",
    icon: "text-white",
  },
  blue: { dot: "bg-[#7EB3F7]", ring: "ring-[#7EB3F7]/20", icon: "text-white" },
  green: {
    dot: "bg-emerald-500",
    ring: "ring-emerald-500/20",
    icon: "text-white",
  },
  amber: { dot: "bg-amber-400", ring: "ring-amber-400/20", icon: "text-white" },
  red: { dot: "bg-red-500", ring: "ring-red-500/20", icon: "text-white" },
  purple: {
    dot: "bg-violet-500",
    ring: "ring-violet-500/20",
    icon: "text-white",
  },
};

// ─── Timeline ─────────────────────────────────────────────────────────────────

export function Timeline({
  events,
  variant = "default",
  className = "",
}: TimelineProps) {
  return (
    <div className={`flex flex-col ${className}`}>
      {events.map((event, i) => {
        const isLast = i === events.length - 1;
        const c = dotColors[event.color ?? "default"];

        return (
          <div key={event.id ?? i} className="flex gap-4 group">
            {/* Left: dot + connector */}
            <div className="flex flex-col items-center shrink-0">
              <div
                className={`
                  relative z-10 flex items-center justify-center rounded-full
                  transition-all duration-200
                  ${event.icon ? "w-9 h-9" : "w-3 h-3 mt-1"}
                  ${c.dot}
                  ${event.icon ? `ring-4 ${c.ring}` : ""}
                `}
              >
                {event.icon && (
                  <span
                    className={`${c.icon} w-4 h-4 [&>svg]:w-full [&>svg]:h-full`}
                  >
                    {event.icon}
                  </span>
                )}
              </div>
              {!isLast && (
                <div className="w-px flex-1 bg-black/[0.07] my-2 group-last:hidden" />
              )}
            </div>

            {/* Right: content */}
            <div className={`flex-1 min-w-0 ${isLast ? "pb-0" : "pb-6"}`}>
              <div className="flex items-start justify-between gap-3 mb-1">
                <div className="min-w-0">
                  <p className="text-[14px] font-semibold text-[#111010] leading-snug">
                    {event.title}
                  </p>
                  {event.actor && (
                    <p className="text-[12px] text-black/35 font-medium mt-0.5">
                      by {event.actor.name}
                    </p>
                  )}
                </div>
                {event.timestamp && (
                  <time className="text-[12px] font-medium text-black/30 shrink-0 whitespace-nowrap pt-0.5">
                    {event.timestamp}
                  </time>
                )}
              </div>

              {event.description && (
                <p className="text-[13px] text-black/45 font-medium leading-relaxed">
                  {event.description}
                </p>
              )}

              {event.content && variant !== "compact" && (
                <div className="mt-3 bg-[#F7F4F0] rounded-2xl border border-black/5 p-4">
                  {event.content}
                </div>
              )}

              {event.content && variant === "compact" && (
                <div className="mt-2">{event.content}</div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
