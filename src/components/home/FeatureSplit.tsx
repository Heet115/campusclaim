import {
  Image as ImageIcon,
  CheckCircle,
  ArrowRight,
  Zap,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

export default function FeatureSplit() {
  return (
    <section id="features" className="py-32 px-6 relative isolate bg-white">
      <div className="pointer-events-none absolute top-1/2 -left-40 w-[700px] h-[700px] bg-[#7EB3F7] blur-[130px] rounded-full -translate-y-1/2 -z-10 opacity-10" />

      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        {/* Left: Card mockup */}
        <div className="relative order-2 lg:order-1">
          <div className="animate-float bg-[#F7F4F0] rounded-[48px] p-4 border border-black/5 shadow-[0_24px_64px_-16px_rgba(0,0,0,0.12)]">
            <div className="bg-white rounded-[40px] p-8 border border-black/4">
              <div className="flex items-center justify-between pb-5 mb-5 border-b border-black/6">
                <h3 className="font-display italic text-[22px] text-[#111010]">
                  Claim Requests
                </h3>
                <Badge
                  variant="status-amber"
                  size="sm"
                  dot
                  className="uppercase border border-amber-100"
                >
                  3 Pending
                </Badge>
              </div>
              <div className="space-y-3">
                {[
                  {
                    item: "Space Gray MacBook Pro",
                    time: "2 min ago",
                    dot: "#7EB3F7",
                  },
                  {
                    item: "Sony WH-1000XM4",
                    time: "1 hour ago",
                    dot: "#A8E6C2",
                  },
                  {
                    item: "House Keys (Blue Lanyard)",
                    time: "3 hours ago",
                    dot: "#FDB8A0",
                  },
                ].map((row, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-4 rounded-2xl bg-[#F7F4F0]/60 hover:bg-[#F7F4F0] transition-all cursor-pointer group/row"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center shrink-0 border border-black/4 group-hover/row:scale-110 transition-transform">
                        <ImageIcon className="w-4 h-4 text-black/15" />
                      </div>
                      <div>
                        <p className="font-semibold text-[14px] text-[#111010]">
                          {row.item}
                        </p>
                        <p className="text-[11px] font-medium text-black/35 flex items-center gap-1.5 mt-0.5">
                          <span
                            className="w-1.5 h-1.5 rounded-full inline-block"
                            style={{ background: row.dot }}
                          />
                          {row.time}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-black/15 group-hover/row:text-black/40 group-hover/row:translate-x-1 transition-all" />
                  </div>
                ))}
              </div>
              <div className="mt-5 pt-5 border-t border-black/5 flex gap-2">
                <Button
                  variant="primary"
                  size="sm"
                  className="flex-1 rounded-2xl justify-center"
                >
                  Approve All
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex-1 rounded-2xl justify-center"
                >
                  Review
                </Button>
              </div>
            </div>
          </div>

          {/* Floating tag */}
          <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl px-5 py-4 shadow-lg border border-black/6 flex items-center gap-3 z-10">
            <div className="w-8 h-8 rounded-xl bg-[#C8DFFE] flex items-center justify-center">
              <Zap className="w-4 h-4 text-[#3B7FD4]" />
            </div>
            <div>
              <p className="text-[13px] font-bold text-[#111010]">
                Instant match
              </p>
              <p className="text-[11px] text-black/35 font-medium">
                AI-powered verification
              </p>
            </div>
          </div>
        </div>

        {/* Right: Copy */}
        <div className="space-y-10 lg:pl-8 relative z-10 order-1 lg:order-2">
          <div className="space-y-5">
            <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#7EB3F7]">
              Admin Tools
            </p>
            <h2 className="font-display text-[52px] md:text-[68px] italic text-[#111010] leading-[0.9] tracking-tight">
              Verify claims
              <br />
              <span className="not-italic text-black/25 text-[40px] md:text-[52px]">
                with certainty.
              </span>
            </h2>
            <p className="text-[16px] text-black/45 leading-relaxed font-medium max-w-md border-l-2 border-[#7EB3F7] pl-5">
              Our structured verification system makes user validation faster
              than ever. No more messy spreadsheets or email chains.
            </p>
          </div>

          <div className="grid gap-5">
            {[
              {
                title: "Photo Proof Uploads",
                desc: "Users must upload matching photos to verify their identity and ownership.",
                icon: <ImageIcon className="w-4.5 h-4.5 text-[#111010]" />,
                bg: "#C8DFFE",
              },
              {
                title: "One-Click Approval",
                desc: "Admins can verify and approve claims in a single tap from any device.",
                icon: <CheckCircle className="w-4.5 h-4.5 text-[#111010]" />,
                bg: "#D4F4DC",
              },
              {
                title: "Audit Trail",
                desc: "Every action is logged with timestamps for full accountability.",
                icon: <Shield className="w-4.5 h-4.5 text-[#111010]" />,
                bg: "#FDE8D8",
              },
            ].map((ft, i) => (
              <Card
                key={i}
                variant="cream"
                padding="md"
                hover
                className="flex flex-row items-start gap-5 group"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-sm"
                  style={{ background: ft.bg }}
                >
                  {ft.icon}
                </div>
                <div className="space-y-0.5">
                  <h4 className="font-semibold text-[15px] text-[#111010]">
                    {ft.title}
                  </h4>
                  <p className="text-black/40 text-[13px] font-medium leading-relaxed">
                    {ft.desc}
                  </p>
                </div>
              </Card>
            ))}
          </div>

          <Button
            href="/admin"
            variant="primary"
            size="md"
            className="btn-magnetic group"
            icon={
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            }
          >
            Explore admin tools
          </Button>
        </div>
      </div>
    </section>
  );
}
