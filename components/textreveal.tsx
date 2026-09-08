"use client";

import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  useMemo,
  useRef,
  type ReactNode,
  type RefObject,
} from "react";

interface ScrollRevealProps {
  children: ReactNode;

  scrollContainerRef?: RefObject<HTMLElement | null>;

  enableBlur?: boolean;
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;

  containerClassName?: string;
  textClassName?: string;

  /**
   * Scroll progress range.
   *
   * Example:
   * ["start 80%", "start 20%"]
   */
  start?: string;
  end?: string;
}

export default function ScrollReveal({
  children,
  scrollContainerRef,

  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,

  containerClassName = "",
  textClassName = "",

  start = "start 80%",
  end = "start 20%",
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLHeadingElement>(null);

  const words = useMemo(() => {
    const text = typeof children === "string" ? children : "";

    return text.split(/(\s+)/).map((word, index) => {
      if (/^\s+$/.test(word)) {
        return {
          text: word,
          isSpace: true,
          index,
        };
      }

      return {
        text: word,
        isSpace: false,
        index,
      };
    });
  }, [children]);

  /*
   * Track the container's position relative
   * to the viewport / custom scroll container.
   */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    container: scrollContainerRef,
    offset: ["start 100%", "start 80%"],
  });

  /*
   * Whole container rotation.
   *
   * 3deg → 0deg
   */
  const rotation = useTransform(
    scrollYProgress,
    [0, 1],
    [baseRotation, 0]
  );

  return (
    <motion.div
      ref={containerRef}
      style={{
        rotate: rotation,
        transformOrigin: "0% 50%",
      }}
      className={`${containerClassName}`}
    >
      <p
        className={`${textClassName}`}
      >
        {words.map((word, index) => {
          if (word.isSpace) {
            return word.text;
          }

          /*
           * Give every word its own section
           * of the scroll progress.
           *
           * This creates the staggered effect.
           */
          const totalWords = words.filter((w) => !w.isSpace).length;

          const wordIndex = words
            .slice(0, index)
            .filter((w) => !w.isSpace).length;

          const startProgress =
            wordIndex / totalWords;

          const endProgress =
            Math.min(
              startProgress + 0.35,
              1
            );

          const opacity = useTransform(
            scrollYProgress,
            [startProgress, endProgress],
            [baseOpacity, 1]
          );

          const y = useTransform(
            scrollYProgress,
            [startProgress, endProgress],
            [20, 0]
          );

          const blur = useTransform(
            scrollYProgress,
            [startProgress, endProgress],
            enableBlur
              ? [`blur(${blurStrength}px)`, "blur(0px)"]
              : ["blur(0px)", "blur(0px)"]
          );

          return (
            <Word
              key={word.index}
              text={word.text}
              opacity={opacity}
              y={y}
              blur={blur}
            />
          );
        })}
      </p>
    </motion.div>
  );
}

interface WordProps {
  text: string;
  opacity: MotionValue<number>;
  y: MotionValue<number>;
  blur: MotionValue<string>;
}

function Word({
  text,
  opacity,
  y,
  blur,
}: WordProps) {
  return (
    <motion.span
      style={{
        opacity,
        y,
        filter: blur,
        willChange: "transform, opacity, filter",
      }}
      className="inline-block transition-all duration-500"
    >
      {text}
    </motion.span>
  );
}