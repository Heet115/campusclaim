import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function ReportSuccessScreen({
  icon,
  iconBg,
  title,
  itemName,
  subtitle,
}: {
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  itemName: string;
  subtitle: string;
}) {
  return (
    <div className="text-center max-w-md mx-auto animate-fade-up py-8">
      <div
        className="w-20 h-20 rounded-[28px] flex items-center justify-center mx-auto mb-6 shadow-sm animate-float"
        style={{ background: iconBg }}
      >
        {icon}
      </div>
      <h1 className="font-display text-[48px] italic text-[#111010] leading-[0.9] mb-4">
        {title}
      </h1>
      <p className="text-[15px] text-black/45 font-medium leading-relaxed mb-2">
        {subtitle}
      </p>
      <p className="text-[16px] font-bold text-[#111010] mb-6">
        &ldquo;{itemName}&rdquo;
      </p>
      <p className="text-[14px] text-black/40 font-medium leading-relaxed mb-8">
        You&apos;ll get an email notification the moment someone finds a match.
        Keep an eye on your dashboard.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button
          href="/dashboard"
          variant="primary"
          size="md"
          className="btn-magnetic"
          icon={<ArrowRight className="w-4 h-4" />}
        >
          Go to dashboard
        </Button>
        <Button href="/items" variant="outline" size="md">
          Browse items
        </Button>
      </div>
    </div>
  );
}
