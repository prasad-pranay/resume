"use client";
import Cursor from "@/components/Cursor";
import { useEffect, useMemo, useRef, useState } from "react";
import AnswerHeader from "./header";
import SmoothScroll from "@/components/SmoothScroll";

type Answer = {
  timestamp: number;
  question: string;
  interpretation: string;
  answer: string;
};

// const API_URL = "http://localhost:5000/api/answers";
const API_URL = "https://clasher.pythonanywhere.com/api/answers";

export default function AnswersPage() {
  const [messages, setMessages] = useState<Answer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchAnswers();
  }, []);

  async function fetchAnswers() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to fetch answers");
      }

      const data: Answer[] = await response.json();

      // Oldest → newest, like a real chat
      setMessages(
        [...data].sort(
          (a, b) => a.timestamp - b.timestamp
        )
      );
    } catch (error) {
      console.error(error);
      setError("Unable to load conversations.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!loading) {
      bottomRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [loading]);

  function getDate(timestamp: number) {
    return new Date(timestamp * 1000);
  }

  function getDateKey(timestamp: number) {
    const date = getDate(timestamp);

    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
  }

  function formatDate(timestamp: number) {
    const date = getDate(timestamp);

    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  function formatTime(timestamp: number) {
    const date = getDate(timestamp);

    return date.toLocaleTimeString("en-IN", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  }

  const groupedMessages = useMemo(() => {
    const groups: {
      date: string;
      messages: Answer[];
    }[] = [];

    let currentDate = "";

    messages.forEach((message) => {
      const dateKey = getDateKey(message.timestamp);

      if (dateKey !== currentDate) {
        currentDate = dateKey;

        groups.push({
          date: formatDate(message.timestamp),
          messages: [],
        });
      }

      groups[groups.length - 1].messages.push(message);
    });

    return groups;
  }, [messages]);

  return (
    <section className="flex h-screen flex-col relative">
        <Cursor/>
      {/* Header */}
      <AnswerHeader fetchAnswers={fetchAnswers} loading={loading} />
      {/* Chat area */}
      <main
        className="
          flex-1
          overflow-y-auto
          px-3 py-6
          sm:px-5
          minimal-scrollbar
        "
      >

        <div className="mx-auto max-w-4xl">

          {/* Loading */}
          {loading && (
            <div className="flex h-full items-center justify-center py-32">
              <div
                className="
                  h-5 w-5
                  animate-spin
                  rounded-full
                  border-2
                  border-zinc-200
                  border-t-zinc-700
                "
              />
            </div>
          )}


          {/* Error */}
          {!loading && error && (
            <div className="flex flex-col items-center py-32">

              <p className="text-sm text-zinc-500">
                {error}
              </p>

              <button
                onClick={fetchAnswers}
                className="
                  mt-3
                  text-xs font-medium
                  text-zinc-900
                  underline
                  underline-offset-4
                "
              >
                Try again
              </button>

            </div>
          )}


          {/* Empty */}
          {!loading &&
            !error &&
            messages.length === 0 && (
              <div className="py-32 text-center">

                <p className="text-sm text-zinc-400">
                  No conversations yet.
                </p>

              </div>
            )}


          {/* Messages */}
          {!loading &&
            !error &&
            groupedMessages.map((group) => (
              <div
                key={group.date}
                className="mb-8"
              >

                {/* Date separator */}
                <div className="my-6 flex items-center justify-center">

                  <div
                    className="
                      rounded-full
                      border border-zinc-200
                      bg-white
                      px-3 py-1
                      text-[10px]
                      font-medium
                      tracking-wide
                      text-zinc-500
                      shadow-sm
                    "
                  >
                    {group.date}
                  </div>

                </div>


                {/* Conversations */}
                <div className="space-y-3">

                  {group.messages.map(
                    (message, index) => (
                      <div
                        key={`${message.timestamp}-${index}`}
                        className="space-y-2"
                      >

                          {/* ========================= */}
                        {/* USER MESSAGE */}
                        {/* ========================= */}

                        <div className="flex justify-end">

                          <div
                            className="
                              max-w-[85%]
                              sm:max-w-[70%]
                              rounded-2xl
                              rounded-tr-sm
                              bg-zinc-900
                              px-4 py-3
                              text-white
                              shadow-sm
                            "
                          >

                            <p
                              className="
                                whitespace-pre-wrap
                                text-sm
                                leading-6
                              "
                            >
                              {message.question}
                            </p>


                            {/* Time */}
                            <div className="mt-1.5 flex justify-end">

                              <span
                                className="
                                  text-[10px]
                                  text-zinc-400
                                "
                              >
                                {formatTime(
                                  message.timestamp
                                )}
                              </span>

                            </div>

                          </div>

                        </div>

                        {/* ========================= */}
                        {/* ASSISTANT MESSAGE */}
                        {/* ========================= */}

                        <div className="flex justify-start">

                          <div
                            className="
                              max-w-[85%]
                              sm:max-w-[70%]
                              rounded-2xl
                              rounded-tl-sm
                              bg-white
                              px-4 py-3
                              shadow-sm
                              ring-1 ring-zinc-100
                            "
                          >

                            {/* Interpretation */}
                            <p
                              className="
                                mb-2
                                text-[10px]
                                font-medium
                                leading-4
                                text-zinc-400
                              "
                            >
                              {message.interpretation}
                            </p>


                            {/* Answer */}
                            <p
                              className="
                                whitespace-pre-wrap
                                text-sm
                                leading-6
                                text-zinc-800
                              "
                            >
                              {message.answer}
                            </p>


                            {/* Time */}
                            <div className="mt-2 flex justify-end">

                              <span
                                className="
                                  text-[10px]
                                  text-zinc-400
                                "
                              >
                                {formatTime(
                                  message.timestamp
                                )}
                              </span>

                            </div>

                          </div>

                        </div>


                      

                      </div>
                    )
                  )}

                </div>

              </div>
            ))}

          <div ref={bottomRef} />

        </div>

      </main>

    </section>
  );
}

