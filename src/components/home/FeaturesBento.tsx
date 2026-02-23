import { Search, Smartphone, MapPin, Shield, Clock } from "lucide-react";
import { Card } from "@/components/ui/Card";

export default function FeaturesBento() {
  return (
    <section className="py-32 px-6 relative bg-[#F7F4F0] overflow-hidden isolate">
      <div className="pointer-events-none absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-[#7EB3F7] blur-[150px] rounded-full -translate-x-1/2 -translate-y-1/2 -z-10 opacity-10" />

      <div className="max-w-6xl mx-auto space-y-16 relative z-10">
        <div className="max-w-xl">
          <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-black/30 mb-4">
            Features
          </p>
          <h2 className="font-display text-[52px] md:text-[68px] italic text-[#111010] leading-[0.9] tracking-tight">
            Built for speed,
            <br />
            <span className="not-italic text-black/25">
              powered by simplicity.
            </span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Wide dark card */}
          <Card
            variant="dark"
            padding="none"
            hover
            className="lg:col-span-2 rounded-[40px] p-10 md:p-14 flex flex-col justify-between overflow-hidden relative min-h-[420px] group"
          >
            <div className="absolute -bottom-20 -right-20 w-[300px] h-[300px] bg-[#7EB3F7] rounded-full blur-[80px] opacity-20 group-hover:opacity-35 transition-opacity pointer-events-none" />
            <div className="relative z-10 max-w-sm space-y-5">
              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center border border-white/10 backdrop-blur-md group-hover:scale-110 transition-transform">
                <Search className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-display text-[40px] italic text-white leading-[0.9]">
                Find it instantly.
              </h3>
              <p className="text-white/40 leading-relaxed font-medium text-[15px]">
                Smart tagging categorizes items as they come in. Search by
                building, color, or even material.
              </p>
            </div>
            {/* Mini search UI mockup */}
            <div className="relative z-10 mt-8 bg-white/5 rounded-2xl p-4 border border-white/10 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <Search className="w-4 h-4 text-white/30 shrink-0" />
                <div className="h-2.5 bg-white/10 rounded-full flex-1" />
                <div className="w-16 h-6 bg-[#7EB3F7]/30 rounded-lg" />
              </div>
              <div className="mt-4 space-y-2">
                {[0.7, 0.5, 0.6].map((w, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-2 rounded-xl bg-white/5"
                  >
                    <div className="w-7 h-7 bg-white/10 rounded-xl shrink-0" />
                    <div
                      className="h-2 bg-white/10 rounded-full"
                      style={{ width: `${w * 100}%` }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Mobile card */}
          <Card
            variant="default"
            padding="none"
            hover
            className="rounded-[40px] p-10 flex flex-col gap-6 group"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#C8DFFE] flex items-center justify-center group-hover:scale-110 transition-transform">
              <Smartphone className="w-7 h-7 text-[#3B7FD4]" />
            </div>
            <div>
              <h3 className="font-display text-[32px] italic text-[#111010] leading-tight mb-3">
                Native Feel.
              </h3>
              <p className="text-black/40 font-medium text-[14px] leading-relaxed">
                Report from the cafeteria while finishing your coffee. Works
                perfectly on any device.
              </p>
            </div>
            {/* Phone frame mini */}
            <div className="mt-auto w-20 h-32 rounded-3xl border-2 border-black/8 bg-[#F7F4F0] mx-auto flex items-center justify-center relative">
              <div className="absolute top-2 w-10 h-1 bg-black/10 rounded-full" />
              <div className="w-10 h-10 rounded-2xl bg-[#C8DFFE]/50 flex items-center justify-center">
                <Search className="w-4 h-4 text-[#3B7FD4]" />
              </div>
            </div>
          </Card>

          {/* Small feature cards */}
          {[
            {
              title: "Precise Tagging",
              desc: "Hall-by-hall accuracy for every reported item.",
              icon: <MapPin className="w-6 h-6" />,
              color: "#FDE8D8",
              text: "#C2622A",
            },
            {
              title: "Secure Portal",
              desc: "Student ID verification before any claim.",
              icon: <Shield className="w-6 h-6" />,
              color: "#D4F4DC",
              text: "#2E7D45",
            },
            {
              title: "Auto Notifications",
              desc: "Instant updates the moment there's a match.",
              icon: <Clock className="w-6 h-6" />,
              color: "#EDE8FD",
              text: "#6B3EDE",
            },
          ].map((item, i) => (
            <Card
              key={i}
              variant="default"
              padding="none"
              hover
              className="rounded-[36px] p-8 flex flex-col gap-5 group"
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform"
                style={{ background: item.color, color: item.text }}
              >
                {item.icon}
              </div>
              <div>
                <h4 className="font-semibold text-[18px] text-[#111010] mb-1.5">
                  {item.title}
                </h4>
                <p className="text-black/40 font-medium text-[13px] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
