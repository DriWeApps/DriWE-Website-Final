"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {  ArrowRight, Users, ShieldCheck, Star } from "lucide-react";

export default function CTASection() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      const elements = containerRef.current.querySelectorAll(".animate-fade");
      gsap.fromTo(
        elements,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power3.out" }
      );
    }
  }, []);

  return (
    <section ref={containerRef} className="relative py-32 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/10 via-transparent to-transparent blur-3xl" />

      <div className="relative z-10 container mx-auto px-6 text-center">
        {/* Title */}
        <h2 className="animate-fade text-5xl lg:text-7xl font-extrabold text-white mb-6">
          Ready to <span className="text-yellow-400">Transform</span> Your Journey?
        </h2>

        {/* Subtitle */}
        <p className="animate-fade text-lg md:text-xl text-white/70 mb-12 max-w-2xl mx-auto">
          Join thousands of riders who upgraded their transportation with{" "}
          <span className="font-semibold text-white">RideSphere</span>
        </p>

        {/* CTA Buttons */}
        <div className="animate-fade flex flex-col sm:flex-row gap-6 justify-center mb-16">
          <Button
            size="lg"
            className="rounded-full px-10 py-6 text-lg font-semibold bg-yellow-400 text-black hover:bg-yellow-300 flex items-center gap-2"
          >
            Get Started <ArrowRight className="w-5 h-5" />
          </Button>
          <Button
            size="lg"
            className="rounded-full px-10 py-6 text-lg font-semibold border-white/30  "
            variant="glass"
          >
            Learn More
          </Button>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Card 1 */}
          <Card className="animate-fade rounded-2xl border border-white/10 backdrop-blur-xl bg-white/5 shadow-lg hover:scale-105 transition-transform">
            <CardHeader className="flex flex-col items-center">
              <Users className="w-12 h-12 mb-4 text-yellow-400" />
              <CardTitle className="text-xl text-white">Millions of Users</CardTitle>
              <CardDescription className="text-white/70 text-center">
                Trusted by riders worldwide who rely on us daily.
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Card 2 */}
          <Card className="animate-fade rounded-2xl border border-white/10 backdrop-blur-xl bg-white/5 shadow-lg hover:scale-105 transition-transform">
            <CardHeader className="flex flex-col items-center">
              <ShieldCheck className="w-12 h-12 mb-4 text-yellow-400" />
              <CardTitle className="text-xl text-white">Safety First</CardTitle>
              <CardDescription className="text-white/70 text-center">
                Verified drivers, real-time tracking, and 24/7 support.
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Card 3 */}
          <Card className="animate-fade rounded-2xl border border-white/10 backdrop-blur-xl bg-white/5 shadow-lg hover:scale-105 transition-transform">
            <CardHeader className="flex flex-col items-center">
              <Star className="w-12 h-12 mb-4 text-yellow-400" />
              <CardTitle className="text-xl text-white">Premium Experience</CardTitle>
              <CardDescription className="text-white/70 text-center">
                Transparent rides, professional drivers, and top-rated service.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </section>
  );
}
