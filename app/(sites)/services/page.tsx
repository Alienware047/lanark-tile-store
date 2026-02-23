import ServiceCardSection from "@/components/sections/ServiceCardSection";
import CTASection from "@/components/sections/CTASection";
import Gallery from "@/components/sections/GallerySection";
import PageHero from "@/components/layout/PageHero";

export const metadata = {
  title: "Larnark - Service",
  description: "Welcome to Larnark, your premier destination for exquisite tiles, stone, and consulting services. Explore our contemporary collection and expert solutions for your flooring needs.",
};

export default function ServicesPage(){
    return(
        <div>
            <PageHero
                title="Services"
                bgImage="/assets/images/bg/breadcumb.jpg"
                breadcrumbs={[
                    { label: "Service", href: "/" },
                    { label: "About" },
                ]}
            />
            <ServiceCardSection />
            <CTASection />
            <Gallery />
        </div>
        
    )
};