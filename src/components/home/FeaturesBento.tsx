import { Search, Smartphone, MapPin, Shield, Clock } from "lucide-react";

export default function FeaturesBento() {
  return (
    <section className="py-40 px-6 relative bg-white overflow-hidden isolate">
      {/* Background glow effects */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 w-[1000px] h-[1000px] bg-[#A8C7FA] blur-[140px] rounded-full -translate-x-1/2 -translate-y-1/2 -z-10 mix-blend-multiply opacity-20" />

      <div className="max-w-6xl mx-auto space-y-20 relative z-10">
        <div className="text-center space-y-6">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter max-w-4xl mx-auto leading-[0.9] text-black italic">
            Built for campus speed,{" "}
            <span className="text-black/20 not-italic">
              powered by simplicity.
            </span>
          </h2>
          <p className="max-w-lg mx-auto text-black/40 font-semibold text-lg">
            Everything you need to manage your lost items in one place.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Top Wide Card */}
          <div className="lg:col-span-2 bg-[#F5F2EF] rounded-[64px] p-10 md:p-16 flex flex-col justify-between overflow-hidden relative min-h-[480px] shadow-sm border border-black/5 hover:shadow-2xl hover:shadow-black/5 transition-all group">
            <div className="relative z-10 max-w-sm space-y-6">
              <div className="w-16 h-16 rounded-[24px] bg-white flex items-center justify-center shadow-sm border border-black/5 group-hover:scale-110 transition-transform">
                <Search className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-4xl font-bold text-black tracking-tighter">
                Find it instantly.
              </h3>
              <p className="text-black/40 leading-relaxed font-bold text-lg">
                Our smart tagging system categorizes items as they come in.
                Search by building, color, or even the material of your lost
                item.
              </p>
            </div>

            {/* Floating Mock UI */}
            <div className="absolute -right-20 -bottom-20 w-[70%] bg-white rounded-[48px] shadow-2xl border border-black/5 p-10 transform rotate-2 group-hover:-translate-y-10 group-hover:rotate-0 transition-all duration-1000 hidden md:block">
              <div className="flex gap-4 mb-8">
                <div className="w-1/2 h-4 bg-black/5 rounded-full" />
                <div className="w-1/4 h-4 bg-[#A8C7FA]/40 rounded-full" />
              </div>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#F5F2EF] rounded-2xl" />
                  <div className="w-2/3 h-3 bg-black/5 rounded-full" />
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#F5F2EF] rounded-2xl" />
                  <div className="w-1/2 h-3 bg-black/5 rounded-full" />
                </div>
              </div>
            </div>
          </div>

          {/* Dark Card */}
          <div className="bg-black rounded-[64px] p-10 md:p-14 text-white flex flex-col justify-between min-h-[400px] relative overflow-hidden group hover:shadow-2xl hover:shadow-black/20 transition-all">
            <div className="relative z-10 space-y-6">
              <div className="w-16 h-16 rounded-[24px] bg-white/10 flex items-center justify-center backdrop-blur-md border border-white/10">
                <Smartphone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-4xl font-bold tracking-tighter">
                Native Feel.
              </h3>
              <p className="text-white/40 leading-relaxed font-bold text-lg">
                Report a lost item sitting in the cafeteria while you&apos;re
                still finishing your coffee.
              </p>
            </div>
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-[#A8C7FA] rounded-full blur-[100px] opacity-20" />
          </div>

          {[
            {
              title: "Precise Tagging",
              desc: "Hall-by-hall accuracy.",
              icon: <MapPin />,
            },
            {
              title: "Secure Portal",
              desc: "Student verification.",
              icon: <Shield />,
            },
            {
              title: "Auto Notifications",
              desc: "Instant updates.",
              icon: <Clock />,
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-[48px] p-10 border border-black/5 shadow-sm hover:shadow-xl hover:shadow-black/5 transition-all flex flex-col gap-6"
            >
              <div className="w-14 h-14 rounded-[20px] bg-[#F5F2EF] flex items-center justify-center">
                {item.icon}
              </div>
              <div className="space-y-2">
                <h4 className="text-2xl font-bold tracking-tighter">
                  {item.title}
                </h4>
                <p className="text-black/40 font-bold">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
