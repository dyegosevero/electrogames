import { Navbar } from "@/components/ui/Navbar";
import { Hero } from "@/components/sections/Hero";
import { ServiceCategoriesSection } from "@/components/sections/ServiceCategoriesSection";
import { ProductsGallery } from "@/components/sections/ProductsGallery";
import { YouTubeSection } from "@/components/sections/YouTubeSection";
import { DifferentialsSection } from "@/components/sections/DifferentialsSection";
import { FeedbacksSection } from "@/components/sections/FeedbacksSection";
import { LocationSection } from "@/components/sections/LocationSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ServiceCategoriesSection />
        <ProductsGallery />
        <YouTubeSection />
        <DifferentialsSection />
        <FeedbacksSection />
        <LocationSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
