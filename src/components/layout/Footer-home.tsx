import { Search } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12 pb-16 border-b border-black/6">
          <div className="col-span-2 space-y-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#111010] flex items-center justify-center shadow-sm">
                <Search className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="font-display font-normal italic text-[20px] text-[#111010]">
                CampusClaim
              </span>
            </div>
            <p className="text-[14px] font-medium text-black/40 leading-relaxed max-w-xs">
              The most efficient way to track and recover belongings on campus.
              Built for students, by students.
            </p>
            <div className="flex items-center gap-3">
              {[...Array(3)].map((i) => (
                <div
                  key={i}
                  className="w-9 h-9 rounded-xl bg-[#F7F4F0] flex items-center justify-center hover:bg-[#C8DFFE]/40 transition-colors cursor-pointer border border-black/4"
                >
                  <div className="w-3.5 h-3.5 bg-black/25 rounded-sm" />
                </div>
              ))}
            </div>
          </div>

          {[
            {
              heading: "Product",
              links: [
                { label: "Features", href: "#features" },
                { label: "How it works", href: "#how" },
                { label: "Pricing", href: "#pricing" },
                { label: "Changelog", href: "/changelog" },
              ],
            },
            {
              heading: "Resources",
              links: [
                { label: "Privacy", href: "/privacy" },
                { label: "Terms", href: "/terms" },
                { label: "Guidelines", href: "/guidelines" },
                { label: "Status", href: "/status" },
              ],
            },
            {
              heading: "Company",
              links: [
                { label: "About", href: "/about" },
                { label: "Blog", href: "/blog" },
                { label: "Careers", href: "/careers" },
                { label: "Contact", href: "/contact" },
              ],
            },
          ].map((col, i) => (
            <div key={i} className="space-y-5">
              <h4 className="text-[11px] font-bold tracking-[0.15em] text-black/25 uppercase">
                {col.heading}
              </h4>
              <ul className="space-y-3.5">
                {col.links.map((l, j) => (
                  <li key={j}>
                    <Link
                      href={l.href}
                      className="text-[13px] font-medium text-black/50 hover:text-black transition-colors underline-slide"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[13px] font-medium text-black/25">
          <p>© {new Date().getFullYear()} CampusClaim. All rights reserved.</p>
          <p>Digitizing campus since 2024 · Made with care ✦</p>
        </div>
      </div>
    </footer>
  );
}
