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
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import ChatBotScreen from "./chatbotscreen";
import BotNotification, { Notification1 } from "./notification";
import WelcomeScreen from "./welcome";
import SmoothScroll from "@/components/SmoothScroll";
import CustomScrollbar from "@/components/Scrollbar";
// import Rought from "./rough"
// type Notification1 = {
//   id: string;
//   message: string;
// };
export default function Home() {

  const [resumeOpen, setResumeOpen] = useState(false);
const [chatScreen,setChatScreen] = useState(false)
const [notification,setNotification] = useState<Notification1[]>([]);
const [welcome,setWelcome] = useState<Boolean>(true)
useEffect(() => {
  setTimeout(() => {
    setWelcome(false)
  }, 2700);
}, [])

  return (
    <main className="flex min-h-screen flex-col items-center overflow-x-clip select-none
    mx-5 sm:mx-10 md:mx-15 lg:mx-20 xl:mx-25 2xl:mx-30
    ">
      <WelcomeScreen/>

      {!welcome && <>
      <Header setChatScreen={setChatScreen}  />
      <Hero setResumeOpen={setResumeOpen} />
      <ProjectShowcase />
      <About/>
      <Education/> 
      <Skills/>
      <Contact setNotification={setNotification} />
      <Footer/>
      {/* fixed items */} 
      <WatcherBot chatScreen={chatScreen} setChatScreen={setChatScreen} />

       <BotNotification notifications={notification} setNotifications={setNotification} />

      <ResumeViewer isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
        pdfUrl="/resume.pdf"/>
      <Cursor/> 
      <AnimatePresence>
        {chatScreen && <ChatBotScreen setChatScreen={setChatScreen}  />}
      </AnimatePresence>
      <SmoothScroll />
      <CustomScrollbar />
      </>}
    </main>
  );
}
