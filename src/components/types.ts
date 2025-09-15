// src/components/types.ts

// This file contains shared type definitions to prevent duplication across components.

export interface Theme {
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

export interface HeroProps {
  theme: Theme;
}

export interface Feature {
  emoji: string;
  title: string;
  desc: string;
  rating?: number;
}
