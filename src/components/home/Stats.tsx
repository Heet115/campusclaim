import { Card } from "@/components/ui/Card";
import { CheckCircle, Clock, MapPin, Star } from "lucide-react";

export default function Stats() {
  const data = [
    {
      value: "10K+",
      label: "Active students",
      icon: <Star className="w-4 h-4" />,
    },
    {
      value: "80+",
      label: "Universities",
      icon: <MapPin className="w-4 h-4" />,
    },
    {
      value: "94%",
      label: "Recovery rate",
      icon: <CheckCircle className="w-4 h-4" />,
    },
    {
      value: "<2h",
      label: "Avg. claim time",
      icon: <Clock className="w-4 h-4" />,
    },
  ];

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
        {data.map((s, i) => (
          <Card
            key={i}
            variant="flat"
            padding="lg"
            hover
            className="text-center rounded-3xl border border-black/4"
          >
            <div className="w-8 h-8 rounded-xl bg-[#7EB3F7]/20 flex items-center justify-center mx-auto mb-4 text-[#3B7FD4]">
              {s.icon}
            </div>
            <p className="font-display text-[40px] italic text-[#111010] leading-none mb-2">
              {s.value}
            </p>
            <p className="text-[13px] font-medium text-black/40">{s.label}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
