// "use client";

// import React, { useEffect } from "react";
// import gsap from "gsap";
// import { ScrollTrigger, ScrollToPlugin } from "gsap/all";

// export default function RefundPolicyPage() {
//   useEffect(() => {
//     gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

//     gsap.fromTo(".hero-text", { opacity: 0, y: -30 }, { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" });
//     gsap.fromTo(".hero-subtitle", { opacity: 0 }, { opacity: 1, duration: 1, delay: 0.6 });

//     gsap.fromTo(
//       ".table-of-contents",
//       { opacity: 0, x: -60 },
//       { opacity: 1, x: 0, duration: 1, delay: 0.8, ease: "power3.out" }
//     );

//     const cards = document.querySelectorAll(".content-card");
//     cards.forEach((card, i) => {
//       gsap.fromTo(
//         card,
//         { opacity: 0, y: 60 },
//         {
//           opacity: 1,
//           y: 0,
//           duration: 1,
//           delay: i * 0.1,
//           ease: "power3.out",
//           scrollTrigger: { trigger: card, start: "top 85%", toggleActions: "play none none none" },
//         }
//       );
//     });

//     document.querySelectorAll(".toc-link").forEach((link) => {
//       link.addEventListener("click", (e) => {
//         e.preventDefault();
//         const target = link.getAttribute("href");
//         if (target) {
//           gsap.to(window, { duration: 1.2, scrollTo: { y: target, offsetY: 100 }, ease: "power3.inOut" });
//         }
//       });
//     });
//   }, []);

//   const sections = [
//     { id: "eligibility", title: "Eligibility for Refunds", num: "1" },
//     { id: "deductions", title: "Deductions and Fees", num: "2" },
//     { id: "mode", title: "Mode of Refund", num: "3" },
//     { id: "non-refundable", title: "Non-Refundable Payments", num: "4" },
//     { id: "acknowledgement", title: "Acknowledgement", num: "5" },
//   ];

//   return (
//     <div className="flex min-h-screen flex-col bg-black text-white font-inter antialiased">
//       {/* Hero Section */}
//       <section className="relative w-full bg-gradient-to-b from-black to-black py-32 overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 via-transparent to-purple-600/5" />
//         <div className="container relative z-10 mx-auto flex h-[50vh] items-center justify-center px-4 text-center md:px-6">
//           <div className="space-y-6">
//             <h1 className="hero-text text-5xl font-bold tracking-tighter sm:text-7xl md:text-8xl">
//               Refund <span className="text-yellow-400">Policy</span>
//             </h1>
//             <p className="hero-subtitle text-lg leading-relaxed text-slate-300 max-w-3xl mx-auto">
//               We are committed to transparency and fairness in all transactions. This Refund Policy outlines the conditions under which refunds may be granted.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Main Content */}
//       <section className="relative z-10 w-full bg-black py-20">
//         <div className="container mx-auto px-4 md:px-6">
//           <div className="grid gap-10 lg:grid-cols-4">
//             {/* Sticky Table of Contents */}
//             <div className="lg:col-span-1">
//               <div className="table-of-contents sticky top-8 rounded-2xl border border-white/20 bg-black/80 backdrop-blur-lg p-8 shadow-2xl hover:shadow-yellow-400/30 transition-all duration-500">
//                 <h3 className="mb-6 text-2xl font-bold">
//                   <span className="text-yellow-400">Table of Contents</span>
//                 </h3>
//                 <nav className="space-y-4">
//                   {sections.map((sec) => (
//                     <a
//                       key={sec.id}
//                       href={`#${sec.id}`}
//                       className="toc-link block text-slate-400 hover:text-yellow-400 transition-colors duration-300 text-sm font-medium"
//                     >
//                       {sec.num}. {sec.title}
//                     </a>
//                   ))}
//                 </nav>
//               </div>
//             </div>

//             {/* Main Content */}
//             <div className="lg:col-span-3 space-y-12">

//               {/* 1. Eligibility for Refunds */}
//               <section id="eligibility" className="content-card rounded-2xl border border-white/20 bg-black/70 backdrop-blur-md p-10 shadow-xl hover:shadow-yellow-400/40 transition-all">
//                 <h2 className="text-4xl font-bold mb-6">
//                   1. <span className="text-yellow-400">Eligibility for Refunds</span>
//                 </h2>
//                 <ul className="space-y-4 text-slate-300 text-lg">
//                   <li className="flex items-start gap-3">
//                     <span className="text-yellow-400 mt-1">•</span>
//                     <span>All requests for refunds must be submitted in writing to our support team within <strong>two (2) calendar days (48 hours)</strong> from the date of payment.</span>
//                   </li>
//                   <li className="flex items-start gap-3">
//                     <span className="text-yellow-400 mt-1">•</span>
//                     <span>Refund requests received after this period shall not be eligible for consideration under any circumstances.</span>
//                   </li>
//                 </ul>
//               </section>

//               {/* 2. Deductions and Fees */}
//               <section id="deductions" className="content-card rounded-2xl border border-white/20 bg-black/70 backdrop-blur-md p-10 shadow-xl hover:shadow-yellow-400/40 transition-all">
//                 <h2 className="text-4xl font-bold mb-6">
//                   2. <span className="text-yellow-400">Deductions and Fees</span>
//                 </h2>
//                 <ul className="space-y-4 text-slate-300 text-lg">
//                   <li className="flex items-start gap-3">
//                     <span className="text-yellow-400 mt-1">•</span>
//                     <span>In the event a refund request is approved, the applicable <strong>platform fee and/or payment processing charges</strong> shall be deducted from the refundable amount prior to remittance.</span>
//                   </li>
//                   <li className="flex items-start gap-3">
//                     <span className="text-yellow-400 mt-1">•</span>
//                     <span>The net amount, after such deductions, shall be considered the <strong>final refundable sum</strong>.</span>
//                   </li>
//                 </ul>
//               </section>

//               {/* 3. Mode of Refund */}
//               <section id="mode" className="content-card rounded-2xl border border-white/20 bg-black/70 backdrop-blur-md p-10 shadow-xl hover:shadow-yellow-400/40 transition-all">
//                 <h2 className="text-4xl font-bold mb-6">
//                   3. <span className="text-yellow-400">Mode of Refund</span>
//                 </h2>
//                 <ul className="space-y-4 text-slate-300 text-lg">
//                   <li className="flex items-start gap-3">
//                     <span className="text-yellow-400 mt-1">•</span>
//                     <span>All approved refunds will be processed using the <strong>original method of payment</strong> used at the time of the transaction.</span>
//                   </li>
//                   <li className="flex items-start gap-3">
//                     <span className="text-yellow-400 mt-1">•</span>
//                     <span>Processing timelines may vary depending on the payment provider, and the Company shall not be held liable for delays attributable to third-party payment gateways or financial institutions.</span>
//                   </li>
//                 </ul>
//               </section>

//               {/* 4. Non-Refundable Payments */}
//               <section id="non-refundable" className="content-card rounded-2xl border border-white/20 bg-black/70 backdrop-blur-md p-10 shadow-xl hover:shadow-red-400/40 transition-all">
//                 <h2 className="text-4xl font-bold mb-6">
//                   4. <span className="text-red-400">Non-Refundable Payments</span>
//                 </h2>
//                 <ul className="space-y-4 text-slate-300 text-lg">
//                   <li className="flex items-start gap-3">
//                     <span className="text-red-400 mt-1">•</span>
//                     <span>Any payments made outside the stipulated refund period shall be deemed <strong>non-refundable</strong>.</span>
//                   </li>
//                   <li className="flex items-start gap-3">
//                     <span className="text-red-400 mt-1">•</span>
//                     <span>The Company reserves the right to reject any refund request that does not comply with the terms set forth herein.</span>
//                   </li>
//                 </ul>
//               </section>

//               {/* 5. Acknowledgement */}
//               <section id="acknowledgement" className="content-card rounded-2xl border border-white/20 bg-gradient-to-r from-yellow-400/10 to-purple-600/10 backdrop-blur-md p-10 shadow-xl hover:shadow-yellow-400/50 transition-all">
//                 <h2 className="text-4xl font-bold mb-6">
//                   5. <span className="text-yellow-400">Acknowledgement</span>
//                 </h2>
//                 <p className="text-xl leading-relaxed text-slate-200">
//                   By proceeding with a payment, the User expressly acknowledges that they have read, understood, and agreed to be bound by this <strong>Refund Policy</strong>.
//                 </p>
//               </section>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }


// app/refund/page.tsx
"use client";

import React, { useEffect } from "react";
import gsap from "gsap";

export default function RefundPolicyPage() {
  useEffect(() => {
    gsap.fromTo(
      ".hero-text",
      { opacity: 0, y: -30 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
      }
    );

    gsap.fromTo(
      ".hero-subtitle",
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1,
        delay: 0.6,
      }
    );

    gsap.fromTo(
      ".content-card",
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
      }
    );
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">

      {/* HERO */}
      <section className="relative py-32">

        <div className="container mx-auto px-4 text-center">

          <h1 className="hero-text text-5xl md:text-7xl font-bold">
            Refund <span className="text-yellow-400">Policy</span>
          </h1>

          <p className="hero-subtitle mt-8 text-slate-300 max-w-4xl mx-auto text-lg">
            We are committed to transparency and fairness in all transactions.
            This Refund Policy outlines the conditions under which refunds may
            be granted.
          </p>

        </div>

      </section>

      {/* CONTENT */}
      <section className="pb-20 px-4">

        <div className="container max-w-6xl mx-auto">

          <div className="content-card rounded-2xl border border-white/20 bg-black p-10 shadow-xl hover:shadow-yellow-400/40 transition">

            <div className="space-y-12 text-slate-300 text-lg leading-8">

              <div>
                <h3 className="text-3xl font-bold text-yellow-400 mb-4">
                  1. Eligibility for Refunds
                </h3>

                <div className="space-y-3">
                  <p>
                    All requests for refunds must be submitted in writing to
                    our support team within two (2) calendar days (48 hours)
                    from the date of payment.
                  </p>

                  <p>
                    Refund requests received after this period shall not be
                    eligible for consideration under any circumstances.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-yellow-400 mb-4">
                  2. Deductions and Fees
                </h3>

                <div className="space-y-3">
                  <p>
                    In the event a refund request is approved, the applicable
                    platform fee and/or payment processing charges shall be
                    deducted from the refundable amount prior to remittance.
                  </p>

                  <p>
                    The net amount, after such deductions, shall be considered
                    the final refundable sum.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-yellow-400 mb-4">
                  3. Mode of Refund
                </h3>

                <div className="space-y-3">
                  <p>
                    All approved refunds will be processed using the original
                    method of payment used at the time of the transaction.
                  </p>

                  <p>
                    Processing timelines may vary depending on the payment
                    provider, and the Company shall not be held liable for
                    delays attributable to third-party payment gateways or
                    financial institutions.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-yellow-400 mb-4">
                  4. Non-Refundable Payments
                </h3>

                <div className="space-y-3">
                  <p>
                    Any payments made outside the stipulated refund period
                    shall be deemed non-refundable.
                  </p>

                  <p>
                    The Company reserves the right to reject any refund request
                    that does not comply with the terms set forth herein.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-yellow-400 mb-4">
                  5. Acknowledgement
                </h3>

                <div className="space-y-3">
                  <p>
                    By proceeding with a payment, the User expressly
                    acknowledges that they have read, understood, and agreed
                    to be bound by this Refund Policy.
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}