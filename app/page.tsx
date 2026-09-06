"use client";
import Header from "./header";
import Hero from "./hero";
import WatcherBot from "./bot";
import ProjectShowcase from "./work";
import Contact from "./contact";
import Footer from "./footer";
import Education from "./education";
import About from "./about";
import Skills from "./skills";
import dynamic from "next/dynamic";
const ResumeViewer = dynamic(() => import("./resume"), {
  ssr: false,
});
import Cursor from "@/components/Cursor";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import ChatBotScreen from "./chatbotscreen";
// import Rought from "./rough"

export default function Home() {

  const [resumeOpen, setResumeOpen] = useState(false);
const [chatScreen,setChatScreen] = useState(false)
  return (
    <main className="flex min-h-screen flex-col items-center overflow-x-clip select-none">
      <Header setChatScreen={setChatScreen}  />
      <Hero setResumeOpen={setResumeOpen} />
      <ProjectShowcase />
      <About/>
      <Education/>
      <Skills/>
      <Contact/>
      <Footer/>
      {/* fixed items */}
      <WatcherBot chatScreen={chatScreen} setChatScreen={setChatScreen} />
      <ResumeViewer isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
        pdfUrl="/resume.pdf"/>
      <Cursor/> 
      <AnimatePresence>
        {chatScreen && <ChatBotScreen setChatScreen={setChatScreen}  />}
      </AnimatePresence>
      {/* <Rought/> */}
    </main>
  );
}
