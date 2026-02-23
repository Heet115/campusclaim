import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Badge } from "@/components/ui/Badge";
import { Info, ShieldAlert, FileText, CheckCircle2 } from "lucide-react";

export default function GuidelinesPage() {
  const guidelines = [
    {
      icon: <Info className="w-6 h-6 text-[#1A1615]" />,
      title: "Immediate Reporting",
      description:
        "As soon as you find an item or realize you've lost something, report it to the CampusClaim system. Items reported within 24 hours have a 40% higher chance of being reunited with their owners.",
      badge: "Crucial",
    },
    {
      icon: <ShieldAlert className="w-6 h-6 text-[#1A1615]" />,
      title: "High-Value Items",
      description:
        "Turn in high-value items (laptops, phones, wallets, keys) directly to campus security or the central administration office immediately, even if you first log them on CampusClaim.",
      badge: "Security",
    },
    {
      icon: <FileText className="w-6 h-6 text-[#1A1615]" />,
      title: "Detailed Descriptions",
      description:
        "When reporting a lost item, provide distinguishing marks (stickers, scratches, specific models) but keep at least one unique identifier private to verify ownership upon claiming.",
      badge: "Best Practice",
    },
    {
      icon: <CheckCircle2 className="w-6 h-6 text-[#1A1615]" />,
      title: "Claiming Protocol",
      description:
        "To claim an item, you will need a valid student or staff ID and proof of ownership. This may include a passcode unlock (for electronics) or receipt of purchase.",
      badge: "Verification",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F9F8F8] selection:bg-[#9CC1E7] selection:text-black flex flex-col">
      <Navbar />

      <main className="flex-grow pt-40 pb-32 px-6">
        <div className="max-w-4xl mx-auto space-y-16">
          <div className="text-center space-y-6">
            <Badge variant="light">Campus Rules</Badge>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-[#1A1615] leading-[1.1]">
              Lost & Found <br className="hidden sm:block" /> Guidelines
            </h1>
            <p className="text-lg text-[#6B7280] leading-relaxed max-w-2xl mx-auto">
              Please familiarize yourself with the standard operating procedures
              for reporting, handling, and claiming items on campus.
            </p>
          </div>

          <div className="space-y-6">
            {guidelines.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-[32px] p-8 md:p-10 card-shadow border border-white/50 flex flex-col md:flex-row gap-6 items-start relative overflow-hidden"
              >
                <div className="w-14 h-14 rounded-[16px] bg-[#F5F2EF] flex items-center justify-center shrink-0">
                  {item.icon}
                </div>
                <div className="space-y-3 flex-grow">
                  <div className="flex items-center gap-3">
                    <h3 className="text-2xl font-bold text-[#1A1615] tracking-tight">
                      {item.title}
                    </h3>
                    <Badge variant="glass" className="hidden sm:flex">
                      {item.badge}
                    </Badge>
                  </div>
                  <p className="text-[#6B7280] leading-relaxed text-lg">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-[#1A1615] rounded-[32px] p-10 md:p-12 text-center text-white space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
            <h3 className="text-2xl font-bold relative z-10">
              Unclaimed Items Policy
            </h3>
            <p className="text-white/70 max-w-2xl mx-auto relative z-10">
              Items not claimed within 90 days are subject to standard campus
              disposal procedures, which may include donation to local
              charities, auction, or secure recycling, depending on the item
              category.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
