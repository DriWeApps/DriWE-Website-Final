"use client";

import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger, ScrollToPlugin } from "gsap/all";

export default function CancellationPolicyPage() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    gsap.fromTo(".hero-text", { opacity: 0, y: -30 }, { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" });
    gsap.fromTo(".hero-subtitle", { opacity: 0 }, { opacity: 1, duration: 1, delay: 0.6 });

    gsap.fromTo(
      ".table-of-contents",
      { opacity: 0, x: -60 },
      { opacity: 1, x: 0, duration: 1, delay: 0.8, ease: "power3.out" }
    );

    const cards = document.querySelectorAll(".content-card");
    cards.forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: i * 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 85%", toggleActions: "play none none none" },
        }
      );
    });

    document.querySelectorAll(".toc-link").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const target = link.getAttribute("href");
        if (target) {
          gsap.to(window, { duration: 1.2, scrollTo: { y: target, offsetY: 100 }, ease: "power3.inOut" });
        }
      });
    });
  }, []);

  const sections = [
    { id: "effective-date", title: "Effective Date", num: "1" },
    { id: "driver-rules", title: "Driver Cancellation Rules", num: "2" },
    { id: "rider-rules", title: "Rider Cancellation Rules", num: "3" },
    { id: "payments", title: "Payments", num: "4" },
    { id: "misuse", title: "Misuse and Enforcement", num: "5" },
    { id: "support", title: "Contact Support", num: "6" },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-black text-white font-inter antialiased">
      {/* Hero Section */}
      <section className="relative w-full bg-gradient-to-b from-black to-black py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 via-transparent to-purple-600/5" />
        <div className="container relative z-10 mx-auto flex h-[50vh] items-center justify-center px-4 text-center md:px-6">
          <div className="space-y-6">
            <h1 className="hero-text text-5xl font-bold tracking-tighter sm:text-7xl md:text-8xl">
              Cancellation <span className="text-yellow-400">Policy</span>
            </h1>
            <p className="hero-subtitle text-lg leading-relaxed text-slate-300 max-w-3xl mx-auto">
              At DriWE, we are committed to providing a reliable and transparent platform for both riders and drivers. The following policy outlines how ride cancellations are handled within the DriWE app.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative z-10 w-full bg-black py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-4">
            {/* Sticky Table of Contents */}
            <div className="lg:col-span-1">
              <div className="table-of-contents sticky top-8 rounded-2xl border border-white/20 bg-black/80 backdrop-blur-lg p-8 shadow-2xl hover:shadow-yellow-400/30 transition-all duration-500">
                <h3 className="mb-6 text-2xl font-bold">
                  <span className="text-yellow-400">Table of Contents</span>
                </h3>
                <nav className="space-y-4">
                  {sections.map((sec) => (
                    <a
                      key={sec.id}
                      href={`#${sec.id}`}
                      className="toc-link block text-slate-400 hover:text-yellow-400 transition-colors duration-300 text-sm font-medium"
                    >
                      {sec.num}. {sec.title}
                    </a>
                  ))}
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-12">

              {/* 1. Effective Date */}
              <section id="effective-date" className="content-card rounded-2xl border border-white/20 bg-black/70 backdrop-blur-md p-10 shadow-xl hover:shadow-yellow-400/40 transition-all">
                <h2 className="text-4xl font-bold mb-6">
                  1. <span className="text-yellow-400">Effective Date</span>
                </h2>
                <p className="text-xl leading-relaxed text-slate-300">
                  <strong className="text-yellow-400">06-11-2025</strong>
                </p>
              </section>

              {/* 2. Driver Cancellation Rules */}
              <section id="driver-rules" className="content-card rounded-2xl border border-white/20 bg-black/70 backdrop-blur-md p-10 shadow-xl hover:shadow-yellow-400/40 transition-all">
                <h2 className="text-4xl font-bold mb-6">
                  2. <span className="text-yellow-400">Driver Cancellation Rules</span>
                </h2>
                <ul className="space-y-4 text-slate-300 text-lg">
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-400 mt-1">•</span>
                    <span>Once a driver receives a ride request, they have only one choice — to either <strong>Accept</strong> or <strong>Reject</strong> the ride.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-400 mt-1">•</span>
                    <span>After accepting the ride, the driver <strong>cannot cancel it through the app</strong>.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-400 mt-1">•</span>
                    <span>If, due to any reason, the driver cannot continue with the ride after accepting it, the driver <strong>must personally contact the rider</strong> and request the rider to cancel it from their end.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-400 mt-1">•</span>
                    <span>Drivers repeatedly unable to complete accepted rides may face <strong>account review, penalties, or suspension</strong> for violating platform rules.</span>
                  </li>
                </ul>
              </section>

              {/* 3. Rider Cancellation Rules */}
              <section id="rider-rules" className="content-card rounded-2xl border border-white/20 bg-black/70 backdrop-blur-md p-10 shadow-xl hover:shadow-yellow-400/40 transition-all">
                <h2 className="text-4xl font-bold mb-6">
                  3. <span className="text-yellow-400">Rider Cancellation Rules</span>
                </h2>
                <ul className="space-y-4 text-slate-300 text-lg">
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-400 mt-1">•</span>
                    <span>Riders may cancel a ride <strong>before the driver reaches the pickup location</strong>.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-400 mt-1">•</span>
                    <span>Frequent cancellations by a rider may affect their <strong>booking reliability</strong> and can lead to <strong>temporary suspension</strong> from DriWE.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-400 mt-1">•</span>
                    <span>Once the driver has entered the OTP and the ride has officially started, the rider <strong>cannot cancel the ride</strong>.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-400 mt-1">•</span>
                    <span>If the rider still wishes to end the trip after OTP entry, they must <strong>settle the payment directly with the driver</strong> for the completed part of the ride.</span>
                  </li>
                </ul>
              </section>

              {/* 4. Payments */}
              <section id="payments" className="content-card rounded-2xl border border-white/20 bg-black/70 backdrop-blur-md p-10 shadow-xl hover:shadow-yellow-400/40 transition-all">
                <h2 className="text-4xl font-bold mb-6">
                  4. <span className="text-yellow-400">Payments</span>
                </h2>
                <ul className="space-y-4 text-slate-300 text-lg">
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-400 mt-1">•</span>
                    <span>All payments are made <strong>directly from the rider to the driver</strong>.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-400 mt-1">•</span>
                    <span>DriWE <strong>does not handle or process any payments</strong>, so there will be <strong>no refunds or reversals</strong> from the platform.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-400 mt-1">•</span>
                    <span>Any payment misunderstandings must be <strong>mutually resolved</strong> between the rider and driver.</span>
                  </li>
                </ul>
              </section>

              {/* 5. Misuse and Enforcement */}
              <section id="misuse" className="content-card rounded-2xl border border-white/20 bg-black/70 backdrop-blur-md p-10 shadow-xl hover:shadow-red-400/40 transition-all">
                <h2 className="text-4xl font-bold mb-6">
                  5. <span className="text-red-400">Misuse and Enforcement</span>
                </h2>
                <ul className="space-y-4 text-slate-300 text-lg">
                  <li className="flex items-start gap-3">
                    <span className="text-red-400 mt-1">•</span>
                    <span>Misuse of the cancellation feature or repeated violations of this policy (by either driver or rider) may result in <strong>temporary or permanent suspension</strong> from the DriWE platform.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-400 mt-1">•</span>
                    <span><strong>DriWE reserves the right to modify, update, or enforce additional actions</strong> if necessary to maintain service quality.</span>
                  </li>
                </ul>
              </section>

              {/* 6. Contact Support */}
              <section id="support" className="content-card rounded-2xl border border-white/20 bg-gradient-to-r from-yellow-400/10 to-purple-600/10 backdrop-blur-md p-10 shadow-xl hover:shadow-yellow-400/50 transition-all">
                <h2 className="text-4xl font-bold mb-6">
                  6. <span className="text-yellow-400">Contact Support</span>
                </h2>
                <p className="text-xl leading-relaxed text-slate-200">
                  For queries or to report cancellation-related issues:
                </p>
                <div className="mt-6 space-y-3">
                  <p className="text-lg">
                    <strong>Email:</strong> <a href="mailto:hello@driwe.in" className="text-yellow-400 hover:underline">hello@driwe.in</a>
                  </p>
                  <p className="text-lg">
                    <strong>Phone:</strong> <a href="tel:+918698889996" className="text-yellow-400 hover:underline">+91 86988 89996</a>
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}