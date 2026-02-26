import PageHero from "@/components/layout/PageHero";
import TeamSection from "@/components/sections/TeamsMainSection";

export default function TeamsPage() {
  return (
    <div>
        <PageHero
            title="Our Teams"
            bgImage="/assets/images/bg/breadcumb.jpg"
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Team" },
            ]}
        />
        <TeamSection />
    </div>
  );
}