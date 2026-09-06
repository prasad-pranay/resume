"use client";
import { motion } from "framer-motion";

const HeadingTitle = ({title,value}:{title:string,value:string}) => {
  return (
    <div className="group mb-8 flex w-fit items-center gap-3 overflow-hidden select-none">

      <motion.span
        initial={{ y: 15 }}
        whileInView={{ y: 0 }}
        viewport={{
          once: false,
        }}
        transition={{
            duration: 0.4,
            ease: [0.22, 1, 0.36, 1],
            delay:0.5
        }}
        className="
          text-[10px]
          font-medium
          uppercase
          tracking-[0.28em]
          text-[var(--foreground)]/55
          transition-all
          duration-500
          group-hover:tracking-[0.36em]
          group-hover:text-[var(--foreground)]
        "
      >
        {title}
      </motion.span>

      <motion.span
        initial={{ scaleX: 0 , x:"50%"}}
        whileInView={{ scaleX: 1,x:0 }}
        viewport={{
          once: false,
        }}
        transition={{
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
        }}
        className="
          h-px
          w-8
          origin-left
          bg-[var(--foreground)]/50
          transition-all
          duration-500
          group-hover:w-14
          group-hover:bg-[var(--foreground)]
        "
      />

      <motion.p
        initial={{ y: 10 }}
        whileInView={{ y: 0 }}
        viewport={{
          once: false,
        }}
        transition={{
            duration: 0.4,
            ease: [0.22, 1, 0.36, 1],
        }}
        className="
          text-[9px]
          font-light
          text-[var(--foreground)]
          transition-all
          duration-500
          group-hover:text-[#ff5a36]
        "
      >
        {value}
      </motion.p>
      <span
        className="
          text-[9px]
          font-light
          text-[var(--foreground)]
          transition-all
          duration-500
          group-hover:text-[#ff5a36]
          opacity-0 pointer-events-none
        "
      >
        {value}
      </span>
    </div>
  )
}

export default HeadingTitle






// aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa

// const HeadingTitle = ({
//   title,
//   value,
// }: {
//   title: string;
//   value: string;
// }) => {
//   return (
//     <div className="group mb-8 flex w-fit items-center gap-3 overflow-hidden select-none">
//       {/* Title */}
//       <span
//         className="
//           animate-heading-title
//           text-[10px]
//           font-medium
//           uppercase
//           tracking-[0.28em]
//           text-[var(--foreground)]/55
//           transition-all
//           duration-500
//           group-hover:tracking-[0.36em]
//           group-hover:text-[var(--foreground)]
//         "
//       >
//         {title}
//       </span>

//       {/* Line */}
//       <span
//         className="
//           h-px
//           w-8
//           origin-left
//           animate-heading-line
//           bg-[var(--foreground)]/50
//           transition-all
//           duration-500
//           group-hover:w-14
//           group-hover:bg-[var(--foreground)]
//         "
//       />

//       {/* Value */}
//       <span
//         className="
//           animate-heading-value
//           text-[9px]
//           font-light
//           text-[var(--foreground)]
//           transition-all
//           duration-500
//           group-hover:text-[#ff5a36]
//         "
//       >
//         {value}
//       </span>

//       {/* Invisible sizing element */}
//       <span
//         className="
//           pointer-events-none
//           absolute
//           text-[9px]
//           font-light
//           opacity-0
//         "
//         aria-hidden="true"
//       >
//         {value}
//       </span>
//     </div>
//   );
// };

// export default HeadingTitle;