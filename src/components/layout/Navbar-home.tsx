import { Search } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function Navbar() {
  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl">
      <div className="bg-white/70 backdrop-blur-xl rounded-full px-4 py-2 flex items-center justify-between border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.06)]">
        {/* Logo */}
        <div className="flex items-center gap-2 pl-2">
          <div className="w-8 h-8 rounded-full bg-[#1A1615] flex items-center justify-center shrink-0">
            <Search className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-lg tracking-tighter text-[#1A1615]">
            CampusClaim
          </span>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-2">
          <Button
            href="/login"
            variant="primary"
            size="sm"
            className="hidden sm:inline-flex text-[14px] font-semibold text-black hover:bg-black/5"
          >
            Log in
          </Button>
        </div>
      </div>
    </nav>
  );
}
