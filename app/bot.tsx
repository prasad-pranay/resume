"use client";

import Typewriter from "@/components/typewriter";
import { AnimatePresence, motion } from "framer-motion";
import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import ChatBotScreen from "./chatbotscreen";

interface Point {
  x: number;
  y: number;
}

// ---------------------------------------------------------
// TRACKING SETTINGS
// ---------------------------------------------------------

const EYE_TRAVEL = 5;
const EYE_EASE = 0.2;

const HEAD_MOVE_X = 5;
const HEAD_MOVE_Y = 3;
const HEAD_ROTATION = 4;
const HEAD_EASE = 0.08;

const BOT_FACE_Y = 0.32;

// ---------------------------------------------------------
// COMPONENT
// ---------------------------------------------------------

interface WatcherBotProps {
  chatScreen: boolean;
  setChatScreen: React.Dispatch<React.SetStateAction<boolean>>;
}
const WatcherBot = ({chatScreen,setChatScreen}:WatcherBotProps) => {
  const botRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<SVGGElement>(null);

  const leftPupilRef = useRef<SVGCircleElement>(null);
  const rightPupilRef = useRef<SVGCircleElement>(null);

  // -------------------------------------------------------
  // CURSOR
  // -------------------------------------------------------

  const cursorRef = useRef<Point>({
    x: 0,
    y: 0,
  });

  // -------------------------------------------------------
  // CACHED BOT POSITION
  // -------------------------------------------------------

  const botCenterRef = useRef<Point>({
    x: 0,
    y: 0,
  });

  // -------------------------------------------------------
  // PUPIL
  // -------------------------------------------------------

  const pupilRef = useRef<Point>({
    x: 0,
    y: 0,
  });

  // -------------------------------------------------------
  // HEAD
  // -------------------------------------------------------

  const headRefState = useRef({
    x: 0,
    y: 0,
    rotate: 0,
  });

  // -------------------------------------------------------
  // HOVER
  // -------------------------------------------------------

  const [isHovered, setIsHovered] = useState(false);

  // -------------------------------------------------------
  // UPDATE BOT CENTER
  // -------------------------------------------------------

  const updateBotCenter = useCallback(() => {
    const bot = botRef.current;

    if (!bot) return;

    const rect = bot.getBoundingClientRect();

    botCenterRef.current.x =
      rect.left + rect.width * 0.5;

    botCenterRef.current.y =
      rect.top + rect.height * BOT_FACE_Y;
  }, []);

  // -------------------------------------------------------
  // MOUSE TRACKING
  // -------------------------------------------------------

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      cursorRef.current.x = event.clientX;
      cursorRef.current.y = event.clientY;
    };

    window.addEventListener(
      "mousemove",
      handleMouseMove,
      {
        passive: true,
      }
    );

    updateBotCenter();

    let resizeFrame = 0;

    const handleResize = () => {
      cancelAnimationFrame(resizeFrame);

      resizeFrame = requestAnimationFrame(() => {
        updateBotCenter();
      });
    };

    window.addEventListener(
      "resize",
      handleResize,
      {
        passive: true,
      }
    );

    return () => {
      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      window.removeEventListener(
        "resize",
        handleResize
      );

      cancelAnimationFrame(resizeFrame);
    };
  }, [updateBotCenter]);

  // -------------------------------------------------------
  // ANIMATION LOOP
  // -------------------------------------------------------

  useEffect(() => {
    const head = headRef.current;
    const leftPupil = leftPupilRef.current;
    const rightPupil = rightPupilRef.current;

    if (!head || !leftPupil || !rightPupil) {
      return;
    }

    // Respect reduced-motion preferences.
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) {
      return;
    }

    let animationFrame = 0;

    const animate = () => {
      const cursor = cursorRef.current;
      const center = botCenterRef.current;

      const dx = cursor.x - center.x;
      const dy = cursor.y - center.y;

      const distance = Math.hypot(dx, dy);

      // -----------------------------------------------------
      // NORMALIZED DIRECTION
      // -----------------------------------------------------

      let directionX = 0;
      let directionY = 0;

      if (distance > 0.01) {
        directionX = dx / distance;
        directionY = dy / distance;
      }

      // -----------------------------------------------------
      // EYE TRACKING
      // -----------------------------------------------------

      const strength = Math.min(distance / 100, 1);

      const targetPupilX =
        directionX * EYE_TRAVEL * strength;

      const targetPupilY =
        directionY * EYE_TRAVEL * strength;

      const pupil = pupilRef.current;

      pupil.x +=
        (targetPupilX - pupil.x) *
        EYE_EASE;

      pupil.y +=
        (targetPupilY - pupil.y) *
        EYE_EASE;

      // Direct DOM updates.
      // No React render required.

      const pupilTransform = `
        translate(${pupil.x}px, ${pupil.y}px)
      `;

      leftPupil.style.transform =
        pupilTransform;

      rightPupil.style.transform =
        pupilTransform;

      // -----------------------------------------------------
      // HEAD TARGET
      // -----------------------------------------------------

      const headTargetX = Math.max(
        -HEAD_MOVE_X,
        Math.min(
          HEAD_MOVE_X,
          (dx / 180) * HEAD_MOVE_X
        )
      );

      const headTargetY = Math.max(
        -HEAD_MOVE_Y,
        Math.min(
          HEAD_MOVE_Y,
          (dy / 220) * HEAD_MOVE_Y
        )
      );

      const headTargetRotate = Math.max(
        -HEAD_ROTATION,
        Math.min(
          HEAD_ROTATION,
          (dx / 180) * HEAD_ROTATION
        )
      );

      // -----------------------------------------------------
      // SMOOTH HEAD MOVEMENT
      // -----------------------------------------------------

      const headState =
        headRefState.current;

      headState.x +=
        (headTargetX - headState.x) *
        HEAD_EASE;

      headState.y +=
        (headTargetY - headState.y) *
        HEAD_EASE;

      headState.rotate +=
        (headTargetRotate - headState.rotate) *
        HEAD_EASE;

      // Direct SVG transform.
      head.style.transform = `
        translate3d(
          ${headState.x}px,
          ${headState.y}px,
          0
        )
        rotate(${headState.rotate}deg)
      `;

      animationFrame =
        requestAnimationFrame(animate);
    };

    animationFrame =
      requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  // -------------------------------------------------------
  // BLINK
  // -------------------------------------------------------

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) {
      return;
    }

    let blinkTimer: ReturnType<typeof setTimeout>;
    let closeTimer: ReturnType<typeof setTimeout>;

    const blink = () => {
      const bot = botRef.current;

      if (!bot) {
        return;
      }

      bot.dataset.blink = "true";

      closeTimer = setTimeout(() => {
        if (bot) {
          delete bot.dataset.blink;
        }
      }, 120);

      const nextDelay =
        2600 + Math.random() * 3200;

      blinkTimer = setTimeout(
        blink,
        nextDelay
      );
    };

    blinkTimer = setTimeout(
      blink,
      2600 + Math.random() * 3200
    );

    return () => {
      clearTimeout(blinkTimer);
      clearTimeout(closeTimer);
    };
  }, []);

  // -------------------------------------------------------
  // HOVER
  // -------------------------------------------------------

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };


const [heroShow, setHeroShow] = useState(true);
const [scrollY, setScrollY] = useState(0);
useEffect(() => {
  const windowHeight = window.innerHeight / 2;

  const handleScroll = () => {
    const scrollY = window.scrollY;
    setScrollY(window.scrollY);
    setHeroShow(scrollY < windowHeight);
  };

  window.addEventListener("scroll", handleScroll, {
    passive: true,
  });

  handleScroll();

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, []);
  // -------------------------------------------------------
  // RENDER
  // -------------------------------------------------------

  const [whichmsg, setWhichMsg] = useState(0);

useEffect(() => {
  const msgInterval = setInterval(() => {
    if(!isHovered || heroShow){
      setWhichMsg((prev) => (prev >= 3 ? 0 : prev + 1));
    }
  }, 5000);

  return () => clearInterval(msgInterval);
}, []);


  

  return (
    <div
      style={{transform: heroShow ? `translateY(-${scrollY}px)` : "",transition: "transform 1500ms, bottom 1500ms, right 1500ms"}}
      className={`
        fixed
        ${heroShow ? "bottom-5 right-1/2 translate-x-1/2 sm:bottom-1/4 sm:right-1/5" :"-bottom-[70px] right-5 sm:right-20"}
        z-50
        flex
        flex-row-reverse
        items-end
        gap-3
      `}
    >
      {/* ===================================================
          ROBOT
          =================================================== */}
      <div
      onClick={()=>setChatScreen(prev=>!prev)}
        ref={botRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="
          relative
          h-40
          w-32
          cursor-pointer
          animate-[bot-float_4.2s_ease-in-out_infinite]
          transition-transform
          duration-300
          hover:scale-110
          hover:-translate-y-2
          will-change-transform
        "
      >
<motion.svg
        initial={{scale:0}}
      animate={{scale:1}}
      transition={{duration:1}}
          viewBox="0 0 150 185"
          style={{transform:chatScreen?"scale(0)":"scale(1)",transition:"transform 1000ms linear"}}
          className="
            h-full
            w-full
            overflow-visible
            drop-shadow-[0_12px_14px_rgba(0,0,0,0.16)]
          "
          aria-hidden="true"
        >
          {/* =================================================
              BACK LEGS
              ================================================= */}

          {/* <g className="bot-leg-left">
            <rect
              x="42"
              y="132"
              width="18"
              height="30"
              rx="9"
              className="
                fill-[var(--background)]
                stroke-[var(--foreground)]
              "
              strokeWidth="3"
            />

            <path
              d="
                M43 155
                C38 158 32 162 27 166
                C25 168 27 172 31 172
                L50 172
                C55 172 58 168 57 164
                L55 157
                Z
              "
              className="
                fill-[var(--background)]
                stroke-[var(--foreground)]
              "
              strokeWidth="3"
            />
          </g>

          <g className="bot-leg-right">
            <rect
              x="90"
              y="132"
              width="18"
              height="30"
              rx="9"
              className="
                fill-[var(--background)]
                stroke-[var(--foreground)]
              "
              strokeWidth="3"
            />

            <path
              d="
                M95 157
                C96 162 98 166 102 169
                C105 171 113 172 119 171
                C123 170 123 166 120 164
                L106 155
                Z
              "
              className="
                fill-[var(--background)]
                stroke-[var(--foreground)]
              "
              strokeWidth="3"
            />
          </g> */}

          {/* =================================================
              LEFT ARM
              ================================================= */}

          <g className="bot-arm-left">
            <circle
              cx="22"
              cy="104"
              r="10"
              className="
                fill-[#f1f3f5] dark:fill-[#111] dark:stroke-[#ced4da]
                stroke-[var(--foreground)]
              "
              strokeWidth="3"
            />

            <rect
              x="13"
              y="104"
              width="18"
              height="32"
              rx="9"
              className="
                fill-[#f1f3f5] dark:fill-[#111] dark:stroke-[#ced4da]
                stroke-[var(--foreground)]
              "
              strokeWidth="3"
              transform="rotate(20 22 104)"
            />

            <circle
              cx="16"
              cy="137"
              r="8"
              className="
                fill-[#f1f3f5] dark:fill-[#111] dark:stroke-[#ced4da]
                stroke-[var(--foreground)]
              "
              strokeWidth="3"
            />
          </g>

          {/* =================================================
              RIGHT ARM
              ================================================= */}

          <g className="bot-arm-right">
            <circle
              cx="128"
              cy="104"
              r="10"
              className="
                fill-[#f1f3f5] dark:fill-[#111] dark:stroke-[#ced4da]
                stroke-[var(--foreground)]
              "
              strokeWidth="3"
            />

            <rect
              x="119"
              y="104"
              width="18"
              height="32"
              rx="9"
              className="
                fill-[#f1f3f5] dark:fill-[#111] dark:stroke-[#ced4da]
                stroke-[var(--foreground)]
              "
              strokeWidth="3"
              transform="rotate(-20 128 104)"
            />

            <circle
              cx="134"
              cy="137"
              r="8"
              className="
                fill-[#f1f3f5] dark:fill-[#111] dark:stroke-[#ced4da]
                stroke-[var(--foreground)]
              "
              strokeWidth="3"
            />
          </g>

          {/* =================================================
              BODY
              ================================================= */}

          <path
            d="
              M38 91
              C34 91 31 95 31 100
              L31 139
              C31 147 37 152 45 152
              L105 152
              C113 152 119 147 119 139
              L119 100
              C119 95 116 91 112 91
              Z
            "
            className="
              fill-[#f1f3f5] dark:fill-[#111] dark:stroke-[#ced4da]
              stroke-[var(--foreground)]
            "
            strokeWidth="3"
          />

          {/* =================================================
              CHEST PANEL
              ================================================= */}

          <rect
            x="47"
            y="112"
            width="56"
            height="25"
            rx="10"
            className="
              fill-[#f1f3f5] dark:fill-[#111] dark:stroke-[#ced4da]
              stroke-[var(--foreground)]
            "
            strokeWidth="2.5"
          />

          <circle
            cx="60"
            cy="124"
            r="4"
            className="fill-[var(--foreground)]"
          />

          <circle
            cx="75"
            cy="124"
            r="4"
            className="fill-[var(--foreground)]"
          />

          <circle
            cx="90"
            cy="124"
            r="4"
            className="fill-[var(--foreground)]"
          />

          {/* =================================================
              NECK
              ================================================= */}

          <rect
            x="54"
            y="83"
            width="42"
            height="18"
            rx="8"
            className="
              fill-[#f1f3f5] dark:fill-[#111] dark:stroke-[#ced4da]
              stroke-[var(--foreground)]
            "
            strokeWidth="3"
          />

          {/* =================================================
              MOVING HEAD
              ================================================= */}

          <g
            ref={headRef}
            className="
              origin-[75px_58px]
              will-change-transform
            "
            style={{
              transformBox: "view-box",
            }}
          >
            {/* =================================================
                ANTENNA
                ================================================= */}

            <line
              x1="75"
              y1="17"
              x2="75"
              y2="6"
              className="stroke-[var(--foreground)]"
              strokeWidth="3"
              strokeLinecap="round"
            />

            <circle
              cx="75"
              cy="5"
              r="4"
              className="
                fill-[#f1f3f5] dark:fill-[#111] dark:stroke-[#ced4da]
                stroke-[var(--foreground)]
              "
              strokeWidth="2.5"
            />

            {/* =================================================
                EARS
                ================================================= */}

            <rect
              x="19"
              y="48"
              width="9"
              height="20"
              rx="4"
              className="
                fill-[#f1f3f5] dark:fill-[#111] dark:stroke-[#ced4da]
                stroke-[var(--foreground)]
              "
              strokeWidth="2.5"
            />

            <rect
              x="122"
              y="48"
              width="9"
              height="20"
              rx="4"
              className="
                fill-[#f1f3f5] dark:fill-[#111] dark:stroke-[#ced4da]
                stroke-[var(--foreground)]
              "
              strokeWidth="2.5"
            />

            {/* =================================================
                HEAD
                ================================================= */}

            <rect
              x="25"
              y="18"
              width="100"
              height="78"
              rx="27"
              className={`
                fill-[#f1f3f5] dark:fill-[#111] dark:stroke-[#ced4da]
                stroke-[var(--foreground)]
                transition-transform
                duration-200
                ease-out
                origin-[75px_57px]
                ${
                  isHovered
                    ? "scale-[1.015]"
                    : "scale-100"
                }
              `}
              strokeWidth="3"
            />

            {/* =================================================
                LEFT EYE
                ================================================= */}

            <g
              className="
                bot-eye
                origin-[58px_53px]
              "
            >
              
                <path
                  d="
                    M48 57
                    C52 51, 64 51, 68 57
                  "
                  fill="none"
                  className={`stroke-[var(--foreground)] transition-opacity duration-200 ${
      isHovered ? "opacity-100" : "opacity-0"
    }`}
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              
                <circle
                  ref={leftPupilRef}
                  cx="58"
                  cy="53"
                  r="7"
                  className={`transition-opacity duration-200 fill-[var(--foreground)] will-change-transform ${
      isHovered ? "opacity-0" : "opacity-100"
    }`}
                />
              
            </g>

            {/* =================================================
                RIGHT EYE
                ================================================= */}

            <g
              className="
                bot-eye
                origin-[92px_53px]
              "
            >
                <path
                  d="
                    M82 57
                    C86 51, 98 51, 102 57
                  "
                  fill="none"
                  stroke="var(--foreground)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  className={`transition-opacity duration-200 ${
      isHovered ? "opacity-100" : "opacity-0"
    }`}
                />
                
                <circle
                  ref={rightPupilRef}
                  cx="92"
                  cy="53"
                  r="7"
                  className={`transition-opacity duration-200  fill-[var(--foreground)] will-change-transform ${isHovered ? "opacity-0" : "opacity-100"}`}
                />
                
            </g>

            {/* =================================================
                MOUTH
                ================================================= */}

            <path
              className={`
                bot-mouth
                ${
                  isHovered
                    ? "bot-mouth-happy"
                    : ""
                }
              `}
              d="M57 76 Q75 90 93 76"
              fill="none"
              stroke="var(--foreground)"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
          </g>
        </motion.svg>


        <div className={`${(!heroShow || isHovered) && "hidden"} transition duration-300`}>
        <AnimatePresence>
        {whichmsg ==0 && <MessageContainer text="My Hobbies?" position="top-0 translate-y-[-60%] left-[-90%] rotate-10" direction={false} />}
        </AnimatePresence>
        <AnimatePresence>
        {whichmsg ==1 && <MessageContainer text="My tech stack?" position="bottom-0 translate-y-[-60%] right-[-120%] rotate-5" direction={true} />}
        </AnimatePresence>
        <AnimatePresence>
        {whichmsg ==2 && <MessageContainer text="Who am I?" position="bottom-0 translate-y-[-60%] left-[-100%] -rotate-10" direction={false} />}
        </AnimatePresence>
        <AnimatePresence>
        {whichmsg ==3 && <MessageContainer text="See my projects?" position="top-0 translate-y-[-60%] right-[-100%] -rotate-5" direction={true} />}
        </AnimatePresence>
        </div>
      </div>

      {/* =====================================================
          SPEECH BUBBLE
          ===================================================== */}
          <AnimatePresence>
            {isHovered && <MessageContainer text="Ask me anything." position="top-1/3 left-0 -translate-x-[110%] -translate-y-1/2" direction={false} />}
          </AnimatePresence>

    </div>
  );
};

export default WatcherBot;




function MessageContainer({position,text,direction}:{position:string,text:string,direction:boolean}){
  return (<motion.div
  initial={{scale:0,opacity:0}}
  animate={{scale:1,opacity:1}}
  exit={{scale:0,opacity:0}}
  transition={{duration:1}}
    className={`
      absolute
      pointer-events-none
      ${position}
      z-20
      rounded-2xl
      border-[var(--foreground)]
      bg-white dark:bg-[#212529]
      px-4
      py-3
      shadow-[0_10px_35px_rgba(0,0,0,0.08)]
    `}
  >
    <p className="whitespace-nowrap text-xs font-semibold text-[var(--foreground)] encode-sans">
      <Typewriter text={text} speed={100}/>
    </p>

    {/* Tail */}
    {direction && <span
      className="
        absolute
        -left-2
        top-1/2
        h-4
        w-4
        -translate-y-1/2
        rotate-45
        border-b2
        border-l2
        border-[var(--foreground)]
        bg-white dark:bg-[#212529]
      "
    />}
    {!direction && <span
      className="
        absolute
        -right-2
        top-1/2
        h-4
        w-4
        -translate-y-1/2
        rotate-45
        border-r2
        border-t2
        border-[var(--foreground)]
        bg-white dark:bg-[#212529]
      "
    />}
  </motion.div>)
}




// "use client";

// import React, { useEffect, useRef, useState } from "react";

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

// const MOUTH_EASE = 0.16;

// // ---------------------------------------------------------
// // COMPONENT
// // ---------------------------------------------------------

// const WatcherBot: React.FC = () => {
//   const botRef = useRef<HTMLDivElement>(null);

//   // ---------------------------------------------------------
//   // CURSOR
//   // ---------------------------------------------------------

//   const cursorRef = useRef<Point>({
//     x: 0,
//     y: 0,
//   });

//   // ---------------------------------------------------------
//   // PUPIL
//   // ---------------------------------------------------------

//   const pupilRef = useRef<Point>({
//     x: 0,
//     y: 0,
//   });

//   const [pupilOffset, setPupilOffset] = useState<Point>({
//     x: 0,
//     y: 0,
//   });

//   // ---------------------------------------------------------
//   // HEAD
//   // ---------------------------------------------------------

//   const headRef = useRef({
//     x: 0,
//     y: 0,
//     rotate: 0,
//   });

//   const [headTransform, setHeadTransform] = useState({
//     x: 0,
//     y: 0,
//     rotate: 0,
//   });

//   // ---------------------------------------------------------
//   // STATES
//   // ---------------------------------------------------------

//   const [isBlinking, setIsBlinking] = useState(false);
//   const [isHovered, setIsHovered] = useState(false);

//   const [mouthProgress, setMouthProgress] = useState(0);

//   const mouthTargetRef = useRef(0);

//   // ---------------------------------------------------------
//   // MOUSE TRACKING
//   // ---------------------------------------------------------

//   useEffect(() => {
//     const handleMouseMove = (event: MouseEvent) => {
//       cursorRef.current = {
//         x: event.clientX,
//         y: event.clientY,
//       };
//     };

//     window.addEventListener("mousemove", handleMouseMove, {
//       passive: true,
//     });

//     let animationFrame: number;

//     const animateBot = () => {
//       const bot = botRef.current;

//       if (bot) {
//         const rect = bot.getBoundingClientRect();

//         // ---------------------------------------------------
//         // FACE CENTER
//         // ---------------------------------------------------

//         const faceCenterX = rect.left + rect.width / 2;
//         const faceCenterY = rect.top + rect.height * 0.32;

//         const dx = cursorRef.current.x - faceCenterX;
//         const dy = cursorRef.current.y - faceCenterY;

//         const distance = Math.sqrt(dx * dx + dy * dy);

//         // ---------------------------------------------------
//         // NORMALIZED DIRECTION
//         // ---------------------------------------------------

//         let directionX = 0;
//         let directionY = 0;

//         if (distance > 0.01) {
//           directionX = dx / distance;
//           directionY = dy / distance;
//         }

//         // ---------------------------------------------------
//         // EYE TRACKING
//         // ---------------------------------------------------

//         const strength = Math.min(distance / 100, 1);

//         const targetPupilX =
//           directionX * EYE_TRAVEL * strength;

//         const targetPupilY =
//           directionY * EYE_TRAVEL * strength;

//         pupilRef.current.x +=
//           (targetPupilX - pupilRef.current.x) *
//           EYE_EASE;

//         pupilRef.current.y +=
//           (targetPupilY - pupilRef.current.y) *
//           EYE_EASE;

//         setPupilOffset({
//           x: pupilRef.current.x,
//           y: pupilRef.current.y,
//         });

//         // ---------------------------------------------------
//         // HEAD TRACKING
//         // ---------------------------------------------------

//         const headTargetX = Math.max(
//           -HEAD_MOVE_X,
//           Math.min(
//             HEAD_MOVE_X,
//             (dx / 180) * HEAD_MOVE_X
//           )
//         );

//         const headTargetY = Math.max(
//           -HEAD_MOVE_Y,
//           Math.min(
//             HEAD_MOVE_Y,
//             (dy / 220) * HEAD_MOVE_Y
//           )
//         );

//         const headTargetRotate = Math.max(
//           -HEAD_ROTATION,
//           Math.min(
//             HEAD_ROTATION,
//             (dx / 180) * HEAD_ROTATION
//           )
//         );

//         // ---------------------------------------------------
//         // SMOOTH HEAD MOVEMENT
//         // ---------------------------------------------------

//         headRef.current.x +=
//           (headTargetX - headRef.current.x) *
//           HEAD_EASE;

//         headRef.current.y +=
//           (headTargetY - headRef.current.y) *
//           HEAD_EASE;

//         headRef.current.rotate +=
//           (headTargetRotate - headRef.current.rotate) *
//           HEAD_EASE;

//         setHeadTransform({
//           x: headRef.current.x,
//           y: headRef.current.y,
//           rotate: headRef.current.rotate,
//         });
//       }

//       animationFrame = requestAnimationFrame(animateBot);
//     };

//     animationFrame = requestAnimationFrame(animateBot);

//     return () => {
//       window.removeEventListener(
//         "mousemove",
//         handleMouseMove
//       );

//       cancelAnimationFrame(animationFrame);
//     };
//   }, []);

//   // ---------------------------------------------------------
//   // HOVER / MOUTH ANIMATION
//   // ---------------------------------------------------------

//   useEffect(() => {
//     mouthTargetRef.current = isHovered ? 1 : 0;
//   }, [isHovered]);

//   useEffect(() => {
//     let animationFrame: number;

//     const animateMouth = () => {
//       setMouthProgress((current) => {
//         const target = mouthTargetRef.current;

//         const next =
//           current +
//           (target - current) * MOUTH_EASE;

//         return Math.abs(target - next) < 0.001
//           ? target
//           : next;
//       });

//       animationFrame =
//         requestAnimationFrame(animateMouth);
//     };

//     animationFrame =
//       requestAnimationFrame(animateMouth);

//     return () =>
//       cancelAnimationFrame(animationFrame);
//   }, []);

//   // ---------------------------------------------------------
//   // BLINK
//   // ---------------------------------------------------------

//   useEffect(() => {
//     let timeout: ReturnType<typeof setTimeout>;

//     const scheduleBlink = () => {
//       const delay =
//         2600 + Math.random() * 3200;

//       timeout = setTimeout(() => {
//         setIsBlinking(true);

//         setTimeout(() => {
//           setIsBlinking(false);
//         }, 120);

//         scheduleBlink();
//       }, delay);
//     };

//     scheduleBlink();

//     return () =>
//       clearTimeout(timeout);
//   }, []);

//   // ---------------------------------------------------------
//   // MOUTH
//   // ---------------------------------------------------------

//   const mouthY =
//     90 + mouthProgress * 5;

//   // ---------------------------------------------------------
//   // RENDER
//   // ---------------------------------------------------------

//   return (
//     <div
//       className="
//         fixed
//         -bottom-[70px]
//         sm:right-20 right-5
//         z-50
//         flex
//         flex-row-reverse
//         items-end
//         gap-3
//       "
//     >
//       {/* =====================================================
//           ROBOT
//           ===================================================== */}

//       <div
//         ref={botRef}
//         onMouseEnter={() => setIsHovered(true)}
//         onMouseLeave={() => setIsHovered(false)}
//         className="
//           relative
//           h-40
//           w-32
//           cursor-pointer
//           animate-[bot-float_4.2s_ease-in-out_infinite]
//           transition-all
//           duration-300
//           hover:scale-110
//           hover:-translate-y-2
//         "
//       >
//         <svg
//           viewBox="0 0 150 185"
//           className="
//             h-full
//             w-full
//             overflow-visible
//             drop-shadow-[0_12px_14px_rgba(0,0,0,0.16)]
//           "
//         >
//           {/* =================================================
//               BACK LEGS
//               ================================================= */}

//           <g className="bot-leg-left">
//             <rect
//               x="42"
//               y="132"
//               width="18"
//               height="30"
//               rx="9"
//               className="
//                 fill-[var(--background)]
//                 stroke-[var(--foreground)]
//               "
//               strokeWidth="3"
//             />

//             <path
//               d="
//                 M43 155
//                 C38 158 32 162 27 166
//                 C25 168 27 172 31 172
//                 L50 172
//                 C55 172 58 168 57 164
//                 L55 157
//                 Z
//               "
//               className="
//                 fill-[var(--background)]
//                 stroke-[var(--foreground)]
//               "
//               strokeWidth="3"
//             />
//           </g>

//           <g className="bot-leg-right">
//             <rect
//               x="90"
//               y="132"
//               width="18"
//               height="30"
//               rx="9"
//               className="
//                 fill-[var(--background)]
//                 stroke-[var(--foreground)]
//               "
//               strokeWidth="3"
//             />

//             <path
//               d="
//                 M95 157
//                 C96 162 98 166 102 169
//                 C105 171 113 172 119 171
//                 C123 170 123 166 120 164
//                 L106 155
//                 Z
//               "
//               className="
//                 fill-[var(--background)]
//                 stroke-[var(--foreground)]
//               "
//               strokeWidth="3"
//             />
//           </g>

//           {/* =================================================
//               LEFT ARM
//               ================================================= */}

//           <g className="bot-arm-left">
//             <circle
//               cx="22"
//               cy="104"
//               r="10"
//               className="
//                 fill-[var(--background)]
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
//                 fill-[var(--background)]
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
//                 fill-[var(--background)]
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
//                 fill-[var(--background)]
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
//                 fill-[var(--background)]
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
//                 fill-[var(--background)]
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
//               fill-[var(--background)]
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
//               fill-[var(--background)]
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
//               fill-[var(--background)]
//               stroke-[var(--foreground)]
//             "
//             strokeWidth="3"
//           />

//           {/* =================================================
//               MOVING HEAD
//               Everything above the neck follows cursor.
//               ================================================= */}

//           <g
//             style={{
//               transform: `
//                 translate(
//                   ${headTransform.x}px,
//                   ${headTransform.y}px
//                 )
//                 rotate(${headTransform.rotate}deg)
//               `,
//               transformOrigin: "75px 58px",
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
//                 fill-[var(--background)]
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
//                 fill-[var(--background)]
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
//                 fill-[var(--background)]
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
//               className="
//                 fill-[var(--background)]
//                 stroke-[var(--foreground)]
//               "
//               strokeWidth="3"
//               style={{
//                 transform: isHovered
//                   ? "scale(1.015)"
//                   : "scale(1)",
//                 transformOrigin: "75px 57px",
//                 transition:
//                   "transform 220ms ease",
//               }}
//             />

//             {/* =================================================
//                 LEFT EYE
//                 ================================================= */}

//             <g
//               style={{
//                 transform: `scaleY(${
//                   isBlinking ? 0.08 : 1
//                 })`,
//                 transformOrigin: "58px 53px",
//                 transition:
//                   "transform 100ms ease",
//               }}
//             >
//               {isHovered ? (
//                 <path
//                   d="M48 57 C52 51, 64 51, 68 57"
//                   fill="none"
//                   stroke="var(--foreground)"
//                   strokeWidth="3"
//                   strokeLinecap="round"
//                 />
//               ) : (
//                 <circle
//                   cx={58 + pupilOffset.x}
//                   cy={53 + pupilOffset.y}
//                   r="7"
//                   className="fill-[var(--foreground)]"
//                 />
//               )}
//             </g>

//             {/* =================================================
//                 RIGHT EYE
//                 ================================================= */}

//             <g
//               style={{
//                 transform: `scaleY(${
//                   isBlinking ? 0.08 : 1
//                 })`,
//                 transformOrigin: "92px 53px",
//                 transition:
//                   "transform 100ms ease",
//               }}
//             >
//               {isHovered ? (
//                 <path
//                   d="M82 57 C86 51, 98 51, 102 57"
//                   fill="none"
//                   stroke="var(--foreground)"
//                   strokeWidth="3"
//                   strokeLinecap="round"
//                 />
//               ) : (
//                 <circle
//                   cx={92 + pupilOffset.x}
//                   cy={53 + pupilOffset.y}
//                   r="7"
//                   className="fill-[var(--foreground)]"
//                 />
//               )}
//             </g>

//             {/* =================================================
//                 MOUTH
//                 ================================================= */}

//             <path
//               d={`
//                 M57 76
//                 Q75 ${mouthY} 93 76
//               `}
//               fill="none"
//               className="stroke-[var(--foreground)]"
//               strokeWidth="3.5"
//               strokeLinecap="round"
//             />
//           </g>
//         </svg>
//       </div>

//       {/* =====================================================
//           SPEECH BUBBLE
//           ===================================================== */}

//       <div
//         className="
//           relative
//           mb-16
//           pointer-events-none
//         "
//         style={{
//           opacity: isHovered ? 1 : 0,

//           transform: isHovered
//             ? "translateX(0) scale(1)"
//             : "translateX(10px) scale(0.9)",

//           transition:
//             "opacity 220ms ease, transform 220ms cubic-bezier(0.34, 1.56, 0.64, 1)",

//           pointerEvents: "none",
//         }}
//       >
//         <div
//           className="
//             rounded-xl
//             border-2
//             border-black
//             bg-white
//             px-4
//             py-2
//             whitespace-nowrap
//           "
//         >
//           <span
//             className="
//               text-sm
//               font-medium
//               tracking-tight
//               text-black
//             "
//           >
//             Ask me anything
//           </span>
//         </div>

//         {/* =================================================
//             BUBBLE TAIL — BLACK
//             ================================================= */}

//         <div
//           className="
//             absolute
//             top-1/2
//             -right-[7px]
//             h-0
//             w-0
//             -translate-y-1/2
//           "
//           style={{
//             borderTop:
//               "6px solid transparent",
//             borderBottom:
//               "6px solid transparent",
//             borderLeft:
//               "7px solid black",
//           }}
//         />

//         {/* =================================================
//             BUBBLE TAIL — WHITE
//             ================================================= */}

//         <div
//           className="
//             absolute
//             top-1/2
//             -right-[4px]
//             h-0
//             w-0
//             -translate-y-1/2
//           "
//           style={{
//             borderTop:
//               "5px solid transparent",
//             borderBottom:
//               "5px solid transparent",
//             borderLeft:
//               "6px solid white",
//           }}
//         />
//       </div>

//       {/* =====================================================
//           FLOATING ANIMATION
//           ===================================================== */}

//       <style>{`
//         @keyframes bot-float {
//           0%, 100% {
//             transform: translateY(0px);
//           }

//           50% {
//             transform: translateY(-4px);
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default WatcherBot;



// "use client";

// import React, { useEffect, useRef, useState } from "react";

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

// const MOUTH_EASE = 0.16;

// // ---------------------------------------------------------
// // COMPONENT
// // ---------------------------------------------------------

// const WatcherBot: React.FC = () => {
//   const botRef = useRef<HTMLDivElement>(null);

//   // ---------------------------------------------------------
//   // CURSOR
//   // ---------------------------------------------------------

//   const cursorRef = useRef<Point>({
//     x: 0,
//     y: 0,
//   });

//   // ---------------------------------------------------------
//   // PUPIL
//   // ---------------------------------------------------------

//   const pupilRef = useRef<Point>({
//     x: 0,
//     y: 0,
//   });

//   const [pupilOffset, setPupilOffset] = useState<Point>({
//     x: 0,
//     y: 0,
//   });

//   // ---------------------------------------------------------
//   // HEAD
//   // ---------------------------------------------------------

//   const headRef = useRef({
//     x: 0,
//     y: 0,
//     rotate: 0,
//   });

//   const [headTransform, setHeadTransform] = useState({
//     x: 0,
//     y: 0,
//     rotate: 0,
//   });

//   // ---------------------------------------------------------
//   // STATES
//   // ---------------------------------------------------------

//   const [isBlinking, setIsBlinking] = useState(false);
//   const [isHovered, setIsHovered] = useState(false);

//   const [mouthProgress, setMouthProgress] = useState(0);

//   const mouthTargetRef = useRef(0);

//   // ---------------------------------------------------------
//   // MOUSE TRACKING
//   // ---------------------------------------------------------

//   useEffect(() => {
//     const handleMouseMove = (event: MouseEvent) => {
//       cursorRef.current = {
//         x: event.clientX,
//         y: event.clientY,
//       };
//     };

//     window.addEventListener("mousemove", handleMouseMove, {
//       passive: true,
//     });

//     let animationFrame: number;

//     const animateBot = () => {
//       const bot = botRef.current;

//       if (bot) {
//         const rect = bot.getBoundingClientRect();

//         // -----------------------------------------------------
//         // FACE CENTER
//         // -----------------------------------------------------

//         const faceCenterX = rect.left + rect.width / 2;
//         const faceCenterY = rect.top + rect.height * 0.35;

//         const dx = cursorRef.current.x - faceCenterX;
//         const dy = cursorRef.current.y - faceCenterY;

//         const distance = Math.sqrt(dx * dx + dy * dy);

//         // -----------------------------------------------------
//         // NORMALIZED DIRECTION
//         // -----------------------------------------------------

//         let directionX = 0;
//         let directionY = 0;

//         if (distance > 0.01) {
//           directionX = dx / distance;
//           directionY = dy / distance;
//         }

//         // -----------------------------------------------------
//         // EYE TRACKING
//         // -----------------------------------------------------

//         const strength = Math.min(distance / 100, 1);

//         const targetPupilX =
//           directionX * EYE_TRAVEL * strength;

//         const targetPupilY =
//           directionY * EYE_TRAVEL * strength;

//         pupilRef.current.x +=
//           (targetPupilX - pupilRef.current.x) *
//           EYE_EASE;

//         pupilRef.current.y +=
//           (targetPupilY - pupilRef.current.y) *
//           EYE_EASE;

//         setPupilOffset({
//           x: pupilRef.current.x,
//           y: pupilRef.current.y,
//         });

//         // -----------------------------------------------------
//         // HEAD TRACKING
//         // -----------------------------------------------------

//         /*
//          * The head follows the cursor much more subtly
//          * than the eyes.
//          *
//          * This creates:
//          *
//          *     cursor
//          *        ↓
//          *     head follows slowly
//          *        ↓
//          *     eyes follow quickly
//          */

//         const headTargetX = Math.max(
//           -HEAD_MOVE_X,
//           Math.min(
//             HEAD_MOVE_X,
//             (dx / 180) * HEAD_MOVE_X
//           )
//         );

//         const headTargetY = Math.max(
//           -HEAD_MOVE_Y,
//           Math.min(
//             HEAD_MOVE_Y,
//             (dy / 220) * HEAD_MOVE_Y
//           )
//         );

//         // Cursor on the right → head turns right
//         // Cursor on the left → head turns left
//         const headTargetRotate = Math.max(
//           -HEAD_ROTATION,
//           Math.min(
//             HEAD_ROTATION,
//             (dx / 180) * HEAD_ROTATION
//           )
//         );

//         // Smooth head movement
//         headRef.current.x +=
//           (headTargetX - headRef.current.x) *
//           HEAD_EASE;

//         headRef.current.y +=
//           (headTargetY - headRef.current.y) *
//           HEAD_EASE;

//         headRef.current.rotate +=
//           (headTargetRotate - headRef.current.rotate) *
//           HEAD_EASE;

//         setHeadTransform({
//           x: headRef.current.x,
//           y: headRef.current.y,
//           rotate: headRef.current.rotate,
//         });
//       }

//       animationFrame =
//         requestAnimationFrame(animateBot);
//     };

//     animationFrame =
//       requestAnimationFrame(animateBot);

//     return () => {
//       window.removeEventListener(
//         "mousemove",
//         handleMouseMove
//       );

//       cancelAnimationFrame(animationFrame);
//     };
//   }, []);

//   // ---------------------------------------------------------
//   // HOVER / MOUTH ANIMATION
//   // ---------------------------------------------------------

//   useEffect(() => {
//     mouthTargetRef.current = isHovered ? 1 : 0;
//   }, [isHovered]);

//   useEffect(() => {
//     let animationFrame: number;

//     const animateMouth = () => {
//       setMouthProgress((current) => {
//         const target = mouthTargetRef.current;

//         const next =
//           current +
//           (target - current) * MOUTH_EASE;

//         return Math.abs(target - next) < 0.001
//           ? target
//           : next;
//       });

//       animationFrame =
//         requestAnimationFrame(animateMouth);
//     };

//     animationFrame =
//       requestAnimationFrame(animateMouth);

//     return () =>
//       cancelAnimationFrame(animationFrame);
//   }, []);

//   // ---------------------------------------------------------
//   // BLINK
//   // ---------------------------------------------------------

//   useEffect(() => {
//     let timeout: ReturnType<typeof setTimeout>;

//     const scheduleBlink = () => {
//       const delay =
//         2600 + Math.random() * 3200;

//       timeout = setTimeout(() => {
//         setIsBlinking(true);

//         setTimeout(() => {
//           setIsBlinking(false);
//         }, 120);

//         scheduleBlink();
//       }, delay);
//     };

//     scheduleBlink();

//     return () =>
//       clearTimeout(timeout);
//   }, []);

//   // ---------------------------------------------------------
//   // MOUTH
//   // ---------------------------------------------------------

//   const mouthY =
//     78 + mouthProgress * 8;

//   const mouthPath = `
//     M47 78
//     Q60 ${mouthY} 73 78
//   `;

//   // ---------------------------------------------------------
//   // RENDER
//   // ---------------------------------------------------------

//   return (
//     <div
//       className="
//         fixed
//         translate-y-8
//         bottom-0
//         right-20
//         z-50
//         flex
//         flex-row-reverse
//         items-end
//         gap-3
//       "
//     >
//       {/* =====================================================
//           ROBOT
//           ===================================================== */}

//       <div
//         ref={botRef}
//         onMouseEnter={() =>
//           setIsHovered(true)
//         }
//         onMouseLeave={() =>
//           setIsHovered(false)
//         }
//         className="
//           relative
//           h-32
//           w-28
//           cursor-pointer
//           animate-[bot-float_4.2s_ease-in-out_infinite]
//           transition
//           duration-300
//           hover:scale-110
//           hover:-translate-y-2
//         "
//       >
//         <svg
//           viewBox="0 0 120 145"
//           className="
//             h-full
//             w-full
//             overflow-visible
//             drop-shadow-[0_10px_16px_rgba(0,0,0,0.18)]
//           "
//         >

//           {/* =================================================
//               MOVING HEAD GROUP

//               Everything above the neck moves together.

//               The body stays fixed so the movement feels
//               like a real mechanical neck.
//               ================================================= */}

//           <g
//             style={{
//               transform: `
//                 translate(
//                   ${headTransform.x}px,
//                   ${headTransform.y}px
//                 )
//                 rotate(${headTransform.rotate}deg)
//               `,
//               transformOrigin:
//                 "60px 58px",
//             }}
//           >

//             {/* =================================================
//                 ANTENNA
//                 ================================================= */}

//             <line
//               x1="60"
//               y1="13"
//               x2="60"
//               y2="3"
//               className="stroke-[var(--foreground)]"
//               strokeWidth="3"
//               strokeLinecap="round"
//             />

//             <circle
//               cx="60"
//               cy="3"
//               r="3"
//               className="stroke-[var(--foreground)] fill-background"
//               strokeWidth="2"
//             />

//             {/* =================================================
//                 LEFT SIDE CONNECTOR
//                 ================================================= */}

//             <rect
//               x="5"
//               y="51"
//               width="7"
//               height="14"
//               rx="3"
//               className="stroke-[var(--foreground)] fill-background"
//               strokeWidth="2.5"
//             />

//             {/* =================================================
//                 RIGHT SIDE CONNECTOR
//                 ================================================= */}

//             <rect
//               x="108"
//               y="51"
//               width="7"
//               height="14"
//               rx="3"
//               className="stroke-[var(--foreground)] fill-background"
//               strokeWidth="2.5"
//             />

//             {/* =================================================
//                 ROBOT HEAD
//                 ================================================= */}

//             <rect
//               x="10"
//               y="14"
//               width="100"
//               height="88"
//               rx="25"
//               className="
//                 fill-[var(--background)]
//                 stroke-[var(--foreground)]
//               "
//               strokeWidth="3"
//               style={{
//                 transform: isHovered
//                   ? "scale(1.015)"
//                   : "scale(1)",
//                 transformOrigin:
//                   "60px 58px",
//                 transition:
//                   "transform 220ms ease",
//               }}
//             />

//             {/* =================================================
//                 LEFT EYE
//                 ================================================= */}

//             <g
//               style={{
//                 transform: `scaleY(${
//                   isBlinking ? 0.08 : 1
//                 })`,
//                 transformOrigin:
//                   "44px 55px",
//                 transition:
//                   "transform 100ms ease",
//               }}
//             >
//               {isHovered ? <path
//       d="M 34 57 C 38 51, 50 51, 54 57"
//       fill="none"
//       stroke="var(--foreground)"
//       strokeWidth="3"
//       strokeLinecap="round"
//     /> :<circle
//                 cx={44 + pupilOffset.x}
//                 cy={55 + pupilOffset.y}
//                 r="6"
//                 className="fill-[var(--foreground)]"
//               />}
//             </g>

//             {/* =================================================
//                 RIGHT EYE
//                 ================================================= */}

//             <g
//               style={{
//                 transform: `scaleY(${
//                   isBlinking ? 0.08 : 1
//                 })`,
//                 transformOrigin:
//                   "76px 55px",
//                 transition:
//                   "transform 100ms ease",
//               }}
//             >
//               {isHovered? <path
//       d="M 66 57 C 70 51, 82 51, 86 57"
//       fill="none"
//       stroke="var(--foreground)"
//       strokeWidth="3"
//       strokeLinecap="round"
//     />:<circle
//                 cx={76 + pupilOffset.x}
//                 cy={55 + pupilOffset.y}
//                 r="6"
//                 className="fill-[var(--foreground)]"
//               />}
//             </g>

//             {/* =================================================
//                 MOUTH
//                 ================================================= */}

//             <path
//               d={mouthPath}
//               fill="none"
//               className="stroke-[var(--foreground)]"
//               strokeWidth="3.5"
//               strokeLinecap="round"
//             />

//           </g>

//           {/* =================================================
//               NECK

//               The neck stays mostly stationary while the head
//               subtly follows the cursor.
//               ================================================= */}

//           <rect
//             x="49"
//             y="98"
//             width="22"
//             height="13"
//             rx="5"
//             className="
//               fill-[var(--background)]
//               stroke-[var(--foreground)]
//             "
//             strokeWidth="3"
//           />

//           {/* =================================================
//               SMALL ROBOT BODY
//               ================================================= */}

//           <path
//             d="
//               M22 145
//               C22 122 38 109 60 109
//               C82 109 98 122 98 145
//             "
//             className="
//               fill-[var(--background)]
//               stroke-[var(--foreground)]
//             "
//             strokeWidth="3"
//           />

//         </svg>
//       </div>

//       {/* =====================================================
//           SPEECH BUBBLE
//           ===================================================== */}

//       <div
//         className="
//           relative
//           mb-16
//           pointer-events-none
//         "
//         style={{
//           opacity: isHovered ? 1 : 0,

//           transform: isHovered
//             ? "translateX(0) scale(1)"
//             : "translateX(10px) scale(0.9)",

//           transition:
//             "opacity 220ms ease, transform 220ms cubic-bezier(0.34, 1.56, 0.64, 1)",

//           pointerEvents: "none",
//         }}
//       >
//         <div
//           className="
//             rounded-xl
//             border-2
//             border-black
//             bg-white
//             px-4
//             py-2
//             whitespace-nowrap
//           "
//         >
//           <span
//             className="
//               text-sm
//               font-medium
//               tracking-tight
//               text-black
//             "
//           >
//             Ask me anything
//           </span>
//         </div>

//         {/* =================================================
//             BUBBLE TAIL — BLACK
//             ================================================= */}

//         <div
//           className="
//             absolute
//             top-1/2
//             -right-[7px]
//             h-0
//             w-0
//             -translate-y-1/2
//           "
//           style={{
//             borderTop:
//               "6px solid transparent",
//             borderBottom:
//               "6px solid transparent",
//             borderLeft:
//               "7px solid black",
//           }}
//         />

//         {/* =================================================
//             BUBBLE TAIL — WHITE
//             ================================================= */}

//         <div
//           className="
//             absolute
//             top-1/2
//             -right-[4px]
//             h-0
//             w-0
//             -translate-y-1/2
//           "
//           style={{
//             borderTop:
//               "5px solid transparent",
//             borderBottom:
//               "5px solid transparent",
//             borderLeft:
//               "6px solid white",
//           }}
//         />
//       </div>

//       {/* =====================================================
//           FLOATING ANIMATION
//           ===================================================== */}

//       <style>{`
//         @keyframes bot-float {
//           0%, 100% {
//             transform: translateY(0px);
//           }

//           50% {
//             transform: translateY(-4px);
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default WatcherBot;




// "use client";
// import React, { useEffect, useRef, useState } from "react";

// interface Point {
//   x: number;
//   y: number;
// }

// const EYE_TRAVEL = 5;
// const EYE_EASE = 0.2;
// const MOUTH_EASE = 0.16;

// const WatcherBot: React.FC = () => {
//   const botRef = useRef<HTMLDivElement>(null);

//   const cursorRef = useRef<Point>({
//     x: 0,
//     y: 0,
//   });

//   const pupilRef = useRef<Point>({
//     x: 0,
//     y: 0,
//   });

//   const [pupilOffset, setPupilOffset] = useState<Point>({
//     x: 0,
//     y: 0,
//   });

//   const [isBlinking, setIsBlinking] = useState(false);
//   const [isHovered, setIsHovered] = useState(false);

//   const [mouthProgress, setMouthProgress] = useState(0);

//   const mouthTargetRef = useRef(0);

//   /*
//    * ---------------------------------------------------------
//    * MOUSE TRACKING
//    * ---------------------------------------------------------
//    *
//    * Mouse position is stored immediately.
//    * The eyes then follow it every animation frame.
//    *
//    * This makes the eyes continue moving smoothly while the
//    * mouse itself is in motion.
//    */

//   useEffect(() => {
//     const handleMouseMove = (event: MouseEvent) => {
//       cursorRef.current = {
//         x: event.clientX,
//         y: event.clientY,
//       };
//     };

//     window.addEventListener("mousemove", handleMouseMove, {
//       passive: true,
//     });

//     let animationFrame: number;

//     const animateEyes = () => {
//       const bot = botRef.current;

//       if (bot) {
//         const rect = bot.getBoundingClientRect();

//         // Approximate center of the robot's face
//         const faceCenterX = rect.left + rect.width / 2;
//         const faceCenterY = rect.top + rect.height * 0.35;

//         const dx = cursorRef.current.x - faceCenterX;
//         const dy = cursorRef.current.y - faceCenterY;

//         const distance = Math.sqrt(dx * dx + dy * dy);

//         if (distance > 0.01) {
//           const directionX = dx / distance;
//           const directionY = dy / distance;

//           /*
//            * Farther cursor = greater pupil movement.
//            * Close cursor = smaller pupil movement.
//            */
//           const strength = Math.min(distance / 100, 1);

//           const targetX =
//             directionX * EYE_TRAVEL * strength;

//           const targetY =
//             directionY * EYE_TRAVEL * strength;

//           pupilRef.current.x +=
//             (targetX - pupilRef.current.x) * EYE_EASE;

//           pupilRef.current.y +=
//             (targetY - pupilRef.current.y) * EYE_EASE;

//           setPupilOffset({
//             x: pupilRef.current.x,
//             y: pupilRef.current.y,
//           });
//         }
//       }

//       animationFrame =
//         requestAnimationFrame(animateEyes);
//     };

//     animationFrame =
//       requestAnimationFrame(animateEyes);

//     return () => {
//       window.removeEventListener(
//         "mousemove",
//         handleMouseMove
//       );

//       cancelAnimationFrame(animationFrame);
//     };
//   }, []);

//   /*
//    * ---------------------------------------------------------
//    * HOVER / MOUTH ANIMATION
//    * ---------------------------------------------------------
//    */

//   useEffect(() => {
//     mouthTargetRef.current = isHovered ? 1 : 0;
//   }, [isHovered]);

//   useEffect(() => {
//     let animationFrame: number;

//     const animateMouth = () => {
//       setMouthProgress((current) => {
//         const target = mouthTargetRef.current;

//         const next =
//           current +
//           (target - current) * MOUTH_EASE;

//         return Math.abs(target - next) < 0.001
//           ? target
//           : next;
//       });

//       animationFrame =
//         requestAnimationFrame(animateMouth);
//     };

//     animationFrame =
//       requestAnimationFrame(animateMouth);

//     return () =>
//       cancelAnimationFrame(animationFrame);
//   }, []);

//   /*
//    * ---------------------------------------------------------
//    * BLINK
//    * ---------------------------------------------------------
//    */

//   useEffect(() => {
//     let timeout: ReturnType<typeof setTimeout>;

//     const scheduleBlink = () => {
//       const delay =
//         2600 + Math.random() * 3200;

//       timeout = setTimeout(() => {
//         setIsBlinking(true);

//         setTimeout(() => {
//           setIsBlinking(false);
//         }, 120);

//         scheduleBlink();
//       }, delay);
//     };

//     scheduleBlink();

//     return () => clearTimeout(timeout);
//   }, []);

//   /*
//    * ---------------------------------------------------------
//    * ROBOT MOUTH
//    * ---------------------------------------------------------
//    *
//    * A simple mechanical mouth.
//    *
//    * Neutral:
//    * ─────────
//    *
//    * Hover:
//    * ──╲___╱──
//    */

//   const mouthY =
//     78 + mouthProgress * 8;

//   const mouthPath = `
//     M47 78
//     Q60 ${mouthY} 73 78
//   `;

//   return (
//     <div
//       className="
//         fixed
//         translate-y-8
//         bottom-0
//         right-3
//         z-50
//         flex
//         flex-row-reverse
//         items-end
//         gap-3
//         scale-80
//       "
//     >
//       {/* =====================================================
//           ROBOT
//           ===================================================== */}

//       <div
//         ref={botRef}
//         onMouseEnter={() => setIsHovered(true)}
//         onMouseLeave={() => setIsHovered(false)}
//         className="
//           relative
//           h-32
//           w-28
//           cursor-pointer
//           animate-[bot-float_4.2s_ease-in-out_infinite]
//           transition duration-300
//             hover:scale-110
//             hover:-translate-y-2
//         "
//       >
//         <svg
//           viewBox="0 0 120 145"
//           className="
//             h-full
//             w-full
//             overflow-visible
//             drop-shadow-[0_10px_16px_rgba(0,0,0,0.18)]
//           "
//         >

//           {/* =================================================
//               ANTENNA
//               ================================================= */}

//           <line
//             x1="60"
//             y1="13"
//             x2="60"
//             y2="3"
//             stroke="#000"
//             strokeWidth="3"
//             strokeLinecap="round"
//           />

//           <circle
//             cx="60"
//             cy="3"
//             r="3"
//             fill="#fff"
//             stroke="#000"
//             strokeWidth="2"
//           />

//           {/* =================================================
//               LEFT SIDE CONNECTOR
//               ================================================= */}

//           <rect
//             x="5"
//             y="51"
//             width="7"
//             height="14"
//             rx="3"
//             fill="#fff"
//             stroke="#000"
//             strokeWidth="2.5"
//           />

//           {/* =================================================
//               RIGHT SIDE CONNECTOR
//               ================================================= */}

//           <rect
//             x="108"
//             y="51"
//             width="7"
//             height="14"
//             rx="3"
//             fill="#fff"
//             stroke="#000"
//             strokeWidth="2.5"
//           />

//           {/* =================================================
//               ROBOT HEAD
              
//               Rounded rectangular shape.
              
//               No eyebrows.
//               No cheeks.
//               No decorative facial elements.
//               ================================================= */}

//           <rect
//             x="10"
//             y="14"
//             width="100"
//             height="88"
//             rx="25"
//             className="fill-[var(--background)]"
//             stroke="#000"
//             strokeWidth="3"
//             style={{
//               transform: isHovered
//                 ? "scale(1.015)"
//                 : "scale(1)",
//               transformOrigin: "60px 58px",
//               transition:
//                 "transform 220ms ease",
//             }}
//           />

//           {/* =================================================
//               ROBOT EYES
//               ================================================= */}

//           <g
//             style={{
//               transform: `scaleY(${
//                 isBlinking ? 0.08 : 1
//               })`,
//               transformOrigin: "44px 55px",
//               transition:
//                 "transform 100ms ease",
//             }}
//           >
//             <circle
//               cx={44 + pupilOffset.x}
//               cy={55 + pupilOffset.y}
//               r="6"
//               fill="#000"
//             />
//           </g>

//           <g
//             style={{
//               transform: `scaleY(${
//                 isBlinking ? 0.08 : 1
//               })`,
//               transformOrigin: "76px 55px",
//               transition:
//                 "transform 100ms ease",
//             }}
//           >
//             <circle
//               cx={76 + pupilOffset.x}
//               cy={55 + pupilOffset.y}
//               r="6"
//               fill="#000"
//             />
//           </g>

//           {/* =================================================
//               ROBOT MOUTH
//               ================================================= */}

//           <path
//             d={mouthPath}
//             fill="none"
//             stroke="#000"
//             strokeWidth="3.5"
//             strokeLinecap="round"
//           />

//           {/* =================================================
//               NECK
//               ================================================= */}

//           <rect
//             x="49"
//             y="98"
//             width="22"
//             height="13"
//             rx="5"
//             className="fill-[var(--background)]"
//             stroke="#000"
//             strokeWidth="3"
//           />

//           {/* =================================================
//               SMALL ROBOT BODY
//               ================================================= */}

//           <path
//             d="
//               M22 145
//               C22 122 38 109 60 109
//               C82 109 98 122 98 145
//             "
//             className="fill-[var(--background)]"
//             stroke="#000"
//             strokeWidth="3"
//           />



          

//         </svg>
//       </div>

//       {/* =====================================================
//           SPEECH BUBBLE
//           ===================================================== */}

//       <div
//         className="relative mb-16 pointer-events-none"
//         style={{
//           opacity: isHovered ? 1 : 0,

//           transform: isHovered
//             ? "translateX(0) scale(1)"
//             : "translateX(10px) scale(0.9)",

//           transition:
//             "opacity 220ms ease, transform 220ms cubic-bezier(0.34, 1.56, 0.64, 1)",

//           pointerEvents: "none",
//         }}
//       >
//         <div
//           className="
//             rounded-xl
//             border-2
//             border-black
//             bg-white
//             px-4
//             py-2
//             whitespace-nowrap
//           "
//         >
//           <span
//             className="
//               text-sm
//               font-medium
//               tracking-tight
//               text-black
//             "
//           >
//             Ask me anything
//           </span>
//         </div>

//         {/* Bubble tail */}

//         <div
//           className="
//             absolute
//             top-1/2
//             -right-[7px]
//             h-0
//             w-0
//             -translate-y-1/2
//           "
//           style={{
//             borderTop:
//               "6px solid transparent",
//             borderBottom:
//               "6px solid transparent",
//             borderLeft:
//               "7px solid black",
//           }}
//         />

//         <div
//           className="
//             absolute
//             top-1/2
//             -right-[4px]
//             h-0
//             w-0
//             -translate-y-1/2
//           "
//           style={{
//             borderTop:
//               "5px solid transparent",
//             borderBottom:
//               "5px solid transparent",
//             borderLeft:
//               "6px solid white",
//           }}
//         />
//       </div>

//       {/* =====================================================
//           FLOATING ANIMATION
//           ===================================================== */}

//       <style>{`
//         @keyframes bot-float {
//           0%, 100% {
//             transform: translateY(0px);
//           }

//           50% {
//             transform: translateY(-4px);
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default WatcherBot;












