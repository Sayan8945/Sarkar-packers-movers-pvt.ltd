"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
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
  Truck,
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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          scrolled
            ? "bg-brand-navy/95 backdrop-blur-xl shadow-2xl border-b border-white/5"
            : "bg-brand-navy"
        }`}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 bg-brand-red rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-red-glow transition-all duration-300">
                <Truck className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-white font-bold text-lg leading-tight block">
                  OM <span className="text-brand-red">Packers</span>
                </span>
                <span className="text-gray-400 text-[10px] uppercase tracking-widest leading-tight">
                  & Movers
                </span>
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

              {/* Services Mega Menu */}
              <div
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <button className="flex items-center gap-1 px-4 py-2 text-gray-300 hover:text-white text-sm font-medium transition-colors duration-200 rounded-lg hover:bg-white/5">
                  Services
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`}
                  />
                </button>

                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[520px] bg-brand-navy-light border border-white/10 rounded-2xl shadow-2xl p-5 grid grid-cols-2 gap-2"
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
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </nav>

            {/* CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <a href={`tel:${COMPANY.phone}`} className="flex items-center gap-2 text-gray-300 hover:text-white text-sm transition-colors duration-200">
                <Phone className="w-4 h-4 text-brand-red" />
                <span className="font-medium">{COMPANY.phone}</span>
              </a>
              <Button size="sm" asChild>
                <a href="#quote">Get Free Quote</a>
              </Button>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed right-0 top-0 h-full w-80 bg-brand-navy border-l border-white/10 z-40 lg:hidden overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-brand-red rounded-lg flex items-center justify-center">
                      <Truck className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-white font-bold">OM Packers</span>
                  </div>
                  <button onClick={() => setMobileOpen(false)} className="text-gray-400 hover:text-white p-1">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <nav className="space-y-1 mb-6">
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-200 font-medium"
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                  <div className="px-4 py-2">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Services</p>
                    {serviceItems.map(({ icon: Icon, label, href }, i) => (
                      <motion.div
                        key={label}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + i * 0.05 }}
                      >
                        <Link
                          href={href}
                          onClick={() => setMobileOpen(false)}
                          className="flex items-center gap-3 py-2.5 text-gray-400 hover:text-white transition-colors duration-200"
                        >
                          <Icon className="w-4 h-4 text-brand-red" />
                          <span className="text-sm">{label}</span>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </nav>

                <div className="space-y-3 pt-4 border-t border-white/10">
                  <a href={`tel:${COMPANY.phone}`} className="flex items-center gap-2 text-gray-300 text-sm">
                    <Phone className="w-4 h-4 text-brand-red" />
                    {COMPANY.phone}
                  </a>
                  <Button className="w-full" asChild>
                    <a href="#quote" onClick={() => setMobileOpen(false)}>Get Free Quote</a>
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
