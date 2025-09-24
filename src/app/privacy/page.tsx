"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger, ScrollToPlugin } from "gsap/all";

export default function PrivacyPage() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    // Hero text animation
    gsap.fromTo(
      ".hero-text",
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );
    // Table of contents animation
    gsap.fromTo(
      ".table-of-contents",
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 1, ease: "power3.out", delay: 0.5 }
    );

    // Content sections animation
    const sections = document.querySelectorAll(".content-card");
    sections.forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    // Smooth scrolling for Table of Contents links
    const links = document.querySelectorAll(".table-of-contents a");
    links.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = link.getAttribute("href")?.substring(1);
        const targetElement = document.getElementById(targetId || "");
        if (targetElement) {
          gsap.to(window, {
            duration: 1,
            scrollTo: {
              y: targetElement,
              offsetY: 100, // Adjust offset to account for sticky headers or other fixed elements
            },
            ease: "power3.out",
          });
        }
      });
    });

    // Three.js setup
    const mount = mountRef.current;
    if (!mount) return;

    const camera = new THREE.PerspectiveCamera(
      75,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const handleResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-black text-white font-inter antialiased">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden bg-black py-20">
        <div ref={mountRef} className="absolute inset-0 z-0"></div>
        <div className="container relative z-10 mx-auto flex h-[40vh] items-center justify-center px-4 text-center md:px-6">
          <div className="space-y-4">
            <h1 className="hero-text text-4xl font-bold tracking-tighter text-white sm:text-6xl md:text-7xl">
              Terms &amp; <span className="text-yellow-400">Conditions</span>
            </h1>

            <p className="text-lg leading-relaxed text-slate-300 max-w-2xl mx-auto">
              Please read these Terms and Conditions carefully before using the DriWE App. By accessing or using the App, you agree to be bound by these Terms.
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="relative z-10 w-full bg-black py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-8 lg:grid-cols-4">
            {/* Table of Contents */}
            <div className="lg:col-span-1">
              <div className="table-of-contents sticky top-8 rounded-2xl border border-white bg-black p-6 shadow-lg transition hover:shadow-yellow-400/40">
                <h3 className="mb-4 text-lg font-bold text-white">
                  <span className="text-yellow-400">Table of Contents</span>
                </h3>
                <nav className="space-y-2">
                  <a href="#introduction" className="block text-sm text-slate-400 hover:text-yellow-400 transition-colors">1. Introduction</a>
                  <a href="#eligibility" className="block text-sm text-slate-400 hover:text-yellow-400 transition-colors">2. Eligibility</a>
                  <a href="#accounts" className="block text-sm text-slate-400 hover:text-yellow-400 transition-colors">3. User Accounts</a>
                  <a href="#services" className="block text-sm text-slate-400 hover:text-yellow-400 transition-colors">4. Services</a>
                  <a href="#payment" className="block text-sm text-slate-400 hover:text-yellow-400 transition-colors">5. Payment Terms</a>
                  <a href="#cancellation" className="block text-sm text-slate-400 hover:text-yellow-400 transition-colors">6. Cancellation Policy</a>
                  <a href="#liability" className="block text-sm text-slate-400 hover:text-yellow-400 transition-colors">7. Liability Disclaimer</a>
                  <a href="#prohibited" className="block text-sm text-slate-400 hover:text-yellow-400 transition-colors">8. Prohibited Activities</a>
                  <a href="#ip" className="block text-sm text-slate-400 hover:text-yellow-400 transition-colors">9. Intellectual Property</a>
                  <a href="#modifications" className="block text-sm text-slate-400 hover:text-yellow-400 transition-colors">10. Modifications to Terms</a>
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-8">
              {/* 1. Introduction */}
              <section id="introduction" className="content-card rounded-2xl border border-white bg-black p-6 shadow-lg hover:shadow-yellow-400/40 transition">
                <h2 className="text-3xl font-bold text-white mb-4">1. <span className="text-yellow-400">Introduction</span></h2>
                <p className="text-slate-300 mb-3">Welcome to DriWE (&quot;the App&quot;), a ride-hailing platform operated by DriWE Smartech Pvt. Ltd. (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;). These Terms and Conditions (&quot;Terms&quot;) govern your use of the DriWE App and its services. By downloading, installing, or using the App, you agree to comply with these Terms. Our Website: <a href="https://driwe.in" className="text-yellow-400 underline">https://driwe.in</a></p>
                <p className="text-slate-300">If you do not agree to these Terms, you must refrain from using the App.</p>
              </section>

              {/* 2. Eligibility */}
              <section id="eligibility" className="content-card rounded-2xl border border-white bg-black p-6 shadow-lg hover:shadow-yellow-400/40 transition">
                <h2 className="text-3xl font-bold text-white mb-4">2. <span className="text-yellow-400">Eligibility</span></h2>
                <ul className="list-disc pl-6 text-slate-300 space-y-2">
                  <li>You must be at least 18 years old to use the App.</li>
                  <li>You must have a valid mobile device, internet connection, and access to authorized platforms (e.g., Google Play Store) to download the App.</li>
                  <li>Drivers must possess:
                    <ul className="list-disc pl-6">
                      <li>A valid driving license;</li>
                      <li>Vehicle registration documents;</li>
                      <li>Comprehensive insurance coverage as per applicable local laws.</li>
                    </ul>
                  </li>
                </ul>
              </section>

              {/* 3. User Accounts */}
              <section id="accounts" className="content-card rounded-2xl border border-white bg-black p-6 shadow-lg hover:shadow-yellow-400/40 transition">
                <h2 className="text-3xl font-bold text-white mb-4">3. <span className="text-yellow-400">User Accounts</span></h2>
                <ul className="list-disc pl-6 text-slate-300 space-y-2">
                  <li>To use the App, you must create an account by providing accurate information, including your name, phone number, email address, and payment details.</li>
                  <li>You are solely responsible for maintaining the confidentiality of your account credentials.</li>
                  <li>We reserve the right to suspend or terminate accounts that violate these Terms or engage in fraudulent activities, without prior notice.</li>
                </ul>
              </section>

              {/* 4. Services */}
              <section id="services" className="content-card rounded-2xl border border-white bg-black p-6 shadow-lg hover:shadow-yellow-400/40 transition">
                <h2 className="text-3xl font-bold text-white mb-4">4. <span className="text-yellow-400">Services</span></h2>
                <ul className="list-disc pl-6 text-slate-300 space-y-2">
                  <li>The App connects riders (&quot;Users&quot;) with drivers (&quot;DriWErS&quot;) for transportation services.</li>
                  <li>We act as an intermediary and do not own, operate, or maintain vehicles used for rides.</li>
                  <li>Users can book rides, track trips in real-time, and make payments through the App.</li>
                </ul>
              </section>

              {/* 5. Payment Terms */}
              <section id="payment" className="content-card rounded-2xl border border-white bg-black p-6 shadow-lg hover:shadow-yellow-400/40 transition">
                <h2 className="text-3xl font-bold text-white mb-4">5. <span className="text-yellow-400">Payment Terms</span></h2>
                <ul className="list-disc pl-6 text-slate-300 space-y-2">
                  <li>Payments for rides are processed through secure payment gateways integrated into the App.</li>
                  <li>Fares are calculated based on:
                    <ul className="list-disc pl-6">
                      <li>Distance traveled;</li>
                      <li>Time taken;</li>
                      <li>Applicable taxes;</li>
                      <li>Dynamic pricing during peak hours.</li>
                    </ul>
                  </li>
                  <li>Payment methods include cash, credit/debit cards, and digital wallets.</li>
                  <li>Any disputes regarding fares must be reported within 7 days of the ride. Failure to report within this timeframe may result in forfeiture of the claim.</li>
                </ul>
              </section>

              {/* 6. Cancellation Policy */}
              <section id="cancellation" className="content-card rounded-2xl border border-white bg-black p-6 shadow-lg hover:shadow-yellow-400/40 transition">
                <h2 className="text-3xl font-bold text-white mb-4">6. <span className="text-yellow-400">Cancellation Policy</span></h2>
                <ul className="list-disc pl-6 text-slate-300 space-y-2">
                  <li><span className="font-semibold text-yellow-400">Users:</span> You may cancel rides before the driver starts the trip. A cancellation fee may apply if the cancellation occurs after the driver has been assigned.</li>
                  <li><span className="font-semibold text-yellow-400">Drivers:</span> Drivers may cancel rides only under exceptional circumstances (e.g., safety concerns). Frequent cancellations by drivers may result in penalties, including suspension or termination of their accounts.</li>
                </ul>
              </section>

              {/* 7. Liability Disclaimer */}
              <section id="liability" className="content-card rounded-2xl border border-white bg-black p-6 shadow-lg hover:shadow-yellow-400/40 transition">
                <h2 className="text-3xl font-bold text-white mb-4">7. <span className="text-yellow-400">Liability Disclaimer</span></h2>
                <ul className="list-disc pl-6 text-slate-300 space-y-2">
                  <li>We are not liable for any damages, injuries, or losses incurred during rides unless caused by our gross negligence or willful misconduct.</li>
                  <li>Drivers are independent contractors and are solely responsible for their actions, including compliance with traffic laws and safety standards.</li>
                  <li>Users assume full responsibility for ensuring their safety during rides and agree to hold us harmless from any claims arising out of their use of the App.</li>
                </ul>
              </section>

              {/* 8. Prohibited Activities */}
              <section id="prohibited" className="content-card rounded-2xl border border-white bg-black p-6 shadow-lg hover:shadow-yellow-400/40 transition">
                <h2 className="text-3xl font-bold text-white mb-4">8. <span className="text-yellow-400">Prohibited Activities</span></h2>
                <p className="text-slate-300 mb-3">Misuse of the App, including harassment, fraud, or illegal activities, is strictly prohibited.</p>
                <ul className="list-disc pl-6 text-slate-300 space-y-2">
                  <li>Share their account credentials or allow unauthorized access to their accounts;</li>
                  <li>Use the App for any purpose other than its intended functionality;</li>
                  <li>Engage in activities that violate applicable laws or harm the App&apos;s integrity.</li>
                </ul>
              </section>

              {/* 9. Intellectual Property */}
              <section id="ip" className="content-card rounded-2xl border border-white bg-black p-6 shadow-lg hover:shadow-yellow-400/40 transition">
                <h2 className="text-3xl font-bold text-white mb-4">9. <span className="text-yellow-400">Intellectual Property</span></h2>
                <p className="text-slate-300 mb-3">All content, logos, trademarks, and software associated with the App are the property of DriWE Smartech Pvt. Ltd. and are protected by intellectual property laws.</p>
                <p className="text-slate-300">Unauthorized use, reproduction, or distribution of any materials is strictly prohibited.</p>
              </section>

              {/* 10. Modifications to Terms */}
              <section id="modifications" className="content-card rounded-2xl border border-white bg-black p-6 shadow-lg hover:shadow-yellow-400/40 transition">
                <h2 className="text-3xl font-bold text-white mb-4">10. <span className="text-yellow-400">Modifications to Terms</span></h2>
                <p className="text-slate-300">We reserve the right to update these Terms at any time. Changes will be effective upon posting on the App or website.</p>
                <p className="text-slate-300">Continued use of the App after changes constitutes acceptance of the updated Terms.</p>
              </section>

              {/* Shipping Policy */}
              <section id="shipping-policy" className="content-card rounded-2xl border border-white bg-black p-6 shadow-lg hover:shadow-yellow-400/40 transition">
                <h2 className="text-3xl font-bold text-white mb-4">Shipping <span className="text-yellow-400">Policy</span></h2>
                <p className="text-slate-300 mb-4">At DriWE, we are committed to providing reliable and hassle-free logistics and delivery services. This Shipping Policy outlines how goods are picked up, transported, and delivered through our platform.</p>
                <ol className="list-decimal pl-6 text-slate-300 space-y-2 mb-6">
                  <li><span className="font-bold text-yellow-400">Service Coverage</span><br />Our shipping services are currently available in Pune.<br />Service availability may vary based on location, time, and vehicle availability.</li>
                  <li><span className="font-bold text-yellow-400">Order Placement & Confirmation</span><br />Users can place a shipping request via the App.<br />User can select the ride to make the courier.<br />Fill the required detail and place your drop locations.<br />Once the request is confirmed, you will receive a booking otp and driver vehicle details.<br />Orders are subject to acceptance based on vehicle availability, item type, and serviceable areas.</li>
                  <li><span className="font-bold text-yellow-400">Pick-up & Delivery</span><br />Pick-up is done from the address provided by the customer.<br />Delivery will be made to the address specified at the time of booking.<br />Customers must ensure that:<ul className="list-disc pl-6"><li>Items are securely packed.</li><li>Use better quality of adhesive tape</li><li>Pick-up and drop locations are accurate and accessible.</li><li>Someone is available at both locations to hand over/receive the goods.</li></ul></li>
                  <li><span className="font-bold text-yellow-400">Item Restrictions</span><br />Perishable and Food items,<br />LEDs, LCDs, plasma, OLED and any kind of television screens,<br />Liquid product, livestock, perishables, live plants,<br />Flammable items (firecrackers, oil cans, adhesives, paint cans), explosives (arms, ammunition, fireworks, flares, gunpowder, airbag inflators), fire extinguishers, electric lighter/cigarette<br />Platinum, gold, silver, artificial jewelry, gem, precious, semi-precious metals or stones in any form including bricks<br />Alcohol/tobacco/ medicines/drugs/poisonous goods, toxic and infectious items,<br />Valuable items, electronic devices, high capacity batteries such as car batteries, generator batteries,<br />Machinery parts containing oil, grease, fuel or batteries, corrosive items (acids, chemicals),<br />Radioactive material, Magnetized materials,Pressurized Containers,Narcotic Substances & Medical and research equipment<br />Indian postal articles such as stamps and articles like coins, banknotes, currency notes, Sodexo or securities of any kind payable to bearer, traveler&quot;s cheques </li>
                  <li><span className="font-bold text-yellow-400">Delivery Timelines</span><br />Delivery times depend on distance, traffic, weather, and other operational factors.<br />We make reasonable efforts to ensure on-time deliveries, but delays may occur.<br />Estimated delivery times will be shown during booking.</li>
                  <li><span className="font-bold text-yellow-400">Shipping Charges</span><br />Charges are calculated based on km and timing.<br />- Distance (pick-up – stops – drop location )<br />- Vehicle type (two-wheeler, mini truck, etc.).<br />- Additional services (waiting time, loading/unloading assistance).<br />Exact charges are shown before confirming the booking.</li>
                  <li><span className="font-bold text-yellow-400">Tracking</span><br />All shipments can be tracked live via the app.<br />Customers will also receive SMS/Email/Push notifications regarding order status.</li>
                  <li><span className="font-bold text-yellow-400">Cancellations</span><br />Orders can be cancelled before vehicle dispatch at no extra charge.<br />Cancellation cannot be done after the parcel has been picked.</li>
                  <li><span className="font-bold text-yellow-400">Liability & Claims</span><br />Our liability is limited to the declared value of the good<br />Perishable Articles: Parties shall not tender for transportation any consignment containing perishable product shelf life of less than 7 days. DriWE shall not be liable for any loss or damage to any such consignment arising consequent to any delay in delivery<br />Claims for lost or damaged items must be reported within 3 days of delivery.</li>
                  <li><span className="font-bold text-yellow-400">Customer Support</span><br />For queries, complaints, or assistance:<br />Number-866 988 8996<br />Mail-hello@driwe.in</li>
                  <li><span className="font-bold text-yellow-400">Ride / Service Policy – DriWE</span><br />Welcome to DriWE! Your safe, affordable, and reliable travel partner. This Ride/Service Policy explains how our cab services operate, including booking, ride timelines, cancellations, and customer responsibilities.<br /><ul className="list-disc pl-6"><li>Service Coverage<br />DriWE currently operates in [list cities/regions].<br />Service availability may depend on time, location, and cab availability.</li><li>Booking & Confirmation<br />Rides can be booked via the DriWE App.<br />Once booked, you will receive driver details, vehicle details, and fare estimate.<br />Booking confirmation is subject to cab availability.</li><li>Pick-up & Drop<br />The driver will arrive at the pick-up location provided in the app.<br />Customers are requested to be at the pick-up point at the scheduled time.<br />Drop will only be to the destination entered at booking unless modified in-app.</li><li>Ride Timelines<br />Estimated arrival times (ETA) may vary due to traffic, weather, or unforeseen conditions.<br />We make best efforts to ensure timely pick-up and drop, but delays may occur.</li><li>Fare & Charges<br />Fares are calculated based on:<br />- Base fare (minimum charge).<br />- Distance traveled & time taken.<br />- Dynamic pricing (if applicable during peak hours).<br />Toll charges, parking fees, and state permits (if any) are payable by the rider.</li><li>Cancellation Policy<br />Rides can be cancelled before the driver reaches the pick-up point at no cost.<br />If cancelled after driver arrival or if the rider is a no-show, cancellation charges may apply.<br />Refunds (if applicable) are processed within [X business days].</li><li>Passenger Responsibilities<br />Ensure the pick-up and drop-off locations are accurate and accessible.<br />Wear seatbelts at all times during the ride.<br />No carrying of hazardous, illegal, or restricted items.<br />Treat drivers with respect and follow community guidelines.</li><li>Safety & Tracking<br />All rides are GPS tracked for safety.<br />Share ride details with friends/family via the in-app share option.<br />24/7 emergency helpline available within the app.</li><li>Liability<br />DriWE ensures best safety measures, but is not responsible for delays due to traffic, natural disasters, strikes, or government restrictions.<br />Any misconduct or violation of terms may lead to suspension of rider accounts.</li><li>Customer Support<br />Support Number : +91 86698 88996<br />Support Email : Hello@driwe.in</li></ul></li>
                </ol>
              </section>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
