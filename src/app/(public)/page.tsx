import Ticker from "@/components/home/Ticker";
import FeaturesBento from "@/components/home/FeaturesBento";
import FeatureSplit from "@/components/home/FeatureSplit";
import FinalCTA from "@/components/home/FinalCTA";
import Footer from "@/components/layout/Footer-home";
import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";
import Navbar from "@/components/layout/Navbar-home";
import Testimonial from "@/components/home/Testimonial";
import Stats from "@/components/home/Stats";

export default function Home() {
  return (
    <div className="min-h-screen bg-white overflow-hidden selection:bg-[#C8DFFE] selection:text-[#111010] text-[#111010]">
      <Navbar />
      <Hero />
      <Ticker />
      <Stats />
      <HowItWorks />
      <FeatureSplit />
      <FeaturesBento />
      <Testimonial />
      <FinalCTA />
      <Footer />
    </div>
  );
}
