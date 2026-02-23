import Link from "next/link";
import { Search, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-[#F5F2EF] relative overflow-hidden flex flex-col justify-center selection:bg-[#9CC1E7] selection:text-black py-12 md:py-20">
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#A8C7FA]/30 to-transparent z-10" />
      <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-white/40 blur-[100px] rounded-full -z-10 -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[40rem] h-[40rem] bg-white/40 blur-[100px] rounded-full -z-10 translate-y-1/3 -translate-x-1/3" />

      <div className="w-full max-w-xl mx-auto px-6 relative z-10">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#6B7280] hover:text-[#1A1615] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        {/* Auth Card */}
        <div className="bg-white/80 backdrop-blur-xl border border-white p-8 md:p-12 rounded-[32px] card-shadow space-y-8">
          {/* Header */}
          <div className="space-y-2 text-center">
            <div className="w-12 h-12 rounded-full bg-[#1A1615] flex items-center justify-center mx-auto mb-6 shadow-xl">
              <Search className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-[#1A1615]">
              Create an account
            </h1>
            <p className="text-[#6B7280]">
              Start managing campus claims today.
            </p>
          </div>

          {/* Form */}
          <form className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-5 z-10 relative">
              <div className="space-y-2 text-left">
                <label
                  htmlFor="firstName"
                  className="text-sm font-semibold text-[#1A1615]"
                >
                  First name
                </label>
                <input
                  type="text"
                  id="firstName"
                  className="w-full px-4 py-3 rounded-[16px] bg-[#F9F8F8] border border-black/5 focus:outline-none focus:ring-2 focus:ring-[#1A1615]/20 transition-all text-[#1A1615]"
                  placeholder="First name"
                />
              </div>
              <div className="space-y-2 text-left">
                <label
                  htmlFor="lastName"
                  className="text-sm font-semibold text-[#1A1615]"
                >
                  Last name
                </label>
                <input
                  type="text"
                  id="lastName"
                  className="w-full px-4 py-3 rounded-[16px] bg-[#F9F8F8] border border-black/5 focus:outline-none focus:ring-2 focus:ring-[#1A1615]/20 transition-all text-[#1A1615]"
                  placeholder="Last name"
                />
              </div>
            </div>

            <div className="space-y-2 text-left">
              <label
                htmlFor="email"
                className="text-sm font-semibold text-[#1A1615]"
              >
                University Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-3 rounded-[16px] bg-[#F9F8F8] border border-black/5 focus:outline-none focus:ring-2 focus:ring-[#1A1615]/20 transition-all text-[#1A1615]"
                placeholder="you@university.edu"
              />
            </div>

            <div className="space-y-2 text-left">
              <label
                htmlFor="password"
                className="text-sm font-semibold text-[#1A1615]"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-3 rounded-[16px] bg-[#F9F8F8] border border-black/5 focus:outline-none focus:ring-2 focus:ring-[#1A1615]/20 transition-all text-[#1A1615]"
                placeholder="Create a password (min. 8 characters)"
              />
            </div>

            <div className="pt-2">
              <Button variant="primary" className="w-full !py-3.5">
                Create Account
              </Button>
            </div>
          </form>

          {/* Footer */}
          <p className="text-center text-sm font-medium text-[#6B7280]">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-[#1A1615] font-semibold hover:underline underline-offset-4"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
