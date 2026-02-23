"use client";

import Link from "next/link";
import { Search, ArrowRight, ArrowLeft, Mail } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1400));
    setLoading(false);
    setSent(true);
  }

  return (
    <div className="min-h-screen bg-[#F7F4F0] relative flex flex-col isolate">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-[#C8DFFE] blur-[100px] animate-pulse-glow" />
        <div
          className="absolute top-40 -right-60 w-[500px] h-[500px] bg-[#7EB3F7] blur-[130px] rounded-full opacity-15 animate-pulse-glow"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 pt-8">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-xl bg-[#111010] flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
            <Search className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="font-display italic text-[18px] text-[#111010]">
            CampusClaim
          </span>
        </Link>
        <Link
          href="/login"
          className="flex items-center gap-1.5 text-[13px] font-semibold text-black/40 hover:text-black/70 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to sign in
        </Link>
      </nav>

      <main className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-md animate-fade-up">
          {sent ? (
            /* ── Sent state ── */
            <div className="text-center">
              <div className="w-20 h-20 rounded-[28px] bg-[#C8DFFE] flex items-center justify-center mx-auto mb-6 animate-float">
                <Mail className="w-10 h-10 text-[#3B7FD4]" />
              </div>
              <h1 className="font-display text-[48px] italic text-[#111010] leading-[0.9] mb-4">
                Check your inbox.
              </h1>
              <p className="text-[15px] text-black/45 font-medium leading-relaxed mb-2">
                We&apos;ve sent a reset link to
              </p>
              <p className="text-[15px] font-bold text-[#111010] mb-8">
                {email}
              </p>
              <div className="bg-white/80 backdrop-blur-xl rounded-[28px] border border-black/6 p-6 shadow-sm mb-6 text-left">
                <p className="text-[13px] text-black/50 font-medium leading-relaxed">
                  Didn&apos;t receive it? Check your spam folder, or wait a few
                  minutes before requesting another link.
                </p>
              </div>
              <Button
                variant="outline"
                size="md"
                fullWidth
                onClick={() => {
                  setSent(false);
                  setEmail("");
                }}
              >
                Try a different email
              </Button>
              <p className="text-[13px] font-medium text-black/35 mt-4">
                <Link
                  href="/login"
                  className="font-semibold text-[#111010] hover:text-[#7EB3F7] transition-colors"
                >
                  Return to sign in
                </Link>
              </p>
            </div>
          ) : (
            /* ── Form state ── */
            <>
              <div className="text-center mb-10">
                <div className="w-14 h-14 rounded-2xl bg-[#FDE8D8] flex items-center justify-center mx-auto mb-5">
                  <Mail className="w-7 h-7 text-[#C2622A]" />
                </div>
                <h1 className="font-display text-[48px] italic text-[#111010] leading-[0.9] tracking-tight mb-3">
                  Forgot password?
                </h1>
                <p className="text-[15px] text-black/40 font-medium">
                  No worries. Enter your email and we&apos;ll send a reset link.
                </p>
              </div>

              <div className="bg-white/80 backdrop-blur-xl rounded-[32px] border border-black/6 shadow-[0_24px_64px_-16px_rgba(0,0,0,0.10)] p-8">
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <Input
                    label="Email address"
                    type="email"
                    placeholder="you@university.edu"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                  />
                  <Button
                    variant="primary"
                    size="md"
                    fullWidth
                    loading={loading}
                    disabled={loading}
                    className="btn-magnetic"
                    icon={<ArrowRight className="w-4 h-4" />}
                    type="submit"
                  >
                    {loading ? "Sending…" : "Send reset link"}
                  </Button>
                </form>
              </div>

              <p className="text-center text-[13px] font-medium text-black/35 mt-6">
                Remembered your password?{" "}
                <Link
                  href="/login"
                  className="font-semibold text-[#111010] hover:text-[#7EB3F7] transition-colors"
                >
                  Sign in
                </Link>
              </p>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
