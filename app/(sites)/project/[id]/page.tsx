import { notFound } from "next/navigation";
import { projects } from "@/lib/projects";
import Image from "next/image";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} | Larnark Projects`,
    description: project.description,
  };
}

export default async function ProjectDetails({ params }: PageProps) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);

  if (!project) return notFound();

  return (
    <section className="py-28 bg-[var(--color-background)]">
      <div className="max-w-5xl mx-auto px-6">

        <h1 className="text-4xl font-bold mb-6">
          {project.title}
        </h1>

        <div className="relative w-full h-[500px] rounded-2xl overflow-hidden mb-10">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
          />
        </div>

        <p className="text-lg leading-relaxed mb-8">
          {project.description}
        </p>

        <div className="flex gap-6 text-sm opacity-70">
          <span><strong>Category:</strong> {project.category}</span>
          {project.location && <span><strong>Location:</strong> {project.location}</span>}
          {project.year && <span><strong>Year:</strong> {project.year}</span>}
        </div>

      </div>
    </section>
  );
}