import {
  Image as ImageIcon,
  CheckCircle,
  ShieldCheck,
  Bell,
  ArrowRight,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

type BadgeVariant = "status-amber" | "status-green" | "status-red";

export default function FeatureSplit() {
  return (
    <section id="features" className="py-32 px-6">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#A8C7FA]/40 to-white/0 rounded-[32px] transform -rotate-3 scale-105" />
          <div className="bg-white rounded-[32px] p-4 md:p-8 card-shadow relative z-10 border border-white flex flex-col gap-6">
            <div className="flex items-center justify-between pb-4 border-b border-black/5">
              <h3 className="text-lg font-semibold">Active Claims</h3>
              <Badge variant="solid">3 Pending</Badge>
            </div>
            <div className="space-y-4">
              {[
                {
                  item: "Apple AirPods Pro",
                  stat: "Pending Verification",
                  color: "status-amber",
                },
                {
                  item: "Student ID - John Doe",
                  stat: "Approved",
                  color: "status-green",
                },
                {
                  item: "Calculus Textbook",
                  stat: "Rejected (Spam)",
                  color: "status-red",
                },
              ].map((row, i) => (
                <div
                  key={i}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-[20px] bg-[#F5F2EF]/50 hover:bg-[#F5F2EF] transition-colors gap-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center shrink-0">
                      <ImageIcon className="w-5 h-5 text-[#6B7280]" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#1A1615]">{row.item}</p>
                      <p className="text-sm text-[#6B7280]">Reported today</p>
                    </div>
                  </div>
                  <Badge variant={row.color as BadgeVariant}>{row.stat}</Badge>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8 lg:pl-8">
          <div className="space-y-4">
            <Badge variant="light">Structured Workflow</Badge>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
              Keep every claim <br className="hidden sm:block" /> moving
              forward.
            </h2>
            <p className="text-lg text-[#6B7280] leading-relaxed">
              No more manual record keeping. Validate ownership through a
              secure, structured claim verification workflow designed for admins
              and campus security.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                title: "Review Requests",
                icon: <CheckCircle className="w-5 h-5" />,
              },
              {
                title: "Image Proof Uploads",
                icon: <ImageIcon className="w-5 h-5" />,
              },
              {
                title: "Secure Authentication",
                icon: <ShieldCheck className="w-5 h-5" />,
              },
              {
                title: "Automate Reminders",
                icon: <Bell className="w-5 h-5" />,
              },
            ].map((ft, i) => (
              <div
                key={i}
                className="bg-white p-4 rounded-[24px] card-shadow border border-white flex items-center gap-4 transition-transform hover:-translate-y-1"
              >
                <div className="w-10 h-10 rounded-[12px] bg-[#F5F2EF] flex items-center justify-center text-[#1A1615]">
                  {ft.icon}
                </div>
                <span className="font-semibold text-[#1A1615]">{ft.title}</span>
              </div>
            ))}
          </div>

          <Button variant="primary" icon={<ArrowRight className="w-4 h-4" />}>
            For Administrators
          </Button>
        </div>
      </div>
    </section>
  );
}
