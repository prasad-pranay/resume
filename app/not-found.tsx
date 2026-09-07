import { ArrowLeft, ArrowUpRight, Home, Sparkles } from "lucide-react";
import Cursor from "@/components/Cursor";
import Image from "next/image";

export default function NotFound() {
  return (
    <main className="relative min-h-screen overflow-hidden px-6 text-gray-900">
        <Cursor/>

      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-purple-100/60 blur-3xl" />
        <div className="absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-pink-100/60 blur-3xl" />

        <div className="absolute left-[12%] top-[18%] h-3 w-3 rotate-12 rounded-sm bg-purple-400" />
        <div className="absolute right-[18%] top-[25%] h-2 w-2 rounded-full bg-yellow-400" />
        <div className="absolute bottom-[20%] left-[20%] h-2.5 w-2.5 rounded-full bg-pink-400" />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center text-center">

        {/* Status */}
        {/* <div className="mb-5 flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-xs font-bold shadow">
          <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
          404 · Page not found
        </div> */}

        {/* GIF */}
        <div className="relative">
          <div className="absolute inset-0 -z-10 scale-75 rounded-full bg-purple-100 blur-3xl" />

          {/* <img
            src="/404.gif"
            alt="Lost"
            className="h-[28vh] max-h-72 w-auto object-contain transition duration-500 hover:scale-105"
          /> */}
          <Image
  src="/404.gif"
  alt="Lost"
  width={300}
  loading="eager"
  height={300}
  className="h-[28vh] max-h-72 w-auto object-contain transition duration-500 hover:scale-105"
/>
        </div>

        {/* Heading */}
        <h1 className="mt-5 max-w-2xl text-5xl font-black tracking-tight sm:text-6xl md:text-7xl">
          Lost your way?
          <span className="ml-2 inline-block text-purple-600">Oops.</span>
        </h1>

        <p className="mt-5 max-w-lg text-sm font-medium leading-7 text-gray-500 sm:text-base">
          Looks like you wandered into a corner of the internet that
          doesn&apos;t exist. Let&apos;s get you back somewhere useful.
        </p>

        {/* Primary actions */}
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">

          <a
            href="/"
            className="cursor-none group flex items-center gap-2 rounded-full bg-black px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-black/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <Home className="h-4 w-4" />
            Back to home
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          <a
          href="/"
            className="cursor-none group flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-gray-700 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gray-300 hover:shadow-md"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Go back
          </a>

        </div>

        {/* Explore CTA */}
        <a
          href="/"
          className="group mt-8 flex items-center gap-2 text-xs  text-gray-400 transition hover:text-purple-600 cursor-none"
        >
          <Sparkles className="h-3.5 w-3.5" />
          Or explore what&apos;s happening
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>

        {/* Bottom hint */}
        <div className="absolute bottom-8 text-[9px] font-bold uppercase tracking-[0.25em] text-gray-300">
          You&apos;re not lost. Just exploring.
        </div>

      </div>
    </main>
  );
}

