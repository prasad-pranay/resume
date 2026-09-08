"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedParagraphProps {
  children: ReactNode;
  className?: string;
}

export default function AnimatedParagraph({
  children,
  className = "",
}: AnimatedParagraphProps) {
  return (
    <motion.p
      initial={{
        opacity: 0,
        y: 16,
        filter: "blur(4px)",
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.p>
  );
}