import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import LogoCloud from "@/components/home/LogoCloud";
import FeatureSplit from "@/components/home/FeatureSplit";
import FeaturesBento from "@/components/home/FeaturesBento";
import FinalCTA from "@/components/home/FinalCTA";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F5F2EF] overflow-hidden selection:bg-[#9CC1E7] selection:text-black">
      <Navbar />
      <Hero />
      <LogoCloud />
      <FeatureSplit />
      <FeaturesBento />
      <FinalCTA />
      <Footer />
    </div>
  );
}
