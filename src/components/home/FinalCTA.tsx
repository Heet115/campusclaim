import { Button } from "@/components/ui/Button";

export default function FinalCTA() {
  return (
    <section className="py-40 px-6 relative overflow-hidden bg-white isolate">
      {/* Background Glows */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1000px] h-[600px] bg-[#A8C7FA] blur-[140px] rounded-full -z-10 mix-blend-multiply opacity-20" />

      <div className="max-w-5xl mx-auto text-center space-y-10 bg-[#F5F2EF]/50 backdrop-blur-xl p-12 md:p-24 rounded-[64px] border border-black/5 relative z-10 hover:shadow-2xl hover:shadow-black/5 transition-all transition-duration-700">
        <h2 className="text-5xl md:text-8xl font-bold tracking-tighter text-black leading-[0.9] italic">
          Ready to <br className="hidden md:block" /> simplify campus?
        </h2>
        <p className="text-xl text-black/40 max-w-xl mx-auto font-bold">
          Join 80+ universities using CampusClaim to manage their lost and found
          more efficiently.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Button
            href="/register"
            size="lg"
            className="bg-black text-white px-10 py-5 rounded-full font-bold shadow-xl shadow-black/10 hover:scale-105 transition-transform"
          >
            Get Started
          </Button>
          <Button
            href="/demo"
            size="lg"
            variant="glass"
            className="px-10 py-5 rounded-full font-bold text-black"
          >
            Book a Demo
          </Button>
        </div>
      </div>
    </section>
  );
}
