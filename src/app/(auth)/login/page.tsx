import Link from "next/link";
import { Search, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#F5F2EF] relative overflow-hidden flex flex-col justify-center selection:bg-[#9CC1E7] selection:text-black padding-y-8">
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#A8C7FA]/30 to-transparent z-10" />
      <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-white/40 blur-[100px] rounded-full z-10 -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[40rem] h-[40rem] bg-white/40 blur-[100px] rounded-full z-10 translate-y-1/3 -translate-x-1/3" />

      <div className="w-full max-w-lg mx-auto px-6 relative z-10">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#6B7280] hover:text-[#1A1615] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        {/* Auth Card */}
        <div className="bg-white/80 backdrop-blur-xl border border-white p-8 md:p-10 rounded-[32px] card-shadow space-y-8">
          {/* Header */}
          <div className="space-y-2 text-center">
            <div className="w-12 h-12 rounded-full bg-[#1A1615] flex items-center justify-center mx-auto mb-6 shadow-xl">
              <Search className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-[#1A1615]">
              Welcome back
            </h1>
            <p className="text-[#6B7280]">
              Please enter your details to sign in.
            </p>
          </div>

          {/* Form */}
          <form className="space-y-5">
            <div className="space-y-2 text-left">
              <label
                htmlFor="email"
                className="text-sm font-semibold text-[#1A1615]"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-3 rounded-[16px] bg-[#F9F8F8] border border-black/5 focus:outline-none focus:ring-2 focus:ring-[#1A1615]/20 transition-all text-[#1A1615]"
                placeholder="you@university.edu"
              />
            </div>

            <div className="space-y-2 text-left">
              <div className="flex justify-between items-center">
                <label
                  htmlFor="password"
                  className="text-sm font-semibold text-[#1A1615]"
                >
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-sm font-semibold text-[#6B7280] hover:text-[#1A1615] transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-3 rounded-[16px] bg-[#F9F8F8] border border-black/5 focus:outline-none focus:ring-2 focus:ring-[#1A1615]/20 transition-all text-[#1A1615]"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-center gap-2 pt-2 pb-2">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 rounded border-gray-300 text-[#1A1615] focus:ring-[#1A1615]/20"
              />
              <label
                htmlFor="remember"
                className="text-sm text-[#6B7280] font-medium"
              >
                Remember for 30 days
              </label>
            </div>

            <Button variant="primary" className="w-full !py-3.5">
              Sign In
            </Button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm font-medium text-[#6B7280]">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-[#1A1615] font-semibold hover:underline underline-offset-4"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
