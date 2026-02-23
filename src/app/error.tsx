"use client";

// app/error.tsx  ←  root error boundary (catches errors everywhere)
// Also doubles as (protected)/error.tsx if copied there.

import { useEffect } from "react";
import { AlertTriangle, RefreshCw, Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log to an error-reporting service in production
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#F7F4F0] flex items-center justify-center px-6">
      {/* Background orbs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-red-200 rounded-full blur-[120px] opacity-20" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-[#FDE8D8] rounded-full blur-[100px] opacity-30" />
      </div>

      <div className="relative text-center max-w-md mx-auto animate-fade-up">
        {/* Icon */}
        <div className="w-20 h-20 rounded-[28px] bg-red-50 border border-red-100 flex items-center justify-center mx-auto mb-8 shadow-sm">
          <AlertTriangle className="w-9 h-9 text-red-400" />
        </div>

        {/* Heading */}
        <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-black/30 mb-3">
          Something went wrong
        </p>
        <h1 className="font-display text-[52px] md:text-[64px] italic text-[#111010] leading-[0.9] mb-6">
          Oops.
        </h1>

        {/* Body */}
        <p className="text-[15px] font-medium text-black/45 leading-relaxed mb-2">
          An unexpected error occurred. Don&apos;t worry — your data is safe.
        </p>
        {error.message && (
          <p className="text-[12px] font-mono text-black/25 bg-black/4 rounded-xl px-4 py-2 border border-black/5 mt-4 mb-6 text-left leading-relaxed">
            {error.message}
          </p>
        )}
        {error.digest && (
          <p className="text-[11px] font-medium text-black/20 mb-8">
            Error ID: <span className="font-mono">{error.digest}</span>
          </p>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
          <Button
            variant="primary"
            size="md"
            className="btn-magnetic"
            icon={<RefreshCw className="w-4 h-4" />}
            iconPosition="left"
            onClick={reset}
          >
            Try again
          </Button>
          <Button
            href="/dashboard"
            variant="outline"
            size="md"
            icon={<Home className="w-4 h-4" />}
            iconPosition="left"
          >
            Go to dashboard
          </Button>
          <Button
            variant="ghost"
            size="md"
            icon={<ArrowLeft className="w-4 h-4" />}
            iconPosition="left"
            onClick={() => window.history.back()}
          >
            Go back
          </Button>
        </div>
      </div>
    </div>
  );
}
