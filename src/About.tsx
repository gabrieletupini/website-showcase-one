import { motion } from "motion/react";
import { ArrowLeft, Linkedin, Github, Zap } from "lucide-react";

interface AboutProps {
  onBack: () => void;
  onStartProject: () => void;
}

const stats = [
  { value: "25+", label: "Websites created" },
  { value: "5+",  label: "Years experience" },
  { value: "99.9%", label: "AWS uptime" },
];

const highlights = [
  { label: "Education",   value: "Computer Science · Universidad Latina" },
  { label: "Background",  value: "Classical music composition & theory" },
  { label: "Citizenship", value: "Italian-Costa Rican · Remote-first" },
  { label: "Availability", value: "Mon–Fri, 9:00–18:00 CET" },
];

export default function About({ onBack, onStartProject }: AboutProps) {
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
            EmberTree
          </span>
        </button>

        <motion.button
          onClick={onStartProject}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="px-5 py-2.5 bg-white text-black text-sm font-bold rounded-full shadow-lg shadow-white/10 hover:bg-amber-50 transition-colors"
        >
          Build your site
        </motion.button>
      </header>

      <div className="relative z-10 px-6 md:px-12 max-w-7xl mx-auto w-full">
        <div className="h-px bg-white/[0.07]" />
      </div>

      {/* Main content */}
      <main className="relative z-10 flex-1 px-6 md:px-12 max-w-7xl mx-auto w-full py-14 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-10 lg:gap-16 items-start">

          {/* ── Photo column ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-6"
          >
            {/* Photo */}
            <div className="relative rounded-2xl overflow-hidden aspect-[3/4] w-full max-w-sm mx-auto lg:mx-0">
              <img
                src={`${import.meta.env.BASE_URL}gabriele.jpg`}
                alt="Gabriele Tupini"
                className="w-full h-full object-cover object-center"
              />
              {/* Subtle amber glow at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              {/* Name overlay at bottom of photo */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/30 text-amber-300 text-xs font-mono tracking-widest uppercase mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  Founder
                </div>
              </div>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-3 flex-wrap">
              <a
                href="https://www.linkedin.com/in/gabriele-tupini-76610a16b/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.08] hover:border-white/[0.15] transition-all text-xs font-mono text-white/40 hover:text-white"
              >
                <Linkedin className="w-3.5 h-3.5" />
                LinkedIn
              </a>
              <a
                href="https://github.com/gabrieletupini"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.08] hover:border-white/[0.15] transition-all text-xs font-mono text-white/40 hover:text-white"
              >
                <Github className="w-3.5 h-3.5" />
                GitHub
              </a>
            </div>
          </motion.div>

          {/* ── Bio column ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col"
          >
            <p className="font-mono text-xs text-amber-400/70 tracking-widest uppercase mb-4">
              // the person behind the work
            </p>

            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-[0.88] mb-2">
              Gabriele<br />Tupini
            </h1>

            <p className="font-serif italic text-base md:text-lg text-white/40 mb-8">
              Web Designer & DevOps Architect
            </p>

            {/* Bio */}
            <div className="space-y-4 mb-10 text-sm md:text-base text-white/45 leading-relaxed max-w-lg">
              <p>
                I'm a Web Designer and DevOps Architect with a passion for creating
                beautiful, functional websites that combine aesthetic excellence with
                technical precision.
              </p>
              <p>
                With a background spanning from <span className="text-white/70">classical music composition</span> to
                enterprise-level DevOps architecture, I bring a unique blend of creativity
                and technical expertise to every project.
              </p>
              <p>
                My journey through Universidad Latina (Computer Science) and extensive
                experience with AWS infrastructure has shaped my approach to building
                cost-effective, scalable, and visually stunning web solutions.
              </p>
              <p className="font-serif italic text-white/35 text-sm border-l border-white/10 pl-4">
                "Design is not just what it looks like — design is how it works."
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-10">
              {stats.map(({ value, label }) => (
                <div
                  key={label}
                  className="p-4 rounded-xl border border-white/[0.07] bg-white/[0.03]"
                >
                  <div className="text-2xl md:text-3xl font-black tracking-tight mb-0.5">
                    {value}
                  </div>
                  <div className="text-[10px] text-white/28 uppercase tracking-widest font-mono">
                    {label}
                  </div>
                </div>
              ))}
            </div>

            {/* Highlights */}
            <div className="space-y-3 mb-10">
              {highlights.map(({ label, value }) => (
                <div
                  key={label}
                  className="flex items-baseline gap-3 text-sm"
                >
                  <span className="font-mono text-[10px] text-amber-400/60 uppercase tracking-widest shrink-0 w-24">
                    {label}
                  </span>
                  <span className="text-white/40">{value}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-wrap gap-3">
              <motion.button
                onClick={onStartProject}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="group relative px-8 py-4 bg-white text-black font-bold rounded-full flex items-center gap-2.5 text-sm uppercase tracking-tight overflow-hidden shadow-xl shadow-white/15 cursor-pointer"
              >
                <span
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"
                  aria-hidden
                />
                <span className="relative">Build your site</span>
                <Zap className="relative w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
              </motion.button>

              <a
                href="https://calendly.com/gabriele-tupini/consultation"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 border border-white/15 text-white/60 font-bold rounded-full text-sm uppercase tracking-tight hover:bg-white/[0.06] hover:border-white/25 hover:text-white transition-all"
              >
                Book a call
              </a>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
