// ─── ProgressBar ──────────────────────────────────────────────────────────────

interface ProgressBarProps {
  value: number; // 0–100
  max?: number;
  label?: string;
  showValue?: boolean;
  size?: "xs" | "sm" | "md" | "lg";
  color?: "default" | "blue" | "green" | "amber" | "red";
  /** Striped animated fill */
  animated?: boolean;
  className?: string;
}

const barSizes = { xs: "h-1", sm: "h-1.5", md: "h-2.5", lg: "h-4" };

const barColors = {
  default: "bg-[#111010]",
  blue: "bg-[#7EB3F7]",
  green: "bg-emerald-500",
  amber: "bg-amber-400",
  red: "bg-red-500",
};

export function ProgressBar({
  value,
  max = 100,
  label,
  showValue = false,
  size = "md",
  color = "default",
  animated = false,
  className = "",
}: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={`flex flex-col gap-2 w-full ${className}`}>
      {(label || showValue) && (
        <div className="flex items-center justify-between gap-2">
          {label && (
            <p className="text-[13px] font-semibold text-[#111010]/70">
              {label}
            </p>
          )}
          {showValue && (
            <p className="text-[12px] font-bold text-black/40 tabular-nums">
              {Math.round(pct)}%
            </p>
          )}
        </div>
      )}

      <div
        role="progressbar"
        aria-valuenow={value}
        aria-valuemax={max}
        aria-label={label}
        className={`w-full ${barSizes[size]} bg-black/6 rounded-full overflow-hidden`}
      >
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out ${barColors[color]} ${animated ? "progress-stripe" : ""}`}
          style={{ width: `${pct}%` }}
        />
      </div>

      <style>{`
        .progress-stripe {
          background-size: 20px 20px;
          background-image: linear-gradient(
            45deg,
            rgba(255,255,255,.15) 25%, transparent 25%,
            transparent 50%, rgba(255,255,255,.15) 50%,
            rgba(255,255,255,.15) 75%, transparent 75%, transparent
          );
          animation: stripe 1s linear infinite;
        }
        @keyframes stripe { from { background-position: 0 0; } to { background-position: 20px 0; } }
      `}</style>
    </div>
  );
}

// ─── ProgressCircle ───────────────────────────────────────────────────────────

interface ProgressCircleProps {
  value: number; // 0–100
  size?: number; // px
  strokeWidth?: number;
  color?: "default" | "blue" | "green" | "amber" | "red";
  label?: string;
  children?: React.ReactNode;
  className?: string;
}

const circleColors = {
  default: "#111010",
  blue: "#7EB3F7",
  green: "#34D399",
  amber: "#FBBF24",
  red: "#F87171",
};

export function ProgressCircle({
  value,
  size = 80,
  strokeWidth = 6,
  color = "default",
  label,
  children,
  className = "",
}: ProgressCircleProps) {
  const pct = Math.min(100, Math.max(0, value));
  const r = (size - strokeWidth) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;

  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      <div
        className="relative inline-flex items-center justify-center"
        style={{ width: size, height: size }}
      >
        <svg width={size} height={size} className="-rotate-90">
          {/* Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="rgba(0,0,0,0.06)"
            strokeWidth={strokeWidth}
          />
          {/* Fill */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={circleColors[color]}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={`${dash} ${circ}`}
            style={{
              transition: "stroke-dasharray 0.7s cubic-bezier(0.23,1,0.32,1)",
            }}
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex items-center justify-center">
          {children ?? (
            <span className="text-[13px] font-bold text-[#111010] tabular-nums">
              {Math.round(pct)}%
            </span>
          )}
        </div>
      </div>

      {label && (
        <p className="text-[12px] font-semibold text-black/40">{label}</p>
      )}
    </div>
  );
}

// ─── ProgressSteps — discrete steps progress ─────────────────────────────────

interface ProgressStepsProps {
  total: number;
  current: number;
  label?: string;
  className?: string;
}

export function ProgressSteps({
  total,
  current,
  label,
  className = "",
}: ProgressStepsProps) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <div className="flex justify-between items-center">
          <p className="text-[13px] font-semibold text-[#111010]/70">{label}</p>
          <p className="text-[12px] font-bold text-black/35 tabular-nums">
            {current}/{total}
          </p>
        </div>
      )}
      <div className="flex gap-1.5">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className={`flex-1 h-1.5 rounded-full transition-all duration-500 ${
              i < current ? "bg-[#111010]" : "bg-black/[0.07]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
