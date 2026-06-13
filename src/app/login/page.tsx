"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, ArrowRight, AlertCircle, Package, Truck, MapPin, CheckCircle } from "lucide-react";
import { userLogin, MOCK_USER_CREDENTIALS } from "@/lib/auth";

const schema = z.object({
  email:      z.string().min(1, "Email required"),
  password:   z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().optional(),
});
type FormData = z.infer<typeof schema>;

const floatingItems = [
  { icon: "📦", x: "10%",  y: "20%", delay: 0,   size: "text-3xl" },
  { icon: "🚚", x: "75%",  y: "15%", delay: 0.4, size: "text-4xl" },
  { icon: "📍", x: "20%",  y: "65%", delay: 0.8, size: "text-2xl" },
  { icon: "🏠", x: "80%",  y: "60%", delay: 1.2, size: "text-3xl" },
  { icon: "⭐", x: "50%",  y: "80%", delay: 0.6, size: "text-2xl" },
  { icon: "🔒", x: "65%",  y: "35%", delay: 1.0, size: "text-2xl" },
];

export default function UserLoginPage() {
  const router = useRouter();
  const [showPw, setShowPw]       = useState(false);
  const [error, setError]         = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setError("");
    await new Promise(r => setTimeout(r, 900));
    const user = userLogin(data.email, data.password, data.rememberMe);
    if (user) {
      router.push("/");
    } else {
      setError(`Invalid credentials. Demo: ${MOCK_USER_CREDENTIALS.email} / ${MOCK_USER_CREDENTIALS.password}`);
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex overflow-hidden">

      {/* ── Left hero — desktop only ──────────────────── */}
      <div className="hidden lg:flex lg:w-[52%] relative bg-gradient-to-br from-brand-navy via-[#0d1f3c] to-brand-navy overflow-hidden flex-col justify-center px-16">
        {/* Grid */}
        <div className="absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.6) 1px,transparent 1px)", backgroundSize: "48px 48px" }}
        />
        {/* Glow orbs */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-brand-red/15 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl" />

        {/* Floating emoji elements */}
        {floatingItems.map((item, idx) => (
          <motion.div key={idx}
            className={`absolute ${item.size} select-none pointer-events-none`}
            style={{ left: item.x, top: item.y }}
            animate={{ y: [0, -16, 0], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4 + idx * 0.5, repeat: Infinity, delay: item.delay, ease: "easeInOut" }}
          >
            {item.icon}
          </motion.div>
        ))}

        {/* Animated truck */}
        <motion.div
          className="absolute bottom-24 text-4xl pointer-events-none"
          animate={{ x: ["-10%", "110%"] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
        >🚛</motion.div>

        {/* Content */}
        <div className="relative z-10 max-w-md">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Link href="/">
              <div className="relative h-16 w-52 mb-12">
                <Image src="/logo.png" alt="Sarkar Packers" fill className="object-contain" sizes="208px" />
              </div>
            </Link>
            <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">Welcome Back</h1>
            <p className="text-gray-400 text-lg leading-relaxed mb-10">
              Track your relocation journey and manage your enquiries — all in one place.
            </p>
            <div className="space-y-4">
              {[
                { icon: Package,     text: "Real-time shipment tracking" },
                { icon: MapPin,      text: "Pan-India coverage — 100+ cities" },
                { icon: Truck,       text: "Safe, insured transportation" },
                { icon: CheckCircle, text: "IBA approved & trusted since 2007" },
              ].map(({ icon: Icon, text }, idx) => (
                <motion.div key={text}
                  initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + idx * 0.1, duration: 0.4 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-7 h-7 bg-brand-red/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-3.5 h-3.5 text-brand-red" />
                  </div>
                  <span className="text-gray-300 text-sm">{text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Right form panel ─────────────────────────── */}
      {/*
        Desktop : light gray (bg-gray-50)
        Mobile  : premium dark (slate-950 → black gradient)
      */}
      <div className="
        w-full lg:w-[48%]
        relative flex items-center justify-center
        bg-slate-950 lg:bg-gray-50
        p-6 sm:p-10
        overflow-hidden
      ">
        {/* Mobile-only dark background */}
        <div className="absolute inset-0 lg:hidden pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-black" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-brand-red/6 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
          {/* Floating blobs */}
          <motion.div
            className="absolute top-1/4 left-1/6 w-32 h-32 bg-rose-500/6 rounded-full blur-2xl"
            animate={{ scale: [1, 1.25, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 5, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-1/3 right-1/5 w-28 h-28 bg-indigo-500/5 rounded-full blur-2xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 7, repeat: Infinity, delay: 2 }}
          />
          {/* Mobile floating emojis (subtle) */}
          {floatingItems.slice(0, 3).map((item, idx) => (
            <motion.div key={idx}
              className={`absolute ${item.size} select-none pointer-events-none opacity-10`}
              style={{ left: item.x, top: item.y }}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5 + idx, repeat: Infinity, delay: item.delay }}
            >
              {item.icon}
            </motion.div>
          ))}
        </div>

        <motion.div className="relative z-10 w-full max-w-[420px]"
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        >
          {/* Mobile logo */}
          <motion.div className="flex justify-center mb-6 lg:hidden"
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          >
            <Link href="/">
              <div className="relative h-12 w-40">
                <Image src="/logo.png" alt="Sarkar Packers" fill className="object-contain" sizes="160px" />
              </div>
            </Link>
          </motion.div>

          {/* Card — glassmorphism on mobile, solid white on desktop */}
          <div className="
            bg-white/8 lg:bg-white
            backdrop-blur-xl lg:backdrop-blur-none
            border border-white/10 lg:border-gray-100
            rounded-2xl shadow-2xl lg:shadow-sm
            p-7 sm:p-8
          ">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white lg:text-brand-navy">Sign In</h2>
              <p className="text-slate-400 lg:text-gray-500 text-sm mt-1">Welcome back! Track your move.</p>
            </div>

            <AnimatePresence>
              {error && (
                <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="flex items-start gap-2.5 bg-red-500/10 border border-red-500/20 text-red-400 lg:bg-red-50 lg:border-red-200 lg:text-red-700 rounded-xl p-3.5 mb-5 text-xs"
                >
                  <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-slate-300 lg:text-gray-700 mb-1.5">Email</label>
                <input
                  {...register("email")}
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  className="w-full h-11 px-4 bg-white/8 lg:bg-transparent border border-white/15 lg:border-gray-200 rounded-xl text-sm text-white lg:text-gray-900 placeholder:text-slate-500 lg:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-brand-red transition-all duration-200"
                />
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-sm font-medium text-slate-300 lg:text-gray-700">Password</label>
                  <Link href="/forgot-password" className="text-xs text-brand-red hover:text-brand-red-dark transition-colors duration-200">
                    Forgot?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    {...register("password")}
                    type={showPw ? "text" : "password"}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    className="w-full h-11 px-4 pr-11 bg-white/8 lg:bg-transparent border border-white/15 lg:border-gray-200 rounded-xl text-sm text-white lg:text-gray-900 placeholder:text-slate-500 lg:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-brand-red transition-all duration-200"
                  />
                  <button type="button" onClick={() => setShowPw(!showPw)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 lg:text-gray-400 lg:hover:text-gray-600 transition-colors duration-200"
                  >
                    {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
              </div>

              {/* Remember */}
              <div className="flex items-center gap-2.5">
                <input {...register("rememberMe")} id="rem" type="checkbox" className="h-4 w-4 rounded accent-brand-red" />
                <label htmlFor="rem" className="text-sm text-slate-400 lg:text-gray-600 select-none">Remember me</label>
              </div>

              <button type="submit" disabled={isLoading}
                className="w-full h-11 bg-gradient-to-r from-brand-red to-rose-600 hover:from-brand-red-dark hover:to-brand-red text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-all duration-200 hover:shadow-red-glow active:scale-[0.98] disabled:opacity-60"
              >
                {isLoading
                  ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Signing in…</>
                  : <><span>Sign In</span><ArrowRight className="w-4 h-4" /></>}
              </button>
            </form>

            <p className="text-center text-sm text-slate-400 lg:text-gray-500 mt-6">
              New here?{" "}
              <Link href="/signup" className="text-brand-red font-semibold hover:text-brand-red-dark transition-colors duration-200">
                Create account
              </Link>
            </p>
          </div>

          <div className="text-center mt-5 space-y-2">
            <Link href="/" className="block text-xs text-slate-600 hover:text-slate-400 transition-colors duration-200">
              ← Back to main site
            </Link>
            <Link href="/admin-login" className="block text-xs text-slate-600 hover:text-slate-400 transition-colors duration-200">
              Admin? Sign in here →
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
