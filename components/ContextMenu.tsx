"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Check,
  Copy,
  FileText,
  Home,
  Moon,
  Sun,
  User,
  X,
} from "lucide-react";

type ContextMenuProps = {
  onNavigate?: (section: string) => void;
  setResumeOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

type MenuPosition = {
  x: number;
  y: number;
};


export default function PageContextMenu({
  onNavigate,
  setResumeOpen
}: ContextMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const [position, setPosition] = useState<MenuPosition>({
    x: 0,
    y: 0,
  });

  const [copied, setCopied] = useState(false);

  const [isDark, setIsDark] = useState(false);

  // ----------------------------------------------------
  // RIGHT CLICK
  // ----------------------------------------------------

  useEffect(() => {
    const handleContextMenu = (event: MouseEvent) => {
      event.preventDefault();

      const menuWidth = 250;
      const menuHeight = 380;

      let x = event.clientX;
      let y = event.clientY;

      // Prevent menu from overflowing viewport
      if (x + menuWidth > window.innerWidth) {
        x = window.innerWidth - menuWidth - 16;
      }

      if (y + menuHeight > window.innerHeight) {
        y = window.innerHeight - menuHeight - 16;
      }

      setPosition({ x, y });
      setIsOpen(true);
    };

    const handleClick = () => {
      setIsOpen(false);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("contextmenu", handleContextMenu);
    window.addEventListener("click", handleClick);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("contextmenu", handleContextMenu);
      window.removeEventListener("click", handleClick);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // ----------------------------------------------------
  // ACTIONS
  // ----------------------------------------------------

  const navigateTo = (section: string) => {
    setIsOpen(false);

    if (onNavigate) {
      onNavigate(section);
      return;
    }

    const element = document.getElementById(section);

    element?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(
        "prasadpranay2005@gmail.com"
      );

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch (error) {
      console.error("Failed to copy email");
    }
  };

  const toggleTheme = () => {
    const nextTheme = !isDark;

    setIsDark(nextTheme);

    // document.documentElement.classList.toggle(
    //   "dark",
    //   nextTheme
    // );
    document.documentElement.classList.toggle("dark");
  };

  const downloadResume = () => {
    setIsOpen(false);

    // Replace with your resume path
    // window.open("/resume.pdf", "_blank");
    setResumeOpen(true)
  };

  // ----------------------------------------------------
  // MENU ITEMS
  // ----------------------------------------------------

  const navigationItems = [
    {
      label: "Home",
      section: "home",
      icon: Home,
      shortcut: "01",
    },
    {
      label: "About",
      section: "about",
      icon: User,
      shortcut: "02",
    },
    {
      label: "Projects",
      section: "projects",
      icon: ArrowUpRight,
      shortcut: "03",
    },
  ];

  // ----------------------------------------------------
  // RENDER
  // ----------------------------------------------------

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.96,
            y: 6,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            scale: 0.97,
            y: 4,
          }}
          transition={{
            duration: 0.18,
            ease: [0.22, 1, 0.36, 1],
          }}
          onClick={(event) => event.stopPropagation()}
          style={{
            position: "fixed",
            left: position.x,
            top: position.y,
          }}
          className="
            z-[9999]
            w-[250px]
            overflow-hidden
            rounded-[18px]
            border
            border-black/[0.08]
            bg-[var(--background)]
            p-2
            shadow-[0_20px_60px_rgba(0,0,0,0.12)]
            backdrop-blur-xl
            dark:border-white/[0.08]
          "
        >
          {/* ------------------------------------------ */}
          {/* HEADER */}
          {/* ------------------------------------------ */}

          <div
            className="
              flex
              items-center
              justify-between
              px-3
              pb-3
              pt-2
            "
          >
            <div>
              <p
                className="
                  text-[10px]
                  font-medium
                  uppercase
                  tracking-[0.16em]
                  text-[var(--foreground)]/35
                "
              >
                Navigation
              </p>
            </div>

            <span
              className="
                text-[10px]
                tabular-nums
                text-[var(--foreground)]/25
              "
            >
              MENU
            </span>
          </div>

          {/* ------------------------------------------ */}
          {/* NAVIGATION */}
          {/* ------------------------------------------ */}

          <div className="space-y-0.5">
            {navigationItems.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.section}
                  onClick={() =>
                    navigateTo(item.section)
                  }
                  className="
                    group
                    flex
                    w-full
                    items-center
                    justify-between
                    rounded-xl
                    px-3
                    cursor-none target-hand
                    py-2.5
                    text-left
                    transition-colors
                    duration-200
                    hover:bg-black/[0.04]
                    dark:hover:bg-white/[0.06]
                  "
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      size={15}
                      strokeWidth={1.5}
                      className="
                        text-[var(--foreground)]/40
                        transition-colors
                        duration-200
                        group-hover:text-[var(--foreground)]
                      "
                    />

                    <span
                      className="
                        text-[13px]
                        font-light
                        text-[var(--foreground)]/70
                        transition-colors
                        duration-200
                        group-hover:text-[var(--foreground)]
                      "
                    >
                      {item.label}
                    </span>
                  </div>

                  <span
                    className="
                      text-[10px]
                      tabular-nums
                      text-[var(--foreground)]/25
                    "
                  >
                    {item.shortcut}
                  </span>
                </button>
              );
            })}
          </div>

          {/* ------------------------------------------ */}
          {/* DIVIDER */}
          {/* ------------------------------------------ */}

          <div
            className="
              mx-2
              my-2
              h-px
              bg-[var(--foreground)]/[0.08]
            "
          />

          {/* ------------------------------------------ */}
          {/* ACTIONS */}
          {/* ------------------------------------------ */}

          <div className="space-y-0.5">
            {/* Resume */}

            <button
              onClick={downloadResume}
              className="
                group
                flex
                w-full
                items-center
                justify-between
                rounded-xl
                px-3
                py-2.5
                text-left
                transition-colors
                hover:bg-black/[0.04]
                dark:hover:bg-white/[0.06]
              "
            >
              <div className="flex items-center gap-3">
                <FileText
                  size={15}
                  strokeWidth={1.5}
                  className="
                    text-[var(--foreground)]/40
                    group-hover:text-[var(--foreground)]
                  "
                />

                <span
                  className="
                    text-[13px]
                    font-light
                    text-[var(--foreground)]/70
                    group-hover:text-[var(--foreground)]
                  "
                >
                  Resume
                </span>
              </div>

              <ArrowUpRight
                size={14}
                strokeWidth={1.5}
                className="
                  text-[var(--foreground)]/30
                  transition-transform
                  group-hover:translate-x-0.5
                  group-hover:-translate-y-0.5
                "
              />
            </button>

            {/* Copy Email */}

            <button
              onClick={copyEmail}
              className="
                group
                flex
                w-full
                items-center
                justify-between
                rounded-xl
                px-3
                py-2.5
                text-left
                transition-colors
                hover:bg-black/[0.04]
                dark:hover:bg-white/[0.06]
              "
            >
              <div className="flex items-center gap-3">
                {copied ? (
                  <Check
                    size={15}
                    strokeWidth={1.5}
                    className="text-[var(--foreground)]"
                  />
                ) : (
                  <Copy
                    size={15}
                    strokeWidth={1.5}
                    className="
                      text-[var(--foreground)]/40
                      group-hover:text-[var(--foreground)]
                    "
                  />
                )}

                <span
                  className="
                    text-[13px]
                    font-light
                    text-[var(--foreground)]/70
                    group-hover:text-[var(--foreground)]
                  "
                >
                  {copied
                    ? "Email copied"
                    : "Copy email"}
                </span>
              </div>

              <span
                className="
                  text-[10px]
                  text-[var(--foreground)]/25
                "
              >
                {copied ? "✓" : ""}
              </span>
            </button>

            {/* Theme */}

            <button
              onClick={toggleTheme}
              className="
                group
                flex
                w-full
                items-center
                justify-between
                rounded-xl
                px-3
                py-2.5
                text-left
                transition-colors
                hover:bg-black/[0.04]
                dark:hover:bg-white/[0.06]
              "
            >
              <div className="flex items-center gap-3">
                {isDark ? (
                  <Sun
                    size={15}
                    strokeWidth={1.5}
                    className="
                      text-[var(--foreground)]/40
                    "
                  />
                ) : (
                  <Moon
                    size={15}
                    strokeWidth={1.5}
                    className="
                      text-[var(--foreground)]/40
                    "
                  />
                )}

                <span
                  className="
                    text-[13px]
                    font-light
                    text-[var(--foreground)]/70
                  "
                >
                  {isDark
                    ? "Light mode"
                    : "Dark mode"}
                </span>
              </div>

              <span
                className="
                  text-[10px]
                  text-[var(--foreground)]/25
                "
              >
                Theme
              </span>
            </button>
          </div>

          {/* ------------------------------------------ */}
          {/* FOOTER */}
          {/* ------------------------------------------ */}

          <div
            className="
              mt-2
              flex
              items-center
              justify-between
              border-t
              border-[var(--foreground)]/[0.07]
              px-3
              pb-1
              pt-3
            "
          >
            <span
              className="
                text-[9px]
                uppercase
                tracking-[0.14em]
                text-[var(--foreground)]/25
              "
            >
              Pranay Prasad
            </span>

            <button
              onClick={() => setIsOpen(false)}
              className="
                flex
                h-5
                w-5
                items-center
                justify-center
                rounded-md
                text-[var(--foreground)]/30
                transition-colors
                hover:bg-black/[0.05]
                hover:text-[var(--foreground)]
              "
              aria-label="Close menu"
            >
              <X
                size={12}
                strokeWidth={1.5}
              />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

