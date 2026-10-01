"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { AiOutlineMenuFold, AiOutlineClose } from "react-icons/ai";

import { FiHome, FiBookmark } from "react-icons/fi";
import { IoLanguageSharp } from "react-icons/io5";
import { IoLogoAndroid } from "react-icons/io";
import { FaQuestion } from "react-icons/fa6";
import { FaMapSigns } from "react-icons/fa";

const navLinks = [
  {
    name: "Home",
    href: "/",
    icon: FiHome,
  },
  {
    name: "Saved Medicines",
    href: "/all-medicines",
    icon: FiBookmark,
  },
  {
    name: "How To Use",
    href: "/how-to-use",
    icon: FaQuestion,
  },
  {
    name: "Developer's Info",
    href: "https://simanto-poddar-portfolio.vercel.app",
    icon: IoLogoAndroid,
  },
];

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("EN");

  useEffect(() => {
    // Check if google translate cookie exists
    const match = document.cookie.match(/(^|;) ?googtrans=([^;]*)(;|$)/);
    if (match) {
      const lang = match[2]; // e.g. /en/bn
      if (lang.endsWith("bn")) {
        setCurrentLang("BN");
      }
    }
  }, []);

  const toggleLanguage = () => {
    const targetLang = currentLang === "EN" ? "bn" : "en";
    const select = document.querySelector(
      ".goog-te-combo"
    ) as HTMLSelectElement;

    if (select) {
      select.value = targetLang;
      select.dispatchEvent(new Event("change"));
    } else {
      // Fallback
      document.cookie = `googtrans=/en/${targetLang}; path=/`;
      window.location.reload();
      return;
    }

    // Sometimes restoring to original language requires clearing the cookie and reloading
    if (targetLang === "en") {
      document.cookie =
        "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie =
        "googtrans=/en/en; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }

    setCurrentLang(targetLang.toUpperCase());
  };

  const closeSidebar = () => setIsSidebarOpen(false);
  const openSidebar = () => setIsSidebarOpen(true);

  return (
    <header className="bg-white border-b border-gray-200 relative">
      <div className="max-w-2xl mx-auto px-4 py-4 sm:py-5 flex justify-between items-center">
        <div>
          <h1 className="text-lg sm:text-xl font-bold tracking-tight">
            <span className="text-[#085698]">MEDI</span>{" "}
            <span className="text-[#339d55]">SPLIT</span>
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Smart Medicine Price & Discount Calculator
          </p>
          <p className="text-xs text-gray-400 mt-0.5">by Reflect Pharma</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={openSidebar}
            className="p-2 -mr-2 text-[#339d55] hover:text-[#085698] transition-colors cursor-pointer"
            aria-label="Open menu"
          >
            <AiOutlineMenuFold size={24} />
          </button>
        </div>
      </div>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isSidebarOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={closeSidebar}
        aria-hidden="true"
      />

      {/* Sidebar Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-64 sm:w-72 bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 flex justify-between items-center border-b border-gray-100">
          <span className="font-semibold text-gray-800 tracking-tight flex items-center gap-2">
           <FaMapSigns /> Navigation
          </span>
          <button
            onClick={closeSidebar}
            className="p-2 -mr-2 text-gray-500 hover:text-gray-800 transition-colors cursor-pointer"
            aria-label="Close menu"
          >
            <AiOutlineClose size={20} />
          </button>
        </div>

        <nav className="p-4 flex flex-col gap-2">
          {navLinks.map((link) => {
            const Icon = link.icon;

            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={closeSidebar}
                className="group px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-md transition-colors font-medium flex items-center gap-3"
              >
                <Icon
                  size={20}
                  className="text-gray-500 group-hover:text-[#085698] transition-colors"
                />
                <span>{link.name}</span>
              </Link>
            );
          })}

          {/* Mobile sidebar language toggle */}
          <button
            onClick={toggleLanguage}
            className="group px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-md transition-colors font-medium flex items-center gap-3"
          >
            <IoLanguageSharp
              size={20}
              className="text-gray-500 group-hover:text-[#085698] transition-colors"
            />

            <span>
              {currentLang === "EN" ? "Switch to Bangla" : "Switch to English"}
            </span>
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
