import { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Globe, ShieldCheck, Zap, Layout } from "lucide-react";
import Wizard from "./Wizard";

const features = [
  { icon: Globe, label: "Happy Humans Everywhere" },
  { icon: ShieldCheck, label: "Super Safe & Secure" },
  { icon: Zap, label: "Fast Like a Rocket" },
  { icon: Layout, label: "Lots of Cool Choices" },
];

export default function App() {
  const [showWizard, setShowWizard] = useState(false);

  if (showWizard) {
    return <Wizard onBack={() => setShowWizard(false)} />;
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black overflow-x-hidden relative flex flex-col">

      {/* ── Background ───────────────────────────────────────── */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-85 scale-[1.03]"
          poster="https://picsum.photos/seed/agency/1920/1080?blur=10"
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_39zUbVmLqmft5amKgUX0QZgzwwF/hf_20260221_185928_ce2b8644-e189-418f-80f1-855fc0b70007.mp4"
            type="video/mp4"
          />
        </video>

        {/* Tech grid */}
        <div
          className="absolute inset-0 z-[2] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M 80 0 L 0 0 0 80' fill='none' stroke='rgba(255,255,255,0.045)' stroke-width='0.5'/%3E%3C/svg%3E")`,
            backgroundSize: "80px 80px",
          }}
        />

        {/* Minimal top/bottom vignette */}
        <div className="absolute inset-0 z-[3] bg-gradient-to-b from-black/45 via-transparent to-black/75 pointer-events-none" />
      </div>

      {/* ── Navigation ───────────────────────────────────────── */}
      <motion.nav
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="relative z-20 flex items-center justify-between px-6 py-6 md:px-12 max-w-7xl mx-auto w-full"
      >
        <a href="https://embertree.io" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-amber-400 shadow-lg shadow-amber-500/30 group-hover:shadow-amber-400/50 transition-shadow">
            <div className="w-4 h-4 bg-black rounded-sm rotate-45" />
          </div>
          <span className="font-black text-xl tracking-tighter uppercase">EmberTree</span>
        </a>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          {[
            { label: "Build site", href: "https://app.embertree.io/new" },
            { label: "Pricing", href: "https://embertree.io/pricing" },
            { label: "FAQ", href: "https://embertree.io/faq" },
            { label: "Showcase", href: "#showcase" },
          ].map(({ label, href }, i) => (
            <motion.a
              key={label}
              href={href}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ delay: 0.15 * i + 0.3 }}
              className="hover:opacity-100 transition-opacity duration-200"
            >
              {label}
            </motion.a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://app.embertree.io/login"
            className="px-4 py-2 text-sm font-medium opacity-55 hover:opacity-100 transition-opacity"
          >
            Sign in
          </a>
          <motion.a
            href="https://app.embertree.io/new"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="px-5 py-2.5 bg-white text-black text-sm font-bold rounded-full shadow-lg shadow-white/10 hover:bg-amber-50 transition-colors"
          >
            Get started
          </motion.a>
        </div>
      </motion.nav>

      {/* ── Hero ─────────────────────────────────────────────── */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 md:px-12 max-w-7xl mx-auto w-full pt-8 pb-32">

        {/* Tech readout — top right */}
        <div className="absolute top-2 right-0 hidden md:flex flex-col items-end gap-1 font-mono text-[10px] text-white/25 tracking-widest select-none">
          <span>SYS // v2.4.1</span>
          <span className="flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-amber-400/70 animate-pulse" />
            847 sites live
          </span>
        </div>

        {/* Corner brackets */}
        <div className="absolute inset-x-0 inset-y-0 pointer-events-none hidden md:block">
          <div className="absolute top-0 left-0 w-6 h-6 border-l border-t border-white/10" />
          <div className="absolute top-0 right-0 w-6 h-6 border-r border-t border-white/10" />
          <div className="absolute bottom-0 left-0 w-6 h-6 border-l border-b border-white/10" />
          <div className="absolute bottom-0 right-0 w-6 h-6 border-r border-b border-white/10" />
        </div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="mb-8 inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/10 bg-black/30 backdrop-blur-sm text-xs font-mono tracking-widest text-white/50"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse flex-shrink-0" />
          // fully operational
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="flex flex-col items-center"
        >
          <h1 className="text-6xl md:text-8xl lg:text-[9.5rem] font-black leading-[0.82] tracking-tight mb-3 uppercase drop-shadow-2xl">
            <span className="font-serif italic font-normal block lowercase mb-2 text-[0.95em] opacity-90">
              elite websites
            </span>
            <span className="block">built fast</span>
          </h1>

          {/* Italic subtitle — right under the headline */}
          <p className="font-serif italic text-lg md:text-2xl opacity-55 max-w-xl leading-snug mb-10 tracking-wide">
            we blend cutting-edge technology with design savviness to craft
            the websites of your dreams
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap justify-center gap-3">
            <motion.button
              onClick={() => setShowWizard(true)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="group relative px-8 py-4 bg-white text-black font-bold rounded-full flex items-center gap-2.5 text-sm uppercase tracking-tight overflow-hidden shadow-2xl shadow-white/25 cursor-pointer"
            >
              <span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"
                aria-hidden
              />
              <span className="relative">create my site</span>
              <Zap className="relative w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
            </motion.button>

            <motion.a
              href="https://embertree.io/showcase"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="group px-8 py-4 border border-white/20 text-white font-bold rounded-full flex items-center gap-2.5 text-sm uppercase tracking-tight hover:bg-white/[0.1] hover:border-white/30 transition-all backdrop-blur-sm shadow-lg"
            >
              see examples
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </motion.a>
          </div>

          {/* Peterson quote — centered, in flow */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.9 }}
            className="mt-14 flex flex-col items-center text-center max-w-sm relative select-none"
          >
            {/* Big decorative " */}
            <span className="absolute -top-6 font-serif text-[7rem] leading-none text-white/[0.04] pointer-events-none">
              "
            </span>
            <p className="font-serif italic text-sm md:text-base text-white/35 leading-relaxed relative z-10">
              Making something beautiful is difficult,<br />
              but it is amazingly worthwhile.
            </p>
            <div className="flex items-center gap-3 mt-3.5">
              <div className="h-px w-6 bg-white/15" />
              <span className="text-[10px] font-mono text-white/22 tracking-[0.22em] uppercase">
                Jordan Peterson
              </span>
              <div className="h-px w-6 bg-white/15" />
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 select-none"
        >
          <span className="text-[10px] uppercase tracking-[0.2em] font-mono">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/80 to-transparent" />
        </motion.div>
      </main>

      {/* ── Showcase ─────────────────────────────────────────── */}
      <section
        id="showcase"
        className="relative z-10 bg-black px-6 md:px-12 py-20 md:py-28 border-t border-white/[0.06] scroll-mt-24"
      >
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <p className="font-mono text-xs text-amber-400/70 tracking-widest uppercase mb-3">
              // our work
            </p>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-[0.88]">
              Showcase
            </h2>
          </motion.div>

          {/* Fing card */}
          <motion.a
            href="https://www.fing.com"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="group block rounded-2xl border border-white/[0.08] bg-white/[0.02] hover:border-white/[0.16] transition-all duration-500 overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[440px]">

              {/* Left: project info */}
              <div className="p-8 md:p-12 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/[0.06]">
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <span className="text-3xl font-black tracking-tight">Fing</span>
                    <span className="px-2.5 py-0.5 text-[11px] font-mono bg-emerald-400/10 border border-emerald-400/20 rounded-full text-emerald-400/80 tracking-widest uppercase">
                      Live
                    </span>
                  </div>

                  <p className="text-white/40 text-sm md:text-base leading-relaxed mb-8 max-w-sm">
                    The world's #1 network scanner — device discovery and
                    security monitoring trusted by professionals and families
                    worldwide.
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-6 mb-8">
                    {[
                      { value: "30M+", label: "Users" },
                      { value: "15M", label: "Monthly scans" },
                      { value: "450k", label: "Device models" },
                    ].map(({ value, label }) => (
                      <div key={label}>
                        <div className="text-2xl md:text-3xl font-black tracking-tight">
                          {value}
                        </div>
                        <div className="text-[10px] text-white/28 uppercase tracking-widest mt-0.5 font-mono">
                          {label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Network Security",
                      "Consumer App",
                      "B2C / B2B",
                      "iOS · Android · Desktop",
                    ].map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-[11px] font-mono text-white/28 border border-white/[0.07] rounded-full uppercase tracking-wider"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Visit link */}
                <div className="flex items-center gap-2 mt-10 text-sm font-bold uppercase tracking-tight text-white/35 group-hover:text-white transition-colors duration-300">
                  <span>Visit fing.com</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>

              {/* Right: browser mockup */}
              <div className="relative overflow-hidden bg-[#05090f] flex flex-col">
                {/* Browser chrome */}
                <div className="px-4 py-3 bg-black/50 border-b border-white/[0.06] flex items-center gap-3 flex-shrink-0">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                    <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                    <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                  </div>
                  <div className="flex-1 bg-white/[0.05] rounded-full px-3 py-1 text-[11px] text-white/25 font-mono">
                    fing.com
                  </div>
                </div>

                {/* Fing site preview */}
                <div className="relative flex-1 flex flex-col items-center justify-center px-8 py-10 overflow-hidden">
                  {/* Radial glow */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(ellipse at 50% 45%, rgba(37,99,235,0.18) 0%, transparent 70%)",
                    }}
                  />

                  {/* Network graph SVG */}
                  <svg
                    className="absolute inset-0 w-full h-full"
                    viewBox="0 0 480 380"
                    preserveAspectRatio="xMidYMid slice"
                  >
                    {/* Edges */}
                    <line x1="240" y1="185" x2="110" y2="95"  stroke="#3b82f6" strokeWidth="0.7" strokeOpacity="0.25" />
                    <line x1="240" y1="185" x2="370" y2="105" stroke="#3b82f6" strokeWidth="0.7" strokeOpacity="0.25" />
                    <line x1="240" y1="185" x2="90"  y2="265" stroke="#3b82f6" strokeWidth="0.7" strokeOpacity="0.2"  />
                    <line x1="240" y1="185" x2="390" y2="270" stroke="#3b82f6" strokeWidth="0.7" strokeOpacity="0.2"  />
                    <line x1="240" y1="185" x2="200" y2="320" stroke="#3b82f6" strokeWidth="0.7" strokeOpacity="0.18" />
                    <line x1="240" y1="185" x2="420" y2="185" stroke="#3b82f6" strokeWidth="0.7" strokeOpacity="0.2"  />
                    <line x1="240" y1="185" x2="60"  y2="175" stroke="#3b82f6" strokeWidth="0.7" strokeOpacity="0.18" />
                    <line x1="240" y1="185" x2="260" y2="55"  stroke="#3b82f6" strokeWidth="0.7" strokeOpacity="0.2"  />
                    <line x1="110" y1="95"  x2="370" y2="105" stroke="#60a5fa" strokeWidth="0.5" strokeOpacity="0.1"  />
                    <line x1="90"  y1="265" x2="200" y2="320" stroke="#60a5fa" strokeWidth="0.5" strokeOpacity="0.1"  />
                    {/* Outer nodes */}
                    <circle cx="110" cy="95"  r="4"  fill="#60a5fa" fillOpacity="0.55" />
                    <circle cx="370" cy="105" r="3.5" fill="#34d399" fillOpacity="0.5"  />
                    <circle cx="90"  cy="265" r="5"  fill="#60a5fa" fillOpacity="0.45" />
                    <circle cx="390" cy="270" r="3.5" fill="#60a5fa" fillOpacity="0.4"  />
                    <circle cx="200" cy="320" r="3"  fill="#34d399" fillOpacity="0.4"  />
                    <circle cx="420" cy="185" r="4"  fill="#60a5fa" fillOpacity="0.45" />
                    <circle cx="60"  cy="175" r="3.5" fill="#34d399" fillOpacity="0.4"  />
                    <circle cx="260" cy="55"  r="4"  fill="#60a5fa" fillOpacity="0.45" />
                    {/* Center node + pulse ring */}
                    <circle cx="240" cy="185" r="22" fill="#2563eb" fillOpacity="0.08" />
                    <circle cx="240" cy="185" r="10" fill="#3b82f6" fillOpacity="0.85" />
                  </svg>

                  {/* Content */}
                  <div className="relative z-10 text-center">
                    <div className="text-4xl font-black tracking-[-2px] mb-1 text-white">
                      FING
                    </div>
                    <div className="text-[11px] font-medium text-white/35 mb-7 tracking-widest uppercase">
                      Manage your network like a pro
                    </div>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/15 border border-blue-500/25 text-blue-300/80 text-xs font-mono">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                      14 devices found on network
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.a>
        </div>
      </section>

      {/* ── Footer features ──────────────────────────────────── */}
      <footer className="relative z-10 border-t border-white/[0.08] py-10 px-6 md:px-12 bg-gradient-to-t from-black via-black/70 to-transparent">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3">
          {features.map(({ icon: Icon, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + i * 0.09, duration: 0.45, ease: "easeOut" }}
              className="group flex items-center gap-3 p-4 rounded-xl border border-white/[0.07] bg-black/25 backdrop-blur-sm hover:bg-white/[0.08] hover:border-white/[0.15] transition-all duration-300 cursor-default"
            >
              <Icon className="w-4 h-4 opacity-40 group-hover:opacity-90 group-hover:text-amber-300 transition-all flex-shrink-0" />
              <span className="text-[11px] font-semibold uppercase tracking-wider opacity-40 group-hover:opacity-90 transition-opacity leading-tight">
                {label}
              </span>
            </motion.div>
          ))}
        </div>
      </footer>
    </div>
  );
}
