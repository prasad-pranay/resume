import React, { useEffect, useState } from "react";

type RichTextProps = {
  text: string;
  className?: string;
  speed?: number;
  animate?: boolean;
};

type Token =
  | { type: "text"; value: string }
  | { type: "bold"; value: string }
  | { type: "large"; value: string }
  | { type: "link"; label: string; url: string };

function parseInline(text: string): Token[] {
  const tokens: Token[] = [];

  const regex =
    /\*\*([^*]+)\*\*|\*([^*]+)\*|\[([^\]]+)\]\(([^)]+)\)/g;

  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({
        type: "text",
        value: text.slice(lastIndex, match.index),
      });
    }

    // **bold**
    if (match[1] !== undefined) {
      tokens.push({
        type: "bold",
        value: match[1],
      });
    }

    // *large*
    else if (match[2] !== undefined) {
      tokens.push({
        type: "large",
        value: match[2],
      });
    }

    // [label](url)
    else if (match[3] !== undefined && match[4] !== undefined) {
      tokens.push({
        type: "link",
        label: match[3],
        url: match[4],
      });
    }

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    tokens.push({
      type: "text",
      value: text.slice(lastIndex),
    });
  }

  return tokens;
}

/* ---------------------------------- */
/* Hover Link */
/* ---------------------------------- */

function HoverLink({
  label,
  url,
}: {
  label: string;
  url: string;
}) {
  const [showPopup, setShowPopup] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyLink = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      await navigator.clipboard.writeText(url);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch {
      console.error("Failed to copy link");
    }
  };

  return (
    <span
      className="relative inline-block"
      onMouseEnter={() => setShowPopup(true)}
      onMouseLeave={() => {
        setShowPopup(false);
        setCopied(false);
      }}
    >
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="
          text-[dodgerblue]
          font-medium
          underline
          cursor-none target-hand
          underline-offset-2
          decoration-purple-300
          hover:text-blue-700
          hover:decoration-purple-500
          transition-colors
        "
      >
        {label}
      </a>
    
      {showPopup && (
        <div
          className="
            absolute
            left-1/2
            bottom-full
            z-50
            w-[320px]
            -translate-x-1/2
            rounded-xl
            border
            border-[var(--foreground)]
            bg-[var(--background)]
            p-3
            shadow-xl
            animate-in
            fade-in
            zoom-in-95
            duration-150
          "
          onMouseEnter={() => setShowPopup(true)}
          onMouseLeave={() => setShowPopup(false)}
        >
          {/* URL */}
          <div className="mb-3">
            <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-gray-400">
              Link
            </p>

            <p
              className="
                break-all
                text-xs
                leading-relaxed
                text-[var(--foreground)]/60
              "
            >
              {url}
            </p>
          </div>

          {/* Copy button */}
          <div className="w-full flex gap-2 items-center">

          
          <button
            type="button"
            onClick={copyLink}
            className="
              flex
              w-full
              items-center
              justify-center
              gap-2
              rounded-lg
              bg-[var(--foreground)]
              px-3
              py-2
              text-xs
              font-semibold
              text-[var(--background)]
              cursor-none target-hand
              transition
              hover:bg-[#ff5a36]
              hover:text-white
              transition-all duration-300
              active:scale-[0.98]
            "
          >
            {copied ? (
              <>
                <svg
                  className="h-3.5 w-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    d="M20 6L9 17l-5-5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                Copied
              </>
            ) : (
              <>
                <svg
                  className="h-3.5 w-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect
                    x="9"
                    y="9"
                    width="11"
                    height="11"
                    rx="2"
                  />
                  <path
                    d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"
                    strokeLinecap="round"
                  />
                </svg>

                Copy link
              </>
            )}
          </button>
          <button
            type="button"
            onClick={()=>window.open(url,"_blank")}
            className="
              flex
              w-full
              items-center
              justify-center
              gap-2
              rounded-lg
              bg-[var(--foreground)]
              px-3
              py-2
              text-xs
              font-semibold
              text-[var(--background)]
              cursor-none target-hand
              transition
              hover:bg-[#ff5a36]
              hover:text-white
              transition-all duration-300
              active:scale-[0.98]
            "
          >

              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-3">
  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
</svg>


                Open Link
          </button>
          </div>
        </div>
      )}
    </span>
  );
}

/* ---------------------------------- */
/* Inline Renderer */
/* ---------------------------------- */

function renderInline(text: string, keyPrefix = "") {
  const tokens = parseInline(text);

  return tokens.map((token, index) => {
    const key = `${keyPrefix}-${index}`;

    switch (token.type) {
      case "bold":
        return (
          <strong key={key} className="font-bold">
            {token.value}
          </strong>
        );

      case "large":
        return (
          <span
            key={key}
            className="text-[1.08em] font-medium"
          >
            {token.value}
          </span>
        );

      case "link":
        return (
          <HoverLink
            key={key}
            label={token.label}
            url={token.url}
          />
        );

      default:
        return (
          <React.Fragment key={key}>
            {token.value}
          </React.Fragment>
        );
    }
  });
}

/* ---------------------------------- */
/* Rich Text */
/* ---------------------------------- */

export default function RichText({
  text,
  className = "",
  speed = 15,
  animate = true,
}: RichTextProps) {
  const [visibleText, setVisibleText] = useState(
    animate ? "" : text
  );

  useEffect(() => {
    if (!animate) {
      setVisibleText(text);
      return;
    }

    setVisibleText("");

    let index = 0;

    const interval = setInterval(() => {
      index++;

      setVisibleText(text.slice(0, index));

      if (index >= text.length) {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, animate]);

  const normalizedText = visibleText.replace(/\r\n/g, "\n");
  const lines = normalizedText.split("\n");

  return (
    <div className={className}>
      {lines.map((line, index) => {
        const trimmed = line.trim();

        // Empty line
        if (trimmed === "") {
          return (
            <div
              key={index}
              className="h-3"
            />
          );
        }

        // Markdown bullet
        const bulletMatch = line.match(
          /^\s*\*\s+(.*)$/
        );

        if (bulletMatch) {
          return (
            <div
              key={index}
              className="flex items-start gap-2"
            >
              <span className="mt-[0.45em] text-[0.7em]">
                •
              </span>

              <div className="min-w-0">
                {renderInline(
                  bulletMatch[1],
                  `line-${index}`
                )}
              </div>
            </div>
          );
        }

        // Normal line
        return (
          <div key={index}>
            {renderInline(
              line,
              `line-${index}`
            )}
          </div>
        );
      })}
    </div>
  );
}


// import React, { useEffect, useState } from "react";

// type RichTextProps = {
//   text: string;
//   className?: string;

//   // Speed in milliseconds between characters
//   speed?: number;

//   // Start animation or show immediately
//   animate?: boolean;
// };

// type Token =
//   | { type: "text"; value: string }
//   | { type: "bold"; value: string }
//   | { type: "large"; value: string }
//   | { type: "link"; label: string; url: string };

// function parseInline(text: string): Token[] {
//   const tokens: Token[] = [];

//   const regex =
//     /\*\*([^*]+)\*\*|\*([^*]+)\*|\[([^\]]+)\]\(([^)]+)\)/g;

//   let lastIndex = 0;
//   let match: RegExpExecArray | null;

//   while ((match = regex.exec(text)) !== null) {
//     if (match.index > lastIndex) {
//       tokens.push({
//         type: "text",
//         value: text.slice(lastIndex, match.index),
//       });
//     }

//     // **bold**
//     if (match[1] !== undefined) {
//       tokens.push({
//         type: "bold",
//         value: match[1],
//       });
//     }

//     // *large*
//     else if (match[2] !== undefined) {
//       tokens.push({
//         type: "large",
//         value: match[2],
//       });
//     }

//     // [label](url)
//     else if (match[3] !== undefined && match[4] !== undefined) {
//       tokens.push({
//         type: "link",
//         label: match[3],
//         url: match[4],
//       });
//     }

//     lastIndex = match.index + match[0].length;
//   }

//   if (lastIndex < text.length) {
//     tokens.push({
//       type: "text",
//       value: text.slice(lastIndex),
//     });
//   }

//   return tokens;
// }

// function renderInline(text: string, keyPrefix = "") {
//   const tokens = parseInline(text);

//   return tokens.map((token, index) => {
//     const key = `${keyPrefix}-${index}`;

//     switch (token.type) {
//       case "bold":
//         return (
//           <strong key={key} className="font-bold">
//             {token.value}
//           </strong>
//         );

//       case "large":
//         return (
//           <span
//             key={key}
//             className="text-[1.08em] font-medium"
//           >
//             {token.value}
//           </span>
//         );

//       case "link":
//         return (
//           <a
//             key={key}
//             href={token.url}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="
//               text-purple-600
//               font-medium
//               underline
//               underline-offset-2
//               decoration-purple-300
//               hover:text-purple-800
//               hover:decoration-purple-500
//               transition-colors
//             "
//           >
//             {token.label}
//           </a>
//         );

//       default:
//         return (
//           <React.Fragment key={key}>
//             {token.value}
//           </React.Fragment>
//         );
//     }
//   });
// }

// export default function RichText({
//   text,
//   className = "",
//   speed = 15,
//   animate = true,
// }: RichTextProps) {
//   const [visibleText, setVisibleText] = useState(
//     animate ? "" : text
//   );

//   useEffect(() => {
//     if (!animate) {
//       setVisibleText(text);
//       return;
//     }

//     setVisibleText("");

//     let index = 0;

//     const interval = setInterval(() => {
//       index++;

//       setVisibleText(text.slice(0, index));

//       if (index >= text.length) {
//         clearInterval(interval);
//       }
//     }, speed);

//     return () => clearInterval(interval);
//   }, [text, speed, animate]);

//   const normalizedText = visibleText.replace(/\r\n/g, "\n");

//   const lines = normalizedText.split("\n");

//   return (
//     <div className={className}>
//       {lines.map((line, index) => {
//         const trimmed = line.trim();

//         // Empty line
//         if (trimmed === "") {
//           return (
//             <div
//               key={index}
//               className="h-3"
//             />
//           );
//         }

//         // Markdown bullet
//         const bulletMatch = line.match(/^\s*\*\s+(.*)$/);

//         if (bulletMatch) {
//           return (
//             <div
//               key={index}
//               className="flex items-start gap-2"
//             >
//               <span className="mt-[0.45em] text-[0.7em]">
//                 •
//               </span>

//               <div className="min-w-0">
//                 {renderInline(
//                   bulletMatch[1],
//                   `line-${index}`
//                 )}
//               </div>
//             </div>
//           );
//         }

//         // Normal line
//         return (
//           <div key={index}>
//             {renderInline(
//               line,
//               `line-${index}`
//             )}
//           </div>
//         );
//       })}
//     </div>
//   );
// }

