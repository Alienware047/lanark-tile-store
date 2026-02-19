import AboutSection from "@/components/AboutSection";
import Hero from "@/components/hero";
import ServicesSection from "@/components/ServiceComponents";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <main>
        <Hero />
        <AboutSection />
        <ServicesSection />
      </main> 
    </div>
  );
}
