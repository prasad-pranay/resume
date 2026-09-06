"use client";

import { useEffect, useRef, useState } from "react";
import HoverWord from "@/components/hoverword";
import Heading from "@/components/heading";
import { motion } from "framer-motion";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const [visible, setVisible] = useState(false);

  /*
   * ---------------------------------------------------------
   * REVEAL SECTION WHEN IT ENTERS VIEW
   * ---------------------------------------------------------
   */

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
        threshold: 0.15,
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  /*
   * ---------------------------------------------------------
   * IMAGE PARALLAX
   * ---------------------------------------------------------
   */

  const handleMouseMove = (
    event: React.MouseEvent<HTMLElement>
  ) => {
    const image = imageRef.current;

    if (!image) return;

    const rect = image.getBoundingClientRect();

    const x =
      (event.clientX - rect.left) / rect.width - 0.5;

    const y =
      (event.clientY - rect.top) / rect.height - 0.5;

    image.style.transform = `
      translate(${x * 8}px, ${y * 8}px)
    `;
  };

  const handleMouseLeave = () => {
    const image = imageRef.current;

    if (!image) return;

    image.style.transform = "translate(0px, 0px)";
  };

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative overflow-hidden text-[#111111] w-full mt-40"
    >
      <div className="mx-auto px-5 sm:px-0 sm:max-w-7xl w-full py-28 sm:py-36 lg:py-40">

        {/* =====================================================
            MAIN GRID
        ===================================================== */}

        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr]">

          {/* =================================================
              LEFT
          ================================================= */}

          <div
            className={`
              flex
              flex-col
              justify-center

              transition-all
              duration-[1200ms]
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

            <Heading title="About Me" value="02" />


            {/* =================================================
                HEADING
            ================================================= */}

            <h2
              className="
              sm:mt-0 mt-8
                max-w-[700px]
                text-[clamp(3.7rem,7vw,6.8rem)]
                font-light
                leading-[0.9]
                tracking-[-0.065em]
                text-[var(--foreground)]
                bricolage-grotesque
              "
            >

              <HoverWord text="I " />
              <HoverWord text="build" />
              <br className="hidden sm:block" />

            <span className="text-[#ff5a36] sm:ml-0 ml-3">
              <HoverWord text="digital" />
            </span>
              <br />

              <HoverWord text="experiences." />

            </h2>


            {/* =================================================
                DESCRIPTION
            ================================================= */}

            <div
              className={`
                mt-12
                transition-all
                duration-[1200ms]
                delay-300
                ease-[cubic-bezier(0.22,1,0.36,1)]

                ${
                  visible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }
              `}
            >

              <p
                className="
                  max-w-[390px]

                  text-lg
            leading-6
            font-light
            -tracking-[0.01rem]
            text-[var(--foreground)]/55

                  transition-all
                  duration-500

                  hover:translate-x-1
                  hover:text-[var(--foreground)]
                "
              >
                I’m Pranay Prasad, a web developer who
                loves turning ideas into clean, interactive
                and purposeful experiences.
              </p>

            </div>


            {/* =================================================
                CTA
            ================================================= */}

            <a
              href="#projects"
              className="
                group
                relative
                mt-14
                flex
                w-fit
                items-center
                gap-8
                pb-3
                cursor-none target-hand

                text-[11px]
                font-medium
                uppercase
                tracking-[0.25em]
                text-[var(--foreground)]/60
                hover:text-[var(--foreground)]

                transition-all
                duration-300

                hover:gap-10
              "
            >

              <span>
                Know more about me
              </span>


              {/* Arrow */}

              <span
                className="
                  text-xl
                  font-light
                  leading-none

                  transition-all
                  duration-500
                  ease-out

                  group-hover:-translate-y-1
                  group-hover:translate-x-1
                "
              >
                ↗
              </span>


              {/* Underline */}

              <span
                className="
                  absolute
                  bottom-0
                  left-0
                  h-px
                  w-full
                  origin-left
                  //bg-neutral-900//
                  bg-[#ff5a36]

                  transition-transform
                  duration-500
                  ease-out

                  group-hover:scale-x-50
                  group-hover:origin-right
                "
              />

            </a>

          </div>


          {/* =================================================
              RIGHT / IMAGE
          ================================================= */}

          <div
            className={`
              relative
              mt-20
              flex
              items-center
              justify-center

              lg:mt-0
              lg:min-h-[600px]

              transition-all
              duration-[1400ms]
              delay-200
              ease-[cubic-bezier(0.22,1,0.36,1)]

              ${
                visible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-20 opacity-0"
              }
            `}
          >

            {/* =================================================
                VERTICAL LINE
            ================================================= */}

            <div
              className="
                absolute
                left-0
                top-0
                hidden
                h-full
                w-px
                bg-[var(--foreground)]/30

                lg:block

                transition-all
                duration-700

                hover:bg-neutral-900
              "
            />


            {/* =================================================
                IMAGE AREA
            ================================================= */}

            <div
              className="
                relative
                w-full
                max-w-[470px]
                group
                lg:ml-auto
              "
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >

              {/* Outer decorative circle */}

              <div
                className="
                  pointer-events-none
                  absolute
                  -right-4
                  -top-4
                  z-0

                  h-[calc(100%-30px)]
                  w-[calc(100%-30px)]

                  rounded-t-[50%]
                  rounded-b-[3px]

                  border
                  border-[var(--foreground)]/20

                  transition-all
                  duration-700

                  group-hover:scale-[1.02]
                "
              />


              {/* =================================================
                  IMAGE
              ================================================= */}

              <div
                ref={imageRef}
                className="
                  relative
                  z-10

                  overflow-hidden

                  rounded-t-[50%]
                  rounded-b-[3px]

                  bg-neutral-200

                  transition-transform
                  duration-500
                  ease-out

                  will-change-transform
                "
              >

                <img
                  src="/image.png"
                  alt="Portrait"
                  className="
                    block
                    aspect-[0.78]
                    w-full
                    object-cover

                    grayscale

                    transition-all
                    duration-[900ms]
                    ease-out

                    hover:scale-[1.035]
                    hover:grayscale-0
                  "
                />


                {/* Image overlay */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-0

                    bg-gradient-to-t
                    from-black/10
                    via-transparent
                    to-white/5

                    opacity-60

                    transition-opacity
                    duration-700

                    hover:opacity-20
                  "
                />

                <motion.div initial={{y:0}} whileInView={{y:"100%"}} viewport={{once:false}} transition={{duration:1}} className="h-full w-full bg-[var(--background)] absolute top-0 left-0"/>
              
              </div>


              {/* =================================================
                  IMAGE CORNER MARK
              ================================================= */}

              <div
                className={`
                  absolute
                  -bottom-5
                  -right-5
                  z-20

                  flex
                  h-12
                  w-12
                  items-center
                  justify-center

                  rounded-full
                  border
                  border-[var(--foreground)]
                  text-[var(--foreground)]

                  bg-[var(--background)]
                  group-hover:bg-[var(--foreground)]
                  group-hover:text-[var(--background)]

                  text-[14px]

                  transition-all
                  duration-500

                  hover:rotate-45
                  hover:border-neutral-900
                `}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4 transition duration-200 group-hover:-rotate-45">
  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
</svg>

              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

