"use client";

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
    { name: "About Us", href: "about.html" },
    { name: "Services", href: "services.html" },
    { name: "Our Blogs", href: "blog.html" },
    { name: "Team Members", href: "team.html" },
    { name: "Contact Us", href: "contact.html" },
  ];

  const servicesLinks = [
    "Carpets & rugs",
    "industrial flooring",
    "Tiling & concrete",
    "Vein Patterns",
    "Vinyl Plank",
  ];

  const bottomLinks = [
    { name: "Terms & Condition", href: "contact.html" },
    { name: "Privacy Policy", href: "contact.html" },
    { name: "Contact Us", href: "contact.html" },
  ];

  return (
    <footer className="footer-section relative bg-color1 text-gray-800">
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
          <div className="single-footer-widget wow fadeInUp" data-wow-delay=".2s">
            <div className="widget-head mb-4">
              <a href="index.html" className="inline-block">
                <Image src="/assets/images/logo/logo4.svg" alt="logo" width={150} height={50} />
              </a>
            </div>
            <p className="mb-4">
              There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some
            </p>
            <div className="flex space-x-3">
              <a href="#" className="hover:text-theme-color transition"><Facebook size={20} /></a>
              <a href="#" className="hover:text-theme-color transition"><Twitter size={20} /></a>
              <a href="#" className="hover:text-theme-color transition"><Linkedin size={20} /></a>
              <a href="#" className="hover:text-theme-color transition"><Youtube size={20} /></a>
            </div>
          </div>

          {/* Explore Links */}
          <div className="single-footer-widget wow fadeInUp" data-wow-delay=".4s">
            <h3 className="flex items-center mb-4">
              <Image src="/assets/images/shape/footertitleShape1_1.png" alt="shape" width={20} height={20} className="me-1 mr-2" />
              Explore
            </h3>
            <ul className="space-y-2">
              {exploreLinks.map((link, idx) => (
                <li key={idx}>
                  <a href={link.href} className="flex items-center gap-2 hover:text-theme-color transition">
                    <ChevronRight size={16} /> {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div className="single-footer-widget wow fadeInUp" data-wow-delay=".6s">
            <h3 className="flex items-center mb-4">
              <Image src="/assets/images/shape/footertitleShape1_1.png" alt="shape" width={20} height={20} className="me-1 mr-2" />
              Services
            </h3>
            <ul className="space-y-2">
              {servicesLinks.map((service, idx) => (
                <li key={idx}>
                  <a href="service-details.html" className="flex items-center gap-2 hover:text-theme-color transition">
                    <ChevronRight size={16} /> {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="single-footer-widget wow fadeInUp" data-wow-delay=".8s">
            <h3 className="flex items-center mb-4">
              <Image src="/assets/images/shape/footertitleShape1_1.png" alt="shape" width={20} height={20} className="me-1 mr-2" />
              Get In Touch
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="https://www.google.com/maps/place/Egens+Lab/@23.8340712,90.3631117,17z" className="flex items-center gap-2 hover:text-theme-color transition">
                  <MapPin size={18} className="text-theme-color" />
                  6391 Elgin St. Celina, USA
                </a>
              </li>
              <li>
                <a href="tel:0123456789101" className="flex items-center gap-2 hover:text-theme-color transition">
                  <Phone size={18} className="text-theme-color" />
                  +208-666-0112
                </a>
              </li>
              <li>
                <a href="mailto:Infotech@gmail.com" className="flex items-center gap-2 hover:text-theme-color transition">
                  <Mail size={18} className="text-theme-color" />
                  floremh@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom bg-color2 py-4">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="wow fadeInLeft" data-wow-delay=".3s">© All Copyright 2024 by Florem</p>
          <ul className="flex gap-4 wow fadeInRight" data-wow-delay=".5s">
            {bottomLinks.map((link, idx) => (
              <li key={idx}>
                <a href={link.href} className="text-white hover:text-theme-color transition">{link.name}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}