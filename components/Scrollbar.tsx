"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const sections = [
  { id: "home", label: "Home" },
  { id: "projects", label: "Projects" },
  { id: "about", label: "About" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export default function CustomScrollbar() {
  const [isNear, setIsNear] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [thumbHeight, setThumbHeight] = useState(80);
  const [activeSection, setActiveSection] = useState(0);

  /*
   * Actual scrollbar position.
   *
   * This follows the page during normal scrolling.
   */
  const scrollThumbY = useMotionValue(0);

  /*
   * Smooth version of the scrollbar position.
   */
  const thumbY = useSpring(scrollThumbY, {
    stiffness: 500,
    damping: 40,
    mass: 0.25,
  });

  /*
   * Temporary visual position while dragging.
   *
   * IMPORTANT:
   * This does NOT scroll the page.
   */
  const dragThumbY = useMotionValue(0);

  const dragStartY = useRef(0);
  const dragStartThumbY = useRef(0);

  /*
   * Keep track of the section that was active
   * when the drag started.
   */
  const dragStartSection = useRef(0);

  /* ---------------------------------------------------------
     Get scrollbar metrics
  --------------------------------------------------------- */

  const getMetrics = () => {
    const viewportHeight = window.innerHeight;

    const documentHeight =
      document.documentElement.scrollHeight;

    const height = Math.max(
      50,
      (viewportHeight / documentHeight) *
        viewportHeight
    );

    return {
      viewportHeight,
      documentHeight,
      thumbHeight: height,
      maxThumbY: Math.max(
        0,
        viewportHeight - height
      ),
      maxScroll: Math.max(
        0,
        documentHeight - viewportHeight
      ),
    };
  };

  /* ---------------------------------------------------------
     Find which section is currently visible
  --------------------------------------------------------- */

  const getCurrentSection = () => {
    const viewportMiddle =
      window.scrollY + window.innerHeight * 0.35;

    let closestIndex = 0;
    let closestDistance = Infinity;

    sections.forEach((section, index) => {
      const element =
        document.getElementById(section.id);

      if (!element) return;

      const top =
        element.getBoundingClientRect().top +
        window.scrollY;

      const distance = Math.abs(
        top - viewportMiddle
      );

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    return closestIndex;
  };

  /* ---------------------------------------------------------
     Update scrollbar from actual page scroll
  --------------------------------------------------------- */

  useEffect(() => {
    const update = () => {
      /*
       * While dragging, DO NOT overwrite the
       * temporary thumb position.
       */
      if (isDragging) return;

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

      const y = progress * maxThumbY;

      scrollThumbY.set(y);

      /*
       * Keep the current section synchronized
       * with normal scrolling.
       */
      setActiveSection(
        getCurrentSection()
      );
    };

    update();

    window.addEventListener(
      "scroll",
      update,
      { passive: true }
    );

    window.addEventListener(
      "resize",
      update
    );

    return () => {
      window.removeEventListener(
        "scroll",
        update
      );

      window.removeEventListener(
        "resize",
        update
      );
    };
  }, [isDragging, scrollThumbY]);

  /* ---------------------------------------------------------
     Mouse proximity
  --------------------------------------------------------- */

  useEffect(() => {
    const handleMouseMove = (
      e: MouseEvent
    ) => {
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

  /* ---------------------------------------------------------
     Start drag
  --------------------------------------------------------- */

  const handlePointerDown = (
    e: React.PointerEvent<HTMLDivElement>
  ) => {
    e.preventDefault();

    const {
      maxThumbY,
    } = getMetrics();

    /*
     * Determine the section we are currently on.
     *
     * This becomes the DEFAULT selected option.
     */
    const currentSection =
      getCurrentSection();

    setActiveSection(currentSection);

    dragStartSection.current =
      currentSection;

    /*
     * Remember where the scrollbar currently is.
     */
    const currentThumbY =
      scrollThumbY.get();

    dragStartY.current =
      e.clientY;

    dragStartThumbY.current =
      currentThumbY;

    /*
     * Start the temporary thumb at
     * its actual position.
     */
    dragThumbY.set(
      currentThumbY
    );

    setIsDragging(true);

    e.currentTarget.setPointerCapture(
      e.pointerId
    );
  };

  /* ---------------------------------------------------------
     Drag
     
     PAGE DOES NOT SCROLL HERE.
  --------------------------------------------------------- */

  const handlePointerMove = (
    e: React.PointerEvent<HTMLDivElement>
  ) => {
    if (!isDragging) return;

    const {
      maxThumbY,
    } = getMetrics();

    /*
     * How far the finger/mouse has moved.
     */
    const delta =
      e.clientY -
      dragStartY.current;

    /*
     * Move the VISUAL scrollbar.
     *
     * The page is untouched.
     */
    const nextThumbY = Math.max(
      0,
      Math.min(
        maxThumbY,
        dragStartThumbY.current +
          delta
      )
    );

    dragThumbY.set(
      nextThumbY
    );

    /*
     * Convert thumb movement into
     * section selection.
     */
    const progress =
      maxThumbY > 0
        ? nextThumbY / maxThumbY
        : 0;

    const nextSection = Math.round(
      progress *
        (sections.length - 1)
    );

    setActiveSection(
      Math.max(
        0,
        Math.min(
          sections.length - 1,
          nextSection
        )
      )
    );
  };

  /* ---------------------------------------------------------
     Release
     
     NOW the page moves.
  --------------------------------------------------------- */

  const handlePointerUp = (
    e: React.PointerEvent<HTMLDivElement>
  ) => {
    if (!isDragging) return;

    setIsDragging(false);

    const selected =
      sections[activeSection];

    const element =
      document.getElementById(
        selected.id
      );

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    /*
     * Reset actual scrollbar position after
     * the smooth scroll begins.
     */
    requestAnimationFrame(() => {
      const {
        maxThumbY,
        maxScroll,
      } = getMetrics();

      const target =
        element
          ? element.getBoundingClientRect()
              .top +
            window.scrollY
          : window.scrollY;

      const progress =
        maxScroll > 0
          ? Math.max(
              0,
              Math.min(
                1,
                target / maxScroll
              )
            )
          : 0;

      scrollThumbY.set(
        progress * maxThumbY
      );
    });

    try {
      e.currentTarget.releasePointerCapture(
        e.pointerId
      );
    } catch {}
  };

  /* ---------------------------------------------------------
     Cancel drag
  --------------------------------------------------------- */

  const handlePointerCancel = (
    e: React.PointerEvent<HTMLDivElement>
  ) => {
    setIsDragging(false);

    /*
     * Return thumb to its actual page position.
     */
    dragThumbY.set(
      scrollThumbY.get()
    );

    try {
      e.currentTarget.releasePointerCapture(
        e.pointerId
      );
    } catch {}
  };

  const expanded =
    isNear || isDragging;

  return (
    <>
      {/* =====================================================
          SECTION NAVIGATION
      ===================================================== */}

      <motion.div
        initial={false}
        animate={{
          opacity: isDragging ? 1 : 0,
          x: isDragging ? 0 : 25,
          pointerEvents: isDragging
            ? "auto"
            : "none",
        }}
        transition={{
          duration: 0.25,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          fixed
          right-10
          top-1/2
          z-[9998]
          -translate-y-1/2
          rounded-2xl
          border
          border-black/[0.08]
          bg-[var(--background)]/80
          px-10 py-10
          shadow-2xl
          backdrop-blur-xl
          dark:border-white/[0.08]
          dark:bg-black/50
        "
      >
        <div className="flex flex-col gap-1">
          {sections.map(
            (section, index) => {
              const active =
                activeSection === index;

              return (
                <div
  key={section.id}
  className={`
    group
    relative
    flex
    w-[140px]
    items-center
    gap-2.5
    py-4
    transition-all
    duration-300
  `}
>
  {/* Active indicator */}
  <span
    className={`
      h-1
      w-1
      shrink-0
      rounded-full
      transition-all
      duration-300
      ${
        active
          ? "scale-150 bg-black dark:bg-white"
          : "bg-black/20 dark:bg-white/20"
      }
    `}
  />

  {/* Section name */}
  <span
    className={`
      text-[10px]
      font-medium
      uppercase
      tracking-[0.16em]
      transition-all
      duration-300
      ${
        active
          ? "translate-x-0.5 text-black dark:text-white"
          : "text-black/35 dark:text-white/35"
      }
    `}
  >
    {section.label}
  </span>

  {/* Number */}
  <span
    className={`
      ml-auto
      font-mono
      text-[8px]
      tracking-normal
      transition-all
      duration-300
      ${
        active
          ? "text-black/45 dark:text-white/45"
          : "text-black/15 dark:text-white/15"
      }
    `}
  >
    {String(index + 1).padStart(2, "0")}
  </span>
</div>
              );
            }
          )}
        </div>
      </motion.div>

      {/* =====================================================
          SUBTLE RIGHT OVERLAY
      ===================================================== */}

      <motion.div
        initial={false}
        animate={{
          opacity: isDragging
            ? 1
            : 0,
          pointerEvents: isDragging
            ? "auto"
            : "none",
        }}
        transition={{
          duration: 0.25,
        }}
        className="
          fixed
          inset-0
          z-[9990]
          bg-[var(--foreground)]/70
          backdrop-blur-[1px]
          dark:bg-black/[0.025]
        "
      />

      {/* =====================================================
          CUSTOM SCROLLBAR
      ===================================================== */}

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
            width:
              expanded ? 8 : 4,
            opacity:
              expanded ? 1 : 0.3,
          }}
          transition={{
            duration: 0.25,
            ease: [
              0.22,
              1,
              0.36,
              1,
            ],
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

        {/* =================================================
            DRAG THUMB
        ================================================= */}

        <motion.div
          style={{
            y: isDragging
              ? dragThumbY
              : thumbY,

            height:
              thumbHeight,
          }}
          animate={{
            width:
              expanded ? 8 : 4,
            opacity:
              expanded ? 1 : 0.65,
          }}
          transition={{
            width: {
              duration: 0.2,
            },
            opacity: {
              duration: 0.2,
            },
          }}
          onPointerDown={
            handlePointerDown
          }
          onPointerMove={
            handlePointerMove
          }
          onPointerUp={
            handlePointerUp
          }
          onPointerCancel={
            handlePointerCancel
          }
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
    </>
  );
}

// "use client";

// import { motion, useMotionValue, useSpring } from "framer-motion";
// import { useEffect, useRef, useState } from "react";

// export default function CustomScrollbar() {
//   const [isNear, setIsNear] = useState(false);
//   const [isDragging, setIsDragging] = useState(false);
//   const [thumbHeight, setThumbHeight] = useState(80);

//   const targetY = useMotionValue(0);

//   const thumbY = useSpring(targetY, {
//     stiffness: 300,
//     damping: 35,
//     mass: 0.35,
//   });

//   const dragStartY = useRef(0);
//   const dragStartScroll = useRef(0);
//   const targetScroll = useRef(0);
//   const animationFrame = useRef<number | null>(null);

//   const getMetrics = () => {
//     const viewportHeight = window.innerHeight;
//     const documentHeight = document.documentElement.scrollHeight;

//     const height = Math.max(
//       50,
//       (viewportHeight / documentHeight) * viewportHeight
//     );

//     return {
//       viewportHeight,
//       documentHeight,
//       thumbHeight: height,
//       maxThumbY: viewportHeight - height,
//       maxScroll: documentHeight - viewportHeight,
//     };
//   };

//   /* -----------------------------
//      Smooth page scrolling
//   ----------------------------- */

//   useEffect(() => {
//     const animate = () => {
//       const current = window.scrollY;
//       const target = targetScroll.current;

//       // Smooth interpolation
//       const next =
//         current + (target - current) * 0.15;

//       window.scrollTo(0, next);

//       animationFrame.current =
//         requestAnimationFrame(animate);
//     };

//     if (isDragging) {
//       animationFrame.current =
//         requestAnimationFrame(animate);
//     }

//     return () => {
//       if (animationFrame.current) {
//         cancelAnimationFrame(animationFrame.current);
//       }
//     };
//   }, [isDragging]);

//   /* -----------------------------
//      Update scrollbar
//   ----------------------------- */

//   useEffect(() => {
//     const update = () => {
//       const {
//         thumbHeight,
//         maxThumbY,
//         maxScroll,
//       } = getMetrics();

//       setThumbHeight(thumbHeight);

//       const progress =
//         maxScroll > 0
//           ? window.scrollY / maxScroll
//           : 0;

//       targetY.set(progress * maxThumbY);

//       if (!isDragging) {
//         targetScroll.current = window.scrollY;
//       }
//     };

//     update();

//     window.addEventListener("scroll", update, {
//       passive: true,
//     });

//     window.addEventListener("resize", update);

//     return () => {
//       window.removeEventListener("scroll", update);
//       window.removeEventListener("resize", update);
//     };
//   }, [targetY, isDragging]);

//   /* -----------------------------
//      Cursor proximity
//   ----------------------------- */

//   useEffect(() => {
//     const handleMouseMove = (e: MouseEvent) => {
//       const distance =
//         window.innerWidth - e.clientX;

//       setIsNear(distance < 45);
//     };

//     window.addEventListener(
//       "mousemove",
//       handleMouseMove
//     );

//     return () => {
//       window.removeEventListener(
//         "mousemove",
//         handleMouseMove
//       );
//     };
//   }, []);

//   /* -----------------------------
//      Start drag
//   ----------------------------- */

//   const handlePointerDown = (
//     e: React.PointerEvent<HTMLDivElement>
//   ) => {
//     e.preventDefault();

//     const metrics = getMetrics();

//     setIsDragging(true);

//     dragStartY.current = e.clientY;
//     dragStartScroll.current = window.scrollY;
//     targetScroll.current = window.scrollY;

//     e.currentTarget.setPointerCapture(e.pointerId);
//   };

//   /* -----------------------------
//      Drag
//   ----------------------------- */

//   const handlePointerMove = (
//     e: React.PointerEvent<HTMLDivElement>
//   ) => {
//     if (!isDragging) return;

//     const {
//       maxThumbY,
//       maxScroll,
//     } = getMetrics();

//     if (maxThumbY <= 0) return;

//     const delta =
//       e.clientY - dragStartY.current;

//     const scrollDelta =
//       (delta / maxThumbY) * maxScroll;

//     const nextScroll =
//       dragStartScroll.current + scrollDelta;

//     targetScroll.current = Math.max(
//       0,
//       Math.min(maxScroll, nextScroll)
//     );
//   };

//   /* -----------------------------
//      Stop drag
//   ----------------------------- */

//   const handlePointerUp = (
//     e: React.PointerEvent<HTMLDivElement>
//   ) => {
//     setIsDragging(false);

//     try {
//       e.currentTarget.releasePointerCapture(
//         e.pointerId
//       );
//     } catch {}
//   };

//   const expanded =
//     isNear || isDragging;

//   return (
//     <div
//       className="
//         fixed
//         right-0
//         top-0
//         z-[9999]
//         h-screen
//         w-12
//         pointer-events-none
//       "
//     >
//       {/* Track */}
//       <motion.div
//         animate={{
//           width: expanded ? 8 : 4,
//           opacity: expanded ? 1 : 0.3,
//         }}
//         transition={{
//           duration: 0.25,
//           ease: [0.22, 1, 0.36, 1],
//         }}
//         className="
//           absolute
//           right-1
//           top-0
//           h-full
//           rounded-full
//           bg-black/10
//           dark:bg-white/10
//         "
//       />

//       {/* Thumb */}
//       <motion.div
//         style={{
//           y: thumbY,
//           height: thumbHeight,
//         }}
//         animate={{
//           width: expanded ? 8 : 4,
//           opacity: expanded ? 1 : 0.65,
//         }}
//         transition={{
//           width: {
//             duration: 0.2,
//           },
//           opacity: {
//             duration: 0.2,
//           },
//         }}
//         onPointerDown={handlePointerDown}
//         onPointerMove={handlePointerMove}
//         onPointerUp={handlePointerUp}
//         onPointerCancel={handlePointerUp}
//         className={`
//           absolute
//           right-1
//           top-0
//           rounded-full
//           bg-black
//           dark:bg-white
//           pointer-events-auto
//           touch-none
//           select-none
//           ${
//             isDragging
//               ? "cursor-grabbing"
//               : "cursor-grab"
//           }
//         `}
//       />
//     </div>
//   );
// }
















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



