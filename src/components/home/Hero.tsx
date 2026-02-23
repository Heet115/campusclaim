import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export default function Hero() {
  return (
    <section className="relative pt-48 pb-32 px-6 overflow-hidden min-h-[90vh] flex flex-col items-center isolate">
      <div className="absolute inset-0 -z-20 pointer-events-none">
        {/* Sky Blue Glowing Orbs / Gradient Meshes */}
        <div className="absolute top-0 inset-x-0 h-[800px] bg-linear-to-b from-[#A8C7FA] to-transparent opacity-30" />
        <div className="absolute top-20 -left-40 w-[700px] h-[700px] bg-[#A8C7FA] blur-[120px] rounded-full mix-blend-multiply opacity-40" />
        <div className="absolute top-40 -right-40 w-[800px] h-[800px] bg-white blur-[120px] rounded-full opacity-60" />
      </div>

      <div className="max-w-5xl mx-auto text-center space-y-10 z-10 relative">
        <div className="inline-block">
          <Badge className="border-black/5 bg-white/40 text-[#1A1615] font-semibold py-1.5 px-4 rounded-full backdrop-blur-md">
            <span className="mr-2">✨</span> Trusted by 10,000+ Students
          </Badge>
        </div>

        <h1 className="text-6xl md:text-8xl lg:text-[100px] font-bold tracking-tighter text-[#1A1615] leading-[0.9] filter drop-shadow-sm">
          Lost something?
          <br />
          <span className="text-black/40">Find it in seconds.</span>
        </h1>

        <p className="max-w-xl mx-auto text-lg md:text-xl text-[#1A1615]/60 leading-relaxed font-medium">
          The most powerful lost and found portal ever built for campuses.
          Report, browse, and claim with a single tap.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Button
            href="/report"
            size="lg"
            className="bg-black text-white hover:bg-black/90 rounded-full px-8 py-4 text-[16px] font-bold shadow-xl shadow-black/10 transition-all active:scale-95"
          >
            Report an item
          </Button>
          <Button href="/browse" size="lg" variant="secondary">
            Browse directory
          </Button>
        </div>
      </div>

      {/* Dashboard Mockup - Floating Up */}
      <div className="mt-32 w-full max-w-6xl mx-auto relative z-20 px-4">
        <div className="absolute -inset-10 bg-linear-to-tr from-[#A8C7FA]/30 to-white/0 rounded-[64px] blur-3xl opacity-50 -z-10" />
        <div className="bg-white/80 backdrop-blur-3xl rounded-[40px] border border-white p-4 shadow-[0_32px_128px_-32px_rgba(0,0,0,0.15)] transform transition-all duration-700">
          <div className="bg-[#F5F2EF]/50 rounded-[32px] overflow-hidden border border-black/5 aspect-video md:aspect-21/10 relative">
            {/* Mockup Header */}
            <div className="absolute top-0 w-full bg-white/50 backdrop-blur-xl border-b border-black/5 p-5 flex items-center justify-between z-10">
              <div className="flex gap-4 items-center">
                <div className="w-8 h-8 rounded-lg bg-black/10" />
                <div className="w-32 h-2.5 bg-black/5 rounded-full" />
              </div>
              <div className="flex gap-3">
                <div className="w-12 h-6 rounded-full bg-black/5" />
                <div className="w-8 h-6 rounded-full bg-black/5" />
              </div>
            </div>

            {/* Mockup Content */}
            <div className="pt-28 p-10 grid grid-cols-1 md:grid-cols-3 gap-8 h-full">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-[28px] p-6 shadow-sm border border-black/3 flex flex-col gap-5"
                >
                  <div className="w-full h-40 bg-[#F5F2EF] rounded-[20px] relative overflow-hidden">
                    <div className="absolute inset-0 bg-linear-to-br from-black/2 to-transparent" />
                  </div>
                  <div className="space-y-3">
                    <div className="w-3/4 h-3 bg-black/10 rounded-full" />
                    <div className="w-1/2 h-2.5 bg-black/5 rounded-full" />
                  </div>
                  <div className="flex items-center gap-2 mt-auto">
                    <div className="px-3 py-1 bg-[#A8C7FA]/20 text-[#1A1615] rounded-full text-[12px] font-bold">
                      Found
                    </div>
                    <div className="px-3 py-1 bg-black/5 text-black/40 rounded-full text-[12px] font-bold">
                      Library
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
