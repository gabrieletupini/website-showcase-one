import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  Mic,
  MicOff,
  Phone,
  PhoneOff,
  Calendar,
  Send,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import emailjs from "@emailjs/browser";
import { useLiveAudio } from "./hooks/useLiveAudio";

const EMAILJS_SERVICE = "service_zgf03ey";
const EMAILJS_TEMPLATE = "template_7r3r8rd";
const EMAILJS_PUBLIC_KEY = "d09HeaQfradvNnLgt";
const CALENDLY_URL =
  "https://calendly.com/gabritupini3/15-minute-meeting-clone";

interface VoiceAgentProps {
  onBack: () => void;
}

export default function VoiceAgent({ onBack }: VoiceAgentProps) {
  const { isConnected, isConnecting, isSpeaking, error, connect, disconnect } =
    useLiveAudio({
      onBooking: () => {
        window.open(CALENDLY_URL, "_blank", "noopener,noreferrer");
      },
    });

  const [callEnded, setCallEnded] = useState(false);
  const [summaryName, setSummaryName] = useState("");
  const [summaryEmail, setSummaryEmail] = useState("");
  const [summaryNotes, setSummaryNotes] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [sendError, setSendError] = useState("");

  function handleEndCall() {
    disconnect();
    setCallEnded(true);
  }

  async function handleSendSummary() {
    if (sending || !summaryName || !summaryEmail) return;
    setSending(true);
    setSendError("");
    try {
      await emailjs.send(
        EMAILJS_SERVICE,
        EMAILJS_TEMPLATE,
        {
          from_name: summaryName,
          from_email: summaryEmail,
          reply_to: summaryEmail,
          to_name: "Gabriele",
          subject: `Zara Voice Call — ${summaryName}`,
          user_name: summaryName,
          user_email: summaryEmail,
          user_message: summaryNotes || "No additional notes.",
          message: `Voice call summary from Zara

Name:  ${summaryName}
Email: ${summaryEmail}

Notes:
${summaryNotes || "No additional notes provided."}`,
        },
        EMAILJS_PUBLIC_KEY
      );
      setSent(true);
    } catch {
      setSendError("Failed to send — please try again.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col overflow-hidden relative">
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
          onClick={() => {
            if (isConnected) disconnect();
            onBack();
          }}
          className="flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </button>

        <a href="https://embertree.io" className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-amber-400 flex items-center justify-center">
            <div className="w-3 h-3 bg-black rounded-sm rotate-45" />
          </div>
          <span className="font-black text-sm tracking-tighter uppercase opacity-50">
            EmberTree
          </span>
        </a>
      </header>

      {/* Main content */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 md:px-12 max-w-3xl mx-auto w-full">
        <AnimatePresence mode="wait">
          {/* ── Post-call screen ── */}
          {callEnded ? (
            <motion.div
              key="post-call"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center text-center w-full max-w-md"
            >
              <div className="w-16 h-16 rounded-full bg-amber-400/15 border border-amber-400/30 flex items-center justify-center mb-6">
                <CheckCircle2 className="w-8 h-8 text-amber-400" />
              </div>

              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight leading-[0.88] mb-2">
                Great chat!
              </h2>
              <p className="text-sm text-white/30 mb-10 max-w-sm">
                Ready for the next step? Book a free 15-min consultation with
                Gabriele, or send us your details so we can follow up.
              </p>

              {/* Book a call */}
              <motion.a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="group w-full px-6 py-4 bg-white text-black font-bold rounded-xl flex items-center gap-3 text-sm uppercase tracking-tight shadow-xl shadow-white/15 hover:bg-amber-50 transition-colors relative overflow-hidden mb-4"
              >
                <span
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"
                  aria-hidden
                />
                <Calendar className="relative w-5 h-5 flex-shrink-0" />
                <div className="relative text-left">
                  <div>Book a free consultation</div>
                  <div className="text-[11px] text-black/50 font-medium normal-case tracking-normal">
                    15 minutes with Gabriele — pick a time that works
                  </div>
                </div>
              </motion.a>

              {/* Divider */}
              <div className="flex items-center gap-3 w-full my-6">
                <div className="h-px flex-1 bg-white/[0.08]" />
                <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest">
                  or send your details
                </span>
                <div className="h-px flex-1 bg-white/[0.08]" />
              </div>

              {/* Send summary form */}
              {!sent ? (
                <div className="w-full space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={summaryName}
                      onChange={(e) => setSummaryName(e.target.value)}
                      placeholder="Your name *"
                      className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-amber-400/60 transition-colors"
                    />
                    <input
                      type="email"
                      value={summaryEmail}
                      onChange={(e) => setSummaryEmail(e.target.value)}
                      placeholder="Your email *"
                      className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-amber-400/60 transition-colors"
                    />
                  </div>
                  <textarea
                    value={summaryNotes}
                    onChange={(e) => setSummaryNotes(e.target.value)}
                    placeholder="Anything you'd like us to know (optional)"
                    rows={3}
                    className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-amber-400/60 transition-colors resize-none"
                  />
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSendSummary}
                    disabled={!summaryName || !summaryEmail || sending}
                    className="w-full px-6 py-3.5 bg-white/[0.06] border border-white/[0.1] rounded-xl font-bold text-sm uppercase tracking-tight text-white/70 hover:bg-white/[0.1] hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {sending ? (
                      <>
                        Sending… <Loader2 className="w-4 h-4 animate-spin" />
                      </>
                    ) : (
                      <>
                        Send details <Send className="w-4 h-4" />
                      </>
                    )}
                  </motion.button>
                  {sendError && (
                    <p className="text-xs text-red-400/80 font-mono text-center">
                      {sendError}
                    </p>
                  )}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-sm text-amber-400 font-medium"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Sent! We'll be in touch within 24 hours.
                </motion.div>
              )}

              {/* Back home */}
              <button
                onClick={onBack}
                className="mt-8 text-xs text-white/25 hover:text-white/50 transition-colors font-mono uppercase tracking-widest"
              >
                ← Back to home
              </button>
            </motion.div>
          ) : (
            /* ── Active call / pre-call screen ── */
            <motion.div
              key="call"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center text-center"
            >
              <p className="font-mono text-xs text-amber-400/70 tracking-widest uppercase mb-6">
                Voice assistant
              </p>

              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-[0.88] mb-3">
                Meet
                <br />
                Zara
              </h2>
              <p className="text-sm text-white/30 max-w-sm mb-12">
                Our trained AI assistant — she'll walk you through our services,
                answer your questions, and help you book a consultation.
              </p>

              {/* Orb */}
              <div className="relative mb-12">
                {isConnected && (
                  <>
                    <motion.div
                      animate={{
                        scale: isSpeaking ? [1, 1.5, 1] : 1,
                        opacity: isSpeaking ? [0.15, 0, 0.15] : 0.05,
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="absolute inset-[-40px] rounded-full bg-amber-400/20 blur-xl"
                    />
                    <motion.div
                      animate={{
                        scale: isSpeaking ? [1, 1.3, 1] : 1,
                        opacity: isSpeaking ? [0.2, 0.05, 0.2] : 0.08,
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.3,
                      }}
                      className="absolute inset-[-20px] rounded-full bg-amber-400/15 blur-lg"
                    />
                  </>
                )}

                <motion.div
                  animate={
                    isConnecting
                      ? { scale: [1, 1.05, 1], opacity: [0.5, 0.8, 0.5] }
                      : isSpeaking
                        ? { scale: [1, 1.08, 1] }
                        : { scale: 1 }
                  }
                  transition={
                    isConnecting || isSpeaking
                      ? { duration: 1.2, repeat: Infinity, ease: "easeInOut" }
                      : {}
                  }
                  className={`relative w-32 h-32 md:w-40 md:h-40 rounded-full flex items-center justify-center transition-colors duration-500 ${
                    isConnected
                      ? "bg-gradient-to-br from-amber-400/25 to-amber-600/15 border border-amber-400/30 shadow-lg shadow-amber-400/10"
                      : "bg-white/[0.04] border border-white/[0.09]"
                  }`}
                >
                  {isConnected ? (
                    <Mic className="w-10 h-10 md:w-12 md:h-12 text-amber-400" />
                  ) : (
                    <MicOff className="w-10 h-10 md:w-12 md:h-12 text-white/25" />
                  )}
                </motion.div>
              </div>

              {/* Status */}
              <p className="font-mono text-xs tracking-widest uppercase mb-8 h-4">
                {isConnecting && (
                  <span className="text-amber-400/70">Connecting…</span>
                )}
                {isConnected && isSpeaking && (
                  <span className="text-amber-400">Speaking…</span>
                )}
                {isConnected && !isSpeaking && (
                  <span className="text-white/30">Listening…</span>
                )}
                {!isConnected && !isConnecting && (
                  <span className="text-white/20">Ready</span>
                )}
              </p>

              {/* Call button */}
              {!isConnected ? (
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={connect}
                  disabled={isConnecting}
                  className="group px-8 py-4 bg-white text-black font-bold rounded-full flex items-center gap-2.5 text-sm uppercase tracking-tight shadow-xl shadow-white/20 hover:bg-amber-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed relative overflow-hidden"
                >
                  <span
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"
                    aria-hidden
                  />
                  <Phone className="relative w-4 h-4" />
                  <span className="relative">
                    {isConnecting ? "Connecting…" : "Start call"}
                  </span>
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleEndCall}
                  className="px-8 py-4 bg-red-500/20 border border-red-500/30 text-red-400 font-bold rounded-full flex items-center gap-2.5 text-sm uppercase tracking-tight hover:bg-red-500/30 transition-colors"
                >
                  <PhoneOff className="w-4 h-4" />
                  End call
                </motion.button>
              )}

              {/* Error */}
              {error && (
                <p className="mt-6 text-xs text-red-400/80 font-mono max-w-sm text-center">
                  {error}
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer hint */}
      <footer className="relative z-10 py-6 text-center">
        <p className="text-[10px] font-mono text-white/15 tracking-widest uppercase">
          Powered by Gemini
        </p>
      </footer>
    </div>
  );
}
