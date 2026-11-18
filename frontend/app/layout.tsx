import type { Metadata, Viewport } from "next";
import { Yatra_One, Noto_Sans, Noto_Sans_Devanagari } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import ChatWidget from "@/components/ChatWidget";
import Footer from "@/components/Footer";

const yatra = Yatra_One({
  weight: "400",
  subsets: ["latin", "devanagari"],
  variable: "--font-yatra",
  display: "swap",
});
const body = Noto_Sans({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const deva = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  variable: "--font-deva",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Balaju Living Heritage | 22 Dhara & Pyah Thwam Ajima",
  description:
    "A living archive of 22 Dhara (Baisdhara) and Pyah Thwam Ajima in Balaju, Kathmandu: water, worship, Newar art and community.",
};

export const viewport: Viewport = {
  themeColor: "#8b2e1f",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${yatra.variable} ${body.variable} ${deva.variable}`}>
      <body>
        {/* Accessibility: skip the navbar and land on the page content */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-marigold focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-wood focus-visible:outline-wood focus:shadow-lg"
        >
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
