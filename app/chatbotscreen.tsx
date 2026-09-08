"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUp, Mic, X, RefreshCw } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import VoiceDialogCard from "@/components/voicecard";
import HoverWord from "@/components/hoverword";

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
  { id: "1", label: "Tell me about yourself" },
  { id: "2", label: "View your projects" },
  { id: "3", label: "What are your skills?" },
  { id: "4", label: "How can I contact you?" },
  { id: "5", label: "What do you do?" },
  { id: "6", label: "Your tech stack?" },
  { id: "7", label: "What makes you different?" },
  { id: "8", label: "Where are you based?" },
  { id: "9", label: "Your education?" },
  { id: "10", label: "What are you building?" },
  { id: "11", label: "Your best project?" },
  { id: "12", label: "What do you enjoy?" },
  { id: "13", label: "Why hire you?" },
  { id: "14", label: "Are you available?" },
  { id: "15", label: "Your GitHub?" },
  { id: "16", label: "Your LinkedIn?" },
  { id: "17", label: "Download your resume" },
  { id: "18", label: "Tell me something fun" },
  { id: "19", label: "What are you learning?" },
];

interface ChatBotScreenProps {
  setChatScreen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ChatBotScreen({
  setChatScreen,
}: ChatBotScreenProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [welcomeMessage, setWelcomeMessage] = useState<Message | null>(null);

  const [input, setInput] = useState("");
  const [isLoadingWelcome, setIsLoadingWelcome] = useState(true);
  const [isLoadingResponse, setIsLoadingResponse] = useState(false);

  const [voiceScreen, setVoiceScreen] = useState(false);
  const [suggestionPage, setSuggestionPage] = useState(0);

  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  /* ─────────────────────────────────────────────
  Initial welcome message
  ───────────────────────────────────────────── */

  useEffect(() => {
    const loadInitialChat = async () => {
      try {
        setTimeout(() => {
          setWelcomeMessage({
            id: "welcome",
            role: "assistant",
            content:
              "Hey, I'm Rica. Ask me anything about Pranay, his work, projects, skills, or whatever you're curious about.",
            createdAt: new Date(),
          });

          setIsLoadingWelcome(false);
        }, 500);
      } catch (error) {
        console.error("Failed to load chat");
        setIsLoadingWelcome(false);
      }
    };

    loadInitialChat();


  }, []);

  /* ─────────────────────────────────────────────
  Scroll to latest message
  ───────────────────────────────────────────── */

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isLoadingResponse]);

  /* ─────────────────────────────────────────────
  Auto resize textarea
  ───────────────────────────────────────────── */

  useEffect(() => {
    const textarea = textareaRef.current;


    if (!textarea) return;

    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;


  }, [input]);

  const hasStartedConversation = messages.length > 0;

  /* ─────────────────────────────────────────────
  Send message
  ───────────────────────────────────────────── */

  const sendMessage = async (messageText?: string) => {
    const text = messageText || input;


    if (!text.trim() || isLoadingResponse) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: text.trim(),
      createdAt: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    setInput("");
    setIsLoadingResponse(true);

    try {
      const res = await fetch(
        `https://clasher.pythonanywhere.com/ask?question=${encodeURIComponent(
          text.trim()
        )}`
      );

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: data.answer,
          createdAt: new Date(),
        },
      ]);
    } catch (error) {
      console.error("Failed to send message", error);

      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content:
            "Something went wrong while reaching Rica. Please try again.",
          createdAt: new Date(),
        },
      ]);
    } finally {
      setIsLoadingResponse(false);
    }


  };

  /* ─────────────────────────────────────────────
  Suggestions
  ───────────────────────────────────────────── */

  const suggestionsPerPage = 4;

  const visibleSuggestions = initialSuggestions.slice(
    suggestionPage * suggestionsPerPage,
    suggestionPage * suggestionsPerPage + suggestionsPerPage
  );

  const nextSuggestions = () => {
    setSuggestionPage((prev) => {
      const totalPages = Math.ceil(
        initialSuggestions.length / suggestionsPerPage
      );


      return (prev + 1) % totalPages;
    });


  };

  return (
    <>
      <motion.div
        data-lenis-prevent
        initial={{
          opacity: 0,
          y: 30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        exit={{
          opacity: 0,
          y: 30,
        }}
        transition={{
          duration: 0.55,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
fixed
z-[12000]


      bottom-0
      right-0

      sm:bottom-5
      sm:right-5

      flex
      h-[100dvh]
      w-[100dvw]
  rounded-sm
      sm:h-[720px]
      sm:max-h-[85dvh]
      sm:w-[520px]

      flex-col

      overflow-hidden

      bg-[var(--background)]

      sm:border
      sm:border-[var(--foreground)]/10

      sm:shadow-[0_30px_100px_rgba(0,0,0,0.12)]
    "
      >
        {/* ─────────────────────────────────────────
        Header
    ───────────────────────────────────────── */}

        <header
        data-lenis-prevent
          className="
        relative
        flex
        shrink-0
        items-center
        justify-between

        border-b
        border-[var(--foreground)]/10

        px-6
        py-5
      "
        >
          <div>
            <p
              className="
            bricolage-grotesque
            text-sm
            font-medium
            tracking-[-0.02em]
            text-[var(--foreground)]
          "
            >
              RICA
            </p>

            <p
              className="
            mt-1
            text-[9px]
            uppercase
            tracking-[0.18em]
            text-[var(--foreground)]/40
          "
            >
              AI Guide · Pranay Prasad
            </p>
          </div>

          <button
            onClick={() => setChatScreen(false)}
            className="
          group
          flex
          size-9
          items-center
          justify-center

          border
          border-[var(--foreground)]/10

          text-[var(--foreground)]/50

          transition-all
          duration-300

          hover:border-[#ff5a36]
          hover:bg-[#ff5a36]
          hover:text-white

          cursor-none
          target-hand
        "
            aria-label="Close chat"
          >
            <X
              size={17}
              strokeWidth={1.5}
              className="
            transition-transform
            duration-300
            group-hover:rotate-90
          "
            />
          </button>
        </header>

        {/* ─────────────────────────────────────────
        Chat area
    ───────────────────────────────────────── */}

        <main
        data-lenis-prevent
          className="
        min-h-0
        flex-1
        overflow-y-auto

        px-6
        sm:px-8

        scrollbar-thin
        scrollbar-track-transparent
      "
        >
          {/* ─────────────────────────────────────
          Empty / Welcome state
      ───────────────────────────────────── */}

          {!hasStartedConversation && (
            <div
              className="
            flex
            min-h-full
            flex-col
            justify-center

            py-12
          "
            >
              {/* Editorial intro */}

              <motion.div
                initial={{
                  opacity: 0,
                  y: 12,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <p
                  className="
                mb-5

                text-[10px]
                uppercase
                tracking-[0.2em]

                text-[#ff5a36]
              "
                >
                  Meet Rica
                </p>

                <h2
                  className="
                bricolage-grotesque

                max-w-[430px]

                text-4xl
                sm:text-5xl

                leading-[0.95]
                tracking-[-0.055em]

                text-[var(--foreground)]
              "
                >
                  <HoverWord text="Ask anything." />
                  <br />
                  <HoverWord text="Seriously." className="text-[#ff5a36]" />
                </h2>
              </motion.div>

              {/* Divider */}

              <motion.div
                initial={{
                  scaleX: 0,
                }}
                animate={{
                  scaleX: 1,
                }}
                transition={{
                  delay: 0.2,
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="
              my-10
              h-px
              w-full

              origin-left

              bg-[var(--foreground)]/10
            "
              />

              {/* Welcome message */}

              {isLoadingWelcome ? (
                <WelcomeSkeleton />
              ) : (
                welcomeMessage && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 10,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.5,
                    }}
                  >
                    <div
                      className="
                    mb-3

                    flex
                    items-center
                    gap-3
                  "
                    >
                      <span
                        className="
                      text-[9px]
                      uppercase
                      tracking-[0.18em]

                      text-[var(--foreground)]/35
                    "
                      >
                        Rica
                      </span>

                      <div
                        className="
                      h-px
                      w-8

                      bg-[var(--foreground)]/15
                    "
                      />
                    </div>

                    <p
                      className="
                    max-w-[440px]

                    text-sm
                    sm:text-[15px]

                    leading-7

                    text-[var(--foreground)]/65
                  "
                    >
                      {welcomeMessage.content}
                    </p>
                  </motion.div>
                )
              )}

              {/* Suggestions */}

              {!isLoadingWelcome && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 0.25,
                    duration: 0.5,
                  }}
                  className="mt-12"
                >
                  <div
                    className="
                  mb-4

                  flex
                  items-center
                  justify-between
                "
                  >
                    <p
                      className="
                    text-[9px]
                    uppercase
                    tracking-[0.18em]

                    text-[var(--foreground)]/35
                  "
                    >
                      Start with
                    </p>

                    <button
                      onClick={nextSuggestions}
                      className="
                    group
                    flex
                    items-center
                    gap-2

                    text-[9px]
                    uppercase
                    tracking-[0.15em]

                    text-[var(--foreground)]/40

                    transition-colors
                    duration-300

                    hover:text-[#ff5a36]

                    cursor-none
                    target-hand
                  "
                    >
                      More

                      <RefreshCw
                        size={12}
                        strokeWidth={1.5}
                        className="
                      transition-transform
                      duration-500

                      group-hover:rotate-180
                    "
                      />
                    </button>
                  </div>

                  <div
                    className="
                  border-t
                  border-[var(--foreground)]/10
                "
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={suggestionPage}
                        initial={{
                          opacity: 0,
                          y: 8,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        exit={{
                          opacity: 0,
                          y: -8,
                        }}
                        transition={{
                          duration: 0.25,
                        }}
                      >
                        {visibleSuggestions.map(
                          (suggestion, index) => (
                            <button
                              key={suggestion.id}
                              onClick={() =>
                                sendMessage(suggestion.label)
                              }
                              className="
                            group
                            flex
                            w-full
                            items-center
                            justify-between

                            border-b
                            border-[var(--foreground)]/10

                            py-4

                            text-left

                            cursor-none
                            target-hand
                          "
                            >
                              <div
                                className="
                              flex
                              items-center
                              gap-4
                            "
                              >
                                <span
                                  className="
                                text-[10px]

                                text-[var(--foreground)]/30
                              "
                                >
                                  0{index + 1}
                                </span>

                                <span
                                  className="
                                text-sm

                                text-[var(--foreground)]/65

                                transition-all
                                duration-300

                                group-hover:translate-x-1
                                group-hover:text-[var(--foreground)]
                              "
                                >
                                  {suggestion.label}
                                </span>
                              </div>

                              <ArrowUp
                                size={15}
                                strokeWidth={1.4}
                                className="
                              -rotate-45

                              text-[var(--foreground)]/25

                              transition-all
                              duration-300

                              group-hover:translate-x-1
                              group-hover:-translate-y-1
                              group-hover:text-[#ff5a36]
                            "
                              />
                            </button>
                          )
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}
            </div>
          )}

          {/* ─────────────────────────────────────
          Conversation state
      ───────────────────────────────────── */}

          {hasStartedConversation && (
            <div
              className="
            mx-auto

            flex
            max-w-[600px]
            flex-col

            gap-12

            py-10
            pb-32
          "
            >
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{
                    opacity: 0,
                    y: 12,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.35,
                    ease: "easeOut",
                  }}
                  className={
                    message.role === "user"
                      ? "ml-auto w-full max-w-[82%]"
                      : "w-full max-w-[88%]"
                  }
                >
                  {/* Assistant */}

                  {message.role === "assistant" ? (
                    <div>
                      <div
                        className="
                      mb-4

                      flex
                      items-center
                      gap-3
                    "
                      >
                        <span
                          className="
                        text-[9px]
                        uppercase
                        tracking-[0.18em]

                        text-[#ff5a36]
                      "
                        >
                          Rica
                        </span>

                        <div
                          className="
                        h-px
                        w-8

                        bg-[var(--foreground)]/15
                      "
                        />

                        <span
                          className="
                        text-[9px]

                        text-[var(--foreground)]/25
                      "
                        >
                          {formatTime(message.createdAt)}
                        </span>
                      </div>

                      <p
                        className="
                      whitespace-pre-wrap

                      text-sm
                      sm:text-[15px]

                      leading-7

                      text-[var(--foreground)]/75
                    "
                      >
                        {message.content}
                      </p>
                    </div>
                  ) : (
                    /* User */

                    <div className="text-right">
                      <div
                        className="
                      mb-4

                      flex
                      items-center
                      justify-end
                      gap-3
                    "
                      >
                        <span
                          className="
                        text-[9px]

                        text-[var(--foreground)]/25
                      "
                        >
                          {formatTime(message.createdAt)}
                        </span>

                        <div
                          className="
                        h-px
                        w-8

                        bg-[var(--foreground)]/15
                      "
                        />

                        <span
                          className="
                        text-[9px]
                        uppercase
                        tracking-[0.18em]

                        text-[var(--foreground)]/40
                      "
                        >
                          You
                        </span>
                      </div>

                      <p
                        className="
                      ml-auto

                      max-w-[440px]

                      whitespace-pre-wrap

                      text-sm
                      sm:text-[15px]

                      leading-7

                      text-[var(--foreground)]
                    "
                      >
                        {message.content}
                      </p>
                    </div>
                  )}
                </motion.div>
              ))}

              {isLoadingResponse && <MessageSkeleton />}

              <div ref={bottomRef} />
            </div>
          )}
        </main>

        {/* ─────────────────────────────────────────
        Input
    ───────────────────────────────────────── */}

        <footer
          className="
        shrink-0

        border-t
        border-[var(--foreground)]/10

        px-5
        py-4
        sm:px-6
      "
        >
          <div
            className="
          flex
          items-end
          gap-3
        "
          >
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              placeholder="Ask Rica something..."
              rows={1}
              className="
            min-h-[30px]
            max-h-[120px]

            flex-1

            resize-none

            bg-transparent

            py-1

            text-sm

            leading-6

            text-[var(--foreground)]

            outline-none

            placeholder:text-[var(--foreground)]/30

            cursor-none
            target-text
          "
            />

            <button
              type="button"
              onClick={() => {
                if (!input.trim()) {
                  setVoiceScreen(true);
                } else {
                  sendMessage();
                }
              }}
              disabled={isLoadingResponse}
              className={`
            group

            flex
            size-10
            shrink-0

            items-center
            justify-center

            border
            rounded-sm

            transition-all
            duration-300

            cursor-none
            target-hand

            ${input.trim() && !isLoadingResponse
                  ? `
                  border-[#ff5a36]
                  bg-[#ff5a36]
                  text-white

                  hover:scale-[1.04]
                `
                  : `
                  border-[var(--foreground)]/10
                  text-[var(--foreground)]/45

                  hover:border-[var(--foreground)]/30
                  hover:text-[var(--foreground)]
                `
                }

            disabled:opacity-40
          `}
              aria-label={
                input.trim() ? "Send message" : "Start voice chat"
              }
            >
              {input.trim() ? (
                <ArrowUp
                  size={17}
                  strokeWidth={1.7}
                  className="
                transition-transform
                duration-300

                group-hover:-translate-y-0.5
              "
                />
              ) : (
                <Mic
                  size={16}
                  strokeWidth={1.6}
                />
              )}
            </button>
          </div>

          {/* <div
        className="
          mt-3

          flex
          items-center
          justify-between
        "
      >
        <p
          className="
            text-[9px]

            text-[var(--foreground)]/25
          "
        >
          Press Enter to send
        </p>

        <p
          className="
            text-[9px]

            text-[var(--foreground)]/25
          "
        >
          RICA · AI PORTFOLIO GUIDE
        </p>
      </div> */}
        </footer>
      </motion.div>

      {/* ─────────────────────────────────────────
      Voice dialog
  ───────────────────────────────────────── */}

      <AnimatePresence>
        {voiceScreen && (
          <VoiceDialogCard
            setText={setInput}
            setOpen={setVoiceScreen}
          />
        )}
      </AnimatePresence>
    </>


  );
}

/* ─────────────────────────────────────────────
Loading skeletons
───────────────────────────────────────────── */

function WelcomeSkeleton() {
  return (<div> <div className="mb-4 flex items-center gap-3"> <div className="h-2 w-8 animate-pulse bg-[var(--foreground)]/10" /> <div className="h-px w-8 bg-[var(--foreground)]/10" /> </div>


    <div className="max-w-[420px] space-y-3">
      <div className="h-3 w-full animate-pulse bg-[var(--foreground)]/10" />

      <div className="h-3 w-[82%] animate-pulse bg-[var(--foreground)]/10" />

      <div className="h-3 w-[58%] animate-pulse bg-[var(--foreground)]/10" />
    </div>
  </div>


  );
}

function MessageSkeleton() {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      className="w-full max-w-[88%]"
    > <div className="mb-4 flex items-center gap-3">
        <span
          className="
text-[9px]
uppercase
tracking-[0.18em]


        text-[#ff5a36]
      "
        >
          Rica
        </span>

        <div
          className="
        h-px
        w-8

        bg-[var(--foreground)]/15
      "
        />
      </div>

      <div className="space-y-3">
        <div
          className="
        h-3
        w-full

        animate-pulse

        bg-[var(--foreground)]/10
      "
        />

        <div
          className="
        h-3
        w-[76%]

        animate-pulse

        bg-[var(--foreground)]/10
      "
        />

        <div
          className="
        h-3
        w-[48%]

        animate-pulse

        bg-[var(--foreground)]/10
      "
        />
      </div>
    </motion.div>

  );
}



// "use client";

// import { useEffect, useRef, useState } from "react";
// import { ArrowUp, Mic, X, RefreshCw } from "lucide-react";
// import { AnimatePresence, motion } from "framer-motion";
// import VoiceDialogCard from "@/components/voicecard";

// type Message = {
//   id: string;
//   role: "user" | "assistant";
//   content: string;
//   createdAt: Date;
// };

// type Suggestion = {
//   id: string;
//   label: string;
// };

// function formatTime(date: Date) {
//   return new Intl.DateTimeFormat("en-IN", {
//     hour: "numeric",
//     minute: "2-digit",
//   }).format(date);
// }


// const initialSuggestions: Suggestion[] = [
//   {
//     id: "1",
//     label: "Tell me about yourself",
//   },
//   {
//     id: "2",
//     label: "View your projects",
//   },
//   {
//     id: "3",
//     label: "What are your skills?",
//   },
//   {
//     id: "4",
//     label: "How can I contact you?",
//   },
//   {
//     id: "5",
//     label: "What do you do?",
//   },
//   {
//     id: "6",
//     label: "Your tech stack?",
//   },
//   {
//     id: "7",
//     label: "What makes you different?",
//   },
//   {
//     id: "8",
//     label: "Where are you based?",
//   },
//   {
//     id: "9",
//     label: "Your education?",
//   },
//   {
//     id: "10",
//     label: "What are you building?",
//   },
//   {
//     id: "11",
//     label: "Your best project?",
//   },
//   {
//     id: "12",
//     label: "What do you enjoy?",
//   },
//   {
//     id: "13",
//     label: "Why hire you?",
//   },
//   {
//     id: "14",
//     label: "Are you available?",
//   },
//   {
//     id: "15",
//     label: "Your GitHub?",
//   },
//   {
//     id: "16",
//     label: "Your LinkedIn?",
//   },
//   {
//     id: "17",
//     label: "Download your resume",
//   },
//   {
//     id: "18",
//     label: "Tell me something fun",
//   },
//   {
//     id: "19",
//     label: "What are you learning?",
//   },
// ];
// interface ChatBotScreenProps {
//   setChatScreen: React.Dispatch<React.SetStateAction<boolean>>;
// }
// export default function ChatBotScreen({ setChatScreen }: ChatBotScreenProps) {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [welcomeMessage, setWelcomeMessage] = useState<Message | null>(null);
//   const [suggestions, setSuggestions] =
//     useState<Suggestion[]>(initialSuggestions);

//   const [input, setInput] = useState("");
//   const [isLoadingWelcome, setIsLoadingWelcome] = useState(true);
//   const [isLoadingResponse, setIsLoadingResponse] = useState(false);

//   const bottomRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const loadInitialChat = async () => {
//       try {
//         // Replace with your API call

//         setTimeout(() => {
//           setWelcomeMessage({
//             id: "welcome",
//             role: "assistant",
//             content:
//               "Hey, welcome to my portfolio. Ask me anything about my work, projects, or skills.",
//             createdAt: new Date(),
//           });

//           setIsLoadingWelcome(false);
//         }, 700);
//       } catch (error) {
//         console.error("Failed to load chat");
//         setIsLoadingWelcome(false);
//       }
//     };

//     loadInitialChat();
//   }, []);

//   useEffect(() => {
//     bottomRef.current?.scrollIntoView({
//       behavior: "smooth",
//     });
//   }, [messages, isLoadingResponse]);

//   const hasStartedConversation = messages.length > 0;

//   const sendMessage = async (messageText?: string) => {
//     const text = messageText || input;

//     if (!text.trim() || isLoadingResponse) return;

//     const userMessage: Message = {
//       id: Date.now().toString(),
//       role: "user",
//       content: text.trim(),
//       createdAt: new Date(),
//     };

//     setMessages((prev) => [...prev, userMessage]);
//     setInput("");
//     setIsLoadingResponse(true);

//     try {
//       // Replace with your backend API
//       const res = await fetch(
//         `https://clasher.pythonanywhere.com/ask?question=${encodeURIComponent(text.trim())}`
//         // `http://localhost:5000/ask?question=${encodeURIComponent(question)}`
//       );
//       const data = await res.json();
//       setMessages((prev) => [
//         ...prev,
//         {
//           id: (Date.now() + 1).toString(),
//           role: "assistant",
//           content:
//             data.answer,
//           createdAt: new Date(),
//         },
//       ]);
//     } catch (error) {
//       setMessages((prev) => [
//         ...prev,
//         {
//           id: (Date.now() + 1).toString(),
//           role: "assistant",
//           content:
//             `Failed to send message. \n ${error}`,
//           createdAt: new Date(),
//         },
//       ]);
//       console.error("Failed to send message");
//     } finally {
//       setIsLoadingResponse(false);
//     }
//   };

//   const [voiceScreen, setVoiceScreen] = useState(false);

//   const [suggestionPage, setSuggestionPage] = useState(0);

//   const visibleSuggestions = suggestions.slice(
//     suggestionPage * 4,
//     suggestionPage * 4 + 4
//   );

//   const nextSuggestions = () => {
//     setSuggestionPage((prev) =>
//       (prev + 1) % Math.ceil(suggestions.length / 5)
//     );
//   };

//   return (
//     <motion.div
//       initial={{ x: "100%" }}
//       animate={{ x: "0" }}
//       exit={{ x: "100%" }}
//       transition={{ duration: 1 }}
//       data-lenis-prevent
//       className={`
//         fixed
//         z-[12000]
//         sm:bottom-5 sm:right-5 bottom-0 right-0
//         flex
//         h-[100dvh] w-[100dvw]
//         lg:h-[65dvh] lg:w-[45vw]
//         md:h-[65dvh] md:w-[65vw]
//         flex-col
//         overflow-hidden
//         sm:rounded-[24px]
//         border
//         border-zinc-200/80 dark:border-[#2E2E2E]
//         bg-[#fafafa] dark:bg-[#1a1a1a]
//         shadow-[0_24px_70px_rgba(0,0,0,0.10)]
//         overflow-y-auto
//         overscroll-contain
//       `}
//     >
//       {/* close button */}
//       <div onClick={() => setChatScreen(false)} className="absolute top-0 right-0 p-4 rounded-bl-4xl text-white sm:text-gray-400 target-hand hover:text-white transition duration-300 bg-[#fa5252] sm:bg-[#fff5f5] hover:bg-[#fa5252] dark:bg-[#fa5252] sm:dark:bg-[#1a1a1a] dark:hover:bg-[#f03e3e]">
//         <X />
//       </div>

//       {/* Chat */}
//       <main className="min-h-0 flex-1 overflow-y-auto px-5 py-6 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-zinc-200">

//         <div className="mx-auto flex h-full px-1 sm:px-10 py-5 flex-col">
//           {/* Welcome Area */}
//           <div className="flex flex-1 flex-col justify-center">

//             {/* Bot / Intro */}
//             <div className="mb-7 grid grid-cols-[auto_1fr] gap-x-5 sm:gap-x-0">
//               <div className="row-span-2 sm:row-span-1">
//                 <BotSvg />
//               </div>

//               <h2 className="text-4xl sm:text-[22px] bricolage-grotesque tracking-[-0.035em] text-zinc-900 dark:text-white sm:ml-5 sm:mt-2 self-end sm:self-start">
//                 Hey, I&apos;m Rica.
//               </h2>

//               <p className="sm:mt-0 mt-3 text-xs font-light leading-6 text-[var(--foreground)]/80 sm:col-span-2">
//                 Your little guide to Pranay&apos;s work, projects and everything
//                 in between.
//               </p>
//             </div>

//             {/* System Message */}
//             {isLoadingWelcome ? (
//               <WelcomeSkeleton />
//             ) : (
//               welcomeMessage && (
//                 <div className="flex max-w-[88%] flex-col items-start">
//                   <div
//                     className="
//             rounded-2xl
//             rounded-bl-md
//             max-w-[330px]
//             bg-white/80
//             dark:bg-white
//             px-3.5
//             py-2.5
//             pb-1
//             flex flex-col
//             shadow-[0_2px_10px_rgba(0,0,0,0.025)]
//             relative
//           "
//                   >
//                     <p className="text-[13px] leading-[1.7] text-zinc-600">
//                       {welcomeMessage.content}
//                     </p>
//                     <span className="text-[9px] text-zinc-300 dark:text-zinc-700 text-right">
//                       {formatTime(welcomeMessage.createdAt)}
//                     </span>
//                   </div>

//                 </div>
//               )
//             )}

//             {/* Suggestions */}
//             <AnimatePresence>
//               {!hasStartedConversation && !isLoadingWelcome && suggestions.length > 0 && (
//                 <motion.div initial={{ opacity: 0, }} exit={{ opacity: 0, }} animate={{ opacity: 1 }} transition={{ duration: 1 }} >
//                   <div className="mb-3 flex items-center justify-between mt-5">
//                     <span className="text-[9px] font-medium uppercase tracking-[0.14em] text-zinc-400">
//                       Try Asking
//                     </span>

//                     <button
//                       onClick={nextSuggestions}
//                       className="cursor-none rounded-full p-1.5 text-zinc-400 transition-all hover:bg-zinc-100 hover:text-zinc-900 active:rotate-180"
//                       aria-label="More suggestions"
//                     >
//                       <RefreshCw className="h-3.5 w-3.5" />
//                     </button>

//                   </div>
//                   <div>

//                     <div className="flex w-full overflow-x-scroll overflow-y-hidden hide-scrollbar py-2 gap-3">
//                       {visibleSuggestions.map((suggestion) => (
//                         <button

//                           key={suggestion.id}

//                           onClick={() => sendMessage(suggestion.label)}

//                           className="
//                   whitespace-nowrap
//                   group cursor-none target-hand rounded-lg bg-white px-3.5 py-2.5 text-left text-[11px] font-medium text-zinc-500 shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-all duration-200

//                   hover:-translate-y-0.5 hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-900 hover:shadow-[0_2px_8px_rgba(30,144,255,0.1)] active:scale-[0.97] "

//                         >

//                           {suggestion.label}

//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                   {/* <div className="flex flex-wrap gap-2">
//             {suggestions.map((suggestion) => (
//               <button
//                 key={suggestion.id}
//                 onClick={() => sendMessage(suggestion.label)}
//                 className="
//                   group cursor-none target-hand rounded-lg bg-white px-3.5 py-2.5 text-left text-[11px] font-medium text-zinc-500 shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-all duration-200
//                   hover:-translate-y-0.5 hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-900 hover:shadow-[0_5px_18px_rgba(0,0,0,0.06)] active:scale-[0.97] "
//               >
//                 {suggestion.label}
//               </button>
//             ))}
//           </div> */}
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>

//           {/* Tiny Footer Hint */}
//           {!hasStartedConversation && !isLoadingWelcome && suggestions.length > 0 && <div className="pb-1 text-center">
//             <p className="text-[9px] text-zinc-300">
//               or ask me something completely different
//             </p>
//           </div>}
//         </div>

//         {hasStartedConversation && <div className="mx-auto flex px-1 sm:px-10 py-5 flex-col gap-6 -mt-65 sm:-mt-20 mb-13">
//           {messages.map((message) => (
//             <div
//               key={message.id}
//               className={`flex animate-in fade-in slide-in-from-bottom-1 duration-300 ${message.role === "user"
//                   ? "justify-end"
//                   : "justify-start"
//                 }`}
//             >
//               {message.role === "assistant" ? (
//                 <div className="flex max-w-[88%] flex-col items-start">
//                   <div
//                     className="
//             rounded-2xl
//             rounded-bl-md
//             max-w-[330px]
//             bg-white/80
//             dark:bg-white
//             px-3.5
//             py-2.5
//             pb-1
//             flex flex-col
//             shadow-[0_2px_10px_rgba(0,0,0,0.025)]
//             relative
//           "
//                   >
//                     <p className="text-[13px] leading-[1.7] text-zinc-600">
//                       {message.content}
//                     </p>
//                     <span className="text-[9px] text-zinc-300 dark:text-zinc-700 text-right">
//                       {formatTime(message.createdAt)}
//                     </span>
//                   </div>

//                 </div>
//               ) : (
//                 <div className="flex max-w-[82%] flex-col items-end">
//                   <div
//                     className="
//             rounded-2xl
//             rounded-br-md
//             bg-zinc-900 dark:bg-[#099268]
//             px-4
//             py-2.5
//             pb-1
//             text-[13px]
//             leading-5 relative
//             text-white
//             flex flex-col
//           "
//                   >
//                     {message.content}
//                     <p className="text-right text-[9px] text-zinc-300 dark:text-zinc-200">
//                       {formatTime(message.createdAt)}
//                     </p>
//                   </div>

//                 </div>
//               )}
//             </div>
//           ))}

//           {isLoadingResponse && <MessageSkeleton />}
//         </div>
//         }

//         <div ref={bottomRef} />
//       </main>

//       {/* Input */}
//       <footer className="shrink-0 absolute bottom-0 left-0 w-full p-4">
//         <div
//           className="
//             flex
//             items-end
//             gap-2
//             rounded-2xl
//             bg-white dark:bg-[#2E2E2E]
//             px-2
//             py-2
//             cursor-none
//             transition-all
//             duration-200
//             focus-within:border-zinc-300
//             dark:focus-within:border-zinc-600
//             shadow-[0_4px_20px_rgba(0,0,0,0.04)]
//             focus-within:shadow-[0_4px_20px_rgba(30,144,255,0.1)]
//           "
//         >
//           <textarea
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             onKeyDown={(e) => {
//               if (e.key === "Enter" && !e.shiftKey) {
//                 e.preventDefault();
//                 sendMessage();
//               }
//             }}
//             placeholder="Ask anything..."
//             rows={1}
//             className="
//               min-h-[38px]
//               max-h-[120px]
//               flex-1
//               resize-none
//               bg-transparent
//               px-2
//               py-2
//               text-[13px]
//               cursor-none target-text
//               leading-5
//               text-[var(--foreground)]
//               outline-none
//               placeholder:text-zinc-400
//             "
//           />

//           <button
//             type="button"
//             onClick={() => {
//               if (!input.trim()) {
//                 setVoiceScreen(true)
//               } else {
//                 sendMessage()
//               }

//             }}
//             disabled={isLoadingResponse}
//             className={`
//               flex
//               h-9
//               w-9
//               shrink-0
//               items-center
//               justify-center
//               rounded-xl
//               transition-all cursor-none target-hand hover:scale-120
//               duration-200
//               ${input.trim() && !isLoadingResponse
//                 ? "bg-zinc-900 text-white hover:scale-[1.03] active:scale-95"
//                 : "bg-[dodgerblue]"
//               }
//             `}
//             aria-label="Send message"
//           >
//             {input.trim() ? <ArrowUp size={16} strokeWidth={2.2} /> : <Mic size={16} strokeWidth={2.2} className="stroke-white" />}

//           </button>
//         </div>
//       </footer>
//       {voiceScreen && <VoiceDialogCard setText={setInput} setOpen={setVoiceScreen} />}
//     </motion.div>
//   );
// }

// /* ─────────────────────────────────────────────
//    Skeletons
// ───────────────────────────────────────────── */

// function WelcomeSkeleton() {
//   return (
//     <div className="mb-7">
//       <div className="w-[300px] space-y-2">
//         <div className="h-2.5 w-[90%] animate-pulse rounded-full bg-zinc-200/70" />
//         <div className="h-2.5 w-[68%] animate-pulse rounded-full bg-zinc-200/70" />
//       </div>
//     </div>
//   );
// }

// function MessageSkeleton() {
//   return (
//     <div className="flex justify-start">
//       <div className="w-[220px] space-y-2 py-1">
//         <div className="h-2.5 w-full animate-pulse rounded-full bg-zinc-200/70" />
//         <div className="h-2.5 w-[78%] animate-pulse rounded-full bg-zinc-200/70" />
//         <div className="h-2.5 w-[52%] animate-pulse rounded-full bg-zinc-200/70" />
//       </div>
//     </div>
//   );
// }

// /* ─────────────────────────────────────────────
//    Bot
// ───────────────────────────────────────────── */


// function BotSvg() {
//   return (
//     <svg viewBox="0 0 150 185" className="h-[150px] sm:h-[50px] w-auto overflow-visible">

//       <g className="bot-arm-left">
//         <circle cx="22" cy="104" r="10" className="fill-[var(--background)] stroke-[var(--foreground)]" strokeWidth="3"></circle>
//         <rect x="13" y="104" width="18" height="32" rx="9" className="fill-[var(--background)] stroke-[var(--foreground)]" strokeWidth="3" transform="rotate(20 22 104)"></rect>
//         <circle cx="16" cy="137" r="8" className="fill-[var(--background)] stroke-[var(--foreground)]" strokeWidth="3"></circle>
//       </g>
//       <g className="bot-arm-right">
//         <circle cx="128" cy="104" r="10" className="fill-[var(--background)] stroke-[var(--foreground)]" strokeWidth="3"></circle>
//         <rect x="119" y="104" width="18" height="32" rx="9" className="fill-[var(--background)] stroke-[var(--foreground)]" strokeWidth="3" transform="rotate(-20 128 104)"></rect>
//         <circle cx="134" cy="137" r="8" className="fill-[var(--background)] stroke-[var(--foreground)]" strokeWidth="3"></circle>
//       </g>
//       <path d="M38 91 C34 91 31 95 31 100 L31 139 C31 147 37 152 45 152 L105 152 C113 152 119 147 119 139 L119 100 C119 95 116 91 112 91 Z" className="fill-[var(--background)] stroke-[var(--foreground)]" strokeWidth="3"></path>
//       <rect x="47" y="112" width="56" height="25" rx="10" className="fill-[var(--background)] stroke-[var(--foreground)]" strokeWidth="2.5"></rect>
//       <circle cx="60" cy="124" r="4" className="fill-[var(--foreground)]"></circle>
//       <circle cx="75" cy="124" r="4" className="fill-[var(--foreground)]"></circle>
//       <circle cx="90" cy="124" r="4" className="fill-[var(--foreground)]"></circle>
//       <rect x="54" y="83" width="42" height="18" rx="8" className="fill-[var(--background)] stroke-[var(--foreground)]" strokeWidth="3"></rect>
//       <g className="bot-head">
//         <line x1="75" y1="17" x2="75" y2="6" className="stroke-[var(--foreground)]" strokeWidth="3" strokeLinecap="round"></line>
//         <circle cx="75" cy="5" r="4" className="fill-[var(--background)] stroke-[var(--foreground)]" strokeWidth="2.5"></circle>
//         <rect x="19" y="48" width="9" height="20" rx="4" className="fill-[var(--background)] stroke-[var(--foreground)]" strokeWidth="2.5"></rect>
//         <rect x="122" y="48" width="9" height="20" rx="4" className="fill-[var(--background)] stroke-[var(--foreground)]" strokeWidth="2.5"></rect>
//         <rect x="25" y="18" width="100" height="78" rx="27" className="fill-[var(--background)] stroke-[var(--foreground)]" strokeWidth="3"></rect>
//         <circle cx="58" cy="53" r="7" className="fill-[var(--foreground)]"></circle>
//         <circle cx="92" cy="53" r="7" className="fill-[var(--foreground)]"></circle>
//         <path d="M57 76 Q75 88 93 76" fill="none" className="stroke-[var(--foreground)]" strokeWidth="3.5" strokeLinecap="round"></path>
//       </g>
//     </svg>
//   )
// }
