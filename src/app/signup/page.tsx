"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, CheckCircle, ArrowRight } from "lucide-react";

const schema = z
  .object({
    fullName:        z.string().min(2, "Full name required"),
    email:           z.string().min(1, "Email required"),
    mobile:          z.string().regex(/^[6-9]\d{9}$/, "Enter valid 10-digit mobile"),
    password:        z.string().min(8, "Min 8 characters"),
    confirmPassword: z.string(),
    terms:           z.boolean().refine(v => v, "Accept terms to continue"),
  })
  .refine(d => d.password === d.confirmPassword, {
    message: "Passwords don&apos;t match",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof schema>;

function getStrength(pw: string) {
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/[0-9]/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return { score: s, ...[
    { label: "Weak",        color: "bg-red-500" },
    { label: "Fair",        color: "bg-amber-500" },
    { label: "Good",        color: "bg-yellow-400" },
    { label: "Strong",      color: "bg-green-500" },
    { label: "Very Strong", color: "bg-emerald-600" },
  ][s] };
}

const routeDots = [
  { x: "15%", y: "25%", label: "Kolkata",   delay: 0 },
  { x: "42%", y: "45%", label: "Delhi",     delay: 0.3 },
  { x: "65%", y: "28%", label: "Mumbai",    delay: 0.6 },
  { x: "82%", y: "58%", label: "Bangalore", delay: 0.9 },
];

export default function UserSignupPage() {
  const router = useRouter();
  const [showPw,  setShowPw]  = useState(false);
  const [showCpw, setShowCpw] = useState(false);
  const [pw, setPw]           = useState("");
  const [done, setDone]       = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (_d: FormData) => {
    await new Promise(r => setTimeout(r, 1000));
    setDone(true);
    setTimeout(() => router.push("/login"), 2500);
  };

  const pwStrength = getStrength(pw);

  return (
    <div className="min-h-screen flex overflow-hidden">

      {/* ── Left hero — desktop only ──────────────────── */}
      <div className="hidden lg:flex lg:w-[52%] relative bg-gradient-to-br from-[#0a1628] via-brand-navy to-[#0d1f3c] overflow-hidden flex-col justify-center px-16">
        <div className="absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage: "radial-gradient(circle, rgba(225,29,72,.8) 1.5px, transparent 1.5px)", backgroundSize: "36px 36px" }}
        />
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-brand-red/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl" />

        {/* Route dots + truck */}
        <div className="absolute inset-0 pointer-events-none">
          {routeDots.map((dot, idx) => (
            <motion.div key={dot.label}
              className="absolute flex flex-col items-center"
              style={{ left: dot.x, top: dot.y }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: dot.delay + 0.6, duration: 0.5, type: "spring" }}
            >
              <motion.div
                animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: dot.delay }}
                className="w-3 h-3 bg-brand-red rounded-full shadow-lg"
              />
              <span className="text-[10px] text-gray-500 mt-1 whitespace-nowrap">{dot.label}</span>
            </motion.div>
          ))}
          <motion.div
            className="absolute text-3xl bottom-32"
            animate={{ x: ["-5%", "105%"] }}
            transition={{ duration: 14, repeat: Infinity, ease: "linear", repeatDelay: 3 }}
          >🚚</motion.div>
        </div>

        {/* Hero content */}
        <div className="relative z-10 max-w-md">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Link href="/">
              <div className="relative h-16 w-52 mb-12">
                <Image src="/logo.png" alt="Sarkar Packers" fill className="object-contain" sizes="208px" />
              </div>
            </Link>
            <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">
              Join Sarkar<br />Packers & Movers
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed mb-10">
              Create your account and get instant relocation support, real-time tracking, and exclusive offers.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[["5000+","Happy Customers"],["100+","Cities"],["17+","Years Trust"],["IBA","Approved"]].map(([v, l]) => (
                <div key={l} className="bg-white/5 border border-white/10 rounded-xl p-3.5">
                  <div className="text-xl font-bold text-brand-red">{v}</div>
                  <div className="text-gray-400 text-xs mt-0.5">{l}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Right form panel ─────────────────────────── */}
      {/*
        Desktop : light gray
        Mobile  : premium dark slate gradient
      */}
      <div className="
        w-full lg:w-[48%]
        relative flex items-center justify-center
        bg-slate-950 lg:bg-gray-50
        p-5 sm:p-8
        overflow-y-auto overflow-x-hidden
      ">
        {/* Mobile dark background */}
        <div className="absolute inset-0 lg:hidden pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-[#0d1525] to-black" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[450px] h-[450px] bg-brand-red/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl" />
          <motion.div
            className="absolute top-1/3 right-1/4 w-36 h-36 bg-rose-500/4 rounded-full blur-2xl"
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 6, repeat: Infinity }}
          />
          {/* Subtle route dots on mobile */}
          {routeDots.slice(0, 2).map((dot, idx) => (
            <motion.div key={idx}
              className="absolute w-2 h-2 bg-brand-red/20 rounded-full"
              style={{ left: dot.x, top: dot.y }}
              animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 3, repeat: Infinity, delay: idx * 0.5 }}
            />
          ))}
        </div>

        <motion.div className="relative z-10 w-full max-w-[420px] py-4"
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

          {/* Card */}
          <div className="
            bg-white/8 lg:bg-white
            backdrop-blur-xl lg:backdrop-blur-none
            border border-white/10 lg:border-gray-100
            rounded-2xl shadow-2xl lg:shadow-sm
            p-6 sm:p-8
          ">
            <AnimatePresence mode="wait">
              {done ? (
                <motion.div key="done"
                  initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-20 h-20 bg-green-500/15 border border-green-500/30 rounded-full flex items-center justify-center mx-auto mb-5">
                    <CheckCircle className="w-10 h-10 text-green-400" />
                  </div>
                  <h2 className="text-xl font-bold text-white lg:text-brand-navy mb-2">Account Created!</h2>
                  <p className="text-slate-400 lg:text-gray-500 text-sm">Redirecting to login…</p>
                </motion.div>
              ) : (
                <motion.div key="form">
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-white lg:text-brand-navy">Create Account</h2>
                    <p className="text-slate-400 lg:text-gray-500 text-sm mt-1">Start your relocation journey</p>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Full Name */}
                    <div>
                      <label className="block text-sm font-medium text-slate-300 lg:text-gray-700 mb-1.5">Full Name</label>
                      <input {...register("fullName")} placeholder="Your full name"
                        className="w-full h-11 px-4 bg-white/8 lg:bg-transparent border border-white/15 lg:border-gray-200 rounded-xl text-sm text-white lg:text-gray-900 placeholder:text-slate-500 lg:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-red transition-all duration-200"
                      />
                      {errors.fullName && <p className="text-red-400 text-xs mt-1">{errors.fullName.message}</p>}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-slate-300 lg:text-gray-700 mb-1.5">Email</label>
                      <input {...register("email")} type="email" placeholder="you@example.com"
                        className="w-full h-11 px-4 bg-white/8 lg:bg-transparent border border-white/15 lg:border-gray-200 rounded-xl text-sm text-white lg:text-gray-900 placeholder:text-slate-500 lg:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-red transition-all duration-200"
                      />
                      {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                    </div>

                    {/* Mobile */}
                    <div>
                      <label className="block text-sm font-medium text-slate-300 lg:text-gray-700 mb-1.5">Mobile Number</label>
                      <input {...register("mobile")} type="tel" placeholder="10-digit number"
                        className="w-full h-11 px-4 bg-white/8 lg:bg-transparent border border-white/15 lg:border-gray-200 rounded-xl text-sm text-white lg:text-gray-900 placeholder:text-slate-500 lg:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-red transition-all duration-200"
                      />
                      {errors.mobile && <p className="text-red-400 text-xs mt-1">{errors.mobile.message}</p>}
                    </div>

                    {/* Password */}
                    <div>
                      <label className="block text-sm font-medium text-slate-300 lg:text-gray-700 mb-1.5">Password</label>
                      <div className="relative">
                        <input {...register("password")} type={showPw ? "text" : "password"} placeholder="Min 8 characters"
                          onChange={e => setPw(e.target.value)}
                          className="w-full h-11 px-4 pr-11 bg-white/8 lg:bg-transparent border border-white/15 lg:border-gray-200 rounded-xl text-sm text-white lg:text-gray-900 placeholder:text-slate-500 lg:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-red transition-all duration-200"
                        />
                        <button type="button" onClick={() => setShowPw(!showPw)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 lg:text-gray-400 lg:hover:text-gray-600"
                        >
                          {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      {pw.length > 0 && (
                        <div className="mt-2">
                          <div className="flex gap-1 mb-0.5">
                            {[0,1,2,3].map(k => (
                              <div key={k} className={`h-1 flex-1 rounded-full transition-colors duration-300 ${k < pwStrength.score ? pwStrength.color : "bg-white/10 lg:bg-gray-200"}`} />
                            ))}
                          </div>
                          <p className="text-xs text-slate-500 lg:text-gray-400">
                            Strength: <span className="font-medium text-white lg:text-gray-700">{pwStrength.label}</span>
                          </p>
                        </div>
                      )}
                      {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
                    </div>

                    {/* Confirm Password */}
                    <div>
                      <label className="block text-sm font-medium text-slate-300 lg:text-gray-700 mb-1.5">Confirm Password</label>
                      <div className="relative">
                        <input {...register("confirmPassword")} type={showCpw ? "text" : "password"} placeholder="Repeat password"
                          className="w-full h-11 px-4 pr-11 bg-white/8 lg:bg-transparent border border-white/15 lg:border-gray-200 rounded-xl text-sm text-white lg:text-gray-900 placeholder:text-slate-500 lg:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-red transition-all duration-200"
                        />
                        <button type="button" onClick={() => setShowCpw(!showCpw)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 lg:text-gray-400 lg:hover:text-gray-600"
                        >
                          {showCpw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      {errors.confirmPassword && <p className="text-red-400 text-xs mt-1">{errors.confirmPassword.message}</p>}
                    </div>

                    {/* Terms */}
                    <div className="flex items-start gap-2.5">
                      <input {...register("terms")} id="terms" type="checkbox" className="h-4 w-4 mt-0.5 rounded accent-brand-red" />
                      <label htmlFor="terms" className="text-xs text-slate-400 lg:text-gray-600">
                        I agree to the{" "}
                        <Link href="#" className="text-brand-red hover:underline">Terms</Link>{" "}
                        and{" "}
                        <Link href="#" className="text-brand-red hover:underline">Privacy Policy</Link>
                      </label>
                    </div>
                    {errors.terms && <p className="text-red-400 text-xs -mt-1">{errors.terms.message}</p>}

                    <button type="submit" disabled={isSubmitting}
                      className="w-full h-11 bg-gradient-to-r from-brand-red to-rose-600 hover:from-brand-red-dark hover:to-brand-red text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-all duration-200 hover:shadow-red-glow active:scale-[0.98] disabled:opacity-60 mt-1"
                    >
                      {isSubmitting
                        ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Creating…</>
                        : <><span>Create Account</span><ArrowRight className="w-4 h-4" /></>}
                    </button>
                  </form>

                  <p className="text-center text-sm text-slate-400 lg:text-gray-500 mt-5">
                    Already have an account?{" "}
                    <Link href="/login" className="text-brand-red font-semibold hover:text-brand-red-dark transition-colors duration-200">
                      Sign in
                    </Link>
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="text-center mt-5">
            <Link href="/" className="text-xs text-slate-600 hover:text-slate-400 transition-colors duration-200">
              ← Back to main site
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
