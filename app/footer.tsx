"use client";

import React, { useEffect, useState } from "react";
import { ArrowUp, MapPin } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      setTime(
        new Intl.DateTimeFormat("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }).format(new Date())
      );
    };

    updateTime();

    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer
      className="
      mt-30
        relative
        w-full
        overflow-hidden
        border-t
        border-[var(--foreground)]/20
        pt-8
        pb-8
        select-none
      "
    >
      {/* =====================================================
          TOP META ROW
      ===================================================== */}

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          flex
          items-start
          justify-between
          gap-6
        "
      >
        {/* Closing text */}

        <p
          className="
            max-w-[220px]
            text-xs
            leading-5
            tracking-[-0.01em]
            text-[var(--foreground)]/45
            sm:max-w-xs
            sm:text-sm
          "
        >
          Designed and developed with curiosity,
          attention to detail, and a lot of coffee.
        </p>

        {/* Back to top */}

        <button
          onClick={scrollToTop}
          className="
            group
            flex
            shrink-0
            items-center
            gap-3
            text-[10px]
            font-medium
            uppercase
            tracking-[0.22em]
            text-[var(--foreground)]/50
            transition-colors
            duration-300
            hover:text-[var(--foreground)]
            target-hand
          "
        >
          <span className="hidden sm:block">
            Back to top
          </span>

          <span
            className="
              flex
              size-10
              items-center
              justify-center
              rounded-full
              border
              border-[var(--foreground)]/15
              transition-all
              duration-500
              group-hover:-translate-y-1
              group-hover:border-[#ff5a36]
              group-hover:text-[#ff5a36]
            "
          >
            <ArrowUp
              size={16}
              strokeWidth={1.5}
            />
          </span>
        </button>
      </motion.div>

      {/* =====================================================
          LARGE WORDMARK
      ===================================================== */}

      <motion.div
        initial={{
          opacity: 0,
          y: 50,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
          amount: 0.25,
        }}
        transition={{
          duration: 1.1,
          delay: 0.1,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          mt-16
          overflow-hidden
          border-b
          border-[var(--foreground)]/20
          pb-4
          sm:mt-24
          lg:mt-32
        "
      >
        <div
          className="
            bricolage-grotesque
            select-none
            text-[18vw]
            font-medium
            leading-[0.7]
            tracking-[-0.09em]
            text-[var(--foreground)]
            sm:text-[17vw]
          "
        >
          PRANAY
        </div>
      </motion.div>

      {/* =====================================================
          BOTTOM INFORMATION
      ===================================================== */}

      <motion.div
        initial={{
          opacity: 0,
          y: 12,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
        }}
        transition={{
          duration: 0.8,
          delay: 0.25,
        }}
        className="
          flex
          flex-col
          gap-6
          pt-6
          text-[10px]
          uppercase
          tracking-[0.2em]
          text-[var(--foreground)]/40
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        {/* Copyright */}

        <div className="flex items-center gap-2">
          <span>© {new Date().getFullYear()}</span>

          <span
            className="
              size-1
              rounded-full
              bg-[#ff5a36]
            "
          />

          <span>Pranay Prasad</span>
        </div>

        {/* Right information */}

        <div
          className="
            flex
            flex-wrap
            items-center
            gap-x-6
            gap-y-4
          "
        >
          {/* Time */}

          <div
            className="
              flex
              items-center
              gap-2
              tabular-nums
            "
          >
            <span
              className="
                size-1.5
                animate-pulse
                rounded-full
                bg-[#ff5a36]
              "
            />

            <span>{time} IST</span>
          </div>

          {/* Location */}

          <div
            className="
              flex
              items-center
              gap-2
            "
          >
            <MapPin
              size={13}
              strokeWidth={1.5}
            />

            <span>Gurgaon, India</span>
          </div>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;


// "use client";

// import React, { useEffect, useState } from "react";
// import { ArrowUpRight, MapPin } from "lucide-react";

// const Footer = () => {
//   const [time, setTime] = useState("");

//   useEffect(() => {
//     const updateTime = () => {
//   setTime(
//     new Intl.DateTimeFormat("en-IN", {
//       timeZone: "Asia/Kolkata",
//       hour: "2-digit",
//       minute: "2-digit",
//       second: "2-digit",
//       hour12: false,
//     }).format(new Date())
//   );
// };

//     updateTime();

//     const interval = setInterval(updateTime, 1000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <footer className="w-full py-8 user-select-none">
//       <div className="h-px w-full bg-gray-200 mb-7 xl:mb-15" />

//       <div className="flex flex-row items-start sm:items-center justify-between gap-5 text-sm lg:pb-8">
        
//         {/* Copyright */}
//         <div className="group cursor-default">
//           <span className="text-[var(--foreground)]/50 text-sm sm:text-base font-light transition-colors duration-300 group-hover:text-[var(--foreground)]">
//             © 2026, {" "}
//           </span>

//           <span className="relative text-sm sm:text-base text-[var(--foreground)]/50 font-light transition-colors duration-300 group-hover:text-[#ff5a36]">
//             Pranay Prasad
//             <span
//               className="
//                 absolute
//                 left-0
//                 -bottom-1
//                 h-px
//                 w-0
//                 bg-[#ff5a36]
//                 transition-all
//                 duration-300
//                 group-hover:w-full
//               "
//             />
//           </span>
//         </div>


//         {/* Time */}
//         <div className="group cursor-default">
//           <span
//             className="
//               text-[var(--foreground)]/50
//               tabular-nums
//               transition-all
//               font-light
//               text-sm sm:text-base
//               duration-300
//               group-hover:text-[var(--foreground)]
//             "
//           >
//             {time} IST
//           </span>
//         </div>

//         {/* Location */}
//         <div
//           className="
//             group
//             flex
//             items-center
//             gap-1.5
//             cursor-default
//             text-[var(--foreground)]/50
//             font-light
//             text-sm sm:text-base
//             transition-colors
//             duration-300
//             hover:text-gray-900
//           "
//         >
//           <MapPin
//             className="
//               h-4
//               w-4
//               transition-transform
//               duration-300
//               group-hover:-translate-y-0.5
//             "
//           />

//           <span
//             className="
//               transition-transform
//               duration-300
//               group-hover:translate-x-0.5
//             "
//           >
//             Gurgaon, India
//           </span>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;