import { Card } from "@/components/ui/Card";

export default function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "Report or Browse",
      desc: "Found something? Report it in 30 seconds. Lost something? Browse our live directory filtered by location, category, and date.",
      color: "#C8DFFE",
    },
    {
      num: "02",
      title: "Match & Verify",
      desc: "Our system intelligently matches lost reports with found items. Upload a photo and answer a quick verification to prove ownership.",
      color: "#D4F4DC",
    },
    {
      num: "03",
      title: "Claim & Collect",
      desc: "Coordinate pickup through the app. Admins confirm the match and you get notified exactly when and where to collect your item.",
      color: "#FDE8D8",
    },
  ];

  return (
    <section
      id="how"
      className="py-32 px-6 bg-[#F7F4F0] relative overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#7EB3F7] blur-[180px] rounded-full opacity-10 pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="mb-20">
          <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-black/30 mb-4">
            How it works
          </p>
          <h2 className="font-display text-[52px] md:text-[72px] italic text-[#111010] leading-[0.9] tracking-tight">
            Three steps to
            <br />
            <span className="not-italic text-black/25">find anything.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <Card
              key={i}
              variant="default"
              padding="lg"
              hover
              className="rounded-[32px] border border-black/5 shadow-sm flex flex-col gap-6 relative overflow-hidden group"
            >
              <div
                className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-30 -translate-y-1/2 translate-x-1/2 pointer-events-none"
                style={{ background: s.color }}
              />
              <div className="relative z-10">
                <span className="font-display text-[72px] italic font-normal text-black/6 leading-none block">
                  {s.num}
                </span>
                <div
                  className="w-10 h-10 rounded-2xl flex items-center justify-center mt-2"
                  style={{ background: s.color }}
                >
                  <div className="w-3 h-3 rounded-full bg-[#111010]/30" />
                </div>
              </div>
              <div className="relative z-10">
                <h3 className="font-display text-[26px] italic text-[#111010] mb-3">
                  {s.title}
                </h3>
                <p className="text-[14px] text-black/45 leading-relaxed font-medium">
                  {s.desc}
                </p>
              </div>
              <div className="mt-auto relative z-10">
                <div className="h-0.5 w-0 group-hover:w-full bg-[#7EB3F7] rounded-full transition-all duration-700" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
