"use client";

import { motion } from "framer-motion";
import { MapPin, ArrowRight, Users, Truck, Globe, Star } from "lucide-react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import EasternIndiaMap from "@/components/network/EasternIndiaMap";

/* ── Coverage stats ─────────────────────────────────────── */
const STATS = [
  { icon: MapPin,  value: 30,   suffix: "+", label: "Cities Covered",         color: "text-brand-red",  bg: "bg-brand-red/10"  },
  { icon: Globe,   value: 5,    suffix: "",  label: "States Served",           color: "text-blue-400",   bg: "bg-blue-400/10"   },
  { icon: Star,    value: 17,   suffix: "+", label: "Years Experience",        color: "text-amber-400",  bg: "bg-amber-400/10"  },
  { icon: Users,   value: 5000, suffix: "+", label: "Successful Relocations",  color: "text-emerald-400",bg: "bg-emerald-400/10"},
  { icon: Truck,   value: 100,  suffix: "%", label: "Safe Deliveries",         color: "text-purple-400", bg: "bg-purple-400/10" },
];

/* ── State-grouped city pills ───────────────────────────── */
const STATE_CITIES = [
  { state: "West Bengal",  color: "border-brand-red/30 text-brand-red",     cities: ["Siliguri (HQ)", "Kolkata", "Howrah", "Durgapur", "Asansol", "Haldia", "Kharagpur", "Bardhaman", "Malda", "Jalpaiguri", "Cooch Behar", "Alipurduar", "Dinhata", "Mathabhanga", "Mal Bazar"] },
  { state: "Assam",        color: "border-blue-400/30 text-blue-400",       cities: ["Guwahati", "Silchar", "Jorhat", "Dibrugarh", "Nagaon"] },
  { state: "Bihar",        color: "border-amber-400/30 text-amber-400",     cities: ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Purnia"] },
  { state: "Odisha",       color: "border-emerald-400/30 text-emerald-400", cities: ["Bhubaneswar", "Cuttack", "Puri", "Rourkela", "Sambalpur"] },
  { state: "Jharkhand",    color: "border-purple-400/30 text-purple-400",   cities: ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro"] },
];

export default function CitySection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section id="cities" className="py-20 lg:py-28 bg-brand-navy relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-brand-navy via-brand-navy-light to-brand-navy" />
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{ backgroundImage: "radial-gradient(circle, rgba(225,29,72,1) 1px, transparent 1px)", backgroundSize: "36px 36px" }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ─────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 bg-brand-red/20 text-brand-red text-xs font-semibold uppercase tracking-wider rounded-full mb-3 border border-brand-red/20">
            Our Network
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Coverage Across{" "}
            <span className="text-gradient">Eastern India</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Serving Eastern India with trusted packing and moving solutions —
            headquartered in Siliguri with operations spanning West Bengal, Assam,
            Bihar, Odisha, and Jharkhand.
          </p>
        </motion.div>

        {/* ── Desktop: Map left + Stats+Cities right ─── */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* Map */}
          <div className="flex flex-col gap-6">
            <EasternIndiaMap />

            {/* Mobile-only stats (shown below map on small screens) */}
            <div ref={ref} className="grid grid-cols-2 gap-3 lg:hidden">
              {STATS.map((s, i) => {
                const Icon = s.icon;
                return (
                  <motion.div key={s.label}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07 }}
                    className="bg-white/5 border border-white/8 rounded-xl px-4 py-3 flex items-center gap-3"
                  >
                    <div className={`w-8 h-8 ${s.bg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`w-4 h-4 ${s.color}`} />
                    </div>
                    <div className="min-w-0">
                      <div className={`text-lg font-bold ${s.color} leading-none`}>
                        {inView ? <CountUp end={s.value} duration={2} separator="," /> : 0}{s.suffix}
                      </div>
                      <p className="text-gray-500 text-[10px] mt-0.5 leading-tight">{s.label}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right column: stats (desktop) + city list + CTA */}
          <div className="flex flex-col gap-8">

            {/* Desktop stats */}
            <div ref={ref} className="hidden lg:grid grid-cols-2 gap-3">
              {STATS.map((s, i) => {
                const Icon = s.icon;
                return (
                  <motion.div key={s.label}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="bg-white/5 border border-white/8 rounded-2xl px-5 py-4 flex items-center gap-4 hover:border-white/15 transition-colors duration-200"
                  >
                    <div className={`w-10 h-10 ${s.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`w-5 h-5 ${s.color}`} />
                    </div>
                    <div>
                      <div className={`text-2xl font-bold ${s.color} leading-none`}>
                        {inView ? <CountUp end={s.value} duration={2.2} separator="," delay={i * 0.1} /> : 0}{s.suffix}
                      </div>
                      <p className="text-gray-400 text-xs mt-0.5">{s.label}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* City list grouped by state */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Locations We Serve</h3>
              {STATE_CITIES.map((group, gi) => (
                <motion.div key={group.state}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: gi * 0.08 }}
                >
                  <p className={`text-[10px] font-bold uppercase tracking-widest mb-2 ${group.color.split(" ")[1]}`}>
                    {group.state}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {group.cities.map(city => (
                      <span key={city}
                        className={`inline-flex items-center gap-1 border rounded-full px-2 py-0.5 text-[10px] font-medium text-gray-300 hover:text-white transition-colors duration-150 cursor-default ${group.color.split(" ")[0]}`}
                      >
                        <MapPin className="w-2 h-2 flex-shrink-0" />
                        {city}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="bg-brand-red/8 border border-brand-red/15 rounded-2xl p-5"
            >
              <p className="text-white font-semibold mb-1">Don&apos;t see your city?</p>
              <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                We cover 30+ locations across 5 states and can often accommodate additional
                destinations. Contact us to confirm availability.
              </p>
              <a href="#quote"
                onClick={e => { e.preventDefault(); document.getElementById("quote")?.scrollIntoView({ behavior: "smooth" }); }}
                className="inline-flex items-center gap-2 bg-brand-red hover:bg-brand-red-dark text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-all duration-200 hover:shadow-red-glow active:scale-95 group"
              >
                Check availability
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
