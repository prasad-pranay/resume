"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Moon, Sun, X, ArrowUpRight } from "lucide-react";

const navigation = [
  {
    label: "Work",
    href: "/#projects",
  },
  {
    label: "About",
    href: "/#about",
  },
  {
    label: "Contact",
    href: "/#contact",
  },
];

const AnswerHeader = ({fetchAnswers,loading}:{fetchAnswers:()=>void;loading:boolean}) => {
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [menuOpen, setMenuOpen] = useState(false);

  /* ---------------------------------------------
     INITIAL THEME
  --------------------------------------------- */

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark" || savedTheme === "light") {
      setTheme(savedTheme);

      document.documentElement.classList.toggle(
        "dark",
        savedTheme === "dark"
      );
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;

      const initialTheme = prefersDark ? "dark" : "light";

      setTheme(initialTheme);

      document.documentElement.classList.toggle(
        "dark",
        initialTheme === "dark"
      );
    }
  }, []);

  /* ---------------------------------------------
     SCROLL
  --------------------------------------------- */

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /* ---------------------------------------------
     THEME
  --------------------------------------------- */

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";

    setTheme(newTheme);

    document.documentElement.classList.toggle(
      "dark",
      newTheme === "dark"
    );

    localStorage.setItem("theme", newTheme);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      {/* =========================================
          HEADER
      ========================================== */}

      <header
        className={`
          z-[100]
          w-full
          transition-all
          duration-500
          border-b
          ${
            scrolled
              ? `
                border-[var(--foreground)]/[0.06]
                bg-[var(--background)]/75
                backdrop-blur-xl
              `
              : "border-b-transparent bg-transparent"
          }
        `}
      >
        <div
          className="
            mx-auto
            flex
            h-20
            w-full
            max-w-[1500px]
            items-center
            justify-between
            px-6
            sm:px-10
            lg:px-16
            xl:px-24
          "
        >
          {/* =================================
              LOGO
          ================================== */}

          <a
            href="/"
            className="
              group
              relative
              flex
              items-center
              text-sm
              cursor-none
              target-hand
              font-medium
              tracking-[-0.04em]
              text-[var(--foreground)]
              transition
              duration-300
              hover:text-[#ff5a36]
            "
          >
            PRANAY

            <span
              className="
                ml-[1px]
                text-[var(--foreground)]/35
                transition-colors
                duration-300
                group-hover:text-[var(--foreground)]
              "
            >
              .
            </span>
          </a>

          {/* =================================
              DESKTOP NAVIGATION
          ================================== */}

          <nav
            className="
              absolute
              left-1/2
              hidden
              -translate-x-1/2
              items-center
              gap-8
              md:flex
            "
          >
              <button
            onClick={fetchAnswers}
            disabled={loading}
            className="
              rounded-md
              px-2.5 py-1.5
              text-xs font-medium
              cursor-none target-hand
              text-zinc-500
              transition
              hover:bg-zinc-100
              hover:text-zinc-900
              disabled:opacity-40
            "
          >
            {loading ? "Loading..." : "Refresh"}
          </button>
          </nav>

          {/* =================================
              RIGHT SIDE
          ================================== */}

          <div className="flex items-center gap-2">
            {/* Theme */}

            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="
                group
                relative
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-full
                border
                border-[var(--foreground)]/[0.08]
                text-[var(--foreground)]/55
                transition-all
                duration-300
                cursor-none
                target-hand
                hover:border-[var(--foreground)]/20
                hover:bg-[var(--foreground)]/[0.04]
                hover:text-[var(--foreground)]
                active:scale-95
              "
            >
              <AnimatePresence mode="wait">
                {theme === "light" ? (
                  <motion.div
                    key="moon"
                    initial={{
                      opacity: 0,
                      rotate: -40,
                      scale: 0.6,
                    }}
                    animate={{
                      opacity: 1,
                      rotate: 0,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      rotate: 40,
                      scale: 0.6,
                    }}
                    transition={{ duration: 0.25 }}
                  >
                    <Moon size={16} strokeWidth={1.6} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="sun"
                    initial={{
                      opacity: 0,
                      rotate: 40,
                      scale: 0.6,
                    }}
                    animate={{
                      opacity: 1,
                      rotate: 0,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      rotate: -40,
                      scale: 0.6,
                    }}
                    transition={{ duration: 0.25 }}
                  >
                    <Sun size={16} strokeWidth={1.6} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>

            {/* Back to portfolio */}

            <a
              href="/"
              className="
                group
                hidden
                items-center
                gap-2
                rounded-full
                px-4
                py-2
                cursor-none
                target-hand
                text-[13px]
                text-[var(--foreground)]/60
                transition-all
                duration-300
                hover:bg-[var(--foreground)]/[0.04]
                hover:text-[var(--foreground)]
                md:flex
              "
            >
              Portfolio

              <ArrowUpRight
                size={14}
                strokeWidth={1.5}
                className="
                  transition-transform
                  duration-300
                  group-hover:-translate-x-0.5
                  group-hover:-translate-y-0.5
                "
              />
            </a>
            
            

            {/* Mobile menu */}

            <button
              type="button"
              aria-label={
                menuOpen ? "Close navigation" : "Open navigation"
              }
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((prev) => !prev)}
              className="
                group
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-full
                border
                border-[var(--foreground)]/[0.08]
                text-[var(--foreground)]/70
                transition-all
                duration-300
                hover:bg-[var(--foreground)]/[0.04]
                active:scale-95
                md:hidden
              "
            >
              {menuOpen ? (
                <X size={17} strokeWidth={1.6} />
              ) : (
                <Menu size={17} strokeWidth={1.6} />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* =========================================
          MOBILE MENU
      ========================================== */}

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{
              opacity: 0,
              y: -15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -15,
            }}
            transition={{
              duration: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              fixed
              left-0
              top-20
              z-[90]
              w-full
              border-b
              border-[var(--foreground)]/[0.06]
              bg-[var(--background)]/95
              px-6
              py-8
              backdrop-blur-xl
              md:hidden
            "
          >
            <nav className="flex flex-col gap-6">
             

              {/* Back to portfolio */}

              <motion.a
                href="/"
                onClick={closeMenu}
                initial={{
                  opacity: 0,
                  x: -10,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  delay: navigation.length * 0.06,
                }}
                className="
                  mt-3
                  flex
                  items-center
                  gap-3
                  text-2xl
                  tracking-[-0.04em]
                  text-[var(--foreground)]/70
                "
              >
                Portfolio

                <ArrowUpRight
                  size={18}
                  strokeWidth={1.5}
                />
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AnswerHeader;