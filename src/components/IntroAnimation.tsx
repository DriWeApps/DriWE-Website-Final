"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const Intro: React.FC = () => {
  const introRef = useRef<HTMLDivElement | null>(null);
  const cycleRef = useRef<HTMLSpanElement | null>(null);
  const [isIntroComplete, setIsIntroComplete] = useState(false);

  useEffect(() => {
    // Make sure GSAP is loaded
    if (typeof window === "undefined" || !gsap) {
      return;
    }

    // Cycle through the words "Smart", "Safe", and "Smooth"
    const words = ["Smart", "Safe", "Smooth"];
    let i = 0;
    const cycleText = () => {
      if (!cycleRef.current) return;
      gsap.to(cycleRef.current, {
        y: -20,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          i = (i + 1) % words.length;
          if (cycleRef.current) cycleRef.current.textContent = words[i];
          gsap.fromTo(
            cycleRef.current,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.3, ease: "power2.out" }
          );
        },
      });
    };
    const interval = setInterval(cycleText, 2000);

    // Intro animation
    const tl = gsap.timeline({
      onComplete: () => {
        clearInterval(interval);
        setIsIntroComplete(true);
      },
    });

    // Split the "We Are DriWe" title into individual characters
    const introEl = introRef.current?.querySelectorAll(".char");
    if (introEl) {
      tl.fromTo(
        introEl,
        { y: 100, opacity: 0, filter: "blur(6px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.5,
          ease: "power4.out",
          stagger: 0.08,
        }
      ).to(
        introRef.current,
        {
          y: -200,
          opacity: 0,
          filter: "blur(10px)",
          duration: 0.8,
          ease: "power4.inOut",
          onComplete: () => {
            setIsIntroComplete(true);
          },
        },
        "+=3"
      );
    }

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  // This component only renders if the intro animation is not complete
  if (isIntroComplete) {
    return null;
  }

  return (
    <div
      ref={introRef}
      className="fixed inset-0 z-50 flex flex-col justify-center items-center bg-black font-['poppins']"
    >
      <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 text-center leading-tight tracking-wide">
        {"We Are ".split("").map((c, i) => (
          <span key={i} className="char inline-block">
            {c}
          </span>
        ))}
        <span className="char inline-block text-[#fcd129]">D</span>
        <span className="char inline-block text-[#fcd129]">r</span>
        <span className="char inline-block text-[#fcd129]">i</span>
        <span className="char inline-block text-[#fcd129]">W</span>
        <span className="char inline-block text-[#fcd129]">E</span>
      </h1>
      <div className="text-xl md:text-3xl font-medium text-gray-200 text-center flex gap-3">
        <p>Riding Together</p>
        <span ref={cycleRef} className="text-[#fcd129]">
          Smart
        </span>
      </div>
    </div>
  );
};

export default Intro;
