import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Mail, MessageSquare, Phone } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#F9F8F8] selection:bg-[#9CC1E7] selection:text-black flex flex-col">
      <Navbar />

      <main className="flex-grow pt-40 pb-32 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16">
          {/* Left Column: Info */}
          <div className="space-y-12">
            <div className="space-y-6">
              <span className="px-3 py-1.5 rounded-full bg-white border border-black/5 text-xs font-bold tracking-wider text-[#1A1615] uppercase shadow-sm">
                Get in touch
              </span>
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-[#1A1615] leading-[1.1]">
                Let&apos;s talk about your campus.
              </h1>
              <p className="text-lg text-[#6B7280] leading-relaxed max-w-md">
                Whether you&apos;re looking for a demo, need support, or have a
                general inquiry, our team is ready to help you modernize your
                lost & found.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 lg:grid-cols-1">
              {/* Contact Card 1 */}
              <div className="bg-white rounded-[24px] p-6 card-shadow border border-white/50 flex items-start gap-4">
                <div className="w-10 h-10 rounded-[12px] bg-[#F5F2EF] flex items-center justify-center shrink-0">
                  <MessageSquare className="w-5 h-5 text-[#1A1615]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#1A1615]">
                    Chat to sales
                  </h3>
                  <p className="text-[#6B7280] text-sm mt-1 mb-2">
                    Speak to our friendly team.
                  </p>
                  <a
                    href="mailto:sales@campusclaim.com"
                    className="text-sm font-semibold hover:underline"
                  >
                    sales@campusclaim.com
                  </a>
                </div>
              </div>

              {/* Contact Card 2 */}
              <div className="bg-white rounded-[24px] p-6 card-shadow border border-white/50 flex items-start gap-4">
                <div className="w-10 h-10 rounded-[12px] bg-[#F5F2EF] flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-[#1A1615]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#1A1615]">
                    Chat to support
                  </h3>
                  <p className="text-[#6B7280] text-sm mt-1 mb-2">
                    We&apos;re here to help you.
                  </p>
                  <a
                    href="mailto:support@campusclaim.com"
                    className="text-sm font-semibold hover:underline"
                  >
                    support@campusclaim.com
                  </a>
                </div>
              </div>

              {/* Contact Card 3 */}
              <div className="bg-white rounded-[24px] p-6 card-shadow border border-white/50 flex items-start gap-4">
                <div className="w-10 h-10 rounded-[12px] bg-[#F5F2EF] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-[#1A1615]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#1A1615]">Call us</h3>
                  <p className="text-[#6B7280] text-sm mt-1 mb-2">
                    Mon-Fri from 8am to 5pm.
                  </p>
                  <a
                    href="tel:+15551234567"
                    className="text-sm font-semibold hover:underline"
                  >
                    +1 (555) 123-4567
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="bg-white rounded-[32px] p-8 md:p-12 card-shadow border border-white/50 h-fit">
            <form className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label
                    htmlFor="firstName"
                    className="text-sm font-semibold text-[#1A1615]"
                  >
                    First name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    className="w-full px-4 py-3 rounded-[16px] bg-[#F9F8F8] border border-black/5 focus:outline-none focus:ring-2 focus:ring-[#1A1615]/20 transition-all text-[#1A1615]"
                    placeholder="First name"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="lastName"
                    className="text-sm font-semibold text-[#1A1615]"
                  >
                    Last name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    className="w-full px-4 py-3 rounded-[16px] bg-[#F9F8F8] border border-black/5 focus:outline-none focus:ring-2 focus:ring-[#1A1615]/20 transition-all text-[#1A1615]"
                    placeholder="Last name"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-semibold text-[#1A1615]"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 rounded-[16px] bg-[#F9F8F8] border border-black/5 focus:outline-none focus:ring-2 focus:ring-[#1A1615]/20 transition-all text-[#1A1615]"
                  placeholder="you@university.edu"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="institution"
                  className="text-sm font-semibold text-[#1A1615]"
                >
                  Institution Name
                </label>
                <input
                  type="text"
                  id="institution"
                  className="w-full px-4 py-3 rounded-[16px] bg-[#F9F8F8] border border-black/5 focus:outline-none focus:ring-2 focus:ring-[#1A1615]/20 transition-all text-[#1A1615]"
                  placeholder="University or College"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="text-sm font-semibold text-[#1A1615]"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-3 rounded-[16px] bg-[#F9F8F8] border border-black/5 focus:outline-none focus:ring-2 focus:ring-[#1A1615]/20 transition-all text-[#1A1615] resize-none"
                  placeholder="How can we help?"
                />
              </div>

              <div className="pt-2">
                <Button variant="primary" className="w-full">
                  Send Message
                </Button>
              </div>
              <p className="text-xs text-[#6B7280] text-center mt-4">
                By submitting this form, you agree to our privacy policy and
                terms of service.
              </p>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
