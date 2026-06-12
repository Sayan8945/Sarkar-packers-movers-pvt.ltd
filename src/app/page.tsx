import TopHeader from "@/components/layout/TopHeader";
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import TrustStats from "@/components/sections/TrustStats";
import ServicesSection from "@/components/sections/ServicesSection";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Testimonials from "@/components/sections/Testimonials";
import ProcessTimeline from "@/components/sections/ProcessTimeline";
import CitySection from "@/components/sections/CitySection";
import FAQSection from "@/components/sections/FAQSection";
import CTABanner from "@/components/sections/CTABanner";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

export default function Home() {
  return (
    <main className="bg-white overflow-x-hidden">
      <TopHeader />
      <Navbar />
      <HeroSection />
      <TrustStats />
      <ServicesSection />
      <WhyChooseUs />
      <Testimonials />
      <ProcessTimeline />
      <CitySection />
      <FAQSection />
      <CTABanner />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
