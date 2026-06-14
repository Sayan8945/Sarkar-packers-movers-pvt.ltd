"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─── Types ─────────────────────────────────────────────── */
interface City {
  id: string;
  name: string;
  state: string;
  x: number;   // SVG coordinate (0–200 viewBox)
  y: number;
  isHQ?: boolean;
}

/* ─── City coordinates mapped to 200×220 SVG viewBox ────── */
/*
  The SVG viewBox covers roughly:
    lng 82–96  →  x: 0–200
    lat 19–28  →  y: 0–220  (inverted: higher lat = lower y)

  Formula:
    x = (lng - 82) / (96 - 82) * 200
    y = (28 - lat) / (28 - 19) * 220
*/
const CITIES: City[] = [
  // West Bengal — Primary
  { id: "kolkata",      name: "Kolkata",      state: "West Bengal", x: 135, y: 152, isHQ: true },
  { id: "howrah",       name: "Howrah",        state: "West Bengal", x: 133, y: 150 },
  { id: "durgapur",     name: "Durgapur",      state: "West Bengal", x: 117, y: 133 },
  { id: "asansol",      name: "Asansol",       state: "West Bengal", x: 111, y: 128 },
  { id: "siliguri",     name: "Siliguri",      state: "West Bengal", x: 131, y:  67 },
  { id: "haldia",       name: "Haldia",         state: "West Bengal", x: 138, y: 160 },
  { id: "kharagpur",    name: "Kharagpur",     state: "West Bengal", x: 123, y: 158 },
  { id: "bardhaman",   name: "Bardhaman",     state: "West Bengal", x: 124, y: 142 },
  { id: "malda",        name: "Malda",          state: "West Bengal", x: 126, y: 108 },
  { id: "berhampur",    name: "Berhampur",     state: "West Bengal", x: 130, y: 116 },

  // Assam — Secondary
  { id: "guwahati",     name: "Guwahati",      state: "Assam",       x: 172, y:  56 },
  { id: "silchar",      name: "Silchar",        state: "Assam",       x: 178, y:  87 },
  { id: "jorhat",       name: "Jorhat",         state: "Assam",       x: 191, y:  43 },

  // Bihar — Secondary
  { id: "patna",        name: "Patna",          state: "Bihar",       x:  80, y: 103 },
  { id: "gaya",         name: "Gaya",           state: "Bihar",       x:  76, y: 115 },
  { id: "bhagalpur",    name: "Bhagalpur",     state: "Bihar",       x: 100, y: 102 },

  // Odisha — Secondary
  { id: "bhubaneswar",  name: "Bhubaneswar",   state: "Odisha",      x: 120, y: 185 },
  { id: "cuttack",      name: "Cuttack",        state: "Odisha",      x: 121, y: 180 },
  { id: "puri",         name: "Puri",           state: "Odisha",      x: 119, y: 192 },

  // Jharkhand — Secondary
  { id: "ranchi",       name: "Ranchi",         state: "Jharkhand",   x:  98, y: 135 },
  { id: "jamshedpur",   name: "Jamshedpur",    state: "Jharkhand",   x: 107, y: 148 },
  { id: "dhanbad",      name: "Dhanbad",        state: "Jharkhand",   x: 108, y: 131 },
];

/* ─── Simplified Eastern India SVG state paths ──────────── */
/*
  These are hand-crafted simplified polygons. They give a clean
  recognisable shape without requiring a 50 kB GeoJSON file.
*/
const STATE_PATHS = [
  // West Bengal — tall narrow state running N-S on the right side
  {
    id: "wb",
    label: "West Bengal",
    d: "M108,58 L115,55 L130,60 L138,65 L140,78 L143,92 L145,105 L142,118 L140,130 L138,140 L138,148 L140,158 L142,165 L140,172 L136,178 L128,182 L118,178 L112,168 L110,158 L112,148 L116,138 L118,126 L115,115 L112,105 L110,95 L108,80 Z",
    fill: "rgba(225,29,72,0.08)",
    stroke: "rgba(225,29,72,0.35)",
  },
  // Assam — wide state to the upper-right
  {
    id: "as",
    label: "Assam",
    d: "M150,40 L160,38 L172,36 L184,35 L194,38 L198,44 L196,52 L192,58 L182,62 L172,65 L162,68 L152,72 L148,66 L146,56 Z",
    fill: "rgba(59,130,246,0.07)",
    stroke: "rgba(59,130,246,0.25)",
  },
  // Bihar — left-centre
  {
    id: "br",
    label: "Bihar",
    d: "M60,88 L72,85 L85,86 L98,89 L106,94 L108,102 L106,112 L100,118 L90,120 L78,118 L68,114 L60,108 L58,98 Z",
    fill: "rgba(251,191,36,0.07)",
    stroke: "rgba(251,191,36,0.25)",
  },
  // Jharkhand — below Bihar, left of West Bengal
  {
    id: "jh",
    label: "Jharkhand",
    d: "M82,120 L96,118 L108,120 L116,128 L118,138 L114,148 L108,154 L100,156 L90,152 L82,146 L78,136 L78,126 Z",
    fill: "rgba(167,139,250,0.08)",
    stroke: "rgba(167,139,250,0.25)",
  },
  // Odisha — lower-centre
  {
    id: "od",
    label: "Odisha",
    d: "M88,155 L100,152 L112,155 L122,160 L128,170 L128,182 L124,192 L116,198 L106,196 L96,192 L88,184 L84,172 L84,162 Z",
    fill: "rgba(16,185,129,0.07)",
    stroke: "rgba(16,185,129,0.25)",
  },
];

const STATE_COLORS: Record<string, string> = {
  "West Bengal": "#E11D48",
  "Assam":       "#3b82f6",
  "Bihar":       "#f59e0b",
  "Odisha":      "#10b981",
  "Jharkhand":   "#a78bfa",
};

/* ─── Tooltip ───────────────────────────────────────────── */
interface TooltipProps {
  city: City;
  viewBoxWidth: number;
}

function Tooltip({ city, viewBoxWidth }: TooltipProps) {
  // Flip tooltip to left if city is in the right half of the map
  const flip = city.x > viewBoxWidth / 2;
  return (
    <g>
      {/* Arrow */}
      <polygon
        points={`0,-6 -5,-14 5,-14`}
        fill="#0f172a"
        transform={`translate(${city.x},${city.y - 6})`}
      />
      {/* Box */}
      <rect
        x={flip ? city.x - 86 : city.x - 6}
        y={city.y - 46}
        width={92}
        height={36}
        rx={6}
        fill="#0f172a"
        stroke="rgba(255,255,255,0.12)"
        strokeWidth={0.8}
      />
      <text
        x={flip ? city.x - 40 : city.x + 40}
        y={city.y - 30}
        textAnchor="middle"
        fill="white"
        fontSize={7}
        fontWeight="700"
        fontFamily="system-ui, sans-serif"
      >
        {city.name}{city.isHQ ? " (HQ)" : ""}
      </text>
      <text
        x={flip ? city.x - 40 : city.x + 40}
        y={city.y - 20}
        textAnchor="middle"
        fill={STATE_COLORS[city.state] ?? "#94a3b8"}
        fontSize={6}
        fontFamily="system-ui, sans-serif"
      >
        {city.state}
      </text>
    </g>
  );
}

/* ─── Main SVG Map ──────────────────────────────────────── */
export default function EasternIndiaMap() {
  const [hoveredCity, setHoveredCity] = useState<City | null>(null);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.04 } },
  };

  const markerVariants = {
    hidden:  { scale: 0, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { type: "spring" as const, stiffness: 300, damping: 18 } },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="relative w-full select-none"
    >
      {/* Glow backdrop */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-red/5 via-transparent to-blue-500/5 rounded-3xl pointer-events-none" />

      <svg
        viewBox="0 0 200 220"
        className="w-full max-w-lg mx-auto drop-shadow-2xl"
        aria-label="Eastern India coverage map"
        role="img"
      >
        {/* ── Background ─────────────────────────────── */}
        <defs>
          <radialGradient id="bgGlow" cx="60%" cy="50%" r="60%">
            <stop offset="0%"   stopColor="#1e293b" />
            <stop offset="100%" stopColor="#0f172a" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="hqGlow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        <rect width="200" height="220" rx="16" fill="url(#bgGlow)" />

        {/* Subtle grid */}
        {Array.from({ length: 11 }).map((_, i) => (
          <line key={`hg-${i}`} x1="0" y1={i * 22} x2="200" y2={i * 22}
            stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
        ))}
        {Array.from({ length: 11 }).map((_, i) => (
          <line key={`vg-${i}`} x1={i * 20} y1="0" x2={i * 20} y2="220"
            stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
        ))}

        {/* ── State polygons ──────────────────────────── */}
        {STATE_PATHS.map((s, i) => (
          <motion.path
            key={s.id}
            d={s.d}
            fill={s.fill}
            stroke={s.stroke}
            strokeWidth="0.8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12, duration: 0.6 }}
          />
        ))}

        {/* ── Connection lines from HQ to other cities ─ */}
        {CITIES.filter(c => !c.isHQ).map((city, i) => {
          const hq = CITIES.find(c => c.isHQ)!;
          return (
            <motion.line
              key={`line-${city.id}`}
              x1={hq.x} y1={hq.y}
              x2={city.x} y2={city.y}
              stroke="rgba(225,29,72,0.12)"
              strokeWidth="0.5"
              strokeDasharray="2 3"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 + i * 0.03, duration: 0.8 }}
            />
          );
        })}

        {/* ── City markers ────────────────────────────── */}
        <motion.g variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {CITIES.map(city => (
            <motion.g
              key={city.id}
              variants={markerVariants}
              whileHover={{ scale: city.isHQ ? 1.3 : 1.5 }}
              onHoverStart={() => setHoveredCity(city)}
              onHoverEnd={() => setHoveredCity(null)}
              style={{ cursor: "pointer" }}
            >
              {city.isHQ ? (
                // HQ — red pulsing rings + large dot
                <>
                  {/* Outer pulse ring 1 */}
                  <motion.circle
                    cx={city.x} cy={city.y} r={10}
                    fill="none" stroke="rgba(225,29,72,0.25)" strokeWidth="1"
                    animate={{ r: [8, 14, 8], opacity: [0.6, 0, 0.6] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                  />
                  {/* Outer pulse ring 2 — offset phase */}
                  <motion.circle
                    cx={city.x} cy={city.y} r={10}
                    fill="none" stroke="rgba(225,29,72,0.15)" strokeWidth="0.8"
                    animate={{ r: [6, 18, 6], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                  />
                  {/* Core dot */}
                  <circle cx={city.x} cy={city.y} r={5}
                    fill="#E11D48" stroke="#fff" strokeWidth="1.5"
                    filter="url(#hqGlow)"
                  />
                  {/* Permanent HQ label */}
                  <text x={city.x} y={city.y + 12}
                    textAnchor="middle" fill="white" fontSize={5.5}
                    fontWeight="700" fontFamily="system-ui, sans-serif"
                    filter="url(#glow)"
                  >
                    Kolkata HQ
                  </text>
                </>
              ) : (
                // Regular city — blue dot with glow
                <>
                  <circle cx={city.x} cy={city.y} r={3.5}
                    fill={STATE_COLORS[city.state] ?? "#60a5fa"}
                    fillOpacity={0.85}
                    stroke="#0f172a" strokeWidth="0.8"
                    filter="url(#glow)"
                  />
                  <circle cx={city.x} cy={city.y} r={3.5}
                    fill="none"
                    stroke={STATE_COLORS[city.state] ?? "#60a5fa"}
                    strokeWidth="0.5"
                    opacity={0.4}
                  />
                </>
              )}
            </motion.g>
          ))}
        </motion.g>

        {/* ── Tooltip overlay ─────────────────────────── */}
        <AnimatePresence>
          {hoveredCity && (
            <motion.g
              key={hoveredCity.id}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              style={{ pointerEvents: "none" }}
            >
              <Tooltip city={hoveredCity} viewBoxWidth={200} />
            </motion.g>
          )}
        </AnimatePresence>

        {/* ── State legend (bottom of SVG) ────────────── */}
        {[
          { label: "West Bengal", color: "#E11D48", x: 10  },
          { label: "Assam",       color: "#3b82f6", x: 58  },
          { label: "Bihar",       color: "#f59e0b", x: 94  },
          { label: "Odisha",      color: "#10b981", x: 124 },
          { label: "Jharkhand",   color: "#a78bfa", x: 160 },
        ].map(({ label, color, x }) => (
          <g key={label}>
            <circle cx={x + 3} cy={212} r={2.5} fill={color} />
            <text x={x + 8} y={215}
              fill="rgba(255,255,255,0.5)" fontSize={4.5}
              fontFamily="system-ui, sans-serif"
            >
              {label}
            </text>
          </g>
        ))}
      </svg>
    </motion.div>
  );
}
