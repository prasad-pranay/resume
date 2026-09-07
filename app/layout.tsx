import type { Metadata, Viewport } from "next";

import {
  Bricolage_Grotesque,
  Encode_Sans_Expanded,
  Inter,
} from "next/font/google";

import "./globals.css";

import SmoothScroll from "@/components/SmoothScroll";
import CustomScrollbar from "@/components/Scrollbar";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
  weight: "700",
});

const encodeSans = Encode_Sans_Expanded({
  variable: "--font-encode",
  subsets: ["latin"],
  display: "swap",
  weight: "600",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://resume-pranay.vercel.app";
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Pranay Prasad — Full Stack Developer",
    template: "%s | Pranay Prasad",
  },

  description:
    "Portfolio of Pranay Prasad — a Full Stack Developer building modern, interactive, and intelligent web experiences with Next.js, React, TypeScript, and AI.",

  applicationName: "Pranay Prasad",

  authors: [
    {
      name: "Pranay Prasad",
      url: siteUrl,
    },
  ],

  creator: "Pranay Prasad",
  publisher: "Pranay Prasad",

  keywords: [
    "Pranay Prasad",
    "Full Stack Developer",
    "Software Developer",
    "Web Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript Developer",
    "Frontend Developer",
    "AI Developer",
    "RAG Developer",
    "Generative AI",
  ],

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "Pranay Prasad",

    title: "Pranay Prasad — Full Stack Developer",

    description:
      "Explore the portfolio, projects, experiments, and work of Pranay Prasad.",

    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Pranay Prasad — Full Stack Developer",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "Pranay Prasad — Full Stack Developer",

    description:
      "Portfolio, projects, experiments, and work by Pranay Prasad.",

    images: ["/og-image.png"],

    creator: "@Pranay4862",
  },

  icons: {
    icon: [
      {
        url: "/favicon.ico",
      },
      {
        url: "/icon.png",
        type: "image/png",
      },
    ],

    apple: "/apple-icon.png",
  },

  manifest: "/manifest.webmanifest",

  category: "technology",

  verification: {
    google: "YOUR_GOOGLE_VERIFICATION_CODE",
  },

  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = { 
  width: "device-width", 
  initialScale: 1, 
  viewportFit: "cover", 
  themeColor: [ 
    { media: "(prefers-color-scheme: light)", color: "#f8f4ec", }, 
    { media: "(prefers-color-scheme: dark)", color: "#111", }, 
  ], };

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",

  name: "Pranay Prasad",

  url: siteUrl,

  jobTitle: "Full Stack Developer",

  description:
    "Full Stack Developer building modern, interactive web applications and AI-powered experiences.",

  image: `${siteUrl}/profile.png`,

  sameAs: [
    "https://github.com/prasad-pranay",
    "https://www.linkedin.com/in/pranay-prasad-/",
    "https://www.instagram.com/pranayy.c3/",
  ],

  knowsAbout: [
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Python",
    "Artificial Intelligence",
    "Retrieval-Augmented Generation",
    "Generative AI",
    "Web Development",
    "Frontend Development",
    "Full Stack Development",
  ],
};

  return (
    <html
      lang="en"
      className={`
        h-full
        antialiased
        ${bricolage.variable}
        ${encodeSans.variable}
        ${inter.variable}
      `}
    >
      <head> 
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData), }} /> 
      </head>
      <body className="flex min-h-full flex-col">
        <SmoothScroll />
        <CustomScrollbar />
        {children}
      </body>
    </html>
  );
}
