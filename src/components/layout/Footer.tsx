import { Search, Linkedin } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#F9F8F8] px-4 md:px-6 pb-6 pt-10">
      <div className="max-w-6xl mx-auto bg-[#FFFFFF] rounded-[32px] p-8 md:p-14 border border-white/50 card-shadow">
        <div className="absolute inset-0 bg-gradient-to-t from-[#A8C7FA]/50 to-transparent z-20" />
        <div className="flex flex-col md:flex-row justify-between gap-12 md:gap-24 mb-16">
          {/* Brand & Description */}
          <div className="max-w-sm space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#1A1615] flex items-center justify-center">
                <Search className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight text-[#1A1615]">
                CampusClaim
              </span>
            </div>
            <p className="text-[#6B7280] text-sm md:text-base leading-relaxed font-medium">
              The smart, centralized Lost & Found portal. Bridging the gap
              between lost items and their rightful owners across modern campus
              environments.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-[#1A1615] flex items-center justify-center hover:scale-110 transition-transform"
                title="LinkedIn"
              >
                <Linkedin
                  className="w-4 h-4 text-white"
                  fill="currentColor"
                  strokeWidth={0}
                />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-[#1A1615] flex items-center justify-center hover:scale-110 transition-transform"
                title="X/Twitter"
              >
                <svg
                  className="w-4 h-4 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div className="flex flex-wrap gap-12 sm:gap-24">
            <div className="space-y-6">
              <h4 className="text-xs font-bold tracking-wider text-[#1A1615] uppercase">
                Pages
              </h4>
              <ul className="space-y-4 text-sm font-medium text-[#6B7280]">
                <li>
                  <Link
                    href="/"
                    className="hover:text-[#1A1615] transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="#features"
                    className="hover:text-[#1A1615] transition-colors"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="/browse"
                    className="hover:text-[#1A1615] transition-colors"
                  >
                    Browse
                  </Link>
                </li>
                <li>
                  <Link
                    href="/report"
                    className="hover:text-[#1A1615] transition-colors"
                  >
                    Report Item
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="text-xs font-bold tracking-wider text-[#1A1615] uppercase">
                Information
              </h4>
              <ul className="space-y-4 text-sm font-medium text-[#6B7280]">
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-[#1A1615] transition-colors"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="hover:text-[#1A1615] transition-colors"
                  >
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="hover:text-[#1A1615] transition-colors"
                  >
                    Terms of use
                  </Link>
                </li>
                <li>
                  <Link
                    href="/guidelines"
                    className="hover:text-[#1A1615] transition-colors"
                  >
                    Guidelines
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Divider & Bottom Section */}
        <div className="pt-8 border-t border-black/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[#6B7280] font-medium">
          <p>
            © {new Date().getFullYear()} CampusClaim. Created for{" "}
            <span className="font-semibold text-[#1A1615]">
              Modern Campuses
            </span>
          </p>
          <p>
            Built with{" "}
            <span className="font-semibold text-[#1A1615]">Next.js</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
