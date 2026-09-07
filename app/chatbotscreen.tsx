"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUp, Mic, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import VoiceDialogCard from "@/components/voicecard";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: Date;
};

type Suggestion = {
  id: string;
  label: string;
};

function formatTime(date: Date) {
  return new Intl.DateTimeFormat("en-IN", {
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}


const initialSuggestions: Suggestion[] = [
  {
    id: "1",
    label: "Tell me about yourself",
  },
  {
    id: "2",
    label: "View your projects",
  },
  {
    id: "3",
    label: "What are your skills?",
  },
  {
    id: "4",
    label: "How can I contact you?",
  },
];
interface ChatBotScreenProps {
  setChatScreen: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function ChatBotScreen({setChatScreen}:ChatBotScreenProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [welcomeMessage, setWelcomeMessage] = useState<Message | null>(null);
  const [suggestions, setSuggestions] =
    useState<Suggestion[]>(initialSuggestions);

  const [input, setInput] = useState("");
  const [isLoadingWelcome, setIsLoadingWelcome] = useState(true);
  const [isLoadingResponse, setIsLoadingResponse] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadInitialChat = async () => {
      try {
        // Replace with your API call

        setTimeout(() => {
          setWelcomeMessage({
  id: "welcome",
  role: "assistant",
  content:
    "Hey, welcome to my portfolio. Ask me anything about my work, projects, or skills.",
  createdAt: new Date(),
});

          setIsLoadingWelcome(false);
        }, 700);
      } catch (error) {
        console.error("Failed to load chat");
        setIsLoadingWelcome(false);
      }
    };

    loadInitialChat();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isLoadingResponse]);

  const hasStartedConversation = messages.length > 0;

  const sendMessage = async (messageText?: string) => {
    const text = messageText || input;

    if (!text.trim() || isLoadingResponse) return;

    const userMessage: Message = {
  id: Date.now().toString(),
  role: "user",
  content: text.trim(),
  createdAt: new Date(),
};

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoadingResponse(true);

    try {
      // Replace with your backend API
      const res = await fetch(
    `https://clasher.pythonanywhere.com/ask?question=${encodeURIComponent(text.trim())}`
    // `http://localhost:5000/ask?question=${encodeURIComponent(question)}`
  );
const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
  id: (Date.now() + 1).toString(),
  role: "assistant",
  content:
    data.answer,
  createdAt: new Date(),
},
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
  id: (Date.now() + 1).toString(),
  role: "assistant",
  content:
    `Failed to send message. \n ${error}`,
  createdAt: new Date(),
},
      ]);
      console.error("Failed to send message");
    } finally {
      setIsLoadingResponse(false);
    }
  };

  const [voiceScreen,setVoiceScreen] = useState(false);
  return (
    <motion.div
    initial={{x:"100%"}}
    animate={{x:"0"}}
    exit={{x:"100%"}}
    transition={{duration:1}}
    data-lenis-prevent
      className={`
        fixed
        z-[12000]
        sm:bottom-5 sm:right-5 bottom-0 right-0
        flex
        h-[100dvh] w-[100dvw]
        lg:h-[65dvh] lg:w-[45vw]
        md:h-[65dvh] md:w-[65vw]
        flex-col
        overflow-hidden
        sm:rounded-[24px]
        border
        border-zinc-200/80 dark:border-[#2E2E2E]
        bg-[#fafafa] dark:bg-[#1a1a1a]
        shadow-[0_24px_70px_rgba(0,0,0,0.10)]
        overflow-y-auto
        overscroll-contain
      `}
    >
      {/* close button */}
        <div onClick={()=>setChatScreen(false)} className="absolute top-0 right-0 p-4 rounded-bl-4xl text-white sm:text-gray-400 target-hand hover:text-white transition duration-300 bg-[#fa5252] sm:bg-[#fff5f5] hover:bg-[#fa5252] dark:bg-[#fa5252] sm:dark:bg-[#1a1a1a] dark:hover:bg-[#f03e3e]">
          <X/>
        </div>

      {/* Chat */}
      <main className="min-h-0 flex-1 overflow-y-auto px-5 py-6 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-zinc-200">
        
  <div className="mx-auto flex h-full px-1 sm:px-10 py-5 flex-col">
    {/* Welcome Area */}
    <div className="flex flex-1 flex-col justify-center">

      {/* Bot / Intro */}
      <div className="mb-7 grid grid-cols-[auto_1fr] gap-x-5 sm:gap-x-0">
        <div className="row-span-2 sm:row-span-1">
          <BotSvg />
        </div>

        <h2 className="text-4xl sm:text-[22px] bricolage-grotesque tracking-[-0.035em] text-zinc-900 dark:text-white sm:ml-5 sm:mt-2 self-end sm:self-start">
          Hey, I&apos;m Rica.
        </h2>

        <p className="sm:mt-0 mt-3 text-xs font-light leading-6 text-[var(--foreground)]/80 sm:col-span-2">
          Your little guide to Pranay&apos;s work, projects and everything
          in between.
        </p>
      </div>

      {/* System Message */}
      {isLoadingWelcome ? (
        <WelcomeSkeleton />
      ) : (
        welcomeMessage && (
          <div className="mb-7 flex items-end gap-2">
            <div
              className="
                max-w-[330px]
                rounded-2xl
                rounded-bl-md
                border
                border-zinc-200/70
                bg-white/80
                px-3.5
                py-2.5
                shadow-[0_2px_10px_rgba(0,0,0,0.025)]
              "
            >
              <p className="text-[12px] leading-5 text-zinc-500">
                {welcomeMessage.content}
              </p>

              <p className="mt-1.5 text-[9px] text-zinc-300">
                {formatTime(welcomeMessage.createdAt)}
              </p>
            </div>
          </div>
        )
      )}

      {/* Suggestions */}
    <AnimatePresence>
      {!hasStartedConversation && !isLoadingWelcome && suggestions.length > 0 && (
        <motion.div initial={{opacity:0,}} exit={{opacity:0,}} animate={{opacity:1}} transition={{duration:1}} >
          <div className="mb-3 flex items-center justify-between">
            <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-zinc-300">
              Start with
            </span>

            <span className="text-[9px] text-zinc-300">
              Pick a topic
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion.id}
                onClick={() => sendMessage(suggestion.label)}
                className="
                  group rounded-full border border-zinc-200 bg-white px-3.5 py-2.5 text-left text-[11px] font-medium text-zinc-500 shadow-[0_2px_8px_rgba(0,0,0,0.025)] transition-all duration-200
                  hover:-translate-y-0.5 hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-900 hover:shadow-[0_5px_18px_rgba(0,0,0,0.06)] active:scale-[0.97] "
              >
                <span className="mr-1.5 text-zinc-300 transition-colors group-hover:text-zinc-500">
                  →
                </span>

                {suggestion.label}
              </button>
            ))}
          </div>
        </motion.div>
      )}
      </AnimatePresence>
    </div>

    {/* Tiny Footer Hint */}
    {/* <div className="pb-1 text-center">
      <p className="text-[9px] text-zinc-300">
        or ask me something completely different
      </p>
    </div> */}
  </div>

         {hasStartedConversation && <div className="mx-auto flex px-1 sm:px-10 py-5 flex-col gap-6 -mt-65 sm:-mt-20">
            {messages.map((message) => (
  <div
    key={message.id}
    className={`flex animate-in fade-in slide-in-from-bottom-1 duration-300 ${
      message.role === "user"
        ? "justify-end"
        : "justify-start"
    }`}
  >
    {message.role === "assistant" ? (
      <div className="flex max-w-[88%] flex-col items-start">
        <div
          className="
            rounded-2xl
            rounded-bl-md
            max-w-[330px]
            bg-white/80
            px-3.5
            py-2.5
            shadow-[0_2px_10px_rgba(0,0,0,0.025)] 
            relative pb-4
          "
        >
          <p className="text-[13px] leading-[1.7] text-zinc-600">
            {message.content}
          </p>
        <span className="text-[9px] text-zinc-300 absolute bottom-1 right-3">
          {formatTime(message.createdAt)}
        </span>
        </div>

      </div>
    ) : (
      <div className="flex max-w-[82%] flex-col items-end">
        <div
          className="
            rounded-2xl
            rounded-br-md
            bg-zinc-900 dark:bg-[#099268]
            px-4
            py-2.5
            text-[13px]
            leading-5 relative pb-5
            text-white
          "
        >
          {message.content}
        <span className="absolute bottom-0 right-2 text-[8px] text-zinc-300">
          {formatTime(message.createdAt)}
        </span>
        </div>

      </div>
    )}
  </div>
))}

            {isLoadingResponse && <MessageSkeleton />}
          </div>
        }

        <div ref={bottomRef} />
      </main>

      {/* Input */}
      <footer className="shrink-0 border-t border-zinc-200/70 dark:border-zinc-700 p-4">
        <div
          className="
            flex
            items-end
            gap-2
            rounded-2xl
            border
            border-zinc-200 dark:border-[#383838]
            bg-white dark:bg-[#2E2E2E]
            px-2
            py-2
            cursor-none
            transition-all
            duration-200
            focus-within:border-zinc-300
            dark:focus-within:border-zinc-600
            focus-within:shadow-[0_4px_20px_rgba(0,0,0,0.04)]
          "
        >
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
            placeholder="Ask anything..."
            rows={1}
            className="
              min-h-[38px]
              max-h-[120px]
              flex-1
              resize-none
              bg-transparent
              px-2
              py-2
              text-[13px]
              cursor-none target-text
              leading-5
              text-[var(--foreground)]
              outline-none
              placeholder:text-zinc-400
            "
          />

          <button
            type="button"
            onClick={() => {
              if(!input.trim()){
                setVoiceScreen(true)
              }else{
                sendMessage()
              }

            }}
            disabled={isLoadingResponse}
            className={`
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-xl
              transition-all cursor-none target-hand hover:scale-120
              duration-200
              ${
                input.trim() && !isLoadingResponse
                  ? "bg-zinc-900 text-white hover:scale-[1.03] active:scale-95"
                  : "bg-[dodgerblue]"
              }
            `}
            aria-label="Send message"
          >
            {input.trim() ? <ArrowUp size={16} strokeWidth={2.2} /> : <Mic size={16} strokeWidth={2.2} className="stroke-white" />}
            
          </button>
        </div>
      </footer>
      {voiceScreen && <VoiceDialogCard setText={setInput} setOpen={setVoiceScreen}/>}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Skeletons
───────────────────────────────────────────── */

function WelcomeSkeleton() {
  return (
    <div className="mb-7">
      <div className="w-[300px] space-y-2">
        <div className="h-2.5 w-[90%] animate-pulse rounded-full bg-zinc-200/70" />
        <div className="h-2.5 w-[68%] animate-pulse rounded-full bg-zinc-200/70" />
      </div>
    </div>
  );
}

function MessageSkeleton() {
  return (
    <div className="flex justify-start">
      <div className="w-[220px] space-y-2 py-1">
        <div className="h-2.5 w-full animate-pulse rounded-full bg-zinc-200/70" />
        <div className="h-2.5 w-[78%] animate-pulse rounded-full bg-zinc-200/70" />
        <div className="h-2.5 w-[52%] animate-pulse rounded-full bg-zinc-200/70" />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Bot
───────────────────────────────────────────── */


function BotSvg() {
  return (
    <svg viewBox="0 0 150 185" className="h-[150px] sm:h-[50px] w-auto overflow-visible">

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
