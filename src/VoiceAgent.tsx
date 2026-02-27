import { motion } from "motion/react";
import { ArrowLeft, Mic, MicOff, Phone, PhoneOff } from "lucide-react";
import { useLiveAudio } from "./hooks/useLiveAudio";

interface VoiceAgentProps {
  onBack: () => void;
}

export default function VoiceAgent({ onBack }: VoiceAgentProps) {
  const { isConnected, isConnecting, isSpeaking, error, connect, disconnect } =
    useLiveAudio();

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

        <a
          href="https://embertree.io"
          className="flex items-center gap-2"
        >
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center"
        >
          <p className="font-mono text-xs text-amber-400/70 tracking-widest uppercase mb-6">
            Voice assistant
          </p>

          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-[0.88] mb-3">
            Talk to
            <br />
            EmberTree
          </h2>
          <p className="text-sm text-white/30 max-w-sm mb-12">
            Ask about our services, our process, or book a free consultation —
            all by voice.
          </p>

          {/* Orb */}
          <div className="relative mb-12">
            {/* Outer glow rings */}
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

            {/* Main orb */}
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
              onClick={disconnect}
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
