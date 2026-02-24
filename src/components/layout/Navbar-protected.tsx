"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Search,
  LayoutDashboard,
  Package,
  FileText,
  MessageSquare,
  ShieldCheck,
  Bell,
  ChevronDown,
  LogOut,
  Settings,
  User,
} from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { useState, useRef, useEffect } from "react";

// ─── Nav links ────────────────────────────────────────────────────────────────

const navLinks = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboard className="w-3.5 h-3.5" />,
  },
  {
    label: "Browse",
    href: "/items",
    icon: <Package className="w-3.5 h-3.5" />,
  },
  {
    label: "My Claims",
    href: "/claims",
    icon: <FileText className="w-3.5 h-3.5" />,
  },
  {
    label: "Messages",
    href: "/messages",
    icon: <MessageSquare className="w-3.5 h-3.5" />,
  },
  {
    label: "Admin",
    href: "/admin",
    icon: <ShieldCheck className="w-3.5 h-3.5" />,
  },
];

const userMenuItems = [
  {
    label: "Profile",
    href: "/profile",
    icon: <User className="w-3.5 h-3.5" />,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: <Settings className="w-3.5 h-3.5" />,
  },
  {
    label: "Sign out",
    href: "/login",
    icon: <LogOut className="w-3.5 h-3.5" />,
    danger: true,
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function NavbarProtected() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [signOutOpen, setSignOutOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function onOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
        setNotifOpen(false);
      }
    }
    document.addEventListener("mousedown", onOutside);
    return () => document.removeEventListener("mousedown", onOutside);
  }, []);

  return (
    <>
      <nav className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-5xl">
        <div className="bg-white/60 backdrop-blur-2xl rounded-2xl px-5 py-3 flex items-center justify-between gap-4 border border-black/6 shadow-[0_4px_24px_rgba(0,0,0,0.07),0_1px_2px_rgba(0,0,0,0.04)]">
          {/* ── Logo ── */}
          <Link
            href="/dashboard"
            className="flex items-center gap-2.5 shrink-0 group"
          >
            <div className="w-8 h-8 rounded-xl bg-[#111010] flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
              <Search className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-display italic text-[18px] text-[#111010]">
              CampusClaim
            </span>
          </Link>

          {/* ── Nav links (hidden on small screens) ── */}
          <div className="hidden md:flex items-center gap-1 flex-1 justify-center">
            {navLinks.map((link) => {
              const active =
                pathname === link.href || pathname.startsWith(link.href + "/");
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`
                  flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-[13px] font-semibold
                  transition-all duration-200
                  ${
                    active
                      ? "bg-[#111010] text-white shadow-sm"
                      : "text-black/45 hover:text-black/75 hover:bg-black/5"
                  }
                `}
                >
                  {link.icon}
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* ── Right side ── */}
          <div className="flex items-center gap-2 shrink-0" ref={menuRef}>
            {/* Notification bell */}
            <div className="relative">
              <button
                onClick={() => {
                  setNotifOpen((v) => !v);
                  setMenuOpen(false);
                }}
                className="relative w-9 h-9 rounded-xl flex items-center justify-center text-black/40 hover:text-black/70 hover:bg-black/5 transition-all"
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4" />
                {/* Unread dot */}
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#7EB3F7] rounded-full" />
              </button>

              {/* Notifications panel */}
              {notifOpen && (
                <div className="absolute top-full right-0 mt-2 w-80 bg-white/95 backdrop-blur-2xl rounded-2xl border border-black/6 shadow-[0_16px_48px_-8px_rgba(0,0,0,0.14)] overflow-hidden">
                  <div className="px-5 py-4 border-b border-black/5 flex items-center justify-between">
                    <p className="text-[13px] font-bold text-[#111010]">
                      Notifications
                    </p>
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-[#C8DFFE] text-[#3B7FD4] rounded-full">
                      2 new
                    </span>
                  </div>
                  {[
                    {
                      title: "Your claim was approved",
                      sub: "MacBook Pro · 2 hours ago",
                      dot: "#A8E6C2",
                      read: false,
                    },
                    {
                      title: "New match for Sony XM4",
                      sub: "Cafeteria, Block B · 5 hours ago",
                      dot: "#7EB3F7",
                      read: false,
                    },
                    {
                      title: "Keys claim submitted",
                      sub: "Engineering Block · Yesterday",
                      dot: "#FDB8A0",
                      read: true,
                    },
                  ].map((n, i) => (
                    <div
                      key={i}
                      className={`flex items-start gap-3 px-5 py-3.5 hover:bg-[#F7F4F0]/60 transition-colors cursor-pointer ${!n.read ? "bg-[#F7F4F0]/30" : ""}`}
                    >
                      <span
                        className="w-2 h-2 rounded-full shrink-0 mt-1.5"
                        style={{ background: n.dot }}
                      />
                      <div>
                        <p
                          className={`text-[13px] font-semibold ${n.read ? "text-black/50" : "text-[#111010]"}`}
                        >
                          {n.title}
                        </p>
                        <p className="text-[11px] text-black/35 font-medium mt-0.5">
                          {n.sub}
                        </p>
                      </div>
                      {!n.read && (
                        <span className="ml-auto w-1.5 h-1.5 bg-[#7EB3F7] rounded-full shrink-0 mt-1.5" />
                      )}
                    </div>
                  ))}
                  <div className="px-5 py-3 border-t border-black/5 bg-[#F7F4F0]/40">
                    <button className="text-[12px] font-bold text-[#7EB3F7] hover:text-[#3B7FD4] transition-colors">
                      Mark all as read
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="w-px h-5 bg-black/8 mx-1" />

            {/* User avatar + dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setMenuOpen((v) => !v);
                  setNotifOpen(false);
                }}
                className="flex items-center gap-2 pl-1 pr-2.5 py-1 rounded-xl hover:bg-black/5 transition-all group"
                aria-label="User menu"
                aria-expanded={menuOpen}
              >
                <Avatar name="Maya Patel" size="sm" />
                <div className="hidden sm:block text-left">
                  <p className="text-[12px] font-bold text-[#111010] leading-tight">
                    Maya
                  </p>
                  <p className="text-[10px] text-black/35 font-medium leading-tight">
                    Student
                  </p>
                </div>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-black/30 group-hover:text-black/60 transition-all duration-200 ${menuOpen ? "rotate-180" : ""}`}
                />
              </button>

              {/* User dropdown */}
              {menuOpen && (
                <div className="absolute top-full right-0 mt-2 w-52 bg-white/95 backdrop-blur-2xl rounded-2xl border border-black/6 shadow-[0_16px_48px_-8px_rgba(0,0,0,0.14)] overflow-hidden py-1.5">
                  {/* Profile summary */}
                  <div className="px-4 py-3 border-b border-black/5">
                    <p className="text-[13px] font-bold text-[#111010]">
                      Maya Patel
                    </p>
                    <p className="text-[11px] text-black/35 font-medium truncate">
                      maya@stanford.edu
                    </p>
                  </div>

                  {/* Menu items */}
                  <div className="py-1">
                    {userMenuItems.map((item, i) =>
                      item.danger ? (
                        <button
                          key={i}
                          onClick={() => {
                            setMenuOpen(false);
                            setSignOutOpen(true);
                          }}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-[13px] font-semibold transition-colors hover:bg-red-50 text-red-500"
                        >
                          <span className="text-red-400">{item.icon}</span>
                          {item.label}
                        </button>
                      ) : (
                        <Link
                          key={i}
                          href={item.href}
                          onClick={() => setMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-[13px] font-semibold transition-colors hover:bg-black/5 text-[#111010]/70 hover:text-[#111010]"
                        >
                          <span className="text-black/30">{item.icon}</span>
                          {item.label}
                        </Link>
                      ),
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Mobile nav strip ── */}
        <div className="md:hidden mt-2 bg-white/60 backdrop-blur-2xl rounded-2xl border border-black/6 shadow-[0_4px_24px_rgba(0,0,0,0.05)] px-3 py-2 flex items-center justify-around">
          {navLinks.map((link) => {
            const active =
              pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`
                flex flex-col items-center gap-1 px-3 py-1 rounded-xl text-[10px] font-bold
                transition-all duration-200
                ${active ? "text-[#111010]" : "text-black/35"}
              `}
              >
                <span
                  className={`${active ? "text-[#111010]" : "text-black/30"}`}
                >
                  {link.icon}
                </span>
                {link.label}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Sign out confirmation */}
      <ConfirmDialog
        open={signOutOpen}
        onClose={() => setSignOutOpen(false)}
        onConfirm={() => {
          setSignOutOpen(false);
          router.push("/login");
        }}
        variant="warning"
        title="Sign out?"
        description="You'll need to sign in again to access your account, claims, and messages."
        confirmLabel="Sign out"
        cancelLabel="Cancel"
        icon={<LogOut className="w-6 h-6" />}
      />
    </>
  );
}
