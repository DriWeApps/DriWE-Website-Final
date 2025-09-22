"use client";

import React, { useRef, useEffect, useMemo, useState } from "react";
import { Zap, Shield, Clock, Globe, Play, ChevronDown, X } from "lucide-react";
import BookNowButton from "./BookNowButton";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import FloatingParticles from "./FloatingParticles";
import Image from "next/image";

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

export default function TaxiHero({ theme }: HeroProps) {
  const containerRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const buttonsRef = useRef<HTMLDivElement | null>(null);
  const iconsRef = useRef<Array<HTMLDivElement | null>>([]);
  const scrollIndicatorRef = useRef<HTMLDivElement | null>(null);
  const phoneRef = useRef<HTMLImageElement | null>(null);

  const [showVideo, setShowVideo] = useState(false);

  const floatingIconsData = useMemo(
    () => [
      {
        icon: Zap as React.ComponentType<React.SVGProps<SVGSVGElement>>,
        position: "top-4 right-8",
        delay: 0,
      },
      {
        icon: Shield as React.ComponentType<React.SVGProps<SVGSVGElement>>,
        position: "bottom-8 left-4",
        delay: 0.2,
      },
      {
        icon: Clock as React.ComponentType<React.SVGProps<SVGSVGElement>>,
        position: "top-20 left-8",
        delay: 0.4,
      },
      {
        icon: Globe as React.ComponentType<React.SVGProps<SVGSVGElement>>,
        position: "bottom-4 right-12",
        delay: 0.6,
      },
    ],
    []
  );

  useEffect(() => {
    if (typeof window === "undefined" || !gsap || !ScrollTrigger) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.4,
      });

      gsap.from(textRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: "power3.out",
        delay: 0.6,
      });

      gsap.from(buttonsRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: "power3.out",
        delay: 0.8,
      });

      gsap.from(".right-content-container", {
        opacity: 0,
        x: 100,
        duration: 1,
        ease: "power3.out",
        delay: 0.4,
      });

      if (phoneRef.current) {
        gsap.set(phoneRef.current, { rotation: 0 });

        gsap.to(phoneRef.current, {
          rotation: 60,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top+=200 bottom",
            end: "+=400",
            scrub: 0.8,
            onRefresh: () => {
              gsap.set(phoneRef.current, { rotation: 0 });
            },
          },
        });
      }

      iconsRef.current.forEach((icon, i) => {
        if (!icon) return;
        const itemDelay = floatingIconsData[i]?.delay ?? 0;
        gsap.from(icon, {
          opacity: 0,
          scale: 0,
          duration: 0.8,
          ease: "back.out(1.7)",
          delay: itemDelay + 1,
        });

        gsap.to(icon, {
          y: -10,
          duration: 2,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: itemDelay,
        });
      });

      gsap.to(scrollIndicatorRef.current, {
        y: 10,
        duration: 2,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
      });
    }, containerRef);

    return () => ctx.revert();
  }, [floatingIconsData]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <FloatingParticles theme={theme} />

      <div className="absolute inset-0 opacity-20">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `linear-gradient(${theme.primary}30 1px, transparent 1px), linear-gradient(90deg, ${theme.primary}30 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center justify-between z-10">
        <div className="lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0">
          <div ref={titleRef}>
            <h1
              className="text-6xl lg:text-8xl font-black mb-6 leading-[1.1] lg:leading-[1.08] pb-2"
              style={{
                background: theme.gradient,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                filter: `drop-shadow(0 0 30px ${theme.glowColor}60)`,
                lineHeight: 1.08,
                paddingBottom: "0.25em",
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
              Experience seamless transportation with instant booking, and
              premium vehicles. The future of mobility is here.
            </p>
          </div>
          <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-6">
            <BookNowButton className="group relative px-12 py-6 rounded-full font-bold text-xl text-black overflow-hidden" />
            <button
              onClick={() => setShowVideo(true)}
              className="group px-12 py-6 rounded-full font-bold text-xl text-white border-2 border-white/30 backdrop-blur-xl hover:bg-white/10 transition-all duration-300"
              style={{ borderColor: theme.primary }}
            >
              <span className="flex items-center gap-3">
                <Play className="w-6 h-6" /> Watch Demo
              </span>
            </button>
          </div>
        </div>

        <div className="lg:w-1/2 flex justify-center right-content-container">
          <div
            className="relative w-96 h-96 lg:w-[500px] lg:h-[500px] rounded-full flex items-center justify-center"
            style={{
              background: `radial-gradient(circle, ${theme.primary}20, transparent 70%)`,
              boxShadow: `0 0 100px ${theme.glowColor}40`,
            }}
          >
            <Image
              ref={phoneRef}
              src="/images/phone-mockup.png"
              alt="DriWE App"
              width={500}
              height={500}
              className="w-full h-full object-contain z-10 pointer-events-none select-none"
              draggable="false"
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                transformOrigin: "center center",
              }}
            />
            <div className="absolute inset-4 rounded-full border border-white/10 backdrop-blur-xl flex items-center justify-center text-4xl font-bold text-white/50 z-0" />
          </div>
        </div>
      </div>

      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <ChevronDown className="w-8 h-8 text-white/60" />
      </div>

      {showVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
          {/* Close Button */}
          <button
            onClick={() => setShowVideo(false)}
            className="absolute top-6 right-6 text-white text-3xl z-50"
          >
            <X />
          </button>

          {/* Video */}
          <video
            src="/videos/demovideo.mp4"
            controls
            autoPlay
            className="w-full h-full max-w-none max-h-full object-contain rounded-lg shadow-lg z-40"
          />
        </div>
      )}
    </section>
  );
}
