
"use client";

import { useEffect, useRef, useState } from "react";

const NUM_BARS = 14;
const SILENCE_DELAY = 1200;

// How loud the microphone needs to be
// before we consider it speech.
const SPEECH_THRESHOLD = 12;

/* =========================================
   Speech Recognition Types
========================================= */

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

interface SpeechRecognitionInstance {
  continuous: boolean;
  interimResults: boolean;
  lang: string;

  start(): void;
  stop(): void;
  abort(): void;

  onresult:
    | ((event: SpeechRecognitionEvent) => void)
    | null;

  onend: (() => void) | null;

  onerror:
    | ((event: SpeechRecognitionErrorEvent) => void)
    | null;
}

interface SpeechRecognitionConstructor {
  new (): SpeechRecognitionInstance;
}

declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  }
}

/* =========================================
   Props
========================================= */

interface VoiceInputProps {
  setText: React.Dispatch<React.SetStateAction<string>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

/* =========================================
   Component
========================================= */

export default function VoiceInput({
  setText,
  setOpen,
}: VoiceInputProps) {
  const [transcript, setTranscript] = useState("");

  const [bars, setBars] = useState<number[]>(
    Array(NUM_BARS).fill(6)
  );

  /* =========================================
     Refs
  ========================================= */

  const recognitionRef =
    useRef<SpeechRecognitionInstance | null>(null);

  const streamRef =
    useRef<MediaStream | null>(null);

  const audioContextRef =
    useRef<AudioContext | null>(null);

  const analyserRef =
    useRef<AnalyserNode | null>(null);

  const animationRef =
    useRef<number | null>(null);

  const silenceTimerRef =
    useRef<ReturnType<typeof setTimeout> | null>(
      null
    );

  const hasSpokenRef = useRef(false);

  const closingRef = useRef(false);

  const mountedRef = useRef(true);

  /* =========================================
     Close everything
  ========================================= */

  const closeVoiceInput = () => {
    if (closingRef.current) return;

    closingRef.current = true;

    /* Clear silence timer */

    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);

      silenceTimerRef.current = null;
    }

    /* Stop speech recognition */

    try {
      recognitionRef.current?.stop();
    } catch {}

    /* Stop microphone */

    streamRef.current
      ?.getTracks()
      .forEach((track) => {
        track.stop();
      });

    /* Stop animation */

    if (animationRef.current !== null) {
      cancelAnimationFrame(
        animationRef.current
      );

      animationRef.current = null;
    }

    /* Close audio context */

    if (
      audioContextRef.current &&
      audioContextRef.current.state !== "closed"
    ) {
      audioContextRef.current.close();
    }

    /* Close component */

    setOpen(false);
  };

  /* =========================================
     Start listening
  ========================================= */

  useEffect(() => {
    mountedRef.current = true;

    const startListening = async () => {
      /* -----------------------------
         Check browser support
      ----------------------------- */

      const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;

      if (!SpeechRecognition) {
        console.error(
          "Speech Recognition is not supported in this browser."
        );

        setOpen(false);
        return;
      }

      try {
         /* =============================
     Check microphone support
  ============================= */

  if (
    !navigator.mediaDevices ||
    !navigator.mediaDevices.getUserMedia
  ) {
    console.error(
      "Microphone access is not supported in this browser or context."
    );

    setOpen(false);
    return;
  }
  
        /* =============================
           Get microphone
        ============================= */

        const stream =
          await navigator.mediaDevices.getUserMedia({
            audio: {
              echoCancellation: true,
              noiseSuppression: true,
              autoGainControl: true,
            },
          });

        if (!mountedRef.current) {
          stream
            .getTracks()
            .forEach((track) => track.stop());

          return;
        }

        streamRef.current = stream;

        /* =============================
           Audio Context
        ============================= */

        const audioContext =
          new AudioContext();

        audioContextRef.current =
          audioContext;

        /*
         * Some browsers initially suspend
         * the AudioContext.
         */

        if (audioContext.state === "suspended") {
          await audioContext.resume();
        }

        /* =============================
           Analyser
        ============================= */

        const analyser =
          audioContext.createAnalyser();

        analyser.fftSize = 256;

        analyser.smoothingTimeConstant = 0.75;

        analyserRef.current = analyser;

        const source =
          audioContext.createMediaStreamSource(
            stream
          );

        source.connect(analyser);

        const frequencyData =
          new Uint8Array(
            analyser.frequencyBinCount
          );

        /* =============================
           Waveform + silence detection
        ============================= */

        const animate = () => {
          if (
            !mountedRef.current ||
            closingRef.current
          ) {
            return;
          }

          analyser.getByteFrequencyData(
            frequencyData
          );

          /*
           * Calculate average microphone
           * volume.
           */

          let total = 0;

          for (const value of frequencyData) {
            total += value;
          }

          const average =
            total / frequencyData.length;

          /*
           * ============================
           * WAVEFORM
           * ============================
           */

          const newBars = Array.from(
            { length: NUM_BARS },
            (_, index) => {
              const position =
                index / (NUM_BARS - 1);

              /*
               * Map each bar to a different
               * frequency.
               */

              const dataIndex = Math.floor(
                position *
                  frequencyData.length *
                  0.55
              );

              let value =
                frequencyData[dataIndex] || 0;

              /*
               * Center bars are slightly
               * stronger.
               */

              const distanceFromCenter =
                Math.abs(position - 0.5);

              const centerWeight =
                1 -
                distanceFromCenter * 0.6;

              value *= centerWeight;

              /*
               * Convert audio to height.
               */

              const height =
                6 + value * 0.55;

              return Math.min(
                58,
                Math.max(6, height)
              );
            }
          );

          setBars(newBars);

          /*
           * ============================
           * SILENCE DETECTION
           * ============================
           */

          if (
            average > SPEECH_THRESHOLD
          ) {
            /*
             * User is speaking.
             */

            hasSpokenRef.current = true;

            /*
             * Reset the silence timer.
             */

            if (silenceTimerRef.current) {
              clearTimeout(
                silenceTimerRef.current
              );

              silenceTimerRef.current = null;
            }
          } else if (
            hasSpokenRef.current &&
            !silenceTimerRef.current
          ) {
            /*
             * User has already spoken,
             * and microphone is now quiet.
             *
             * Start countdown.
             */

            silenceTimerRef.current =
              setTimeout(() => {
                if (
                  !closingRef.current
                ) {
                  /*
                   * Stop recognition.
                   *
                   * onend will close
                   * the component.
                   */

                  try {
                    recognitionRef.current?.stop();
                  } catch {}
                }
              }, SILENCE_DELAY);
          }

          animationRef.current =
            requestAnimationFrame(animate);
        };

        animate();

        /* =============================
           Speech Recognition
        ============================= */

        const recognition =
          new SpeechRecognition();

        /*
         * We don't rely on continuous=false
         * for silence detection anymore.
         *
         * Our analyser handles that.
         */

        recognition.continuous = true;

        recognition.interimResults = true;

        recognition.lang = "en-US";

        /* =============================
           Live transcript
        ============================= */

        recognition.onresult = (event) => {
          let result = "";

          for (
            let i = event.resultIndex;
            i < event.results.length;
            i++
          ) {
            result +=
              event.results[i][0].transcript;
          }

          result = result.trim();

          if (!result) return;

          setTranscript(result);

          /*
           * Update parent state live.
           */

          setText(result);
        };

        /* =============================
           Recognition ended
        ============================= */

        recognition.onend = () => {
          if (closingRef.current) {
            return;
          }

          /*
           * Speech has finished.
           *
           * Stop microphone and close.
           */

          closingRef.current = true;

          if (
            silenceTimerRef.current
          ) {
            clearTimeout(
              silenceTimerRef.current
            );

            silenceTimerRef.current =
              null;
          }

          streamRef.current
            ?.getTracks()
            .forEach((track) => {
              track.stop();
            });

          if (
            animationRef.current !==
            null
          ) {
            cancelAnimationFrame(
              animationRef.current
            );
          }

          if (
            audioContextRef.current &&
            audioContextRef.current
              .state !== "closed"
          ) {
            audioContextRef.current.close();
          }

          setOpen(false);
        };

        /* =============================
           Recognition error
        ============================= */

        recognition.onerror = (event) => {
          /*
           * "aborted" is expected when
           * the user presses Cancel.
           */

          if (
            event.error === "aborted"
          ) {
            return;
          }

          console.error(
            "Speech recognition error:",
            event.error
          );

          if (!closingRef.current) {
            closeVoiceInput();
          }
        };

        recognitionRef.current =
          recognition;

        /* =============================
           Start recognition
        ============================= */

        recognition.start();
      } catch (error) {
        console.error(
          "Could not access microphone:",
          error
        );

        setOpen(false);
      }
    };

    startListening();

    /* =================================
       Cleanup
    ================================= */

    return () => {

      mountedRef.current = false;

      closingRef.current = true;

      if (silenceTimerRef.current) {
        clearTimeout(
          silenceTimerRef.current
        );
      }

      if (animationRef.current !== null) {
        cancelAnimationFrame(
          animationRef.current
        );
      }

      try {
        recognitionRef.current?.abort();
      } catch {}

      streamRef.current
        ?.getTracks()
        .forEach((track) => {
          track.stop();
        });

      if (
        audioContextRef.current &&
        audioContextRef.current.state !==
          "closed"
      ) {
        audioContextRef.current.close();
      }
    };
  }, [setOpen, setText]);

  /* =========================================
     Cancel button
  ========================================= */

  const handleCancel = () => {
    closingRef.current = true;

    if (silenceTimerRef.current) {
      clearTimeout(
        silenceTimerRef.current
      );

      silenceTimerRef.current = null;
    }

    try {
      recognitionRef.current?.abort();
    } catch {}

    streamRef.current
      ?.getTracks()
      .forEach((track) => {
        track.stop();
      });

    if (animationRef.current !== null) {
      cancelAnimationFrame(
        animationRef.current
      );
    }

    if (
      audioContextRef.current &&
      audioContextRef.current.state !==
        "closed"
    ) {
      audioContextRef.current.close();
    }

    setOpen(false);
  };

  /* =========================================
     UI
  ========================================= */

  return (
  <div className="fixed inset-0 z-[14000] bg-[var(--background)]">
    <div className="relative flex min-h-dvh w-full flex-col px-6 py-6 sm:px-10 sm:py-8">

      {/* Top status */}
      <div className="flex items-center justify-between">

        <div className="flex items-center gap-3">

          <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-zinc-400">
            Rica
          </span>

          <span className="h-[3px] w-[3px] rounded-full bg-zinc-400" />

          <span className="text-[10px] uppercase tracking-[0.22em] text-zinc-400">
            Listening
          </span>

        </div>

        <button
          type="button"
          onClick={handleCancel}
          className="
            group
            flex
            items-center
            gap-2
            text-[10px]
            uppercase
            tracking-[0.2em]
            text-zinc-400
            transition-colors
            hover:text-zinc-900
            dark:hover:text-white
          "
        >
          <span className="hidden sm:block">
            Cancel
          </span>

          <span className="text-sm leading-none">
            ×
          </span>
        </button>

      </div>


      {/* Main content */}
      <div className="flex flex-1 flex-col items-center justify-center">

        {/* Transcript */}

        <div className="flex w-full max-w-4xl items-center justify-center">

          <p
            className={`
              text-center
              font-light
              tracking-[-0.045em]
              leading-[1.08]
              transition-all
              duration-500

              text-4xl
              sm:text-6xl
              lg:text-7xl

              ${
                transcript
                  ? "text-zinc-900 dark:text-white"
                  : "text-zinc-300 dark:text-zinc-700"
              }
            `}
          >
            {transcript || "I'm listening..."}
          </p>

        </div>


        {/* Waveform */}

        <div className="mt-14 flex h-12 items-center justify-center gap-[5px]">

          {bars.map((height, index) => (

            <div
              key={index}
              className="
                w-[2px]
                rounded-full
                bg-zinc-900
                dark:bg-white
                transition-[height,opacity]
                duration-100
                ease-out
              "
              style={{
                height: `${Math.max(
                  4,
                  height * 0.75
                )}px`,

                opacity:
                  0.2 +
                  (height / 58) * 0.8,
              }}
            />

          ))}

        </div>

      </div>


      {/* Bottom hint */}

      <div className="flex items-center justify-center pb-2">

        <p className="text-[10px] tracking-[0.12em] text-zinc-400">
          Speak naturally · I'll stop when you're done
        </p>

      </div>

    </div>
  </div>
);
}

//     <div className="fixed inset-0 z-[14000] flex h-dvh w-full items-center justify-center bg-[var(--background)]/10 backdrop-blur-lg">
//       <div className="relative flex h-full w-full max-w-2xl flex-col items-center justify-center px-6">

//         {/* =============================
//             LISTENING INDICATOR
//         ============================= */}

//         <div className="absolute top-8 flex items-center gap-2">
//           <span className="relative flex h-2 w-2">
//             <span className="absolute inset-0 animate-ping rounded-full bg-red-400 opacity-60" />

//             <span className="relative block h-2 w-2 rounded-full bg-red-500" />
//           </span>

//           <span className="text-sm font-medium text-gray-500">
//             Listening
//           </span>
//         </div>

//         {/* =============================
//             TRANSCRIPT
//         ============================= */}

//         <div className="mb-12 flex min-h-[100px] w-full max-w-xl items-center justify-center text-center">
//           <p
//             className={`
//               max-w-xl
//               text-2xl
//               font-medium
//               leading-relaxed
//               tracking-tight
//               transition-all
//               duration-300
//               sm:text-3xl
//               ${
//                 transcript
//                   ? "text-gray-900"
//                   : "text-gray-300"
//               }
//             `}
//           >
//             {transcript ||
//               "Start speaking..."}
//           </p>
//         </div>

//         {/* =============================
//             WAVEFORM
//         ============================= */}

//         <div className="flex h-16 items-center justify-center gap-1.5">
//           {bars.map((height, index) => (
//             <div
//               key={index}
//               className="
//                 w-2
//                 rounded-full
//                 bg-gray-900
//                 transition-[height,opacity]
//                 duration-75
//                 ease-out
//               "
//               style={{
//                 height: `${height}px`,
//                 opacity:
//                   0.4 +
//                   (height / 58) * 0.6,
//               }}
//             />
//           ))}
//         </div>

//         {/* =============================
//             CANCEL
//         ============================= */}

//         <button
//           type="button"
//           onClick={handleCancel}
//           className="
//             absolute
//             bottom-8
//             rounded-full
//             border
//             border-gray-200
//             px-5
//             py-2.5
//             text-sm
//             font-medium
//             text-gray-500
//             transition-all
//             duration-200
//             hover:border-gray-300
//             hover:bg-gray-50
//             hover:text-gray-900
//             active:scale-95
//           "
//         >
//           Cancel
//         </button>
//       </div>
//     </div>
//   );
// }
