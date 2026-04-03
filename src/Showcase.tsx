import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, Zap } from "lucide-react";

interface ShowcaseProps {
  onBack: () => void;
  onStartProject: () => void;
}

export default function Showcase({ onBack, onStartProject }: ShowcaseProps) {
  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col">
      {/* Background grid */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M 80 0 L 0 0 0 80' fill='none' stroke='rgba(255,255,255,0.035)' stroke-width='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 py-6 md:px-12 w-full max-w-7xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <button onClick={onBack} className="flex items-center gap-2 group">
          <div className="w-7 h-7 rounded-full bg-amber-400 flex items-center justify-center shadow-md shadow-amber-500/20">
            <div className="w-3.5 h-3.5 bg-black rounded-sm rotate-45" />
          </div>
          <span className="font-black text-base tracking-tighter uppercase opacity-60 group-hover:opacity-100 transition-opacity">
            Tektree
          </span>
        </button>

        <motion.button
          onClick={onStartProject}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="px-5 py-2.5 bg-white text-black text-sm font-bold rounded-full shadow-lg shadow-white/10 hover:bg-amber-50 transition-colors"
        >
          Start a project
        </motion.button>
      </header>

      {/* Progress line */}
      <div className="relative z-10 px-6 md:px-12 max-w-7xl mx-auto w-full">
        <div className="h-px bg-white/[0.07]" />
      </div>

      {/* Content */}
      <main className="relative z-10 flex-1 px-6 md:px-12 max-w-7xl mx-auto w-full py-16 md:py-20">

        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14"
        >
          <p className="font-mono text-xs text-amber-400/70 tracking-widest uppercase mb-3">
            // our work
          </p>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight leading-[0.88]">
            Showcase
          </h1>
          <p className="font-serif italic text-base md:text-lg text-white/35 mt-4 max-w-md">
            Sites we've built for people who care about quality.
          </p>
        </motion.div>

        {/* Fing card */}
        <motion.a
          href="https://www.fing.com"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="group block rounded-2xl border border-white/[0.08] bg-white/[0.02] hover:border-white/[0.18] transition-all duration-500 overflow-hidden mb-6"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[480px]">

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
                    { value: "15M",  label: "Monthly scans" },
                    { value: "450k", label: "Device models" },
                  ].map(({ value, label }) => (
                    <div key={label}>
                      <div className="text-2xl md:text-3xl font-black tracking-tight">{value}</div>
                      <div className="text-[10px] text-white/28 uppercase tracking-widest mt-0.5 font-mono">
                        {label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {["Network Security", "Consumer App", "B2C / B2B", "iOS · Android · Desktop"].map((tag) => (
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

              {/* Fing preview */}
              <div className="relative flex-1 flex flex-col items-center justify-center px-8 py-10 overflow-hidden">
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: "radial-gradient(ellipse at 50% 45%, rgba(37,99,235,0.18) 0%, transparent 70%)",
                  }}
                />

                {/* Network graph */}
                <svg
                  className="absolute inset-0 w-full h-full"
                  viewBox="0 0 480 420"
                  preserveAspectRatio="xMidYMid slice"
                >
                  <line x1="240" y1="200" x2="110" y2="105" stroke="#3b82f6" strokeWidth="0.7" strokeOpacity="0.25" />
                  <line x1="240" y1="200" x2="375" y2="110" stroke="#3b82f6" strokeWidth="0.7" strokeOpacity="0.25" />
                  <line x1="240" y1="200" x2="88"  y2="285" stroke="#3b82f6" strokeWidth="0.7" strokeOpacity="0.2"  />
                  <line x1="240" y1="200" x2="392" y2="290" stroke="#3b82f6" strokeWidth="0.7" strokeOpacity="0.2"  />
                  <line x1="240" y1="200" x2="195" y2="345" stroke="#3b82f6" strokeWidth="0.7" strokeOpacity="0.18" />
                  <line x1="240" y1="200" x2="425" y2="200" stroke="#3b82f6" strokeWidth="0.7" strokeOpacity="0.2"  />
                  <line x1="240" y1="200" x2="55"  y2="190" stroke="#3b82f6" strokeWidth="0.7" strokeOpacity="0.18" />
                  <line x1="240" y1="200" x2="258" y2="55"  stroke="#3b82f6" strokeWidth="0.7" strokeOpacity="0.2"  />
                  <line x1="110" y1="105" x2="375" y2="110" stroke="#60a5fa" strokeWidth="0.5" strokeOpacity="0.1"  />
                  <line x1="88"  y1="285" x2="195" y2="345" stroke="#60a5fa" strokeWidth="0.5" strokeOpacity="0.1"  />

                  <circle cx="110" cy="105" r="4"   fill="#60a5fa" fillOpacity="0.55" />
                  <circle cx="375" cy="110" r="3.5" fill="#34d399" fillOpacity="0.5"  />
                  <circle cx="88"  cy="285" r="5"   fill="#60a5fa" fillOpacity="0.45" />
                  <circle cx="392" cy="290" r="3.5" fill="#60a5fa" fillOpacity="0.4"  />
                  <circle cx="195" cy="345" r="3"   fill="#34d399" fillOpacity="0.4"  />
                  <circle cx="425" cy="200" r="4"   fill="#60a5fa" fillOpacity="0.45" />
                  <circle cx="55"  cy="190" r="3.5" fill="#34d399" fillOpacity="0.4"  />
                  <circle cx="258" cy="55"  r="4"   fill="#60a5fa" fillOpacity="0.45" />
                  <circle cx="240" cy="200" r="22"  fill="#2563eb" fillOpacity="0.08" />
                  <circle cx="240" cy="200" r="10"  fill="#3b82f6" fillOpacity="0.85" />
                </svg>

                <div className="relative z-10 text-center">
                  <div className="text-4xl font-black tracking-[-2px] mb-1 text-white">FING</div>
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

        {/* More coming soon teaser */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="flex items-center gap-4 py-8"
        >
          <div className="flex-1 h-px bg-white/[0.06]" />
          <span className="text-xs font-mono text-white/20 tracking-widest uppercase">
            more coming soon
          </span>
          <div className="flex-1 h-px bg-white/[0.06]" />
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="flex flex-col items-center text-center pt-4 pb-8"
        >
          <p className="font-serif italic text-white/35 text-base mb-6">
            Want your site to be here?
          </p>
          <motion.button
            onClick={onStartProject}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="group relative px-8 py-4 bg-white text-black font-bold rounded-full flex items-center gap-2.5 text-sm uppercase tracking-tight overflow-hidden shadow-2xl shadow-white/20 cursor-pointer"
          >
            <span
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"
              aria-hidden
            />
            <span className="relative">Start your project</span>
            <Zap className="relative w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
          </motion.button>
        </motion.div>
      </main>
    </div>
  );
}
