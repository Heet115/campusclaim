import { Button } from "@/components/ui/Button";

export default function FinalCTA() {
  return (
    <section className="py-32 px-6 relative overflow-hidden bg-[#F5F2EF]">
      <div className="absolute inset-0 bg-gradient-to-t from-[#A8C7FA]/50 to-transparent -z-10" />

      <div className="max-w-4xl mx-auto text-center space-y-8 bg-white/40 backdrop-blur-2xl p-10 sm:p-20 rounded-[48px] border border-white card-shadow">
        <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-[#1A1615] leading-tight">
          Ready to completely <br className="hidden md:block" /> modernize your
          campus?
        </h2>
        <p className="text-xl text-[#6B7280] max-w-2xl mx-auto">
          Replace manual notice boards and chaotic emails with a smart,
          centralized digital system for lost and found items.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
          <Button href="/register" variant="primary" size="lg">
            Get Started
          </Button>
          <Button href="/contact" variant="outline" size="lg">
            Contact Sales
          </Button>
        </div>
      </div>
    </section>
  );
}
