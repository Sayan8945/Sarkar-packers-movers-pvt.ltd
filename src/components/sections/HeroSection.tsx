"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Award, Shield, Star, ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import QuoteForm from "@/components/sections/QuoteForm";
import { COMPANY } from "@/lib/constants";

const trustBadges = [
  { icon: Award, text: "IBA Approved" },
  { icon: Shield, text: "Fully Insured" },
  { icon: Star, text: "4.9★ Rated" },
];

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-brand-navy"
    >
      {/* Parallax background */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 z-0"
      >
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-navy via-brand-navy-light to-brand-navy opacity-90 z-10" />
        {/* Optimised bg via Next/Image */}
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1920&q=60"
            alt=""
            fill
            sizes="100vw"
            priority
            className="object-cover opacity-20"
            aria-hidden="true"
          />
        </div>

        {/* Animated grid */}
        <div
          className="absolute inset-0 opacity-[0.03] z-10"
          style={{
            backgroundImage: `linear-gradient(rgba(225,29,72,1) 1px, transparent 1px), linear-gradient(90deg, rgba(225,29,72,1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Glow orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-red/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </motion.div>

      {/* Floating truck */}
      <div className="absolute bottom-20 left-0 right-0 z-10 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ x: ["calc(-150px)", "calc(110vw)"] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear", repeatDelay: 3 }}
          className="inline-block"
        >
          <div className="text-7xl opacity-30 filter grayscale">🚚</div>
        </motion.div>
      </div>

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 bg-brand-red rounded-full opacity-40"
          style={{
            left: `${15 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{ y: [0, -20, 0], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.4 }}
        />
      ))}

      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left content */}
          <motion.div style={{ y: textY }} className="text-center lg:text-left">
            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-wrap justify-center lg:justify-start gap-2 mb-6"
            >
              {trustBadges.map(({ icon: Icon, text }, i) => (
                <motion.div
                  key={text}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * i, duration: 0.4 }}
                  className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1.5"
                >
                  <Icon className="w-3.5 h-3.5 text-brand-red" />
                  <span className="text-white text-xs font-medium">{text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight mb-6"
            >
              IBA Approved{" "}
              <span className="relative">
                <span className="text-gradient">Packers &</span>
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-red to-brand-red-light"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 1 }}
                />
              </span>
              <br />
              <span className="text-gradient">Movers</span>{" "}
              <span className="text-white/90">in India</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl text-gray-300 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0"
            >
              Safe, Secure and Trusted Relocation Services Across India.{" "}
              <span className="text-white font-medium">17+ years</span> of excellence in
              helping families and businesses move.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap gap-4 justify-center lg:justify-start mb-10"
            >
              <Button size="lg" asChild className="group">
                <a href="#quote">
                  Get Free Quote
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </a>
              </Button>
              <Button size="lg" variant="ghost-white" asChild>
                <a href={`tel:${COMPANY.phone}`}>
                  <Phone className="w-4 h-4" />
                  Call Now
                </a>
              </Button>
            </motion.div>

            {/* Mini stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="grid grid-cols-3 gap-4 max-w-sm mx-auto lg:mx-0"
            >
              {[
                { value: "5000+", label: "Customers" },
                { value: "100+", label: "Cities" },
                { value: "17+", label: "Years" },
              ].map(({ value, label }) => (
                <div key={label} className="text-center lg:text-left">
                  <div className="text-2xl font-bold text-brand-red">{value}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right – Quote Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            id="quote"
          >
            <QuoteForm />
          </motion.div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,60 C360,20 1080,20 1440,60 L1440,60 L0,60 Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}
