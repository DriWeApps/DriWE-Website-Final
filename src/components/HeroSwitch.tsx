'use client';

import React from 'react';
import { motion } from 'framer-motion';

// Define the theme structure for TypeScript
interface Theme {
  primary: string;
  secondary: string;
  bg: string;
  bgLight: string;
  text: string;
  textMuted: string;
  accent: string;
  gradient: string;
  glowColor: string;
}

// Hero Switch Component
interface HeroSwitchProps {
  mode: string;
  setMode: (mode: string) => void;
  theme: Theme;
  heroTabs: string[];
}

export default function HeroSwitch({ mode, setMode, theme, heroTabs }: HeroSwitchProps) {
  return (
    <motion.div
      className="flex items-center justify-center mb-12"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div
        className="relative flex p-2 rounded-full backdrop-blur-xl border border-white/10"
        style={{
          background: `linear-gradient(135deg, ${theme.primary}20, ${theme.secondary}20)`,
          boxShadow: `0 0 30px ${theme.glowColor}40`,
        }}
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse" />
        {heroTabs.map((tab) => {
          const active = mode === tab;
          return (
            <motion.button
              key={tab}
              onClick={() => setMode(tab)}
              className={`relative px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 ${
                active ? 'text-white' : 'text-white'
              }`}
              style={{
                background: active ? theme.gradient : 'transparent',
                boxShadow: active ? `0 0 40px ${theme.glowColor}60` : 'none',
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {active && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 rounded-full"
                  style={{ background: theme.gradient }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">{tab}</span>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
