import { Image as ImageIcon, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function FeatureSplit() {
  return (
    <section id="features" className="py-32 px-6 relative isolate bg-white">
      {/* Background glow behind features */}
      <div className="pointer-events-none absolute top-1/2 -left-20 w-[600px] h-[600px] bg-[#A8C7FA] blur-[100px] rounded-full -translate-y-1/2 -z-10 mix-blend-multiply opacity-20" />

      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
        <div className="relative order-2 lg:order-1">
          {/* Card Mockup */}
          <div className="bg-[#F5F2EF] rounded-[48px] p-4 shadow-xl border border-black/5 transform -rotate-2">
            <div className="bg-white rounded-[40px] p-8 shadow-sm border border-black/5 flex flex-col gap-6">
              <div className="flex items-center justify-between pb-6 border-b border-black/5">
                <h3 className="text-xl font-bold tracking-tighter text-black">
                  Claim Request
                </h3>
                <div className="px-3 py-1 bg-amber-100 text-amber-600 rounded-full text-xs font-bold uppercase">
                  Pending
                </div>
              </div>
              <div className="space-y-4">
                {[
                  { item: "Space Gray Macbook Pro", time: "2 min ago" },
                  { item: "Sony WH-1000XM4", time: "1 hour ago" },
                  { item: "House Keys (Blue)", time: "3 hours ago" },
                ].map((row, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-4 rounded-[24px] bg-[#F5F2EF]/50 hover:bg-[#F5F2EF] transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-[16px] bg-white shadow-sm flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                        <ImageIcon className="w-5 h-5 text-black/20" />
                      </div>
                      <div>
                        <p className="font-bold text-black">{row.item}</p>
                        <p className="text-[12px] font-semibold text-black/40">
                          {row.time}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-10 lg:pl-10 relative z-10 order-1 lg:order-2">
          <div className="space-y-6">
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[0.9] text-black">
              Verify claims <br />
              <span className="text-black/30 text-4xl md:text-5xl tracking-normal">
                with absolute certainty.
              </span>
            </h2>
            <p className="text-lg text-black/50 leading-relaxed font-medium max-w-md italic border-l-2 border-[#A8C7FA] pl-6">
              Our structured verification system makes user validation faster
              than ever before. No more messy spreadsheets.
            </p>
          </div>

          <div className="grid gap-6">
            {[
              {
                title: "Photo Proof Uploads",
                desc: "Users must upload matching photos to verify their identity.",
                icon: <ImageIcon className="w-5 h-5 text-black" />,
              },
              {
                title: "One-Click Approval",
                desc: "Admins can verify and approve claims in a single tap.",
                icon: <CheckCircle className="w-5 h-5 text-black" />,
              },
            ].map((ft, i) => (
              <div key={i} className="flex gap-6 group">
                <div className="w-12 h-12 rounded-[16px] bg-[#F5F2EF] flex items-center justify-center shrink-0 group-hover:bg-[#A8C7FA]/20 transition-colors shadow-inner">
                  {ft.icon}
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-black">{ft.title}</h4>
                  <p className="text-black/40 text-sm font-medium">{ft.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4">
            <Button
              href="/admin"
              className="bg-black text-white px-8 py-4 rounded-full font-bold shadow-lg shadow-black/5 hover:scale-105 transition-transform"
            >
              Learn more about admin tools
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
