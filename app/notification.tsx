"use client";

import { useEffect, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { X } from "lucide-react";

export type Notification1 = {
  id: string | number;
  message: string;
};

type BotNotificationProps = {
  notifications: Notification1[];
  setNotifications: Dispatch<SetStateAction<Notification1[]>>;
};

export default function BotNotification({
  notifications,
  setNotifications,
}: BotNotificationProps) {
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState<Notification1 | null>(null);

  useEffect(() => {
    // Don't do anything if another notification is already being shown
    if (visible || current || notifications.length === 0) return;

    const nextNotification = notifications[0];

    setCurrent(nextNotification);
      setVisible(true);

  }, [notifications, visible, current]);

  useEffect(() => {
    if (!current) return;

    const timer = setTimeout(() => {
      dismissNotification();
    }, 2500);

    return () => clearTimeout(timer);
  }, [current]);

  const dismissNotification = () => {
    setVisible(false);

    // Wait for exit animation before removing it
    setTimeout(() => {
      if (!current) return;

      setNotifications((prev) =>
        prev.filter((notification) => notification.id !== current.id)
      );

      setCurrent(null);
    }, 1000);
  };

  return (
    <div
    id="notification"
      className="
        fixed
        top-10 right-5
        z-[13000]
        w-[min(320px,calc(100vw-2rem))]
        duration-200
        overflow-hidden
        ease-out
        pointer-events-none
     "
    >
      <div
      style={{
        transform:visible?"translateX(0)":"translateX(100%)",
        transition:"transform 500ms linear",
    }}
     className="relative overflow-hidden rounded-2xl border border-black/[0.07] bg-white/95 pointer-events-auto">
        {/* Countdown */}
        <div className="absolute inset-x-0 top-0 h-[2px] overflow-hidden bg-black/[0.05]">
          {current?.message && <div
            className="h-full origin-left animate-[notificationProgress_3s_linear_forwards] bg-gray-900"
          />}
        </div>

        <div className="flex items-start gap-3 p-4 pt-5">
          {/* Bot indicator */}
          <BotSvg/>

          {/* Message */}
          <div className="min-w-0 flex-1">
            <div className="mb-1 flex items-center gap-2">
              <span className="text-xs font-semibold text-gray-900">
                Rica - Assistant
              </span>
            </div>

            <p className="text-xs leading-5 text-gray-600">
              {(current??{}).message}
            </p>
          </div>

          {/* Dismiss */}
          <button
            type="button"
            onClick={dismissNotification}
            aria-label="Dismiss notification"
            className="
              -mr-1
              -mt-1
              flex
              h-7
              w-7
              shrink-0
              items-center
              justify-center
              rounded-full
              text-gray-400
              transition
              hover:bg-gray-100
              hover:text-gray-700
              active:scale-95
            "
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}


function BotSvg() {
  return (
    <svg viewBox="0 0 150 185" className="h-[50px] w-auto overflow-visible ">
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

