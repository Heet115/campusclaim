import { Card } from "@/components/ui/Card";

export function StatCard({
  label,
  value,
  delta,
  icon,
  color,
  text,
}: {
  label: string;
  value: string;
  delta: string;
  icon: React.ReactNode;
  color: string;
  text: string;
}) {
  return (
    <Card
      variant="default"
      padding="none"
      className="p-6 flex flex-col gap-4 group hover:-translate-y-1 transition-all duration-300"
    >
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform"
        style={{ background: color, color: text }}
      >
        {icon}
      </div>
      <div>
        <p className="font-display text-[36px] italic text-[#111010] leading-none mb-1">
          {value}
        </p>
        <p className="text-[12px] font-semibold text-black/40">{label}</p>
      </div>
      <p className="text-[11px] font-medium text-black/30 mt-auto">{delta}</p>
    </Card>
  );
}
