import Image from "next/image";
import { notFound } from "next/navigation";
import { team } from "@/lib/Team-data";
import Reveal from "@/components/UI/Reveal";
import { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";
import { Briefcase, Clock, Mail, Phone, User, Award,} from "lucide-react";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

// Optional: Dynamic metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const member = team.find((m) => m.id === id);

  if (!member) {
    return {
      title: "Team Member Not Found",
    };
  }

  return {
    title: `${member.name} | Lannark Team`,
    description: member.description,
  };
}

export default async function TeamMemberPage({ params }: PageProps) {
  const { id } = await params;
  const member = team.find((m) => m.id === id);

  if (!member) {
    notFound();
  }

  return (
    <>
    <PageHero
                title="Team Details"
                bgImage="/assets/images/bg/breadcumb.jpg"
                breadcrumbs={[
                    { label: "Home", href: "/" },
                    { label: "Team Details" },
                ]}
     />
    <section className="py-24 bg-[var(--color-background)]">
      <div className="container mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* LEFT SIDE */}
          <div className="space-y-8">

            {/* Image */}
            <Reveal>
              <div className="relative w-full h-[520px] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
            </Reveal>

            {/* Info Card */}
            <Reveal delay={0.1}>
              <div className="p-6 rounded-2xl bg-[var(--color-card)] border border-[var(--color-border)] space-y-5">

                {/* Experience */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-sm text-[var(--color-muted-foreground)]">
                    <Briefcase size={16} />
                    <span>Experience</span>
                  </div>
                  <span className="font-medium text-[var(--color-foreground)]">
                    {member.experience}
                  </span>
                </div>

                {/* Availability */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-sm text-[var(--color-muted-foreground)]">
                    <Clock size={16} />
                    <span>Availability</span>
                  </div>
                  <span className="px-3 py-1 text-xs rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                    {member.availabilty}
                  </span>
                </div>

                {/* Email */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-sm text-[var(--color-muted-foreground)]">
                    <Mail size={16} />
                    <span>Email</span>
                  </div>
                  <span className="text-sm text-[var(--color-foreground)]">
                    {member.email}
                  </span>
                </div>

                {/* Phone */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-sm text-[var(--color-muted-foreground)]">
                    <Phone size={16} />
                    <span>Phone</span>
                  </div>
                  <span className="text-sm text-[var(--color-foreground)]">
                    {member.phone_number}
                  </span>
                </div>

              </div>
            </Reveal>

          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-10">

            {/* Name & Role */}
            <div>
              <Reveal delay={0.15}>
                <h1 className="text-4xl lg:text-5xl font-bold text-[var(--color-foreground)] mb-3">
                  {member.name}
                </h1>
              </Reveal>

              <Reveal delay={0.2}>
                <p className="text-lg text-[var(--color-primary)] font-medium">
                  {member.role}
                </p>
              </Reveal>
            </div>

            {/* About */}
            <Reveal delay={0.3}>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <User size={18} className="text-[var(--color-primary)]" />
                  <h3 className="text-xl font-semibold">
                    About Me
                  </h3>
                </div>

                <p className="text-[var(--color-muted-foreground)] leading-relaxed">
                  {member.about_me}
                </p>
              </div>
            </Reveal>

            {/* Professional Overview */}
            <Reveal delay={0.35}>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Award size={18} className="text-[var(--color-primary)]" />
                  <h3 className="text-xl font-semibold">
                    Professional Overview
                  </h3>
                </div>

                <p className="text-[var(--color-muted-foreground)] leading-relaxed">
                  {member.description}
                </p>
              </div>
            </Reveal>

            {/* Skills */}
            <Reveal delay={0.4}>
              <div>
                <h3 className="text-xl font-semibold mb-4">
                  Personal Skills
                </h3>

                <div className="flex flex-wrap gap-3">
                  {member.personal_skills.map((skill, index) => (
                    <span
                      key={index}
                      className="
                      px-4 py-2
                      text-sm
                      rounded-full
                      bg-[var(--color-card)]
                      border border-[var(--color-border)]
                      hover:bg-[var(--color-primary)]
                      hover:text-white
                      transition
                      "
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>

          </div>

        </div>

      </div>
    </section>
    </>
  );
}