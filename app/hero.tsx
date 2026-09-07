// "use client";
// import { motion } from "framer-motion";
// import { ArrowUpRight, FileText } from "lucide-react";
// import HoverWord from "@/components/hoverword";
// import HeaderTitle from "@/components/heading";
// import "./allfiles.css"

// type NavItem = {
//   number: string;
//   label: string;
//   href: string;
// };

// const navigation: NavItem[] = [
//   { number: "01", label: "HOME", href: "#home" },
//   { number: "02", label: "PROJECTS", href: "#projects" },
//   { number: "03", label: "EXPERIENCE", href: "#experience" },
//   { number: "04", label: "SKILLS", href: "#skills" },
//   { number: "05", label: "ABOUT", href: "#about" },
//   { number: "06", label: "EDUCATION", href: "#education" },
//   { number: "07", label: "CONTACT", href: "#contact" },
// ];

// function PortfolioNavigation() {
//   return (
//     <nav className="w-full z-[200]">
//       <div className="flex max-w-full items-start justify-between gap-20 ml-25">
//         {navigation.map((item, index) => {
//           return (
//             <a
//               key={index}
//               href={item.href}
//               className="group relative cursor-none target-hand flex flex-col items-start px-4 xl:px-5 w-full"
//             >
//               {/* Number */}
//               <div className="relative flex items-center">
//                 <span className="absolute -left-3 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-[#ff5a36]"/>

//                 <span
//                   className="
//                     text-[13px]
//                     font-light
//                     transition-all
//                     duration-300
//                     opacity-30
//                     text-[var(--foreground)]/30 group-hover:text-[var(--foreground)]
//                   "
//                 >
//                   {item.number}
//                 </span>
//               </div>
//             </a>
//           );
//         })}
//       </div>
//     </nav>
//   );
// }

// // const Hero = ({setResumeOpen}:{setResumeOpen:React.Dispatch<React.SetStateAction<boolean>>}) => {
// const Hero = () => {
  
//   return (
//     <section
//       id="home"
//       className="
//         relative
//         hero-section
//         flex
//         min-h-screen
//         w-full
//         lg:max-w-7xl
//         lg:mt-10
//         flex-col
//         justify-center
//         overflow-hidden
//         px-6
//         pt-24
//         pb-20
//         lg:px-0
//       "
//     >
//         <div className="flex items-start sm:items-center mb-8 sm:mb-3 gap-4 ml-3">
// <span className="relative flex h-2 w-2 items-center justify-center mb-8">
//           <span className="absolute h-full w-full animate-ping rounded-full bg-green-500/30" />
//           <span className="relative h-1.5 w-1.5 rounded-full bg-green-500" />
//         </span>
//       <HeaderTitle title="Available for work" value="" />
//         </div>

//       {/* =========================================================
//           FIRST LINE
//       ========================================================= */}

//       <div className="flex w-full flex-col lg:flex-row lg:items-center -mt-5">
//         <h1
//           className="
//             bricolage-grotesque
//             text-[clamp(5rem,13vw,9rem)]
//             leading-[0.82]
//             tracking-[-0.055em]
//             text-[var(--foreground)]
//             whitespace-nowrap
//           "
//         >
//           <HoverWord
//             text="Full Stack"
//             className="
//               bricolage-grotesque
//               text-[clamp(5rem,13vw,9rem)]
//               leading-[0.82]
//               tracking-[-0.055em]
//             "
//           />
//         </h1>

//         {/* Navigation */}
//         <div className="mt-12 w-full lg:mb-2 lg:mt-0 overflow-x-scroll hide-scrollbar hidden lg:block">
//           <PortfolioNavigation />
//         </div>
//       </div>

//       {/* =========================================================
//           SECOND LINE
//       ========================================================= */}

//       <div
//         className="relative"
//       >
//         <h1
//           className="
//             bricolage-grotesque
//             text-[clamp(5rem,13vw,9rem)]
//             leading-[0.82]
//             tracking-[-0.055em]
//             text-[var(--foreground)]
//           "
//         >
//           <HoverWord text="Developer" />

//           <span className="text-[#ff5a36]">
//             <HoverWord text="." />
//           </span>
//         </h1>

//         {/* small floating descriptor */}
//         <div
//         className="
//           absolute
//           -bottom-15
//           animate-fade-in [animation-delay:1.6s]
//           pointer-events-none
//           right-8
//           hidden
//           items-center
//           gap-3
//           lg:flex
//         "
//       >
//         <span className="text-[8px] uppercase tracking-[0.2em] text-[var(--foreground)]/25">
//           Scroll
//         </span>

//         <div className="h-8 w-px animate-scroll-indicator bg-[var(--foreground)]/20"/>
//       </div>
//       </div>



//       {/* description */}
//         <p className="
//             mt-6
//             max-w-xl
//             text-lg
//             leading-6
//             font-light
//             -tracking-[0.01rem]
//             text-[var(--foreground)]/45
//             animate-fade-in [animation-delay:1s]
//           "
//         >
//           I build thoughtful digital experiences where clean interfaces,
//           purposeful motion, and solid engineering come together.
//         </p>

//       {/* =========================================================
//           ACTION AREA
//       ========================================================= */}

//       <div className="ml-2 mt-7 grid grid-cols-[2px_1fr] gap-x-8 lg:ml-20 lg:gap-x-10 animate-fade-in [animation-delay:1s]">
//         {/* vertical line */}
//         <motion.div
//           initial={{ height: 0 }}
//           animate={{ height: "100%" }}
//           transition={{
//             duration: 0.8,
//             delay: 0.8,
//             ease: "easeOut",
//           }}
//           className="row-span2 w-[1px] h-full rounded-full bg-[var(--foreground)] hero-vertical-line"
//         />

//         <div className="flex flex-wrap items-center gap-10 py-3">
//           {/* =====================================================
//               VIEW WORK BUTTON
//           ===================================================== */}

//           <motion.a
//             href="#projects"
//             whileHover={{ y: -3 }}
//             whileTap={{ scale: 0.98 }}
//             className="
//               group
//               relative
//               flex
//               cursor-none
//               target-hand
//               items-center
//               gap-3
//               overflow-hidden
//               rounded-lg
//               border
//               border-[var(--foreground)]/15
//               px-5
//               py-3
//               transition-shadow
//               duration-300
//               hover:shadow-[0_10px_30px_rgba(0,0,0,0.10)]
//             "
//           >
//             {/* background */}
//             <span
//               className="
//                 absolute
//                 inset-0
//                 origin-left
//                 scale-x-0
//                 bg-[var(--foreground)]
//                 transition-transform
//                 duration-500
//                 ease-[cubic-bezier(.22,1,.36,1)]
//                 group-hover:scale-x-100
//               "
//             />

//             {/* shine */}
//             <span
//               className="
//                 absolute
//                 inset-y-0
//                 -left-[40%]
//                 w-[30%]
//                 skew-x-[-20deg]
//                 bg-white/20
//                 transition-all
//                 duration-700
//                 group-hover:left-[120%]
//               "
//             />

//             <span
//               className="
//                 relative
//                 z-10
//                 text-sm
//                 font-normal
//                 tracking-[-0.03em]
//                 text-[var(--foreground)]
//                 transition-colors
//                 duration-300
//                 group-hover:text-[var(--background)]
//               "
//             >
//               View Work
//             </span>

//             <ArrowUpRight
//               size={17}
//               strokeWidth={1.5}
//               className="
//                 relative
//                 z-10
//                 text-[var(--foreground)]
//                 transition-all
//                 duration-500
//                 group-hover:translate-x-1
//                 group-hover:-translate-y-1
//                 group-hover:text-[var(--background)]
//               "
//             />
//           </motion.a>

//           {/* =====================================================
//               RESUME BUTTON
//           ===================================================== */}

//           <motion.a
//           onClick={()=>{}}
//             whileHover={{ y: -3 }}
//             whileTap={{ scale: 0.98 }}
//             className="
//               group
//               flex
//               cursor-none
//               target-hand
//               items-center
//               gap-2.5
//               rounded-lg
//               px-5
//               py-3
//               text-sm
//               tracking-[-0.03em]
//               text-[var(--foreground)]/55
//               transition-all
//               duration-300
//               hover:bg-[var(--foreground)]/[0.04]
//               hover:text-[var(--foreground)]
//             "
//           >
//             <FileText
//               size={16}
//               strokeWidth={1.5}
//               className="transition-transform duration-300 group-hover:-rotate-3"
//             />

//             <span>Resume</span>

//             <ArrowUpRight
//               size={14}
//               strokeWidth={1.5}
//               className="
//                 opacity-40
//                 transition-all
//                 duration-300
//                 group-hover:translate-x-0.5
//                 group-hover:-translate-y-0.5
//                 group-hover:opacity-100
//               "
//             />
//           </motion.a>
//         </div>

        
//       </div>

    

//     </section>
//   );
// };

// export default Hero;



"use client";
import { ArrowUpRight, FileText } from "lucide-react";
import HoverWord from "@/components/hoverword";
import HeaderTitle from "@/components/heading";
import "./allfiles.css";
import Typewriter from "@/components/typewriter";
import { motion } from "framer-motion";

type NavItem = {
  number: any;
  label: string;
  href: string;
};

const navigation: NavItem[] = [
  { number: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
</svg>, label: "HOME", href: "#home" },
  { number: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
</svg>, label: "PROJECTS", href: "#projects" },
  { number: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
</svg>, label: "ABOUT", href: "#about" },
  { number: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z" />
</svg>, label: "SKILLS", href: "#skills" },
  { number: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
</svg>, label: "EDUCATION", href: "#education" },
  { number: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
</svg>, label: "CONTACT", href: "#contact" },
];

function PortfolioNavigation() {
  return (
    <nav className="z-[200] w-full">
      <div className="ml-25 flex max-w-full items-start justify-between gap-20">
        {navigation.map((item,index) => (
          <motion.a
            initial={{scale:0,opacity:0}}
            animate={{scale:1,opacity:1}}
            transition={{duration:1,ease:"easeInOut"}}
            key={item.label}
            href={item.href}
            style={{
  animationName: "bot-float",
  animationDuration: `${4 + index * 0.1}s`,
  animationIterationCount: "infinite",
  animationTimingFunction: "ease-in-out",
}}
            className="py-5 group relative flex w-full cursor-none flex-col items-start px-4 xl:px-5"
          >
            <div className="relative flex items-center">
              <span
                className="
                  absolute -left-3 top-1/2
                  h-1.5 w-1.5 -translate-y-1/2
                  rounded-full bg-[#ff5a36]
                  opacity-0 scale-0
                  transition-all duration-300
                  group-hover:opacity-100
                  group-hover:scale-100
                "
              />

              <div className="opacity-10 group-hover:opacity-100 transition duration-400">
                {item.number}
              </div>
              <p className="opacity-0 group-hover:opacity-100 transition duration-400 text-xs encode-sans absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-5">{item.label}</p>
            </div>
          </motion.a>
        ))}
      </div>
    </nav>
  );
}

const Hero = ({setResumeOpen}:{setResumeOpen:React.Dispatch<React.SetStateAction<boolean>>}) => {
  return (
    <section
      id="home"
      className="
        hero-section relative
        flex min-h-screen w-full
        flex-col sm:justify-center
        overflow-hidden
        px-6 pt-45 sm:pt-24 pb-20
        lg:mt-10 lg:max-w-7xl lg:px-0
      "
    >
      {/* Availability */}
      <div className="mb-8 ml-3 flex items-start gap-4 sm:mb-3 sm:items-center">
        <span className="relative mb-8 flex h-2 w-2 items-center justify-center">
          <span className="absolute h-full w-full animate-ping rounded-full bg-green-500/30" />
          <span className="relative h-1.5 w-1.5 rounded-full bg-green-500" />
        </span>

        <HeaderTitle
          title="Available for work"
          value=""
        />
      </div>

      {/* First line */}
      <div className="-mt-5 flex w-full flex-col lg:flex-row lg:items-center">
        <h1
          className="
            bricolage-grotesque
            whitespace-nowrap
            text-[clamp(3rem,13vw,9rem)]
            leading-[0.82]
            tracking-[-0.055em]
            text-[var(--foreground)]
          "
        >
          <HoverWord
            text="Full Stack"
            className="
              bricolage-grotesque
              text-[clamp(4rem,13vw,9rem)]
              leading-[0.82]
              tracking-[-0.055em]
            "
          />
        </h1>

        <div
          className="
            mt-12 hidden w-full overflow-x-scroll
            hide-scrollbar lg:mb-2 lg:mt-0 lg:block
          "
        >
          <PortfolioNavigation />
        </div>
      </div>

      {/* Second line */}
      <div className="relative">
        <h2
          className="
            bricolage-grotesque
            text-[clamp(4rem,13vw,9rem)]
            leading-[0.82]
            tracking-[-0.055em]
            text-[var(--foreground)]
          "
        >
          <HoverWord text="Developer" />

          <span className="text-[#ff5a36]">
            <HoverWord text="." />
          </span>
        </h2>

      </div>

      {/* Description */}
      <p
        className="
          mt-6 sm:max-w-xl max-w-xs
          sm:text-lg text-sm font-light sm:leading-6 leading-5
          tracking-[-0.01rem]
          text-[var(--foreground)]/45
          animate-fade-in
          [animation-delay:1s]
        "
      >
        <Typewriter text="I build thoughtful digital experiences where clean interfaces,
        purposeful motion, and solid engineering come together." speed={15} cursor={false} />
      </p>

      {/* Actions */}
      <div
        className="
          ml-2 mt-7
          grid grid-cols-[2px_1fr]
          gap-x-8
          animate-fade-in
          [animation-delay:1s]
          lg:ml-20 lg:gap-x-10
        "
      >
        {/* Vertical line */}
        <div
          className="
            row-span-2 h-full w-px
            rounded-full
            bg-[var(--foreground)]
            hero-vertical-line
          "
        />

        <div className="flex flex-wrap items-center gap-5 sm:gap-10 py-3 overflow-hidden">
          {/* View Work */}
          <motion.a
          initial={{x:"-200px"}}
      animate={{x:0}}
      transition={{duration:1,ease:"easeInOut"}}
      
            href="#projects"
            className="
              group relative flex
              cursor-none target-hand
              items-center gap-3
              overflow-hidden rounded-lg
              border border-[var(--foreground)]/15
              px-5 py-3

              transition-all duration-300
              hover:-translate-y-0.5
              hover:shadow-[0_10px_30px_rgba(0,0,0,0.10)]
              active:translate-y-0
            "
          >
            <span
              className="
                absolute inset-0
                origin-left scale-x-0
                bg-[var(--foreground)]
                transition-transform duration-500
                ease-[cubic-bezier(.22,1,.36,1)]
                group-hover:scale-x-100
              "
            />

            <span
              className="
                absolute inset-y-0 -left-[40%]
                w-[30%]
                skew-x-[-20deg]
                bg-white/20
                transition-all duration-700
                group-hover:left-[120%]
              "
            />

            <span
              className="
                relative z-10
                text-sm font-normal
                tracking-[-0.03em]
                text-[var(--foreground)]
                transition-colors duration-300
                group-hover:text-[var(--background)]
              "
            >
              View Work
            </span>

            <ArrowUpRight
              size={17}
              strokeWidth={1.5}
              className="
                relative z-10
                text-[var(--foreground)]
                transition-all duration-500
                group-hover:-translate-y-1
                group-hover:translate-x-1
                group-hover:text-[var(--background)]
              "
            />
          </motion.a>

          {/* Resume */}
          <motion.a
          initial={{y:"100px"}}
      animate={{y:0}}
      transition={{duration:1,ease:"circInOut"}}
      
            onClick={()=>setResumeOpen(true)}
            target="_blank"
            rel="noopener noreferrer"
            className="
              group flex
              cursor-none target-hand
              items-center gap-2.5
              rounded-lg
              px-5 py-3
              text-sm
              tracking-[-0.03em]
              text-[var(--foreground)]/55
              transition-all duration-300
              hover:-translate-y-0.5
              hover:bg-[var(--foreground)]/[0.04]
              hover:text-[var(--foreground)]
              active:translate-y-0
            "
          >
            <FileText
              size={16}
              strokeWidth={1.5}
              className="
                transition-transform duration-300
                group-hover:-rotate-3
              "
            />

            <span>Resume</span>

            <ArrowUpRight
              size={14}
              strokeWidth={1.5}
              className="
                opacity-40
                transition-all duration-300
                group-hover:-translate-y-0.5
                group-hover:translate-x-0.5
                group-hover:opacity-100
              "
            />
          </motion.a>
        </div>
      </div>
      {/* Scroll indicator */}
        <div
          className="
            absolute bottom-20 right-0
            hidden items-center gap-3
            pointer-events-none
            animate-fade-in
            [animation-delay:1.6s]
            lg:flex
          "
        >
          <span
            className="
              text-[8px]
              uppercase
              tracking-[0.2em]
              text-[var(--foreground)]/25
            "
          >
            Scroll
          </span>

          <div
            className="
              h-8 w-px
              bg-[var(--foreground)]/20
              animate-scroll-indicator
            "
          />
        </div>
    </section>
  );
};

export default Hero;