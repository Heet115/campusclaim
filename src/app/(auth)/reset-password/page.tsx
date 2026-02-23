"use client";

import Link from "next/link";
import {
  Search,
  ArrowRight,
  Eye,
  EyeOff,
  CheckCircle,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useState } from "react";

function StrengthBar({ password }: { password: string }) {
  const checks = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[0-9]/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ];
  const score = checks.filter(Boolean).length;

  const colors = [
    "bg-red-400",
    "bg-amber-400",
    "bg-yellow-400",
    "bg-[#A8E6C2]",
    "bg-[#2E7D45]",
  ];
  const labels = ["", "Weak", "Fair", "Good", "Strong"];

  if (!password) return null;

  return (
    <div className="space-y-1.5 -mt-1">
      <div className="flex gap-1.5">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-all duration-400 ${
              i < score ? colors[score] : "bg-black/8"
            }`}
          />
        ))}
      </div>
      {score > 0 && (
        <p
          className={`text-[11px] font-semibold ${score < 2 ? "text-red-400" : score < 3 ? "text-amber-500" : score < 4 ? "text-yellow-600" : "text-[#2E7D45]"}`}
        >
          {labels[score]}
        </p>
      )}
    </div>
  );
}

export default function ResetPasswordPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const mismatch = confirm.length > 0 && password !== confirm;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (mismatch) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1400));
    setLoading(false);
    setDone(true);
  }

  return (
    <div className="min-h-screen bg-[#F7F4F0] relative flex flex-col isolate">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-[#C8DFFE] blur-[100px] animate-pulse-glow" />
        <div
          className="absolute top-60 -left-40 w-[500px] h-[500px] bg-[#7EB3F7] blur-[130px] rounded-full opacity-20 animate-pulse-glow"
          style={{ animationDelay: "1s" }}
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
      </nav>

      <main className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-md animate-fade-up">
          {done ? (
            /* ── Success state ── */
            <div className="text-center">
              <div className="w-20 h-20 rounded-[28px] bg-[#D4F4DC] flex items-center justify-center mx-auto mb-6 animate-float shadow-sm">
                <CheckCircle className="w-10 h-10 text-[#2E7D45]" />
              </div>
              <h1 className="font-display text-[48px] italic text-[#111010] leading-[0.9] mb-4">
                Password updated!
              </h1>
              <p className="text-[15px] text-black/45 font-medium leading-relaxed mb-8">
                Your password has been changed. You can now sign in with your
                new credentials.
              </p>
              <Button
                href="/login"
                variant="primary"
                size="lg"
                fullWidth
                className="btn-magnetic"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Sign in now
              </Button>
            </div>
          ) : (
            /* ── Form state ── */
            <>
              <div className="text-center mb-10">
                <div className="w-14 h-14 rounded-2xl bg-[#D4F4DC] flex items-center justify-center mx-auto mb-5">
                  <ShieldCheck className="w-7 h-7 text-[#2E7D45]" />
                </div>
                <h1 className="font-display text-[48px] italic text-[#111010] leading-[0.9] tracking-tight mb-3">
                  New password.
                </h1>
                <p className="text-[15px] text-black/40 font-medium">
                  Choose a strong password for your account.
                </p>
              </div>

              <div className="bg-white/80 backdrop-blur-xl rounded-[32px] border border-black/6 shadow-[0_24px_64px_-16px_rgba(0,0,0,0.10)] p-8">
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="flex flex-col gap-2">
                    <Input
                      label="New password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Min. 8 characters"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="new-password"
                      suffix={
                        <button
                          type="button"
                          onClick={() => setShowPassword((v) => !v)}
                          className="text-black/30 hover:text-black/60 flex transition-colors"
                          aria-label={showPassword ? "Hide" : "Show"}
                        >
                          {showPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      }
                    />
                    <StrengthBar password={password} />
                  </div>

                  <Input
                    label="Confirm password"
                    type={showConfirm ? "text" : "password"}
                    placeholder="Repeat your password"
                    required
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    autoComplete="new-password"
                    error={mismatch ? "Passwords don't match" : undefined}
                    suffix={
                      <button
                        type="button"
                        onClick={() => setShowConfirm((v) => !v)}
                        className="text-black/30 hover:text-black/60 flex transition-colors"
                        aria-label={showConfirm ? "Hide" : "Show"}
                      >
                        {showConfirm ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    }
                  />

                  <Button
                    variant="primary"
                    size="md"
                    fullWidth
                    loading={loading}
                    disabled={loading || mismatch || password.length < 8}
                    className="btn-magnetic mt-1"
                    icon={<ArrowRight className="w-4 h-4" />}
                    type="submit"
                  >
                    {loading ? "Updating…" : "Update password"}
                  </Button>
                </form>
              </div>

              <p className="text-center text-[13px] font-medium text-black/35 mt-6">
                <Link
                  href="/login"
                  className="font-semibold text-[#111010] hover:text-[#7EB3F7] transition-colors"
                >
                  Back to sign in
                </Link>
              </p>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
