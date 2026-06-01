"use client";
import React, { useLayoutEffect, useRef, useState } from "react";
import {
  Search,
  User,
  Car,
  Check,
  Phone,
  Mail,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

// ---------------------- FAQ DATA ----------------------
const riderFaqs = [
  {
    q: "What payment methods does DriWE accept?",
    a: "DriWE accepts all major credit cards, debit cards, digital wallets (UPI, Paytm, Google Pay), and cash payments. Your payment method can be easily managed in the app settings.",
  },
  {
    q: "Can I track my driver in real time?",
    a: "Yes! Once your ride is confirmed, you can track your driver’s location in real-time on the map. You’ll also receive SMS updates with driver details and estimated arrival time.",
  },
  {
    q: "What if I need to cancel my ride?",
    a: "Before entering the OTP, you can click on the Cancel Trip button, choose a reason, and then click on the Submit button.",
  },
  {
    q: "Can I schedule a ride in advance?",
    a: "Yes, you can schedule rides up to 7 days in advance. Simply select 'Schedule Ride' in the app, choose your preferred date and time, and a driver will be ready for you.",
  },
  {
    q: "Can I use Ride and Courier at the same time?",
    a: "Yes, absolutely.",
  },
  {
    q: "What is the Live Meter feature and how does it work?",
    a: "The Live Meter shows your real-time trip fare as you travel. It updates automatically based on distance, time, and ride conditions, ensuring full transparency throughout your ride.",
  },
  {
    q: "What can I do in case of an emergency?",
    a: "DriWE provides an in-app SOS feature for your safety. Simply tap the SOS button, capture a quick photo if prompted, and the app will instantly show emergency contact numbers and assistance options.",
  },
];

const driverFaqs = [
  {
    q: "How do I become a DriWE driver?",
    a: "Download the DriWE Driver app, complete your profile with required documents (license, vehicle registration, insurance), pass our background verification, and attend a brief orientation session.",
  },
  {
    q: "Can I drive with my own schedule?",
    a: "Yes! DriWE offers complete flexibility. Drive whenever you want, with no minimum hour requirements and no mandatory shifts.",
  },
  {
    q: "What support is available for drivers?",
    a: "We provide 24/7 driver support through the app, phone, and dedicated driver hubs. Get help with technical issues, account concerns, or incident reporting at any time.",
  },
  {
    q: "What can I do in case of an emergency?",
    a: "Drivers can use the in-app SOS feature to instantly access emergency contacts and support. Tap the SOS button, follow the instructions, and the app will provide immediate assistance options.",
  },
  {
    q: "How can I get my documents verified?",
    a: "Upload the required documents in the DriWE Driver app. The DriWE team will review and verify them within 12 hrs. Once verified, you’ll receive a notification and your account/request will be approved.",
  },
  {
    q: "How do I withdraw money from my wallet?",
    a: "When you deposit money into your Ledger Balance, you can withdraw it after 12 hours if the balance is not used. The platform fee will be deducted automatically during withdrawal. If any part of the balance has been used, the remaining amount cannot be withdrawn.Otherwise, the amount stays in the Ledger Balance for up to 24 hours, and you can apply for withdrawal—but the settlement will take T+2 days to reach your bank account.",
  },
];

// ---------------------- CATEGORY DATA ----------------------
const categories = [
  {
    refKey: "rider" as const,
    icon: User,
    label: "I'm a Rider",
    desc: "Get help with booking rides, payments, and account settings",
    options: [
      "Booking & cancellation",
      "Payment issues",
      "Live meter & charges",
      "Account management",
      "Safety & emergency help",
    ],
  },
  {
    refKey: "driver" as const,
    icon: Car,
    label: "I'm a Driver",
    desc: "Get help with driving, earnings, and vehicle requirements",
    options: [
      "Getting started",
      "Earnings & payments",
      "Vehicle requirements",
      "Safety & emergency help",
    ],
  },
];

// ---------------------- HELP OPTIONS ----------------------
const helpOptions = [
  {
    icon: Phone,
    title: "Phone Support",
    desc: "Call us for urgent issues only (Mon–Fri 10AM–7PM IST)",
    btn: "Start Call",
  },
  {
    icon: Mail,
    title: "Email Support",
    desc: "Send us a detailed message",
    btn: "Send Email",
  },
];

// ---------------------- MAIN COMPONENT ----------------------
export default function SupportPage() {
  const [openCard, setOpenCard] = useState<"rider" | "driver" | null>(null);
  const [openRider, setOpenRider] = useState<number | null>(null);
  const [openDriver, setOpenDriver] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const refs = {
    three: useRef<HTMLDivElement>(null),
    hero: useRef<HTMLDivElement>(null),
    category: useRef<HTMLDivElement>(null),
    faq: useRef<HTMLDivElement>(null),
    help: useRef<HTMLDivElement>(null),
  };

  // ---------------------- GSAP ANIMATIONS ----------------------
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Hero parallax
      if (refs.hero.current) {
        gsap.to(refs.hero.current, {
          y: -100,
          ease: "none",
          scrollTrigger: {
            trigger: refs.hero.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // Section reveals
      [refs.category.current, refs.faq.current, refs.help.current].forEach((el) => {
        if (el) {
          gsap.from(el, {
            scrollTrigger: { trigger: el, start: "top 80%" },
            autoAlpha: 0,
            y: 50,
            duration: 1,
            ease: "power2.out",
          });
        }
      });
    }, refs.hero);

    return () => ctx.revert();
  }, [
    refs.hero,
    refs.category,
    refs.faq,
    refs.help,
  ]); // ← All dependencies now included

  // ---------------------- THREE JS PARTICLES ----------------------
  useLayoutEffect(() => {
    const cont = refs.three.current;
    if (!cont) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      cont.clientWidth / cont.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 4;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(cont.clientWidth, cont.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    cont.appendChild(renderer.domElement);

    const particles = Array.from({ length: 40 }, () => {
      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.03, 8, 8),
        new THREE.MeshBasicMaterial({
          color: 0xffd24d,
          transparent: true,
          opacity: 0.9,
        })
      );
      mesh.position.set(
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 4,
        (Math.random() - 1) * 2
      );
      scene.add(mesh);
      return mesh;
    });

    let rafId: number;
    const animate = () => {
      particles.forEach((p, idx) => {
        p.position.y -= 0.002 + (idx % 3) * 0.0008;
        p.position.x += Math.sin(Date.now() * 0.0002 + idx) * 0.0005;
        if (p.position.y < -3) p.position.y = 3;
      });
      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      renderer.dispose();
      while (cont.firstChild) cont.removeChild(cont.firstChild);
    };
  }, [refs.three]); // ← Fixed dependency

  // ---------------------- HELP BUTTON HANDLERS ----------------------
  const handleHelpBtn = (title: string) => {
    if (title === "Phone Support") {
      window.location.href = "tel:+91-8669888996";
    }
    if (title === "Email Support") {
      window.location.href = "mailto:hello@driwe.in";
    }
  };

  // ---------------------- FILTERED FAQ ----------------------
  const filteredRiderFaqs = riderFaqs.filter(
    (f) =>
      f.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.a.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredDriverFaqs = driverFaqs.filter(
    (f) =>
      f.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.a.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ---------------------- RETURN UI ----------------------
  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
      <div
        ref={refs.three}
        className="absolute inset-0 -z-10 opacity-20 pointer-events-none"
      />

      {/* HERO */}
      <section ref={refs.hero} className="bg-black h-screen flex items-center justify-center relative z-10">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            How can we <span className="text-[#fcd129]">help</span> you?
          </h1>

          <div className="mx-auto max-w-xl flex rounded-full border-2 border-white overflow-hidden bg-white">
            <input
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search how-tos and more"
              className="flex-grow px-6 py-3 rounded-l-full text-black focus:outline-none"
            />
            <button className="flex items-center justify-center w-12">
              <Search className="w-5 h-5" color="#fcd129" />
            </button>
          </div>
        </div>
      </section>

      {/* CATEGORY */}
      <section ref={refs.category} className="bg-black border-t border-gray-800/50 py-20">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-center text-[32px] font-bold mb-10 text-white">
            Choose Your Help <span className="text-[#fcd129]">Category</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {categories.map((cat) => {
              const isOpen = openCard === cat.refKey;
              return (
                <motion.div
                  key={cat.refKey}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  whileHover={{ scale: 1.03 }}
                  className="border border-white rounded-xl p-6 text-white shadow-lg bg-gradient-to-br from-[#080808] to-[#0f0f0f]"
                >
                  <div className="flex gap-4 items-start">
                    <div className="rounded-full p-2 bg-[#fcd129]">
                      <cat.icon className="w-5 h-5 text-black" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{cat.label}</h3>
                      <p className="text-sm text-gray-300 mt-2">{cat.desc}</p>

                      <button
                        className="mt-3 px-4 py-1.5 rounded-md text-sm border border-white bg-white text-black hover:bg-[#fcd129] hover:border-[#fcd129] transition font-medium"
                        onClick={() => setOpenCard(isOpen ? null : cat.refKey)}
                      >
                        View More
                      </button>
                    </div>
                  </div>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.45, ease: "easeInOut" }}
                        className="mt-4 text-sm overflow-hidden"
                      >
                        <ul className="space-y-2">
                          {cat.options.map((option) => (
                            <li key={option} className="flex items-center gap-2">
                              <Check className="w-4 h-4 text-[#fcd129]" />
                              {option}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section ref={refs.faq} className="bg-black border-t border-gray-800/50 py-20">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-center text-3xl mb-8 font-bold">
            <span className="text-[#fcd129]">Rider</span>{' '}
            <span className="text-white font-extrabold">FAQ</span>
          </h2>

          <div className="space-y-5 mb-12">
            {filteredRiderFaqs.map((faq, index) => (
              <div
                key={index}
                onClick={() => setOpenRider(openRider === index ? null : index)}
                className="p-6 rounded-2xl bg-gradient-to-br from-[#0f0f0f] to-[#090909] border border-[#1f1f1f] hover:border-[#fcd129] transition-all duration-300 cursor-pointer shadow-lg hover:shadow-[#fcd129]/20"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">{faq.q}</h3>
                  {openRider === index ? (
                    <ChevronUp className="text-[#fcd129]" />
                  ) : (
                    <ChevronDown className="text-[#fcd129]" />
                  )}
                </div>

                <AnimatePresence>
                  {openRider === index && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-gray-300 text-sm leading-relaxed mt-3 overflow-hidden"
                    >
                      {faq.a}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          <h2 className="text-center text-3xl mb-8 font-bold">
            <span className="text-[#fcd129]">Driver</span>{' '}
            <span className="text-white font-extrabold">FAQ</span>
          </h2>

          <div className="space-y-5">
            {filteredDriverFaqs.map((faq, index) => (
              <div
                key={index}
                onClick={() => setOpenDriver(openDriver === index ? null : index)}
                className="p-6 rounded-2xl bg-gradient-to-br from-[#0f0f0f] to-[#090909] border border-[#1f1f1f] hover:border-[#fcd129] transition-all duration-300 cursor-pointer shadow-lg hover:shadow-[#fcd129]/20"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">{faq.q}</h3>
                  {openDriver === index ? (
                    <ChevronUp className="text-[#fcd129]" />
                  ) : (
                    <ChevronDown className="text-[#fcd129]" />
                  )}
                </div>

                <AnimatePresence>
                  {openDriver === index && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-gray-300 text-sm leading-relaxed mt-3 overflow-hidden"
                    >
                      {faq.a}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HELP SECTION */}
      <section ref={refs.help} className="bg-black border-t border-gray-800/50 py-20">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-center text-[28px] font-bold mb-6 text-white">
            Still need <span className="text-[#fcd129]">help?</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {helpOptions.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                whileHover={{ scale: 1.03 }}
                className="rounded-xl p-6 text-white border border-gray-700 shadow-lg bg-gradient-to-br from-[#080808] to-[#0f0f0f]"
              >
                <div className="mb-5 text-center">
                  <div className="rounded-full px-4 py-2 bg-[#fcd129] inline-flex">
                    <item.icon className="w-5 h-5 text-black" />
                  </div>
                </div>

                <h3 className="text-center font-semibold mb-1">{item.title}</h3>
                <p className="text-center text-sm text-gray-300 mb-4">{item.desc}</p>

                <button
                  onClick={() => handleHelpBtn(item.title)}
                  className="w-full py-2 rounded-md uppercase text-sm font-bold bg-white text-black hover:bg-[#fcd129] transition"
                >
                  {item.btn}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}