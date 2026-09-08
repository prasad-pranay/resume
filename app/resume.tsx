"use client";
import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { Document, Page, pdfjs } from "react-pdf";

import {
  Download,
  Maximize2,
  Minus,
  X,
} from "lucide-react";

import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc =
  `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;


type ResumeViewerProps = {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl?: string;
};

const ResumeViewer: React.FC<ResumeViewerProps> = ({
  isOpen,
  onClose,
  pdfUrl = "/resume.pdf",
}) => {
  const windowRef = useRef<HTMLDivElement>(null);

  const [isClosing, setIsClosing] = useState(false);

  const [numPages, setNumPages] = useState<number | null>(null);

  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  const [size, setSize] = useState({
    width: 760,
    height: 850,
  });

  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);

  const dragStart = useRef({
    mouseX: 0,
    mouseY: 0,
    x: 0,
    y: 0,
  });

  const resizeStart = useRef({
    mouseX: 0,
    mouseY: 0,
    width: 0,
    height: 0,
  });

  /*
   * Center window whenever it opens
   */
  useEffect(() => {
    if (!isOpen) return;

    setIsClosing(false);

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const width = Math.min(760, windowWidth - 40);
    const height = Math.min(850, windowHeight - 80);

    setSize({
      width,
      height,
    });

    setPosition({
      x: Math.max(20, (windowWidth - width) / 2),
      y: Math.max(40, (windowHeight - height) / 2),
    });
  }, [isOpen]);

  /*
   * Close animation
   */
  const handleClose = useCallback(() => {
    setIsClosing(true);

    setTimeout(() => {
      onClose();
    }, 250);
  }, [onClose]);

  /*
   * Escape key
   */
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleClose]);

  /*
   * Drag start
   */
  const handleDragStart = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    if (event.button !== 0) return;

    setIsDragging(true);

    dragStart.current = {
      mouseX: event.clientX,
      mouseY: event.clientY,
      x: position.x,
      y: position.y,
    };
  };

  /*
   * Resize start
   */
  const handleResizeStart = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    event.preventDefault();
    event.stopPropagation();

    setIsResizing(true);

    resizeStart.current = {
      mouseX: event.clientX,
      mouseY: event.clientY,
      width: size.width,
      height: size.height,
    };
  };

  /*
   * Drag + resize movement
   */
  useEffect(() => {
    if (!isDragging && !isResizing) return;

    const handleMouseMove = (event: MouseEvent) => {
      if (isDragging) {
        const deltaX =
          event.clientX - dragStart.current.mouseX;

        const deltaY =
          event.clientY - dragStart.current.mouseY;

        setPosition({
          x: dragStart.current.x + deltaX,
          y: dragStart.current.y + deltaY,
        });
      }

      if (isResizing) {
        const deltaX =
          event.clientX - resizeStart.current.mouseX;

        const deltaY =
          event.clientY - resizeStart.current.mouseY;

        const minWidth = 420;
        const minHeight = 500;

        const maxWidth = window.innerWidth - position.x;
        const maxHeight = window.innerHeight - position.y;

        setSize({
          width: Math.min(
            Math.max(
              minWidth,
              resizeStart.current.width + deltaX
            ),
            maxWidth
          ),

          height: Math.min(
            Math.max(
              minHeight,
              resizeStart.current.height + deltaY
            ),
            maxHeight
          ),
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      window.removeEventListener(
        "mouseup",
        handleMouseUp
      );
    };
  }, [isDragging, isResizing, position.x, position.y]);

  /*
   * Fullscreen
   */
  const oldsize= {
    width: size.width-45,
    height: screen.height-220,
  };
  const [oldPos,setOldPos] = useState({
    x: 0,
    y: 0,
  })
  const handleFullscreen = () => {
    if (!windowRef.current) return;

    if (position.x==0) {
      setSize({width:oldsize.width,height:oldsize.height})
      setPosition({x:oldPos.x,y:oldPos.y})
    } else {
      setSize({width:screen.width,height:screen.height})

      setOldPos({x:position.x,y:position.y})
      setTimeout(() => {
        setPosition({x:0,y:0})
      }, 100);
    }
  };

  if (!isOpen) return null;

  return (
    <aside
    data-lenis-prevent
      className={`
        fixed
        inset-0
        z-[9999]
        pointer-events-none
        overflow-y-auto
        hide-scrollbar
        overscroll-contain
      `}
    >
      {/* Floating window */}
      <div
        ref={windowRef}
        style={{
          left: position.x,
          top: position.y,
          width: size.width,
          height: size.height,
        }}
        className={`
          absolute
          pointer-events-auto
          overflow-hidden
          rounded-xl
          border
          border-black/10
          dark:border-white/10
          bg-[var(--background)]
          shadow-[0_25px_80px_rgba(0,0,0,0.18)]
          origin-center

          transition-all
          duration-300
          ease-[cubic-bezier(0.22,1,0.36,1)]

          ${
            isClosing
              ? "opacity-0 scale-[0.96] translate-y-3"
              : "opacity-100 scale-100 translate-y-0"
          }

          ${
            isDragging
              ? "cursor-grabbing select-none"
              : ""
          }
        `}
      >
        {/* Header */}
        <div
          onMouseDown={handleDragStart}
          className="
            group
            h-12
            shrink-0
            flex
            items-center
            justify-between
            px-4
            border-b
            border-black/10
            bg-[var(--background)]
            cursor-grab
            select-none
          "
        >
          {/* Left */}
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <button
                onMouseDown={(e) => e.stopPropagation()}
                onClick={handleClose}
                aria-label="Close resume"
                className="
                  w-3
                  h-3
                  rounded-full
                  bg-[#FE5F59]
                  transition-all
                  duration-200
                  hover:bg-black
                  hover:scale-110
                "
              />

              <span className="w-3 h-3 rounded-full bg-[#FFBC2F]" />
              <span className="w-3 h-3 rounded-full bg-[#28C840]" />
            </div>

            <span className="ml-2 text-xs font-medium text-gray-500">
              Resume.pdf
            </span>
          </div>

          {/* Actions */}
          <div
            onMouseDown={(e) => e.stopPropagation()}
            className="flex items-center gap-1"
          >
            <a
              href={pdfUrl}
              download
              aria-label="Download resume"
              className="
                p-1.5
                rounded-md
                text-gray-400
                transition-all
                duration-200
                hover:text-black 
                cursor-none target-hand
                hover:bg-gray-100
              "
            >
              <Download className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={handleFullscreen}
              aria-label="Fullscreen"
              className="
                p-1.5
                rounded-md
                text-gray-400
                transition-all
                cursor-none target-hand
                duration-200
                hover:text-black
                hover:bg-gray-100
              "
            >
              {position.x==0 ? <Minus className="w-3.5 h-3.5" />:<Maximize2 className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={handleClose}
              aria-label="Close"
              className="
                p-1.5
                rounded-md
                text-gray-400
                transition-all
                duration-200
                hover:text-black
                cursor-none target-hand
                hover:bg-gray-100
              "
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* PDF area */}
        <div
          className="
            relative
            h-[calc(100%-3rem)]
            overflow-auto
            bg-[var(--background)]/30
            hide-scrollbar
            px-5
            py-6
          "
        >
          <Document
            file={pdfUrl}
            onLoadSuccess={({ numPages }) => {
              setNumPages(numPages);
            }}
            loading={
              <div
                className="
                  flex
                  h-full
                  items-center
                  justify-center
                  text-xs
                  text-gray-400
                "
              >
                Loading resume...
              </div>
            }
            error={
              <div
                className="
                  flex
                  h-full
                  items-center
                  justify-center
                  text-xs
                  text-gray-400
                "
              >
                Unable to load resume.
              </div>
            }
          >
            {Array.from(
              new Array(numPages || 0),
              (_, index) => (
                <div
                  key={`page_${index + 1}`}
                  className="
                    flex
                    justify-center
                    mb-6
                    last:mb-0
                  "
                >
                  <Page
                    pageNumber={index + 1}
                    width={Math.min(
                      size.width - 40,
                      700
                    )}
                    renderTextLayer
                    renderAnnotationLayer
                    className="
                      overflow-hidden
                      rounded-sm
                      shadow-[0_8px_30px_rgba(0,0,0,0.10)]
                    "
                  />
                </div>
              )
            )}
          </Document>

          {/* Resize handle */}
          <div
            onMouseDown={handleResizeStart}
            className="
              absolute
              right-0
              bottom-0
              w-6
              h-6
              cursor-nwse-resize
              group
            "
          >
            <div
              className="
                absolute
                right-2
                bottom-2
                w-2
                h-2
                border-r
                border-b
                border-gray-400
                transition-all
                duration-200
                group-hover:border-black
              "
            />
          </div>
        </div>
      </div>
    </aside>
  );
};

export default ResumeViewer;