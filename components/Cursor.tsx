"use client";

import React, { useEffect, useRef, useState } from "react";

type CursorProps = {
  isFocused?: boolean;
};

const Cursor = ({ isFocused = false }: CursorProps) => {
  const cursorRef = useRef<HTMLDivElement>(null);

  const mouse = useRef({ x: 0, y: 0 });
  const position = useRef({ x: 0, y: 0 });

  const [whichCursor, setWhichCursor] = useState<
    "normal" | "hand" | "text"
  >("normal");

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    let animationFrame: number;

    const animate = () => {
      // Similar to GSAP's smooth movement
      position.current.x +=
        (mouse.current.x - position.current.x) * 1;

      position.current.y +=
        (mouse.current.y - position.current.y) * 1;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `
          translate3d(
            ${position.current.x}px,
            ${position.current.y}px,
            0
          )
        `;
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  useEffect(() => {
    const handTargets = document.querySelectorAll(".target-hand");
    const textTargets = document.querySelectorAll(".target-text");

    const handleHandEnter = () => setWhichCursor("hand");
    const handleHandLeave = () => setWhichCursor("normal");

    const handleTextEnter = () => setWhichCursor("text");
    const handleTextLeave = () => setWhichCursor("normal");

    handTargets.forEach((el) => {
      el.addEventListener("mouseenter", handleHandEnter);
      el.addEventListener("mouseleave", handleHandLeave);
    });

    textTargets.forEach((el) => {
      el.addEventListener("mouseenter", handleTextEnter);
      el.addEventListener("mouseleave", handleTextLeave);
    });

    return () => {
      handTargets.forEach((el) => {
        el.removeEventListener("mouseenter", handleHandEnter);
        el.removeEventListener("mouseleave", handleHandLeave);
      });

      textTargets.forEach((el) => {
        el.removeEventListener("mouseenter", handleTextEnter);
        el.removeEventListener("mouseleave", handleTextLeave);
      });
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      style={{
        mixBlendMode: "difference",
        willChange: "transform",
      }}
      className="pointer-events-none fixed top-0 left-0 z-[20000] hidden sm:block"
    >
      <div className={isFocused ? "" : "cursor-idle"}>
        {whichCursor === "normal" && (
          <svg
            viewBox="0 0 12 14"
            fill="none"
            className="size-5"
          >
            <g transform="translate(-7, -6)">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13.405 17.374c-1.288 2.801-5.457 2.07-5.715-1.002l-.58-6.915c-.213-2.529 2.616-4.163 4.7-2.714l5.698 3.96c2.532 1.76 1.08 5.736-1.99 5.45l-.783-.072a1 1 0 0 0-1.001.578z"
                fill="#fff"
              />
            </g>
          </svg>
        )}

        {whichCursor === "hand" && (
          <svg
            viewBox="0 0 29 32"
            className="size-5 translate-x-[-5px]"
          >
            <g transform="translate(-3,-1.6)">
              <path
                fill="#fff"
                d="M30.74,15.19a13.66,13.66,0,0,0-6.87-3.83A26,26,0,0,0,18,10.58V5.28A3.4,3.4,0,0,0,14.5,2,3.4,3.4,0,0,0,11,5.28v10L9.4,13.7a3.77,3.77,0,0,0-5.28,0A3.67,3.67,0,0,0,3,16.33a3.6,3.6,0,0,0,1,2.56l4.66,5.52a11.53,11.53,0,0,0,1.43,4,10.12,10.12,0,0,0,2,2.54v1.92a1.07,1.07,0,0,0,1,1.08H27a1.07,1.07,0,0,0,1-1.08v-2.7a12.81,12.81,0,0,0,3-8.36v-6A1,1,0,0,0,30.74,15.19ZM29,21.86a10.72,10.72,0,0,1-2.6,7.26,1.11,1.11,0,0,0-.4.72V32H14.14V30.52a1,1,0,0,0-.44-.83,7.26,7.26,0,0,1-1.82-2.23,9.14,9.14,0,0,1-1.2-3.52,1,1,0,0,0-.23-.59L5.53,17.53a1.7,1.7,0,0,1,0-2.42,1.76,1.76,0,0,1,2.47,0l3,3v3.14l2-1V5.28A1.42,1.42,0,0,1,14.5,4,1.42,1.42,0,0,1,16,5.28v11.8l2,.43V12.59a24.27,24.27,0,0,1,2.51.18V18l1.6.35V13c.41.08.83.17,1.26.28a14.88,14.88,0,0,1,1.53.49v5.15l1.6.35V14.5A11.06,11.06,0,0,1,29,16.23Z"
              />
            </g>
          </svg>
        )}

        {whichCursor === "text" && (
          <svg
            viewBox="0 0 6 16"
            fill="#fff"
            className="size-5"
          >
            <g transform="translate(-5,0)">
              <path d="M5 2a.5.5 0 0 1 .5-.5c.862 0 1.573.287 2.06.566.174.099.321.198.44.286.119-.088.266-.187.44-.286A4.165 4.165 0 0 1 10.5 1.5a.5.5 0 0 1 0 1c-.638 0-1.177.213-1.564.434a3.49 3.49 0 0 0-.436.294V7.5H9a.5.5 0 0 1 0 1h-.5v4.272c.1.08.248.187.436.294.387.221.926.434 1.564.434a.5.5 0 0 1 0 1 4.165 4.165 0 0 1-2.06-.566A4.561 4.561 0 0 1 8 13.65a4.561 4.561 0 0 1-.44.285 4.165 4.165 0 0 1-2.06.566.5.5 0 0 1 0-1c.638 0 1.177-.213 1.564-.434.188-.107.335-.214.436-.294V8.5H7a.5.5 0 0 1 0-1h.5V3.228a3.49 3.49 0 0 0-.436-.294A3.166 3.166 0 0 0 5.5 2.5.5.5 0 0 1 5 2z" />
            </g>
          </svg>
        )}
      </div>
    </div>
  );
};

export default Cursor;