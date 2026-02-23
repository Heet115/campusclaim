import Image from "next/image";
import { ReactNode } from "react";

// ─── Avatar ───────────────────────────────────────────────────────────────────

type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";

interface AvatarProps {
  src?: string;
  name?: string;
  icon?: ReactNode;
  size?: AvatarSize;
  shape?: "circle" | "square";
  status?: "online" | "offline" | "away" | "busy";
  className?: string;
}

const sizes: Record<
  AvatarSize,
  { container: string; text: string; status: string }
> = {
  xs: {
    container: "w-6 h-6 text-[10px]",
    text: "text-[10px]",
    status: "w-1.5 h-1.5 border",
  },
  sm: { container: "w-8 h-8", text: "text-[11px]", status: "w-2 h-2 border" },
  md: {
    container: "w-10 h-10",
    text: "text-[13px]",
    status: "w-2.5 h-2.5 border-2",
  },
  lg: {
    container: "w-14 h-14",
    text: "text-[16px]",
    status: "w-3 h-3 border-2",
  },
  xl: {
    container: "w-20 h-20",
    text: "text-[22px]",
    status: "w-4 h-4 border-2",
  },
};

const statusColors = {
  online: "bg-emerald-400",
  offline: "bg-black/20",
  away: "bg-amber-400",
  busy: "bg-red-400",
};

function getInitials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

/** Deterministic pastel bg from name */
function getColor(name: string) {
  const colors = [
    "bg-[#C8DFFE] text-[#3B7FD4]",
    "bg-[#D4F4DC] text-[#2E7D45]",
    "bg-[#FDE8D8] text-[#C2622A]",
    "bg-[#EDE8FD] text-[#6B3EDE]",
    "bg-[#FDE8F4] text-[#B83580]",
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++)
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return colors[Math.abs(hash) % colors.length];
}

export function Avatar({
  src,
  name = "",
  icon,
  size = "md",
  shape = "circle",
  status,
  className = "",
}: AvatarProps) {
  const { container, text, status: statusSize } = sizes[size];
  const rounded = shape === "circle" ? "rounded-full" : "rounded-xl";
  const color = getColor(name);

  return (
    <div className={`relative inline-flex shrink-0 ${container} ${className}`}>
      {src ? (
        <Image
          src={src}
          alt={name}
          fill
          className={`object-cover ${rounded}`}
        />
      ) : icon ? (
        <div
          className={`w-full h-full ${rounded} bg-[#F7F4F0] border border-black/6 flex items-center justify-center text-black/40`}
        >
          {icon}
        </div>
      ) : (
        <div
          className={`w-full h-full ${rounded} ${color} flex items-center justify-center font-bold ${text} select-none`}
        >
          {getInitials(name) || "?"}
        </div>
      )}

      {status && (
        <span
          className={`absolute bottom-0 right-0 ${statusSize} ${statusColors[status]} ${rounded === "rounded-full" ? "rounded-full" : "rounded-md"} border-white`}
        />
      )}
    </div>
  );
}

// ─── Avatar Group ─────────────────────────────────────────────────────────────

interface AvatarGroupProps {
  users: Array<{ src?: string; name: string }>;
  max?: number;
  size?: AvatarSize;
}

export function AvatarGroup({ users, max = 4, size = "sm" }: AvatarGroupProps) {
  const { container, text } = sizes[size];
  const visible = users.slice(0, max);
  const overflow = users.length - max;

  return (
    <div className="flex items-center -space-x-2">
      {visible.map((u, i) => (
        <div key={i} className="ring-2 ring-white rounded-full" title={u.name}>
          <Avatar src={u.src} name={u.name} size={size} />
        </div>
      ))}
      {overflow > 0 && (
        <div
          className={`${container} rounded-full ring-2 ring-white bg-[#F7F4F0] border border-black/6 flex items-center justify-center font-semibold ${text} text-black/40`}
        >
          +{overflow}
        </div>
      )}
    </div>
  );
}
