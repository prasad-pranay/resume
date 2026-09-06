



// "use client";

// import React from "react";

// const RunningBot = () => {
//   return (
//     <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden">
//       <div className="bot-runner absolute left-0 top-0">
//         <svg
//           viewBox="0 0 150 185"
//           className="
//             h-[120px]
//             w-[96px]
//             overflow-visible
//             drop-shadow-[0_12px_14px_rgba(0,0,0,0.16)]
//           "
//         >
//           {/* =====================================================
//               BACK LEGS
//           ====================================================== */}

//           <g className="bot-leg-left">
//             <rect
//               x="42"
//               y="132"
//               width="18"
//               height="30"
//               rx="9"
//               className="fill-[var(--background)] stroke-[var(--foreground)]"
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
//               className="fill-[var(--background)] stroke-[var(--foreground)]"
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
//               className="fill-[var(--background)] stroke-[var(--foreground)]"
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
//               className="fill-[var(--background)] stroke-[var(--foreground)]"
//               strokeWidth="3"
//             />
//           </g>

//           {/* =====================================================
//               LEFT ARM
//           ====================================================== */}

//           <g className="bot-arm-left">
//             <circle
//               cx="22"
//               cy="104"
//               r="10"
//               className="fill-[var(--background)] stroke-[var(--foreground)]"
//               strokeWidth="3"
//             />

//             <rect
//               x="13"
//               y="104"
//               width="18"
//               height="32"
//               rx="9"
//               className="fill-[var(--background)] stroke-[var(--foreground)]"
//               strokeWidth="3"
//               transform="rotate(20 22 104)"
//             />

//             <circle
//               cx="16"
//               cy="137"
//               r="8"
//               className="fill-[var(--background)] stroke-[var(--foreground)]"
//               strokeWidth="3"
//             />
//           </g>

//           {/* =====================================================
//               RIGHT ARM
//           ====================================================== */}

//           <g className="bot-arm-right">
//             <circle
//               cx="128"
//               cy="104"
//               r="10"
//               className="fill-[var(--background)] stroke-[var(--foreground)]"
//               strokeWidth="3"
//             />

//             <rect
//               x="119"
//               y="104"
//               width="18"
//               height="32"
//               rx="9"
//               className="fill-[var(--background)] stroke-[var(--foreground)]"
//               strokeWidth="3"
//               transform="rotate(-20 128 104)"
//             />

//             <circle
//               cx="134"
//               cy="137"
//               r="8"
//               className="fill-[var(--background)] stroke-[var(--foreground)]"
//               strokeWidth="3"
//             />
//           </g>

//           {/* =====================================================
//               BODY
//           ====================================================== */}

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
//             className="fill-[var(--background)] stroke-[var(--foreground)]"
//             strokeWidth="3"
//           />

//           {/* Chest panel */}

//           <rect
//             x="47"
//             y="112"
//             width="56"
//             height="25"
//             rx="10"
//             className="fill-[var(--background)] stroke-[var(--foreground)]"
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

//           {/* =====================================================
//               NECK
//           ====================================================== */}

//           <rect
//             x="54"
//             y="83"
//             width="42"
//             height="18"
//             rx="8"
//             className="fill-[var(--background)] stroke-[var(--foreground)]"
//             strokeWidth="3"
//           />

//           {/* =====================================================
//               HEAD
//           ====================================================== */}

//           <g className="bot-head">
//             {/* antenna */}

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
//               className="fill-[var(--background)] stroke-[var(--foreground)]"
//               strokeWidth="2.5"
//             />

//             {/* ears */}

//             <rect
//               x="19"
//               y="48"
//               width="9"
//               height="20"
//               rx="4"
//               className="fill-[var(--background)] stroke-[var(--foreground)]"
//               strokeWidth="2.5"
//             />

//             <rect
//               x="122"
//               y="48"
//               width="9"
//               height="20"
//               rx="4"
//               className="fill-[var(--background)] stroke-[var(--foreground)]"
//               strokeWidth="2.5"
//             />

//             {/* head */}

//             <rect
//               x="25"
//               y="18"
//               width="100"
//               height="78"
//               rx="27"
//               className="fill-[var(--background)] stroke-[var(--foreground)]"
//               strokeWidth="3"
//             />

//             {/* eyes */}

//             <circle
//               cx="58"
//               cy="53"
//               r="7"
//               className="fill-[var(--foreground)]"
//             />

//             <circle
//               cx="92"
//               cy="53"
//               r="7"
//               className="fill-[var(--foreground)]"
//             />

//             {/* smile */}

//             <path
//               d="M57 76 Q75 88 93 76"
//               fill="none"
//               className="stroke-[var(--foreground)]"
//               strokeWidth="3.5"
//               strokeLinecap="round"
//             />
//           </g>
//         </svg>
//       </div>

      
//     </div>
//   );
// };

// export default RunningBot;



// <style>{`
//         /* =====================================================
//            DIAGONAL MOVEMENT + CAMERA APPROACH
//         ====================================================== */

//         @keyframes botTravel {
//           0% {
//             transform:
//               translate(-130px, -130px)
//               scale(0.45);
//           }

//           25% {
//             transform:
//               translate(18vw, 18vh)
//               scale(0.58);
//           }

//           50% {
//             transform:
//               translate(40vw, 40vh)
//               scale(0.72);
//           }

//           75% {
//             transform:
//               translate(66vw, 66vh)
//               scale(0.9);
//           }

//           100% {
//             transform:
//               translate(
//                 calc(100vw - 110px),
//                 calc(100vh - 150px)
//               )
//               scale(1.25);
//           }
//         }

//         .bot-runner {
//           animation:
//             botTravel
//             6s
//             cubic-bezier(0.45, 0, 0.55, 1)
//             forwards;
//         }

//         /* =====================================================
//            RUNNING ARMS
//         ====================================================== */

//         @keyframes leftArmRun {
//           0%,
//           100% {
//             transform: rotate(32deg);
//             transform-origin: 22px 104px;
//           }

//           50% {
//             transform: rotate(-38deg);
//             transform-origin: 22px 104px;
//           }
//         }

//         @keyframes rightArmRun {
//           0%,
//           100% {
//             transform: rotate(-32deg);
//             transform-origin: 128px 104px;
//           }

//           50% {
//             transform: rotate(38deg);
//             transform-origin: 128px 104px;
//           }
//         }

//         /* =====================================================
//            RUNNING LEGS
//         ====================================================== */

//         @keyframes leftLegRun {
//           0%,
//           100% {
//             transform: rotate(32deg);
//             transform-origin: 51px 137px;
//           }

//           50% {
//             transform: rotate(-38deg);
//             transform-origin: 51px 137px;
//           }
//         }

//         @keyframes rightLegRun {
//           0%,
//           100% {
//             transform: rotate(-38deg);
//             transform-origin: 99px 137px;
//           }

//           50% {
//             transform: rotate(32deg);
//             transform-origin: 99px 137px;
//           }
//         }

//         /* =====================================================
//            HEAD BOB
//         ====================================================== */

//         @keyframes headBob {
//           0%,
//           100% {
//             transform: translateY(0) rotate(0deg);
//           }

//           50% {
//             transform: translateY(-4px) rotate(-2deg);
//           }
//         }

//         .bot-arm-left {
//           animation: leftArmRun 420ms ease-in-out infinite;
//         }

//         .bot-arm-right {
//           animation: rightArmRun 420ms ease-in-out infinite;
//         }

//         .bot-leg-left {
//           animation: leftLegRun 420ms ease-in-out infinite;
//         }

//         .bot-leg-right {
//           animation: rightLegRun 420ms ease-in-out infinite;
//         }

//         .bot-head {
//           animation: headBob 420ms ease-in-out infinite;
//           transform-origin: 75px 80px;
//         }

//         @media (prefers-reduced-motion: reduce) {
//           .bot-runner,
//           .bot-arm-left,
//           .bot-arm-right,
//           .bot-leg-left,
//           .bot-leg-right,
//           .bot-head {
//             animation: none;
//           }
//         }
//       `}</style>