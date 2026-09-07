"use client";

import React, { useEffect, useState } from "react";
import { ArrowUpRight, MapPin } from "lucide-react";

const Footer = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
  setTime(
    new Intl.DateTimeFormat("en-IN", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).format(new Date())
  );
};

    updateTime();

    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="w-full py-8 user-select-none">
      <div className="h-px w-full bg-gray-200 mb-7 xl:mb-15" />

      <div className="flex flex-row items-start sm:items-center justify-between gap-5 text-sm lg:pb-8">
        
        {/* Copyright */}
        <div className="group cursor-default">
          <span className="text-[var(--foreground)]/50 text-sm sm:text-base font-light transition-colors duration-300 group-hover:text-[var(--foreground)]">
            © 2026, {" "}
          </span>

          <span className="relative text-sm sm:text-base text-[var(--foreground)]/50 font-light transition-colors duration-300 group-hover:text-[#ff5a36]">
            Pranay Prasad
            <span
              className="
                absolute
                left-0
                -bottom-1
                h-px
                w-0
                bg-[#ff5a36]
                transition-all
                duration-300
                group-hover:w-full
              "
            />
          </span>
        </div>


        {/* Time */}
        <div className="group cursor-default">
          <span
            className="
              text-[var(--foreground)]/50
              tabular-nums
              transition-all
              font-light
              text-sm sm:text-base
              duration-300
              group-hover:text-[var(--foreground)]
            "
          >
            {time} IST
          </span>
        </div>

        {/* Location */}
        <div
          className="
            group
            flex
            items-center
            gap-1.5
            cursor-default
            text-[var(--foreground)]/50
            font-light
            text-sm sm:text-base
            transition-colors
            duration-300
            hover:text-gray-900
          "
        >
          <MapPin
            className="
              h-4
              w-4
              transition-transform
              duration-300
              group-hover:-translate-y-0.5
            "
          />

          <span
            className="
              transition-transform
              duration-300
              group-hover:translate-x-0.5
            "
          >
            Gurgaon, India
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;