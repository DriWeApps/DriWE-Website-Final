'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

// CDN import for GSAP and ScrollTrigger to ensure they are available
const GSAP_CDN = `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js`;
const SCROLLTRIGGER_CDN = `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js`;

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

// Floating Particles Background
interface FloatingParticlesProps {
  theme: Theme;
}

export default function FloatingParticles({ theme }: FloatingParticlesProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if the script has already been loaded.
    // This prevents re-loading the script on every render.
    if (!document.querySelector(`script[src="${GSAP_CDN}"]`)) {
      // Function to load external scripts dynamically
      const loadScript = (src: string, callback: () => void) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = callback;
        document.head.appendChild(script);
      };

      // Load GSAP first, then load ScrollTrigger
      loadScript(GSAP_CDN, () => {
        loadScript(SCROLLTRIGGER_CDN, () => {
          gsap.registerPlugin(ScrollTrigger);
          startAnimations();
        });
      });
    } else {
      // If scripts are already loaded, just start the animations
      startAnimations();
    }

    function startAnimations() {
      // Use a GSAP context to manage animations and ensure cleanup
      const ctx = gsap.context(() => {
        // Generate and animate 50 floating particles
        for (let i = 0; i < 50; i++) {
          const particle = document.createElement('div');
          // Style the particle element
          particle.className = 'absolute rounded-full pointer-events-none';
          const size = Math.random() * 2 + 1; // Random size between 1px and 3px
          particle.style.width = `${size}px`;
          particle.style.height = `${size}px`;
          // Randomly choose between primary and secondary theme colors
          const color = Math.random() > 0.5 ? theme.primary : theme.secondary;
          particle.style.backgroundColor = color;
          // Set an initial random position
          gsap.set(particle, {
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: 0,
          });

          // Animate the particle
          gsap.to(particle, {
            // Animate opacity to make them fade in and out
            opacity: 1,
            duration: 1,
            delay: Math.random() * 5, // Random initial delay
          });

          // Create a looping, floating motion
          gsap.to(particle, {
            x: `+=${(Math.random() - 0.5) * 500}`, // Move left or right randomly
            y: `+=${(Math.random() - 0.5) * 500}`, // Move up or down randomly
            duration: Math.random() * 20 + 10, // Random duration for a natural feel
            ease: 'none',
            repeat: -1, // Loop indefinitely
            yoyo: true, // Go back and forth
          });
          
          if (containerRef.current) {
            containerRef.current.appendChild(particle);
          }
        }
      }, containerRef);

      // Return a cleanup function for GSAP context
      return () => ctx.revert();
    }
  }, [theme]);

  return <div ref={containerRef} className="absolute inset-0 z-0"></div>;
}
