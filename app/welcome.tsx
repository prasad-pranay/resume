"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import HoverWord from "@/components/hoverword";

interface WelcomeScreenProps {
  onComplete?: () => void;
}

export default function WelcomeScreen({
  onComplete,
}: WelcomeScreenProps) {
  const [progress, setProgress] = useState(0);
  const [showScreen, setShowScreen] = useState(true);

  useEffect(() => {
    const start = performance.now();
    const duration = 2000;

    const animate = (time: number) => {
      const elapsed = time - start;
      const value = Math.min(elapsed / duration, 1);

      // Slightly smoother loading curve
      setProgress(value * 100);

      if (value < 1) {
        requestAnimationFrame(animate);
      } else {
        setTimeout(() => {
          setShowScreen(false);
          onComplete?.();
        }, 150);
      }
    };

    requestAnimationFrame(animate);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {showScreen && (
        <motion.div
        data-lenis-prevent
          initial={{ y: 0 }}
          exit={{
            y: "-100%",
            transition: {
              duration: 0.7,
              ease: [0.76, 0, 0.24, 1],
            },
          }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[var(--background)] overflow-hidden"
        >


          {/* Main content */}
          <div className="relative flex flex-col items-center">
            <div className="flex items-center">
              {/* Robot */}
              <motion.div
                initial={{
                  x: -30,
                  opacity: 0,
                  rotate: -4,
                }}
                animate={{
                  x: 0,
                  opacity: 1,
                  rotate: 0,
                }}
                transition={{
                  duration: 0.65,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative z-10 mr-[-4px] w-20 sm:w-24 xl:w-30"
              >
                {/* Replace with your robot asset */}
                <motion.img
                  src="/peakaboo.png"
                  alt=""
                  className="w-full select-none -translate-x-[50%] -translate-y-5 scale-100"
                  animate={{
                    y: [0, -3, 0],
                  }}
                  transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>

              {/* Content */}
              <div className="relative pl-5">
                {/* Coral hand-drawn arrow */}
                <motion.div
                  initial={{ opacity: 0, x: -8, y: 5 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{
                    delay: 0.25,
                    duration: 0.4,
                  }}
                  className="absolute top-0 left-0 -translate-y-[100%] -translate-x-10 text-[#ff5a3d] text-2xl -rotate-5"
                >
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 120" className="size-40">
  <g fill="none" stroke="#FF5733" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M 150,85 A 65,50 0 0,0 42,82" />
    <path d="M 42,55 L 42,82 L 72,90" />
  </g>
</svg>

                </motion.div>

                <motion.h1
                  initial={{
                    opacity: 0,
                    y: 12,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 0.18,
                    duration: 0.5,
                    ease: "easeOut",
                  }}
                  className="text-3xl sm:text-4xl text-[#11100e] indie -rotate-3 "
                >
                    <HoverWord text="Knock knock." className="tracking-wide font-bold" />
                </motion.h1>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.42, duration: 0.5 }}
                  className="mt-4"
                >
                  <p className="indie text-sm sm:text-[16px] -tracking-[.4px] font-light text-[var(--foreground)]/60">
                    Yep, it&apos;s you!
                  </p>

                  <p className="indie text-sm sm:text-[16px] -tracking-[.4px] font-light text-[var(--foreground)]/60">
                    Welcome to my corner of the internet.
                  </p>
                </motion.div>
              </div>
            </div>

            {/* Loading */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="mt-7 w-50"
            >
              {/* Progress line */}
              <div className="relative h-[4px] w-full overflow-hidden rounded-full bg-neutral-200">
                <motion.div
                  className="absolute left-0 top-0 h-full bg-[#171614] rounded-full"
                  style={{
                    width: `${progress}%`,
                  }}
                />
              </div>

              <div className="mt-3 flex flex-col items-center justify-between">
                <span className="text-[10px] tracking-[2px] indie font-bold text-neutral-600">
                  LOADING MY PORTFOLIO
                </span>
              </div>
            </motion.div>
          </div>
          <p className="text-[10px] text-neutral-600 indie font-bold absolute bottom-15">
                  {Math.round(progress)}%
                </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

