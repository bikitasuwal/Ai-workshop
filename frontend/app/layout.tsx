import type { Metadata, Viewport } from "next";
import { Yatra_One, Noto_Sans, Noto_Sans_Devanagari } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
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
        <Nav />
        <main className="pb-24 md:pb-0">{children}</main>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
