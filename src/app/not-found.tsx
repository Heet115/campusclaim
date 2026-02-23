// app/not-found.tsx
// Global 404 page — shown by Next.js when no route matches.

import { Search, Home, Package } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F7F4F0] flex items-center justify-center px-6">
      {/* Background orbs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute top-[-15%] right-[-8%] w-[500px] h-[500px] bg-[#C8DFFE] rounded-full blur-[120px] opacity-25" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-[#FDE8D8] rounded-full blur-[100px] opacity-20" />
      </div>

      <div className="relative w-full max-w-lg mx-auto text-center">
        {/* Giant 404 */}
        <p
          className="font-display text-[160px] md:text-[200px] italic leading-none text-[#111010]/4 select-none"
          aria-hidden="true"
        >
          404
        </p>

        {/* Icon */}
        <div className="w-20 h-20 rounded-[28px] bg-[#C8DFFE] flex items-center justify-center mx-auto -mt-16 mb-8 shadow-sm relative z-10">
          <Search className="w-9 h-9 text-[#3B7FD4]" />
        </div>

        {/* Copy */}
        <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-black/30 mb-3 relative z-10">
          Page not found
        </p>
        <h1 className="font-display text-[52px] md:text-[64px] italic text-[#111010] leading-[0.9] mb-6 relative z-10">
          Lost something?
        </h1>
        <p className="text-[15px] font-medium text-black/40 leading-relaxed mb-10 relative z-10">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Try going back or browsing found items — maybe that&apos;s what you
          were after.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center relative z-10">
          <Button
            href="/dashboard"
            variant="primary"
            size="md"
            className="btn-magnetic"
            icon={<Home className="w-4 h-4" />}
            iconPosition="left"
          >
            Go to dashboard
          </Button>
          <Button
            href="/items"
            variant="outline"
            size="md"
            icon={<Package className="w-4 h-4" />}
            iconPosition="left"
          >
            Browse found items
          </Button>
        </div>

        {/* Helpful links */}
        <div className="mt-12 pt-8 border-t border-black/6 relative z-10">
          <p className="text-[12px] font-bold uppercase tracking-widest text-black/20 mb-4">
            Or try one of these
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { label: "Report lost item", href: "/report/lost" },
              { label: "Report found item", href: "/report/found" },
              { label: "My claims", href: "/claims" },
              { label: "Settings", href: "/settings" },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-[13px] font-semibold text-black/40 hover:text-[#111010] hover:bg-[#F0EDE9] px-4 py-2 rounded-xl border border-black/6 transition-all"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
