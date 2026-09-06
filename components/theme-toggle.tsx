"use client";

import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(
      document.documentElement.classList.contains("dark")
    );
  }, []);

  const toggleTheme = () => {
    const nextDark = !dark;

    document.documentElement.classList.toggle(
      "dark",
      nextDark
    );

    localStorage.setItem(
      "theme",
      nextDark ? "dark" : "light"
    );

    setDark(nextDark);
  };

  return (
<button
  type="button"
  onClick={toggleTheme}
  aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
  className="
    group
    relative
    flex
    h-9
    w-9
    shrink-0
    cursor-none
    items-center
    justify-center
    rounded-full
    border
    border-[var(--foreground)]/10
    bg-[var(--foreground)]/[0.04]
    text-[var(--foreground)]
    transition-all
    duration-300
    hover:bg-[var(--foreground)]/[0.08]
    hover:border-[var(--foreground)]/20
    active:scale-90
  "
>
  {!dark ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="
        h-[17px]
        w-[17px]
        transition-all
        duration-500
        group-hover:rotate-[-12deg]
        group-hover:scale-110
      "
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
      />
    </svg>
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="
        h-[17px]
        w-[17px]
        transition-all
        duration-500
        group-hover:rotate-45
        group-hover:scale-110
      "
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
      />
    </svg>
  )}
</button>



  );
};

export default ThemeToggle;





// "use client";

// import { useEffect, useState } from "react";

// export default function ThemeToggle() {
//   const [dark, setDark] = useState(false);

//   useEffect(() => {
//     const isDark = document.documentElement.classList.contains("dark");
//     setDark(isDark);
//   }, []);

//   const toggleTheme = () => {
//     const next = !dark;

//     setDark(next);

//     document.documentElement.classList.toggle("dark", next);
//   };

//   return (
//     <button
//       type="button"
//       onClick={toggleTheme}
//       aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
//       className="
//         group
//         relative
//         size-6
//         cursor-pointer
//         transition-transform
//         duration-200
//         active:scale-85
//       "
//     >
//       {/* Moon */}
//       <svg
//         viewBox="0 0 24 24"
//         fill="none"
//         stroke="currentColor"
//         strokeWidth="1.5"
//         className={`
//           absolute
//           inset-0
//           size-6
//           transition-all
//           duration-300
//           ${
//             dark
//               ? "rotate-0 scale-100 opacity-100"
//               : "rotate-90 scale-0 opacity-0"
//           }
//         `}
//       >
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
//         />
//       </svg>

//       {/* Sun */}
//       <svg
//         viewBox="0 0 24 24"
//         fill="none"
//         stroke="currentColor"
//         strokeWidth="1.5"
//         className={`
//           absolute
//           inset-0
//           size-6
//           transition-all
//           duration-300
//           ${
//             dark
//               ? "rotate-90 scale-0 opacity-0"
//               : "rotate-0 scale-100 opacity-100"
//           }
//         `}
//       >
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
//         />
//       </svg>
//     </button>
//   );
// }