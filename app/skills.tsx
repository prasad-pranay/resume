"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  Code2,
  Database,
  Server,
  Wrench,
  Cloud,
} from "lucide-react";
import HoverWord from "@/components/hoverword";
import {motion} from "framer-motion";
import HeadingTitle from "@/components/heading";

type SkillCategory = {
  number: string;
  title: string;
  description: string;
  icon: React.ElementType;
  skills: string[];
};

const skillCategories: SkillCategory[] = [
  {
    number: "01",
    title: "Frontend",
    description:
      "Building responsive, interactive and polished interfaces.",
    icon: Code2,
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
    icon: Server,
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
    icon: Database,
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
    icon: Cloud,
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
    icon: Wrench,
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
  const sectionRef = useRef<HTMLElement>(null);

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.12,
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative bg-[var(--background)] px-5 sm:px-0 text-[#111111] w-full pt-60 sm:pt-0"
    >
      <div className="mx-auto max-w-7xl w-full px-0 sm:py-28 sm:px-10 sm:py-36 lg:px-0 lg:py-40">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div
          className={`
            transition-all
            duration-[1100ms]
            ease-[cubic-bezier(0.22,1,0.36,1)]

            ${
              visible
                ? "translate-y-0 opacity-100"
                : "translate-y-16 opacity-0"
            }
          `}
        >
          {/* =================================================
                LABEL
            ================================================= */}

            <HeadingTitle title="Skills" value="03" />


          {/* Heading + description */}

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.15fr_0.85fr]">

            {/* Heading */}

            <h2
              className="
                max-w-3xl
                bricolage-grotesque
                sm:text-[clamp(3.7rem,7vw,6.8rem)]
                font-light
                leading-[0.88]
                tracking-[-0.065em]
                text-[var(--foreground)]
                text-center sm:text-left
                text-7xl
              "
            >
              <HoverWord text="I build" />

              <br />

              <span className="bricolage-grotesque italic text-[#ff5a36]">
                
              <HoverWord text="full-stack" />
              </span>

              <br />

              <HoverWord text="experiences." />
            </h2>


            {/* Description */}

            <div
              className="
                flex
                items-end
                lg:pb-4
              "
            >
              <div className="">

                <p
                  className="
                    text-lg
            leading-6
            px-5 sm:px-0
            text-center
            sm:text-right
            font-light
            -tracking-[0.01rem]
            text-[var(--foreground)]/55

                    transition-all
                    duration-500
                    tracking-[-0.03em]
                    hover:translate-x-1
                    hover:text-[var(--foreground)]
                  "
                >
                  From interfaces to APIs,
                  databases to deployment —
                  I build products end to end.
                </p>

                <div
                  className="
                    mt-7
                    h-px
                    w-8
                    bg-neutral-500

                    transition-all
                    duration-500

                    hover:w-16
                  "
                />

              </div>
            </div>

          </div>
        </div>


        {/* =====================================================
            SKILLS
        ===================================================== */}

        <div className="mt-24">

          {skillCategories.map((category, index) => (
            <SkillRow
              key={category.number}
              category={category}
              index={index}
            />
          ))}

        </div>

      </div>
    </section>
  );
}


/* =============================================================
   SKILL ROW
============================================================= */

function SkillRow({
  category,
  index,
}: {
  category: SkillCategory;
  index: number;
}) {
  const rowRef = useRef<HTMLDivElement>(null);

  const [visible, setVisible] = useState(false);

//   useEffect(() => {
//     const row = rowRef.current;

//     if (!row) return;

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

//     observer.observe(row);

//     return () => observer.disconnect();
//   }, []);
useEffect(() => {
  const row = rowRef.current;

  if (!row) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        // Small reset so the CSS animation always starts fresh
        setVisible(false);

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setVisible(true);
          });
        });
      } else {
        // Reset when the row leaves the viewport,
        // whether it leaves from the top OR bottom.
        setVisible(false);
      }
    },
    {
      threshold: 0.15,
    }
  );

  observer.observe(row);

  return () => observer.disconnect();
}, []);

  const Icon = category.icon;

  return (
    <div
      ref={rowRef}
      className={`
        group
        relative
        border-t
        border-[var(--foreground)]/40
        text-[var(--foreground)]
        transition-all
        duration-1000
        ease-[cubic-bezier(0.22,1,0.36,1)]

        ${
          visible
            ? "translate-y-0 opacity-100"
            : "translate-y-12 opacity-0"
        }
      `}
      style={{
        transitionDelay: `${index * 80}ms`,
      }}
    >

      {/* =====================================================
          TOP ROW
      ===================================================== */}

      <div
        className="
          grid
          grid-cols-[70px_1fr_auto]
          gap-6
          py-7

          sm:grid-cols-[90px_1fr_auto]

          lg:grid-cols-[90px_1fr_180px_auto]
          lg:items-start
        "
      >

        {/* Number */}

        <div
          className="
            font-serif
            text-3xl
            font-normal
            tracking-[-0.04em]

            transition-transform
            duration-500

            group-hover:-translate-y-1
          "
        >
          {category.number}
        </div>


        {/* Title */}

        <div className="flex items-center gap-6">

          <span
            className="
              hidden
              h-px
              w-7
              bg-neutral-400

              transition-all
              duration-500

              group-hover:w-12

              sm:block
            "
          />

          <span
            className="
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.3em]

              transition-all
              duration-500

              group-hover:tracking-[0.38em]
            "
          >
            {category.title}
          </span>

        </div>


        {/* Description */}

        <p
          className="
            hidden
            max-w-[180px]

            text-[10px]
            leading-[1.7]
            text-neutral-500

            lg:block

            transition-all
            duration-500

            group-hover:text-neutral-800
          "
        >
          {category.description}
        </p>


        {/* Icon */}

        <div
          className="
            flex
            h-9
            w-9
            items-center
            justify-center

            transition-all
            duration-500

            group-hover:-translate-y-1
            group-hover:rotate-[-8deg]
          "
        >
          <Icon
            strokeWidth={1.4}
            className="
              h-5
              w-5

              transition-transform
              duration-500

              group-hover:scale-110
            "
          />
        </div>

      </div>


      {/* =====================================================
          SKILL LIST
      ===================================================== */}

      <div
        className="
          grid
          grid-cols-2
          gap-x-8
          gap-y-5

          pb-8
          pl-[70px]

          sm:grid-cols-3
          sm:pl-[90px]

          lg:grid-cols-3
          lg:gap-x-12
          lg:pl-[150px]
          lg:pr-16
        "
      >

        {category.skills.map((skill, skillIndex) => (
          <Skill
            key={skill}
            name={skill}
            index={skillIndex}
          />
        ))}

      </div>


      {/* =====================================================
          DOT GRID
      ===================================================== */}

      <div
        className="
          absolute
          bottom-8
          right-0
          hidden

          grid
          grid-cols-4
          gap-[6px]

          opacity-40

          lg:grid
        "
      >
        {Array.from({ length: 12 }).map((_, index) => (
          <span
            key={index}
            className="
              h-[2px]
              w-[2px]
              rounded-full
              bg-neutral-700

              transition-all
              duration-300
            "
            style={{
              transitionDelay: `${index * 15}ms`,
            }}
          />
        ))}
      </div>

    </div>
  );
}


/* =============================================================
   INDIVIDUAL SKILL
============================================================= */

function Skill({
  name,
  index,
}: {
  name: string;
  index: number;
}) {
  return (
    <div
      className="
        group/skill
        relative
        w-fit
        cursor-default

        text-[11px]
      "
    >

      <div className="flex items-center gap-2">

        {/* Skill name */}

        <span
          className="
            relative
            py-1

            transition-all
            duration-300

            group-hover/skill:translate-x-1
          "
        >
          {name}

          {/* Underline */}

          <span
            className="
              absolute
              bottom-0
              left-0

              h-px
              w-full

              origin-left
              bg-neutral-400

              transition-transform
              duration-300

              group-hover/skill:scale-x-0
              group-hover/skill:origin-right
            "
          />
        </span>


        {/* Arrow */}

        <span
          className="
            text-[13px]
            leading-none

            transition-all
            duration-300

            group-hover/skill:-translate-y-1
            group-hover/skill:translate-x-1
          "
        >
          ↗
        </span>

      </div>

    </div>
  );
}


/* =============================================================
   HOVER WORD
============================================================= */

// function HoverWord({
//   text,
// }: {
//   text: string;
// }) {
//   return (
//     <span className="group inline-block cursor-default">

//       {text.split("").map((char, index) => (
//         <span
//           key={`${char}-${index}`}
//           className="
//             inline-block

//             transition-transform
//             duration-500
//             ease-[cubic-bezier(0.22,1,0.36,1)]

//             group-hover:-translate-y-[3px]
//           "
//           style={{
//             transitionDelay: `${index * 12}ms`,
//           }}
//         >
//           {char === " " ? "\u00A0" : char}
//         </span>
//       ))}

//     </span>
//   );
// }