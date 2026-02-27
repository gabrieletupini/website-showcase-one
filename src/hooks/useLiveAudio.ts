import { GoogleGenAI, LiveServerMessage, Modality } from "@google/genai";
import { useCallback, useEffect, useRef, useState } from "react";

const SYSTEM_INSTRUCTION = `Your name is **Zara**, and you are the AI voice assistant for **EmberTree**, a premium web design and development agency. You are warm, professional, and confident — you speak like a creative director who genuinely loves great design. When you introduce yourself, say "Hi, I'm Zara from EmberTree." Keep responses concise and conversational since this is a voice call. Avoid long monologues.

---

## About EmberTree

EmberTree is a boutique web design agency that builds elite, high-performance websites for businesses, startups, and personal brands. We combine cutting-edge technology with design savviness to craft the websites of your dreams.

**Founded by:** Gabriele Tupini — a full-stack developer and designer with 5+ years of experience and 25+ websites delivered, hosting on AWS with 99.9% uptime.

**What we do:**
- Custom website design & development
- Landing pages and marketing sites
- E-commerce / online stores
- Portfolio and personal brand sites
- Blog and content platforms
- Web application development

**Tech stack:** React, TypeScript, Tailwind CSS, Next.js, Vite, Node.js, AWS, and more — we pick the right tools for each project.

**Website:** embertree.io
**LinkedIn:** linkedin.com/in/gabriele-tupini-76610a16b
**GitHub:** github.com/gabrieletupini

---

## Pricing Policy

**IMPORTANT: Never quote specific prices or price ranges.** Every project is unique and pricing depends on scope, complexity, and timeline. If asked about pricing, say something like:

- "Every project is different, so we tailor our pricing to exactly what you need. The best way to get a clear picture is to book a free consultation where we can discuss your project in detail."
- "I'd love to give you a number, but it really depends on the scope. Let's set up a quick call so Gabriele can walk you through what's realistic for your budget."

Always redirect pricing questions toward booking a consultation.

---

## Booking a Consultation

When someone is interested or wants to learn more, guide them toward booking a free consultation:

- "Would you like to book a free consultation? Gabriele can walk you through the process and give you a clear idea of timeline and investment."
- "The easiest next step is a quick 15-minute consultation — no commitment, just a conversation about your project."
- Direct them to use the **"Build your site"** button on our website, or the **"Book a call"** link on the About page.

---

## Conversation Guidelines

- **Be concise.** This is a voice call. Keep answers to 2–3 sentences when possible.
- **Be enthusiastic about design** — you genuinely believe a great website changes everything for a business.
- **Never discuss specific prices.** Always redirect to a consultation.
- **Always offer a next step.** Don't end a topic without suggesting booking a consultation or exploring the website.
- **If you don't know something,** say: "That's a great question — let me have Gabriele follow up with you directly on that."
- **Handle objections gracefully:**
  - "Too expensive" → "We work with a range of budgets. A consultation is free and Gabriele can find the right approach for what you need."
  - "I'll think about it" → "Totally! Feel free to check out our showcase on the site, and whenever you're ready, the consultation is always free."
  - "Can you do X?" → If unsure, say yes enthusiastically and suggest discussing details in a consultation.
- **Tone:** Confident, creative, approachable. Think design studio, not corporate call center.
`;

const workletCode = `
class PCMProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
  }

  process(inputs, outputs, parameters) {
    const input = inputs[0];
    if (input.length > 0) {
      const channelData = input[0];
      if (channelData.length > 0) {
        this.port.postMessage(channelData);
      }
    }
    return true;
  }
}

registerProcessor('pcm-processor', PCMProcessor);
`;

function floatTo16BitPCM(float32Array: Float32Array) {
  const buffer = new ArrayBuffer(float32Array.length * 2);
  const view = new DataView(buffer);
  let offset = 0;
  for (let i = 0; i < float32Array.length; i++, offset += 2) {
    const s = Math.max(-1, Math.min(1, float32Array[i]));
    view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
  }
  return buffer;
}

function base64Encode(buffer: ArrayBuffer) {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

export function useLiveAudio() {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const sessionRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const playbackContextRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const activeSourcesRef = useRef<AudioBufferSourceNode[]>([]);
  const nextStartTimeRef = useRef<number>(0);
  const speakingTimeoutRef = useRef<number | null>(null);

  const handleInterruption = useCallback(() => {
    activeSourcesRef.current.forEach((source) => {
      try {
        source.stop();
      } catch (_) {}
    });
    activeSourcesRef.current = [];
    if (playbackContextRef.current) {
      nextStartTimeRef.current = playbackContextRef.current.currentTime;
    }
    setIsSpeaking(false);
  }, []);

  const playPCM = useCallback((base64Data: string) => {
    const context = playbackContextRef.current;
    if (!context) return;

    const binaryString = atob(base64Data);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    const int16Array = new Int16Array(bytes.buffer);
    const float32Array = new Float32Array(int16Array.length);
    for (let i = 0; i < int16Array.length; i++) {
      float32Array[i] = int16Array[i] / 32768.0;
    }

    const audioBuffer = context.createBuffer(1, float32Array.length, 24000);
    audioBuffer.getChannelData(0).set(float32Array);

    const source = context.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(context.destination);

    const startTime = Math.max(context.currentTime, nextStartTimeRef.current);
    source.start(startTime);

    activeSourcesRef.current.push(source);

    setIsSpeaking(true);
    if (speakingTimeoutRef.current) {
      window.clearTimeout(speakingTimeoutRef.current);
    }
    speakingTimeoutRef.current = window.setTimeout(() => {
      setIsSpeaking(false);
    }, (startTime - context.currentTime + audioBuffer.duration) * 1000);

    source.onended = () => {
      activeSourcesRef.current = activeSourcesRef.current.filter(
        (s) => s !== source
      );
    };

    nextStartTimeRef.current = startTime + audioBuffer.duration;
  }, []);

  const connect = useCallback(async () => {
    try {
      setIsConnecting(true);
      setError(null);

      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

      playbackContextRef.current = new AudioContext({ sampleRate: 24000 });
      if (playbackContextRef.current.state === "suspended") {
        await playbackContextRef.current.resume();
      }
      nextStartTimeRef.current = playbackContextRef.current.currentTime;

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      audioContextRef.current = new AudioContext({ sampleRate: 16000 });
      if (audioContextRef.current.state === "suspended") {
        await audioContextRef.current.resume();
      }
      const source = audioContextRef.current.createMediaStreamSource(stream);

      const blob = new Blob([workletCode], { type: "application/javascript" });
      const workletUrl = URL.createObjectURL(blob);
      await audioContextRef.current.audioWorklet.addModule(workletUrl);

      const processor = new AudioWorkletNode(
        audioContextRef.current,
        "pcm-processor"
      );
      source.connect(processor);
      processor.connect(audioContextRef.current.destination);

      const sessionPromise = ai.live.connect({
        model: "gemini-2.5-flash-native-audio-preview-09-2025",
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: "Zephyr" } },
          },
          systemInstruction: SYSTEM_INSTRUCTION,
        },
        callbacks: {
          onopen: () => {
            setIsConnected(true);
            setIsConnecting(false);

            processor.port.onmessage = (e) => {
              const float32Array = e.data as Float32Array;
              const pcmBuffer = floatTo16BitPCM(float32Array);
              const base64Data = base64Encode(pcmBuffer);

              sessionPromise.then((session) => {
                session.sendRealtimeInput({
                  media: {
                    data: base64Data,
                    mimeType: "audio/pcm;rate=16000",
                  },
                });
              });
            };
          },
          onmessage: async (message: LiveServerMessage) => {
            const base64Audio =
              message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (base64Audio) {
              playPCM(base64Audio);
            }
            if (message.serverContent?.interrupted) {
              handleInterruption();
            }
          },
          onclose: () => {
            disconnect();
          },
          onerror: (e) => {
            console.error("Live API Error:", e);
            setError("Connection error occurred.");
            disconnect();
          },
        },
      });

      sessionRef.current = await sessionPromise;
    } catch (err: any) {
      console.error("Failed to connect:", err);
      setError(err.message || "Failed to connect to audio service");
      setIsConnecting(false);
      disconnect();
    }
  }, [handleInterruption, playPCM]);

  const disconnect = useCallback(() => {
    if (sessionRef.current) {
      try {
        sessionRef.current.close();
      } catch (_) {}
      sessionRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    if (playbackContextRef.current) {
      playbackContextRef.current.close();
      playbackContextRef.current = null;
    }
    if (speakingTimeoutRef.current) {
      window.clearTimeout(speakingTimeoutRef.current);
    }
    setIsConnected(false);
    setIsConnecting(false);
    setIsSpeaking(false);
  }, []);

  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [disconnect]);

  return {
    isConnected,
    isConnecting,
    isSpeaking,
    error,
    connect,
    disconnect,
  };
}
