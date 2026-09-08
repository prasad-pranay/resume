"use client";

import HoverWord from "@/components/hoverword";
import { motion } from "framer-motion";
import { scrollTo } from "@/components/SmoothScroll";
import { ArrowDownRight } from "lucide-react";
import ScrollReveal from "@/components/textreveal";

const About = () => {
  return (
    <section
      id="about"
      className="
        relative
        w-full
        bg-[var(--background)]
        px-6
        py-28
        sm:px-10
        sm:py-36
        lg:px-16
        xl:px-24
      "
    >
      <div className="mx-auto w-full max-w-[1500px]">
        {/* ============================================
            TOP LABEL
        ============================================= */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            mb-16
            flex
            items-center
            justify-between
            sm:mb-24
          "
        >
          <p
            className="
              text-[10px]
              font-medium
              uppercase
              tracking-[0.18em]
              text-[var(--foreground)]/35
            "
          >
            About me
          </p>

          <span
            className="
              text-[10px]
              tabular-nums
              tracking-[0.15em]
              text-[var(--foreground)]/25
            "
          >
            02
          </span>
        </motion.div>

        {/* ============================================
            MAIN HEADLINE
        ============================================= */}

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <h2
            className="
              max-w-5xl
              text-[clamp(2.8rem,6vw,6.5rem)]
              font-medium
              leading-[0.98]
              tracking-[-0.06em]
              text-[var(--foreground)]
            "
          >
            <HoverWord text="I" />{" "}
            <HoverWord text="care" />{" "}
            <HoverWord text="about" />{" "}
            <HoverWord text="how" />{" "}
            <HoverWord text="things" />{" "}
              <HoverWord text="work —" className="text-[#ff5a36]" />

            <br />

            <HoverWord text="and" />{" "}
            <HoverWord text="how" />{" "}
            <HoverWord text="they" />{" "}
              <HoverWord text="feel." className="text-[#ff5a36]" />

          </h2>
        </motion.div>

        {/* ============================================
            CONTENT AREA
        ============================================= */}

        <div
          className="
            mt-20
            grid
            gap-12
            lg:mt-28
            lg:grid-cols-[1.15fr_0.85fr]
            lg:gap-24
          "
        >
          {/* ============================================
              IMAGE
          ============================================= */}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              relative
              aspect-[4/3]
              overflow-hidden
              rounded-[2rem]
              bg-[var(--foreground)]/[0.04]
            "
          >
            <img
              src="/image.png"
              alt="Pranay Prasad"
              className="
                h-full
                w-full
                object-cover
                grayscale
                transition-all
                duration-700
                hover:scale-[1.02]
                hover:grayscale-0
              "
            />

            {/* Image label */}

            <div
              className="
                absolute
                bottom-5
                left-5
                rounded-full
                bg-[var(--background)]/80
                px-4
                py-2
                text-[10px]
                uppercase
                tracking-[0.15em]
                text-[var(--foreground)]/50
                backdrop-blur-md
              "
            >
              Pranay Prasad
            </div>
          </motion.div>

          {/* ============================================
              TEXT CONTENT
          ============================================= */}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.9,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              flex
              flex-col
              justify-between
              py-2
            "
          >
            {/* Description */}

            <div>
              <div
                className="
                  max-w-lg
                  text-xl
                  leading-[1.45]
                  tracking-[-0.025em]
                  text-[var(--foreground)]/75
                  sm:text-2xl
                "
              >
                <ScrollReveal>
                I'm a full-stack developer who enjoys turning
                ideas into simple, useful, and meaningful
                digital products.
                </ScrollReveal>
              </div>

              <div
                className="
                  mt-7
                  max-w-md
                  text-sm
                  leading-relaxed
                  text-[var(--foreground)]/45
                  sm:text-base
                "
              >
                <ScrollReveal>

                I work across design and development, focusing
                on the details that make an experience feel
                intuitive. From early ideas to finished products,
                I enjoy building things that people genuinely
                enjoy using.
                </ScrollReveal>
              </div>
            </div>

            {/* Bottom Information */}

            <div
              className="
                mt-14
                border-t
                border-[var(--foreground)]/[0.08]
                pt-7
              "
            >
              <div
                className="
                  grid
                  grid-cols-2
                  gap-8
                "
              >
                {/* Location */}

                <div>
                  <p
                    className="
                      text-[9px]
                      uppercase
                      tracking-[0.18em]
                      text-[var(--foreground)]/30
                    "
                  >
                    Based in
                  </p>

                  <div
                    className="
                      mt-2
                      text-sm
                      text-[var(--foreground)]/65
                    "
                  >
                    <HoverWord text="Gurgaon, India" className="tracking-[1px]"/>
                  </div>
                </div>

                {/* Focus */}

                <div>
                  <p
                    className="
                      text-[9px]
                      uppercase
                      tracking-[0.18em]
                      text-[var(--foreground)]/30
                    "
                  >
                    Focus
                  </p>

                  <p
                    className="
                      mt-2
                      text-sm
                      text-[var(--foreground)]/65
                    "
                  >
                    <HoverWord text="Product & Development" className="tracking-[1px]"/>
                  </p>
                </div>
              </div>

              {/* CTA */}

              <a
                onClick={() => scrollTo("#contact")}
                className="
                  group
                  mt-10
                  inline-flex
                  items-center
                  gap-3
                  text-sm
                  text-[var(--foreground)]/55
                  transition-colors
                  duration-300
                  hover:text-[var(--foreground)]
                "
              >
                Let's work together

                <span
                  className="
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-[var(--foreground)]/[0.1]
                    transition-all
                    duration-300
                    group-hover:translate-x-1
                    group-hover:-translate-y-1
                    group-hover:border-[var(--foreground)]/30
                  "
                >
                  <ArrowDownRight
                    size={14}
                    strokeWidth={1.5}
                  />
                </span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;


// "use client";

// import { useEffect, useRef, useState } from "react";
// import HoverWord from "@/components/hoverword";
// import Heading from "@/components/heading";
// import { motion } from "framer-motion";

// export default function About() {
//   const sectionRef = useRef<HTMLElement>(null);
//   const imageRef = useRef<HTMLDivElement>(null);

//   const [visible, setVisible] = useState(false);

//   /*
//    * ---------------------------------------------------------
//    * REVEAL SECTION WHEN IT ENTERS VIEW
//    * ---------------------------------------------------------
//    */

//   useEffect(() => {
//     const section = sectionRef.current;

//     if (!section) return;

//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setVisible(true);
//           observer.disconnect();
//         }
//       },
//       {
//         threshold: 0.15,
//       }
//     );

//     observer.observe(section);

//     return () => observer.disconnect();
//   }, []);

//   /*
//    * ---------------------------------------------------------
//    * IMAGE PARALLAX
//    * ---------------------------------------------------------
//    */

//   const handleMouseMove = (
//     event: React.MouseEvent<HTMLElement>
//   ) => {
//     const image = imageRef.current;

//     if (!image) return;

//     const rect = image.getBoundingClientRect();

//     const x =
//       (event.clientX - rect.left) / rect.width - 0.5;

//     const y =
//       (event.clientY - rect.top) / rect.height - 0.5;

//     image.style.transform = `
//       translate(${x * 8}px, ${y * 8}px)
//     `;
//   };

//   const handleMouseLeave = () => {
//     const image = imageRef.current;

//     if (!image) return;

//     image.style.transform = "translate(0px, 0px)";
//   };

//   return (
//     <section
//       ref={sectionRef}
//       id="about"
//       className="relative text-[#111111] w-full mt-40"
//     >
//       <div className="w-full py-28 sm:py-36 lg:py-40">

//         {/* =====================================================
//             MAIN GRID
//         ===================================================== */}

//         <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr]">

//           {/* =================================================
//               LEFT
//           ================================================= */}

//           <div
//             className={`
//               flex
//               flex-col
//               justify-center

//               transition-all
//               duration-[1200ms]
//               ease-[cubic-bezier(0.22,1,0.36,1)]

//               ${
//                 visible
//                   ? "translate-y-0 opacity-100"
//                   : "translate-y-16 opacity-0"
//               }
//             `}
//           >

//             {/* =================================================
//                 LABEL
//             ================================================= */}

//             <Heading title="About Me" value="02" />


//             {/* =================================================
//                 HEADING
//             ================================================= */}

//             <h2
//               className="
//                 sm:mt-0 mt-8
//                 max-w-[700px]
//                 text-7xl
//           sm:text-8xl
//           leading-[0.85]
//           tracking-[-0.065em]
//           bricolage-grotesque
//           text-[var(--foreground)] 
//           text-center 
//           sm:text-left
//               "
//             >

//               <HoverWord text="I build " />
//               <HoverWord text="digital" className="text-[#ff5a36]" />
//               <HoverWord text="experiences" />
//               <HoverWord text=". " className="text-[#ff5a36]" />

//             </h2>


//             {/* =================================================
//                 DESCRIPTION
//             ================================================= */}

//             <div
//               className={`
//                 mt-12
//                 transition-all
//                 duration-[1200ms]
//                 delay-300
//                 ease-[cubic-bezier(0.22,1,0.36,1)]

//                 ${
//                   visible
//                     ? "translate-y-0 opacity-100"
//                     : "translate-y-8 opacity-0"
//                 }
//               `}
//             >

//               <p
//                 className="
//                   lg:max-w-[390px]
//                   md:max-w-xl
//                   text-lg
//             leading-6
//             font-light
//             -tracking-[0.01rem]
//             text-[var(--foreground)]/55

//                   transition-all
//                   duration-500

//                   hover:translate-x-1
//                   hover:text-[var(--foreground)]
//                 "
//               >
//                 I’m Pranay Prasad, a web developer who
//                 loves turning ideas into clean, interactive
//                 and purposeful experiences.
//               </p>

//             </div>


//             {/* =================================================
//                 CTA
//             ================================================= */}

//             <a
//               href="#projects"
//               className="
//                 group
//                 relative
//                 mt-14
//                 flex
//                 w-fit
//                 items-center
//                 gap-8
//                 pb-3
//                 cursor-none target-hand

//                 text-[11px]
//                 font-medium
//                 uppercase
//                 tracking-[0.25em]
//                 text-[var(--foreground)]/60
//                 hover:text-[var(--foreground)]

//                 transition-all
//                 duration-300

//                 hover:gap-10
//               "
//             >

//               <span>
//                 Know more about me
//               </span>


//               {/* Arrow */}

//               <span
//                 className="
//                   text-xl
//                   font-light
//                   leading-none

//                   transition-all
//                   duration-500
//                   ease-out

//                   group-hover:-translate-y-1
//                   group-hover:translate-x-1
//                 "
//               >
//                 ↗
//               </span>


//               {/* Underline */}

//               <span
//                 className="
//                   absolute
//                   bottom-0
//                   left-0
//                   h-px
//                   w-full
//                   origin-left
//                   //bg-neutral-900//
//                   bg-[#ff5a36]

//                   transition-transform
//                   duration-500
//                   ease-out

//                   group-hover:scale-x-50
//                   group-hover:origin-right
//                 "
//               />

//             </a>

//           </div>


//           {/* =================================================
//               RIGHT / IMAGE
//           ================================================= */}

//           <div
//             className={`
//               relative
//               mt-20
//               flex
//               items-center
//               justify-center

//               lg:mt-0
//               lg:min-h-[600px]

//               transition-all
//               duration-[1400ms]
//               delay-200
//               ease-[cubic-bezier(0.22,1,0.36,1)]

//               ${
//                 visible
//                   ? "translate-y-0 opacity-100"
//                   : "translate-y-20 opacity-0"
//               }
//             `}
//           >

//             {/* =================================================
//                 VERTICAL LINE
//             ================================================= */}

//             <div
//               className="
//                 absolute
//                 left-0
//                 top-0
//                 hidden
//                 h-full
//                 w-px
//                 bg-[var(--foreground)]/30

//                 lg:block

//                 transition-all
//                 duration-700

//                 hover:bg-neutral-900
//               "
//             />


//             {/* =================================================
//                 IMAGE AREA
//             ================================================= */}

//             <div
//               className="
//                 relative
//                 w-full
//                 max-w-[470px]
//                 group
//                 lg:ml-auto
//               "
//               onMouseMove={handleMouseMove}
//               onMouseLeave={handleMouseLeave}
//             >

//               {/* Outer decorative circle */}

//               <div
//                 className="
//                   pointer-events-none
//                   absolute
//                   -right-4
//                   -top-4
//                   z-0

//                   h-[calc(100%-30px)]
//                   w-[calc(100%-30px)]

//                   rounded-t-[50%]
//                   rounded-b-[3px]

//                   border
//                   border-[var(--foreground)]/20

//                   transition-all
//                   duration-700

//                   group-hover:scale-[1.02]
//                 "
//               />


//               {/* =================================================
//                   IMAGE
//               ================================================= */}

//               <div
//                 ref={imageRef}
//                 className="
//                   relative
//                   z-10

//                   overflow-hidden

//                   rounded-t-[50%]
//                   rounded-b-[3px]

//                   bg-neutral-200

//                   transition-transform
//                   duration-500
//                   ease-out

//                   will-change-transform
//                 "
//               >

//                 <img
//                   src="/image.png"
//                   alt="Portrait"
//                   className="
//                     block
//                     aspect-[0.78]
//                     w-full
//                     object-cover

//                     grayscale

//                     transition-all
//                     duration-[900ms]
//                     ease-out

//                     hover:scale-[1.035]
//                     hover:grayscale-0
//                   "
//                 />


//                 {/* Image overlay */}

//                 <div
//                   className="
//                     pointer-events-none
//                     absolute
//                     inset-0

//                     bg-gradient-to-t
//                     from-black/10
//                     via-transparent
//                     to-white/5

//                     opacity-60

//                     transition-opacity
//                     duration-700

//                     hover:opacity-20
//                   "
//                 />

//                 <motion.div initial={{y:0}} whileInView={{y:"100%"}} viewport={{once:false}} transition={{duration:1}} className="h-full w-full bg-[var(--background)] absolute top-0 left-0"/>
              
//               </div>


//               {/* =================================================
//                   IMAGE CORNER MARK
//               ================================================= */}

//               <div
//                 className={`
//                   absolute
//                   -bottom-5
//                   -right-5
//                   z-20

//                   flex
//                   h-12
//                   w-12
//                   items-center
//                   justify-center

//                   rounded-full
//                   border
//                   border-[var(--foreground)]
//                   text-[var(--foreground)]

//                   bg-[var(--background)]
//                   group-hover:bg-[var(--foreground)]
//                   group-hover:text-[var(--background)]

//                   text-[14px]

//                   transition-all
//                   duration-500

//                   hover:rotate-45
//                   hover:border-neutral-900
//                 `}
//               >
//                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4 transition duration-200 group-hover:-rotate-45">
//   <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
// </svg>

//               </div>

//             </div>

//           </div>

//         </div>
//       </div>
//     </section>
//   );
// }

