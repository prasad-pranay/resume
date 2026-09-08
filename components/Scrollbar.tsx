"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function CustomScrollbar() {
  const [isNear, setIsNear] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [thumbHeight, setThumbHeight] = useState(80);

  const targetY = useMotionValue(0);

  const thumbY = useSpring(targetY, {
    stiffness: 300,
    damping: 35,
    mass: 0.35,
  });

  const dragStartY = useRef(0);
  const dragStartScroll = useRef(0);
  const targetScroll = useRef(0);
  const animationFrame = useRef<number | null>(null);

  const getMetrics = () => {
    const viewportHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    const height = Math.max(
      50,
      (viewportHeight / documentHeight) * viewportHeight
    );

    return {
      viewportHeight,
      documentHeight,
      thumbHeight: height,
      maxThumbY: viewportHeight - height,
      maxScroll: documentHeight - viewportHeight,
    };
  };

  /* -----------------------------
     Smooth page scrolling
  ----------------------------- */

  useEffect(() => {
    const animate = () => {
      const current = window.scrollY;
      const target = targetScroll.current;

      // Smooth interpolation
      const next =
        current + (target - current) * 0.15;

      window.scrollTo(0, next);

      animationFrame.current =
        requestAnimationFrame(animate);
    };

    if (isDragging) {
      animationFrame.current =
        requestAnimationFrame(animate);
    }

    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, [isDragging]);

  /* -----------------------------
     Update scrollbar
  ----------------------------- */

  useEffect(() => {
    const update = () => {
      const {
        thumbHeight,
        maxThumbY,
        maxScroll,
      } = getMetrics();

      setThumbHeight(thumbHeight);

      const progress =
        maxScroll > 0
          ? window.scrollY / maxScroll
          : 0;

      targetY.set(progress * maxThumbY);

      if (!isDragging) {
        targetScroll.current = window.scrollY;
      }
    };

    update();

    window.addEventListener("scroll", update, {
      passive: true,
    });

    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [targetY, isDragging]);

  /* -----------------------------
     Cursor proximity
  ----------------------------- */

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const distance =
        window.innerWidth - e.clientX;

      setIsNear(distance < 45);
    };

    window.addEventListener(
      "mousemove",
      handleMouseMove
    );

    return () => {
      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );
    };
  }, []);

  /* -----------------------------
     Start drag
  ----------------------------- */

  const handlePointerDown = (
    e: React.PointerEvent<HTMLDivElement>
  ) => {
    e.preventDefault();

    const metrics = getMetrics();

    setIsDragging(true);

    dragStartY.current = e.clientY;
    dragStartScroll.current = window.scrollY;
    targetScroll.current = window.scrollY;

    e.currentTarget.setPointerCapture(e.pointerId);
  };

  /* -----------------------------
     Drag
  ----------------------------- */

  const handlePointerMove = (
    e: React.PointerEvent<HTMLDivElement>
  ) => {
    if (!isDragging) return;

    const {
      maxThumbY,
      maxScroll,
    } = getMetrics();

    if (maxThumbY <= 0) return;

    const delta =
      e.clientY - dragStartY.current;

    const scrollDelta =
      (delta / maxThumbY) * maxScroll;

    const nextScroll =
      dragStartScroll.current + scrollDelta;

    targetScroll.current = Math.max(
      0,
      Math.min(maxScroll, nextScroll)
    );
  };

  /* -----------------------------
     Stop drag
  ----------------------------- */

  const handlePointerUp = (
    e: React.PointerEvent<HTMLDivElement>
  ) => {
    setIsDragging(false);

    try {
      e.currentTarget.releasePointerCapture(
        e.pointerId
      );
    } catch {}
  };

  const expanded =
    isNear || isDragging;

  return (
    <div
      className="
        fixed
        right-0
        top-0
        z-[9999]
        h-screen
        w-12
        pointer-events-none
      "
    >
      {/* Track */}
      <motion.div
        animate={{
          width: expanded ? 8 : 4,
          opacity: expanded ? 1 : 0.3,
        }}
        transition={{
          duration: 0.25,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          absolute
          right-1
          top-0
          h-full
          rounded-full
          bg-black/10
          dark:bg-white/10
        "
      />

      {/* Thumb */}
      <motion.div
        style={{
          y: thumbY,
          height: thumbHeight,
        }}
        animate={{
          width: expanded ? 8 : 4,
          opacity: expanded ? 1 : 0.65,
        }}
        transition={{
          width: {
            duration: 0.2,
          },
          opacity: {
            duration: 0.2,
          },
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className={`
          absolute
          right-1
          top-0
          rounded-full
          bg-black
          dark:bg-white
          pointer-events-auto
          touch-none
          select-none
          ${
            isDragging
              ? "cursor-grabbing"
              : "cursor-grab"
          }
        `}
      />
    </div>
  );
}
















// aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa

// "use client";

// import { motion, useMotionValue, useSpring } from "framer-motion";
// import { useEffect, useState } from "react";

// export default function CustomScrollbar() {
//   const [isNear, setIsNear] = useState(false);
//   const [isHovering, setIsHovering] = useState(false);
//   const [thumbHeight, setThumbHeight] = useState(80);

//   const rawY = useMotionValue(0);

//   const y = useSpring(rawY, {
//     stiffness: 180,
//     damping: 28,
//     mass: 0.4,
//   });

//   useEffect(() => {
//     const updateScrollbar = () => {
//       const scrollTop = window.scrollY;
//       const viewportHeight = window.innerHeight;
//       const documentHeight = document.documentElement.scrollHeight;

//       const trackHeight = viewportHeight;

//       // Calculate thumb height
//       const calculatedHeight = Math.max(
//         50,
//         (viewportHeight / documentHeight) * trackHeight
//       );

//       setThumbHeight(calculatedHeight);

//       // Calculate thumb position
//       const maxScroll = documentHeight - viewportHeight;
//       const maxThumbY = trackHeight - calculatedHeight;

//       const progress =
//         maxScroll > 0 ? scrollTop / maxScroll : 0;

//       rawY.set(progress * maxThumbY);
//     };

//     updateScrollbar();

//     window.addEventListener("scroll", updateScrollbar, {
//       passive: true,
//     });

//     window.addEventListener("resize", updateScrollbar);

//     return () => {
//       window.removeEventListener("scroll", updateScrollbar);
//       window.removeEventListener("resize", updateScrollbar);
//     };
//   }, [rawY]);

//   useEffect(() => {
//     const handleMouseMove = (e: MouseEvent) => {
//       const distanceFromRight = window.innerWidth - e.clientX;

//       // Near scrollbar
//       setIsNear(distanceFromRight < 45);
//     };

//     window.addEventListener("mousemove", handleMouseMove);

//     return () => {
//       window.removeEventListener("mousemove", handleMouseMove);
//     };
//   }, []);

//   const expanded = isHovering || isNear;

//   return (
//     <div
//       className="
//         fixed
//         top-0
//         right-0
//         h-screen
//         z-[9999]
//         pointer-events-none
//       "
//     >
//       {/* Track */}
//       <motion.div
//         animate={{
//           width: expanded ? 8 : 4,
//           opacity: expanded ? 1 : 0.55,
//         }}
//         transition={{
//           duration: 0.25,
//           ease: [0.22, 1, 0.36, 1],
//         }}
//         className="
//           absolute
//           right-2
//           top-0
//           h-full
//           rounded-full
//           bg-black/5
//           dark:bg-white/5
//         "
//       />

//       {/* Thumb */}
//       <motion.div
//         style={{
//           y,
//           height: thumbHeight,
//         }}
//         animate={{
//           width: expanded ? 8 : 4,
//           scaleX: expanded ? 1 : 0.9,
//           opacity: expanded ? 1 : 0.7,
//         }}
//         transition={{
//           width: {
//             duration: 0.25,
//             ease: [0.22, 1, 0.36, 1],
//           },
//           opacity: {
//             duration: 0.2,
//           },
//           scaleX: {
//             duration: 0.2,
//           },
//         }}
//         onMouseEnter={() => setIsHovering(true)}
//         onMouseLeave={() => setIsHovering(false)}
//         className="
//           absolute
//           right-2
//           top-0
//           rounded-full
//           pointer-events-auto
//           cursor-pointer
//           bg-black
//           dark:bg-white
//         "
//       />
//     </div>
//   );
// }



