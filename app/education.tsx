"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  ChevronDown,
  MapPin,
} from "lucide-react";
import HoverWord from "@/components/hoverword";
import ScrollReveal from "@/components/textreveal";

type EducationItem = {
  id: string;
  number: string;
  year: string;
  title: string;
  school: string;
  location: string;
  description: string;

  details: {
    intro: string;
    learned: string[];
    explored: string[];
  };
};

const education: EducationItem[] = [
  {
    id: "college",
    number: "01",
    year: "2023 — 2026",

    title: "Bachelor’s Degree in Computer Applications",

    school:
      "Vivekananda Institute of Professional Studies",

    location: "New Delhi, India",

    description:
      "Building a strong foundation in computer science while turning ideas into real products.",

    details: {
      intro:
        "This is where I moved from simply learning concepts to actually building with them. My time at university gave me the technical foundation and curiosity to explore how software can solve real problems.",

      learned: [
        "Data Structures & Algorithms",
        "Object Oriented Programming",
        "Database Management",
        "Computer Networks",
      ],

      explored: [
        "Full-stack development",
        "Web technologies",
        "Software engineering",
        "Product development",
      ],
    },
  },

  {
    id: "school",
    number: "02",
    year: "2022 — 2023",

    title: "Higher Secondary Education",

    school:
      "Kendriya Vidyalaya, Thane",

    location: "Mumbai, India",

    description:
      "Where curiosity about computers started and problem solving became something I genuinely enjoyed.",

    details: {
      intro:
        "School was where my curiosity around computers started. Before thinking about frameworks and products, I was fascinated by understanding how things worked and experimenting with technology.",

      learned: [
        "Physics",
        "Chemistry",
        "Mathematics",
        "Computer Science",
      ],

      explored: [
        "Programming fundamentals",
        "Basic algorithms",
        "Computer systems",
        "Small experiments",
      ],
    },
  },
];

export default function Education() {
  const [activeId, setActiveId] =
    useState<string | null>(null);

  const toggleEducation = (id: string) => {
    setActiveId((current) =>
      current === id ? null : id
    );
  };

  return (
    <section
      id="education"
      className="
        relative
        w-full
        px-6
        py-28
        sm:px-10
        sm:py-36
        lg:px-16
        xl:px-24
      "
    >
      <div className="mx-auto w-full max-w-[1500px]">

        {/* =========================================
            SECTION HEADER
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
                Education
              </p>

              <span
                className="
                  text-[10px]
                  tabular-nums
                  tracking-[0.15em]
                  text-[var(--foreground)]/25
                "
              >
                03
              </span>
            </div>

            <h2
              className="
                max-w-4xl
                text-[clamp(3.2rem,7vw,7.5rem)]
                font-medium
                leading-[0.93]
                tracking-[-0.065em]
                text-[var(--foreground)]
              "
            >
              <HoverWord text="The"/>{" "}
              <HoverWord text="places"/>{" "}
              <HoverWord text="that"/>{" "}
                <HoverWord text="shaped" className="text-[#ff5a36]"/>{" "}
                <HoverWord text="how" className="text-[#ff5a36]"/>{" "}
                <HoverWord text="I" className="text-[#ff5a36]"/>{" "}
                <HoverWord text="think." className="text-[#ff5a36]"/>
            </h2>

          </div>

          {/* RIGHT DESCRIPTION */}

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

            The academic experiences that gave me
            a foundation in technology, problem
            solving, and continuous learning.
            </ScrollReveal>
          </div>

        </div>

        {/* =========================================
            EDUCATION LIST
        ========================================== */}

        <div
          className="
            border-t
            border-[var(--foreground)]/[0.08]
          "
        >
          {education.map((item) => {
            const isActive =
              activeId === item.id;

            return (
              <article
                key={item.id}
                className="
                  border-b
                  border-[var(--foreground)]/[0.08]
                "
              >

                {/* =====================================
                    MAIN ROW
                ====================================== */}

                <button
                  type="button"
                  onClick={() =>
                    toggleEducation(item.id)
                  }
                  className="
                    group
                    grid
                    w-full
                    grid-cols-[auto_1fr_auto]
                    gap-5
                    py-9
                    text-left
                    transition-all
                    duration-500
                    sm:gap-10
                    sm:py-12
                    lg:grid-cols-[80px_1fr_220px_auto]
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
                    {item.number}
                  </span>


                  {/* TITLE */}

                  <div>

                    <div
                      className="
                        flex
                        items-start
                        gap-3
                      "
                    >

                      <div
                        className="
                          max-w-3xl
                          text-2xl
                          font-medium
                          leading-[1.08]
                          tracking-[-0.045em]
                          text-[var(--foreground)]/75
                          transition-colors
                          duration-300
                          group-hover:text-[var(--foreground)]
                          sm:text-4xl
                          lg:text-5xl
                        "
                      >
                        <ScrollReveal>
                        {item.title}
                        </ScrollReveal>
                      </div>

                      <ArrowUpRight
                        size={18}
                        strokeWidth={1.5}
                        className={`
                          mt-2
                          shrink-0
                          text-[var(--foreground)]/40
                          transition-all
                          duration-500

                          ${
                            isActive
                              ? "translate-x-0 translate-y-0 opacity-100"
                              : `
                                translate-x-[-8px]
                                translate-y-[8px]
                                opacity-0
                                group-hover:translate-x-0
                                group-hover:translate-y-0
                                group-hover:opacity-100
                              `
                          }
                        `}
                      />

                    </div>


                    {/* MOBILE META */}

                    <div
                      className="
                        mt-5
                        flex
                        flex-col
                        gap-2
                        lg:hidden
                      "
                    >

                      <p
                        className="
                          text-sm
                          text-[var(--foreground)]/50
                        "
                      >
                        {item.school}
                      </p>

                      <div
                        className="
                          flex
                          items-center
                          gap-2
                          text-[11px]
                          text-[var(--foreground)]/35
                        "
                      >
                        <MapPin
                          size={12}
                          strokeWidth={1.5}
                        />

                        {item.location}
                      </div>

                    </div>

                  </div>


                  {/* DESKTOP SCHOOL */}

                  <div
                    className="
                      hidden
                      pt-2
                      lg:block
                    "
                  >

                    <p
                      className="
                        text-sm
                        leading-relaxed
                        text-[var(--foreground)]/50
                      "
                    >
                      {item.school}
                    </p>

                    <div
                      className="
                        mt-3
                        flex
                        items-center
                        gap-2
                        text-[11px]
                        text-[var(--foreground)]/30
                      "
                    >

                      <MapPin
                        size={12}
                        strokeWidth={1.5}
                      />

                      {item.location}

                    </div>

                  </div>


                  {/* YEAR + EXPAND */}

                  <div
                    className="
                      flex
                      items-start
                      gap-6
                      pt-2
                    "
                  >

                    <span
                      className="
                        hidden
                        whitespace-nowrap
                        text-[10px]
                        tabular-nums
                        tracking-[0.12em]
                        text-[var(--foreground)]/30
                        sm:block
                      "
                    >
                      {item.year}
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

                </button>


                {/* =====================================
                    EXPANDED DETAILS
                ====================================== */}

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
                            gap-12
                            border-t
                            border-[var(--foreground)]/[0.06]
                            pt-10
                            lg:grid-cols-[1fr_1.5fr]
                            lg:gap-20
                          "
                        >

                          {/* DESCRIPTION */}

                          <div>

                            <p
                              className="
                                max-w-sm
                                text-sm
                                leading-[1.8]
                                text-[var(--foreground)]/45
                              "
                            >
                              {item.details.intro}
                            </p>

                            <p
                              className="
                                mt-8
                                max-w-sm
                                text-sm
                                leading-relaxed
                                text-[var(--foreground)]/65
                              "
                            >
                              {item.description}
                            </p>

                          </div>


                          {/* LEARNING DETAILS */}

                          <div>

                            {/* WHAT I LEARNED */}

                            <div>

                              <SectionLabel>
                                What I learned
                              </SectionLabel>


                              <div
                                className="
                                  mt-6
                                  border-t
                                  border-[var(--foreground)]/[0.08]
                                "
                              >

                                {item.details.learned.map(
                                  (
                                    learned,
                                    index
                                  ) => (

                                    <div
                                      key={learned}
                                      className="
                                        flex
                                        items-center
                                        gap-5
                                        border-b
                                        border-[var(--foreground)]/[0.08]
                                        py-4
                                      "
                                    >

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


                                      <span
                                        className="
                                          text-sm
                                          text-[var(--foreground)]/65
                                        "
                                      >
                                        {learned}
                                      </span>

                                    </div>

                                  )
                                )}

                              </div>

                            </div>


                            {/* EXPLORED */}

                            <div
                              className="
                                mt-12
                              "
                            >

                              <SectionLabel>
                                Beyond the classroom
                              </SectionLabel>


                              <div
                                className="
                                  mt-6
                                  flex
                                  flex-wrap
                                  gap-2
                                "
                              >

                                {item.details.explored.map(
                                  (
                                    explored
                                  ) => (

                                    <span
                                      key={explored}
                                      className="
                                        rounded-full
                                        border
                                        border-[var(--foreground)]/[0.08]
                                        px-4
                                        py-2
                                        text-[10px]
                                        tracking-[-0.01em]
                                        text-[var(--foreground)]/45
                                      "
                                    >
                                      {explored}
                                    </span>

                                  )
                                )}

                              </div>

                            </div>

                          </div>

                        </div>

                      </div>

                    </motion.div>

                  )}

                </AnimatePresence>

              </article>
            );
          })}
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
            Education gave me the foundation.
            Building continues to teach me everything else.
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

            Still learning

          </div>

        </div>

      </div>
    </section>
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

// import HoverWord from "@/components/hoverword";
// import {
//   useEffect,
//   useRef,
//   useState,
// } from "react";
// {/* View Details */ }
// import { motion } from "framer-motion";
// import { ArrowUpRight } from "lucide-react";
// import HeadingTitle from "@/components/heading";

// type EducationItem = {
//   id: string;
//   number: string;
//   year: string;
//   title: string;
//   school: string;
//   location: string;
//   description: string;

//   details: {
//     intro: string;
//     learned: string[];
//     explored: string[];
//   };
// };

// const education: EducationItem[] = [
//   {
//     id: "college",
//     number: "01",
//     year: "2023 — 2026",

//     title: "Bachelor’s Degree in Computer Applications",

//     school: "Vivekananda Institute of Professional Studies",

//     location: "New Delhi, India",

//     description:
//       "Building a strong foundation in computer science while turning ideas into real products.",

//     details: {
//       intro:
//         "This is where I moved from simply learning concepts to actually building with them. My time at university gave me the technical foundation and curiosity to explore how software can solve real problems.",

//       learned: [
//         "Data Structures & Algorithms",
//         "Object Oriented Programming",
//         "Database Management",
//         "Computer Networks",
//       ],

//       explored: [
//         "Full-stack development",
//         "Web technologies",
//         "Software engineering",
//         "Product development",
//       ],
//      },
//   },

//   {
//     id: "school",
//     number: "02",
//     year: "2022 — 2023",

//     title: "Higher Secondary Education",

//     school: "Kendriya Vidyalaya, Thane",

//     location: "Mumbai",

//     description:
//       "Where curiosity about computers started and problem solving became something I genuinely enjoyed.",

//     details: {
//       intro:
//         "School was where my curiosity around computers started. Before thinking about frameworks and products, I was fascinated by understanding how things worked and experimenting with technology.",

//       learned: [
//         "Physics",
//         "Chemistry",
//         "Mathematics",
//         "Computer Science",
//       ],

//       explored: [
//         "Programming fundamentals",
//         "Basic algorithms",
//         "Computer systems",
//         "Small experiments",
//       ]
//     },
//   },
// ];

// export default function Education() {
//   const sectionRef = useRef<HTMLElement>(null);

//   const [started, setStarted] = useState(false);

//   const [selectedEducation, setSelectedEducation] =
//     useState<EducationItem | null>(null);

//   useEffect(() => {
//     const section = sectionRef.current;

//     if (!section) return;

//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setStarted(true);
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
//    * Lock page scrolling while the details panel is open.
//    */
//   useEffect(() => {
//     if (!selectedEducation) return;

//     const previousOverflow = document.body.style.overflow;

//     document.body.style.overflow = "hidden";

//     return () => {
//       document.body.style.overflow = previousOverflow;
//     };
//   }, [selectedEducation]);

//   /*
//    * Escape key closes panel.
//    */
//   useEffect(() => {
//     const handleKeyDown = (event: KeyboardEvent) => {
//       if (event.key === "Escape") {
//         setSelectedEducation(null);
//       }
//     };

//     window.addEventListener("keydown", handleKeyDown);

//     return () => {
//       window.removeEventListener(
//         "keydown",
//         handleKeyDown
//       );
//     };
//   }, []);

//   return (
//     <>
//       {/* =====================================================
//           EDUCATION SECTION
//       ===================================================== */}

//       <section
//         ref={sectionRef}
//         id="education"
//         className="relative text-[#111111] w-full px-5 sm:px-0 pt-30 sm:pt-0"
//       >
//         <div className="">
//           <div className="grid grid-cols-1 lg:grid-cols-2">

//             {/* =================================================
//                 LEFT SIDE
//             ================================================= */}

//             <div className="relative lg:h-[220vh] w-full">
//               <div className="lg:sticky lg:top-0 lg:h-screen w-full">

//                 <div
//                   className={`
//                     flex h-full items-center
//                     w-full
//                     transition-all
//                     duration-[1200ms]

//                     ease-[cubic-bezier(0.22,1,0.36,1)]

//                     ${started
//                       ? "translate-y-0 opacity-100"
//                       : "translate-y-[120px] opacity-0"
//                     }
//                   `}
//                 >
//                   <div className="max-w-full sm:py-24 lg:py-0">

//                     {/* =================================================
//                 LABEL
//             ================================================= */}
//                       <HeadingTitle title="Education" value="03" />

//                     {/* Heading */}

//                     <h2
//                       className="
//                         text-7xl
//           sm:text-8xl
//           leading-[0.85]
//           tracking-[-0.065em]
//           bricolage-grotesque
//           text-[var(--foreground)] 
//           text-center 
//           sm:text-left
//                       "
//                     >
//                       <HoverWord text="Where I " />
//                       <HoverWord text="learned" />
//                         <HoverWord text="to build." className="italic text-[#ff5a36]" />
//                     </h2>

//                     {/* Description */}

//                     <p
//                       className="
//                         mt-14
//                         max-w-[300px]
//                         text-lg
//             leading-6
//             font-light
//             -tracking-[0.01rem]
//             text-[var(--foreground)]/45

//                     transition-all
//                     duration-500
//                     tracking-[-0.03em]
//                     hover:translate-x-1
//                     hover:text-[var(--foreground)]

//                       "
//                     >
//                       Education gave me the foundation.
//                       <br />
//                       Curiosity keeps me growing.
//                     </p>

//                     {/* Small decorative line */}

//                     <div className="mt-7 h-px w-9 bg-neutral-500" />

//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* =================================================
//                 RIGHT SIDE
//             ================================================= */}

//             <div className="relative ">
//               {/* Timeline line */}

//               <div
//                 className="
//                   absolute
//                   left-0
//                   top-[40vh]
//                   hidden
//                   h-[173vh]
//                   w-px
//                   bg-neutral-300
//                   lg:block
//                 "
//               />

//               <div className="relative">

//                 {education.map((item, index) => (
//                   <EducationItem
//                     key={item.id}
//                     item={item}
//                     index={index}
//                     onDetails={() =>
//                       setSelectedEducation(item)
//                     }
//                   />
//                 ))}

//                 {/* =================================================
//                     BEYOND
//                 ================================================= */}

//                 <div
//                   className="
//                     relative
//                     flex
//                     sm:min-h-[80vh]
//                     items-start
//                     pt-20
//                     pl-0
//                     lg:pl-12
//                     hidden sm:block
//                   "
//                 >
//                   <div
//                     className="
//                       absolute
//                       left-[-5px]
//                       top-[85px]
//                       hidden
//                       h-3
//                       w-3
//                       rounded-full
//                       border
//                       border-neutral-500
//                       bg-[#f7f5f0]
//                       lg:block
//                     "
//                   />

//                   <div>
//                     <p
//                       className="
//                         bricolage-grotesque
//                         text-5xl
//                         text-[var(--foreground)]
//                         italic
//                       "
//                     >
//                       Beyond
//                     </p>

//                     <p
//                       className="
//                         mt-5
//                         max-w-sm
//                         text-sm
//             leading-5
//             font-normal
//             -tracking-[0.01rem]
//             text-[var(--foreground)]/70
//                       "
//                     >
//                       I continue to learn by building,
//                       experimenting and turning ideas
//                       into real products.
//                     </p>
//                   </div>
//                 </div>

//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* =====================================================
//           DETAILS PANEL
//       ===================================================== */}

//       <EducationDetailsPanel
//         education={selectedEducation}
//         onClose={() => setSelectedEducation(null)}
//       />
//     </>
//   );
// }


// function EducationItem({
//   item,
//   index,
//   onDetails,
// }: {
//   item: EducationItem;
//   index: number;
//   onDetails: () => void;
// }) {
//   const ref = useRef<HTMLDivElement>(null);

//   const [visible, setVisible] = useState(false);
//   const [hovered, setHovered] = useState(false);

//   useEffect(() => {
//     const element = ref.current;

//     if (!element) return;

//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setVisible(false);

//           requestAnimationFrame(() => {
//             requestAnimationFrame(() => {
//               setVisible(true);
//             });
//           });
//         } else {
//           setVisible(false);
//         }
//       },
//       {
//         threshold: 0.2,
//       }
//     );

//     observer.observe(element);

//     return () => observer.disconnect();
//   }, []);

//   return (
//     <article
//       ref={ref}
//       className="relative flex lg:min-h-[100vh] border border-[var(--foreground)] lg:border-none items-center lg:mt-0 mt-20 p-5 rounded"
//     >
//       {/* Timeline dot */}
//       <div
//         className={`
//           absolute
//           left-0
//           top-72
//           hidden
//           h-5
//           w-5
//           -translate-y-1/2
//           -translate-x-1/2
//           rounded-full
//           border-2
//           border-[var(--foreground)]
//           bg-[var(--background)]
//           lg:block

//           transition-all
//           duration-700
//           ease-[cubic-bezier(0.22,1,0.36,1)]

//           ${visible
//             ? "scale-100 opacity-100"
//             : "scale-0 opacity-0"
//           }

//           ${hovered ? "scale-125 border-[var(--background)] bg-[var(--foreground)]" : ""}
//         `}
//       />

//       {/* Content */}
//       <div
//         onMouseEnter={() => setHovered(true)}
//         onMouseLeave={() => setHovered(false)}
//         className={`
//           w-full
//           pl-0
//           lg:pl-12

//           transition-all
//           duration-1000
//           ease-[cubic-bezier(0.22,1,0.36,1)]

//           ${visible
//             ? "translate-y-0 opacity-100"
//             : "translate-y-16 opacity-0"
//           }
//         `}
//       >
//         {/* Year */}
//         <div
//           className="
//             flex
//             items-center
//             gap-4
//           "
//         >
//           <span
//             className="
//               text-[9px]
//               uppercase
//               tracking-[0.28em]
//               text-neutral-500
//             "
//           >
//             {item.year}
//           </span>

//           <span
//             className={`
//               h-px
//               bg-neutral-300
//               transition-all
//               duration-500
//               ${hovered ? "w-10" : "w-7"}
//             `}
//           />
//         </div>

//         {/* Degree */}
//         <h3
//           className="
//             group
//             relative
//             mt-8
//             sm:text-5xl text-3xl
//             font-normal
//             leading-[1.15]
//             tracking-[-0.025em]
//             text-[var(--foreground)]
//             bricolage-grotesque
//           "
//         >
//           {item.title}
//         </h3>

//         {/* Divider */}
//         <div
//           className={`
//             mt-3
//             mb-8
//             h-px
//             bg-neutral-300

//             transition-all
//             duration-500

//             ${hovered ? "w-12" : "w-8"}
//           `}
//         />

//         {/* Institution */}
//         <div>
//           <p
//             className={`
//               text-lg
//             leading-6
//             font-light
//             -tracking-[0.01rem]
//             text-[var(--foreground)]
//               transition-transform
//               duration-300

//               ${hovered ? "translate-x-[2px]" : ""}
//             `}
//           >
//             {item.school}
//           </p>

//           <p
//             className="
//               mt-1
//               text-xs
//             leading-6
//             font-normal
//             -tracking-[0.01rem]
//             text-[var(--foreground)]/45

//                   transition-all
//                   duration-500

//                   hover:translate-x-1
//                   hover:text-[var(--foreground)]
//                   flex gap-1 items-center
//             "
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-3">
//               <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
//               <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
//             </svg>

//             {item.location}
//           </p>
//         </div>



//         <motion.button
//           type="button"
//           onClick={onDetails}
//           aria-label={`View details about ${item.title}`}
//           initial="rest"
//           whileHover="hover"
//           whileTap={{ scale: 0.97 }}
//           className="
//     group
//     mt-8
//     inline-flex
//     items-center
//     gap-3
//     cursor-none target-hand
//     outline-none
//   "
//         >
//           {/* Circle */}
//           <span
//             className="
//       relative
//       flex
//       h-8
//       w-8
//       items-center
//       justify-center
//       overflow-hidden
//       rounded-full
//       border
//       border-[var(--foreground)]/60
//       transition-colors
//       duration-300
//       text-[var(--foreground)]
//       group-hover:text-[var(--background)]
//       group-hover:border-[var(--foreground)]
//       group-hover:bg-[var(--foreground)]
//     "
//           >
//             {/* Arrow 1 */}
//             <motion.span
//               variants={{
//                 rest: {
//                   x: 0,
//                   y: 0,
//                   opacity: 1,
//                 },
//                 hover: {
//                   x: 10,
//                   y: -10,
//                   opacity: 0,
//                 },
//               }}
//               transition={{
//                 duration: 0.3,
//                 ease: [0.22, 1, 0.36, 1],
//               }}
//               className="absolute"
//             >
//               <ArrowUpRight
//                 size={14}
//                 strokeWidth={1.4}
//               />
//             </motion.span>

//             {/* Arrow 2 */}
//             <motion.span
//               variants={{
//                 rest: {
//                   x: -10,
//                   y: 10,
//                   opacity: 0,
//                 },
//                 hover: {
//                   x: 0,
//                   y: 0,
//                   opacity: 1,
//                 },
//               }}
//               transition={{
//                 duration: 0.3,
//                 delay: 0.04,
//                 ease: [0.22, 1, 0.36, 1],
//               }}
//               className="absolute"
//             >
//               <ArrowUpRight
//                 size={14}
//                 strokeWidth={1.4}
//               />
//             </motion.span>
//           </span>

//           {/* Label */}
//           <motion.span
//             variants={{
//               rest: {
//                 x: 0,
//               },
//               hover: {
//                 x: 4,
//               },
//             }}
//             transition={{
//               duration: 0.35,
//               ease: [0.22, 1, 0.36, 1],
//             }}
//             className="
//       text-[9px]
//       font-medium
//       uppercase
//       tracking-[0.2em]
//       text-[var(--foreground)]/60
  
//       transition-colors
//       duration-300
//       group-hover:text-[var(--foreground)]
//     "
//           >
//             View details
//           </motion.span>
//         </motion.button>

//         {/* Description */}
//         <p
//           className="
//             mt-8
//             max-w-sm
//             text-sm
//             leading-5
//             font-normal
//             -tracking-[0.01rem]
//             text-[var(--foreground)]/45

//             transition-colors
//             duration-300

//             hover:text-[var(--foreground)]
//           "
//         >
//           {item.description}
//         </p>
//       </div>
//     </article>
//   );
// }



// /* =============================================================
//    DETAILS PANEL
// ============================================================= */

// function EducationDetailsPanel({
//   education,
//   onClose,
// }: {
//   education: EducationItem | null;
//   onClose: () => void;
// }) {
//   const isOpen = Boolean(education);

//   return (
//     <div
//     data-lenis-prevent
//       className={`
//         fixed
//         inset-0
//         z-[11000]

//         pointer-events-none

//         transition-all
//         duration-500
//         cursor-none target-hand
//         ${isOpen
//           ? "visible"
//           : "invisible"
//         }
//       `}
//     >

//       {/* =====================================================
//           BACKDROP
//       ===================================================== */}

//       <button
//         type="button"
//         aria-label="Close education details"
//         onClick={onClose}
//         className={`
//           absolute
//           inset-0
//           h-full
//           w-full
//           cursor-none target-hand
//           bg-black/10
//           backdrop-blur-[3px]

//           transition-opacity
//           duration-500

//           ${isOpen
//             ? "pointer-events-auto opacity-100"
//             : "opacity-0"
//           }
//         `}
//       />

//       {/* =====================================================
//           PANEL
//       ===================================================== */}

//       <aside
//         role="dialog"
//         aria-modal="true"
//         aria-label={
//           education
//             ? `${education.title} details`
//             : "Education details"
//         }
//         className={`
//           absolute
//           right-0
//           top-0

//           h-full
//           w-full
//           sm:w-[500px]
//           lg:w-[560px]

//           overflow-y-auto
//           minimal-scrollbar

//           bg-[#f7f5f0]

//           shadow-[-20px_0_60px_rgba(0,0,0,0.08)]

//           transition-all
//           duration-700

//           ease-[cubic-bezier(0.22,1,0.36,1)]

//           ${isOpen
//             ? "pointer-events-auto translate-x-0 opacity-100"
//             : "translate-x-full opacity-0"
//           }
//         `}
//       >

//         {education && (
//           <div className="relative min-h-full px-7 py-8 sm:px-12 sm:py-12">

//             {/* =================================================
//                 TOP BAR
//             ================================================= */}

//             <div className="flex items-center justify-between">

//               <div className="flex items-center gap-4">

//                 <span
//                   className="
//                     text-[9px]
//                     uppercase
//                     tracking-[0.28em]
//                     text-neutral-500
//                   "
//                 >
//                   Education / {education.number}
//                 </span>

//                 <span className="h-px w-7 bg-neutral-300" />

//               </div>

//               {/* Close */}

//               <button
//                 type="button"
//                 onClick={onClose}
//                 aria-label="Close"
//                 className="
//                   group
//                   flex
//                   h-9
//                   w-9
//                   items-center
//                   justify-center

//                   rounded-full
//                   border
//                   border-neutral-300

//                   transition-all
//                   duration-300
//                   cursor-none target-hand

//                   hover:bg-[#111111]
//                   hover:text-white
//                 "
//               >
//                 <span
//                   className="
//                     text-lg
//                     font-light
//                     leading-none

//                     transition-transform
//                     duration-300

//                     group-hover:rotate-90
//                   "
//                 >
//                   ×
//                 </span>
//               </button>

//             </div>

//             {/* =================================================
//                 HEADER
//             ================================================= */}

//             <div className="mt-20">

//               <p
//                 className="
//                   text-[9px]
//                   uppercase
//                   tracking-[0.28em]
//                   text-neutral-500
//                 "
//               >
//                 {education.year}
//               </p>

//               <h2
//                 className="
//                   mt-6
//                   max-w-xl
//                   font-serif
//                   text-[2.5rem]
//                   font-normal
//                   leading-[1.08]
//                   tracking-[-0.035em]

//                   sm:text-[3.5rem]
//                 "
//               >
//                 {education.title}
//               </h2>

//               <div className="my-8 h-px w-10 bg-neutral-400" />

//               <p className="text-[11px]  font-semibold">
//                 {education.school}
//               </p>

//               <p className="mt-1 text-[11px] text-neutral-500">
//                 {education.location}
//               </p>

//             </div>

//             {/* =================================================
//                 INTRO
//             ================================================= */}

//             <div className="mt-16">

//               <p
//                 className="
//                   max-w-lg
//                   text-[13px]
//                   leading-[1.9]
//                   text-neutral-600
//                 "
//               >
//                 {education.details.intro}
//               </p>

//             </div>

//             {/* =================================================
//                 WHAT I LEARNED
//             ================================================= */}

//             <div className="mt-16">

//               <SectionLabel>
//                 What I learned
//               </SectionLabel>

//               <div className="mt-6 grid grid-cols-1 gap-x-8 sm:grid-cols-2">

//                 {education.details.learned.map(
//                   (item, index) => (
//                     <div
//                       key={item}
//                       className="
//                         flex
//                         items-center
//                         gap-3
//                         border-b
//                         border-neutral-200
//                         py-4
//                       "
//                     >
//                       <span className="text-[9px] text-neutral-400">
//                         0{index + 1}
//                       </span>

//                       <span className="text-[11px]">
//                         {item}
//                       </span>
//                     </div>
//                   )
//                 )}

//               </div>

//             </div>

//             {/* =================================================
//                 EXPLORED
//             ================================================= */}

//             <div className="mt-16">

//               <SectionLabel>
//                 Areas I explored
//               </SectionLabel>

//               <div className="mt-6 flex flex-wrap gap-2">

//                 {education.details.explored.map(
//                   (item) => (
//                     <span
//                       key={item}
//                       className="
//                         rounded-full
//                         border
//                         border-neutral-300
//                         px-4
//                         py-2

//                         text-[9px]
//                         uppercase
//                         tracking-[0.12em]
//                         text-neutral-600

//                         transition-colors
//                         duration-300

//                         hover:border-neutral-700
//                         hover:text-neutral-900
//                       "
//                     >
//                       {item}
//                     </span>
//                   )
//                 )}

//               </div>

//             </div>

//             {/* =================================================
//                 BOTTOM
//             ================================================= */}

//             <div
//               className="
//                 mt-20
//                 flex
//                 items-center
//                 justify-between
//                 border-t
//                 border-neutral-200
//                 pt-6
//               "
//             >
//               <span
//                 className="
//                   text-[9px]
//                   uppercase
//                   tracking-[0.2em]
//                   text-neutral-400
//                 "
//               >
//                 {education.number} / 02
//               </span>

//               <button
//                 type="button"
//                 onClick={onClose}
//                 className="
//                   text-[9px]
//                   uppercase
//                   tracking-[0.2em]

//                   transition-transform
//                   duration-300

//                   hover:translate-x-1
//                 "
//               >
//                 Close →
//               </button>
//             </div>

//           </div>
//         )}

//       </aside>
//     </div>
//   );
// }


// /* =============================================================
//    SMALL SECTION LABEL
// ============================================================= */

// function SectionLabel({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <div className="flex items-center gap-3">

//       <span
//         className="
//           text-[9px]
//           font-medium
//           uppercase
//           tracking-[0.25em]
//           text-neutral-500
//         "
//       >
//         {children}
//       </span>

//       <span className="h-px w-6 bg-neutral-300" />

//     </div>
//   );
// }