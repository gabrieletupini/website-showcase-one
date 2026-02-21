import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Send, CheckCircle2, Loader2 } from "lucide-react";
import emailjs from "@emailjs/browser";

const EMAILJS_SERVICE  = "service_zgf03ey";
const EMAILJS_TEMPLATE = "template_7r3r8rd";
const EMAILJS_PUBLIC_KEY = "d09HeaQfradvNnLgt";

interface FormData {
  siteType: string;
  industry: string;
  budget: string;
  name: string;
  email: string;
  message: string;
}

interface WizardProps {
  onBack: () => void;
}

const SITE_TYPES = [
  { id: "portfolio", label: "Portfolio", desc: "Showcase your work" },
  { id: "business", label: "Business", desc: "Professional company presence" },
  { id: "ecommerce", label: "Online Store", desc: "Sell products or services" },
  { id: "landing", label: "Landing Page", desc: "Focused, high-conversion" },
  { id: "blog", label: "Blog", desc: "Content & storytelling" },
  { id: "other", label: "Something else", desc: "Let's figure it out" },
];

const INDUSTRIES = [
  { id: "tech", label: "Tech & Software" },
  { id: "creative", label: "Creative & Design" },
  { id: "retail", label: "Retail & Fashion" },
  { id: "food", label: "Food & Hospitality" },
  { id: "health", label: "Health & Wellness" },
  { id: "other", label: "Other industry" },
];

const BUDGETS = [
  { id: "sub1k", label: "Under €1,000", desc: "Quick & focused" },
  { id: "1to5k", label: "€1,000 – €5,000", desc: "Standard site" },
  { id: "5to15k", label: "€5,000 – €15,000", desc: "Premium experience" },
  { id: "15kplus", label: "€15,000+", desc: "Large-scale project" },
  { id: "flexible", label: "Flexible", desc: "Let's find the right fit" },
];

function OptionCard({
  label,
  desc,
  selected,
  onClick,
}: {
  label: string;
  desc?: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`w-full text-left p-5 rounded-xl border transition-all duration-200 cursor-pointer ${
        selected
          ? "bg-white text-black border-white shadow-xl shadow-white/20"
          : "bg-white/[0.04] border-white/[0.09] text-white hover:bg-white/[0.08] hover:border-white/20"
      }`}
    >
      <div className="font-bold text-sm uppercase tracking-tight">{label}</div>
      {desc && (
        <div className={`text-xs mt-1 ${selected ? "text-black/50" : "text-white/35"}`}>
          {desc}
        </div>
      )}
    </motion.button>
  );
}

const slideVariants = {
  enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 52 : -52 }),
  center: { opacity: 1, x: 0 },
  exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -52 : 52 }),
};

export default function Wizard({ onBack }: WizardProps) {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState<FormData>({
    siteType: "",
    industry: "",
    budget: "",
    name: "",
    email: "",
    message: "",
  });

  const totalSteps = 4;

  function set(field: keyof FormData, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function goNext() {
    setDirection(1);
    setStep((s) => s + 1);
  }

  function goBack() {
    if (step === 1) {
      onBack();
      return;
    }
    setDirection(-1);
    setStep((s) => s - 1);
  }

  async function handleSend() {
    if (sending) return;
    setSending(true);
    setError("");
    try {
      await emailjs.send(
        EMAILJS_SERVICE,
        EMAILJS_TEMPLATE,
        {
          from_name:      form.name,
          from_email:     form.email,
          reply_to:       form.email,
          to_name:        "Gabriele",
          subject:        `Website Request — ${form.name}`,
          user_name:      form.name,
          user_email:     form.email,
          user_site_type: form.siteType,
          user_industry:  form.industry,
          user_budget:    form.budget,
          user_message:   form.message || "—",
          message: `New site request from ${form.name} (${form.email})

Site type: ${form.siteType}
Industry:  ${form.industry}
Budget:    ${form.budget}

${form.message ? `Message:\n${form.message}` : "No additional message."}`,
        },
        EMAILJS_PUBLIC_KEY
      );
      setSent(true);
    } catch {
      setError("Something went wrong — please try again or email us directly.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col overflow-hidden">
      {/* Background grid */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M 80 0 L 0 0 0 80' fill='none' stroke='rgba(255,255,255,0.035)' stroke-width='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 py-6 md:px-12 w-full max-w-3xl mx-auto">
        <button
          onClick={goBack}
          className="flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          {step === 1 ? "Back to home" : "Back"}
        </button>

        <a href="https://embertree.io" className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-amber-400 flex items-center justify-center">
            <div className="w-3 h-3 bg-black rounded-sm rotate-45" />
          </div>
          <span className="font-black text-sm tracking-tighter uppercase opacity-50">
            EmberTree
          </span>
        </a>

        <span className="font-mono text-xs text-white/25 tracking-widest">
          {String(step).padStart(2, "0")} / {String(totalSteps).padStart(2, "0")}
        </span>
      </header>

      {/* Progress bar */}
      <div className="relative z-10 px-6 md:px-12 max-w-3xl mx-auto w-full">
        <div className="h-px bg-white/[0.08] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-amber-400 rounded-full"
            initial={false}
            animate={{ width: `${(step / totalSteps) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>
      </div>

      {/* Step content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-6 md:px-12 max-w-3xl mx-auto w-full py-12 overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={sent ? "sent" : step}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* ── Step 1 ── */}
            {step === 1 && !sent && (
              <div>
                <p className="font-mono text-xs text-amber-400/70 tracking-widest uppercase mb-4">
                  Step 1 of 4
                </p>
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-[0.88] mb-2">
                  What are you<br />looking for?
                </h2>
                <p className="text-sm text-white/30 mb-8">
                  Pick the type of site you need.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {SITE_TYPES.map((opt) => (
                    <OptionCard
                      key={opt.id}
                      label={opt.label}
                      desc={opt.desc}
                      selected={form.siteType === opt.id}
                      onClick={() => set("siteType", opt.id)}
                    />
                  ))}
                </div>
                <AnimatePresence>
                  {form.siteType && (
                    <motion.button
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={goNext}
                      className="mt-8 px-8 py-4 bg-white text-black font-bold rounded-full text-sm uppercase tracking-tight shadow-xl shadow-white/20 hover:bg-amber-50 transition-colors"
                    >
                      Next →
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* ── Step 2 ── */}
            {step === 2 && !sent && (
              <div>
                <p className="font-mono text-xs text-amber-400/70 tracking-widest uppercase mb-4">
                  Step 2 of 4
                </p>
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-[0.88] mb-2">
                  What's your<br />area?
                </h2>
                <p className="text-sm text-white/30 mb-8">
                  Tell us about your industry.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {INDUSTRIES.map((opt) => (
                    <OptionCard
                      key={opt.id}
                      label={opt.label}
                      selected={form.industry === opt.id}
                      onClick={() => set("industry", opt.id)}
                    />
                  ))}
                </div>
                <AnimatePresence>
                  {form.industry && (
                    <motion.button
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={goNext}
                      className="mt-8 px-8 py-4 bg-white text-black font-bold rounded-full text-sm uppercase tracking-tight shadow-xl shadow-white/20 hover:bg-amber-50 transition-colors"
                    >
                      Next →
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* ── Step 3 ── */}
            {step === 3 && !sent && (
              <div>
                <p className="font-mono text-xs text-amber-400/70 tracking-widest uppercase mb-4">
                  Step 3 of 4
                </p>
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-[0.88] mb-2">
                  What's your<br />budget?
                </h2>
                <p className="text-sm text-white/30 mb-8">
                  No commitment — just a rough idea.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {BUDGETS.map((opt) => (
                    <OptionCard
                      key={opt.id}
                      label={opt.label}
                      desc={opt.desc}
                      selected={form.budget === opt.id}
                      onClick={() => set("budget", opt.id)}
                    />
                  ))}
                </div>
                <AnimatePresence>
                  {form.budget && (
                    <motion.button
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={goNext}
                      className="mt-8 px-8 py-4 bg-white text-black font-bold rounded-full text-sm uppercase tracking-tight shadow-xl shadow-white/20 hover:bg-amber-50 transition-colors"
                    >
                      Next →
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* ── Step 4: Contact ── */}
            {step === 4 && !sent && (
              <div>
                <p className="font-mono text-xs text-amber-400/70 tracking-widest uppercase mb-4">
                  Step 4 of 4
                </p>
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-[0.88] mb-2">
                  Let's make it<br />happen
                </h2>
                <p className="text-sm text-white/30 mb-6">
                  Leave your details — we'll reach out within 24h.
                </p>

                {/* Summary chips */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {[form.siteType, form.industry, form.budget]
                    .filter(Boolean)
                    .map((v) => (
                      <span
                        key={v}
                        className="px-3 py-1 rounded-full bg-white/[0.06] border border-white/[0.1] text-xs font-mono uppercase tracking-wider text-white/45"
                      >
                        {v.replace(/-/g, " ")}
                      </span>
                    ))}
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-white/30 uppercase tracking-widest mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => set("name", e.target.value)}
                        placeholder="Your name"
                        className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-amber-400/60 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-white/30 uppercase tracking-widest mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => set("email", e.target.value)}
                        placeholder="your@email.com"
                        className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-amber-400/60 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-white/30 uppercase tracking-widest mb-2">
                      Message{" "}
                      <span className="text-white/15 normal-case tracking-normal font-sans">
                        (optional)
                      </span>
                    </label>
                    <textarea
                      value={form.message}
                      onChange={(e) => set("message", e.target.value)}
                      placeholder="Anything else you'd like us to know..."
                      rows={3}
                      className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-amber-400/60 transition-colors resize-none"
                    />
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSend}
                  disabled={!form.name || !form.email || sending}
                  className="group mt-6 px-8 py-4 bg-white text-black font-bold rounded-full flex items-center gap-2.5 text-sm uppercase tracking-tight shadow-xl shadow-white/20 hover:bg-amber-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed relative overflow-hidden"
                >
                  <span
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"
                    aria-hidden
                  />
                  {sending ? (
                    <>
                      <span className="relative">Sending…</span>
                      <Loader2 className="relative w-4 h-4 animate-spin" />
                    </>
                  ) : (
                    <>
                      <span className="relative">Send request</span>
                      <Send className="relative w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </>
                  )}
                </motion.button>

                {error && (
                  <p className="mt-4 text-xs text-red-400/80 font-mono">{error}</p>
                )}
              </div>
            )}

            {/* ── Success ── */}
            {sent && (
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center text-center py-16"
              >
                <div className="w-20 h-20 rounded-full bg-amber-400/15 border border-amber-400/30 flex items-center justify-center mb-8">
                  <CheckCircle2 className="w-10 h-10 text-amber-400" />
                </div>
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-[0.88] mb-4">
                  Request sent!
                </h2>
                <p className="text-sm text-white/40 max-w-sm leading-relaxed mb-10">
                  Got it! We'll review your request and get back to you within 24 hours.
                </p>
                <button
                  onClick={onBack}
                  className="px-6 py-3 bg-white/[0.06] border border-white/[0.1] rounded-full text-sm font-medium text-white/60 hover:bg-white/[0.1] transition-colors"
                >
                  Back to home
                </button>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
