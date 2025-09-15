'use client';

import React, { useRef, useEffect } from 'react';
import { Train, Navigation, Users, Star, ChevronDown, Car } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import FloatingParticles from './FloatingParticles';

// Theme and props interfaces
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
interface HeroProps {
  theme: Theme;
}

export default function TransportHero({ theme }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const statsRef = useRef<HTMLDivElement[]>([]);
  const ratingRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !gsap || !ScrollTrigger) return;
    gsap.registerPlugin(ScrollTrigger);

    // Section entrance animation
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      }
    );

    // Badge
    gsap.fromTo(
      badgeRef.current,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: 'power3.out',
        delay: 0.2,
        scrollTrigger: {
          trigger: badgeRef.current,
          start: 'top 90%',
        },
      }
    );

    // Title
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.4,
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 90%',
        },
      }
    );

    // Description
    gsap.fromTo(
      descRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power3.out',
        delay: 0.6,
        scrollTrigger: {
          trigger: descRef.current,
          start: 'top 90%',
        },
      }
    );

    // Stats cards
    statsRef.current.forEach((el, i) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          delay: 0.8 + i * 0.1,
          scrollTrigger: {
            trigger: el,
            start: 'top 95%',
          },
        }
      );
      // Floating animation
      gsap.to(el, {
        y: '-=5',
        repeat: -1,
        yoyo: true,
        duration: 2 + i * 0.2,
        ease: 'sine.inOut',
        delay: i * 0.2,
      });
    });

    // Rating
    gsap.fromTo(
      ratingRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power3.out',
        delay: 1.2,
        scrollTrigger: {
          trigger: ratingRef.current,
          start: 'top 95%',
        },
      }
    );

    // Scroll indicator
    gsap.to(scrollRef.current, {
      y: 10,
      repeat: -1,
      yoyo: true,
      duration: 2,
      ease: 'sine.inOut',
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: 'none' }}
    >
      <FloatingParticles theme={theme} />

      {/* Grid Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `linear-gradient(${theme.primary}30 1px, transparent 1px), linear-gradient(90deg, ${theme.primary}30 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="container mx-auto px-6 text-center">
        <div
          ref={badgeRef}
          className="inline-block px-6 py-3 rounded-full border border-white/20 backdrop-blur-xl mb-8"
          style={{
            background: `linear-gradient(135deg, ${theme.primary}20, ${theme.secondary}20)`,
            boxShadow: `0 0 20px ${theme.glowColor}30`,
          }}
        >
          <span className="text-white font-semibold flex items-center gap-2">
            <Navigation className="w-5 h-5" style={{ color: theme.primary }} />
            Smart Transport Network
          </span>
        </div>

        <h1
          ref={titleRef}
          className="text-6xl lg:text-8xl font-black mb-6"
          style={{
            background: theme.gradient,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Connected
          <br />
          Mobility
        </h1>

        <p
          ref={descRef}
          className="text-xl lg:text-2xl text-white/80 mb-12 leading-relaxed max-w-3xl mx-auto"
        >
          Seamless integration across all transport modes. Real-time updates,
          smart routing, and unified payments for the complete journey.
        </p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {[
            { icon: Car, label: 'Smart Transport', count: '1K+' },
            { icon: Train, label: 'Cab Network', count: '100+' },
            { icon: Navigation, label: 'Routes', count: '10k+' },
            { icon: Users, label: 'Daily Users', count: '10K+' },
          ].map(({ icon: Icon, label, count }, i) => (
            <div
              key={i}
              ref={el => {
                statsRef.current[i] = el as HTMLDivElement;
              }}
              className="p-6 rounded-2xl backdrop-blur-xl border border-white/20"
              style={{
                background: `linear-gradient(135deg, ${theme.primary}15, ${theme.secondary}15)`,
                boxShadow: `0 8px 32px ${theme.glowColor}20`,
              }}
            >
              <div>
                <Icon className="w-12 h-12 mx-auto mb-4" style={{ color: theme.primary }} />
              </div>
              <div className="text-3xl font-bold text-white mb-2">{count}</div>
              <div className="text-white/60">{label}</div>
            </div>
          ))}
        </div>

        {/* Rating section */}
        <div
          ref={ratingRef}
          className="mt-16 flex items-center justify-center gap-4"
        >
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <div key={i}>
                <Star
                  className="w-6 h-6 fill-current"
                  style={{ color: theme.accent || theme.primary }}
                />
              </div>
            ))}
          </div>
          4.9/5 from 10,000+ riders
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <ChevronDown className="w-8 h-8 text-white/60" />
      </div>
    </section>
  );
}