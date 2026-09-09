"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import HoverWord from "@/components/hoverword";
import ScrollReveal from "@/components/textreveal";

type SkillCategory = {
  number: string;
  title: string;
  description: string;
  skills: string[];
};

const skillCategories: SkillCategory[] = [
  {
    number: "01",
    title: "Frontend",
    description:
      "Building responsive, interactive and polished interfaces.",

    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "HTML / CSS",
    ],
  },

  {
    number: "02",
    title: "Backend",
    description:
      "Designing APIs and server-side systems that power applications.",

    skills: [
      "Node.js",
      "Express",
      "REST APIs",
      "Authentication",
      "API Design",
      "Server Logic",
    ],
  },

  {
    number: "03",
    title: "Databases",
    description:
      "Working with structured data and designing reliable data layers.",

    skills: [
      "MongoDB",
      "PostgreSQL",
      "MySQL",
      "Mongoose",
      "Database Design",
      "Querying",
    ],
  },

  {
    number: "04",
    title: "DevOps",
    description:
      "Taking applications from development to production.",

    skills: [
      "Git",
      "GitHub",
      "Vercel",
      "Docker",
      "CI / CD",
      "Deployment",
    ],
  },

  {
    number: "05",
    title: "Tools",
    description:
      "The tools I use to design, build and ship products efficiently.",

    skills: [
      "VS Code",
      "Figma",
      "Postman",
      "Git",
      "GitHub",
      "Linux",
    ],
  },
];

export default function Skills() {
  const [activeSkill, setActiveSkill] =
    useState<string | null>("01");

  const toggleCategory = (number: string) => {
    setActiveSkill((current) =>
      current === number ? null : number
    );
  };

  return (
    <section
      id="skills"
      className="
        relative
        w-full
        px-6
        py-28
        text-[var(--foreground)]
        sm:px-10
        sm:py-36
        lg:px-16
        xl:px-24
      "
    >
      <div className="mx-auto w-full max-w-[1500px]">

        {/* =========================================
            HEADER
        ========================================== */}

        <div
          className="
            mb-20
            flex
            flex-col
            justify-between
            gap-10
            sm:mb-28
            lg:flex-row
            lg:items-end
          "
        >
          {/* LEFT */}

          <div>
            <div
              className="
                mb-6
                flex
                items-center
                justify-between
                lg:justify-start
                lg:gap-6
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
                Skills
              </p>

              <span
                className="
                  text-[10px]
                  tabular-nums
                  tracking-[0.15em]
                  text-[var(--foreground)]/25
                "
              >
                04
              </span>
            </div>

            <h2
              className="
                max-w-5xl
                text-[clamp(3.2rem,7vw,7.5rem)]
                font-medium
                leading-[0.93]
                tracking-[-0.065em]
                text-[var(--foreground)]
              "
            >
              <HoverWord text="The" />{" "}
              <HoverWord text="tools" />{" "}
              <HoverWord text="I" />{" "}
              <HoverWord text="use" />{" "}
              <HoverWord text="to" className="text-[#ff5a36]" />{" "}
              <HoverWord text="build" className="text-[#ff5a36]" />{" "}
              <HoverWord text="ideas." className="text-[#ff5a36]" />
            </h2>
          </div>


          {/* DESCRIPTION */}

          <div
            className="
              max-w-sm
              text-sm
              leading-relaxed
              text-[var(--foreground)]/45
              sm:text-base
            "
          >
            <ScrollReveal>

            A growing toolkit for designing,
            developing, and shipping digital
            products from idea to production.
            </ScrollReveal>
          </div>
        </div>


        {/* =========================================
            SKILL LIST
        ========================================== */}

        <div
          className="
            border-t
            border-[var(--foreground)]/[0.08]
          "
        >
          {skillCategories.map((category) => (
            <SkillCategoryRow
              key={category.number}
              category={category}
              isActive={
                activeSkill === category.number
              }
              onToggle={() =>
                toggleCategory(category.number)
              }
            />
          ))}
        </div>


        {/* =========================================
            BOTTOM MESSAGE
        ========================================== */}

        <div
          className="
            mt-16
            flex
            flex-col
            gap-6
            sm:mt-20
            sm:flex-row
            sm:items-end
            sm:justify-between
          "
        >
          <p
            className="
              max-w-md
              text-lg
              leading-relaxed
              tracking-[-0.02em]
              text-[var(--foreground)]/65
            "
          >
            Technology changes constantly.
            The ability to learn and adapt
            matters even more.
          </p>


          <div
            className="
              flex
              items-center
              gap-3
              text-[10px]
              uppercase
              tracking-[0.16em]
              text-[var(--foreground)]/30
            "
          >
            <span
              className="
                h-px
                w-8
                bg-[var(--foreground)]/20
              "
            />

            Always learning
          </div>
        </div>

      </div>
    </section>
  );
}


/* =============================================
   SKILL CATEGORY ROW
============================================= */

function SkillCategoryRow({
  category,
  isActive,
  onToggle,
}: {
  category: SkillCategory;
  isActive: boolean;
  onToggle: () => void;
}) {
  return (
    <article
      className="
        border-b
        border-[var(--foreground)]/[0.08]
      "
    >

      {/* =========================================
          MAIN ROW
      ========================================== */}

      <div
        onClick={onToggle}
        aria-expanded={isActive}
        className="
          group
          grid
          w-full
          grid-cols-[auto_1fr_auto]
          gap-5
          py-9
          text-left
          sm:gap-10
          sm:py-12
          cursor-none target-hand
          lg:grid-cols-[80px_1fr_240px_auto]
        "
      >

        {/* NUMBER */}

        <span
          className="
            pt-2
            text-[10px]
            tabular-nums
            tracking-[0.12em]
            text-[var(--foreground)]/30
          "
        >
          {category.number}
        </span>


        {/* TITLE */}

        <div>
          <h3
            className="
              text-3xl
              font-medium
              leading-[1.05]
              tracking-[-0.05em]
              text-[var(--foreground)]/75
              transition-colors
              duration-300
              group-hover:text-[var(--foreground)]
              sm:text-5xl
              lg:text-6xl
            "
          >
            <HoverWord text={category.title}/>
          </h3>


          {/* MOBILE DESCRIPTION */}

          <p
            className="
              mt-4
              max-w-sm
              text-sm
              leading-relaxed
              text-[var(--foreground)]/40
              lg:hidden
            "
          >
            {category.description}
          </p>
        </div>


        {/* DESKTOP DESCRIPTION */}

        <div
          className="
            hidden
            max-w-[220px]
            pt-2
            text-sm
            leading-relaxed
            text-[var(--foreground)]/40
            transition-colors
            duration-300
            group-hover:text-[var(--foreground)]/60
            lg:block
          "
        >
          <ScrollReveal>

          {category.description}
          </ScrollReveal>
        </div>


        {/* RIGHT SIDE */}

        <div
          className="
            flex
            items-start
            gap-5
            pt-2
          "
        >

          {/* SKILL COUNT */}

          <span
            className="
              hidden
              whitespace-nowrap
              text-[10px]
              tabular-nums
              tracking-[0.1em]
              text-[var(--foreground)]/30
              sm:block
            "
          >
            {String(
              category.skills.length
            ).padStart(2, "0")}{" "}
            skills
          </span>


          {/* EXPAND BUTTON */}

          <span
            className={`
              flex
              h-8
              w-8
              shrink-0
              items-center
              justify-center
              rounded-full
              border
              transition-all
              duration-500

              ${
                isActive
                  ? `
                    border-[var(--foreground)]
                    bg-[var(--foreground)]
                    text-[var(--background)]
                  `
                  : `
                    border-[var(--foreground)]/[0.1]
                    text-[var(--foreground)]/45
                    group-hover:border-[var(--foreground)]/25
                    group-hover:text-[var(--foreground)]
                  `
              }
            `}
          >
            <ChevronDown
              size={15}
              strokeWidth={1.5}
              className={`
                transition-transform
                duration-500

                ${
                  isActive
                    ? "rotate-180"
                    : ""
                }
              `}
            />
          </span>

        </div>

      </div>


      {/* =========================================
          EXPANDED SKILLS
      ========================================== */}

      <AnimatePresence initial={false}>

        {isActive && (

          <motion.div
            initial={{
              height: 0,
              opacity: 0,
            }}

            animate={{
              height: "auto",
              opacity: 1,
            }}

            exit={{
              height: 0,
              opacity: 0,
            }}

            transition={{
              duration: 0.55,
              ease: [
                0.22,
                1,
                0.36,
                1,
              ],
            }}

            className="
              overflow-hidden
            "
          >

            <div
              className="
                pb-12
                pl-[25px]
                sm:pl-[50px]
                lg:pl-[80px]
              "
            >

              <div
                className="
                  grid
                  max-w-5xl
                  gap-10
                  border-t
                  border-[var(--foreground)]/[0.06]
                  pt-10
                  lg:grid-cols-[1fr_1.6fr]
                  lg:gap-20
                "
              >

                {/* LEFT */}

                <div>

                  <SectionLabel>
                    Focus
                  </SectionLabel>


                  <p
                    className="
                      mt-6
                      max-w-sm
                      text-base
                      leading-relaxed
                      text-[var(--foreground)]/60
                    "
                  >
                    {category.description}
                  </p>

                </div>


                {/* SKILL GRID */}

                <div>

                  <SectionLabel>
                    Technologies
                  </SectionLabel>


                  <div
                    className="
                      mt-6
                      grid
                      grid-cols-1
                      border-t
                      border-[var(--foreground)]/[0.08]
                      sm:grid-cols-2
                    "
                  >

                    {category.skills.map(
                      (
                        skill,
                        index
                      ) => (

                        <motion.div
                          key={skill}

                          initial={{
                            opacity: 0,
                            y: 12,
                          }}

                          animate={{
                            opacity: 1,
                            y: 0,
                          }}

                          transition={{
                            duration: 0.4,
                            delay:
                              index * 0.05,
                          }}

                          className="
                            flex
                            items-center
                            gap-5
                            border-b
                            border-[var(--foreground)]/[0.08]
                            py-5
                            sm:pr-8
                          "
                        >

                          {/* NUMBER */}

                          <span
                            className="
                              w-5
                              text-[9px]
                              tabular-nums
                              text-[var(--foreground)]/25
                            "
                          >
                            {String(
                              index + 1
                            ).padStart(
                              2,
                              "0"
                            )}
                          </span>


                          {/* NAME */}

                          <span
                            className="
                              text-sm
                              tracking-[-0.01em]
                              text-[var(--foreground)]/70
                            "
                          >
                            {skill}
                          </span>

                        </motion.div>

                      )
                    )}

                  </div>

                </div>

              </div>

            </div>

          </motion.div>

        )}

      </AnimatePresence>

    </article>
  );
}


/* =============================================
   SECTION LABEL
============================================= */

function SectionLabel({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="
        flex
        items-center
        gap-3
      "
    >
      <span
        className="
          text-[9px]
          font-medium
          uppercase
          tracking-[0.18em]
          text-[var(--foreground)]/35
        "
      >
        {children}
      </span>


      <span
        className="
          h-px
          w-6
          bg-[var(--foreground)]/15
        "
      />
    </div>
  );
}


// "use client";

// import {
//   useEffect,
//   useRef,
//   useState,
// } from "react";

// import {
//   Code2,
//   Database,
//   Server,
//   Wrench,
//   Cloud,
// } from "lucide-react";
// import HoverWord from "@/components/hoverword";
// import {motion} from "framer-motion";
// import HeadingTitle from "@/components/heading";

// type SkillCategory = {
//   number: string;
//   title: string;
//   description: string;
//   icon: React.ElementType;
//   skills: string[];
// };

// const skillCategories: SkillCategory[] = [
//   {
//     number: "01",
//     title: "Frontend",
//     description:
//       "Building responsive, interactive and polished interfaces.",
//     icon: Code2,
//     skills: [
//       "React",
//       "Next.js",
//       "TypeScript",
//       "JavaScript",
//       "Tailwind CSS",
//       "HTML / CSS",
//     ],
//   },

//   {
//     number: "02",
//     title: "Backend",
//     description:
//       "Designing APIs and server-side systems that power applications.",
//     icon: Server,
//     skills: [
//       "Node.js",
//       "Express",
//       "REST APIs",
//       "Authentication",
//       "API Design",
//       "Server Logic",
//     ],
//   },

//   {
//     number: "03",
//     title: "Databases",
//     description:
//       "Working with structured data and designing reliable data layers.",
//     icon: Database,
//     skills: [
//       "MongoDB",
//       "PostgreSQL",
//       "MySQL",
//       "Mongoose",
//       "Database Design",
//       "Querying",
//     ],
//   },

//   {
//     number: "04",
//     title: "DevOps",
//     description:
//       "Taking applications from development to production.",
//     icon: Cloud,
//     skills: [
//       "Git",
//       "GitHub",
//       "Vercel",
//       "Docker",
//       "CI / CD",
//       "Deployment",
//     ],
//   },

//   {
//     number: "05",
//     title: "Tools",
//     description:
//       "The tools I use to design, build and ship products efficiently.",
//     icon: Wrench,
//     skills: [
//       "VS Code",
//       "Figma",
//       "Postman",
//       "Git",
//       "GitHub",
//       "Linux",
//     ],
//   },
// ];

// export default function Skills() {
//   const sectionRef = useRef<HTMLElement>(null);

//   const [visible, setVisible] = useState(false);

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
//         threshold: 0.12,
//       }
//     );

//     observer.observe(section);

//     return () => observer.disconnect();
//   }, []);

//   return (
//     <section
//       ref={sectionRef}
//       id="skills"
//       className="relative bg-[var(--background)] text-[#111111] w-full pt-60 sm:pt-0"
//     >
//       <div className="lg:py-36 lg:py-0">

//         {/* =====================================================
//             HEADER
//         ===================================================== */}

//         <div
//           className={`
//             transition-all
//             duration-[1100ms]
//             ease-[cubic-bezier(0.22,1,0.36,1)]

//             ${
//               visible
//                 ? "translate-y-0 opacity-100"
//                 : "translate-y-16 opacity-0"
//             }
//           `}
//         >
//           {/* =================================================
//                 LABEL
//             ================================================= */}

//             <HeadingTitle title="Skills" value="03" />


//           {/* Heading + description */}

//           <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_0.4fr]">

//             {/* Heading */}

//             <h2
//               className="
//                 text-7xl
//           sm:text-8xl
//           leading-[0.85]
//           tracking-[-0.065em]
//           bricolage-grotesque
//           text-[var(--foreground)] 
//           text-center 
//           sm:text-left
//                 text-center sm:text-left
//               "
//             >
//               <HoverWord text="I build "/>
//               <HoverWord text="full-stack " className="italic text-[#ff5a36] block"/>
//               <HoverWord text="experiences."/>
//               {/* <HoverWord text="I build" />

//               <br />

//               <span className="italic text-[#ff5a36]">
                
//               <HoverWord text="full-stack" />
//               </span>

//               <br />

//               <HoverWord text="experiences." /> */}
//             </h2>


//             {/* Description */}

//             <div
//               className="
//                 flex
//                 items-end
//                 lg:pb-4
//               "
//             >
//               <div className="">

//                 <p
//                   className="
//                     text-lg
//             leading-6
//             px-5 sm:px-0
//             text-center
//             sm:text-right
//             font-light
//             -tracking-[0.01rem]
//             text-[var(--foreground)]/55

//                     transition-all
//                     duration-500
//                     tracking-[-0.03em]
//                     hover:translate-x-1
//                     hover:text-[var(--foreground)]
//                   "
//                 >
//                   From interfaces to APIs,
//                   databases to deployment —
//                   I build products end to end.
//                 </p>

//                 <div
//                   className="
//                     mt-7
//                     h-px
//                     w-8
//                     bg-neutral-500

//                     transition-all
//                     duration-500

//                     hover:w-16
//                   "
//                 />

//               </div>
//             </div>

//           </div>
//         </div>


//         {/* =====================================================
//             SKILLS
//         ===================================================== */}

//         <div className="mt-24">

//           {skillCategories.map((category, index) => (
//             <SkillRow
//               key={category.number}
//               category={category}
//               index={index}
//             />
//           ))}

//         </div>

//       </div>
//     </section>
//   );
// }


// /* =============================================================
//    SKILL ROW
// ============================================================= */

// function SkillRow({
//   category,
//   index,
// }: {
//   category: SkillCategory;
//   index: number;
// }) {
//   const rowRef = useRef<HTMLDivElement>(null);

//   const [visible, setVisible] = useState(false);

// //   useEffect(() => {
// //     const row = rowRef.current;

// //     if (!row) return;

// //     const observer = new IntersectionObserver(
// //       ([entry]) => {
// //         if (entry.isIntersecting) {
// //           setVisible(true);
// //           observer.disconnect();
// //         }
// //       },
// //       {
// //         threshold: 0.15,
// //       }
// //     );

// //     observer.observe(row);

// //     return () => observer.disconnect();
// //   }, []);
// useEffect(() => {
//   const row = rowRef.current;

//   if (!row) return;

//   const observer = new IntersectionObserver(
//     ([entry]) => {
//       if (entry.isIntersecting) {
//         // Small reset so the CSS animation always starts fresh
//         setVisible(false);

//         requestAnimationFrame(() => {
//           requestAnimationFrame(() => {
//             setVisible(true);
//           });
//         });
//       } else {
//         // Reset when the row leaves the viewport,
//         // whether it leaves from the top OR bottom.
//         setVisible(false);
//       }
//     },
//     {
//       threshold: 0.15,
//     }
//   );

//   observer.observe(row);

//   return () => observer.disconnect();
// }, []);

//   const Icon = category.icon;

//   return (
//     <div
//       ref={rowRef}
//       className={`
//         group
//         relative
//         border-t
//         border-[var(--foreground)]/40
//         text-[var(--foreground)]
//         transition-all
//         duration-1000
//         ease-[cubic-bezier(0.22,1,0.36,1)]

//         ${
//           visible
//             ? "translate-y-0 opacity-100"
//             : "translate-y-12 opacity-0"
//         }
//       `}
//       style={{
//         transitionDelay: `${index * 80}ms`,
//       }}
//     >

//       {/* =====================================================
//           TOP ROW
//       ===================================================== */}

//       <div
//         className="
//           grid
//           grid-cols-[70px_1fr_auto]
//           gap-6
//           py-7

//           sm:grid-cols-[90px_1fr_auto]

//           lg:grid-cols-[90px_1fr_180px_auto]
//           lg:items-start
//         "
//       >

//         {/* Number */}

//         <div
//           className="
//             font-serif
//             text-3xl
//             font-normal
//             tracking-[-0.04em]

//             transition-transform
//             duration-500

//             group-hover:-translate-y-1
//           "
//         >
//           {category.number}
//         </div>


//         {/* Title */}

//         <div className="flex items-center gap-6">

//           <span
//             className="
//               hidden
//               h-px
//               w-7
//               bg-neutral-400

//               transition-all
//               duration-500

//               group-hover:w-12

//               sm:block
//             "
//           />

//           <span
//             className="
//               text-[10px]
//               font-semibold
//               uppercase
//               tracking-[0.3em]

//               transition-all
//               duration-500

//               group-hover:tracking-[0.38em]
//             "
//           >
//             {category.title}
//           </span>

//         </div>


//         {/* Description */}

//         <p
//           className="
//             hidden
//             max-w-[180px]

//             text-[10px]
//             leading-[1.7]
//             text-neutral-500

//             lg:block

//             transition-all
//             duration-500

//             group-hover:text-neutral-800
//           "
//         >
//           {category.description}
//         </p>


//         {/* Icon */}

//         <div
//           className="
//             flex
//             h-9
//             w-9
//             items-center
//             justify-center

//             transition-all
//             duration-500

//             group-hover:-translate-y-1
//             group-hover:rotate-[-8deg]
//           "
//         >
//           <Icon
//             strokeWidth={1.4}
//             className="
//               h-5
//               w-5

//               transition-transform
//               duration-500

//               group-hover:scale-110
//             "
//           />
//         </div>

//       </div>


//       {/* =====================================================
//           SKILL LIST
//       ===================================================== */}

//       <div
//         className="
//           grid
//           grid-cols-2
//           gap-x-8
//           gap-y-5

//           pb-8
//           pl-[70px]

//           sm:grid-cols-3
//           sm:pl-[90px]

//           lg:grid-cols-3
//           lg:gap-x-12
//           lg:pl-[150px]
//           lg:pr-16
//         "
//       >

//         {category.skills.map((skill, skillIndex) => (
//           <Skill
//             key={skill}
//             name={skill}
//             index={skillIndex}
//           />
//         ))}

//       </div>


//       {/* =====================================================
//           DOT GRID
//       ===================================================== */}

//       <div
//         className="
//           absolute
//           bottom-8
//           right-0
//           hidden

//           grid
//           grid-cols-4
//           gap-[6px]

//           opacity-40

//           lg:grid
//         "
//       >
//         {Array.from({ length: 12 }).map((_, index) => (
//           <span
//             key={index}
//             className="
//               h-[2px]
//               w-[2px]
//               rounded-full
//               bg-neutral-700

//               transition-all
//               duration-300
//             "
//             style={{
//               transitionDelay: `${index * 15}ms`,
//             }}
//           />
//         ))}
//       </div>

//     </div>
//   );
// }


// /* =============================================================
//    INDIVIDUAL SKILL
// ============================================================= */

// function Skill({
//   name,
//   index,
// }: {
//   name: string;
//   index: number;
// }) {
//   return (
//     <div
//       className="
//         group/skill
//         relative
//         w-fit
//         cursor-default

//         text-[11px]
//       "
//     >

//       <div className="flex items-center gap-2">

//         {/* Skill name */}

//         <span
//           className="
//             relative
//             py-1

//             transition-all
//             duration-300

//             group-hover/skill:translate-x-1
//           "
//         >
//           {name}

//           {/* Underline */}

//           <span
//             className="
//               absolute
//               bottom-0
//               left-0

//               h-px
//               w-full

//               origin-left
//               bg-neutral-400

//               transition-transform
//               duration-300

//               group-hover/skill:scale-x-0
//               group-hover/skill:origin-right
//             "
//           />
//         </span>


//         {/* Arrow */}

//         <span
//           className="
//             text-[13px]
//             leading-none

//             transition-all
//             duration-300

//             group-hover/skill:-translate-y-1
//             group-hover/skill:translate-x-1
//           "
//         >
//           ↗
//         </span>

//       </div>

//     </div>
//   );
// }

