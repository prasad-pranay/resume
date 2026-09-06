"use client";

import { useEffect, useState } from "react";

interface TypewriterProps {
  text: string;
  speed?: number;
  cursor?: boolean;
}

export default function Typewriter({
  text,
  speed = 60,
  cursor = true,
}: TypewriterProps) {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    setDisplayText("");

    let index = 0;

    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayText(text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
      }
    }, speed)

    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <span>
      {displayText}
      {cursor && (
        <span className="ml-0.5 animate-[blink-cursor_1s_linear_infinite] text-[#ff5a36]">
          |
        </span>
      )}
    </span>
  );
}