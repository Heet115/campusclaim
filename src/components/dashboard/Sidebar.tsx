import { ArrowRight, Zap } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export function ProfileSnapshot() {
  return (
    <Card variant="flat" padding="none" className="p-6">
      <div className="flex items-center gap-3 mb-5">
        <Avatar name="Heet Viradiya" size="lg" />
        <div>
          <p className="font-semibold text-[15px] text-[#111010]">
            Heet Viradiya
          </p>
          <p className="text-[12px] text-black/40 font-medium">
            hpviradiya05@gmail.com
          </p>
        </div>
      </div>
      <div className="space-y-2.5">
        {[
          { label: "University", value: "Stanford University" },
          { label: "Student ID", value: "STU-2024-8821" },
          { label: "Member since", value: "Jan 2024" },
        ].map((row, i) => (
          <div key={i} className="flex justify-between items-center">
            <span className="text-[12px] font-medium text-black/40">
              {row.label}
            </span>
            <span className="text-[12px] font-semibold text-[#111010]">
              {row.value}
            </span>
          </div>
        ))}
      </div>
      <hr className="border-none h-px bg-black/6 my-4" />
      <Button
        href="/profile"
        variant="outline"
        size="sm"
        fullWidth
        icon={<ArrowRight className="w-3.5 h-3.5" />}
      >
        Edit profile
      </Button>
    </Card>
  );
}

export function TipCard() {
  return (
    <div className="relative bg-[#111010] rounded-[28px] p-6 overflow-hidden">
      <div className="absolute top-0 right-0 w-48 h-48 bg-[#7EB3F7] rounded-full blur-[60px] opacity-20 pointer-events-none" />
      <div className="relative z-10">
        <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center mb-4 border border-white/10">
          <Zap className="w-4 h-4 text-[#7EB3F7]" />
        </div>
        <p className="font-display text-[20px] italic text-white leading-tight mb-2">
          Tip: Add photos.
        </p>
        <p className="text-[12px] text-white/40 font-medium leading-relaxed mb-4">
          Reports with photos get matched{" "}
          <span className="text-white/70 font-bold">3× faster</span>. Update
          your existing reports now.
        </p>
        <Button
          href="/items"
          size="sm"
          className="bg-white/10 border border-white/10 text-white hover:bg-white/20 transition-colors backdrop-blur-md text-[13px]"
          icon={<ArrowRight className="w-3.5 h-3.5" />}
        >
          Update reports
        </Button>
      </div>
    </div>
  );
}
