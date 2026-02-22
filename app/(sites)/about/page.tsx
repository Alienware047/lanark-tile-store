
import ABoutHero from "@/components/sections/AboutHero";
import AboutUsSection from "@/components/sections/AboutUsSection";
import CompanySection from "@/components/sections/CompanySection";

export const metadata = {
  title: "Larnark - About Us",
  description: "Welcome to Larnark, your premier destination for exquisite tiles, stone, and consulting services. Explore our contemporary collection and expert solutions for your flooring needs.",
};
export default function AboutPage() {
return(
    <div>
        <ABoutHero />
        <AboutUsSection />
        <CompanySection />
    </div>
)

}