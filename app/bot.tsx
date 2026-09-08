"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface Point {
  x: number;
  y: number;
}

interface WatcherBotProps {
  chatScreen: boolean;
  setChatScreen: React.Dispatch<React.SetStateAction<boolean>>;
}

/* ─────────────────────────────────────────────
   SETTINGS
───────────────────────────────────────────── */

const EYE_TRAVEL = 3.5;
const EYE_EASE = 0.14;

const WatcherBot = ({
  chatScreen,
  setChatScreen,
}: WatcherBotProps) => {
  const botRef = useRef<HTMLButtonElement>(null);

  const leftEyeRef = useRef<HTMLDivElement>(null);
  const rightEyeRef = useRef<HTMLDivElement>(null);

  const cursorRef = useRef<Point>({
    x: 0,
    y: 0,
  });

  const botCenterRef = useRef<Point>({
    x: 0,
    y: 0,
  });

  const eyePositionRef = useRef<Point>({
    x: 0,
    y: 0,
  });

  const [isHovered, setIsHovered] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);

  /* ─────────────────────────────────────────────
     UPDATE BOT POSITION
  ───────────────────────────────────────────── */

  const updateBotCenter = useCallback(() => {
    const bot = botRef.current;

    if (!bot) return;

    const rect = bot.getBoundingClientRect();

    botCenterRef.current = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };
  }, []);

  /* ─────────────────────────────────────────────
     CURSOR TRACKING
  ───────────────────────────────────────────── */

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      cursorRef.current = {
        x: event.clientX,
        y: event.clientY,
      };
    };

    window.addEventListener("mousemove", handleMouseMove, {
      passive: true,
    });

    updateBotCenter();

    const handleResize = () => {
      updateBotCenter();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, [updateBotCenter]);

  /* ─────────────────────────────────────────────
     EYE MOVEMENT
  ───────────────────────────────────────────── */

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) return;

    let animationFrame: number;

    const animate = () => {
      const cursor = cursorRef.current;
      const center = botCenterRef.current;

      const dx = cursor.x - center.x;
      const dy = cursor.y - center.y;

      const distance = Math.hypot(dx, dy);

      let directionX = 0;
      let directionY = 0;

      if (distance > 0.01) {
        directionX = dx / distance;
        directionY = dy / distance;
      }

      const strength = Math.min(distance / 180, 1);

      const targetX =
        directionX * EYE_TRAVEL * strength;

      const targetY =
        directionY * EYE_TRAVEL * strength;

      const eyePosition = eyePositionRef.current;

      eyePosition.x +=
        (targetX - eyePosition.x) * EYE_EASE;

      eyePosition.y +=
        (targetY - eyePosition.y) * EYE_EASE;

      const transform = `translate3d(
        ${eyePosition.x}px,
        ${eyePosition.y}px,
        0
      )`;

      if (leftEyeRef.current) {
        leftEyeRef.current.style.transform =
          transform;
      }

      if (rightEyeRef.current) {
        rightEyeRef.current.style.transform =
          transform;
      }

      animationFrame =
        requestAnimationFrame(animate);
    };

    animationFrame =
      requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  /* ─────────────────────────────────────────────
     BLINKING
  ───────────────────────────────────────────── */

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) return;

    let blinkTimer: ReturnType<typeof setTimeout>;
    let openTimer: ReturnType<typeof setTimeout>;

    const blink = () => {
      setIsBlinking(true);

      openTimer = setTimeout(() => {
        setIsBlinking(false);
      }, 130);

      const nextBlink =
        2800 + Math.random() * 3200;

      blinkTimer = setTimeout(
        blink,
        nextBlink
      );
    };

    blinkTimer = setTimeout(
      blink,
      2500 + Math.random() * 3000
    );

    return () => {
      clearTimeout(blinkTimer);
      clearTimeout(openTimer);
    };
  }, []);

  /* ─────────────────────────────────────────────
     RECALCULATE POSITION
     WHILE PAGE SCROLLS
  ───────────────────────────────────────────── */

  useEffect(() => {
    const handleScroll = () => {
      updateBotCenter();
    };

    window.addEventListener(
      "scroll",
      handleScroll,
      {
        passive: true,
      }
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, [updateBotCenter]);

  /* ─────────────────────────────────────────────
     OPEN CHAT
  ───────────────────────────────────────────── */

  const handleClick = () => {
    setChatScreen(true);
  };

  return (
    <div
    onClick={()=>{window.location.hash = "bot"}}
      className="
        fixed
        bottom-6
        right-6
        sm:bottom-8
        sm:right-8
        z-[100]
        pointer-events-none
      "
    >
      <div className="relative pointer-events-auto">
        {/* Hover label */}

        <AnimatePresence>
          {isHovered && !chatScreen && (
            <motion.div
              initial={{
                opacity: 0,
                x: 8,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              exit={{
                opacity: 0,
                x: 8,
              }}
              transition={{
                duration: 0.2,
              }}
              className="
                absolute
                right-[calc(100%+14px)]
                top-1/2
                -translate-y-1/2
                whitespace-nowrap
              "
            >
              <div
                className="
                  flex
                  items-center
                  gap-2
                  text-[11px]
                  tracking-[0.08em]
                  text-[var(--foreground)]/50
                "
              >
                <span>Ask Rica</span>

                <span className="text-[var(--foreground)]/30">
                  ↗
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Rica */}

        <motion.button
          ref={botRef}
          type="button"
          aria-label="Open chat with Rica"
          onClick={handleClick}
          onMouseEnter={() => {
            setIsHovered(true);
            updateBotCenter();
          }}
          onMouseLeave={() => {
            setIsHovered(false);
          }}
          initial={{
            opacity: 0,
            scale: 0.8,
          }}
          animate={{
            opacity: chatScreen ? 0 : 1,
            scale: chatScreen ? 0.85 : 1,
            y: [0, -3, 0],
          }}
          transition={{
            opacity: {
              duration: 0.35,
            },
            scale: {
              duration: 0.35,
            },
            y: {
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          whileHover={{
            scale: 1.08,
          }}
          whileTap={{
            scale: 0.94,
          }}
          className="
            group
            relative
            flex
            h-14
            w-14
            sm:h-[58px]
            sm:w-[58px]
            cursor-none target-hand
            items-center
            justify-center
            rounded-full
            bg-[var(--foreground)]
            text-[var(--background)]
            shadow-[0_12px_40px_rgba(0,0,0,0.10)]
            transition-shadow
            duration-300
            hover:shadow-[0_16px_50px_rgba(0,0,0,0.16)]
            focus:outline-none
          "
        >
          {/* Outer subtle ring */}

          <span
            className="
              absolute
              inset-[5px]
              rounded-full
              border
              border-[var(--background)]/10
              transition-transform
              duration-500
              group-hover:scale-[1.08]
            "
          />

          {/* Eyes */}

          <div
            className="
              relative
              z-10
              flex
              items-center
              gap-[9px]
            "
          >
            {/* Left eye */}

            <div
              ref={leftEyeRef}
              className="
                h-[7px]
                w-[7px]
                rounded-full
                bg-[var(--background)]
                will-change-transform
              "
              style={{
                transform: "translate3d(0,0,0)",
                transition: isBlinking
                  ? "transform 80ms ease"
                  : undefined,
                scale: isBlinking
                  ? "1 0.15"
                  : "1 1",
              }}
            />

            {/* Right eye */}

            <div
              ref={rightEyeRef}
              className="
                h-[7px]
                w-[7px]
                rounded-full
                bg-[var(--background)]
                will-change-transform
              "
              style={{
                transform: "translate3d(0,0,0)",
                transition: isBlinking
                  ? "transform 80ms ease"
                  : undefined,
                scale: isBlinking
                  ? "1 0.15"
                  : "1 1",
              }}
            />
          </div>
        </motion.button>
      </div>
    </div>
  );
};

export default WatcherBot;



// "use client";

// import Typewriter from "@/components/typewriter";
// import { AnimatePresence, motion } from "framer-motion";
// import React, {
//   useCallback,
//   useEffect,
//   useRef,
//   useState,
// } from "react";

// interface Point {
//   x: number;
//   y: number;
// }

// // ---------------------------------------------------------
// // TRACKING SETTINGS
// // ---------------------------------------------------------

// const EYE_TRAVEL = 5;
// const EYE_EASE = 0.2;

// const HEAD_MOVE_X = 5;
// const HEAD_MOVE_Y = 3;
// const HEAD_ROTATION = 4;
// const HEAD_EASE = 0.08;

// const BOT_FACE_Y = 0.32;

// // ---------------------------------------------------------
// // COMPONENT
// // ---------------------------------------------------------

// type Notification = {
//   id: string;
//   message: string;
// };

// interface WatcherBotProps {
//   chatScreen: boolean;
//   setChatScreen: React.Dispatch<React.SetStateAction<boolean>>;
//   // notification: Notification[];
//   // setNotification: React.Dispatch<React.SetStateAction<any>>;
// }
// const WatcherBot = ({chatScreen,setChatScreen}:WatcherBotProps) => {
//   const botRef = useRef<HTMLDivElement>(null);
//   const headRef = useRef<SVGGElement>(null);

//   const leftPupilRef = useRef<SVGCircleElement>(null);
//   const rightPupilRef = useRef<SVGCircleElement>(null);

//   // -------------------------------------------------------
//   // CURSOR
//   // -------------------------------------------------------

//   const cursorRef = useRef<Point>({
//     x: 0,
//     y: 0,
//   });

//   // -------------------------------------------------------
//   // CACHED BOT POSITION
//   // -------------------------------------------------------

//   const botCenterRef = useRef<Point>({
//     x: 0,
//     y: 0,
//   });

//   // -------------------------------------------------------
//   // PUPIL
//   // -------------------------------------------------------

//   const pupilRef = useRef<Point>({
//     x: 0,
//     y: 0,
//   });

//   // -------------------------------------------------------
//   // HEAD
//   // -------------------------------------------------------

//   const headRefState = useRef({
//     x: 0,
//     y: 0,
//     rotate: 0,
//   });

//   // -------------------------------------------------------
//   // HOVER
//   // -------------------------------------------------------

//   const [isHovered, setIsHovered] = useState(false);

//   // -------------------------------------------------------
//   // UPDATE BOT CENTER
//   // -------------------------------------------------------

//   const updateBotCenter = useCallback(() => {
//     const bot = botRef.current;

//     if (!bot) return;

//     const rect = bot.getBoundingClientRect();

//     botCenterRef.current.x =
//       rect.left + rect.width * 0.5;

//     botCenterRef.current.y =
//       rect.top + rect.height * BOT_FACE_Y;
//   }, []);

//   // -------------------------------------------------------
//   // MOUSE TRACKING
//   // -------------------------------------------------------

//   useEffect(() => {
//     const handleMouseMove = (event: MouseEvent) => {
//       cursorRef.current.x = event.clientX;
//       cursorRef.current.y = event.clientY;
//     };

//     window.addEventListener(
//       "mousemove",
//       handleMouseMove,
//       {
//         passive: true,
//       }
//     );

//     updateBotCenter();

//     let resizeFrame = 0;

//     const handleResize = () => {
//       cancelAnimationFrame(resizeFrame);

//       resizeFrame = requestAnimationFrame(() => {
//         updateBotCenter();
//       });
//     };

//     window.addEventListener(
//       "resize",
//       handleResize,
//       {
//         passive: true,
//       }
//     );

//     return () => {
//       window.removeEventListener(
//         "mousemove",
//         handleMouseMove
//       );

//       window.removeEventListener(
//         "resize",
//         handleResize
//       );

//       cancelAnimationFrame(resizeFrame);
//     };
//   }, [updateBotCenter]);

//   // -------------------------------------------------------
//   // ANIMATION LOOP
//   // -------------------------------------------------------

//   useEffect(() => {
//     const head = headRef.current;
//     const leftPupil = leftPupilRef.current;
//     const rightPupil = rightPupilRef.current;

//     if (!head || !leftPupil || !rightPupil) {
//       return;
//     }

//     // Respect reduced-motion preferences.
//     const reduceMotion = window.matchMedia(
//       "(prefers-reduced-motion: reduce)"
//     ).matches;

//     if (reduceMotion) {
//       return;
//     }

//     let animationFrame = 0;

//     const animate = () => {
//       const cursor = cursorRef.current;
//       const center = botCenterRef.current;

//       const dx = cursor.x - center.x;
//       const dy = cursor.y - center.y;

//       const distance = Math.hypot(dx, dy);

//       // -----------------------------------------------------
//       // NORMALIZED DIRECTION
//       // -----------------------------------------------------

//       let directionX = 0;
//       let directionY = 0;

//       if (distance > 0.01) {
//         directionX = dx / distance;
//         directionY = dy / distance;
//       }

//       // -----------------------------------------------------
//       // EYE TRACKING
//       // -----------------------------------------------------

//       const strength = Math.min(distance / 100, 1);

//       const targetPupilX =
//         directionX * EYE_TRAVEL * strength;

//       const targetPupilY =
//         directionY * EYE_TRAVEL * strength;

//       const pupil = pupilRef.current;

//       pupil.x +=
//         (targetPupilX - pupil.x) *
//         EYE_EASE;

//       pupil.y +=
//         (targetPupilY - pupil.y) *
//         EYE_EASE;

//       // Direct DOM updates.
//       // No React render required.

//       const pupilTransform = `
//         translate(${pupil.x}px, ${pupil.y}px)
//       `;

//       leftPupil.style.transform =
//         pupilTransform;

//       rightPupil.style.transform =
//         pupilTransform;

//       // -----------------------------------------------------
//       // HEAD TARGET
//       // -----------------------------------------------------

//       const headTargetX = Math.max(
//         -HEAD_MOVE_X,
//         Math.min(
//           HEAD_MOVE_X,
//           (dx / 180) * HEAD_MOVE_X
//         )
//       );

//       const headTargetY = Math.max(
//         -HEAD_MOVE_Y,
//         Math.min(
//           HEAD_MOVE_Y,
//           (dy / 220) * HEAD_MOVE_Y
//         )
//       );

//       const headTargetRotate = Math.max(
//         -HEAD_ROTATION,
//         Math.min(
//           HEAD_ROTATION,
//           (dx / 180) * HEAD_ROTATION
//         )
//       );

//       // -----------------------------------------------------
//       // SMOOTH HEAD MOVEMENT
//       // -----------------------------------------------------

//       const headState =
//         headRefState.current;

//       headState.x +=
//         (headTargetX - headState.x) *
//         HEAD_EASE;

//       headState.y +=
//         (headTargetY - headState.y) *
//         HEAD_EASE;

//       headState.rotate +=
//         (headTargetRotate - headState.rotate) *
//         HEAD_EASE;

//       // Direct SVG transform.
//       head.style.transform = `
//         translate3d(
//           ${headState.x}px,
//           ${headState.y}px,
//           0
//         )
//         rotate(${headState.rotate}deg)
//       `;

//       animationFrame =
//         requestAnimationFrame(animate);
//     };

//     animationFrame =
//       requestAnimationFrame(animate);

//     return () => {
//       cancelAnimationFrame(animationFrame);
//     };
//   }, []);

//   // -------------------------------------------------------
//   // BLINK
//   // -------------------------------------------------------

//   useEffect(() => {
//     const reduceMotion = window.matchMedia(
//       "(prefers-reduced-motion: reduce)"
//     ).matches;

//     if (reduceMotion) {
//       return;
//     }

//     let blinkTimer: ReturnType<typeof setTimeout>;
//     let closeTimer: ReturnType<typeof setTimeout>;

//     const blink = () => {
//       const bot = botRef.current;

//       if (!bot) {
//         return;
//       }

//       bot.dataset.blink = "true";

//       closeTimer = setTimeout(() => {
//         if (bot) {
//           delete bot.dataset.blink;
//         }
//       }, 120);

//       const nextDelay =
//         2600 + Math.random() * 3200;

//       blinkTimer = setTimeout(
//         blink,
//         nextDelay
//       );
//     };

//     blinkTimer = setTimeout(
//       blink,
//       2600 + Math.random() * 3200
//     );

//     return () => {
//       clearTimeout(blinkTimer);
//       clearTimeout(closeTimer);
//     };
//   }, []);

//   // -------------------------------------------------------
//   // HOVER
//   // -------------------------------------------------------

//   const handleMouseEnter = () => {
//     setIsHovered(true);
//   };

//   const handleMouseLeave = () => {
//     setIsHovered(false);
//   };


// const [heroShow, setHeroShow] = useState(true);
// const [scrollY, setScrollY] = useState(0);
// useEffect(() => {
//   const windowHeight = window.innerHeight / 2;

//   const handleScroll = () => {
//     const scrollY = window.scrollY;
//     setScrollY(window.scrollY);
//     setHeroShow(scrollY < windowHeight);
//   };

//   window.addEventListener("scroll", handleScroll, {
//     passive: true,
//   });

//   handleScroll();

//   return () => {
//     window.removeEventListener("scroll", handleScroll);
//   };
// }, []);
//   // -------------------------------------------------------
//   // RENDER
//   // -------------------------------------------------------

//   const [whichmsg, setWhichMsg] = useState(0);

// useEffect(() => {
//   const msgInterval = setInterval(() => {
//     if(!isHovered || heroShow){
//       setWhichMsg((prev) => (prev >= 3 ? 0 : prev + 1));
//     }
//   }, 5000);

//   return () => clearInterval(msgInterval);
// }, []);


  

//   return (
//     <div
//       style={{transform: heroShow ? `translateY(-${scrollY}px)` : "",transition: "transform 1500ms, bottom 1500ms, right 1500ms"}}
//       className={`
//         fixed
//         ${heroShow ? "bottom-5 right-1/2 translate-x-1/2 md:right-50 lg:bottom-20 lg:right-60 xl:bottom-1/4 xl:right-1/5" :"-bottom-[70px] right-5 sm:right-20"}
//         z-50
//         flex
//         flex-row-reverse
//         items-end
//         gap-3
//       `}
//     >
//       {/* ===================================================
//           ROBOT
//           =================================================== */}
//       <div
//       onClick={()=>setChatScreen(prev=>!prev)}
//         ref={botRef}
//         onMouseEnter={handleMouseEnter}
//         onMouseLeave={handleMouseLeave}
//         className="
//           relative
//           h-40
//           w-32
//           cursor-pointer
//           animate-[bot-float_4.2s_ease-in-out_infinite]
//           transition-transform
//           duration-300
//           hover:scale-110
//           hover:-translate-y-2
//           will-change-transform
//         "
//       >
       
// <motion.svg
//         initial={{scale:0}}
//       animate={{scale:1}}
//       transition={{duration:1}}
//           viewBox="0 0 150 185"
//           style={{transform:chatScreen?"scale(0)":"scale(1)",transition:"transform 1000ms linear"}}
//           className="
//             h-full
//             w-full
//             overflow-visible
//             drop-shadow-[0_12px_14px_rgba(0,0,0,0.16)]
//           "
//           aria-hidden="true"
//         >
        

//           {/* =================================================
//               LEFT ARM
//               ================================================= */}

//           <g className="bot-arm-left">
//             <circle
//               cx="22"
//               cy="104"
//               r="10"
//               className="
//                 fill-[#f1f3f5] dark:fill-[#111] dark:stroke-[#ced4da]
//                 stroke-[var(--foreground)]
//               "
//               strokeWidth="3"
//             />

//             <rect
//               x="13"
//               y="104"
//               width="18"
//               height="32"
//               rx="9"
//               className="
//                 fill-[#f1f3f5] dark:fill-[#111] dark:stroke-[#ced4da]
//                 stroke-[var(--foreground)]
//               "
//               strokeWidth="3"
//               transform="rotate(20 22 104)"
//             />

//             <circle
//               cx="16"
//               cy="137"
//               r="8"
//               className="
//                 fill-[#f1f3f5] dark:fill-[#111] dark:stroke-[#ced4da]
//                 stroke-[var(--foreground)]
//               "
//               strokeWidth="3"
//             />
//           </g>

//           {/* =================================================
//               RIGHT ARM
//               ================================================= */}

//           <g className="bot-arm-right">
//             <circle
//               cx="128"
//               cy="104"
//               r="10"
//               className="
//                 fill-[#f1f3f5] dark:fill-[#111] dark:stroke-[#ced4da]
//                 stroke-[var(--foreground)]
//               "
//               strokeWidth="3"
//             />

//             <rect
//               x="119"
//               y="104"
//               width="18"
//               height="32"
//               rx="9"
//               className="
//                 fill-[#f1f3f5] dark:fill-[#111] dark:stroke-[#ced4da]
//                 stroke-[var(--foreground)]
//               "
//               strokeWidth="3"
//               transform="rotate(-20 128 104)"
//             />

//             <circle
//               cx="134"
//               cy="137"
//               r="8"
//               className="
//                 fill-[#f1f3f5] dark:fill-[#111] dark:stroke-[#ced4da]
//                 stroke-[var(--foreground)]
//               "
//               strokeWidth="3"
//             />
//           </g>

//           {/* =================================================
//               BODY
//               ================================================= */}

//           <path
//             d="
//               M38 91
//               C34 91 31 95 31 100
//               L31 139
//               C31 147 37 152 45 152
//               L105 152
//               C113 152 119 147 119 139
//               L119 100
//               C119 95 116 91 112 91
//               Z
//             "
//             className="
//               fill-[#f1f3f5] dark:fill-[#111] dark:stroke-[#ced4da]
//               stroke-[var(--foreground)]
//             "
//             strokeWidth="3"
//           />

//           {/* =================================================
//               CHEST PANEL
//               ================================================= */}

//           <rect
//             x="47"
//             y="112"
//             width="56"
//             height="25"
//             rx="10"
//             className="
//               fill-[#f1f3f5] dark:fill-[#111] dark:stroke-[#ced4da]
//               stroke-[var(--foreground)]
//             "
//             strokeWidth="2.5"
//           />

//           <circle
//             cx="60"
//             cy="124"
//             r="4"
//             className="fill-[var(--foreground)]"
//           />

//           <circle
//             cx="75"
//             cy="124"
//             r="4"
//             className="fill-[var(--foreground)]"
//           />

//           <circle
//             cx="90"
//             cy="124"
//             r="4"
//             className="fill-[var(--foreground)]"
//           />

//           {/* =================================================
//               NECK
//               ================================================= */}

//           <rect
//             x="54"
//             y="83"
//             width="42"
//             height="18"
//             rx="8"
//             className="
//               fill-[#f1f3f5] dark:fill-[#111] dark:stroke-[#ced4da]
//               stroke-[var(--foreground)]
//             "
//             strokeWidth="3"
//           />

//           {/* =================================================
//               MOVING HEAD
//               ================================================= */}

//           <g
//             ref={headRef}
//             className="
//               origin-[75px_58px]
//               will-change-transform
//             "
//             style={{
//               transformBox: "view-box",
//             }}
//           >
//             {/* =================================================
//                 ANTENNA
//                 ================================================= */}

//             <line
//               x1="75"
//               y1="17"
//               x2="75"
//               y2="6"
//               className="stroke-[var(--foreground)]"
//               strokeWidth="3"
//               strokeLinecap="round"
//             />

//             <circle
//               cx="75"
//               cy="5"
//               r="4"
//               className="
//                 fill-[#f1f3f5] dark:fill-[#111] dark:stroke-[#ced4da]
//                 stroke-[var(--foreground)]
//               "
//               strokeWidth="2.5"
//             />

//             {/* =================================================
//                 EARS
//                 ================================================= */}

//             <rect
//               x="19"
//               y="48"
//               width="9"
//               height="20"
//               rx="4"
//               className="
//                 fill-[#f1f3f5] dark:fill-[#111] dark:stroke-[#ced4da]
//                 stroke-[var(--foreground)]
//               "
//               strokeWidth="2.5"
//             />

//             <rect
//               x="122"
//               y="48"
//               width="9"
//               height="20"
//               rx="4"
//               className="
//                 fill-[#f1f3f5] dark:fill-[#111] dark:stroke-[#ced4da]
//                 stroke-[var(--foreground)]
//               "
//               strokeWidth="2.5"
//             />

//             {/* =================================================
//                 HEAD
//                 ================================================= */}

//             <rect
//               x="25"
//               y="18"
//               width="100"
//               height="78"
//               rx="27"
//               className={`
//                 fill-[#f1f3f5] dark:fill-[#111] dark:stroke-[#ced4da]
//                 stroke-[var(--foreground)]
//                 transition-transform
//                 duration-200
//                 ease-out
//                 origin-[75px_57px]
//                 ${
//                   isHovered
//                     ? "scale-[1.015]"
//                     : "scale-100"
//                 }
//               `}
//               strokeWidth="3"
//             />

//             {/* =================================================
//                 LEFT EYE
//                 ================================================= */}

//             <g
//               className="
//                 bot-eye
//                 origin-[58px_53px]
//               "
//             >
              
//                 <path
//                   d="
//                     M48 57
//                     C52 51, 64 51, 68 57
//                   "
//                   fill="none"
//                   className={`stroke-[var(--foreground)] transition-opacity duration-200 ${
//       isHovered ? "opacity-100" : "opacity-0"
//     }`}
//                   strokeWidth="3"
//                   strokeLinecap="round"
//                 />
              
//                 <circle
//                   ref={leftPupilRef}
//                   cx="58"
//                   cy="53"
//                   r="7"
//                   className={`transition-opacity duration-200 fill-[var(--foreground)] will-change-transform ${
//       isHovered ? "opacity-0" : "opacity-100"
//     }`}
//                 />
              
//             </g>

//             {/* =================================================
//                 RIGHT EYE
//                 ================================================= */}

//             <g
//               className="
//                 bot-eye
//                 origin-[92px_53px]
//               "
//             >
//                 <path
//                   d="
//                     M82 57
//                     C86 51, 98 51, 102 57
//                   "
//                   fill="none"
//                   stroke="var(--foreground)"
//                   strokeWidth="3"
//                   strokeLinecap="round"
//                   className={`transition-opacity duration-200 ${
//       isHovered ? "opacity-100" : "opacity-0"
//     }`}
//                 />
                
//                 <circle
//                   ref={rightPupilRef}
//                   cx="92"
//                   cy="53"
//                   r="7"
//                   className={`transition-opacity duration-200  fill-[var(--foreground)] will-change-transform ${isHovered ? "opacity-0" : "opacity-100"}`}
//                 />
                
//             </g>

//             {/* =================================================
//                 MOUTH
//                 ================================================= */}

//             <path
//               className={`
//                 bot-mouth
//                 ${
//                   isHovered
//                     ? "bot-mouth-happy"
//                     : ""
//                 }
//               `}
//               d="M57 76 Q75 90 93 76"
//               fill="none"
//               stroke="var(--foreground)"
//               strokeWidth="3.5"
//               strokeLinecap="round"
//             />
//           </g>
//         </motion.svg>


//       </div>


//     </div>
//   );
// };

// export default WatcherBot;



// aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa



        // <div className={`${(!heroShow || isHovered) && "hidden"} transition duration-300`}>
        // <AnimatePresence>
        // {whichmsg ==0 && <MessageContainer text="My Hobbies?" position="top-0 translate-y-[-60%] left-[-90%] rotate-10" direction={false} />}
        // </AnimatePresence>
        // <AnimatePresence>
        // {whichmsg ==1 && <MessageContainer text="My tech stack?" position="bottom-0 translate-y-[-60%] right-[-120%] rotate-5" direction={true} />}
        // </AnimatePresence>
        // <AnimatePresence>
        // {whichmsg ==2 && <MessageContainer text="Who am I?" position="bottom-0 translate-y-[-60%] left-[-100%] -rotate-10" direction={false} />}
        // </AnimatePresence>
        // <AnimatePresence>
        // {whichmsg ==3 && <MessageContainer text="See my projects?" position="top-0 translate-y-[-60%] right-[-100%] -rotate-5" direction={true} />}
        // </AnimatePresence>
        // </div>
//       {/* =====================================================
//           SPEECH BUBBLE
//           ===================================================== */}
//           <AnimatePresence>
//             {isHovered && <MessageContainer text="Ask me anything." position="top-1/3 left-0 -translate-x-[110%] -translate-y-1/2" direction={false} />}
//           </AnimatePresence>
// function MessageContainer({position,text,direction}:{position:string,text:string,direction:boolean}){
//   return (<motion.div
//   initial={{scale:0,opacity:0}}
//   animate={{scale:1,opacity:1}}
//   exit={{scale:0,opacity:0}}
//   transition={{duration:1}}
//     className={`
//       absolute
//       pointer-events-none
//       ${position}
//       z-20
//       rounded-2xl
//       border-[var(--foreground)]
//       bg-white dark:bg-[#212529]
//       px-4
//       py-3
//       shadow-[0_10px_35px_rgba(0,0,0,0.08)]
//     `}
//   >
//     <p className="whitespace-nowrap text-xs font-semibold text-[var(--foreground)] encode-sans">
//       <Typewriter text={text} speed={100}/>
//     </p>

//     {/* Tail */}
//     {direction && <span
//       className="
//         absolute
//         -left-2
//         top-1/2
//         h-4
//         w-4
//         -translate-y-1/2
//         rotate-45
//         border-b2
//         border-l2
//         border-[var(--foreground)]
//         bg-white dark:bg-[#212529]
//       "
//     />}
//     {!direction && <span
//       className="
//         absolute
//         -right-2
//         top-1/2
//         h-4
//         w-4
//         -translate-y-1/2
//         rotate-45
//         border-r2
//         border-t2
//         border-[var(--foreground)]
//         bg-white dark:bg-[#212529]
//       "
//     />}
//   </motion.div>)
// }



// bot legss
  // {/* =================================================
  //             BACK LEGS
  //             ================================================= */}

  //         {/* <g className="bot-leg-left">
  //           <rect
  //             x="42"
  //             y="132"
  //             width="18"
  //             height="30"
  //             rx="9"
  //             className="
  //               fill-[var(--background)]
  //               stroke-[var(--foreground)]
  //             "
  //             strokeWidth="3"
  //           />

  //           <path
  //             d="
  //               M43 155
  //               C38 158 32 162 27 166
  //               C25 168 27 172 31 172
  //               L50 172
  //               C55 172 58 168 57 164
  //               L55 157
  //               Z
  //             "
  //             className="
  //               fill-[var(--background)]
  //               stroke-[var(--foreground)]
  //             "
  //             strokeWidth="3"
  //           />
  //         </g>

  //         <g className="bot-leg-right">
  //           <rect
  //             x="90"
  //             y="132"
  //             width="18"
  //             height="30"
  //             rx="9"
  //             className="
  //               fill-[var(--background)]
  //               stroke-[var(--foreground)]
  //             "
  //             strokeWidth="3"
  //           />

  //           <path
  //             d="
  //               M95 157
  //               C96 162 98 166 102 169
  //               C105 171 113 172 119 171
  //               C123 170 123 166 120 164
  //               L106 155
  //               Z
  //             "
  //             className="
  //               fill-[var(--background)]
  //               stroke-[var(--foreground)]
  //             "
  //             strokeWidth="3"
  //           />
  //         </g> */}