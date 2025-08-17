import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import BackgroundFX from "@/components/BackgroundFX";
import Cursor from "@/components/Cursor";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Zayra — IT kompaniyasi",
  description: "Jiddiy & minimalistik IT yechimlar: Web • Mobil • AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uz" className="dark" suppressHydrationWarning>
      <body
        className={`${inter.variable} min-h-dvh bg-black text-white antialiased`}
      >
        <Navbar />
        <BackgroundFX /> {/* 🔥 yangi animatsion fon */}
        <Cursor />
        <main>{children}</main>
      </body>
    </html>
  );
}
