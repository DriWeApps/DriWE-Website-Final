"use client";

import React, { useEffect, useRef } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import gsap from "gsap";

// Feature type
interface Feature {
  emoji: string;
  title: string;
  desc: string;
}

interface FeatureGridProps {
  features: Feature[];
}

export default function FeatureGrid({ features }: FeatureGridProps) {
  const cardsRef = useRef<HTMLDivElement[]>([]);

  // GSAP entry animation
  useEffect(() => {
    if (!cardsRef.current.length) return;

    gsap.fromTo(
      cardsRef.current,
      { y: 60, opacity: 0, scale: 0.9 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      }
    );
  }, []);

  return (
    <section className="py-28 relative overflow-hidden">
      {/* Section Heading */}
      <div className="text-center mb-20">
        <h2 className="text-5xl lg:text-6xl font-extrabold mb-6 text-white drop-shadow-lg">
          Why Choose DriWE
        </h2>
        <p className="text-lg lg:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
          Discover the future of transportation with innovative features and unmatched convenience.
        </p>
      </div>

      {/* Static 2x2 Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
        {features.slice(0, 4).map((feature, i) => (
          <Card
            key={i}
            ref={(el) => {
              if (el) cardsRef.current[i] = el;
            }}
            className="rounded-2xl border border-white/20 shadow-2xl text-center"
            variant="frosted"
          >
            <CardHeader>
              <CardTitle className="text-2xl text-white mb-2">{feature.title}</CardTitle>
              <CardDescription className="text-white/70 text-base">
                {feature.desc}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-center h-32 text-6xl">
              {feature.emoji}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
