import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { AvatarGroup } from "@/components/ui/Avatar";
import { ImageIcon, Star } from "lucide-react";

const AVATAR_USERS = [
  { name: "Alex" },
  { name: "Maya" },
  { name: "Riya" },
  { name: "Sam" },
];

export default function Hero() {
  return (
    <section className="relative pt-40 pb-20 px-6 overflow-hidden min-h-screen flex flex-col items-center isolate">
      {/* Layered background */}
      <div className="absolute inset-0 -z-20 pointer-events-none">
        <div className="absolute inset-0 bg-[#F7F4F0]" />
        {/* Noise texture */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />
        {/* Blue orbs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-[#C8DFFE] blur-[100px] animate-pulse-glow" />
        <div
          className="absolute top-40 -left-60 w-[500px] h-[500px] bg-[#7EB3F7] blur-[120px] rounded-full opacity-25 animate-pulse-glow"
          style={{ animationDelay: "1.5s" }}
        />
        <div className="absolute top-20 -right-40 w-[400px] h-[400px] bg-white blur-[80px] rounded-full opacity-70" />
      </div>

      <div className="max-w-4xl mx-auto text-center z-10 relative">
        {/* Eyebrow badge — uses AvatarGroup + Badge */}
        <Badge variant="glass" size="md" className="animate-fade-up mb-8">
          <AvatarGroup users={AVATAR_USERS} size="xs" max={4} />
          <span className="text-[#111010]/70">Trusted by 10,000+ students</span>
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-[#7EB3F7] text-[#7EB3F7]" />
            ))}
          </div>
        </Badge>

        {/* Headline */}
        <h1 className="animate-fade-up-delay-1 font-display text-[68px] md:text-[96px] lg:text-[112px] font-normal text-[#111010] leading-[0.88] tracking-tight mb-6">
          <span className="block">Lost something?</span>
          <span className="block italic text-black/30">
            Find it in seconds.
          </span>
        </h1>

        <p className="animate-fade-up-delay-2 max-w-lg mx-auto text-[17px] md:text-lg text-[#111010]/50 leading-relaxed font-medium mb-10">
          The most powerful lost and found portal ever built for campuses.
          Report, browse, and claim with a single tap.
        </p>

        <div className="animate-fade-up-delay-3 flex flex-col sm:flex-row items-center justify-center gap-3 mb-5">
          <Button
            href="/report"
            variant="primary"
            size="lg"
            className="btn-magnetic group"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            }
          >
            Report an item
          </Button>
          <Button
            href="/browse"
            variant="glass"
            size="lg"
            className="btn-magnetic"
          >
            Browse directory
          </Button>
        </div>

        <p className="animate-fade-up-delay-4 text-[12px] text-black/30 font-medium">
          No account required · Free for students
        </p>
      </div>

      {/* Dashboard mockup */}
      <div className="animate-fade-up-delay-4 mt-20 w-full max-w-5xl mx-auto relative z-20 px-4">
        <div className="animate-float-card">
          {/* Glow behind card */}
          <div className="absolute -inset-8 bg-[#7EB3F7]/20 rounded-[48px] blur-3xl" />

          <div className="relative bg-white/90 backdrop-blur-2xl rounded-[32px] border border-black/6 p-3 shadow-[0_32px_80px_-20px_rgba(0,0,0,0.18),0_0_0_1px_rgba(255,255,255,0.5)]">
            {/* Window chrome */}
            <div className="bg-[#F7F4F0] rounded-[24px] overflow-hidden border border-black/4">
              {/* Title bar */}
              <div className="bg-white/90 backdrop-blur-xl border-b border-black/5 px-6 py-4 flex items-center gap-4">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                  <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                  <div className="w-3 h-3 rounded-full bg-[#28CA41]" />
                </div>
                <div className="flex-1 bg-black/4 rounded-lg h-7 flex items-center px-3 max-w-xs mx-auto">
                  <div className="w-3 h-3 rounded-full bg-black/10 mr-2" />
                  <div className="h-2 bg-black/10 rounded-full w-32" />
                </div>
                <div className="flex gap-2 ml-auto">
                  <div className="h-7 w-16 bg-[#7EB3F7]/20 rounded-lg" />
                  <div className="h-7 w-7 bg-black/4 rounded-lg" />
                </div>
              </div>

              {/* Content grid */}
              <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-5">
                {[
                  {
                    tag: "Found",
                    loc: "Library",
                    color: "#C8DFFE",
                    text: "#3B7FD4",
                  },
                  {
                    tag: "Found",
                    loc: "Cafeteria",
                    color: "#D4F4DC",
                    text: "#2E7D45",
                  },
                  {
                    tag: "Lost",
                    loc: "Gym",
                    color: "#FDE8D8",
                    text: "#C2622A",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-[20px] p-5 shadow-sm border border-black/4 flex flex-col gap-4"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    <div className="w-full aspect-4/3 rounded-[14px] bg-[#F7F4F0] flex items-center justify-center relative overflow-hidden">
                      <ImageIcon className="w-8 h-8 text-black/10" />
                      <div className="absolute inset-0 bg-linear-to-br from-[#7EB3F7]/10 to-transparent" />
                    </div>
                    <div className="space-y-2">
                      <div className="h-3 bg-black/8 rounded-full w-4/5" />
                      <div className="h-2.5 bg-black/4 rounded-full w-3/5" />
                    </div>
                    <div className="flex items-center gap-2 mt-auto">
                      {/* Use Badge for item status tags */}
                      <Badge
                        size="sm"
                        style={{ background: item.color, color: item.text }}
                      >
                        {item.tag}
                      </Badge>
                      <Badge size="sm" variant="outline">
                        {item.loc}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
