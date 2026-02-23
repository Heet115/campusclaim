import {
  forwardRef,
  InputHTMLAttributes,
  ReactNode,
  TextareaHTMLAttributes,
} from "react";

// ─── Input ────────────────────────────────────────────────────────────────────

interface InputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "prefix" | "suffix"
> {
  label?: string;
  hint?: string;
  error?: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
  /** Renders a full-width underline style instead of a bordered box */
  variant?: "default" | "ghost";
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      hint,
      error,
      prefix,
      suffix,
      variant = "default",
      className = "",
      id,
      ...props
    },
    ref,
  ) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

    const wrapperBase =
      "flex items-center gap-2.5 w-full transition-all duration-200";

    const wrapperVariants = {
      default:
        "flex items-center gap-3 w-full border border-black/8 rounded-2xl bg-[#F7F4F0] px-4 py-3.5 transition-all duration-200 focus-within:bg-white focus-within:border-[#7EB3F7]/50 focus-within:ring-4 focus-within:ring-[#7EB3F7]/10",
      ghost:
        "bg-transparent border-b border-black/15 rounded-none px-0 py-2.5 focus-within:border-[#111010]",
    };

    const errorWrapper = error
      ? variant === "default"
        ? "border-red-300 focus-within:border-red-400 focus-within:ring-red-100"
        : "border-red-400"
      : "";

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="text-[13px] font-semibold text-[#111010]/70 select-none"
          >
            {label}
          </label>
        )}

        <div
          className={`${wrapperBase} ${wrapperVariants[variant]} ${errorWrapper}`}
        >
          {prefix && <span className="shrink-0 text-black/30">{prefix}</span>}
          <input
            ref={ref}
            id={inputId}
            className={`flex-1 bg-transparent text-[14px] text-[#111010] placeholder:text-black/25 outline-none min-w-0 ${className}`}
            {...props}
          />
          {suffix && <span className="shrink-0 text-black/30">{suffix}</span>}
        </div>

        {(hint || error) && (
          <p
            className={`text-[12px] font-medium ${error ? "text-red-500" : "text-black/35"}`}
          >
            {error ?? hint}
          </p>
        )}
      </div>
    );
  },
);
Input.displayName = "Input";

// ─── Textarea ─────────────────────────────────────────────────────────────────

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, hint, error, className = "", id, ...props }, ref) => {
    const textareaId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="text-[13px] font-semibold text-[#111010]/70 select-none"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          rows={4}
          className={`
            w-full bg-[#F7F4F0] border rounded-2xl px-4 py-3 resize-none
            text-[14px] text-[#111010] placeholder:text-black/25
            outline-none transition-all duration-200
            focus:bg-white focus:ring-4 focus:ring-[#7EB3F7]/10
            ${
              error
                ? "border-red-300 focus:border-red-400"
                : "border-black/8 focus:border-[#7EB3F7]"
            }
            ${className}
          `}
          {...props}
        />
        {(hint || error) && (
          <p
            className={`text-[12px] font-medium ${error ? "text-red-500" : "text-black/35"}`}
          >
            {error ?? hint}
          </p>
        )}
      </div>
    );
  },
);
Textarea.displayName = "Textarea";
