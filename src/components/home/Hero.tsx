import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export default function Hero() {
  return (
    <section className="relative pt-40 pb-32 px-6 overflow-hidden min-h-[90vh] flex flex-col items-center">
      {/* Sky Blue Gradient Base */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#A8C7FA]/50 via-[#F5F2EF] to-[#F5F2EF] -z-10" />

      {/* Soft floating clouds */}
      <div className="absolute top-20 -left-20 w-96 h-96 bg-white/40 blur-[80px] rounded-full -z-10" />
      <div className="absolute top-40 -right-20 w-[30rem] h-[30rem] bg-white/50 blur-[100px] rounded-full -z-10" />

      <div className="max-w-4xl mx-auto text-center space-y-8 z-10 relative">
        <Badge variant="glass">🎉 Introducing Smart Claims</Badge>

        <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-[#1A1615] leading-[1.05]">
          Reunite with your
          <br />
          <span className="text-[#6B7280]">lost belongings.</span>
        </h1>

        <p className="max-w-xl mx-auto text-lg md:text-xl text-[#6B7280] leading-relaxed">
          The smart, centralized Lost & Found portal designed for modern campus
          environments. Report, search, and claim with ease.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Button href="/report" variant="primary" size="lg">
            Report a Lost Item
          </Button>
          <Button href="/browse" variant="glass" size="lg">
            Browse Found Items
          </Button>
        </div>
      </div>

      {/* Dashboard Mockup - Floating Up */}
      <div className="mt-20 w-full max-w-5xl mx-auto relative z-20">
        <div className="bg-white/80 backdrop-blur-2xl rounded-[32px] border border-white p-2 card-shadow transform hover:-translate-y-2 transition-transform duration-700">
          <div className="bg-[#F5F2EF]/50 rounded-[28px] overflow-hidden border border-white/50 aspect-[16/9] md:aspect-[21/9] relative">
            <div className="absolute top-0 w-full bg-white/80 backdrop-blur border-b border-black/5 p-4 flex items-center justify-between">
              <div className="flex gap-4 items-center">
                <div className="w-32 h-8 bg-black/5 rounded-full" />
                <div className="w-20 hidden md:block h-8 bg-black/5 rounded-full" />
              </div>
              <div className="flex gap-2">
                <div className="w-8 h-8 rounded-full bg-[#1A1615]" />
              </div>
            </div>
            <div className="pt-20 p-8 grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-[20px] p-5 shadow-sm border border-black/5 flex flex-col gap-4"
                >
                  <div className="w-full h-32 bg-black/5 rounded-[12px]" />
                  <div className="space-y-2">
                    <div className="w-3/4 h-4 bg-[#1A1615]/10 rounded-full" />
                    <div className="w-1/2 h-4 bg-black/5 rounded-full" />
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="glass" className="py-1 px-2 text-xs">
                      Found
                    </Badge>
                    <span className="px-2 py-1 bg-black/5 rounded-full text-xs font-medium text-[#6B7280]">
                      Library
                    </span>
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
