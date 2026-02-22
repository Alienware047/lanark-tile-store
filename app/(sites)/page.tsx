import AboutSection from "@/components/sections/AboutSection";
import Hero from "@/components/sections/hero";
import ServicesSection from "@/components/sections/ServiceComponents";
import WhatWeOfferCard from "@/components/sections/WhatWeOfferCard";
import GallerySection from "@/components/sections/GallerySection"; 
import ReliableFloorServices from "@/components/sections/ReliableFloorServices";
import ShopSliderSection from "@/components/sections/ShopSliderSection";
import TestimonialCarousel from "@/components/sections/Testimonials";
import ExpertiseSection from "@/components/sections/Expertise";
import NewsRoom from "@/components/sections/NewsRoom";

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
