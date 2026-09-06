
/* =============================================================
   HOVER WORD
============================================================= */

// type HoverWordProps = {
//   text: string;
//   className?: string;
// };

// export default function HoverWord({
//   text,
//   className = "",
// }: HoverWordProps) {
//   return (
//     <span
//       className="
//         group
//         relative
//         inline-block
//         cursor-none
//         overflow-hidden
//       "
//     >
//       {text.split("").map((char, index) => (
//         <span
//           key={`${char}-${index}`}
//           className="
//             inline-block
//             align-bottom
//             animate-word-reveal
//             group-hover:-translate-y-[3px]
//             transition-transform
//             duration-500
//             ease-[cubic-bezier(0.22,1,0.36,1)]
//           "
//           style={{
//             animationDelay: `${index * 20}ms`,
//           }}
//         >
//           <span
//             className={`
//               inline-block
//               -tracking-[0.2rem]
//               ${className}
//             `}
//           >
//             {char === " " ? "\u00A0" : char}
//           </span>
//         </span>
//       ))}
//     </span>
//   );
// }

"use client";
import {motion} from "framer-motion";

export default function HoverWord({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  return (
    <span
      className="
        group
        relative
        inline-block
        cursor-none
        overflow-hidden
      "
    >

      {text.split("").map((char, index) => (
         <span
          key={`${char}-${index}`}
          style={{ transitionDelay: `${index * 15}ms`,}}
          className="inline-block group-hover:-translate-y-[3px] align-bottom transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
        >
        <motion.span
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            viewport={{
              once: false,
            }}
            transition={{
              duration: 1,
              delay: index * 0.02,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={`inline-block -tracking-[0.2rem] ${className} `}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
          </span>
      ))}

    </span>
  );
}
{/* <span
  key={`${char}-${index}`}
  className="
    inline-block
    transition-transform
    duration-500
    ease-[cubic-bezier(0.22,1,0.36,1)]

    group-hover:-translate-y-[3px]
  "
  style={{
    transitionDelay: `${index * 15}ms`,
  }}
>
  {char === " " ? "\u00A0" : char}
</span> */}