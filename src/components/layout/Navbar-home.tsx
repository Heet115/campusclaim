import { Search } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function Navbar() {
  return (
    <nav className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-5xl">
      <div className="bg-white/60 backdrop-blur-2xl rounded-2xl px-5 py-3 flex items-center justify-between border border-black/6 shadow-[0_4px_24px_rgba(0,0,0,0.07),0_1px_2px_rgba(0,0,0,0.04)]">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#111010] flex items-center justify-center shrink-0 shadow-sm">
            <Search className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="font-display font-bold text-[18px] text-[#111010] tracking-tight italic">
            CampusClaim
          </span>
        </div>
        {/* Auth */}
        <div className="flex items-center gap-2">
          <Button href="/login" variant="ghost" size="sm">
            Log in
          </Button>
          <Button href="/register" variant="primary" size="sm">
            Get started
          </Button>
        </div>
      </div>
    </nav>
  );
}
