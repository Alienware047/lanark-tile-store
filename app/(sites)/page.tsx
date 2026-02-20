import AboutSection from "@/components/AboutSection";
import Hero from "@/components/hero";
import ServicesSection from "@/components/ServiceComponents";
import WhatWeOfferCard from "@/components/WhatWeOfferCard";
import GallerySection from "@/components/GallerySection"; 
import ReliableFloorServices from "@/components/ReliableFloorServices";
import ShopSliderSection from "@/components/ShopSliderSection";
import TestimonialCarousel from "@/components/Testimonials";
import ExpertiseSection from "@/components/Expertise";
import NewsRoom from "@/components/NewsRoom";

export const metadata = {
  title: "Larnark - Home",
  description: "Welcome to Larnark, your premier destination for exquisite tiles, stone, and consulting services. Explore our contemporary collection and expert solutions for your flooring needs.",
};

export default function Home() {
  return (
    <div>
      <main>
        <Hero />
        <AboutSection />
        <ServicesSection />
        <WhatWeOfferCard />
        <GallerySection />
        <ReliableFloorServices />  
        <ShopSliderSection />
        <TestimonialCarousel />
        <ExpertiseSection />
        <NewsRoom />
      </main> 
    </div>
  );
}
