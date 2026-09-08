"use client";

import { useEffect } from "react";
import Lenis from "lenis";

let lenis: Lenis | null = null;

export const scrollTo = (
  target: string | number,
  options?: {
    duration?: number;
    offset?: number;
  }
) => {
  lenis?.scrollTo(target, {
    duration: options?.duration ?? 1.2,
    offset: options?.offset ?? 0,
  });
};

export default function SmoothScroll() {
  useEffect(() => {
    lenis = new Lenis({
      duration: 1.2,

      // Desktop / mouse wheel
      smoothWheel: true,

      // Let mobile use native touch scrolling
      syncTouch: false,

      prevent: (node) => {
        return node.closest("[data-lenis-prevent]") !== null;
      },
    });

    let animationFrame: number;

    const raf = (time: number) => {
      lenis?.raf(time);
      animationFrame = requestAnimationFrame(raf);
    };

    animationFrame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrame);

      lenis?.destroy();
      lenis = null;
    };
  }, []);

  return null;
}

// "use client";

// import { useEffect } from "react";
// import Lenis from "lenis";

// let lenis: Lenis | null = null;

// export const scrollTo = (
//   target: string | number,
//   options?: {
//     duration?: number;
//     offset?: number;
//   }
// ) => {
//   lenis?.scrollTo(target, {
//     duration: options?.duration ?? 1.2,
//     offset: options?.offset ?? 0,
//   });
// };

// export default function SmoothScroll() {
//   useEffect(() => {
//     lenis = new Lenis({
//       duration: 1.2,
//       smoothWheel: true,
//       syncTouch: true,

//       prevent: (node) => {
//         return node.closest("[data-lenis-prevent]") !== null;
//       },
//     });

//     function raf(time: number) {
//       lenis?.raf(time);
//       requestAnimationFrame(raf);
//     }

//     requestAnimationFrame(raf);

//     return () => {
//       lenis?.destroy();
//       lenis = null;
//     };
//   }, []);

//   return null;
// }

// "use client";

// import { useEffect } from "react";
// import Lenis from "lenis";

// export default function SmoothScroll() {
//   useEffect(() => {
//     const lenis = new Lenis({
//       duration: 1.2,
//       smoothWheel: true,
//       syncTouch: true,
//       // Don't let Lenis handle scrolling inside these elements
//       prevent: (node) => {
//         return node.closest("[data-lenis-prevent]") !== null;
//       },
//     });

//     function raf(time: number) {
//       lenis.raf(time);
//       requestAnimationFrame(raf);
//     }

//     requestAnimationFrame(raf);

//     return () => {
//       lenis.destroy();
//     };
//   }, []);

//   return null;
// }