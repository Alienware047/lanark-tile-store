import PageHero from "@/components/layout/PageHero";
import ContactInfo from "@/components/sections/ContactInfo";
import ContactFormSection from "@/components/sections/ContactFormSection";
import ContactMap from "@/components/sections/ContactMap";

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Contact Us"
        bgImage="/assets/images/bg/breadcumb.jpg"
         breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Contact Us" },
            ]}
      />

      <ContactInfo />

      <ContactFormSection />

      <ContactMap />
    </>
  );
}