// app/shipping/page.tsx
"use client";

import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger, ScrollToPlugin } from "gsap/all";

export default function ShippingPolicyPage() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    // Hero
    gsap.fromTo(".hero-text", { opacity: 0, y: -30 }, { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" });
    gsap.fromTo(".hero-subtitle", { opacity: 0 }, { opacity: 1, duration: 1, delay: 0.6 });

    // Content cards
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

    // Smooth scroll for all TOC links (mobile + desktop)
    document.querySelectorAll(".toc-link").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const target = link.getAttribute("href");
        if (target) {
          gsap.to(window, {
            duration: 1.2,
            scrollTo: { y: target, offsetY: 100 },
            ease: "power3.inOut",
          });
        }
      });
    });
  }, []);

  const sections = [
    { id: "intro", title: "Introduction", num: "1" },
    { id: "coverage", title: "Service Coverage", num: "2" },
    { id: "order", title: "Order Placement & Confirmation", num: "3" },
    { id: "pickup", title: "Pick-up & Delivery", num: "4" },
    { id: "restrictions", title: "Item Restrictions", num: "5" },
    { id: "timeline", title: "Delivery Timelines", num: "6" },
    { id: "charges", title: "Shipping Charges", num: "7" },
    { id: "tracking", title: "Tracking", num: "8" },
    { id: "cancellations", title: "Cancellations", num: "9" },
    { id: "liability", title: "Liability & Claims", num: "10" },
    { id: "support", title: "Customer Support", num: "11" },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-black text-white font-inter antialiased">

      {/* Hero Section */}
      <section className="relative w-full bg-gradient-to-b from-black to-black py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 via-transparent to-purple-600/5" />
        <div className="container relative z-10 mx-auto flex h-[50vh] items-center justify-center px-4 text-center md:px-6">
          <div className="space-y-6">
            <h1 className="hero-text text-5xl font-bold tracking-tighter sm:text-7xl md:text-8xl">
              Shipping <span className="text-yellow-400">Policy</span>
            </h1>
            <p className="hero-subtitle text-lg leading-relaxed text-slate-300 max-w-3xl mx-auto">
              At DriWE, we are committed to providing reliable and hassle-free logistics and delivery services. This Shipping Policy outlines how goods are picked up, transported, and delivered through our platform.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative z-10 w-full bg-black py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-4">

            {/* Mobile Table of Contents – Shows only on mobile */}
            <div className="lg:hidden mb-8">
              <div className="rounded-2xl border border-white/20 bg-black/80 backdrop-blur-lg p-8 shadow-2xl">
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

            {/* Desktop Sticky TOC */}
            <div className="hidden lg:block lg:col-span-1">
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

            {/* Main Content Area */}
            <div className="lg:col-span-3 space-y-12">

              {/* 1. Introduction */}
              <section id="intro" className="content-card rounded-2xl border border-white/20 bg-black/70 backdrop-blur-md p-10 shadow-xl hover:shadow-yellow-400/40 transition-all">
                <h2 className="text-4xl font-bold mb-6">
                  1. <span className="text-yellow-400">Introduction</span>
                </h2>
                <p className="text-xl leading-relaxed text-slate-300">
                  <strong>Shipping Policy — DriWE Smartech Private Ltd</strong>
                </p>
              </section>

              {/* 2. Service Coverage */}
              <section id="coverage" className="content-card rounded-2xl border border-white/20 bg-black/70 backdrop-blur-md p-10 shadow-xl hover:shadow-yellow-400/40 transition-all">
                <h2 className="text-4xl font-bold mb-6">
                  2. <span className="text-yellow-400">Service Coverage</span>
                </h2>
                <ul className="space-y-4 text-slate-300 text-lg">
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-400 mt-1">•</span>
                    <span>Our shipping services are <strong>currently available in Pune</strong>.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-400 mt-1">•</span>
                    <span>Service availability may vary based on <strong>location, time, and vehicle availability</strong>.</span>
                  </li>
                </ul>
              </section>

              {/* All other sections remain 100% unchanged */}
              <section id="order" className="content-card rounded-2xl border border-white/20 bg-black/70 backdrop-blur-md p-10 shadow-xl hover:shadow-yellow-400/40 transition-all">
                <h2 className="text-4xl font-bold mb-6">
                  3. <span className="text-yellow-400">Order Placement & Confirmation</span>
                </h2>
                <ul className="space-y-4 text-slate-300 text-lg">
                  <li className="flex items-start gap-3"><span className="text-yellow-400 mt-1">•</span> Users can place a shipping request <strong>via the DriWE App.</strong>.</li>
                  <li className="flex items-start gap-3"><span className="text-yellow-400 mt-1">•</span>  User can select the ride to make the courier.</li>
                  <li className="flex items-start gap-3"><span className="text-yellow-400 mt-1">•</span>  Fill the required detail and place your drop locations.</li>
                  <li className="flex items-start gap-3"><span className="text-yellow-400 mt-1">•</span>  Once the request is confirmed, you will receive a booking otp and driver vehicle details.</li>
                  <li className="flex items-start gap-3"><span className="text-yellow-400 mt-1">•</span> Orders are subject to acceptance based on vehicle availability, item type, and serviceable areas.</li>
                </ul>
              </section>

              <section id="pickup" className="content-card rounded-2xl border border-white/20 bg-black/70 backdrop-blur-md p-10 shadow-xl hover:shadow-yellow-400/40 transition-all">
                <h2 className="text-4xl font-bold mb-6">
                  4. <span className="text-yellow-400">Pick-up & Delivery</span>
                </h2>
                <ul className="space-y-4 text-slate-300 text-lg">
                  <li className="flex items-start gap-3"><span className="text-yellow-400 mt-1">•</span> Pick-up is done from the address provided by the customer.</li>
                  <li className="flex items-start gap-3"><span className="text-yellow-400 mt-1">•</span> Delivery will be made to the address specified at the time of booking.</li>
                  <li className="flex items-start gap-3"><span className="text-yellow-400 mt-1">•</span> Customers must ensure that :
                  Items are securely packed.Use better quality of adhesive tape.Pick-up and drop locations are accurate and accessible.Someone is available at both locations to hand over/receive the goods.
                  </li>
                </ul>
              </section>

              <section id="restrictions" className="content-card rounded-2xl border border-white/20 bg-black/70 backdrop-blur-md p-10 shadow-xl hover:shadow-red-400/40 transition-all">
                <h2 className="text-4xl font-bold mb-6">
                  5. <span className="text-red-400">Item Restrictions</span>
                </h2>
                <ul className="space-y-3 text-slate-300 text-lg">
                  <li>• Perishable and Food items,</li>
                  <li>• LEDs, LCDs, plasma, OLED and any kind of television screens,</li>
                  <li>• Liquid product, livestock, perishables, live plants,</li>
                  <li>• Flammable items (firecrackers, oil cans, adhesives, paint cans), explosives (arms,ammunition, fireworks, flares, gunpowder, airbag inflators), fire extinguishers,</li>
                  <li>• electric lighter/cigarette,</li>
                  <li>• Platinum, gold, silver, artificial jewelry, gem, precious, semi-precious metals or stones in any form including bricks,</li>
                  <li>• Alcohol/tobacco/ medicines/drugs/poisonous goods, toxic and infectious items,</li>
                  <li>• Valuable items, electronic devices, high capacity batteries such as car batteries, generator batteries,</li>
                  <li>• Machinery parts containing oil, grease, fuel or batteries, corrosive items (acids, chemicals),</li>
                  <li>• Radioactive material, Magnetized materials,Pressurized Containers,Narcotic Substances & Medical and research equipment,</li>
                  <li>• Indian postal articles such as stamps and articles like coins, banknotes, currency notes, Sodexo or securities of any kind payable to bearer, traveler's cheques,</li>
                  <li>• Gambling devices, lottery tickets, pornographic material,</li>
                  <li>• DriWE is not responsible if any substance as mention above is courier,DriWE don’t have any license to carry any of this article</li>
                </ul>
              </section>

              <section id="timeline" className="content-card rounded-2xl border border-white/20 bg-black/70 backdrop-blur-md p-10 shadow-xl hover:shadow-yellow-400/40 transition-all">
                <h2 className="text-4xl font-bold mb-6">
                  6. <span className="text-yellow-400">Delivery Timelines</span>
                </h2>
                <ul className="space-y-4 text-slate-300 text-lg">
                  <li className="flex items-start gap-3"><span className="text-yellow-400 mt-1">•</span> Delivery times depend on distance, traffic, weather, and other operational factors.</li>
                  <li className="flex items-start gap-3"><span className="text-yellow-400 mt-1">•</span> We make reasonable efforts to ensure on-time deliveries, but delays may occur.</li>
                  <li className="flex items-start gap-3"><span className="text-yellow-400 mt-1">•</span> Estimated delivery times will be shown during booking.</li>
                </ul>
              </section>

              <section id="charges" className="content-card rounded-2xl border border-white/20 bg-black/70 backdrop-blur-md p-10 shadow-xl hover:shadow-yellow-400/40 transition-all">
                <h2 className="text-4xl font-bold mb-6">
                  7. <span className="text-yellow-400">Shipping Charges</span>
                </h2>
                <ul className="space-y-4 text-slate-300 text-lg">
                  <li className="flex items-start gap-3"><span className="text-yellow-400 mt-1">•</span> Charges are calculated based on km and timing.</li>
                  <li className="flex items-start gap-3"><span className="text-yellow-400 mt-1">•</span> Distance (pick-up – stops – drop location)</li>
                  <li className="flex items-start gap-3"><span className="text-yellow-400 mt-1">•</span> Vehicle type (two-wheeler, mini truck, etc.)</li>
                  <li className="flex items-start gap-3"><span className="text-yellow-400 mt-1">•</span> Additional services (waiting time, loading/unloading assistance).</li>
                  <li className="flex items-start gap-3"><span className="text-yellow-400 mt-1">•</span> Exact charges are shown before confirming the booking.</li>
                </ul>
              </section>

              <section id="tracking" className="content-card rounded-2xl border border-white/20 bg-black/70 backdrop-blur-md p-10 shadow-xl hover:shadow-yellow-400/40 transition-all">
                <h2 className="text-4xl font-bold mb-6">
                  8. <span className="text-yellow-400">Tracking</span>
                </h2>
                <ul className="space-y-4 text-slate-300 text-lg">
                  <li className="flex items-start gap-3"><span className="text-yellow-400 mt-1">•</span> All shipments can be tracked live via the app.</li>
                  <li className="flex items-start gap-3"><span className="text-yellow-400 mt-1">•</span> Customers will also receive SMS/Email/Push notifications regarding order status.</li>
                </ul>
              </section>

              <section id="cancellations" className="content-card rounded-2xl border border-white/20 bg-black/70 backdrop-blur-md p-10 shadow-xl hover:shadow-yellow-400/40 transition-all">
                <h2 className="text-4xl font-bold mb-6">
                  9. <span className="text-yellow-400">Cancellations</span>
                </h2>
                <ul className="space-y-4 text-slate-300 text-lg">
                  <li className="flex items-start gap-3"><span className="text-yellow-400 mt-1">•</span> Orders can be cancelled before vehicle dispatch at no extra charge.</li>
                  <li className="flex items-start gap-3"><span className="text-yellow-400 mt-1">•</span> Cancellation cannot be done after the parcel has been picked.</li>
                </ul>
              </section>

              <section id="liability" className="content-card rounded-2xl border border-white/20 bg-black/70 backdrop-blur-md p-10 shadow-xl hover:shadow-red-400/40 transition-all">
                <h2 className="text-4xl font-bold mb-6">
                  10. <span className="text-red-400">Liability & Claims</span>
                </h2>
                <ul className="space-y-4 text-slate-300 text-lg">
                  <li className="flex items-start gap-3"><span className="text-red-400 mt-1">•</span> Our liability is limited to the declared value of the good.</li>
                  <li className="flex items-start gap-3"><span className="text-red-400 mt-1">•</span> Perishable Articles: Parties shall not tender for transportation any consignment containing perishable product shelf life of less than 7 days. DriWE shall not be liable for any loss or damage to any such consignment arising consequent to any delay in delivery.</li>
                  <li className="flex items-start gap-3"><span className="text-red-400 mt-1">•</span> Claims for lost or damaged items must be reported within 3 days of delivery.</li>
                </ul>
              </section>

              <section id="support" className="content-card rounded-2xl border border-white/20 bg-gradient-to-r from-yellow-400/10 to-purple-600/10 backdrop-blur-md p-10 shadow-xl hover:shadow-yellow-400/50 transition-all">
                <h2 className="text-4xl font-bold mb-6">
                  11. <span className="text-yellow-400">Customer Support</span>
                </h2>
                <div className="space-y-6 text-lg text-slate-200">
                  <p className="text-xl"> For queries, complaints, or assistance:</p>
                  <p><strong>Call:</strong> <a href="tel:8669888996" className="text-yellow-400 font-bold hover:underline">866 988 8996</a></p>
                  <p><strong>Email:</strong> <a href="mailto:hello@driwe.in" className="text-yellow-400 font-bold hover:underline">hello@driwe.in</a></p>
                  <p><strong>In-App Live Chat</strong></p>
                </div>
              </section>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}