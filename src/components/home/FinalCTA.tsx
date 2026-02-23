import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ArrowRight } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="py-32 px-6 relative overflow-hidden bg-[#F7F4F0] isolate">
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-[#7EB3F7] blur-[140px] rounded-full -z-10 opacity-15 animate-pulse-glow" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="bg-[#111010] rounded-[48px] p-12 md:p-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#7EB3F7] rounded-full blur-[100px] opacity-15 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-[#C8DFFE] rounded-full blur-[80px] opacity-10 pointer-events-none" />

          <div className="relative z-10 text-center space-y-8">
            {/* Status badge */}
            <Badge
              variant="glass"
              size="md"
              className="bg-white/10 border-white/10 text-white/60"
            >
              <div className="w-2 h-2 bg-[#7EB3F7] rounded-full animate-pulse" />
              80+ universities using CampusClaim
            </Badge>

            <h2 className="font-display text-[52px] md:text-[80px] italic text-white leading-[0.9] tracking-tight">
              Ready to simplify
              <br />
              your campus?
            </h2>
            <p className="text-[17px] text-white/40 max-w-md mx-auto font-medium">
              Join thousands of students and administrators who&apos;ve made
              losing things a little less terrible.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Button
                href="/register"
                variant="secondary"
                size="lg"
                className="btn-magnetic group"
                icon={
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                }
              >
                Get Started — it&apos;s free
              </Button>
              <Button
                href="/demo"
                size="lg"
                className="btn-magnetic bg-white/10 border border-white/10 text-white hover:bg-white/15 transition-colors backdrop-blur-md"
              >
                Book a demo
              </Button>
            </div>
            <p className="text-[12px] text-white/20 font-medium">
              No credit card needed · 14-day free trial
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
