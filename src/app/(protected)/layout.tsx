import Navbar from "@/components/layout/Navbar-home";
import Footer from "@/components/layout/Footer-home";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F5F2EF] overflow-hidden selection:bg-[#9CC1E7] selection:text-black text-[#1A1615] flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-12 px-6 max-w-6xl mx-auto w-full">
        {children}
      </main>
      <Footer />
    </div>
  );
}
