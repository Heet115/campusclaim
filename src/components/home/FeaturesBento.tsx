import { Search, Smartphone, MapPin, Shield, Clock } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

export default function FeaturesBento() {
  return (
    <section className="py-32 px-6 bg-white">
      <div className="max-w-6xl mx-auto space-y-16">
        <div className="text-center space-y-6">
          <Badge variant="light">Features</Badge>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight max-w-3xl mx-auto leading-tight text-[#1A1615]">
            Everything you need to manage campus lost & found.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Wide Card 1 */}
          <div className="lg:col-span-2 bg-[#F5F2EF] rounded-[32px] p-8 md:p-12 flex flex-col justify-between overflow-hidden relative min-h-[350px]">
            <div className="relative z-10 max-w-sm space-y-4">
              <div className="w-12 h-12 rounded-[16px] bg-white flex items-center justify-center shadow-sm">
                <Search className="w-6 h-6 text-[#1A1615]" />
              </div>
              <h3 className="text-3xl font-bold text-[#1A1615] tracking-tight">
                Smart Search & Filter
              </h3>
              <p className="text-[#6B7280] leading-relaxed">
                Instantly find items by category, specific location, or date.
                Our intelligent tagging turns thousands of entries into a clean
                searchable database.
              </p>
            </div>
            <div className="absolute -right-10 top-20 w-[60%] h-[120%] bg-white rounded-t-[32px] rounded-l-[32px] shadow-xl border border-white/50 p-6 transform rotate-6 border-l hidden md:block">
              {/* Mock UI elements */}
              <div className="h-8 w-full bg-[#F5F2EF] rounded-full mb-4 px-4 flex items-center">
                <Search className="w-4 h-4 text-gray-400" />
              </div>
              <div className="flex gap-2 mb-4">
                <div className="px-3 py-1 bg-black/5 rounded-full text-xs">
                  Electronics
                </div>
                <div className="px-3 py-1 bg-black/5 rounded-full text-xs">
                  Library
                </div>
              </div>
              <div className="space-y-3">
                <div className="h-16 w-full bg-black/5 rounded-[16px]" />
                <div className="h-16 w-full bg-black/5 rounded-[16px]" />
              </div>
            </div>
          </div>

          {/* Square Card 1 */}
          <div className="bg-[#1A1615] rounded-[32px] p-8 md:p-12 text-white flex flex-col justify-between min-h-[350px] relative overflow-hidden">
            <div className="relative z-10 space-y-4">
              <div className="w-12 h-12 rounded-[16px] bg-white/10 flex items-center justify-center backdrop-blur-md">
                <Smartphone className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-3xl font-bold tracking-tight">
                Mobile Friendly
              </h3>
              <p className="text-white/60 leading-relaxed">
                Report items on the go right from your smartphone. Snap a
                picture and upload in seconds.
              </p>
            </div>
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-white/5 rounded-full blur-[50px]" />
          </div>

          {/* Square 2 */}
          <div className="bg-white border border-black/[0.06] rounded-[32px] p-8 md:p-12 shadow-sm flex flex-col justify-between min-h-[300px]">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-[16px] bg-[#F5F2EF] flex items-center justify-center">
                <MapPin className="w-6 h-6 text-[#1A1615]" />
              </div>
              <h3 className="text-2xl font-bold tracking-tight">
                Precise Locations
              </h3>
              <p className="text-[#6B7280]">
                Tag exactly where an item was found down to the specific
                building, hall, or room number.
              </p>
            </div>
          </div>

          {/* Square 3 */}
          <div className="bg-white border border-black/[0.06] rounded-[32px] p-8 md:p-12 shadow-sm flex flex-col justify-between min-h-[300px]">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-[16px] bg-[#A8C7FA]/30 flex items-center justify-center">
                <Shield className="w-6 h-6 text-[#1A1615]" />
              </div>
              <h3 className="text-2xl font-bold tracking-tight">
                Role-Based Access
              </h3>
              <p className="text-[#6B7280]">
                Secure environment separating general student capabilities from
                administrative review controls.
              </p>
            </div>
          </div>

          {/* Square 4 */}
          <div className="bg-white border border-black/[0.06] rounded-[32px] p-8 md:p-12 shadow-sm flex flex-col justify-between min-h-[300px]">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-[16px] bg-[#F5F2EF] flex items-center justify-center">
                <Clock className="w-6 h-6 text-[#1A1615]" />
              </div>
              <h3 className="text-2xl font-bold tracking-tight">
                Real-time Tracking
              </h3>
              <p className="text-[#6B7280]">
                Keep track of your claim status—Pending, Approved, or
                Rejected—instantly from your dashboard.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
