import AboutUsSection from "@/components/sections/AboutUsSection";
import CompanySection from "@/components/sections/CompanySection";
import FactsSection from "@/components/sections/FactsSection";
import Testimonials from "@/components/sections/Testimonials";
import ExperienceSection from "@/components/sections/ExperienceSection";
import ValueSection from "@/components/sections/ValueSection";
import TeamSection from "@/components/sections/TeamsSliderSection";
import PageHero from "@/components/layout/PageHero";

export const metadata = {
  title: "Larnark - About Us",
  description: "Welcome to Larnark, your premier destination for exquisite tiles, stone, and consulting services. Explore our contemporary collection and expert solutions for your flooring needs.",
};
export default function AboutPage() {
return(
    <div>
        <PageHero
            title="About"
            bgImage="/assets/images/bg/breadcumb.jpg"
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "About" },
            ]}
        />
        <AboutUsSection />
        <CompanySection />
        <Testimonials />
        <FactsSection />
        <ExperienceSection />
        <ValueSection />
        <TeamSection />
    </div>
)

}