"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Defensive: check gsap and ScrollTrigger are loaded
    if (!gsap || !ScrollTrigger) return;
    gsap.registerPlugin(ScrollTrigger);

    // Fade in the section itself
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 90%",
        },
      }
    );

    // Animate the stats cards
    const ctx = gsap.context(() => {
      gsap.from(gsap.utils.toArray(statsRef.current?.children || []), {
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    }, statsRef);
    return () => ctx.revert();
  }, []);

  // SSR fallback: always render content, but only animate on client
  return (
    <section ref={sectionRef} className="py-32 relative">
      <div className="container mx-auto px-6">
        <h2 className="text-5xl font-black text-center mb-20">Global Impact</h2>
        <div
          ref={statsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
        >
          <div
            className="p-8 rounded-3xl backdrop-blur-xl border border-white/10"
            style={{
              background:
                "linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))",
            }}
          >
            <div className="text-5xl font-bold text-white mb-2">1k+</div>
            <div className="text-white/60">Rides Completed</div>
          </div>
          <div
            className="p-8 rounded-3xl backdrop-blur-xl border border-white/10"
            style={{
              background:
                "linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))",
            }}
          >
            <div className="text-5xl font-bold text-white mb-2">100+</div>
            <div className="text-white/60">Places Coverd</div>
          </div>
          <div
            className="p-8 rounded-3xl backdrop-blur-xl border border-white/10"
            style={{
              background:
                "linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))",
            }}
          >
            <div className="text-5xl font-bold text-white mb-2">101%</div>
            <div className="text-white/60">Uptime Reliability</div>
          </div>
        </div>
      </div>
    </section>
  );
}
