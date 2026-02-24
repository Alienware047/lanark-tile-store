import PageHero from "@/components/layout/PageHero";
import PricingSection from "@/components/sections/PricingSection";

export const metadata = {
  title: "Larnark - Pricing",
  description: "Explore Larnark's competitive pricing for premium tiles and expert consulting services. Discover how our transparent pricing structure and personalized solutions can help you achieve your flooring goals while maximizing value and quality.",
};


export default function PricingPAge(){
    return(
        <div>
            <PageHero 
                    title="Pricing"
                    bgImage="/assets/images/bg/breadcumb.jpg"
                    breadcrumbs={[
                        { label: "Home", href: "/" },
                        { label: "Pricing" },
                    ]}
            />
            {/* PRICING SECTION */} 
            <PricingSection />
        </div>
    )
}