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

      {/* ── Background ───────────────────────────────────────── */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Video — high opacity, let it breathe */}
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

        {/* Tech grid — sits on top of video */}
        <div
          className="absolute inset-0 z-[2] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M 80 0 L 0 0 0 80' fill='none' stroke='rgba(255,255,255,0.045)' stroke-width='0.5'/%3E%3C/svg%3E")`,
            backgroundSize: "80px 80px",
          }}
        />

        {/* Minimal edge vignettes — only top + bottom, very light */}
        <div className="absolute inset-0 z-[3] bg-gradient-to-b from-black/45 via-transparent to-black/75 pointer-events-none" />
      </div>

      {/* ── Navigation ───────────────────────────────────────── */}
      <motion.nav
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="relative z-20 flex items-center justify-between px-6 py-6 md:px-12 max-w-7xl mx-auto w-full"
      >
        {/* Logo */}
        <a href="https://embertree.io" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-amber-400 shadow-lg shadow-amber-500/30 group-hover:shadow-amber-400/50 transition-shadow">
            <div className="w-4 h-4 bg-black rounded-sm rotate-45" />
          </div>
          <span className="font-black text-xl tracking-tighter uppercase">EmberTree</span>
        </a>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          {[
            { label: "Build site", href: "https://app.embertree.io/new" },
            { label: "Pricing", href: "https://embertree.io/pricing" },
            { label: "FAQ", href: "https://embertree.io/faq" },
            { label: "Showcase", href: "https://embertree.io/showcase" },
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

        {/* Actions */}
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

        {/* Tech readout — bottom left */}
        <div className="absolute bottom-12 left-0 hidden md:block font-mono text-[10px] text-white/20 tracking-widest select-none">
          45.4654°N 9.1866°E // UTC+01:00
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
          // fully operational — new site in under 30 min
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="flex flex-col items-center"
        >
          <h1 className="text-6xl md:text-8xl lg:text-[9.5rem] font-black leading-[0.82] tracking-tight mb-6 uppercase drop-shadow-2xl">
            <span className="font-serif italic font-normal block lowercase mb-2 text-[0.95em] opacity-90">
              magic websites
            </span>
            <span className="block">built fast</span>
          </h1>

          <p className="text-sm md:text-base opacity-55 max-w-md leading-relaxed mb-10 font-medium mt-3 tracking-wide drop-shadow-lg">
            we blend cutting-edge technology with design savviness to craft
            the websites of your dreams
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap justify-center gap-3">
            <motion.a
              href="https://app.embertree.io/new"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="group relative px-8 py-4 bg-white text-black font-bold rounded-full flex items-center gap-2.5 text-sm uppercase tracking-tight overflow-hidden shadow-2xl shadow-white/25"
            >
              <span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"
                aria-hidden
              />
              <span className="relative">create my site</span>
              <Zap className="relative w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
            </motion.a>

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
