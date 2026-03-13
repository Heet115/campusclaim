"use client";

import Link from "next/link";
import { Search, ArrowRight, Eye, EyeOff, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useState } from "react";

const benefits = [
  "Report found items in under 30 seconds",
  "Instant match notifications to your email",
  "Verified, safe handoff coordination",
];

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<"form" | "success">("form");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1600));
    setLoading(false);
    setStep("success");
  }

  return (
    <div className="min-h-screen bg-[#F7F4F0] relative flex flex-col isolate">
      {/* Background orbs */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-[#C8DFFE] blur-[100px] animate-pulse-glow" />
        <div
          className="absolute top-40 -right-60 w-[500px] h-[500px] bg-[#7EB3F7] blur-[130px] rounded-full opacity-20 animate-pulse-glow"
          style={{ animationDelay: "1.5s" }}
        />
        <div className="absolute bottom-0 -left-40 w-[400px] h-[400px] bg-white blur-[80px] rounded-full opacity-60" />
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
          className="text-[13px] font-semibold text-black/40 hover:text-black/70 transition-colors underline-slide"
        >
          Sign in
        </Link>
      </nav>

      <main className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-4xl">
          {step === "success" ? (
            /* ── Success state ── */
            <div className="animate-fade-up text-center max-w-md mx-auto">
              <div className="w-20 h-20 rounded-[28px] bg-[#D4F4DC] flex items-center justify-center mx-auto mb-6 shadow-sm">
                <CheckCircle className="w-10 h-10 text-[#2E7D45]" />
              </div>
              <h1 className="font-display text-[48px] italic text-[#111010] leading-[0.9] mb-4">
                You&apos;re in!
              </h1>
              <p className="text-[16px] text-black/40 font-medium mb-8">
                Your account is ready. Start finding and returning lost items on
                your campus.
              </p>
              <Button
                href="/dashboard"
                variant="primary"
                size="lg"
                className="btn-magnetic"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Browse lost items
              </Button>
            </div>
          ) : (
            /* ── Form state ── */
            <div className="grid lg:grid-cols-2 gap-12 items-center animate-fade-up">
              {/* Left: value prop */}
              <div className="hidden lg:block space-y-8">
                <div className="space-y-4">
                  <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-black/30">
                    Join the community
                  </p>
                  <h1 className="font-display text-[60px] italic text-[#111010] leading-[0.9] tracking-tight">
                    Find things fast,
                    <br />
                    <span className="not-italic text-black/25">
                      give back faster.
                    </span>
                  </h1>
                  <p className="text-[16px] text-black/45 leading-relaxed font-medium border-l-2 border-[#7EB3F7] pl-5">
                    CampusClaim connects the students who lose things with the
                    ones who find them.
                  </p>
                </div>

                <div className="space-y-3">
                  {benefits.map((b, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-lg bg-[#D4F4DC] flex items-center justify-center shrink-0">
                        <CheckCircle className="w-3.5 h-3.5 text-[#2E7D45]" />
                      </div>
                      <span className="text-[14px] font-medium text-black/60">
                        {b}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Decorative card mockup */}
                <div className="bg-white/70 backdrop-blur-xl rounded-[28px] border border-black/6 p-6 shadow-sm inline-block">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-2xl bg-[#C8DFFE] flex items-center justify-center">
                      <Search className="w-5 h-5 text-[#3B7FD4]" />
                    </div>
                    <div>
                      <p className="text-[13px] font-bold text-[#111010]">
                        Item matched!
                      </p>
                      <p className="text-[11px] text-black/35 font-medium">
                        2 min ago
                      </p>
                    </div>
                    <div className="ml-auto w-2 h-2 bg-[#A8E6C2] rounded-full" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-2.5 bg-[#F7F4F0] rounded-full w-3/4" />
                    <div className="h-2.5 bg-[#F7F4F0] rounded-full w-1/2" />
                  </div>
                </div>
              </div>

              {/* Right: form */}
              <div>
                <div className="mb-8 lg:hidden">
                  <h1 className="font-display text-[48px] italic text-[#111010] leading-[0.9] tracking-tight mb-3">
                    Create account.
                  </h1>
                  <p className="text-[15px] text-black/40 font-medium">
                    Free for all students. No card needed.
                  </p>
                </div>

                <div className="hidden lg:block mb-8">
                  <h2 className="font-display text-[36px] italic text-[#111010] leading-tight mb-2">
                    Create your account.
                  </h2>
                  <p className="text-[14px] text-black/40 font-medium">
                    Free for all students. No card needed.
                  </p>
                </div>

                <div className="bg-white/80 backdrop-blur-xl rounded-[32px] border border-black/6 shadow-[0_24px_64px_-16px_rgba(0,0,0,0.10)] p-8">
                  <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        label="First name"
                        type="text"
                        placeholder="Maya"
                        required
                        autoComplete="given-name"
                      />
                      <Input
                        label="Last name"
                        type="text"
                        placeholder="Patel"
                        required
                        autoComplete="family-name"
                      />
                    </div>
                    <Input
                      label="University email"
                      type="email"
                      placeholder="you@university.edu"
                      required
                      autoComplete="email"
                    />
                    <Input
                      label="Password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Min. 8 characters"
                      required
                      autoComplete="new-password"
                      suffix={
                        <button
                          type="button"
                          onClick={() => setShowPassword((v) => !v)}
                          className="text-black/30 hover:text-black/60 flex transition-colors"
                          aria-label={
                            showPassword ? "Hide password" : "Show password"
                          }
                        >
                          {showPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      }
                    />

                    <p className="text-[12px] text-black/35 font-medium -mt-1">
                      By registering you agree to our{" "}
                      <Link
                        href="/terms"
                        className="text-[#111010] font-semibold hover:text-[#7EB3F7] transition-colors"
                      >
                        Terms
                      </Link>{" "}
                      &amp;{" "}
                      <Link
                        href="/privacy"
                        className="text-[#111010] font-semibold hover:text-[#7EB3F7] transition-colors"
                      >
                        Privacy Policy
                      </Link>
                      .
                    </p>

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
                      {loading ? "Creating account…" : "Create account"}
                    </Button>
                  </form>

                  <div className="flex items-center gap-3 my-6">
                    <div className="flex-1 h-px bg-black/6" />
                    <span className="text-[12px] font-semibold text-black/25 uppercase tracking-widest">
                      or
                    </span>
                    <div className="flex-1 h-px bg-black/6" />
                  </div>

                  <Button
                    variant="secondary"
                    size="md"
                    fullWidth
                    className="gap-3"
                    icon={
                      <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0">
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                    }
                    iconPosition="left"
                  >
                    Continue with Google
                  </Button>
                </div>

                <p className="text-center text-[13px] font-medium text-black/35 mt-6">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="font-semibold text-[#111010] hover:text-[#7EB3F7] transition-colors"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
