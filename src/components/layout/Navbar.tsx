import { Search } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function Navbar() {
  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl">
      <div className="bg-[#E8EDF2]/90 backdrop-blur-md rounded-full px-6 py-3 flex items-center justify-between border border-white/50 card-shadow">
        <div className="flex items-center gap-2 lg:w-48">
          <div className="w-8 h-8 rounded-full bg-[#1A1615] flex items-center justify-center">
            <Search className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight text-[#1A1615]">
            CampusClaim
          </span>
        </div>
        <div className="flex items-center gap-4 lg:justify-end">
          <Button
            href="/login"
            variant="glass"
            size="sm"
            className="hidden sm:inline-flex px-3"
          >
            Log in
          </Button>
        </div>
      </div>
    </nav>
  );
}
