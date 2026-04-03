import { useRef, useState } from "react";
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
  X,
  Clock,
  User,
  Mail,
} from "lucide-react";
import emailjs from "@emailjs/browser";
import {
  useLiveAudio,
  createBooking,
  type BookingData,
} from "./hooks/useLiveAudio";

const EMAILJS_SERVICE = "service_zgf03ey";
const EMAILJS_TEMPLATE = "template_7r3r8rd";
const EMAILJS_PUBLIC_KEY = "d09HeaQfradvNnLgt";
const CAL_URL = "https://cal.com/gabriele-tupini-da60rn/15min";

interface VoiceAgentProps {
  onBack: () => void;
}

export default function VoiceAgent({ onBack }: VoiceAgentProps) {
  // ── Booking confirmation state ──
  const [showBooking, setShowBooking] = useState(false);
  const [bookingName, setBookingName] = useState("");
  const [bookingEmail, setBookingEmail] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [bookingTz, setBookingTz] = useState("");
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingDone, setBookingDone] = useState(false);
  const [bookingError, setBookingError] = useState("");
  const pendingRespondRef = useRef<
    ((result: { success: boolean; message: string }) => void) | null
  >(null);

  const { isConnected, isConnecting, isSpeaking, error, connect, disconnect } =
    useLiveAudio({
      onBookConfirm: (data, respond) => {
        setBookingName(data.name);
        setBookingEmail(data.email);
        setBookingTime(data.startTime);
        setBookingTz(data.timezone);
        setBookingDone(false);
        setBookingError("");
        setBookingLoading(false);
        pendingRespondRef.current = respond;
        setShowBooking(true);
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

  async function handleConfirmBooking() {
    if (bookingLoading || !bookingName || !bookingEmail || !bookingTime) return;
    setBookingLoading(true);
    setBookingError("");
    try {
      await createBooking(bookingTime, bookingName, bookingEmail, bookingTz);
      setBookingDone(true);
      pendingRespondRef.current?.({
        success: true,
        message: `Booking confirmed for ${bookingName} at ${bookingTime}. A confirmation email will be sent to ${bookingEmail}.`,
      });
    } catch (err: any) {
      console.error("Booking failed:", err);
      setBookingError("Booking failed — please try again.");
      pendingRespondRef.current?.({
        success: false,
        message: `Booking failed: ${err.message}`,
      });
    } finally {
      setBookingLoading(false);
    }
  }

  function handleCancelBooking() {
    setShowBooking(false);
    pendingRespondRef.current?.({
      success: false,
      message:
        "The caller cancelled the booking confirmation. Ask if they'd like to pick a different time.",
    });
    pendingRespondRef.current = null;
  }

  function formatBookingTime(iso: string, tz: string) {
    try {
      const d = new Date(iso);
      return d.toLocaleString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        timeZone: tz,
        timeZoneName: "short",
      });
    } catch {
      return iso;
    }
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
          subject: `Sara Voice Call — ${summaryName}`,
          user_name: summaryName,
          user_email: summaryEmail,
          user_message: summaryNotes || "No additional notes.",
          message: `Voice call summary from Sara

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

        <a href="https://tektree.com" className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-amber-400 flex items-center justify-center">
            <div className="w-3 h-3 bg-black rounded-sm rotate-45" />
          </div>
          <span className="font-black text-sm tracking-tighter uppercase opacity-50">
            Tektree
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
                href={CAL_URL}
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
                Sara
              </h2>
              <p className="text-sm text-white/30 max-w-sm mb-12">
                Our trained AI assistant — she'll walk you through our services,
                answer your questions, and book a consultation for you.
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

      {/* ── Booking confirmation overlay ── */}
      <AnimatePresence>
        {showBooking && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-sm bg-neutral-900 rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-amber-400" />
                  <span className="text-sm font-bold uppercase tracking-tight">
                    {bookingDone ? "Booking confirmed!" : "Confirm your booking"}
                  </span>
                </div>
                <button
                  onClick={() => {
                    if (!bookingDone) handleCancelBooking();
                    else setShowBooking(false);
                  }}
                  className="w-8 h-8 rounded-full bg-white/[0.06] hover:bg-white/[0.12] flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4 text-white/60" />
                </button>
              </div>

              <div className="p-5 space-y-4">
                {bookingDone ? (
                  /* Success state */
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center text-center py-4"
                  >
                    <div className="w-14 h-14 rounded-full bg-amber-400/15 border border-amber-400/30 flex items-center justify-center mb-4">
                      <CheckCircle2 className="w-7 h-7 text-amber-400" />
                    </div>
                    <p className="text-sm font-bold mb-1">You're all set!</p>
                    <p className="text-xs text-white/40">
                      {formatBookingTime(bookingTime, bookingTz)}
                    </p>
                    <p className="text-xs text-white/30 mt-2">
                      Confirmation email sent to {bookingEmail}
                    </p>
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setShowBooking(false)}
                      className="mt-5 px-6 py-2.5 bg-white/[0.06] border border-white/[0.1] rounded-xl text-xs font-bold uppercase tracking-tight text-white/60 hover:text-white hover:bg-white/[0.1] transition-all"
                    >
                      Back to call
                    </motion.button>
                  </motion.div>
                ) : (
                  /* Editable confirmation form */
                  <>
                    {/* Time display */}
                    <div className="flex items-center gap-3 p-3 bg-amber-400/10 border border-amber-400/20 rounded-xl">
                      <Clock className="w-5 h-5 text-amber-400 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-bold">
                          {formatBookingTime(bookingTime, bookingTz)}
                        </p>
                        <p className="text-[11px] text-white/40">
                          15-minute consultation with Gabriele
                        </p>
                      </div>
                    </div>

                    {/* Editable fields */}
                    <div className="space-y-3">
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                        <input
                          type="text"
                          value={bookingName}
                          onChange={(e) => setBookingName(e.target.value)}
                          placeholder="Your name"
                          className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-amber-400/60 transition-colors"
                        />
                      </div>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                        <input
                          type="email"
                          value={bookingEmail}
                          onChange={(e) => setBookingEmail(e.target.value)}
                          placeholder="Your email"
                          className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-amber-400/60 transition-colors"
                        />
                      </div>
                    </div>

                    {/* Error */}
                    {bookingError && (
                      <p className="text-xs text-red-400/80 font-mono text-center">
                        {bookingError}
                      </p>
                    )}

                    {/* Actions */}
                    <div className="flex gap-3 pt-1">
                      <button
                        onClick={handleCancelBooking}
                        disabled={bookingLoading}
                        className="flex-1 px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-xs font-bold uppercase tracking-tight text-white/40 hover:text-white/60 hover:bg-white/[0.08] transition-all disabled:opacity-30"
                      >
                        Cancel
                      </button>
                      <motion.button
                        whileTap={{ scale: 0.97 }}
                        onClick={handleConfirmBooking}
                        disabled={
                          bookingLoading || !bookingName || !bookingEmail
                        }
                        className="flex-1 px-4 py-3 bg-amber-400 text-black rounded-xl text-xs font-bold uppercase tracking-tight hover:bg-amber-300 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {bookingLoading ? (
                          <>
                            Booking…{" "}
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          </>
                        ) : (
                          <>
                            Confirm{" "}
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          </>
                        )}
                      </motion.button>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
