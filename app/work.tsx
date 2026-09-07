// import React from "react";
// import { ArrowUpRight, Cat, Sparkles } from "lucide-react";

// import HoverWord from "@/components/hoverword";
// import HeadingTitle from "@/components/heading";

// type Project = {
//   number: string;
//   title: string;
//   category: string;
//   year: string;
//   image: string;
//   description: string;
//   technologies: string[];
//   github?: string;
//   details?: string;
// };

// const projects: Project[] = [
//   {
//     number: "01",
//     title: "CurEase",
//     category: "Healthcare",
//     year: "2025",
//     image: "/curease.png",
//     description:
//       "An AI-powered health-tech platform for symptom analysis, nutrition insights, medical report tracking, and doctor-patient interaction.",
//     technologies: ["React", "Three.js", "GSAP"],
//     github: "https://github.com/yourusername/kinetic",
//     details: "/projects/kinetic",
//   },
//   {
//     number: "02",
//     title: "NoteLM",
//     category: "AI/ML",
//     year: "2026",
//     image: "/notelm.png",
//     description:
//       "A full-stack AI learning platform that transforms study materials into interactive chats, quizzes, live sessions, and personalized learning analytics using RAG and LLMs.",
//     technologies: ["React", "Three.js", "GSAP"],
//     github: "https://github.com/prasad-pranay/NoteLM",
//     details: "/projects/kinetic",
//   },
//   {
//     number: "03",
//     title: "ReviewLens",
//     category: "Data Science",
//     year: "2025",
//     image: "/reviewlens.png",
//     description:
//       "An AI-powered platform that analyzes product sentiment and compares brands to uncover public perception and market positioning.",
//     technologies: ["React", "WebGL", "GSAP"],
//     github: "https://github.com/yourusername/aether",
//     details: "/projects/aether",
//   },
//   {
//     number: "04",
//     title: "Swello",
//     category: "Sports • Community",
//     year: "2025",
//     image: "/swello.png",
//     description:
//       "A sports platform connecting players with teammates, matches, and local sports communities.",
//     technologies: ["Next.js", "Tailwind", "Motion"],
//     github: "https://github.com/yourusername/nova",
//     details: "/projects/nova",
//   },
// ];

// const ProjectShowcase = () => {
//   return (
//     <section className="relative w-full px-6 sm:py-20 lg:max-w-7xl lg:px-0">
//       {/* =====================================
//           HEADER
//       ====================================== */}

//       <div className="mb-10 flex flex-col justify-between sm:flex-row sm:items-end">
//         <div>
//           <HeadingTitle title="Selected work" value="01" />

//           <div className="flex items-baseline gap-3">
//             <h2
//               className="
//                 text-7xl
//                 font-bold
//                 leading-[0.85]
//                 tracking-[-0.065em]
//                 text-[var(--foreground)]
//                 sm:text-8xl
//               "
//             >
//               <HoverWord text="Projects" />

//               <span className="text-[#ff5a36]">
//                 <HoverWord text="." />
//               </span>
//             </h2>
//           </div>
//         </div>

//         {/* ALL PROJECTS */}

//         <button
//           type="button"
//           className="
//             group
//             relative
//             mt-10
//             flex
//             cursor-none
//             items-center
//             gap-2
//             pb-1
//             text-[10px]
//             font-medium
//             uppercase
//             tracking-[0.2em]
//             text-neutral-400
//             transition-colors
//             duration-300
//             hover:text-[var(--foreground)]
//             sm:mt-0
//           "
//         >
//           <span>All Projects</span>

//           <ArrowUpRight
//             className="
//               h-3.5
//               w-3.5
//               stroke-[1.5]
//               transition-all
//               duration-300
//               group-hover:translate-x-1
//               group-hover:-translate-y-1
//             "
//           />

//           <span
//             className="
//               absolute
//               bottom-0
//               left-0
//               h-px
//               w-0
//               bg-[var(--foreground)]
//               transition-all
//               duration-300
//               group-hover:w-full
//             "
//           />
//         </button>
//       </div>

//       {/* =====================================
//           PROJECT LIST
//       ====================================== */}

//       <div className="relative mt-20 w-full border-t border-neutral-200">
//         {projects.map((project, index) => {
//           const imageLeft = index % 2 === 0;

//           return (
//             <article
//               key={project.number}
//               className="project-reveal group relative w-full border-b border-[var(--foreground)]/50 py-12 lg:py-20"
//             >
//               <div
//                 className={`
//                   flex
//                   flex-col
//                   items-center
//                   gap-8
//                   lg:gap-14
//                   ${
//                     imageLeft
//                       ? "lg:flex-row"
//                       : "lg:flex-row-reverse"
//                   }
//                 `}
//               >
//                 {/* =====================================
//                     IMAGE
//                 ====================================== */}

//                 <div
//                   className={`
//                     project-image-reveal
//                     relative
//                     aspect-[16/10]
//                     w-full
//                     shrink-0
//                     overflow-hidden
//                     rounded-2xl
//                     bg-neutral-100
//                     lg:w-[48%]
//                     ${
//                       imageLeft
//                         ? "project-image-left"
//                         : "project-image-right"
//                     }
//                   `}
//                 >
//                   <img
//                     src={project.image}
//                     alt={project.title}
//                     loading={index === 0 ? "eager" : "lazy"}
//                     decoding="async"
//                     className="
//                       absolute
//                       inset-0
//                       h-full
//                       w-full
//                       object-cover
//                       transition-all
//                       duration-700
//                       ease-out
//                       sm:grayscale
//                       group-hover:scale-[1.04]
//                       group-hover:grayscale-0
//                     "
//                   />

//                   {/* IMAGE OVERLAY */}

//                   <div
//                     className="
//                       absolute
//                       inset-0
//                       bg-black/0
//                       transition-colors
//                       duration-500
//                       group-hover:bg-black/5
//                     "
//                   />

//                   {/* NUMBER */}

//                   <div
//                     className="
//                       absolute
//                       left-4
//                       top-4
//                       flex
//                       h-9
//                       w-9
//                       items-center
//                       justify-center
//                       rounded-full
//                       bg-white/90
//                       text-[11px]
//                       font-medium
//                       text-neutral-900
//                       backdrop-blur-sm
//                     "
//                   >
//                     {project.number}
//                   </div>
//                 </div>

//                 {/* =====================================
//                     CONTENT
//                 ====================================== */}

//                 <div
//                   className={`
//                     project-content-reveal
//                     w-full
//                     flex-1
//                     ${
//                       imageLeft
//                         ? "project-content-right"
//                         : "project-content-left"
//                     }
//                   `}
//                 >
//                   {/* META */}

//                   <div className="mb-5 flex items-center gap-4">
//                     <span
//                       className="
//                         text-[10px]
//                         uppercase
//                         tracking-[0.15em]
//                         text-neutral-500
//                         sm:text-[11px]
//                       "
//                     >
//                       {project.category}
//                     </span>

//                     <span className="h-px w-6 bg-neutral-300" />

//                     <span
//                       className="
//                         text-[10px]
//                         uppercase
//                         tracking-[0.15em]
//                         text-neutral-500
//                         sm:text-[11px]
//                       "
//                     >
//                       {project.year}
//                     </span>
//                   </div>

//                   {/* TITLE */}

//                   <div className="flex items-start justify-between gap-6">
//                     <h3
//                       className="
//                         bricolage-grotesque
//                         max-w-[600px]
//                         text-[42px]
//                         font-medium
//                         leading-[0.95]
//                         tracking-[-0.045em]
//                         text-[var(--foreground)]
//                         transition-transform
//                         duration-500
//                         ease-out
//                         group-hover:translate-x-1
//                         sm:text-[52px]
//                         lg:text-[58px]
//                       "
//                     >
//                       <HoverWord text={project.title} />
//                     </h3>

//                     {/* ARROW */}

//                     <div
//                       className="
//                         mt-2
//                         flex
//                         h-11
//                         w-11
//                         shrink-0
//                         items-center
//                         justify-center
//                         rounded-full
//                         border
//                         border-[var(--foreground)]
//                         transition-all
//                         duration-500
//                         group-hover:border-[#ff5a36]
//                         group-hover:bg-[#ff5a36]
//                       "
//                     >
//                       <ArrowUpRight
//                         className="
//                           h-5
//                           w-5
//                           stroke-[1.4]
//                           text-[var(--foreground)]
//                           transition-all
//                           duration-500
//                           group-hover:-translate-y-0.5
//                           group-hover:translate-x-0.5
//                           group-hover:text-white
//                         "
//                       />
//                     </div>
//                   </div>

//                   {/* DESCRIPTION */}

//                   <p
//                     className="
//                       mt-7
//                       max-w-[500px]
//                       text-lg
//                       font-light
//                       leading-6
//                       -tracking-[0.01rem]
//                       text-[var(--foreground)]/45
//                     "
//                   >
//                     {project.description}
//                   </p>

//                   {/* DETAILS */}

//                   <div className="mt-8 flex flex-wrap items-center gap-3">
//                     {/* GITHUB */}

//                     {project.github && (
//                       <a
//                         href={project.github}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="
//                           group/github
//                           inline-flex
//                           cursor-none
//                           items-center
//                           gap-2
//                           rounded
//                           px-4
//                           py-2.5
//                           text-xs
//                           font-medium
//                           text-[var(--foreground)]
//                           transition-all
//                           duration-300
//                           hover:bg-[var(--foreground)]
//                           hover:text-[var(--background)]
//                         "
//                       >
//                         <Cat
//                           className="
//                             h-4
//                             w-4
//                             transition-transform
//                             duration-300
//                             group-hover/github:rotate-[-8deg]
//                           "
//                         />

//                         <span>GitHub</span>

//                         <ArrowUpRight
//                           className="
//                             h-3.5
//                             w-3.5
//                             transition-transform
//                             duration-300
//                             group-hover/github:-translate-y-0.5
//                             group-hover/github:translate-x-0.5
//                           "
//                         />
//                       </a>
//                     )}

//                     {/* AI SUMMARY */}

//                     <button
//                       type="button"
//                       className="
//                         group/ai
//                         inline-flex
//                         cursor-none
//                         items-center
//                         gap-2
//                         rounded
//                         px-4
//                         py-2.5
//                         text-xs
//                         font-light
//                         text-[var(--foreground)]
//                         transition-all
//                         duration-300
//                         hover:bg-[var(--foreground)]
//                         hover:text-[var(--background)]
//                       "
//                     >
//                       <Sparkles
//                         className="
//                           h-4
//                           w-4
//                           transition-transform
//                           duration-500
//                           group-hover/ai:rotate-12
//                           group-hover/ai:scale-110
//                         "
//                       />

//                       <span>Summarize with AI</span>
//                     </button>

//                     {/* VIEW PROJECT */}

//                     {project.details && (
//                       <a
//                         href={project.details}
//                         className="
//                           ml-auto
//                           hidden
//                           cursor-none
//                           items-center
//                           gap-1.5
//                           rounded
//                           px-5
//                           py-3
//                           text-[10px]
//                           uppercase
//                           tracking-[0.14em]
//                           text-[var(--foreground)]/60
//                           transition-all
//                           duration-300
//                           hover:bg-[#ff5a36]
//                           hover:text-[var(--background)]
//                           sm:inline-flex
//                         "
//                       >
//                         View project

//                         <ArrowUpRight
//                           className="
//                             h-3
//                             w-3
//                             transition-transform
//                             duration-300
//                             group-hover:-translate-y-0.5
//                             group-hover:translate-x-0.5
//                           "
//                         />
//                       </a>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </article>
//           );
//         })}
//       </div>
//     </section>
//   );
// };

// export default ProjectShowcase;


// aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa



"use client";
import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  ArrowUpRight,
  Cat,
  Sparkles,
} from "lucide-react";
import HoverWord from "@/components/hoverword";
import { motion } from "framer-motion";
import HeadingTitle from "@/components/heading";

type Project = {
  number: string;
  title: string;
  category: string;
  year: string;
  image: string;
  video: string;
  description: string;
  technologies: string[];
  github?: string;
  details?: string;
};

const projects: Project[] = [
  {
    number: "01",
    title: "CurEase",
    category: "Healthcare",
    year: "2025",
    image: "/curease.png",
    video: "/curease.mp4",
    description:
    "An AI-powered health-tech platform for symptom analysis, nutrition insights, medical report tracking, and doctor-patient interaction.",
    technologies: ["React", "Three.js", "GSAP"],
    github: "https://github.com/prasad-pranay/curease",
    details: "/projects/kinetic",
  },
  {
    number: "02",
    title: "NoteLM",
    category: "AI/ML",
    year: "2026",
    image: "/notelm.png",
    video: "/notelm.mp4",
    description:
      "A full-stack AI learning platform that transforms study materials into interactive chats, quizzes, live sessions, and personalized learning analytics using RAG and LLMs.",
    technologies: ["React", "Three.js", "GSAP"],
    github: "https://github.com/prasad-pranay/NoteLM",
    details: "/projects/kinetic",
  },
  {
    number: "03",
    title: "ReviewLens",
    category: "Data Science",
    year: "2025",
    image: "/reviewlens.png",
    video: "/reviewlens.mp4",
    description:
    "An AI-powered platform that analyzes product sentiment and compares brands to uncover public perception and market positioning.",
    technologies: ["React", "WebGL", "GSAP"],
    github: "https://github.com/yourusername/reviewlens",
    details: "/projects/aether",
  },
  {
   number: "04",
   title: "My Portfolio",
   category: "UI/UX • RAG",
   year: "2025",
   image: "/portfolio.png",
   video: "/swello.mp4",
   description:
     "Next.js portfolio with a Gemini + RAG chatbot for answering questions about my work and experience.",
   technologies: ["Next.js", "Tailwind", "Motion"],
   github: "https://github.com/prasad-pranay/resume",
   details: "/projects/nova",
 }, 
];

const ProjectShowcase: React.FC = () => {
  const [activeProject, setActiveProject] =
    useState<number | null>(null);

  const [popupVisible, setPopupVisible] =
    useState(false);

  /*
   * DOM reference to the popup.
   *
   * We directly update transform on this element
   * instead of causing React to re-render on every
   * mouse movement.
   */
  const popupRef =
    useRef<HTMLDivElement | null>(null);

  /*
   * Current smooth position.
   */
  const currentPosition = useRef({
    x: 0,
    y: 0,
  });

  /*
   * Target position.
   */
  const targetPosition = useRef({
    x: 0,
    y: 0,
  });

  /*
   * Mouse position.
   *
   * This is kept separately because the popup
   * can be clamped while the actual mouse keeps moving.
   */
  const mousePosition = useRef({
    x: 0,
    y: 0,
  });

  const animationFrame =
    useRef<number | null>(null);

  const closeTimeout =
    useRef<ReturnType<typeof setTimeout> | null>(
      null
    );

  const rowHovered = useRef(false);
  const popupHovered = useRef(false);

  /*
   * ----------------------------------------
   * POPUP POSITION
   * ----------------------------------------
   */

  const updatePopupPosition = useCallback(() => {
    const popup = popupRef.current;

    if (!popup) {
      animationFrame.current =
        requestAnimationFrame(
          updatePopupPosition
        );

      return;
    }

    const popupRect =
      popup.getBoundingClientRect();

    const popupWidth = popupRect.width;
    const popupHeight = popupRect.height;

    const viewportWidth =
      window.innerWidth;

    const viewportHeight =
      window.innerHeight;

    /*
     * Distance between mouse and popup.
     */
    const OFFSET_X = 28;
    const OFFSET_Y = 24;

    /*
     * Minimum distance from viewport edges.
     */
    const EDGE_PADDING = 16;

    /*
     * ------------------------------------
     * DESIRED X
     * ------------------------------------
     */

    let desiredX =
      mousePosition.current.x +
      OFFSET_X;

    /*
     * If popup doesn't fit on the right,
     * clamp it.
     */
    const maxX =
      viewportWidth -
      popupWidth -
      EDGE_PADDING;

    const minX = EDGE_PADDING;

    desiredX = Math.max(
      minX,
      Math.min(desiredX, maxX)
    );

    /*
     * ------------------------------------
     * DESIRED Y
     * ------------------------------------
     */

    let desiredY =
      mousePosition.current.y +
      OFFSET_Y;

    const maxY =
      viewportHeight -
      popupHeight -
      EDGE_PADDING;

    const minY = EDGE_PADDING;

    desiredY = Math.max(
      minY,
      Math.min(desiredY, maxY)
    );

    /*
     * ------------------------------------
     * SMOOTH FOLLOW
     * ------------------------------------
     *
     * Lower value = slower / more floaty
     *
     * Higher value = faster / more attached
     */

    const FOLLOW_SPEED = 0.13;

    currentPosition.current.x +=
      (desiredX -
        currentPosition.current.x) *
      FOLLOW_SPEED;

    currentPosition.current.y +=
      (desiredY -
        currentPosition.current.y) *
      FOLLOW_SPEED;

    /*
     * ------------------------------------
     * APPLY TRANSFORM
     * ------------------------------------
     */

    popup.style.transform = `
      translate3d(
        ${currentPosition.current.x}px,
        ${currentPosition.current.y}px,
        0
      )
    `;

    animationFrame.current =
      requestAnimationFrame(
        updatePopupPosition
      );
  }, []);

  /*
   * Start animation loop.
   */

  useEffect(() => {
    animationFrame.current =
      requestAnimationFrame(
        updatePopupPosition
      );

    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(
          animationFrame.current
        );
      }
    };
  }, [updatePopupPosition]);

  /*
   * ----------------------------------------
   * MOUSE MOVEMENT
   * ----------------------------------------
   */

  const handleMouseMove = (
    event: React.MouseEvent
  ) => {
    mousePosition.current = {
      x: event.clientX,
      y: event.clientY,
    };
  };

  /*
   * ----------------------------------------
   * OPEN
   * ----------------------------------------
   */

  const openPopup = (
    index: number,
    event: React.MouseEvent
  ) => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
    }

    rowHovered.current = true;

    mousePosition.current = {
      x: event.clientX,
      y: event.clientY,
    };

    /*
     * Start popup close to the cursor
     * so it doesn't fly in from somewhere
     * random.
     */
    currentPosition.current = {
      x: event.clientX + 28,
      y: event.clientY + 24,
    };

    setActiveProject(index);

    /*
     * Let React mount the popup first.
     */
    requestAnimationFrame(() => {
      setPopupVisible(true);
    });
  };

  /*
   * ----------------------------------------
   * CLOSE
   * ----------------------------------------
   */

  const scheduleClose = () => {
    rowHovered.current = false;

    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
    }

    closeTimeout.current = setTimeout(() => {
      if (
        !rowHovered.current &&
        !popupHovered.current
      ) {
        setPopupVisible(false);

        /*
         * Wait for closing animation to finish
         * before removing the project.
         */
        setTimeout(() => {
          if (
            !rowHovered.current &&
            !popupHovered.current
          ) {
            setActiveProject(null);
          }
        }, 420);
      }
    }, 100);
  };

  /*
   * ----------------------------------------
   * CANCEL CLOSE
   * ----------------------------------------
   */

  const cancelClose = () => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
    }
  };

  const activeProjectData =
    activeProject !== null
      ? projects[activeProject]
      : null;

  return (
    <section id='projects' className="relative w-full lg:px-0 px-6 sm:py-20 lg:max-w-7xl">
      {/* =====================================
          HEADER
      ====================================== */}

      <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between">

  {/* LEFT */}
  <div>

    {/* LABEL */}
    <HeadingTitle title="Selected work" value="01" />

    {/* TITLE */}
    <div className="flex items-baseline gap-3">

      <h2
        className="
          text-7xl
          sm:text-8xl
          font-bold
          leading-[0.85]
          tracking-[-0.065em]
          text-[var(--foreground)]
        "
      >
        <HoverWord text="Projects" />

        <span className="text-[#ff5a36]">
          <HoverWord text="." />
        </span>
      </h2>

    </div>

  </div>

  {/* RIGHT */}
  <button
  type="button"
  className="
    group
    relative
    flex
    items-center
    gap-2
    sm:mt-0 mt-10
    cursor-none target-hand
    pb-1
    text-[10px]
    font-medium
    uppercase
    tracking-[0.2em]
    text-neutral-400
    transition-colors
    duration-300
    hover:text-[var(--foreground)]
  "
>
  <span>All Projects</span>

  <ArrowUpRight
    className="
      h-3.5
      w-3.5
      stroke-[1.5]
      transition-all
      duration-300
      group-hover:translate-x-1
      group-hover:-translate-y-1
    "
  />

  <span
    className="
      absolute
      bottom-0
      left-0
      h-px
      w-0
      bg-[var(--foreground)]
      transition-all
      duration-400
      group-hover:w-full
    "
  />
</button>

</div>

      {/* =====================================
          PROJECT LIST
      ====================================== */}

      <div className="relative w-full border-t border-neutral-200 mt-20">

        {projects.map((project, index) => {
  const isActive = activeProject === index;
  const anotherActive =
    activeProject !== null && !isActive;

  const imageLeft = index % 2 === 0;

  return (
    <motion.div
      key={project.number}
      // onMouseEnter={(event) => openPopup(index, event)}
      // onMouseMove={handleMouseMove}
      // onMouseLeave={scheduleClose}
      initial={{
        opacity: 0,
        y: 70,
      }}
      whileInView={{
        opacity: anotherActive ? 0.3 : 1,
        y: 0,
      }}
      viewport={{
        once: false,
        amount: 0.2,
      }}
      transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        group
        relative
        w-full
        py-12
        lg:py-20
        border-b
        border-[var(--foreground)]/50
      "
    >
      <div
        className={`
          flex
          flex-col
          ${imageLeft
            ? "lg:flex-row"
            : "lg:flex-row-reverse"
          }
          gap-8
          lg:gap-14
          items-center
        `}
      >

        {/* IMAGE */}
        <motion.div
          initial={{
            opacity: 0,
            x: imageLeft ? -45 : 45,
            scale: 0.96,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
            scale: 1,
          }}
          viewport={{
            once: false,
            amount: 0.25,
          }}
          transition={{
            duration: 0.8,
            delay: 0.05,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            relative
            w-full
            lg:w-[48%]
            aspect-[16/10]
            shrink-0
            overflow-hidden
            rounded-2xl
            bg-neutral-100
          "
        >
          <img
            src={project.image}
            alt={project.title}
            className="
              absolute
              inset-0
              h-full
              w-full
              object-cover
              sm:grayscale
              transition-all
              duration-700
              ease-out
              group-hover:scale-[1.04]
              group-hover:grayscale-0
            "
          />

          {/* IMAGE OVERLAY */}
          <div
            className="
              absolute
              inset-0
              bg-black/0
              transition-colors
              duration-500
              group-hover:bg-black/5
            "
          />

          {/* NUMBER */}
          <div
            className="
              absolute
              top-4
              left-4
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              bg-white/90
              backdrop-blur-sm
              text-[11px]
              font-medium
              text-neutral-900
            "
          >
            {project.number}
          </div>
        </motion.div>

        {/* CONTENT */}
        <motion.div
          initial={{
            opacity: 0,
            x: imageLeft ? 45 : -45,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          viewport={{
            once: false,
            amount: 0.25,
          }}
          transition={{
            duration: 0.75,
            delay: 0.12,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="flex-1 w-full"
        >

          {/* META */}
          <div className="mb-5 flex items-center gap-4">
            <span
              className="
                text-[10px]
                sm:text-[11px]
                uppercase
                tracking-[0.15em]
                text-neutral-500
              "
            >
              {project.category}
            </span>

            <span className="h-px w-6 bg-neutral-300" />

            <span
              className="
                text-[10px]
                sm:text-[11px]
                uppercase
                tracking-[0.15em]
                text-neutral-500
              "
            >
              {project.year}
            </span>
          </div>

          {/* TITLE */}
          <div className="flex items-start justify-between gap-6">
            <h3
              className="
                max-w-[600px]
                text-[42px]
                sm:text-[52px]
                lg:text-[58px]
                leading-[0.95]
                tracking-[-0.045em]
                font-medium
                text-[var(--foreground)]
                transition-transform
                duration-500
                ease-out
                group-hover:translate-x-1
                bricolage-grotesque
              "
            >
              <HoverWord text={project.title} />
            </h3>

            {/* ARROW */}
            <div
              className="
                mt-2
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-full
                border
                border-[var(--foreground)]
                transition-all
                duration-500
                group-hover:bg-[#ff5a36]
                group-hover:border-[#ff5a36]
              "
            >
              <ArrowUpRight
                className={`
                  h-5
                  w-5
                  stroke-[1.4]
                  transition-all
                  duration-500
                  ${
                    isActive
                      ? "rotate-45 translate-x-0.5 -translate-y-0.5 text-[var(--background)]"
                      : "text-[var(--foreground)]"
                  }
                  group-hover:text-white
                `}
              />
            </div>
          </div>

          {/* DESCRIPTION */}
          <p
            className="
              mt-7
              max-w-[500px]
              text-lg
            leading-6
            font-light
            -tracking-[0.01rem]
            text-[var(--foreground)]/45
            "
          >
            {project.description}
          </p>

          {/* DETAILS */}
          <div
            className="
              mt-8
              flex
              flex-wrap
              items-center
              gap-3
            "
          >

            {/* GITHUB */}
            {project.github && (
             <a
  href={project.github}
  target="_blank"
  rel="noopener noreferrer"
  onClick={(e) => e.stopPropagation()}
  className="
    group/github
    inline-flex
    items-center
    gap-1.5
    rounded-md
    px-3
    py-2
    text-xs
    font-medium
    text-[var(--muted-foreground)]
    transition-colors
    duration-200
    hover:bg-[var(--foreground)]
    hover:text-[var(--background)]
    encode-sans
    cursor-none
    target-hand
  "
>
  <Cat
    className="
      h-3.5
      w-3.5
      transition-transform
      duration-200
      group-hover/github:-rotate-6
    "
  />

  <span>GitHub</span>

  <ArrowUpRight
    className="
      h-3
      w-3
      transition-transform
      duration-200
      group-hover/github:translate-x-0.5
      group-hover/github:-translate-y-0.5
    "
  />
</a>
            )}

            {/* AI SUMMARY */}
            <button
  type="button"
  onClick={(e) => {
    e.stopPropagation();
    // summarizeProject(project)
  }}
  className="
    group/ai
    inline-flex
    cursor-none
    target-hand
    items-center
    gap-1.5
    text-xs
    font-medium
    text-[var(--muted-foreground)]
    transition-colors
    duration-200
    py-2 px-3 rounded
    hover:text-[var(--foreground)]
    hover:bg-[var(--foreground)]/10
    encode-sans
  "
>
  <Sparkles
    className="
      h-3.5
      w-3.5
      transition-transform
      duration-300
      group-hover/ai:rotate-12
      group-hover/ai:scale-110
    "
  />

  <span>Summarize with AI</span>
</button>

            {/* VIEW PROJECT */}
            <span
              className="
                ml-auto
                hidden
                sm:inline-flex
                items-center
                gap-1.5
                text-[10px]
                uppercase
                tracking-[0.14em]
                text-[var(--foreground)]/60
                transition-all
                duration-300
                group-hover:text-[var(--foreground)]
                target-hand
                encode-sans
                shadow
                hover:shadow-lg
                px-5 py-4 rounded
                active:scale-80
              "
            >
              More Details

              <ArrowUpRight
                className="
                  h-3
                  w-3
                  transition-transform
                  duration-300
                  group-hover:translate-x-0.5
                  group-hover:-translate-y-0.5
                "
              />
            </span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
})}
      </div>

      {/* =====================================
          FLOATING POPUP
      ====================================== */}

      {activeProjectData && (
        <div
          ref={popupRef}
          onMouseEnter={() => {
            popupHovered.current = true;
            cancelClose();
          }}
          onMouseLeave={() => {
            popupHovered.current = false;
            scheduleClose();
          }}
          className={`
            fixed
            left-0
            top-0
            z-[100]
            w-[min(780px,calc(100vw-32px))]
            will-change-transform
            ${
              popupVisible
                ? "pointer-events-auto opacity-100 scale-100 blur-0"
                : "pointer-events-none opacity-0 scale-[0.94] translate-y-3 blur-[5px]"
            }
            transition-[opacity,scale,filter]
            duration-[450ms]
            ease-[cubic-bezier(0.22,1,0.36,1)]
          `}
        >

          <div
            className="
              overflow-hidden
              rounded-2xl
              border
              border-neutral-200
              bg-white
              shadow-[0_30px_100px_rgba(0,0,0,0.16)]
            "
          >

            {/* =================================
                CONTENT
            ================================== */}

            <div className="grid grid-cols-[1fr_310px] gap-7 p-6">

              {/* LEFT */}

              <div className="flex min-w-0 flex-col">

                {/* METADATA */}

                <div className="mb-7 flex items-center gap-3">
                  <span className="text-[10px] text-neutral-400">
                    {activeProjectData.number}
                  </span>

                  <span className="h-px w-7 bg-neutral-200" />

                  <span className="text-[9px] uppercase tracking-[0.18em] text-neutral-400">
                    {activeProjectData.category}
                  </span>

                  <span className="text-[9px] text-neutral-400">
                    {activeProjectData.year}
                  </span>
                </div>

                {/* TITLE */}

                <h3
                  key={activeProjectData.title}
                  className="
                    mb-6
                    font-serif
                    text-[56px]
                    leading-none
                    tracking-[-0.05em]
                    text-neutral-950
                    animate-popup-title
                  "
                >
                  {activeProjectData.title}
                </h3>

                {/* DESCRIPTION */}

                <div
                  key={`${activeProjectData.title}-description`}
                  className="
                    max-w-[400px]
                    animate-popup-content
                  "
                >
                  <p className="mb-2 text-[9px] uppercase tracking-[0.18em] text-neutral-400">
                    About the project
                  </p>

                  <p className="text-sm leading-[1.65] text-neutral-700">
                    {activeProjectData.description}
                  </p>
                </div>

                {/* TECHNOLOGIES */}

                <div className="mt-6 flex flex-wrap gap-1.5">
                  {activeProjectData.technologies.map(
                    (technology, index) => (
                      <span
                        key={technology}
                        style={{
                          animationDelay: `${
                            100 + index * 45
                          }ms`,
                        }}
                        className="
                          rounded-full
                          border
                          border-neutral-200
                          px-3
                          py-1.5
                          text-[8px]
                          uppercase
                          tracking-wider
                          text-neutral-500
                          animate-popup-tag
                        "
                      >
                        {technology}
                      </span>
                    )
                  )}
                </div>
              </div>

              {/* =================================
                  VIDEO
              ================================== */}

              <div
                key={activeProjectData.video}
                className="
                  relative
                  h-[270px]
                  overflow-hidden
                  rounded-xl
                  bg-neutral-950
                  animate-popup-video
                "
              >
                <video
                  key={activeProjectData.video}
                  src={activeProjectData.video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="
                    absolute
                    inset-0
                    h-full
                    w-full
                    object-cover
                  "
                />

                <div className="absolute inset-0 bg-black/10" />

                <div
                  className="
                    absolute
                    left-4
                    top-4
                    flex
                    items-center
                    gap-2
                    rounded-full
                    bg-black/40
                    px-3
                    py-1.5
                    backdrop-blur-md
                  "
                >
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />

                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
                  </span>

                  <span className="text-[8px] uppercase tracking-[0.18em] text-white">
                    Live preview
                  </span>
                </div>
              </div>
            </div>

            {/* =================================
                ACTIONS
            ================================== */}

            <div
              className="
                flex
                items-center
                justify-between
                border-t
                border-neutral-100
                bg-neutral-50/70
                px-6
                py-3.5
              "
            >

              <button
                type="button"
                className="
                  group
                  flex
                  items-center
                  gap-2
                  rounded-full
                  bg-neutral-950
                  px-4
                  py-2.5
                  text-xs
                  font-medium
                  text-white
                  transition-all
                  duration-300
                  hover:bg-neutral-800
                "
              >
                <Sparkles
                  className="
                    h-3.5
                    w-3.5
                    transition-transform
                    duration-300
                    group-hover:rotate-12
                  "
                />

                Summarize with AI
              </button>

              <div className="flex items-center gap-2">

                <a
                  href={activeProjectData.details}
                  className="
                    group
                    flex
                    items-center
                    gap-2
                    rounded-full
                    border
                    border-neutral-200
                    bg-white
                    px-4
                    py-2.5
                    text-xs
                    font-medium
                    text-neutral-900
                    transition-all
                    duration-300
                    hover:bg-neutral-100
                  "
                >
                  View full details

                  <ArrowUpRight
                    className="
                      h-3.5
                      w-3.5
                      transition-transform
                      duration-300
                      group-hover:-translate-y-0.5
                      group-hover:translate-x-0.5
                    "
                  />
                </a>

                {activeProjectData.github && (
                  <a
                    href={activeProjectData.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-neutral-200
                      bg-white
                      transition-all
                      duration-300
                      hover:bg-neutral-950
                      hover:text-white
                    "
                  >
                    <Cat className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================
          ANIMATIONS
      ====================================== */}

      <style>{`

        @keyframes popupTitle {
          from {
            opacity: 0;
            transform: translateY(14px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes popupContent {
          from {
            opacity: 0;
            transform: translateY(10px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes popupVideo {
          from {
            opacity: 0;
            transform: scale(0.92);
          }

          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes popupTag {
          from {
            opacity: 0;
            transform: translateY(7px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-popup-title {
          animation:
            popupTitle
            500ms
            cubic-bezier(0.22, 1, 0.36, 1)
            both;
        }

        .animate-popup-content {
          animation:
            popupContent
            450ms
            cubic-bezier(0.22, 1, 0.36, 1)
            80ms
            both;
        }

        .animate-popup-video {
          animation:
            popupVideo
            600ms
            cubic-bezier(0.22, 1, 0.36, 1)
            both;
        }

        .animate-popup-tag {
          animation:
            popupTag
            400ms
            cubic-bezier(0.22, 1, 0.36, 1)
            both;
        }

      `}</style>
    </section>
  );
};

export default ProjectShowcase;