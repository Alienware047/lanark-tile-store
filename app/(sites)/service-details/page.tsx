import PageHero from "@/components/layout/PageHero";
import ServiceDetailsSection from "@/components/sections/ServiceDeailsSection";

export const metadata = {
  title: "Larnark - Service Detail",
  description: "Discover the intricate details of our services at Larnark. From exquisite tiles to expert consulting, explore how we can transform your flooring projects with our premium offerings and personalized solutions.",
};

export default function ServiceDetailPage(){
    return(
        <div>
            <PageHero
                title="Service Details"
                bgImage="/assets/images/bg/breadcumb.jpg"
                breadcrumbs={[
                    { label: "Home", href: "/" },
                    { label: "Service Details" },
                ]}
            />
            <ServiceDetailsSection />
        </div>
    )
}