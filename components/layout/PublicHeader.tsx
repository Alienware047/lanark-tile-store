"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import ThemeToggle from "@/components/theme/theme-toggle";

export default function PremiumHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[var(--color-card)] border-b border-[var(--border-strong)] shadow-sm">

      {/* CONTAINER */}
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <Link href="/" className="flex items-center">
          <img
            src="/assets/images/logo/logo.svg"
            alt="Logo"
            className="h-11 w-auto"
          />
        </Link>


        {/* DESKTOP MENU */}
        <nav className="hidden xl:flex items-center space-x-2">

          {/* HOME */}
          <div className="relative group">

            <Link
              href="/"
              className="flex items-center gap-1 px-4 py-2 rounded-lg text-[var(--color-foreground)] hover:text-[var(--color-primary)] hover:bg-[var(--primary-light)] transition font-medium text-sm"
            >
              Home

              <ChevronDown className="w-3 h-3 opacity-60 group-hover:rotate-180 transition" />

            </Link>


            {/* MEGA MENU */}
            <div className="absolute left-0 top-full mt-3 w-[700px]
            bg-[var(--color-card)]
            border border-[var(--color-border)]
            shadow-lg
            rounded-xl
            opacity-0 invisible
            group-hover:visible group-hover:opacity-100
            transition-all duration-300
            p-6
            grid grid-cols-3 gap-6">


              {/* ITEM */}
              <MegaItem
                img="/assets/images/header/home-1.png"
                title="Home 01"
                links={[
                  { name: "Multi Page", href: "/" },
                  { name: "One Page", href: "/index-one-page" },
                  { name: "Dark Page", href: "/index-dark" },
                ]}
              />

              <MegaItem
                img="/assets/images/header/home-2.png"
                title="Home 02"
                links={[
                  { name: "Multi Page", href: "/index2" },
                  { name: "One Page", href: "/index-two-page" },
                  { name: "Dark Page", href: "/index-2-dark" },
                ]}
              />

              <MegaItem
                img="/assets/images/header/home-3.png"
                title="Home 03"
                links={[
                  { name: "Multi Page", href: "/index3" },
                  { name: "One Page", href: "/index-three-page" },
                  { name: "Dark Page", href: "/index-3-dark" },
                ]}
              />


            </div>

          </div>


          {/* SIMPLE LINKS */}

          <NavLink href="/about">About</NavLink>


          {/* SERVICES */}
          <Dropdown
            title="Services"
            links={[
              { name: "All Services", href: "/services" },
              { name: "Service Details", href: "/service-details" },
            ]}
          />


          {/* PAGES */}
          <Dropdown
            title="Pages"
            links={[
              { name: "Project", href: "/project" },
              { name: "Team", href: "/team" },
              { name: "Pricing", href: "/pricing" },
              { name: "Gallery", href: "/gallery" },
              { name: "FAQ", href: "/faq" },
              { name: "Login", href: "/login" },
            ]}
          />

          {/* PAGES */}
          <Dropdown
            title="Shop"
            links={[
              { name: "Shop", href: "/shop" },
              { name: "Shop Details", href: "/shop-details" },
              { name: "Checkout", href: "/checkout" },
              // { name: "Gallery", href: "/gallery" },
              // { name: "FAQ", href: "/faq" },
              // { name: "Login", href: "/login" },
            ]}
          />


          <NavLink href="/contact">Contact</NavLink>


        </nav>


        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3">

          <ThemeToggle />


          {/* BUTTON */}
          <Link
            href="/quote"
            className="hidden xl:inline-flex px-6 py-2.5 rounded-lg
            bg-[var(--color-primary)]
            text-[var(--color-primary-foreground)]
            hover:bg-[var(--primary-hover)]
            transition
            font-semibold
            text-sm
            shadow-md hover:shadow-lg"
          >
            GET A QUOTE
          </Link>


          {/* MOBILE BUTTON */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="xl:hidden p-2 rounded-lg
            bg-[var(--surface)]
            border border-[var(--color-border)]"
          >

            {mobileOpen ? (
              <X size={24} />
            ) : (
              <Menu size={24} />
            )}

          </button>


        </div>


      </div>



      {/* MOBILE MENU */}
      {mobileOpen && (

        <div className="xl:hidden
        bg-[var(--color-card)]
        border-t border-[var(--border-strong)]
        shadow-lg">

          <nav className="flex flex-col p-4 space-y-2">

            <MobileLink href="/">Home</MobileLink>

            <MobileLink href="/about">About</MobileLink>

            <MobileLink href="/services">Services</MobileLink>

            <MobileLink href="/contact">Contact</MobileLink>


            <Link
              href="/quote"
              className="mt-3 text-center
              px-6 py-3 rounded-lg
              bg-[var(--color-primary)]
              text-[var(--color-primary-foreground)]
              font-semibold"
            >
              GET A QUOTE
            </Link>


          </nav>

        </div>

      )}


    </header>
  );
}



function NavLink({ href, children }: any) {

  return (

    <Link
      href={href}
      className="px-4 py-2 rounded-lg
      text-[var(--color-foreground)]
      hover:text-[var(--color-primary)]
      hover:bg-[var(--primary-light)]
      transition font-medium text-sm"
    >
      {children}
    </Link>

  );

}



function MobileLink({ href, children }: any) {

  return (

    <Link
      href={href}
      className="px-4 py-3 rounded-lg
      text-[var(--color-foreground)]
      hover:text-[var(--color-primary)]
      hover:bg-[var(--primary-light)]"
    >
      {children}
    </Link>

  );

}



function Dropdown({ title, links }: any) {

  return (

    <div className="relative group">

      <button
        className="flex items-center gap-1 px-4 py-2 rounded-lg
        text-[var(--color-foreground)]
        hover:text-[var(--color-primary)]
        hover:bg-[var(--primary-light)]
        transition font-medium text-sm"
      >
        {title}

        <ChevronDown className="w-3 h-3 group-hover:rotate-180 transition" />

      </button>


      <ul className="
      absolute top-full left-0 mt-2 w-56
      bg-[var(--color-card)]
      border border-[var(--color-border)]
      shadow-lg
      rounded-lg
      opacity-0 invisible
      group-hover:visible group-hover:opacity-100
      transition
      ">

        {links.map((link: any, i: number) => (

          <li key={i}>

            <Link
              href={link.href}
              className="block px-4 py-3 hover:bg-[var(--primary-light)] hover:text-[var(--color-primary)]"
            >
              {link.name}
            </Link>

          </li>

        ))}

      </ul>

    </div>

  );

}



function MegaItem({ img, title, links }: any) {

  return (

    <div>

      <img
        src={img}
        className="rounded-lg mb-3"
      />

      <h4 className="font-semibold mb-2">{title}</h4>


      <div className="flex flex-col gap-1">

        {links.map((link: any, i: number) => (

          <Link
            key={i}
            href={link.href}
            className="text-sm text-[var(--text-muted)] hover:text-[var(--color-primary)]"
          >
            {link.name}
          </Link>

        ))}

      </div>

    </div>

  );

}