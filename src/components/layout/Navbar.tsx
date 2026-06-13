"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Menu,
  X,
  ChevronDown,
  Phone,
  Home,
  Building2,
  Car,
  Bike,
  Warehouse,
  Package,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { COMPANY } from "@/lib/constants";

const serviceItems = [
  { icon: Home, label: "Household Shifting", href: "#services" },
  { icon: Building2, label: "Office Relocation", href: "#services" },
  { icon: Car, label: "Car Transportation", href: "#services" },
  { icon: Bike, label: "Bike Transportation", href: "#services" },
  { icon: Warehouse, label: "Warehousing", href: "#services" },
  { icon: Package, label: "Packing Services", href: "#services" },
];

const navLinks = [
  { label: "Home", href: "#" },
  { label: "About", href: "#why-us" },
  { label: "Process", href: "#process" },
  { label: "Cities", href: "#cities" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close drawer on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMobileOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-colors duration-300 ${
          scrolled
            ? "bg-brand-navy/95 backdrop-blur-xl shadow-2xl border-b border-white/5"
            : "bg-brand-navy"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 lg:h-24">

            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <div className="relative h-16 w-52 lg:h-20 lg:w-64">
                <Image
                  src="/logo.png"
                  alt="Sarkar Packers and Movers Pvt. Ltd."
                  fill
                  sizes="(max-width: 1024px) 208px, 256px"
                  className="object-contain"
                  priority
                />
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="px-4 py-2 text-gray-300 hover:text-white text-sm font-medium transition-colors duration-200 rounded-lg hover:bg-white/5"
                >
                  {link.label}
                </Link>
              ))}

              {/* Services dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <button className="flex items-center gap-1 px-4 py-2 text-gray-300 hover:text-white text-sm font-medium transition-colors duration-200 rounded-lg hover:bg-white/5">
                  Services
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      servicesOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Mega menu — CSS transition only, no framer-motion */}
                <div
                  className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[520px] bg-brand-navy-light border border-white/10 rounded-2xl shadow-2xl p-5 grid grid-cols-2 gap-2 transition-all duration-200 origin-top ${
                    servicesOpen
                      ? "opacity-100 scale-100 pointer-events-auto"
                      : "opacity-0 scale-95 pointer-events-none"
                  }`}
                >
                  {serviceItems.map(({ icon: Icon, label, href }) => (
                    <Link
                      key={label}
                      href={href}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-brand-red/10 hover:text-brand-red text-gray-300 transition-all duration-200 group"
                    >
                      <div className="w-8 h-8 bg-brand-red/10 rounded-lg flex items-center justify-center group-hover:bg-brand-red/20 transition-colors duration-200">
                        <Icon className="w-4 h-4 text-brand-red" />
                      </div>
                      <span className="text-sm font-medium">{label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </nav>

            {/* CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href={`tel:${COMPANY.phone}`}
                className="flex items-center gap-2 text-gray-300 hover:text-white text-sm transition-colors duration-200"
              >
                <Phone className="w-4 h-4 text-brand-red" />
                <span className="font-medium">{COMPANY.phone}</span>
              </a>
              <Button size="sm" asChild>
                <a href="#quote">Get Free Quote</a>
              </Button>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors duration-200"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile drawer — CSS slide-in, no framer-motion */}
      <div
        ref={drawerRef}
        className={`fixed right-0 top-0 h-full w-80 bg-brand-navy border-l border-white/10 z-50 lg:hidden overflow-y-auto transition-transform duration-300 ease-in-out ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!mobileOpen}
      >
        <div className="p-6">
          {/* Drawer header */}
          <div className="flex items-center justify-between mb-8">
            <div className="relative h-12 w-40">
              <Image
                src="/logo.png"
                alt="Sarkar Packers and Movers"
                fill
                sizes="160px"
                className="object-contain"
              />
            </div>
            <button
              onClick={() => setMobileOpen(false)}
              className="text-gray-400 hover:text-white p-1 transition-colors duration-200"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav links */}
          <nav className="space-y-1 mb-6">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-200 font-medium"
              >
                {link.label}
              </Link>
            ))}

            <div className="px-4 py-2">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Services
              </p>
              {serviceItems.map(({ icon: Icon, label, href }) => (
                <Link
                  key={label}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 py-2.5 text-gray-400 hover:text-white transition-colors duration-200"
                >
                  <Icon className="w-4 h-4 text-brand-red" />
                  <span className="text-sm">{label}</span>
                </Link>
              ))}
            </div>
          </nav>

          {/* Drawer footer */}
          <div className="space-y-3 pt-4 border-t border-white/10">
            <a
              href={`tel:${COMPANY.phone}`}
              className="flex items-center gap-2 text-gray-300 text-sm"
            >
              <Phone className="w-4 h-4 text-brand-red" />
              {COMPANY.phone}
            </a>
            <Button className="w-full" asChild>
              <a href="#quote" onClick={() => setMobileOpen(false)}>
                Get Free Quote
              </a>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
