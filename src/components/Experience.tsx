"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

import { Sparkles } from "lucide-react";
import BookNowButton from "./BookNowButton";
import FAQSection from "./FAQSection";
import HowItWorks from "./HowItWorks";
import TransparencySection from "./TransparencySection";
import Image from "next/image";

export default function CallToAction() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current.querySelectorAll(".animate-fade"),
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power3.out" }
      );
    }
  }, []);

  return (
    <>
      <div ref={containerRef} className="relative py-24 px-6 text-center overflow-hidden bg-black">
        <h2 className="animate-fade text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
          Ready to <span className="text-yellow-400">Experience</span> the Difference?
        </h2>

        <p className="animate-fade text-lg md:text-xl text-white/70 mb-12 max-w-2xl mx-auto">
          Join thousands of satisfied customers who chose
          <span className="font-semibold text-white"> RideSphere </span>
          for their transportation needs.
        </p>

        <div className="flex flex-col sm:flex-row gap-8 justify-center">
          {/* Book Ride */}
          <Card
            className="animate-fade sm:w-1/3 rounded-2xl border border-white/10 shadow-lg hover:scale-110 transition-transform"
            variant="glass"
          >
            <CardHeader className="flex flex-col items-center">
              <Sparkles className="w-14 h-14 mb-4 text-yellow-400" />
              <CardTitle className="text-2xl text-white">Book Your Ride</CardTitle>
              <CardDescription className="text-white/70">
                Get from A to B with a touch of a button.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <BookNowButton />
            </CardContent>
          </Card>

          {/* Rewards Card */}
          <Card
            className="animate-fade sm:w-1/3 rounded-2xl border border-white/10 shadow-lg hover:scale-110 transition-transform bg-gradient-to-br from-yellow-100/80 to-white/80"
            variant="glass"
          >
            <CardHeader className="flex flex-col items-center">
              <span className="w-14 h-14 mb-4 flex items-center justify-center rounded-full bg-[#fcd129] text-black text-3xl">🏆</span>
              <CardTitle className="text-2xl text-black">Your Rewards</CardTitle>
              <CardDescription className="text-gray-700">Earn points for every ride. Redeem for discounts!</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <span className="text-3xl font-mono text-black">1200 pts</span>
              <button className="mt-2 bg-[#fcd129] text-black px-4 py-1 rounded-full font-semibold">Redeem</button>
            </CardContent>
          </Card>

          {/* Become Driver */}
          <Card
            className="animate-fade sm:w-1/3 rounded-2xl border border-white/10  shadow-lg hover:scale-105 transition-transform"
            variant="glass"
          >
            <CardHeader className="flex flex-col items-center">
              <Sparkles className="w-14 h-14 mb-4 text-yellow-400" />
              <CardTitle className="text-2xl text-white">Become a Driver</CardTitle>
              <CardDescription className="text-white/70">
                Join our network and earn on your own schedule.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <button className="px-8 py-4 rounded-full bg-[#fcd129] font-semibold text-black flex items-center gap-2 hover:scale-110 transition">
                Join Now 
              </button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Investors Section (styled like the image) */}
      <section className="flex flex-col md:flex-row items-center justify-between bg-[#2d2f38] py-16 px-8 rounded-2xl my-12 max-w-6xl mx-auto">
        <div className="flex-1 text-left text-white mb-8 md:mb-0">
          <h3 className="text-3xl font-bold mb-4">Book and move,<br />anywhere in the city</h3>
          <p className="text-lg text-white/80">Seamless mobility for users, drivers, and investors. Join us in revolutionizing urban transport.</p>
        </div>
        <div className="flex-1 flex justify-center">
          <Image src="/images/qr-playstore.png" alt="App QR" width={180} height={180} className="rounded-xl shadow" />
        </div>
      </section>

      {/* How It Works Section */}
      <HowItWorks />

      {/* Transparency Section */}
      <TransparencySection />

      {/* FAQ Section */}
      <FAQSection />
    </>
  );
}
