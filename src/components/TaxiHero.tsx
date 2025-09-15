'use client';

import React, { useRef, useEffect, useMemo } from 'react';
import { Zap, Shield, Clock, Globe, Play, ChevronDown } from 'lucide-react';
import BookNowButton from './BookNowButton';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import FloatingParticles from './FloatingParticles';
import Image from 'next/image';

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

// Hero Section Props
interface HeroProps {
  theme: Theme;
}

// Taxi Hero Section
export default function TaxiHero({ theme }: HeroProps) {
  const containerRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const buttonsRef = useRef<HTMLDivElement | null>(null);
  const iconsRef = useRef<Array<HTMLDivElement | null>>([]);
  const scrollIndicatorRef = useRef<HTMLDivElement | null>(null);
  const phoneRef = useRef<HTMLImageElement | null>(null);

  const floatingIconsData = useMemo(() =>
    [
      { icon: Zap as React.ComponentType<React.SVGProps<SVGSVGElement>>, position: 'top-4 right-8', delay: 0 },
      { icon: Shield as React.ComponentType<React.SVGProps<SVGSVGElement>>, position: 'bottom-8 left-4', delay: 0.2 },
      { icon: Clock as React.ComponentType<React.SVGProps<SVGSVGElement>>, position: 'top-20 left-8', delay: 0.4 },
      { icon: Globe as React.ComponentType<React.SVGProps<SVGSVGElement>>, position: 'bottom-4 right-12', delay: 0.6 },
    ] as {
      icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
      position: string;
      delay: number;
    }[],
    []
  );

  useEffect(() => {
    // Check if GSAP is available before proceeding
    if (typeof window === 'undefined' || !gsap || !ScrollTrigger) return;
    gsap.registerPlugin(ScrollTrigger);
    
    // Use a GSAP context to manage animations and ensure cleanup
    const ctx = gsap.context(() => {
      // Left content fade-in and slide-in
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.4,
      });

      gsap.from(textRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: 'power3.out',
        delay: 0.6,
      });

      gsap.from(buttonsRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: 'power3.out',
        delay: 0.8,
      });

      // Right content fade-in and slide-in
      gsap.from('.right-content-container', {
        opacity: 0,
        x: 100,
        duration: 1,
        ease: 'power3.out',
        delay: 0.4,
      });

      // Phone rotation on scroll - DELAYED START & 60 DEGREES ONLY
      if (phoneRef.current) {
        // Set initial rotation to 0
        gsap.set(phoneRef.current, { rotation: 0 });
        
        gsap.to(phoneRef.current, {
          rotation: 60, // Only 60 degrees rotation instead of 360
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top+=200 bottom", // Start after scrolling 200px down
            end: "+=400", // Animation duration over 400px of scrolling
            scrub: 0.8, // Slower, smoother rotation (was 1.5)
            onRefresh: () => {
              // Force vertical position on page load/refresh
              gsap.set(phoneRef.current, { rotation: 0 });
            }
          }
        });
      }

      // Floating icons entry and bobbing animation
      iconsRef.current.forEach((icon, i) => {
        if (!icon) return;
        const itemDelay = floatingIconsData[i]?.delay ?? 0;
        gsap.from(icon, {
          opacity: 0,
          scale: 0,
          duration: 0.8,
          ease: 'back.out(1.7)',
          delay: itemDelay + 1,
        });

        gsap.to(icon, {
          y: -10,
          duration: 2,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          delay: itemDelay,
        });
      });
      
      // Scroll indicator animation
      gsap.to(scrollIndicatorRef.current, {
        y: 10,
        duration: 2,
        ease: 'power1.inOut',
        repeat: -1,
        yoyo: true,
      });
      
    }, containerRef);
    
    // Cleanup function for GSAP context
    return () => ctx.revert();
  }, [floatingIconsData]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <FloatingParticles theme={theme} />
      
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `linear-gradient(${theme.primary}30 1px, transparent 1px), linear-gradient(90deg, ${theme.primary}30 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center justify-between z-10">
        {/* Left Content */}
        <div className="lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0">
          <div ref={titleRef}>
            <h1
              className="text-6xl lg:text-8xl font-black mb-6 leading-[1.1] lg:leading-[1.08] pb-2"
              style={{
                background: theme.gradient,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: `drop-shadow(0 0 30px ${theme.glowColor}60)`,
                lineHeight: 1.08,
                paddingBottom: '0.25em',
                marginBottom: 0,
              }}
            >
              DriWE The
              <br />
              Change
            </h1>
          </div>
          <div ref={textRef}>
            <p className="text-xl lg:text-2xl text-white/80 mb-12 leading-relaxed max-w-2xl">
              Experience seamless transportation with instant booking,
              and premium vehicles. The future of mobility is here.
            </p>
          </div>
          <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-6">
            <BookNowButton className="group relative px-12 py-6 rounded-full font-bold text-xl text-black overflow-hidden" />
            <button
              className="group px-12 py-6 rounded-full font-bold text-xl text-white border-2 border-white/30 backdrop-blur-xl hover:bg-white/10 transition-all duration-300"
              style={{ borderColor: theme.primary }}
            >
              <span className="flex items-center gap-3">
                <Play className="w-6 h-6" /> Watch Demo
              </span>
            </button>
          </div>
        </div>

        {/* Right Content - CIRCLE CONTAINER STAYS THE SAME SIZE */}
        <div className="lg:w-1/2 flex justify-center right-content-container">
          <div
            className="relative w-96 h-96 lg:w-[500px] lg:h-[500px] rounded-full flex items-center justify-center"
            style={{
              background: `radial-gradient(circle, ${theme.primary}20, transparent 70%)`,
              boxShadow: `0 0 100px ${theme.glowColor}40`,
            }}
          >
            {/* Phone Mockup Image - ONLY PHONE SIZE INCREASED TO w-full h-full */}
            <Image
              ref={phoneRef}
              src="/images/phone-mockup.png"
              alt="DriWE App"
              width={500}
              height={500}
              className="w-full h-full object-contain z-10 pointer-events-none select-none"
              draggable="false"
              style={{ 
                position: 'absolute',
                left: '50%', 
                top: '50%', 
                transform: 'translate(-50%, -50%)',
                transformOrigin: 'center center'
              }}
            />
            <div className="absolute inset-4 rounded-full border border-white/10 backdrop-blur-xl flex items-center justify-center text-4xl font-bold text-white/50 z-0">
              {/* Background circle */}
            </div>
            {/* Floating Icons */}
            {floatingIconsData.map(({ icon: Icon, position }, i) => (
              <div
                key={i}
                ref={el => { iconsRef.current[i] = el as HTMLDivElement | null; }}
                className={`absolute ${position} w-16 h-16 rounded-full backdrop-blur-xl border border-white/20 flex items-center justify-center z-20`}
                style={{
                  background: `linear-gradient(135deg, ${theme.primary}30, ${theme.secondary}30)`,
                  boxShadow: `0 0 20px ${theme.glowColor}40`,
                }}
              >
                <Icon className="w-8 h-8" style={{ color: theme.primary }} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <ChevronDown className="w-8 h-8 text-white/60" />
      </div>
    </section>
  );
}
