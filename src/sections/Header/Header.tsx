"use client";

import { useState } from "react";
import Link from "next/link";
import { AiOutlineMenuFold, AiOutlineClose } from "react-icons/ai";

import { FiHome, FiBookmark } from "react-icons/fi";

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
];

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const closeSidebar = () => setIsSidebarOpen(false);
  const openSidebar = () => setIsSidebarOpen(true);

  return (
    <header className="bg-white border-b border-gray-200 relative">
      <div className="max-w-2xl mx-auto px-4 py-4 sm:py-5 flex justify-between items-center">
        <div>
          <h1 className="text-lg sm:text-xl font-bold tracking-tight">
            <span style={{ color: "#085698" }}>MEDI</span>{" "}
            <span style={{ color: "#339d55" }}>SPLIT</span>
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Smart Medicine Price & Discount Calculator
          </p>
          <p className="text-xs text-gray-400 mt-0.5">by Reflect Pharma</p>
        </div>
        
        <button 
          onClick={openSidebar}
          className="p-2 -mr-2 text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
          aria-label="Open menu"
        >
          <AiOutlineMenuFold size={24} />
        </button>
      </div>

      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isSidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
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
          <span className="font-semibold text-gray-800 tracking-tight">Navigation</span>
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
                <Icon size={20} className="text-gray-500 group-hover:text-gray-700 transition-colors" />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

export default Header;
