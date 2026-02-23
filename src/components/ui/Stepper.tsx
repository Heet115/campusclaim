import { ReactNode } from "react";
import { Check, X } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Step {
  title: string;
  description?: string;
  icon?: ReactNode;
  /** Override the auto-computed status */
  status?: "complete" | "current" | "upcoming" | "error";
}

interface StepperProps {
  steps: Step[];
  /** 0-indexed current step */
  currentStep: number;
  direction?: "horizontal" | "vertical";
  size?: "sm" | "md" | "lg";
  /** Show step number inside the circle (overridden by icon/check/x) */
  showNumbers?: boolean;
  className?: string;
}

// ─── Stepper ──────────────────────────────────────────────────────────────────

export function Stepper({
  steps,
  currentStep,
  direction = "horizontal",
  size = "md",
  showNumbers = true,
  className = "",
}: StepperProps) {
  const getStatus = (
    i: number,
    step: Step,
  ): "complete" | "current" | "upcoming" | "error" => {
    if (step.status) return step.status;
    if (i < currentStep) return "complete";
    if (i === currentStep) return "current";
    return "upcoming";
  };

  if (direction === "vertical") {
    return (
      <div className={`flex flex-col ${className}`}>
        {steps.map((step, i) => {
          const status = getStatus(i, step);
          const isLast = i === steps.length - 1;
          return (
            <div key={i} className="flex gap-4">
              {/* Left column: circle + connector */}
              <div className="flex flex-col items-center">
                <StepCircle
                  status={status}
                  index={i}
                  size={size}
                  icon={step.icon}
                  showNumbers={showNumbers}
                />
                {!isLast && (
                  <div
                    className={`w-0.5 flex-1 my-1.5 rounded-full transition-colors duration-500 ${
                      status === "complete" ? "bg-[#111010]" : "bg-black/8"
                    }`}
                    style={{ minHeight: 24 }}
                  />
                )}
              </div>

              {/* Right column: text */}
              <div className={`pb-8 ${isLast ? "pb-0" : ""}`}>
                <StepLabel step={step} status={status} size={size} />
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  // Horizontal
  return (
    <div className={`flex items-start ${className}`}>
      {steps.map((step, i) => {
        const status = getStatus(i, step);
        const isLast = i === steps.length - 1;
        return (
          <div key={i} className="flex items-start flex-1">
            {/* Step */}
            <div className="flex flex-col items-center gap-2 shrink-0">
              <StepCircle
                status={status}
                index={i}
                size={size}
                icon={step.icon}
                showNumbers={showNumbers}
              />
              <StepLabel step={step} status={status} size={size} center />
            </div>

            {/* Connector */}
            {!isLast && (
              <div className="flex-1 mt-4 mx-2">
                <div className="relative h-0.5 rounded-full bg-black/8 overflow-hidden">
                  <div
                    className="absolute inset-y-0 left-0 bg-[#111010] rounded-full transition-all duration-500"
                    style={{ width: status === "complete" ? "100%" : "0%" }}
                  />
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

const circleSizes = {
  sm: "w-7 h-7 text-[11px]",
  md: "w-9 h-9 text-[13px]",
  lg: "w-11 h-11 text-[15px]",
};

const iconSizes = {
  sm: "w-3.5 h-3.5",
  md: "w-4 h-4",
  lg: "w-5 h-5",
};

function StepCircle({
  status,
  index,
  size,
  icon,
  showNumbers,
}: {
  status: string;
  index: number;
  size: "sm" | "md" | "lg";
  icon?: ReactNode;
  showNumbers: boolean;
}) {
  const circleBase = `${circleSizes[size]} rounded-full flex items-center justify-center font-bold transition-all duration-300 shrink-0`;

  const styles =
    {
      complete: "bg-[#111010] text-white shadow-sm",
      current: "bg-[#111010] text-white shadow-[0_0_0_4px_rgba(17,16,16,0.1)]",
      upcoming: "bg-white border-2 border-black/[0.1] text-black/30",
      error: "bg-red-500 text-white shadow-sm",
    }[status] ?? "";

  const innerIcon =
    status === "complete" ? (
      <Check className={`${iconSizes[size]}`} strokeWidth={2.5} />
    ) : status === "error" ? (
      <X className={`${iconSizes[size]}`} strokeWidth={2.5} />
    ) : icon ? (
      <span className={`${iconSizes[size]} [&>svg]:w-full [&>svg]:h-full`}>
        {icon}
      </span>
    ) : showNumbers ? (
      index + 1
    ) : null;

  return <div className={`${circleBase} ${styles}`}>{innerIcon}</div>;
}

function StepLabel({
  step,
  status,
  size,
  center = false,
}: {
  step: Step;
  status: string;
  size: "sm" | "md" | "lg";
  center?: boolean;
}) {
  const titleSizes = {
    sm: "text-[12px]",
    md: "text-[13px]",
    lg: "text-[14px]",
  };
  const descSizes = { sm: "text-[11px]", md: "text-[12px]", lg: "text-[13px]" };

  return (
    <div className={center ? "text-center" : ""}>
      <p
        className={`font-semibold leading-tight ${titleSizes[size]} ${
          status === "current"
            ? "text-[#111010]"
            : status === "complete"
              ? "text-[#111010]/60"
              : status === "error"
                ? "text-red-600"
                : "text-black/30"
        }`}
      >
        {step.title}
      </p>
      {step.description && (
        <p
          className={`mt-0.5 font-medium ${descSizes[size]} ${
            status === "upcoming" ? "text-black/20" : "text-black/40"
          }`}
        >
          {step.description}
        </p>
      )}
    </div>
  );
}
