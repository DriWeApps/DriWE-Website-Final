"use client";

import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger, ScrollToPlugin } from "gsap/all";

export default function RefundPolicyPage() {
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
    { id: "eligibility", title: "Eligibility for Refunds", num: "1" },
    { id: "deductions", title: "Deductions and Fees", num: "2" },
    { id: "mode", title: "Mode of Refund", num: "3" },
    { id: "non-refundable", title: "Non-Refundable Payments", num: "4" },
    { id: "cancellation", title: "Cancellation Policy", num: "5" },
    { id: "acknowledgement", title: "Acknowledgement", num: "6" },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-black text-white font-inter antialiased">
      {/* Hero Section */}
      <section className="relative w-full bg-gradient-to-b from-black to-black py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 via-transparent to-purple-600/5" />
        <div className="container relative z-10 mx-auto flex h-[50vh] items-center justify-center px-4 text-center md:px-6">
          <div className="space-y-6">
            <h1 className="hero-text text-5xl font-bold tracking-tighter sm:text-7xl md:text-8xl">
              Refund <span className="text-yellow-400">Policy</span>
            </h1>
            <p className="hero-subtitle text-lg leading-relaxed text-slate-300 max-w-3xl mx-auto">
              We value your trust. Our refund process is designed to be fair, transparent, and hassle-free.
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

              {/* Intro */}
              <div className="content-card rounded-2xl border border-white/20 bg-black/70 backdrop-blur-md p-10 shadow-xl hover:shadow-yellow-400/40 transition-all duration-500">
                <p className="text-xl leading-relaxed text-slate-300">
                  This Refund Policy outlines the conditions under which refunds may be granted for payments made through DriWE. We are committed to ensuring transparency and fairness in all transactions.
                </p>
              </div>

              {/* 1. Eligibility */}
              <section id="eligibility" className="content-card rounded-2xl border border-white/20 bg-black/70 backdrop-blur-md p-10 shadow-xl hover:shadow-yellow-400/40 transition-all">
                <h2 className="text-4xl font-bold mb-6">
                  1. <span className="text-yellow-400">Eligibility for Refunds</span>
                </h2>
                <ul className="space-y-4 text-slate-300 text-lg">
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-400 mt-1">•</span>
                    <span>All refund requests must be submitted in writing within <strong className="text-yellow-400">two (2) calendar days (48 hours)</strong> from payment.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-400 mt-1">•</span>
                    <span>Requests received after 48 hours will not be eligible under any circumstances.</span>
                  </li>
                </ul>
              </section>

              {/* 2. Deductions */}
              <section id="deductions" className="content-card rounded-2xl border border-white/20 bg-black/70 backdrop-blur-md p-10 shadow-xl hover:shadow-yellow-400/40 transition-all">
                <h2 className="text-4xl font-bold mb-6">
                  2. <span className="text-yellow-400">Deductions and Fees</span>
                </h2>
                <ul className="space-y-4 text-slate-300 text-lg">
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-400 mt-1">•</span>
                    <span>Platform fees and payment processing charges will be deducted from the refundable amount.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-400 mt-1">•</span>
                    <span>The net amount after deductions is considered final.</span>
                  </li>
                </ul>
              </section>

              {/* 3. Mode */}
              <section id="mode" className="content-card rounded-2xl border border-white/20 bg-black/70 backdrop-blur-md p-10 shadow-xl hover:shadow-yellow-400/40 transition-all">
                <h2 className="text-4xl font-bold mb-6">
                  3. <span className="text-yellow-400">Mode of Refund</span>
                </h2>
                <ul className="space-y-4 text-slate-300 text-lg">
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-400 mt-1">•</span>
                    <span>Refunds processed via <strong className="text-yellow-400">original payment method</strong>.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-400 mt-1">•</span>
                    <span>Processing time depends on payment provider — DriWE is not liable for delays.</span>
                  </li>
                </ul>
              </section>

              {/* 4. Non-refundable */}
              <section id="non-refundable" className="content-card rounded-2xl border border-white/20 bg-black/70 backdrop-blur-md p-10 shadow-xl hover:shadow-red-400/40 transition-all">
                <h2 className="text-4xl font-bold mb-6">
                  4. <span className="text-red-400">Non-Refundable Payments</span>
                </h2>
                <ul className="space-y-4 text-slate-300 text-lg">
                  <li className="flex items-start gap-3">
                    <span className="text-red-400 mt-1">•</span>
                    <span>Payments outside the 48-hour window are <strong className="text-red-400">non-refundable</strong>.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-400 mt-1">•</span>
                    <span>DriWE reserves the right to reject non-compliant requests.</span>
                  </li>
                </ul>
              </section>

              {/* 5. NEW: CANCELLATION & NO-REFUND POLICY */}
              <section id="cancellation" className="content-card rounded-2xl border border-white/20 bg-black/70 backdrop-blur-md p-10 shadow-xl hover:shadow-yellow-500/50 transition-all">
                <h2 className="text-4xl font-bold mb-8">
                  5. <span className="text-yellow-400">Cancellation Policy</span>
                </h2>

                {/* 1. Driver Cancellation Rules */}
                <div className="mb-10">
                  <h3 className="text-2xl font-bold text-yellow-400 mb-4">1. Driver Cancellation Rules</h3>
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
                </div>

                {/* 2. Rider Cancellation Rules */}
                <div className="mb-10">
                  <h3 className="text-2xl font-bold text-yellow-400 mb-4">2. Rider Cancellation Rules</h3>
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
                </div>

                {/* 3. Payments */}
                <div className="mb-10">
                  <h3 className="text-2xl font-bold text-yellow-400 mb-4">3. Payments</h3>
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
                </div>

                {/* 4. Misuse and Enforcement */}
                <div>
                  <h3 className="text-2xl font-bold text-yellow-400 mb-4">4. Misuse and Enforcement</h3>
                  <ul className="space-y-4 text-slate-300 text-lg">
                    <li className="flex items-start gap-3">
                      <span className="text-yellow-400 mt-1">•</span>
                      <span>Misuse of the cancellation feature or repeated violations of this policy (by either driver or rider) may result in <strong>temporary or permanent suspension</strong> from the DriWE platform.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-yellow-400 mt-1">•</span>
                      <span><strong>DriWE reserves the right to modify, update, or enforce additional actions</strong> if necessary to maintain service quality.</span>
                    </li>
                  </ul>
                </div>
              </section>

              {/* 6. Acknowledgement */}
              <section id="acknowledgement" className="content-card rounded-2xl border border-white/20 bg-gradient-to-r from-yellow-400/10 to-purple-600/10 backdrop-blur-md p-10 shadow-xl hover:shadow-yellow-400/50 transition-all">
                <h2 className="text-4xl font-bold mb-6">
                  6. <span className="text-yellow-400">Acknowledgement</span>
                </h2>
                <p className="text-xl leading-relaxed text-slate-200">
                  By making a payment or using DriWE, you acknowledge that you have read, understood, and agree to be bound by this Refund Policy, including the <strong>strict no-refund policy for cancellations</strong> and direct rider-driver payment model.
                </p>
              </section>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}