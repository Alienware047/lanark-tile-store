"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, ChevronRight, Facebook, Twitter, Linkedin, Youtube } from "lucide-react";

export default function Footer() {
  const brandLogos = [
    "/assets/images/logo/clientLogo2_1.png",
    "/assets/images/logo/clientLogo2_2.png",
    "/assets/images/logo/clientLogo2_3.png",
    "/assets/images/logo/clientLogo2_4.png",
    "/assets/images/logo/clientLogo2_5.png",
  ];

  const exploreLinks = [
    { name: "About Us",      href: "/about" },
    { name: "Services",      href: "/services" },
    { name: "Our Blogs",     href: "/blog" },
    { name: "Team Members",  href: "/team" },
    { name: "Contact Us",    href: "/contact" },
  ];

  const servicesLinks = [
    { name: "Carpets & rugs",      href: "/services/carpets-rugs" },
    { name: "Industrial flooring",  href: "/services/industrial-flooring" },
    { name: "Tiling & concrete",   href: "/services/tiling-concrete" },
    { name: "Vein Patterns",       href: "/services/vein-patterns" },
    { name: "Vinyl Plank",         href: "/services/vinyl-plank" },
  ];

  const bottomLinks = [
    { name: "Terms & Condition", href: "/terms" },
    { name: "Privacy Policy",    href: "/privacy" },
    { name: "Contact Us",        href: "/contact" },
  ];

  const socialLinks = [
    { icon: Facebook,  href: "https://facebook.com",  label: "Facebook" },
    { icon: Twitter,   href: "https://twitter.com",   label: "Twitter" },
    { icon: Linkedin,  href: "https://linkedin.com",  label: "LinkedIn" },
    { icon: Youtube,   href: "https://youtube.com",   label: "YouTube" },
  ];

  return (
    <footer className="footer-section relative bg-color1 text-[var(--text-main)]">

      {/* Top Brand Logos Row */}
      <div className="container mx-auto py-6 flex flex-wrap justify-center gap-4">
        {brandLogos.map((logo, idx) => (
          <div key={idx} className="flex-shrink-0 w-20 h-12 relative">
            <Image src={logo} alt={`brand-${idx}`} fill style={{ objectFit: "contain" }} />
          </div>
        ))}
      </div>

      {/* Footer Widgets */}
      <div className="footer-widgets-wrapper py-10">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Logo + About */}
          <div>
            <div className="mb-4">
              <Link href="/">
                <Image src="/assets/images/logo/logo4.svg" alt="logo" width={150} height={50} />
              </Link>
            </div>

            <p className="mb-4 text-[var(--text-muted)]">
              There are many variations of passages of Lorem Ipsum available
            </p>

            <div className="flex space-x-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-[var(--text-main)] hover:text-[var(--theme-primary)] transition"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="flex items-center mb-4 font-semibold">
              <Image
                src="/assets/images/shape/footertitleShape1_1.png"
                alt=""
                width={20}
                height={20}
                className="mr-2"
              />
              Explore
            </h3>

            <ul className="space-y-2">
              {exploreLinks.map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--theme-primary)] transition"
                  >
                    <ChevronRight size={16} className="text-[var(--theme-primary)]" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="flex items-center mb-4 font-semibold">
              <Image
                src="/assets/images/shape/footertitleShape1_1.png"
                alt=""
                width={20}
                height={20}
                className="mr-2"
              />
              Services
            </h3>

            <ul className="space-y-2">
              {servicesLinks.map((service, idx) => (
                <li key={idx}>
                  <Link
                    href={service.href}
                    className="flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--theme-primary)] transition"
                  >
                    <ChevronRight size={16} className="text-[var(--theme-primary)]" />
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="flex items-center mb-4 font-semibold">
              <Image
                src="/assets/images/shape/footertitleShape1_1.png"
                alt=""
                width={20}
                height={20}
                className="mr-2"
              />
              Get In Touch
            </h3>

            <ul className="space-y-3">
              <li>
                <a
                  href="https://maps.google.com/?q=6391+Elgin+St+Celina+USA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--theme-primary)] transition"
                >
                  <MapPin size={18} className="text-[var(--theme-primary)] shrink-0" />
                  6391 Elgin St. Celina, USA
                </a>
              </li>

              <li>
                <a
                  href="tel:+12086660112"
                  className="flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--theme-primary)] transition"
                >
                  <Phone size={18} className="text-[var(--theme-primary)] shrink-0" />
                  +208-666-0112
                </a>
              </li>

              <li>
                <a
                  href="mailto:floremh@gmail.com"
                  className="flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--theme-primary)] transition"
                >
                  <Mail size={18} className="text-[var(--theme-primary)] shrink-0" />
                  floremh@gmail.com
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom */}
      <div className="footer-bottom bg-color2 py-4">
        <div className="container mx-auto flex flex-wrap justify-between items-center gap-3">
          <p className="text-[var(--text-muted)]">
            © All Copyright 2024 by Florem
          </p>

          <div className="flex flex-wrap gap-4">
            {bottomLinks.map((link, idx) => (
              <Link
                key={idx}
                href={link.href}
                className="text-[var(--text-muted)] hover:text-[var(--theme-secondary)] transition"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

    </footer>
  );
}