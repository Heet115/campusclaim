import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Badge } from "@/components/ui/Badge";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#F9F8F8] selection:bg-[#9CC1E7] selection:text-black flex flex-col">
      <Navbar />

      <main className="flex-grow pt-40 pb-32 px-6">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-6">
            <Badge variant="light">Legal</Badge>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-[#1A1615] leading-[1.1]">
              Terms of Service
            </h1>
            <p className="text-lg text-[#6B7280] leading-relaxed">
              Effective from:{" "}
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
                1. Acceptance of Terms
              </h2>
              <p className="text-[#6B7280] leading-relaxed">
                By accessing and using CampusClaim (the &quot;Service&quot;),
                you acknowledge that you have read, understood, and agree to be
                bound by these Terms of Service. If you do not accept these
                terms, you must not use our platform.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tight">
                2. User Conduct & Responsibilities
              </h2>
              <p className="text-[#6B7280] leading-relaxed">
                As a user of the Service, you agree to:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-[#6B7280] leading-relaxed">
                <li>
                  Provide accurate, current, and complete information when
                  reporting an item.
                </li>
                <li>
                  Not submit false claims for items you do not own. Fraudulent
                  claims may be reported to campus security or local
                  authorities.
                </li>
                <li>Maintain the security of your account credentials.</li>
                <li>
                  Not upload discriminatory, offensive, or illegal imagery to
                  the platform.
                </li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tight">
                3. Good Samaritan Clause
              </h2>
              <p className="text-[#6B7280] leading-relaxed">
                Users acting in good faith to return lost property via the
                CampusClaim platform shall follow the specific protocols
                outlined in the{" "}
                <a
                  href="/guidelines"
                  className="text-[#1A1615] font-semibold underline underline-offset-4"
                >
                  Campus Guidelines
                </a>
                . CampusClaim serves strictly as a digital ledger and mediator;
                we are not entirely liable for the physical whereabouts or
                condition of reported items.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tight">
                4. Administrator Intervention
              </h2>
              <p className="text-[#6B7280] leading-relaxed">
                Campus administrators, faculty, or security personnel reserve
                the right to override, delete, or forcibly seize listings for
                high-value items, or items posing safety risks, as dictated by
                their intrinsic institutional policies.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tight">
                5. Limitation of Liability
              </h2>
              <p className="text-[#6B7280] leading-relaxed">
                CampusClaim is provided &quot;as is&quot; and &quot;as
                available&quot;. We make no warranties, expressed or implied,
                that the system will guarantee the successful return of your
                lost property. In no event shall CampusClaim or its developers
                be liable for lost, stolen, or damaged property documented on
                this platform.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
