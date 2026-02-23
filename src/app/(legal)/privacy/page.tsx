import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Badge } from "@/components/ui/Badge";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#F9F8F8] selection:bg-[#9CC1E7] selection:text-black flex flex-col">
      <Navbar />

      <main className="flex-grow pt-40 pb-32 px-6">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-6">
            <Badge variant="light">Legal</Badge>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-[#1A1615] leading-[1.1]">
              Privacy Policy
            </h1>
            <p className="text-lg text-[#6B7280] leading-relaxed">
              Last updated:{" "}
              {new Date().toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>

          <div className="bg-white rounded-[32px] p-8 md:p-14 lg:p-20 card-shadow border border-white/50 space-y-12 text-[#1A1615]">
            <section className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tight">
                1. Information We Collect
              </h2>
              <p className="text-[#6B7280] leading-relaxed">
                We collect information you provide directly to us when you
                create an account, report a lost or found item, or communicate
                with us. This includes your name, student ID, university email
                address, phone number, and any photographs or descriptions of
                items you submit to the platform.
              </p>
              <p className="text-[#6B7280] leading-relaxed">
                Additionally, when you access the CampusClaim network, our
                servers automatically record standard log data (IP address,
                browser type) to ensure system security and prevent fraudulent
                claims.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tight">
                2. How We Use Your Information
              </h2>
              <p className="text-[#6B7280] leading-relaxed">
                The primary purpose of collecting your data is to facilitate the
                reunification of lost items. We use your information to:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-[#6B7280] leading-relaxed">
                <li>
                  Verify your identity and affiliation with the respective
                  campus.
                </li>
                <li>
                  Communicate with you regarding the status of your claims.
                </li>
                <li>
                  Allow campus administrators to securely audit high-value item
                  returns.
                </li>
                <li>
                  Improve our platform&apos;s search and matching algorithms.
                </li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tight">
                3. Data Sharing and Disclosure
              </h2>
              <p className="text-[#6B7280] leading-relaxed">
                We do not sell your personal data. Your contact information is
                never publicly displayed on item postings. Administrative staff
                and Campus Security at your verified institution have access to
                your data solely for the purpose of claim verification and
                campus safety protocols.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tight">4. Security</h2>
              <p className="text-[#6B7280] leading-relaxed">
                We implement industry-standard encryption and security measures
                to protect your account and data. However, please remember that
                no method of transmission over the internet or method of
                electronic storage is 100% secure.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tight">
                5. Contact Us
              </h2>
              <p className="text-[#6B7280] leading-relaxed">
                If you have any questions or concerns about this Privacy Policy,
                your data rights, or how your institution handles your data via
                CampusClaim, please email us directly at:
              </p>
              <a
                href="mailto:privacy@campusclaim.com"
                className="font-semibold text-[#1A1615] hover:underline underline-offset-4"
              >
                privacy@campusclaim.com
              </a>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
