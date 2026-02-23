// app/(protected)/error.tsx
// Error boundary scoped to the protected app shell.
// Next.js requires this to be a Client Component.

"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function ProtectedError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6 animate-fade-up">
      {/* Icon */}
      <div className="w-16 h-16 rounded-[22px] bg-red-50 border border-red-100 flex items-center justify-center mb-6">
        <AlertTriangle className="w-7 h-7 text-red-400" />
      </div>

      <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-black/30 mb-2">
        Unexpected error
      </p>
      <h2 className="font-display text-[40px] italic text-[#111010] leading-[0.9] mb-4">
        Something broke.
      </h2>
      <p className="text-[14px] font-medium text-black/40 leading-relaxed max-w-sm mb-2">
        An error occurred while rendering this page. Your data is safe — try
        refreshing or go back to the dashboard.
      </p>

      {error.message && (
        <p className="text-[11px] font-mono text-black/25 bg-black/4 rounded-xl px-4 py-2 border border-black/5 mt-3 mb-6 max-w-xs leading-relaxed">
          {error.message}
        </p>
      )}

      <div className="flex gap-3 mt-4">
        <Button
          variant="primary"
          size="sm"
          className="btn-magnetic"
          icon={<RefreshCw className="w-3.5 h-3.5" />}
          iconPosition="left"
          onClick={reset}
        >
          Try again
        </Button>
        <Button
          href="/dashboard"
          variant="outline"
          size="sm"
          icon={<Home className="w-3.5 h-3.5" />}
          iconPosition="left"
        >
          Dashboard
        </Button>
      </div>
    </div>
  );
}
