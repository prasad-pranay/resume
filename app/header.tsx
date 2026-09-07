"use client";

import React, { useEffect, useState } from "react";
import ThemeToggle from "@/components/theme-toggle";
import { motion } from "framer-motion";

const navItems = ["Home", "Projects", "About", "Education", "Skills", "Contact"];

interface HeaderProps {
  setChatScreen: React.Dispatch<React.SetStateAction<boolean>>;
}
const Header = ({setChatScreen}:HeaderProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Lock page scrolling while mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Close menu with Escape
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <aside
        className="
          fixed
          left-0
          right-0
          top-0
          z-[1000]
          w-full
          px-5
          xl:px-0
        "
      >
        <section
          className="
            encode-sans
            mx-auto
            flex
            w-full
            items-center
            justify-between
            gap-4
            pt-8
            pb-5
            md:max-w-3xl
            lg:max-w-4xl
            xl:max-w-7xl
            xl:pt-10
          "
        >
          {/* ───────────────── LOGO ───────────────── */}

          <motion.a
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
            onClick={closeMenu}
            className="
              bricolage-grotesque
              group
              relative
              text-lg
              tracking-tight
            "
          >
            <span
              className="
                relative
                z-10
                transition-colors
                duration-300
                group-hover:text-[#ff5a36]
              "
            >
              PranayPrasad
            </span>

            <span
              className="
                absolute
                bottom-[3px]
                left-1/2
                h-[2px]
                w-1/2
                -translate-x-1/2
                rounded-full
                bg-[#ff5a36]
                transition-all
                duration-300
                group-hover:w-1/3
                group-hover:bg-[var(--foreground)]
              "
            />
          </motion.a>

          {/* ───────────────── DESKTOP ───────────────── */}

          <div className="hidden items-center gap-10 lg:flex">
            <nav className="flex items-center gap-9 opacity-0 transition duration-500 hover:opacity-100">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="
      group
      relative
      cursor-none
      py-1
      text-[13px]
      font-medium
      text-neutral-500
      transition-colors
      duration-200
      hover:text-neutral-900
      dark:text-neutral-400
      dark:hover:text-white
    "
                >
                  <span>{item}</span>

                  <span
                    className="
        absolute
        -bottom-0.5
        left-1/2
        h-1
        w-1
        -translate-x-1/2
        scale-0
        rounded-full
        bg-[#ff5a36]
        transition-transform
        duration-200
        group-hover:scale-100
      "
                  />
                </a>
              ))}
            </nav>

            <ThemeToggle />
          </div>

          {/* ───────────────── MOBILE CONTROLS ───────────────── */}

          <div className="flex items-center gap-3 lg:hidden">
            <ThemeToggle />

            <button
              type="button"
              aria-label={menuOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((prev) => !prev)}
              className="
                group
                relative
                flex
                h-11
                w-11
                items-center
                justify-center
                overflow-hidden
                rounded-full
                border
                border-black/10
                bg-white/70
                backdrop-blur-xl
                transition-all
                duration-300
                hover:scale-105
                hover:border-[#ff5a36]/40
                hover:bg-white
                active:scale-95
                dark:border-white/10
                dark:bg-white/5
              "
            >
              {/* Menu icon */}

              <span className="relative h-4 w-4">
                <span
                  className={`
                    absolute
                    left-0
                    top-1
                    h-px
                    w-4
                    bg-current
                    transition-all
                    duration-300
                    ${menuOpen
                      ? "top-2 rotate-45"
                      : "group-hover:w-3"
                    }
                  `}
                />

                <span
                  className={`
                    absolute
                    left-0
                    top-2
                    h-px
                    bg-[#ff5a36]
                    transition-all
                    duration-300
                    ${menuOpen
                      ? "w-4 -rotate-45"
                      : "w-2.5 group-hover:w-4"
                    }
                  `}
                />

                <span
                  className={`
                    absolute
                    left-0
                    top-3
                    h-px
                    w-4
                    bg-current
                    transition-all
                    duration-300
                    ${menuOpen
                      ? "scale-0 opacity-0"
                      : "group-hover:w-3"
                    }
                  `}
                />
              </span>
            </button>
          </div>
        </section>
      </aside>

      {/* ═════════════════ MOBILE MENU ═════════════════ */}

      <div
      data-lenis-prevent
        className={`
          fixed
          inset-0
          z-[999]
          lg:hidden
          transition-all
          duration-500
          ${menuOpen
            ? "pointer-events-auto visible"
            : "pointer-events-none invisible"
          }
        `}
      >
        {/* Backdrop */}

        <div
          onClick={closeMenu}
          className={`
            absolute
            inset-0
            bg-black/10
            backdrop-blur-md
            transition-opacity
            duration-500
            dark:bg-black/40
            ${menuOpen
              ? "opacity-100"
              : "opacity-0"
            }
          `}
        />

        {/* Floating menu */}


        <div
          className={`
    absolute
    left-4
    right-4
    top-[90px]
    h-[calc(100vh-200px)]
    overflow-y-auto
    rounded-[28px]
    border
    border-black/[0.08]
    bg-[var(--background)]
    p-5
    shadow-[0_25px_80px_rgba(0,0,0,0.12)]
    backdrop-blur-2xl
    transition-all
    duration-500
    ease-[cubic-bezier(0.22,1,0.36,1)]
    ${menuOpen
              ? "translate-y-0 scale-100 opacity-100"
              : "-translate-y-5 scale-[0.97] opacity-0"
            }
  `}
        >
          {/* ─────────────────────────────────────
      IN PAGE LINKS
  ───────────────────────────────────── */}

          <section>
            <div
              className={`
        mb-4
        flex
        items-center
        justify-between
        transition-all
        duration-500
        ${menuOpen
                  ? "translate-y-0 opacity-100"
                  : "translate-y-3 opacity-0"
                }
      `}
              style={{
                transitionDelay: menuOpen ? "100ms" : "0ms",
              }}
            >
              <p
                className="
          text-[10px]
          encode-sans
          uppercase
          font-medium
          tracking-[0.18em]
          text-black/40
          dark:text-white/40
        "
              >
                In page links
              </p>

              <span
                className="
          text-[9px]
          tabular-nums
          text-black/25
          dark:text-white/25
        "
              >
                06
              </span>
            </div>

            {/* Page links grid */}

            <nav className="grid grid-cols-2 gap-2">
              {navItems.map((item, index) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={closeMenu}
                  style={{
                    transitionDelay: menuOpen
                      ? `${150 + index * 60}ms`
                      : "0ms",
                  }}
                  className={`
            group
            relative
            flex
            min-h-[92px]
            flex-col
            justify-between
            overflow-hidden
            rounded
            border
            border-black/[0.07]
            p-4
            transition-all
            duration-500
            ease-[cubic-bezier(0.22,1,0.36,1)]
            hover:-translate-y-1
            hover:border-[#ff5a36]/30
            hover:bg-[#ff5a36]
            hover:shadow-[0_12px_30px_rgba(255,90,54,0.15)]
            dark:border-white/[0.08]
            dark:bg-white/[0.025]
            ${menuOpen
                      ? "translate-y-0 opacity-100"
                      : "translate-y-4 opacity-0"
                    }
          `}
                >
                  {/* Number */}

                  <span
                    className="
              text-[9px]
              font-medium
              text-black/30
              transition-colors
              duration-300
              encode-sans
              group-hover:text-white/60
              dark:text-white/30
            "
                  >
                    0{index + 1}
                  </span>

                  {/* Title + arrow */}

                  <div className="flex items-end justify-between">
                    <span
                      className="
                encode-sans
                text-[17px]
                font-medium
                tracking-tight
                transition-all
                duration-300
                group-hover:translate-x-0.5
                group-hover:text-white
              "
                    >
                      {item}
                    </span>

                    <span
                      className="
                text-sm
                text-black/30
                transition-all
                duration-300
                group-hover:-translate-y-0.5
                group-hover:translate-x-0.5
                group-hover:text-white
                dark:text-white/30
              "
                    >
                      ↗
                    </span>
                  </div>

                  {/* Bottom accent */}

                  <span
                    className="
              absolute
              bottom-0
              left-0
              h-[2px]
              w-0
              bg-white
              transition-all
              duration-500
              group-hover:w-full
            "
                  />
                </a>
              ))}
            </nav>
          </section>

          {/* ─────────────────────────────────────
      DIVIDER
  ───────────────────────────────────── */}

          <div
            className="
      my-7
      h-px
      w-full
      bg-black/[0.07]
      dark:bg-white/[0.08]
    "
          />

          {/* ─────────────────────────────────────
      CONNECT WITH ME
  ───────────────────────────────────── */}

          <section>
            <div
              className={`
        mb-4
        flex
        items-center
        justify-between
        transition-all
        duration-500
        ${menuOpen
                  ? "translate-y-0 opacity-100"
                  : "translate-y-3 opacity-0"
                }
      `}
              style={{
                transitionDelay: menuOpen ? "400ms" : "0ms",
              }}
            >
              <p
                className="
          text-[10px]
          font-medium
          uppercase
          encode-sans
          tracking-[0.18em]
          text-black/40
          dark:text-white/40
        "
              >
                Connect with me
              </p>

              <span
                className="
          text-[9px]
          tabular-nums
          text-black/25
          dark:text-white/25
        "
              >
                04
              </span>
            </div>

            {/* Social links */}
            <div className="grid grid-cols-2 gap-2">
              {[
                {
                  name: "Instagram",
                  icon: <svg viewBox="0 0 15.2 15.2" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-10">
                    <g transform="translate(-4.9, -4.4)">
                      <path clipRule="evenodd" d="M15.5 5h-6a4 4 0 0 0-4 4v6a4 4 0 0 0 4 4h6a4 4 0 0 0 4-4V9a4 4 0 0 0-4-4" className='stroke-[var(--foreground)]' strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                      <path clipRule="evenodd" d="M12.5 15a3 3 0 1 1 0-6 3 3 0 0 1 0 6" className='stroke-[var(--foreground)]' strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                      <rect x="16" y="8.5" width="1" height="1" rx="1" transform="rotate(-90 16 8.5)" className='stroke-[var(--foreground)]' strokeLinecap="round" />
                    </g>
                  </svg>,
                  href: "https://www.instagram.com/pranayy.c3/",
                },
                {
                  name: "Github",
                  icon: <svg viewBox="0 0 20.6 22.4" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-10">
                    <g transform="translate(-1.3, -.8)">
                      <path d="M4.074 2.994c.059-1.03.305-1.478 1.01-1.838.76-.387 1.957-.207 3.366.507.607.307.669.313 1.733.177 1.413-.181 3.233-.18 4.538.002.987.138 1.052.13 1.66-.177 2-1.013 3.58-.947 4.151.174.286.56.339 2.01.117 3.208-.122.664-.11.747.186 1.182 2.08 3.065.581 8.033-2.982 9.887a6 6 0 0 1-.69.3c-.575.22-.75.287-.538 1.298.102.486.224 1.695.272 2.686.087 1.792.086 1.805-.228 2.17-.428.498-1.045.506-1.462.02-.273-.317-.3-.466-.3-1.689 0-1.806-.197-3.006-.665-4.035-.557-1.224-.144-1.681 1.128-1.955 1.768-.38 3.15-1.471 3.92-3.096.731-1.545.841-3.68-.482-4.978-.376-.447-.402-.853-.134-2.074.1-.456.185-1.045.188-1.309.003-.416-.035-.479-.29-.479-.162 0-.78.236-1.373.523l-.947.459a.5.5 0 0 1-.277.047 30.3 30.3 0 0 0-7.114 0 .5.5 0 0 1-.279-.046l-.946-.46c-.593-.287-1.211-.523-1.373-.523-.374 0-.38.276-.039 1.916.209 1.001.349 1.224-.253 2.025-.902 1.2-1.127 2.69-.643 4.256.609 1.973 2.101 3.305 4.2 3.75 1.265.268 1.595.618 1.112 2.069-.38 1.14-.62 1.435-1.173 1.435-.743 0-1.209-.644-.953-1.318.113-.297.08-.329-.617-.582-2.126-.776-3.752-2.513-4.495-4.804-.575-1.77-.322-4.075.6-5.467.314-.475.318-.515.172-1.423a10.3 10.3 0 0 1-.1-1.838m-.742 12.951a1 1 0 0 0-1.664 1.11c.226.34.497.618.726.848l.124.123c.193.19.363.36.533.56.378.443.754 1.04.968 2.11.096.477.438.734.628.846.206.121.431.193.616.24.379.095.839.145 1.275.174.479.032.998.042 1.462.045a1 1 0 0 0 2 0v-1a1 1 0 0 0-1-1h-.304c-.587.002-1.352.004-2.026-.04a7 7 0 0 1-.788-.09c-.301-1.184-.788-1.972-1.308-2.582-.23-.27-.468-.506-.662-.698l-.103-.103c-.224-.223-.37-.382-.477-.543"
                        strokeWidth="0.6" className="stroke-[var(--background)] fill-[var(--foreground)]"
                      />
                    </g>
                  </svg>,
                  href: "https://github.com/prasad-pranay",
                },
                {
                  name: "Linkedin",
                  icon: <svg viewBox="0 0 20.5 20.5" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-10">
                    <g transform="translate(-1.7, -1.7)">
                      <path fillRule="evenodd" clipRule="evenodd" strokeWidth="0.6" className="stroke-[var(--background)] fill-[var(--foreground)]" d="M6 2a4 4 0 0 0-4 4v12a4 4 0 0 0 4 4h12a4 4 0 0 0 4-4V6a4 4 0 0 0-4-4zM4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm5 5a1 1 0 1 0-2 0v6a1 1 0 1 0 2 0zm.5-3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0M12 10c.34 0 .64.17.82.428A3.5 3.5 0 0 1 14.5 10c2.16 0 3.5 1.926 3.5 3.571V17a1 1 0 1 1-2 0v-3.43c0-.768-.66-1.571-1.5-1.571-.524 0-1.103.285-1.5.963V17a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1" fill="#000" />
                    </g>
                  </svg>,
                  href: "https://www.linkedin.com/in/pranay-prasad-/",
                },
                {
                  name: "Email",
                  icon: <svg viewBox="0 0 19.4 14.5" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-10">
                    <path fillRule="evenodd" clipRule="evenodd" className="fill-[var(--foreground)]" d="m4.457.922 5.23 3.815L15.028.791c.817-.645 1.863-.756 2.718-.326.87.437 1.454 1.386 1.454 2.682v8.315c0 .471-.06 1.147-.419 1.716-.385.611-1.062 1.016-2.102 1.016h-2.09a.5.5 0 0 1-.5-.5V7.901l-4.102 3.05a.5.5 0 0 1-.598 0L5.311 7.904v3.515a.5.5 0 0 1-1 0V6.906a.5.5 0 0 1 .8-.4l4.578 3.42 4.602-3.421a.5.5 0 0 1 .798.4v6.29h1.59c.744 0 1.078-.268 1.257-.55.205-.326.264-.766.264-1.183V3.147c0-.982-.426-1.548-.903-1.789-.49-.246-1.124-.2-1.654.221l-.014.011-5.644 4.169a.5.5 0 0 1-.591.002L3.862 1.726c-.496-.37-1.23-.593-1.792-.508q-.403.062-.61.31c-.14.165-.26.443-.26.913v9.408c0 .661.236.976.462 1.138a1.22 1.22 0 0 0 .826.207h1.323a.5.5 0 1 1 0 1H2.509a2.22 2.22 0 0 1-1.43-.395C.559 13.426.2 12.791.2 11.849V2.441c0-.643.167-1.17.496-1.558S1.468.298 1.92.229c.876-.132 1.872.198 2.537.693" />
                  </svg>,
                  href: "mailto:prasadpranay2005@gmail.com",
                },
              ].map((social, index) => (
                <a
                  key={social.name}
                  href={social.href}
                  target={
                    social.name === "Email"
                      ? undefined
                      : "_blank"
                  }
                  rel={
                    social.name === "Email"
                      ? undefined
                      : "noopener noreferrer"
                  }
                  style={{
                    transitionDelay: menuOpen
                      ? `${450 + index * 60}ms`
                      : "0ms",
                  }}
                  className={`
            group
            flex
            items-center
            gap-3
            rounded-xl
            border
            border-black/[0.07]
            px-3
            py-3
            transition-all
            duration-500
            ease-[cubic-bezier(0.22,1,0.36,1)]
            hover:-translate-y-0.5
            hover:border-black/10
            hover:bg-black/[0.035]
            dark:border-white/[0.08]
            dark:hover:bg-white/[0.05]
            ${menuOpen
                      ? "translate-y-0 opacity-100"
                      : "translate-y-4 opacity-0"
                    }
          `}
                >
                  {/* Icon */}

                  <span
                    className="
              flex
              h-8
              w-8
              shrink-0
              items-center
              justify-center
              rounded-lg
              bg-black/[0.04]
              text-[10px]
              font-semibold
              uppercase
              transition-all
              duration-300
              group-hover:rotate-[-6deg]
              group-hover:bg-[#ff5a36]
              group-hover:text-white
              dark:bg-white/[0.06]
            "
                  >
                    {social.icon}
                  </span>

                  {/* Name */}

                  <span
                    className="
              text-[12px]
              font-medium
              transition-all
              duration-300
              group-hover:translate-x-0.5
            "
                  >
                    {social.name}
                  </span>

                  {/* Arrow */}

                  <span
                    className="
              ml-auto
              text-[11px]
              text-black/25
              transition-all
              duration-300
              group-hover:-translate-y-0.5
              group-hover:translate-x-0.5
              group-hover:text-[#ff5a36]
              dark:text-white/25
            "
                  >
                    ↗
                  </span>
                </a>
              ))}
            </div>
          </section>

          {/* ─────────────────────────────────────
      ASK ME ANYTHING
  ───────────────────────────────────── */}

          <div
          onClick={()=>{
            setMenuOpen(false);
              setChatScreen(true)
          }}
            className={`
      mt-7
      transition-all
      duration-700
      ease-[cubic-bezier(0.22,1,0.36,1)]
      ${menuOpen
                ? "translate-y-0 opacity-100"
                : "translate-y-5 opacity-0"
              }
    `}
            style={{
              transitionDelay: menuOpen ? "700ms" : "0ms",
            }}
          >
            <button
              type="button"
              className="
        group
        relative
        flex
        w-full
        items-center
        justify-between
        overflow-hidden
        rounded-2xl
        border border-black/[0.07] dark:border-white/[0.08]
        px-5
        py-4
        text-[var(--foreground)]
        transition-all 
        duration-300
        hover:-translate-y-1
        hover:shadow-[0_18px_40px_rgba(255,90,54,0.25)]
        active:translate-y-0
        active:scale-[0.98]
      "
            >
              {/* Subtle animated background */}

              <span
                className="
          absolute
          -right-10
          -top-10
          h-28
          w-28
          rounded-full
          bg-white/10
          transition-transform
          duration-700
          group-hover:scale-[2]
        "
              />

              <div className="relative flex items-center gap-3">
                <BotSvg />

                <div className="text-left">
                  <p className="text-[20px] encode-sans font-semibold">
                    Ask me anything
                  </p>

                  <p className="mt-0.5 text-[9px] encode-sans text-[var(--foreground)]/60">
                    Let's have a conversation
                  </p>
                </div>
              </div>

              {/* Arrow */}

              <span
                className="
          relative
          flex
          h-8
          w-8
          items-center
          justify-center
          rounded-full
          border
          border-white/20
          bg-white/10
          text-sm
          transition-all
          duration-300
          group-hover:-rotate-45
          group-hover:bg-white
          group-hover:text-[#ff5a36]
        "
              >
                ↗
              </span>
            </button>
          </div>

        </div>


      </div>
    </>
  );
};

export default Header;



function BotSvg() {
  return (
    <svg viewBox="0 0 150 185" className="h-[80px] w-auto overflow-visible ">
      <g className="bot-leg-left">
        <rect x="42" y="132" width="18" height="30" rx="9" className="fill-[var(--background)] stroke-[var(--foreground)]" strokeWidth="3"></rect>
        <path d="M43 155 C38 158 32 162 27 166 C25 168 27 172 31 172 L50 172 C55 172 58 168 57 164 L55 157 Z" className="fill-[var(--background)] stroke-[var(--foreground)]" strokeWidth="3"></path>
      </g>
      <g className="bot-leg-right">
        <rect x="90" y="132" width="18" height="30" rx="9" className="fill-[var(--background)] stroke-[var(--foreground)]" strokeWidth="3"></rect>
        <path d=" M95 157 C96 162 98 166 102 169 C105 171 113 172 119 171 C123 170 123 166 120 164 L106 155 Z" className="fill-[var(--background)] stroke-[var(--foreground)]" strokeWidth="3"></path>
      </g>
      <g className="bot-arm-left">
        <circle cx="22" cy="104" r="10" className="fill-[var(--background)] stroke-[var(--foreground)]" strokeWidth="3"></circle>
        <rect x="13" y="104" width="18" height="32" rx="9" className="fill-[var(--background)] stroke-[var(--foreground)]" strokeWidth="3" transform="rotate(20 22 104)"></rect>
        <circle cx="16" cy="137" r="8" className="fill-[var(--background)] stroke-[var(--foreground)]" strokeWidth="3"></circle>
      </g>
      <g className="bot-arm-right">
        <circle cx="128" cy="104" r="10" className="fill-[var(--background)] stroke-[var(--foreground)]" strokeWidth="3"></circle>
        <rect x="119" y="104" width="18" height="32" rx="9" className="fill-[var(--background)] stroke-[var(--foreground)]" strokeWidth="3" transform="rotate(-20 128 104)"></rect>
        <circle cx="134" cy="137" r="8" className="fill-[var(--background)] stroke-[var(--foreground)]" strokeWidth="3"></circle>
      </g>
      <path d="M38 91 C34 91 31 95 31 100 L31 139 C31 147 37 152 45 152 L105 152 C113 152 119 147 119 139 L119 100 C119 95 116 91 112 91 Z" className="fill-[var(--background)] stroke-[var(--foreground)]" strokeWidth="3"></path>
      <rect x="47" y="112" width="56" height="25" rx="10" className="fill-[var(--background)] stroke-[var(--foreground)]" strokeWidth="2.5"></rect>
      <circle cx="60" cy="124" r="4" className="fill-[var(--foreground)]"></circle>
      <circle cx="75" cy="124" r="4" className="fill-[var(--foreground)]"></circle>
      <circle cx="90" cy="124" r="4" className="fill-[var(--foreground)]"></circle>
      <rect x="54" y="83" width="42" height="18" rx="8" className="fill-[var(--background)] stroke-[var(--foreground)]" strokeWidth="3"></rect>
      <g className="bot-head">
        <line x1="75" y1="17" x2="75" y2="6" className="stroke-[var(--foreground)]" strokeWidth="3" strokeLinecap="round"></line>
        <circle cx="75" cy="5" r="4" className="fill-[var(--background)] stroke-[var(--foreground)]" strokeWidth="2.5"></circle>
        <rect x="19" y="48" width="9" height="20" rx="4" className="fill-[var(--background)] stroke-[var(--foreground)]" strokeWidth="2.5"></rect>
        <rect x="122" y="48" width="9" height="20" rx="4" className="fill-[var(--background)] stroke-[var(--foreground)]" strokeWidth="2.5"></rect>
        <rect x="25" y="18" width="100" height="78" rx="27" className="fill-[var(--background)] stroke-[var(--foreground)]" strokeWidth="3"></rect>
        <circle cx="58" cy="53" r="7" className="fill-[var(--foreground)]"></circle>
        <circle cx="92" cy="53" r="7" className="fill-[var(--foreground)]"></circle>
        <path d="M57 76 Q75 88 93 76" fill="none" className="stroke-[var(--foreground)]" strokeWidth="3.5" strokeLinecap="round"></path>
      </g>
    </svg>
  )
}


// import ThemeToggle from "@/components/theme-toggle";

// const Header = () => {
//   return (
//     <aside
//       className="
//         absolute
//         top-0
//         left-0
//         right-0
//         z-[1000]
//         w-full
//         px-5
//         backdrop-blur-md
//         transition-all
//         duration-300
//         lg:px-0
//       "
//     >
//       <section
//         className="
//           encode-sans
//           mx-auto
//           flex
//           w-full
//           max-w-7xl
//           items-center
//           justify-between
//           gap-4
//           pt-10
//           pb-5
//         "
//       >
//         {/* Logo */}
//         <p className="bricolage-grotesque group relative text-lg">
//           <span
//             className="
//               relative
//               z-10
//               transition-colors
//               duration-300
//               group-hover:text-[#ff5a36]
//             "
//           >
//             PranayPrasad
//           </span>

//           <span
//             className="
//               absolute
//               bottom-[3px]
//               left-1/2
//               h-[2px]
//               w-1/2
//               -translate-x-1/2
//               rounded-full
//               bg-[#ff5a36]
//               transition-all
//               duration-300
//               group-hover:w-1/3
//               group-hover:bg-[var(--foreground)]
//             "
//           />
//         </p>

//         <div className="flex items-center gap-10">
//           {/* Navigation */}
//           <nav className="hidden items-center gap-10">
//             {["Projects", "About", "Education", "Contact"].map((item) => (
//               <a
//                 key={item}
//                 href={`#${item.toLowerCase()}`}
//                 className="
//                   group
//                   relative
//                   cursor-pointer
//                   overflow-hidden
//                   py-2
//                   text-[13px]
//                   uppercase
//                   tracking-wide
//                   transition-transform
//                   duration-300
//                   hover:-translate-y-0.5
//                 "
//               >
//                 <span
//                   className="
//                     relative
//                     inline-block
//                     transition-all
//                     duration-300
//                     group-hover:translate-x-0.5
//                     group-hover:text-[#ff5a36]
//                   "
//                 >
//                   {item}
//                 </span>

//                 {/* Underline */}
//                 <span
//                   className="
//                     absolute
//                     bottom-0
//                     left-0
//                     h-px
//                     w-0
//                     bg-[#ff5a36]
//                     transition-all
//                     duration-300
//                     group-hover:w-full
//                   "
//                 />

//                 {/* Dot */}
//                 <span
//                   className="
//                     absolute
//                     right-[-5px]
//                     top-[5px]
//                     h-[3px]
//                     w-[3px]
//                     scale-0
//                     rounded-full
//                     bg-[#ff5a36]
//                     opacity-0
//                     transition-all
//                     duration-200
//                     group-hover:scale-100
//                     group-hover:opacity-100
//                   "
//                 />
//               </a>
//             ))}
//           </nav>

//           <ThemeToggle />
//         </div>
//       </section>
//     </aside>
//   );
// };

// export default Header;






// aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa




// "use client";
// import React from 'react'
// import { motion, AnimatePresence } from "framer-motion";

// const Header = () => {
//   const [theme, setTheme] = React.useState(false); {/*0 for light theme*/ }
//   React.useEffect(() => {
//     if (theme) {
//       document.documentElement.classList.add("dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//     }
//   }, [theme]);
//   return (
//     <aside className="absolute top-0 left-0 right-0 w-full z-1000 lg:px-0 px-5 transition-all duration-300 backdrop-blur-md">
//       <section className="flex justify-between gap-4 w-full mx-auto encode-sans max-w-7xl pt-10 pb-5 z-1000 ">
//         <p className='bricolage-grotesque text-lg relative group'>
//           <span className="group-hover:text-[#ff5a36] transition-all duration-300 z-10 relative ">PranayPrasad</span>
//           <span className="absolute bottom-[3px] left-1/2 w-1/2 -translate-x-1/2 h-[2px] rounded-full bg-[#ff5a36] group-hover:w-1/3 group-hover:bg-[var(--foreground)] transition-all duration-300" />
//         </p>
//         <div className="flex gap-10 items-center">
//           <nav className='flex gap-10 items-center hidden'>
//           {["Projects", "About", "Education", "Contact"].map((item) => (
//             <motion.a
//               key={item}
//               href={`#${item.toLowerCase()}`}
//               className="group relative cursor-pointer overflow-hidden py-2 encode-sans text-[13px] uppercase tracking-wide"
//               whileHover="hover"
//               whileTap={{ scale: 0.88 }}
//               variants={{
//                 hover: {
//                   y: -2,
//                 },
//               }}
//               transition={{
//                 type: "spring",
//                 stiffness: 400,
//                 damping: 20,
//               }}
//             >
//               {/* Text */}
//               <motion.span
//                 className="relative inline-block"
//                 variants={{
//                   hover: {
//                     color: "#ff5a36",
//                     x: 2,
//                   },
//                 }}
//                 transition={{
//                   duration: 0.25,
//                 }}
//               >
//                 {item}
//               </motion.span>

//               {/* Animated underline */}
//               <motion.span
//                 className="absolute bottom-0 left-0 h-[1px] bg-[#ff5a36]"
//                 initial={{ width: 0 }}
//                 variants={{
//                   hover: {
//                     width: "100%",
//                   },
//                 }}
//                 transition={{
//                   duration: 0.3,
//                   ease: [0.22, 1, 0.36, 1],
//                 }}
//               />

//               {/* Small dot */}
//               <motion.span
//                 className="absolute right-[-5px] top-[5px] h-[3px] w-[3px] rounded-full bg-[#ff5a36]"
//                 initial={{
//                   scale: 0,
//                   opacity: 0,
//                 }}
//                 variants={{
//                   hover: {
//                     scale: 1,
//                     opacity: 1,
//                   },
//                 }}
//                 transition={{
//                   duration: 0.2,
//                 }}
//               />

//               {/* Click ripple */}
//               <motion.span
//                 className="pointer-events-none absolute inset-0 rounded-full bg-[#ff5a36]/10"
//                 initial={{ scale: 0, opacity: 0 }}
//                 whileTap={{
//                   scale: 2.5,
//                   opacity: 1,
//                 }}
//                 transition={{
//                   duration: 0.35,
//                 }}
//               />
//             </motion.a>
//           ))}
//           </nav>
//           <motion.button
//             onClick={() => setTheme(!theme)}
//             className="relative size-6 cursor-pointer"
//             whileTap={{ scale: 0.85 }}
//           >
//             <AnimatePresence mode="wait">
//               {theme ? (
//                 <motion.svg
//                   key="sun"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   strokeWidth="1.5"
//                   stroke="currentColor"
//                   className="absolute inset-0 size-6"
//                   initial={{ rotate: -90, scale: 0, opacity: 0 }}
//                   animate={{ rotate: 0, scale: 1, opacity: 1 }}
//                   exit={{ rotate: 90, scale: 0, opacity: 0 }}
//                   transition={{ duration: 0.35, ease: "easeOut" }}
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
//                   />
//                 </motion.svg>
//               ) : (
//                 <motion.svg
//                   key="moon"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   strokeWidth="1.5"
//                   stroke="currentColor"
//                   className="absolute inset-0 size-6"
//                   initial={{ rotate: 90, scale: 0, opacity: 0 }}
//                   animate={{ rotate: 0, scale: 1, opacity: 1 }}
//                   exit={{ rotate: -90, scale: 0, opacity: 0 }}
//                   transition={{ duration: 0.35, ease: "easeOut" }}
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
//                   />
//                 </motion.svg>
//               )}
//             </AnimatePresence>
//           </motion.button>
//           {/* <div className='encode-sans uppercase text-[13px] border rounded-full border-[var(--foreground)] bg-[var(--background)] group h-8 w-8 flex items-center justify-center relative cursor-pointer hover:border-transparent transition duration-300'>
//             <div className="w-[4px] h-[4px] rounded-full bg-[var(--foreground)] absolute group-hover:w-full group-hover:h-full transition-all duration-300" />
//             <div className="w-[4px] h-[4px] rounded-full bg-[var(--background)] absolute scale-0 transition-all delay-300 duration-300 group-hover:scale-100 z-10" />
//             <p className="bg-[var(--foreground)] text-[var(--background)] px-3 py-1 rounded-lg absolute top-[120%] text-[9px] scale-0 group-hover:scale-100 transition-transform duration-300 pointer-events-none">Menu</p>
//         </div> */}
//         </div>
//       </section>
//     </aside>
//   )
// }


// export default Header


