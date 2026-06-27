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
//     { id: "acknowledgement", title: "Acknowledgement", num: "4" },
//   ];

//   return (
//     <div className="flex min-h-screen flex-col bg-black text-white font-inter antialiased">
//       {/* Hero Section */}
//       <section className="relative w-full bg-gradient-to-b from-black to-black py-32 overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 via-transparent to-purple-600/5" />
//         <div className="container relative z-10 mx-auto flex h-[50vh] items-center justify-center px-4 text-center md:px-6">
//           <div className="space-y-6">
//             <h1 className="hero-text text-5xl font-bold tracking-tighter sm:text-7xl md:text-8xl">
//               Privacy <span className="text-yellow-400">Policy</span>
//             </h1>
//             <p className="hero-subtitle text-lg leading-relaxed text-slate-300 max-w-3xl mx-auto">
//               We value your trust. Our refund process is designed to be fair, transparent, and hassle-free.
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

//               {/* Intro */}
//               <div className="content-card rounded-2xl border border-white/20 bg-black/70 backdrop-blur-md p-10 shadow-xl hover:shadow-yellow-400/40 transition-all duration-500">
//                 <p className="text-xl leading-relaxed text-slate-300">
//                   This Refund Policy outlines the conditions under which refunds may be granted for payments made through DriWE. We are committed to ensuring transparency and fairness in all transactions.
//                 </p>
//               </div>

//               {/* 1. Eligibility */}
//               <section id="eligibility" className="content-card rounded-2xl border border-white/20 bg-black/70 backdrop-blur-md p-10 shadow-xl hover:shadow-yellow-400/40 transition-all">
//                 <h2 className="text-4xl font-bold mb-6">
//                   1. <span className="text-yellow-400">Eligibility for Refunds</span>
//                 </h2>
//                 <ul className="space-y-4 text-slate-300 text-lg">
//                   <li className="flex items-start gap-3">
//                     <span className="text-yellow-400 mt-1">•</span>
//                     <span>All refund requests must be submitted in writing within <strong className="text-yellow-400">two (2) calendar days (48 hours)</strong> from payment.</span>
//                   </li>
//                   <li className="flex items-start gap-3">
//                     <span className="text-yellow-400 mt-1">•</span>
//                     <span>Requests received after 48 hours will not be eligible under any circumstances.</span>
//                   </li>
//                 </ul>
//               </section>

//               {/* 2. Deductions */}
//               <section id="deductions" className="content-card rounded-2xl border border-white/20 bg-black/70 backdrop-blur-md p-10 shadow-xl hover:shadow-yellow-400/40 transition-all">
//                 <h2 className="text-4xl font-bold mb-6">
//                   2. <span className="text-yellow-400">Deductions and Fees</span>
//                 </h2>
//                 <ul className="space-y-4 text-slate-300 text-lg">
//                   <li className="flex items-start gap-3">
//                     <span className="text-yellow-400 mt-1">•</span>
//                     <span>Platform fees and payment processing charges will be deducted from the refundable amount.</span>
//                   </li>
//                   <li className="flex items-start gap-3">
//                     <span className="text-yellow-400 mt-1">•</span>
//                     <span>The net amount after deductions is considered final.</span>
//                   </li>
//                 </ul>
//               </section>

//               {/* 3. Mode */}
//               <section id="mode" className="content-card rounded-2xl border border-white/20 bg-black/70 backdrop-blur-md p-10 shadow-xl hover:shadow-yellow-400/40 transition-all">
//                 <h2 className="text-4xl font-bold mb-6">
//                   3. <span className="text-yellow-400">Mode of Refund</span>
//                 </h2>
//                 <ul className="space-y-4 text-slate-300 text-lg">
//                   <li className="flex items-start gap-3">
//                     <span className="text-yellow-400 mt-1">•</span>
//                     <span>Refunds processed via <strong className="text-yellow-400">original payment method</strong>.</span>
//                   </li>
//                   <li className="flex items-start gap-3">
//                     <span className="text-yellow-400 mt-1">•</span>
//                     <span>Processing time depends on payment provider — DriWE is not liable for delays.</span>
//                   </li>
//                 </ul>
//               </section>

//               {/* 4. Acknowledgement */}
//               <section id="acknowledgement" className="content-card rounded-2xl border border-white/20 bg-gradient-to-r from-yellow-400/10 to-purple-600/10 backdrop-blur-md p-10 shadow-xl hover:shadow-yellow-400/50 transition-all">
//                 <h2 className="text-4xl font-bold mb-6">
//                   4. <span className="text-yellow-400">Acknowledgement</span>
//                 </h2>
//                 <p className="text-xl leading-relaxed text-slate-200">
//                   By making a payment or using DriWE, you acknowledge that you have read, understood, and agree to be bound by this Refund Policy.
//                 </p>
//               </section>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }





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
    { id: "collection", title: "Information Collection", num: "1" },
    { id: "use", title: "Use of Information", num: "2" },
    { id: "sharing", title: "Data Sharing", num: "3" },
    { id: "security", title: "Data Security", num: "4" },
    { id: "rights", title: "User Rights", num: "5" },
    { id: "googleplay", title: "Google Play Store Compliance", num: "6" },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-black text-white font-inter antialiased">
      {/* Hero Section */}
      <section className="relative w-full bg-gradient-to-b from-black to-black py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 via-transparent to-purple-600/5" />
        <div className="container relative z-10 mx-auto flex h-[50vh] items-center justify-center px-4 text-center md:px-6">
          <div className="space-y-6">
            <h1 className="hero-text text-5xl font-bold tracking-tighter sm:text-7xl md:text-8xl">
              Privacy <span className="text-yellow-400">Policy</span>
            </h1>
            <p className="hero-subtitle text-lg leading-relaxed text-slate-300 max-w-3xl mx-auto">
              Your privacy is important to us. This Privacy Policy explains how DriWE collects, uses, protects, and shares your information while ensuring compliance with Google Play Store policies.
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
              <section
                id="collection"
                className="content-card rounded-2xl border border-white/20 bg-black/70 backdrop-blur-md p-10 shadow-xl hover:shadow-yellow-400/40 transition-all"
              >
                <h2 className="text-4xl font-bold mb-6">
                  1. <span className="text-yellow-400">Information Collection</span>
                </h2>

                <ul className="space-y-4 text-slate-300 text-lg">
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-400 mt-1">•</span>
                    <span>
                      <strong className="text-yellow-400">Personal Information:</strong> Name,
                      phone number, email address, and location data.
                    </span>
                  </li>

                  <li className="flex items-start gap-3">
                    <span className="text-yellow-400 mt-1">•</span>
                    <span>
                      <strong className="text-yellow-400">Payment Information:</strong> Credit /
                      debit card details or digital wallet information.
                    </span>
                  </li>

                  <li className="flex items-start gap-3">
                    <span className="text-yellow-400 mt-1">•</span>
                    <span>
                      <strong className="text-yellow-400">Usage Data:</strong> Ride history,
                      preferences, and interactions with the App.
                    </span>
                  </li>
                </ul>
              </section>

              {/* 2. Deductions */}
              <section
                id="use"
                className="content-card rounded-2xl border border-white/20 bg-black/70 backdrop-blur-md p-10 shadow-xl hover:shadow-yellow-400/40 transition-all"
              >
                <h2 className="text-4xl font-bold mb-6">
                  2. <span className="text-yellow-400">Use of Information</span>
                </h2>

                <ul className="space-y-4 text-slate-300 text-lg">
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-400 mt-1">•</span>
                    <span>To facilitate ride bookings and process payments.</span>
                  </li>

                  <li className="flex items-start gap-3">
                    <span className="text-yellow-400 mt-1">•</span>
                    <span>To personalize user experience and improve service quality.</span>
                  </li>

                  <li className="flex items-start gap-3">
                    <span className="text-yellow-400 mt-1">•</span>
                    <span>To comply with legal obligations and resolve disputes.</span>
                  </li>
                </ul>
              </section>

              {/* 3. Mode */}
              <section
                id="sharing"
                className="content-card rounded-2xl border border-white/20 bg-black/70 backdrop-blur-md p-10 shadow-xl hover:shadow-yellow-400/40 transition-all"
              >
                <h2 className="text-4xl font-bold mb-6">
                  3. <span className="text-yellow-400">Data Sharing</span>
                </h2>

                <ul className="space-y-4 text-slate-300 text-lg">
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-400 mt-1">•</span>
                    <span>Drivers for ride coordination.</span>
                  </li>

                  <li className="flex items-start gap-3">
                    <span className="text-yellow-400 mt-1">•</span>
                    <span>Third-party service providers (such as payment processors).</span>
                  </li>

                  <li className="flex items-start gap-3">
                    <span className="text-yellow-400 mt-1">•</span>
                    <span>Law enforcement agencies when required by applicable law.</span>
                  </li>
                </ul>
              </section>

              {/* 4. Acknowledgement */}
              <section
                id="security"
                className="content-card rounded-2xl border border-white/20 bg-black/70 backdrop-blur-md p-10 shadow-xl hover:shadow-yellow-400/40 transition-all"
              >
                <h2 className="text-4xl font-bold mb-6">
                  4. <span className="text-yellow-400">Data Security</span>
                </h2>

                <ul className="space-y-4 text-slate-300 text-lg">
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-400 mt-1">•</span>
                    <span>
                      We implement industry-standard security measures to protect your
                      personal information.
                    </span>
                  </li>

                  <li className="flex items-start gap-3">
                    <span className="text-yellow-400 mt-1">•</span>
                    <span>
                      However, no method of internet transmission is completely secure, and
                      we cannot guarantee absolute security.
                    </span>
                  </li>
                </ul>
              </section>


              <section
                id="rights"
                className="content-card rounded-2xl border border-white/20 bg-black/70 backdrop-blur-md p-10 shadow-xl hover:shadow-yellow-400/40 transition-all"
              >
                <h2 className="text-4xl font-bold mb-6">
                  5. <span className="text-yellow-400">User Rights</span>
                </h2>

                <ul className="space-y-4 text-slate-300 text-lg">
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-400 mt-1">•</span>
                    <span>Access, correct, or delete your personal information.</span>
                  </li>

                  <li className="flex items-start gap-3">
                    <span className="text-yellow-400 mt-1">•</span>
                    <span>
                      Withdraw consent for data processing, subject to applicable laws.
                    </span>
                  </li>

                  <li className="flex items-start gap-3">
                    <span className="text-yellow-400 mt-1">•</span>
                    <span>
                      To exercise these rights, contact us at{" "}
                      <span className="text-yellow-400 font-semibold">
                        hello@driwe.in
                      </span>
                      .
                    </span>
                  </li>
                </ul>
              </section>



              <section
                id="googleplay"
                className="content-card rounded-2xl border border-white/20 bg-gradient-to-r from-yellow-400/10 to-purple-600/10 backdrop-blur-md p-10 shadow-xl hover:shadow-yellow-400/50 transition-all"
              >
                <h2 className="text-4xl font-bold mb-8">
                  6. <span className="text-yellow-400">Google Play Store Compliance</span>
                </h2>

                <div className="space-y-8 text-slate-300 text-lg">

                  <div>
                    <h3 className="text-2xl font-semibold text-yellow-400 mb-3">
                      6.1 Content Guidelines
                    </h3>
                    <ul className="space-y-2">
                      <li>• The App complies with Google Play Store content policies.</li>
                      <li>
                        • The App does not promote violence, hate speech, gambling, alcohol,
                        tobacco, or adult content.
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold text-yellow-400 mb-3">
                      6.2 Advertising and Monetization
                    </h3>
                    <ul className="space-y-2">
                      <li>• The App does not display intrusive advertisements.</li>
                      <li>• In-app purchases and subscriptions are clearly disclosed.</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold text-yellow-400 mb-3">
                      6.3 Permissions
                    </h3>
                    <ul className="space-y-2">
                      <li>
                        • The App requests only the permissions required to provide its
                        services, including location access.
                      </li>
                      <li>
                        • Users can manage permissions through their device settings.
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold text-yellow-400 mb-3">
                      6.4 Updates and Maintenance
                    </h3>
                    <ul className="space-y-2">
                      <li>
                        • Regular updates are released to fix bugs, improve performance, and
                        introduce new features.
                      </li>
                      <li>
                        • Users are encouraged to keep the App updated for the best
                        experience.
                      </li>
                    </ul>
                  </div>

                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}







