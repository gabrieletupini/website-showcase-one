import { GoogleGenAI, LiveServerMessage, Modality, Type } from "@google/genai";
import { useCallback, useEffect, useRef, useState } from "react";

const CAL_USERNAME = "gabriele-tupini-da60rn";
const CAL_EVENT_SLUG = "15min";
const CAL_API_BASE = "https://api.cal.com/v2";

function buildSystemInstruction() {
  const callerTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const callerTime = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: callerTz,
  });
  const romeTime = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Rome",
  });
  const todayDate = new Date().toISOString().split("T")[0];

  return `Your name is **Sara**, and you are the AI voice assistant for **Tektree**, a premium web design and development agency. You are warm, professional, and confident — you speak like a creative director who genuinely loves great design. Keep responses concise and conversational since this is a voice call. Avoid long monologues.

---

## Opening — Ask Right Away

When the call starts, introduce yourself briefly and immediately ask what the caller needs. Example:

"Hi, I'm Sara from Tektree! Are you looking to chat about our services, or would you like to schedule a free consultation with Gabriele right away?"

- **If they want to talk / learn more:** Have a natural conversation about Tektree, answer their questions, and when they seem interested, offer to book.
- **If they want to schedule right away:** Jump straight into the intake questions below, then book.

---

## Timezone & Availability

- Tektree operates on **Rome, Italy timezone (CET/CEST)**.
- The current time in Rome is **${romeTime}**.
- The caller's timezone is **${callerTz}** and their local time is **${callerTime}**.
- Today's date is **${todayDate}**.
- If the caller asks about availability or meeting times, mention that the team works Rome hours (roughly 9 AM – 6 PM CET) and offer to book a call that works across both timezones.

---

## About Tektree

Tektree is a boutique web design agency that builds elite, high-performance websites for businesses, startups, and personal brands. We combine cutting-edge technology with design savviness to craft the websites of your dreams.

**Founded by:** Gabriele Tupini — a full-stack developer and designer with 5+ years of experience and 25+ websites delivered, hosting on AWS with 99.9% uptime.

**What we do:**
- Custom website design & development
- Landing pages and marketing sites
- E-commerce / online stores
- Portfolio and personal brand sites
- Blog and content platforms
- Web application development

**Tech stack:** React, TypeScript, Tailwind CSS, Next.js, Vite, Node.js, AWS, and more — we pick the right tools for each project.

**Website:** tektree.com
**LinkedIn:** linkedin.com/in/gabriele-tupini-76610a16b
**GitHub:** github.com/gabrieletupini

---

## Pricing Policy

**IMPORTANT: Never quote specific prices or price ranges.** Every project is unique and pricing depends on scope, complexity, and timeline. If asked about pricing, say something like:

- "Every project is different, so we tailor our pricing to exactly what you need. The best way to get a clear picture is to book a free consultation where we can discuss your project in detail."
- "I'd love to give you a number, but it really depends on the scope. Let's set up a quick call so Gabriele can walk you through what's realistic for your budget."

Always redirect pricing questions toward booking a consultation.

---

## Intake — Gather Info Before Booking

When the caller wants to book (either right away or after chatting), gather these details. Ask them naturally, one at a time:

1. **Name** — "What's your name?" (use it throughout the call)
2. **What they need** — "What kind of website are you looking for?" (e.g. portfolio, e-commerce, landing page, redesign, etc.)
3. **Their business / industry** — "What's your business about?"
4. **Timeline** — "Do you have a timeline in mind?"
5. **Budget range** — Do NOT ask directly. If they bring it up, redirect to the consultation.
6. **Email** — "And what's the best email to reach you at?" — **Read it back to them letter by letter to confirm.** Say: "Just to make sure I got that right — that's J-O-H-N at example dot com, correct?" This is critical because you'll show it on screen and it needs to be accurate.

Once you have at least their name, email, and what they need, move to booking.

---

## Booking a Consultation

You can **book a consultation directly for the caller** — no forms, no links, everything happens through this voice call. You have two tools:

### Step 1: Check available slots
Use \`get_available_slots\` to look up open time slots. Ask the caller when they'd prefer to meet (e.g. "Do you prefer this week or next week? Morning or afternoon?"), then call the function with the appropriate date range.

- Present 3–5 good options to the caller in their local time.
- Example: "I've got a few great options for you. How about Tuesday at 10 AM, Wednesday at 2 PM, or Thursday at 11 AM — your time?"

### Step 2: Book the slot
Once the caller picks a time, use \`book_consultation\` with their name, email, and the chosen time slot. This will show a **confirmation card on their screen** with the booking details.

**Before calling the function, briefly warn the caller:**
"Alright, I'm putting the booking details on your screen now — just double-check everything looks right, especially your email, and tap Confirm."

Then call the function. **After calling it, say NOTHING — just wait silently.** The system will automatically confirm the booking when they tap Confirm, and you will receive a success or failure response.

- **If the response says success:** Say enthusiastically: "You're all set! You'll get a confirmation email shortly. Gabriele is looking forward to chatting with you! Is there anything else I can help you with?"
- **If the response says failure or cancelled:** Say: "No worries! Would you like to try a different time, or is there anything else I can help with?"
- **Do NOT** repeat "check your details" or "make sure everything looks good" after the function is called — the card on screen already handles that.

### Important notes:
- **Always gather name and email before booking.**
- **Always spell back the email to confirm before booking.**
- The consultation is **free, 15 minutes** with Gabriele — no commitment.
- If the caller changes their mind about the time, just check slots again and rebook.
- If something goes wrong technically, say: "Hmm, looks like something went wrong on my end. No worries — you can also book directly at cal.com/gabriele-tupini-da60rn/15min, or I can have Gabriele reach out to you by email."

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
- **When wrapping up:** Summarize what you discussed and remind them that after ending the call they can also send their details from the screen.
`;
}

async function fetchAvailableSlots(
  startDate: string,
  endDate: string,
  timeZone: string
) {
  const params = new URLSearchParams({
    eventTypeSlug: CAL_EVENT_SLUG,
    "usernameList[]": CAL_USERNAME,
    start: startDate,
    end: endDate,
    timeZone,
  });

  const res = await fetch(`${CAL_API_BASE}/slots/available?${params}`, {
    headers: {
      "cal-api-version": "2024-09-04",
      Authorization: `Bearer ${process.env.CAL_API_KEY}`,
    },
  });

  if (!res.ok) {
    throw new Error(`Cal.com slots error: ${res.status}`);
  }

  const json = await res.json();
  return json.data; // { "2026-03-03": [{ start: "..." }, ...], ... }
}

async function createBooking(
  startTime: string,
  attendeeName: string,
  attendeeEmail: string,
  attendeeTimeZone: string
) {
  const res = await fetch(`${CAL_API_BASE}/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "cal-api-version": "2024-08-13",
      Authorization: `Bearer ${process.env.CAL_API_KEY}`,
    },
    body: JSON.stringify({
      start: startTime,
      eventTypeSlug: CAL_EVENT_SLUG,
      username: CAL_USERNAME,
      attendee: {
        name: attendeeName,
        email: attendeeEmail,
        timeZone: attendeeTimeZone,
      },
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Cal.com booking error: ${res.status} — ${text}`);
  }

  return await res.json();
}

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

export interface BookingData {
  name: string;
  email: string;
  startTime: string;
  timezone: string;
}

interface UseLiveAudioOptions {
  onBookConfirm?: (
    data: BookingData,
    respond: (result: { success: boolean; message: string }) => void
  ) => void;
}

export function useLiveAudio({ onBookConfirm }: UseLiveAudioOptions = {}) {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Use ref to avoid stale closure in Gemini session callbacks
  const onBookConfirmRef = useRef(onBookConfirm);
  onBookConfirmRef.current = onBookConfirm;

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

      const callerTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
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
          systemInstruction: buildSystemInstruction(),
          tools: [
            {
              functionDeclarations: [
                {
                  name: "get_available_slots",
                  description:
                    "Check available consultation time slots for a given date range. Call this when the caller wants to book and you need to offer them specific times.",
                  parameters: {
                    type: Type.OBJECT,
                    properties: {
                      start_date: {
                        type: Type.STRING,
                        description:
                          "Start date in YYYY-MM-DD format (e.g. 2026-03-03)",
                      },
                      end_date: {
                        type: Type.STRING,
                        description:
                          "End date in YYYY-MM-DD format, max 7 days from start",
                      },
                    },
                    required: ["start_date", "end_date"],
                  },
                },
                {
                  name: "book_consultation",
                  description:
                    "Book a specific consultation time slot. Shows a confirmation card on the caller's screen for them to verify and confirm. Call this after the caller picks a time from the available slots.",
                  parameters: {
                    type: Type.OBJECT,
                    properties: {
                      caller_name: {
                        type: Type.STRING,
                        description: "The caller's full name",
                      },
                      caller_email: {
                        type: Type.STRING,
                        description: "The caller's email address",
                      },
                      start_time: {
                        type: Type.STRING,
                        description:
                          "The selected slot start time in ISO 8601 format (must be one of the times returned by get_available_slots)",
                      },
                    },
                    required: [
                      "caller_name",
                      "caller_email",
                      "start_time",
                    ],
                  },
                },
              ],
            },
          ],
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
            // Handle function calls
            const toolCall = (message as any).toolCall;
            if (toolCall?.functionCalls) {
              for (const fc of toolCall.functionCalls) {
                // ── Get available slots ──
                if (fc.name === "get_available_slots") {
                  const args = fc.args || {};
                  try {
                    const slots = await fetchAvailableSlots(
                      args.start_date,
                      args.end_date,
                      callerTz
                    );

                    // Format slots nicely for Sara to read out
                    const formatted: Record<string, string[]> = {};
                    for (const [date, times] of Object.entries(
                      slots as Record<string, { start: string }[]>
                    )) {
                      const d = new Date(date + "T12:00:00Z");
                      const label = d.toLocaleDateString("en-US", {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                        timeZone: "UTC",
                      });
                      formatted[label] = times.map((t) => {
                        const dt = new Date(t.start);
                        return dt.toLocaleTimeString("en-US", {
                          hour: "numeric",
                          minute: "2-digit",
                          timeZone: callerTz,
                        });
                      });
                    }

                    const session = await sessionPromise;
                    session.sendToolResponse({
                      functionResponses: [
                        {
                          id: fc.id,
                          name: fc.name,
                          response: {
                            available_slots: formatted,
                            timezone: callerTz,
                            raw_slots: slots,
                          },
                        },
                      ],
                    });
                  } catch (err: any) {
                    console.error("Failed to fetch slots:", err);
                    const session = await sessionPromise;
                    session.sendToolResponse({
                      functionResponses: [
                        {
                          id: fc.id,
                          name: fc.name,
                          response: {
                            error:
                              "Failed to fetch available slots. Suggest the caller visit cal.com/gabriele-tupini-da60rn/15min directly.",
                          },
                        },
                      ],
                    });
                  }
                }

                // ── Book consultation ──
                if (fc.name === "book_consultation") {
                  const args = fc.args || {};
                  const bookingData: BookingData = {
                    name: args.caller_name || "",
                    email: args.caller_email || "",
                    startTime: args.start_time || "",
                    timezone: callerTz,
                  };

                  // Delegate to UI for confirmation — pass a respond callback
                  // that sends the tool response back to Gemini
                  const respondToGemini = async (result: {
                    success: boolean;
                    message: string;
                  }) => {
                    const session = await sessionPromise;
                    session.sendToolResponse({
                      functionResponses: [
                        {
                          id: fc.id,
                          name: fc.name,
                          response: result,
                        },
                      ],
                    });
                  };

                  if (onBookConfirmRef.current) {
                    onBookConfirmRef.current(bookingData, respondToGemini);
                  } else {
                    // No UI handler — try booking directly
                    try {
                      await createBooking(
                        bookingData.startTime,
                        bookingData.name,
                        bookingData.email,
                        bookingData.timezone
                      );
                      await respondToGemini({
                        success: true,
                        message: "Booking confirmed!",
                      });
                    } catch (err: any) {
                      await respondToGemini({
                        success: false,
                        message: err.message,
                      });
                    }
                  }
                }
              }
              return;
            }

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

export { createBooking };
