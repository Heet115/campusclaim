import NavbarProtected from "@/components/layout/Navbar-protected";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F7F4F0] overflow-hidden selection:bg-[#9CC1E7] selection:text-black text-[#1A1615] flex flex-col">
      <NavbarProtected />
      {/* pt accounts for fixed navbar + mobile strip on small screens */}
      <main className="grow pt-28 md:pt-24 pb-16 px-6 max-w-6xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
}
