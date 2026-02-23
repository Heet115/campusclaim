"use client";

import {
  forwardRef,
  InputHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Search, X, Loader2 } from "lucide-react";

interface SearchInputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "prefix" | "suffix" | "size"
> {
  /** Called with debounced value */
  onSearch?: (value: string) => void;
  /** Debounce delay in ms. Default: 300 */
  debounce?: number;
  loading?: boolean;
  /** Show shortcut hint e.g. "⌘K" */
  shortcut?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizes = {
  sm: {
    wrap: "rounded-xl px-3 py-2",
    icon: "w-3.5 h-3.5",
    input: "text-[13px]",
  },
  md: { wrap: "rounded-2xl px-4 py-3", icon: "w-4 h-4", input: "text-[14px]" },
  lg: {
    wrap: "rounded-2xl px-5 py-3.5",
    icon: "w-4.5 h-4.5",
    input: "text-[15px]",
  },
};

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      onSearch,
      debounce = 300,
      loading = false,
      shortcut,
      size = "md",
      className = "",
      placeholder = "Search…",
      value: externalValue,
      ...props
    },
    ref,
  ) => {
    const { wrap, icon, input } = sizes[size];
    const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

    // Controlled / uncontrolled hybrid — no setState-in-effect needed.
    const isControlled = externalValue !== undefined;
    const [internalValue, setInternalValue] = useState(
      isControlled ? (externalValue as string) : "",
    );
    const value = isControlled ? (externalValue as string) : internalValue;

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const v = e.target.value;
        if (!isControlled) setInternalValue(v);
        clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => onSearch?.(v), debounce);
      },
      [debounce, isControlled, onSearch],
    );

    const handleClear = () => {
      if (!isControlled) setInternalValue("");
      onSearch?.("");
      if (ref && "current" in ref) ref.current?.focus();
    };

    // Cleanup timer on unmount
    useEffect(() => () => clearTimeout(timerRef.current), []);

    return (
      <div
        className={`
          flex items-center gap-2.5 w-full ${wrap}
          bg-[#F7F4F0] border border-black/8
          transition-all duration-200
          focus-within:bg-white focus-within:border-[#7EB3F7] focus-within:ring-4 focus-within:ring-[#7EB3F7]/10
          ${className}
        `}
      >
        {/* Search icon or spinner */}
        <span
          className={`shrink-0 ${icon} transition-colors ${value ? "text-[#111010]/50" : "text-black/25"}`}
        >
          {loading ? (
            <Loader2 className={`${icon} animate-spin text-[#7EB3F7]`} />
          ) : (
            <Search className={icon} />
          )}
        </span>

        <input
          ref={ref}
          type="search"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className={`
            flex-1 bg-transparent ${input} text-[#111010] placeholder:text-black/25
            outline-none min-w-0
            [&::-webkit-search-cancel-button]:hidden
          `}
          {...props}
        />

        {/* Clear button */}
        {value && !loading && (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Clear search"
            className="shrink-0 w-5 h-5 rounded-md bg-black/6 flex items-center justify-center hover:bg-black/10 transition-colors"
          >
            <X className="w-3 h-3 text-black/40" />
          </button>
        )}

        {/* Keyboard shortcut badge */}
        {shortcut && !value && (
          <kbd className="shrink-0 hidden sm:flex items-center px-1.5 py-0.5 bg-white border border-black/8 rounded-md text-[11px] font-semibold text-black/30 shadow-sm gap-0.5">
            {shortcut}
          </kbd>
        )}
      </div>
    );
  },
);
SearchInput.displayName = "SearchInput";
