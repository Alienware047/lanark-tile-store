"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import ThemeToggle from "@/components/theme/theme-toggle";

export default function PremiumHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="bg-card shadow-sm sticky top-0 z-50 border-b border-[var(--color-border)] transition-all duration-300">
      <div className="container mx-auto px-6 py-5 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center flex-shrink-0">
          <Link href="/" className="flex items-center group">
            <img
              src="/assets/images/logo/logo.svg"
              alt="Tile Marketplace"
              className="h-11 w-auto transition-transform group-hover:scale-105"
            />
          </Link>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden xl:flex space-x-1 items-center">
          <div className="group relative">
            <Link
              href="/"
              className="px-4 py-2 text-foreground hover:text-primary transition-colors duration-200 font-medium text-sm hover:bg-[var(--primary-light)] rounded-lg flex items-center gap-1"
            >
              Home
              <ChevronDown className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-all group-hover:rotate-180" />
            </Link>
            {/* Mega submenu */}
            <div className="absolute left-0 top-full w-[700px] bg-card border border-[var(--color-border)] rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 mt-2 p-6 grid grid-cols-3 gap-6 pointer-events-none group-hover:pointer-events-auto">
              {/* Example Home 1 */}
              <div className="text-center group/item cursor-pointer">
                <div className="relative mb-3 rounded-lg overflow-hidden">
                  <img src="/assets/images/header/home-1.png" alt="Home 1" className="rounded-lg shadow-md group-hover/item:shadow-lg transition-shadow h-32 w-full object-cover"/>
                </div>
                <h4 className="text-sm font-semibold text-foreground mb-2">Home 01</h4>
                <div className="flex flex-col gap-2">
                  <Link href="/" className="text-xs text-muted hover:text-primary transition">Multi Page</Link>
                  <Link href="/index-one-page" className="text-xs text-muted hover:text-primary transition">One Page</Link>
                  <Link href="/index-dark" className="text-xs text-muted hover:text-primary transition">Dark Page</Link>
                </div>
              </div>
              {/* Example Home 2 */}
              <div className="text-center group/item cursor-pointer">
                <div className="relative mb-3 rounded-lg overflow-hidden">
                  <img src="/assets/images/header/home-2.png" alt="Home 2" className="rounded-lg shadow-md group-hover/item:shadow-lg transition-shadow h-32 w-full object-cover"/>
                </div>
                <h4 className="text-sm font-semibold text-foreground mb-2">Home 02</h4>
                <div className="flex flex-col gap-2">
                  <Link href="/index2" className="text-xs text-muted hover:text-primary transition">Multi Page</Link>
                  <Link href="/index-two-page" className="text-xs text-muted hover:text-primary transition">One Page</Link>
                  <Link href="/index-2-dark" className="text-xs text-muted hover:text-primary transition">Dark Page</Link>
                </div>
              </div>
              {/* Example Home 3 */}
              <div className="text-center group/item cursor-pointer">
                <div className="relative mb-3 rounded-lg overflow-hidden">
                  <img src="/assets/images/header/home-3.png" alt="Home 3" className="rounded-lg shadow-md group-hover/item:shadow-lg transition-shadow h-32 w-full object-cover"/>
                </div>
                <h4 className="text-sm font-semibold text-foreground mb-2">Home 03</h4>
                <div className="flex flex-col gap-2">
                  <Link href="/index3" className="text-xs text-muted hover:text-primary transition">Multi Page</Link>
                  <Link href="/index-three-page" className="text-xs text-muted hover:text-primary transition">One Page</Link>
                  <Link href="/index-3-dark" className="text-xs text-muted hover:text-primary transition">Dark Page</Link>
                </div>
              </div>
            </div>
          </div>

          <Link href="/about" className="px-4 py-2 text-foreground hover:text-primary hover:bg-[var(--primary-light)] transition-all duration-200 font-medium text-sm rounded-lg">
            About Us
          </Link>

          <div className="group relative">
            <button className="px-4 py-2 text-foreground hover:text-primary transition-colors duration-200 font-medium text-sm hover:bg-[var(--primary-light)] rounded-lg flex items-center gap-1">
              Services
              <ChevronDown className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-all group-hover:rotate-180" />
            </button>
            <ul className="absolute left-0 top-full bg-card border border-[var(--color-border)] rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 mt-2 w-56 pointer-events-none group-hover:pointer-events-auto overflow-hidden">
              <li><Link href="/services" className="block px-4 py-3 hover:bg-[var(--primary-light)] hover:text-primary transition text-sm font-medium">All Services</Link></li>
              <li className="border-t border-[var(--color-border)]"><Link href="/service-details" className="block px-4 py-3 hover:bg-[var(--primary-light)] hover:text-primary transition text-sm font-medium">Service Details</Link></li>
            </ul>
          </div>

          <div className="group relative">
            <button className="px-4 py-2 text-foreground hover:text-primary transition-colors duration-200 font-medium text-sm hover:bg-[var(--primary-light)] rounded-lg flex items-center gap-1">
              Pages
              <ChevronDown className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-all group-hover:rotate-180" />
            </button>
            <ul className="absolute left-0 top-full bg-card border border-[var(--color-border)] rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 mt-2 w-56 pointer-events-none group-hover:pointer-events-auto overflow-hidden">
              <li><Link href="/project" className="block px-4 py-3 hover:bg-[var(--primary-light)] hover:text-primary transition text-sm font-medium">Project</Link></li>
              <li className="border-t border-[var(--color-border)]"><Link href="/team" className="block px-4 py-3 hover:bg-[var(--primary-light)] hover:text-primary transition text-sm font-medium">Team</Link></li>
              <li className="border-t border-[var(--color-border)]"><Link href="/pricing" className="block px-4 py-3 hover:bg-[var(--primary-light)] hover:text-primary transition text-sm font-medium">Pricing</Link></li>
              <li className="border-t border-[var(--color-border)]"><Link href="/gallery" className="block px-4 py-3 hover:bg-[var(--primary-light)] hover:text-primary transition text-sm font-medium">Gallery</Link></li>
              <li className="border-t border-[var(--color-border)]"><Link href="/faq" className="block px-4 py-3 hover:bg-[var(--primary-light)] hover:text-primary transition text-sm font-medium">FAQ</Link></li>
              <li className="border-t border-[var(--color-border)]"><Link href="/login" className="block px-4 py-3 hover:bg-[var(--primary-light)] hover:text-primary transition text-sm font-medium">Login</Link></li>
            </ul>
          </div>

          <Link href="/contact" className="px-4 py-2 text-foreground hover:text-primary hover:bg-[var(--primary-light)] transition-all duration-200 font-medium text-sm rounded-lg">
            Contact
          </Link>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center space-x-3">
          <ThemeToggle />
          <Link
            href="/quote"
            className="hidden xl:inline-flex px-6 py-2.5 rounded-lg bg-[var(--color-primary)] text-[var(--color-primary-foreground)] hover:bg-[var(--primary-hover)] transition-all duration-300 font-semibold text-sm shadow-md hover:shadow-lg hover:scale-105 transform"
          >
            GET A QUOTE
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="xl:hidden p-2.5 rounded-lg bg-surface border border-[var(--color-border)] hover:bg-[var(--primary-light)] transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} className="text-primary" /> : <Menu size={24} className="text-foreground" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="xl:hidden bg-surface border-t border-[var(--color-border)] w-full animate-in slide-in-from-top-2">
          <nav className="flex flex-col space-y-1 p-4">
            <Link href="/" className="px-4 py-3 text-foreground hover:text-primary hover:bg-[var(--primary-light)] transition-colors rounded-lg font-medium">Home</Link>
            <Link href="/about" className="px-4 py-3 text-foreground hover:text-primary hover:bg-[var(--primary-light)] transition-colors rounded-lg font-medium">About Us</Link>
            <Link href="/services" className="px-4 py-3 text-foreground hover:text-primary hover:bg-[var(--primary-light)] transition-colors rounded-lg font-medium">Services</Link>
            <Link href="/contact" className="px-4 py-3 text-foreground hover:text-primary hover:bg-[var(--primary-light)] transition-colors rounded-lg font-medium">Contact</Link>
            <Link href="/quote" className="mx-4 mt-2 px-6 py-3 rounded-lg bg-[var(--color-primary)] text-[var(--color-primary-foreground)] hover:bg-[var(--primary-hover)] transition-all font-semibold text-center shadow-md">
              GET A QUOTE
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
