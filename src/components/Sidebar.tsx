// components/Sidebar.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Home, Layers, Settings, User } from "lucide-react";

export default function Sidebar() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const toggleMenu = (menu: string) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  return (
    <aside className="h-screen w-64 p-4 bg-gradient-to-br from-white/10 to-white/5 
      backdrop-blur-xl border-r border-white/20 shadow-xl flex flex-col 
      text-white">
      
      <h1 className="text-2xl font-bold mb-8 bg-clip-text text-transparent 
        bg-gradient-to-r from-emerald-400 to-cyan-400">
        Dashboard
      </h1>

      {/* Menu Items */}
      <nav className="space-y-3">
        {/* Home */}
        <button className="flex items-center gap-3 px-3 py-2 rounded-xl 
          hover:bg-white/10 transition-all">
          <Home size={20} />
          <span>Home</span>
        </button>

        {/* Projects Dropdown */}
        <div>
          <button
            onClick={() => toggleMenu("projects")}
            className="flex items-center justify-between w-full px-3 py-2 rounded-xl 
              hover:bg-white/10 transition-all"
          >
            <span className="flex items-center gap-3">
              <Layers size={20} />
              Projects
            </span>
            <ChevronDown
              className={`transition-transform ${openMenu === "projects" ? "rotate-180" : ""}`}
            />
          </button>

          <AnimatePresence>
            {openMenu === "projects" && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="ml-10 mt-2 space-y-2 overflow-hidden"
              >
                <a className="block px-2 py-1 rounded-lg hover:bg-white/10">Project A</a>
                <a className="block px-2 py-1 rounded-lg hover:bg-white/10">Project B</a>
                <a className="block px-2 py-1 rounded-lg hover:bg-white/10">Project C</a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Profile Dropdown */}
        <div>
          <button
            onClick={() => toggleMenu("profile")}
            className="flex items-center justify-between w-full px-3 py-2 rounded-xl 
              hover:bg-white/10 transition-all"
          >
            <span className="flex items-center gap-3">
              <User size={20} />
              Profile
            </span>
            <ChevronDown
              className={`transition-transform ${openMenu === "profile" ? "rotate-180" : ""}`}
            />
          </button>

          <AnimatePresence>
            {openMenu === "profile" && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="ml-10 mt-2 space-y-2 overflow-hidden"
              >
                <a className="block px-2 py-1 rounded-lg hover:bg-white/10">My Account</a>
                <a className="block px-2 py-1 rounded-lg hover:bg-white/10">Settings</a>
                <a className="block px-2 py-1 rounded-lg hover:bg-white/10">Logout</a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Settings */}
        <button className="flex items-center gap-3 px-3 py-2 rounded-xl 
          hover:bg-white/10 transition-all">
          <Settings size={20} />
          <span>Settings</span>
        </button>
      </nav>
    </aside>
  );
}
