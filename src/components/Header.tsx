"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import BookNowButton from "./BookNowButton";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
// Remove unused imports if not used below

export default function Header() {
  const [pathname, setPathname] = useState("/");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Responsive check
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024); // lg breakpoint
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  type NavDropdown = { href: string; label: string };
  type NavItem = {
    href: string;
    label: string;
    dropdown?: NavDropdown[];
  };

  const navItems: NavItem[] = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    {
      href: "/services",
      label: "Services",
      // dropdown: [
      //   { href: "/services/taxi", label: "Taxi Rides" },
      //   { href: "/services/rentals", label: "Car Rentals" },
      //   { href: "/services/corporate", label: "Corporate Travel" },
      // ],
    },
    { href: "/contact", label: "Contact" },
    {
      href: "/support",
      label: "Support",
      // dropdown: [
      //   { href: "/support/help", label: "Help Center" },
      //   { href: "/support/faq", label: "FAQs" },
      // ],
    },
    { href: "/why-choose", label: "Why Choose Us" },
  ];

  const getNavLinkClasses = (href: string) => {
    const isActive = pathname === href;
    return `
      relative px-2 py-1 font-medium transition-colors duration-200
      ${isActive ? "text-black font-semibold" : "text-gray-700 hover:text-black"}
    `;
  };

  // --- Desktop Navbar ---
  const renderDesktopHeader = () => (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-20 px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/images/driwe-logo.svg"
            alt="DriWE Logo"
            width={140}
            height={50}
            priority
          />
        </Link>

        {/* Nav links */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navItems.map((item) => (
            <div
              key={item.href}
              className="relative group"
              onMouseEnter={() => setOpenDropdown(item.dropdown ? item.label : null)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                href={item.href}
                onClick={() => setPathname(item.href)}
                className={getNavLinkClasses(item.href)}
              >
                {item.label}
                {item.dropdown && <ChevronDown className="inline w-4 h-4 ml-1" />}
                {pathname === item.href && (
                  <motion.span
                    layoutId="underline"
                    className="absolute left-0 -bottom-1 h-[2px] w-full bg-[#fcd129]"
                  />
                )}
              </Link>

              {/* Dropdown */}
              <AnimatePresence>
                {openDropdown === item.label && item.dropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 mt-3 w-48 rounded-lg shadow-lg bg-white border"
                  >
                    <ul className="py-2">
                      {item.dropdown.map((sub) => (
                        <li key={sub.href}>
                          <Link
                            href={sub.href}
                            className="block px-4 py-2 text-gray-700 hover:bg-yellow-50 hover:text-black"
                          >
                            {sub.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        {/* Book Now Button */}
        <div className="hidden lg:block">
          <BookNowButton className="px-5 py-2 rounded-lg font-semibold text-black shadow" />
        </div>

        {/* Mobile menu toggle */}
        {isMobile && (
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg text-black hover:bg-gray-100"
          >
            <Menu className="h-6 w-6" />
          </button>
        )}
      </div>
    </header>
  );

  // --- Mobile Sidebar (Glassy) ---
// --- Mobile Sidebar (Glassy) ---
const renderMobileSidebar = () => (
  <AnimatePresence>
    {isSidebarOpen && isMobile && (
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 left-0 h-full w-72 
            bg-gradient-to-br from-white/10 to-white/5 
            backdrop-blur-xl border-r border-white/20 shadow-xl
            z-50 flex flex-col text-white"
        >
          <div className="flex items-center justify-between p-4 border-b border-white/20">
            <Image src="/images/driwe-logo.svg" alt="Logo" width={100} height={40} />
            <button onClick={() => setIsSidebarOpen(false)} className="p-2">
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex-1 p-4 space-y-4 overflow-y-auto">
            {navItems.map((item) => (
              <div key={item.href} className="flex flex-col">
                {/* If dropdown exists, keep button toggle */}
                {item.dropdown ? (
                  <>
                    <button
                      className="px-3 py-2 rounded-lg hover:bg-white/10 transition-all flex items-center justify-between w-full text-left"
                      onClick={() =>
                        setOpenDropdown(openDropdown === item.label ? null : item.label)
                      }
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`ml-2 h-4 w-4 transition-transform ${
                          openDropdown === item.label ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {openDropdown === item.label && (
                      <div className="ml-4 mt-2 space-y-2">
                        {item.dropdown.map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            onClick={() => setIsSidebarOpen(false)}
                            className="block text-gray-300 hover:text-white text-sm px-2 py-1 rounded"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  // If no dropdown, make the entire row a link
                  <Link
                    href={item.href}
                    onClick={() => {
                      setPathname(item.href);
                      setIsSidebarOpen(false);
                    }}
                    className="px-3 py-2 rounded-lg hover:bg-white/10 transition-all w-full text-left"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>
          <div className="p-4 border-t border-white/20">
            <BookNowButton className="w-full py-3 rounded-lg text-black font-semibold" />
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);
;

  return (
    <>
      {renderDesktopHeader()}
      {renderMobileSidebar()}
    </>
  );
}
