import { Star } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";

export default function Testimonial() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-3xl mx-auto text-center">
        <div className="flex justify-center gap-1 mb-6">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-[#7EB3F7] text-[#7EB3F7]" />
          ))}
        </div>
        <blockquote className="font-display text-[32px] md:text-[44px] italic text-[#111010] leading-tight mb-8">
          &quot;I lost my laptop two days before finals. CampusClaim matched it
          within the hour. Genuinely unbelievable.&quot;
        </blockquote>
        <div className="flex rounded-full items-center justify-center gap-3">
          <Avatar
            name="Maya Patel"
            size="md"
            className="bg-linear-to-br rounded-full from-[#7EB3F7] to-[#C8DFFE]"
          />
          <div className="text-left">
            <p className="font-semibold text-[14px] text-[#111010]">
              Maya Patel
            </p>
            <p className="text-[12px] text-black/35 font-medium">
              Junior, Stanford University
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
