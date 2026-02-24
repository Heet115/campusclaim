import Link from "next/link";
import { Card } from "@/components/ui/Card";

interface QuickAction {
  title: string;
  desc: string;
  href: string;
  icon: React.ReactNode;
  bg: string;
}

export function QuickActions({ actions }: { actions: QuickAction[] }) {
  return (
    <div>
      <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-black/30 mb-4">
        Quick actions
      </p>
      <div className="grid sm:grid-cols-3 gap-4">
        {actions.map((qa, i) => (
          <Link key={i} href={qa.href} className="block group">
            <Card variant="default" padding="none" hover className="p-5 h-full">
              <div
                className="w-10 h-10 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                style={{ background: qa.bg }}
              >
                {qa.icon}
              </div>
              <p className="font-semibold text-[14px] text-[#111010] mb-1">
                {qa.title}
              </p>
              <p className="text-[12px] text-black/40 font-medium leading-relaxed">
                {qa.desc}
              </p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
