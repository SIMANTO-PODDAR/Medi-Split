import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/sections/Header/Header";
import Footer from "@/sections/Footer/Footer";
import GoogleTranslate from "@/components/GoogleTranslate/GoogleTranslate";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title:
    "MediSplit — Smart Medicine Price & Discount Calculator | Reflect Pharma",
  description:
    "MediSplit by Reflect Pharma — Quickly calculate medicine prices, apply discounts, and view detailed breakdowns. A fast utility for pharmaceutical sales workers. Developed by Simanto Poddar.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <GoogleTranslate />
        <Header />

        {children}

        <Footer />
      </body>
    </html>
  );
}
