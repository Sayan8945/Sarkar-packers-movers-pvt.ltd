"use client";

import { motion } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";
import { CITIES } from "@/lib/constants";

export default function CitySection() {
  return (
    <section id="cities" className="py-20 lg:py-28 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-red/20 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50/50 to-white" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 bg-brand-red/10 text-brand-red text-xs font-semibold uppercase tracking-wider rounded-full mb-3">
            Pan India Coverage
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-navy mb-4">
            We Move You Anywhere in{" "}
            <span className="text-gradient">India</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            With a network spanning 100+ cities, we ensure seamless relocation to
            every corner of the country.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* India map visual */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative bg-gradient-to-br from-brand-navy to-brand-navy-light rounded-3xl overflow-hidden aspect-square max-w-lg mx-auto shadow-2xl border border-white/5">
              {/* Stylized India map outline using SVG */}
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full p-6 opacity-20"
                fill="none"
              >
                <path
                  d="M50,8 L62,12 L70,20 L75,32 L72,45 L65,55 L68,65 L62,75 L55,85 L50,92 L45,85 L38,75 L32,65 L35,55 L28,45 L25,32 L30,20 L38,12 Z"
                  stroke="rgba(225,29,72,0.6)"
                  strokeWidth="0.5"
                  fill="rgba(225,29,72,0.05)"
                />
              </svg>

              {/* City dots */}
              {CITIES.map((city, i) => (
                <motion.div
                  key={city.name}
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.4, type: "spring" }}
                  className="absolute group"
                  style={{ left: `${city.x}%`, top: `${city.y}%`, transform: "translate(-50%, -50%)" }}
                >
                  <div className="relative">
                    <motion.div
                      animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0, 0.6] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                      className={`absolute inset-0 rounded-full ${city.isHQ ? "bg-brand-red" : "bg-blue-400"}`}
                    />
                    <div
                      className={`relative w-3 h-3 rounded-full border-2 border-white shadow-lg cursor-pointer ${
                        city.isHQ ? "bg-brand-red" : "bg-blue-400"
                      }`}
                    />
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-white text-brand-navy text-xs font-semibold rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                      {city.name}
                      {city.isHQ && (
                        <span className="ml-1 text-brand-red text-[10px]">(HQ)</span>
                      )}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white" />
                    </div>
                  </div>
                </motion.div>
              ))}

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-gray-400">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-brand-red" />
                  <span>Headquarters (Kolkata)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-400" />
                  <span>Service Cities</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* City grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-xl font-bold text-brand-navy mb-6">
              Major Cities We Serve
            </h3>
            <div className="grid grid-cols-2 gap-3 mb-8">
              {CITIES.slice(0, 12).map((city, i) => (
                <motion.div
                  key={city.name}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-2 group cursor-pointer"
                >
                  <MapPin
                    className={`w-4 h-4 flex-shrink-0 transition-colors duration-200 ${
                      city.isHQ ? "text-brand-red" : "text-gray-400 group-hover:text-brand-red"
                    }`}
                  />
                  <span
                    className={`text-sm transition-colors duration-200 ${
                      city.isHQ
                        ? "font-bold text-brand-red"
                        : "text-gray-600 group-hover:text-brand-navy font-medium"
                    }`}
                  >
                    {city.name}
                    {city.isHQ && (
                      <span className="ml-1 text-[10px] bg-brand-red/10 text-brand-red px-1.5 py-0.5 rounded-full">HQ</span>
                    )}
                  </span>
                </motion.div>
              ))}
            </div>

            <div className="bg-brand-red/5 border border-brand-red/10 rounded-2xl p-5">
              <p className="text-brand-navy font-semibold mb-1">Don&apos;t see your city?</p>
              <p className="text-gray-500 text-sm mb-4">
                We service 100+ cities across India. Contact us for your specific location.
              </p>
              <a
                href="#quote"
                className="inline-flex items-center gap-2 text-brand-red hover:text-brand-red-dark font-semibold text-sm transition-colors duration-200 group"
              >
                Check availability
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
