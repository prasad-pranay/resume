"use client";
import HoverWord from '@/components/hoverword'
import { AnimatePresence, motion } from 'framer-motion';
import React, { useRef, useState } from 'react'
import emailjs from "emailjs-com";

interface ContactProps {
  setNotification: React.Dispatch<React.SetStateAction<any>>;
}
const Contact = ({setNotification}:ContactProps) => {
  const [msgScreen, setMsgScreen] = useState(false)
  const [isCopied,setIsCopied] =  useState(false)
  const copyText = async (text: string) => {
  await navigator.clipboard.writeText(text);
};
function sendNotification(text:string){
  setNotification((prev:any) => [
  ...prev,
  {
    id: crypto.randomUUID(),
    message: text,
  },
]);
}

  return (
    <section id='contact' className="flex flex-col xl:flex-row py-20 justify-between lg:gap-0 gap-10 mt-40 sm:mt-0">
      <p className="
      text-7xl
          sm:text-8xl
          leading-[0.85]
          tracking-[-0.065em]
          bricolage-grotesque
          text-[var(--foreground)] 
          text-center
          xl:text-left 
          ">
        <HoverWord text="Let's build" />
        <HoverWord text="something" />
        <span className="text-[#ff5a36]"><HoverWord text="that ships." /></span>
      </p>

      <div className="flex flex-col justify-between relative md:mt-10 xl:mt-0 xl:gap-0 gap-10">
        <div className="flex justify-evenly xl:justify-between">
          <motion.svg onClick={()=>window.open("https://www.instagram.com/pranayy.c3/","_blank")} initial={{y:20,opacity:0}} whileInView={{y:0,opacity:1}} viewport={{once:false}} transition={{delay:1,duration:1}} viewBox="0 0 15.2 15.2" fill="none" xmlns="http://www.w3.org/2000/svg" className="active:scale-80 size-15 target-hand transition-all duration-150 hover:scale-120">
            <g transform="translate(-4.9, -4.4)">
              <path clipRule="evenodd" d="M15.5 5h-6a4 4 0 0 0-4 4v6a4 4 0 0 0 4 4h6a4 4 0 0 0 4-4V9a4 4 0 0 0-4-4" className='stroke-[var(--foreground)]' strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
              <path clipRule="evenodd" d="M12.5 15a3 3 0 1 1 0-6 3 3 0 0 1 0 6" className='stroke-[var(--foreground)]' strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
              <rect x="16" y="8.5" width="1" height="1" rx="1" transform="rotate(-90 16 8.5)" className='stroke-[var(--foreground)]' strokeLinecap="round" />
            </g>
          </motion.svg>
          <motion.svg onClick={()=>window.open("https://github.com/prasad-pranay","_blank")}  initial={{y:20,opacity:0}} whileInView={{y:0,opacity:1}} viewport={{once:false}} transition={{delay:1,duration:1}} viewBox="0 0 20.6 22.4" fill="none" xmlns="http://www.w3.org/2000/svg" className="active:scale-80 size-15 target-hand transition-all duration-150 hover:scale-120">
            <g transform="translate(-1.3, -.8)">
              <path d="M4.074 2.994c.059-1.03.305-1.478 1.01-1.838.76-.387 1.957-.207 3.366.507.607.307.669.313 1.733.177 1.413-.181 3.233-.18 4.538.002.987.138 1.052.13 1.66-.177 2-1.013 3.58-.947 4.151.174.286.56.339 2.01.117 3.208-.122.664-.11.747.186 1.182 2.08 3.065.581 8.033-2.982 9.887a6 6 0 0 1-.69.3c-.575.22-.75.287-.538 1.298.102.486.224 1.695.272 2.686.087 1.792.086 1.805-.228 2.17-.428.498-1.045.506-1.462.02-.273-.317-.3-.466-.3-1.689 0-1.806-.197-3.006-.665-4.035-.557-1.224-.144-1.681 1.128-1.955 1.768-.38 3.15-1.471 3.92-3.096.731-1.545.841-3.68-.482-4.978-.376-.447-.402-.853-.134-2.074.1-.456.185-1.045.188-1.309.003-.416-.035-.479-.29-.479-.162 0-.78.236-1.373.523l-.947.459a.5.5 0 0 1-.277.047 30.3 30.3 0 0 0-7.114 0 .5.5 0 0 1-.279-.046l-.946-.46c-.593-.287-1.211-.523-1.373-.523-.374 0-.38.276-.039 1.916.209 1.001.349 1.224-.253 2.025-.902 1.2-1.127 2.69-.643 4.256.609 1.973 2.101 3.305 4.2 3.75 1.265.268 1.595.618 1.112 2.069-.38 1.14-.62 1.435-1.173 1.435-.743 0-1.209-.644-.953-1.318.113-.297.08-.329-.617-.582-2.126-.776-3.752-2.513-4.495-4.804-.575-1.77-.322-4.075.6-5.467.314-.475.318-.515.172-1.423a10.3 10.3 0 0 1-.1-1.838m-.742 12.951a1 1 0 0 0-1.664 1.11c.226.34.497.618.726.848l.124.123c.193.19.363.36.533.56.378.443.754 1.04.968 2.11.096.477.438.734.628.846.206.121.431.193.616.24.379.095.839.145 1.275.174.479.032.998.042 1.462.045a1 1 0 0 0 2 0v-1a1 1 0 0 0-1-1h-.304c-.587.002-1.352.004-2.026-.04a7 7 0 0 1-.788-.09c-.301-1.184-.788-1.972-1.308-2.582-.23-.27-.468-.506-.662-.698l-.103-.103c-.224-.223-.37-.382-.477-.543"
                strokeWidth="0.6" className="stroke-[var(--background)] fill-[var(--foreground)]"
              />
            </g>
          </motion.svg>
          <motion.svg onClick={()=>window.open("https://www.linkedin.com/in/pranay-prasad-/","_blank")}  initial={{y:20,opacity:0}} whileInView={{y:0,opacity:1}} viewport={{once:false}} transition={{delay:1,duration:1}} viewBox="0 0 20.5 20.5" fill="none" xmlns="http://www.w3.org/2000/svg" className="active:scale-80 size-15 target-hand transition-all duration-150 hover:scale-120">
            <g transform="translate(-1.7, -1.7)">
              <path fillRule="evenodd" clipRule="evenodd" strokeWidth="0.6" className="stroke-[var(--background)] fill-[var(--foreground)]" d="M6 2a4 4 0 0 0-4 4v12a4 4 0 0 0 4 4h12a4 4 0 0 0 4-4V6a4 4 0 0 0-4-4zM4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm5 5a1 1 0 1 0-2 0v6a1 1 0 1 0 2 0zm.5-3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0M12 10c.34 0 .64.17.82.428A3.5 3.5 0 0 1 14.5 10c2.16 0 3.5 1.926 3.5 3.571V17a1 1 0 1 1-2 0v-3.43c0-.768-.66-1.571-1.5-1.571-.524 0-1.103.285-1.5.963V17a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1" fill="#000" />
            </g>
          </motion.svg>
        </div>
        <div className="flex w-full items-center">
          <div className="w-full h-[1px] bg-[var(--foreground)]" />
          <motion.p 
          onClick={() => setMsgScreen(true)} 
          initial={{scale:0,opacity:0}} whileInView={{scale:1,opacity:1}} viewport={{once:false}} transition={{duration:1,ease:"easeInOut"}} 
          className="bricolage-grotesque text-xl mx-5 text-[#ff5a36] whitespace-nowrap border2 rounded px-5 py-2 transition-all duration-300 hover:bg-[#ff5a36] hover:text-[var(--background)] target-hand">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z" />
</svg>

            </motion.p>
          <div className="w-full h-[1px] bg-[var(--foreground)]" />
        </div>
        {/* my gamil */}
      
<div
onMouseOut={()=>{
    setIsCopied(false)
}}
  onClick={()=>{
    setIsCopied(true);
    copyText("prasadpranay2005@gmail.com")
  }}
  className="
    group relative inline-flex self-center items-center gap-4
    cursor-none target-hand
    rounded-xl
    px-4 py-3
    -mx-4
    transition-all duration-300
    ease-[cubic-bezier(0.22,1,0.36,1)]
    hover:bg-black/[0.035]
    active:scale-[0.98]
  "
>
  {/* Email */}
  <p
    className="
      bricolage-grotesque
      text-2xl sm:text-3xl
      tracking-[-0.02em]
      text-[var(--foreground)]
      transition-transform duration-300
      ease-[cubic-bezier(0.22,1,0.36,1)]
      group-hover:translate-x-0.5
    "
  >
    prasadpranay2005@gmail.com
  </p>

  {/* Copy button */}
  <div
    className="
      relative flex size-9 shrink-0
      items-center justify-center
      rounded-full
      border 
      border-black/10
      dark:border-white/10

      bg-white
      dark:bg-[var(--background)]
      shadow-sm
      transition-all duration-300
      ease-[cubic-bezier(0.22,1,0.36,1)]
      group-hover:scale-105
      group-hover:-rotate-3
      group-hover:shadow-md
    "
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="
        size-5
        transition-transform duration-300
        group-hover:scale-110
      "
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.5 8.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v8.25A2.25 2.25 0 0 0 6 16.5h2.25m8.25-8.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-7.5A2.25 2.25 0 0 1 8.25 18v-1.5m8.25-8.25h-6a2.25 2.25 0 0 0-2.25 2.25v6"
      />
    </svg>
  </div>

  {/* Tooltip */}
  {!isCopied && <span
    className="
      pointer-events-none
      absolute left-1/2 top-0
      -translate-x-1/2 -translate-y-[calc(100%+10px)]
      whitespace-nowrap
      rounded-full
      bg-[var(--foreground)]
      px-3 py-1.5
      text-[11px] font-medium
      tracking-wide
      text-[var(--background)]
      opacity-0 scale-90
      transition-all duration-200
      ease-out
      group-hover:opacity-100
      group-hover:scale-100
    "
  >
    Tap to copy
  </span>}
  {isCopied && <span
    className="
      pointer-events-none
      absolute left-1/2 top-0
      -translate-x-1/2 -translate-y-[calc(100%+10px)]
      whitespace-nowrap
      rounded-full
      bg-teal-500
      px-3 py-1.5
      text-[11px] font-medium
      tracking-wide
      text-[var(--background)]
      opacity-0 scale-90
      transition-all duration-200
      ease-out
      group-hover:opacity-100
      group-hover:scale-100
    "
  >
    Copied
  </span>}
</div>



        {/* if sending messages */}
        <AnimatePresence>

          {msgScreen && 
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className='absolute top-0 left-0 w-full h-full bg-[var(--background)] '>

            <MinimalForm
              onClose={() => setMsgScreen(false)}
              onSubmit={(value) => {
                console.log(value);
              }}
              sendNotification={sendNotification}
            />
          </motion.div>}
        </AnimatePresence>
      </div>
    </section>
  )
}

export default Contact








import { X, ArrowUp } from "lucide-react";

interface MinimalFormProps {
  onClose?: () => void;
  onSubmit?: (value: string) => void;
  sendNotification:(text:string)=> void;
}

function MinimalForm({
  onClose,
  onSubmit,
  sendNotification,
}: MinimalFormProps) {

  const form_element = useRef<HTMLFormElement>(null)

const handleSubmit = (e:any) => {
    e.preventDefault();
            emailjs.sendForm("service_47zjwto", "template_q8qk90n", form_element.current!, "4t_xVcQnm2u6_Gvxo").then(
        (result) => {
          console.log(result.text);
          sendNotification("Sent Your Message Succeessfully!")
        },
        (error) => {
          sendNotification("Unable to Send your message check console for details!")
          console.log(error.text);
        }
      );

      setTimeout(() => {
       if (form_element.current != null) {
          form_element.current.reset();
          setTxtarea("")
      }
      }, 1000);

  };

  const [txtarea,setTxtarea] = useState("")
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if(e.target.value.length<=400){
      setTxtarea(e.target.value);
    }
};
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 12, scale: 0.98 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="relative w-full h-full"
    >
      <form
      ref={form_element}
        onSubmit={handleSubmit}
        className="
          relative overflow-hidden
          rounded-2xl
          border border-black/[0.08]
          bg-white
          h-full
          shadow-[0_20px_60px_-25px_rgba(0,0,0,0.18)]
        "
      >
        {/* <input type="text" value="Unknown" name="contact-name-input" className='hidden' />
        <input type="email" value="Unknown" name="contact-name-email" className='hidden' /> */}
        {/* Close */}
        <motion.button
          type="button"
          onClick={onClose}
          whileHover={{ rotate: 90, scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          className="
            absolute right-3 top-3 z-10
            flex size-8 items-center justify-center
            rounded-full
            text-gray-400
            transition-colors
            hover:bg-gray-100
            hover:text-gray-900
            cursor-none 
            target-hand
          "
          aria-label="Close"
        >
          <X size={17} strokeWidth={1.7} />
        </motion.button>

        {/* Textarea */}
        <textarea
          autoFocus
          value={txtarea}
          onChange={handleChange}
          name="contact-name-msg"
          rows={5}
          placeholder="Say hello, or share an idea..."
          className="
            block w-full resize-none
            bg-transparent
            p-15 pb-20 pt-15
            text-[15px] leading-6
            text-gray-900
            placeholder:text-gray-400
            cursor-none target-text
            outline-none
          "
        />

        {/* Bottom action */}
        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
          <p className='text-[var(--foreground)] text-xs opacity-50 font-light ml-10'>{txtarea.length}/400</p>
          <motion.button
            type="submit"
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.96 }}
            className="
              group
              flex items-center gap-2
              rounded-full
              bg-gray-900
              px-4 py-2
              text-sm font-medium
              text-white
              transition-all
              hover:bg-black
              cursor-none target-hand
            "
          >
            Submit

            <ArrowUp
              size={15}
              strokeWidth={1.8}
              className="transition-transform duration-200 group-hover:-translate-y-0.5"
            />
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
}