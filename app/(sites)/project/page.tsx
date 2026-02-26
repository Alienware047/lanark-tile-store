import PageHero from "@/components/layout/PageHero";
import ProjectsSection from "@/components/sections/ProjectsSection";
import FaqSection from "@/components/sections/FAQSection";

export const metadata = {
  title: "Larnark - Projects",
  description: "Discover our portfolio of contemporary tiles, stone, and consulting projects. Explore our expertise in delivering exceptional flooring solutions for residential and commercial spaces.",
};

export default function ProjectsPage() {
  return (
    <div >
      <PageHero
        title="Our Projects"
        bgImage="/assets/images/bg/breadcumb.jpg"
        breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Project" },
        ]}
      />

      <ProjectsSection />
      <FaqSection />
    </div>
  );
}