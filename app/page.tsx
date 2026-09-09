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
import { useEffect, useState } from "react";
import WelcomeScreen from "./welcome";
import dynamic from "next/dynamic";
const ResumeViewer = dynamic(() => import("./resume"), {
  ssr: false,
});
import Cursor from "@/components/Cursor";
import { AnimatePresence } from "framer-motion";
import ChatBotScreen from "./chatbotscreen";
import BotNotification, { Notification1 } from "./notification";
import SmoothScroll from "@/components/SmoothScroll";
import CustomScrollbar from "@/components/Scrollbar";
import PageContextMenu from "@/components/ContextMenu";


export default function Home() {

  const [resumeOpen, setResumeOpen] = useState(false);
const [chatScreen,setChatScreen] = useState(false)
const [notification,setNotification] = useState<Notification1[]>([]);
const [welcome,setWelcome] = useState<Boolean>(false)
const [pendingQuestion, setPendingQuestion] = useState("");
const askRica = (question: string) => {
  setPendingQuestion(question);
  setChatScreen(true);
};
useEffect(() => {
  setTimeout(() => {
    setWelcome(false)
  }, 2700);
}, [])

  return (
    <main className="flex min-h-screen flex-col items-center select-none
    px-5 sm:px-10 md:px-15 lg:px-20 xl:px-25 2xl:px-30
    ">
      <WelcomeScreen/>

      {!welcome && <>
      <Header setResumeOpen={setResumeOpen}  />
      <Hero setResumeOpen={setResumeOpen} />
      <ProjectShowcase onAskRica={askRica}   />
      <About/>
      <Education/> 
      <Skills/>
      <Contact setNotification={setNotification} />
      <Footer/>
      {/* fixed items */} 
      <WatcherBot chatScreen={chatScreen} setChatScreen={setChatScreen} />

       <BotNotification notifications={notification} setNotifications={setNotification} />
          <PageContextMenu  setResumeOpen={setResumeOpen} />
      <ResumeViewer isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
        pdfUrl="/resume.pdf"/>
      <Cursor/> 
      <AnimatePresence>
        {chatScreen && <ChatBotScreen setChatScreen={setChatScreen}
    initialQuestion={pendingQuestion} setPendingQuestion={setPendingQuestion}   />}
      </AnimatePresence>
      <SmoothScroll />
      <CustomScrollbar />
      </>}
    </main>
  );
}
