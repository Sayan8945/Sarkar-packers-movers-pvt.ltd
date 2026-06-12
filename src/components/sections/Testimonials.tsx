"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { TESTIMONIALS } from "@/lib/constants";

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((c) => (c + 1) % TESTIMONIALS.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next, isPaused]);

  const t = TESTIMONIALS[current];

  const variants = {
    enter: (dir: number) => ({ opacity: 0, x: dir * 80 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: dir * -80 }),
  };

  return (
    <section className="py-20 lg:py-28 bg-gray-50 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-red/3 rounded-full blur-3xl" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-brand-red/10 text-brand-red text-xs font-semibold uppercase tracking-wider rounded-full mb-3">
            Customer Stories
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-navy mb-3">
            What Our Customers Say
          </h2>
          <p className="text-gray-500 text-lg">
            Real experiences from thousands of happy families and businesses.
          </p>
        </motion.div>

        {/* Carousel */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="overflow-hidden rounded-3xl">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="bg-white rounded-3xl p-8 lg:p-12 shadow-sm border border-gray-100"
              >
                <div className="flex flex-col lg:flex-row gap-8 items-start">
                  {/* Quote icon */}
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-brand-red rounded-2xl flex items-center justify-center shadow-lg">
                      <Quote className="w-7 h-7 text-white" />
                    </div>
                  </div>

                  <div className="flex-1">
                    {/* Stars */}
                    <div className="flex gap-1 mb-4">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                      ))}
                    </div>

                    {/* Text */}
                    <blockquote className="text-gray-700 text-lg leading-relaxed mb-6 italic">
                      &ldquo;{t.text}&rdquo;
                    </blockquote>

                    {/* Author */}
                    <div className="flex items-center gap-4">
                      <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-brand-red/20">
                        <Image
                          src={t.image}
                          alt={t.name}
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-bold text-brand-navy">{t.name}</p>
                        <p className="text-gray-500 text-sm">{t.role}</p>
                        <span className="inline-block mt-1 text-xs bg-brand-red/10 text-brand-red px-2 py-0.5 rounded-full">
                          {t.city}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > current ? 1 : -1);
                    setCurrent(i);
                  }}
                  className={`transition-all duration-300 rounded-full ${
                    i === current
                      ? "w-8 h-2.5 bg-brand-red"
                      : "w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <div className="flex gap-2">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-brand-red hover:border-brand-red hover:text-white text-gray-600 transition-all duration-200"
                aria-label="Previous"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={next}
                className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-brand-red hover:border-brand-red hover:text-white text-gray-600 transition-all duration-200"
                aria-label="Next"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
