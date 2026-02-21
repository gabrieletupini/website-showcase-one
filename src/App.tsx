import { motion } from "motion/react";
import { ArrowRight, Globe, ShieldCheck, Zap, Layout } from "lucide-react";

const features = [
  { icon: Globe, label: "Happy Humans Everywhere" },
  { icon: ShieldCheck, label: "Super Safe & Secure" },
  { icon: Zap, label: "Fast Like a Rocket" },
  { icon: Layout, label: "Lots of Cool Choices" },
];

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black overflow-x-hidden relative flex flex-col">
      {/* ── Background Video ───────────────────────────────────────────── */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* top-to-bottom fade so nav is always readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-black z-10" />
        {/* left/right vignette */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60 z-10" />
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-40 scale-[1.03]"
          poster="https://picsum.photos/seed/agency/1920/1080?blur=10"
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_39zUbVmLqmft5amKgUX0QZgzwwF/hf_20260221_185928_ce2b8644-e189-418f-80f1-855fc0b70007.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      {/* ── Navigation ────────────────────────────────────────────────── */}
      <motion.nav
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="relative z-20 flex items-center justify-between px-6 py-6 md:px-12 max-w-7xl mx-auto w-full"
      >
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md shadow-white/10">
            <div className="w-4 h-4 bg-black rounded-sm rotate-45" />
          </div>
          <span className="font-black text-xl tracking-tighter uppercase">AI.Agency</span>
        </div>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          {["Build site", "Pricing", "FAQ", "Showcase"].map((item, i) => (
            <motion.a
              key={item}
              href="#"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.45 }}
              transition={{ delay: 0.15 * i + 0.3 }}
              className="hover:opacity-100 transition-opacity duration-200"
            >
              {item}
            </motion.a>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 text-sm font-medium opacity-55 hover:opacity-100 transition-opacity">
            Sign in
          </button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="px-5 py-2.5 bg-white text-black text-sm font-bold rounded-full shadow-lg shadow-white/10 hover:bg-gray-100 transition-colors"
          >
            Get started
          </motion.button>
        </div>
      </motion.nav>

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 md:px-12 max-w-7xl mx-auto w-full pt-8 pb-32">
        {/* Live badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="mb-8 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.05] backdrop-blur-sm text-xs font-semibold uppercase tracking-widest text-white/50"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Now with AI-powered generation
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="flex flex-col items-center"
        >
          <h1 className="text-6xl md:text-8xl lg:text-[9.5rem] font-black leading-[0.82] tracking-tight mb-6 uppercase">
            <span className="font-serif italic font-normal block lowercase mb-2 opacity-80 text-[0.95em]">
              magic websites
            </span>
            <span className="block">built fast</span>
          </h1>

          <p className="text-sm md:text-base opacity-35 max-w-md leading-relaxed mb-10 font-medium mt-3 tracking-wide">
            we use the blend of smart technologies and tech savviness to create
            the websites of your dreams
          </p>

          {/* CTA row */}
          <div className="flex flex-wrap justify-center gap-3">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="group relative px-8 py-4 bg-white text-black font-bold rounded-full flex items-center gap-2.5 text-sm uppercase tracking-tight overflow-hidden shadow-2xl shadow-white/20"
            >
              {/* shimmer on hover */}
              <span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"
                aria-hidden
              />
              <span className="relative">create my site</span>
              <Zap className="relative w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="group px-8 py-4 border border-white/15 text-white font-bold rounded-full flex items-center gap-2.5 text-sm uppercase tracking-tight hover:bg-white/[0.06] hover:border-white/25 transition-all backdrop-blur-sm"
            >
              see examples
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </motion.button>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.25 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
        >
          <span className="text-[10px] uppercase tracking-[0.2em] font-medium">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/80 to-transparent" />
        </motion.div>
      </main>

      {/* ── Footer features bar ───────────────────────────────────────── */}
      <footer className="relative z-10 border-t border-white/[0.07] py-10 px-6 md:px-12 bg-gradient-to-t from-black via-black/80 to-transparent">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3">
          {features.map(({ icon: Icon, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + i * 0.09, duration: 0.45, ease: "easeOut" }}
              className="group flex items-center gap-3 p-4 rounded-xl border border-white/[0.06] bg-white/[0.03] hover:bg-white/[0.07] hover:border-white/[0.12] transition-all duration-300 cursor-default"
            >
              <Icon className="w-4 h-4 opacity-35 group-hover:opacity-75 transition-opacity flex-shrink-0" />
              <span className="text-[11px] font-semibold uppercase tracking-wider opacity-35 group-hover:opacity-75 transition-opacity leading-tight">
                {label}
              </span>
            </motion.div>
          ))}
        </div>
      </footer>
    </div>
  );
}
