import { Search } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white py-32 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12 border-t border-black/5 pt-20">
        <div className="col-span-2 space-y-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center">
              <Search className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tighter text-black">
              CampusClaim
            </span>
          </div>
          <p className="text-black/40 text-lg font-bold leading-tight max-w-xs italic">
            &quot;The most efficient way to track and recover belongings on
            campus.&quot;
          </p>
          <div className="flex items-center gap-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-10 h-10 rounded-full bg-[#F5F2EF] flex items-center justify-center hover:bg-[#A8C7FA]/20 transition-colors cursor-pointer"
              >
                <div className="w-4 h-4 bg-black/40 rounded-sm" />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h4 className="text-[12px] font-bold tracking-widest text-black/30 uppercase">
            Product
          </h4>
          <ul className="space-y-4 text-[14px] font-bold text-black/60">
            <li>
              <Link
                href="#features"
                className="hover:text-black transition-colors"
              >
                Features
              </Link>
            </li>
            <li>
              <Link href="#how" className="hover:text-black transition-colors">
                How it works
              </Link>
            </li>
            <li>
              <Link
                href="#pricing"
                className="hover:text-black transition-colors"
              >
                Pricing
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="text-[12px] font-bold tracking-widest text-black/30 uppercase">
            Resources
          </h4>
          <ul className="space-y-4 text-[14px] font-bold text-black/60">
            <li>
              <Link
                href="/privacy"
                className="hover:text-black transition-colors"
              >
                Privacy
              </Link>
            </li>
            <li>
              <Link
                href="/terms"
                className="hover:text-black transition-colors"
              >
                Terms
              </Link>
            </li>
            <li>
              <Link
                href="/guidelines"
                className="hover:text-black transition-colors"
              >
                Guidelines
              </Link>
            </li>
          </ul>
        </div>

        <div className="col-span-2 md:col-span-1 space-y-6 lg:justify-self-end">
          <h4 className="text-[12px] font-bold tracking-widest text-black/30 uppercase">
            Contact
          </h4>
          <p className="text-[14px] font-bold text-black/60">
            support@campusclaim.edu
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-20 pt-10 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[14px] font-bold text-black/20">
        <p>© {new Date().getFullYear()} CampusClaim</p>
        <p>Digitizing campus since 2024</p>
      </div>
    </footer>
  );
}
