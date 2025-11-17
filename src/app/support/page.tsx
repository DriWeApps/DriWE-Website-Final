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
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    q: "How do I book a cab with Drive?",
    a: "To book a cab, open the Drive app, enter your pickup and drop-off location, choose your ride type, and confirm the booking. A nearby driver will be assigned to you shortly.",
  },
  {
    q: "Is Drive available on both Android and iOS?",
    a: "Yes, Drive is available for download on both the Google Play Store for Android and the Apple App Store for iOS.",
  },
  {
    q: "How do I become a driver?",
    a: "Sign up through our driver portal, complete the background check, and upload required documents.",
  },
  {
    q: "Which cities or areas does Drive operate in?",
    a: "Drive currently operates in major metropolitan areas across the country. You can check the app for a full list of supported cities and regions.",
  },
  {
    q: "What is Drive and how does it work?",
    a: "Drive is your all-in-one app for booking cabs & porter services. Just open the app, select the service you need, enter your pickup and drop-off details, and confirm the booking. Whether you're commuting or moving goods, Drive has you covered.",
  },
  {
    q: "How to cancel?",
    a: "Before entering the OTP, you can click on the Cancel Trip button, choose a reason, and then click on the Submit button.",
  },
];

const categories = [
  {
    refKey: "rider",
    icon: User,
    label: "I'm a Rider",
    desc: "Get help with booking rides, payments, and account settings",
    options: ["Booking & cancellation", "Payment issues", "Account management"],
  },
  {
    refKey: "driver",
    icon: Car,
    label: "I'm a Driver",
    desc: "Get help with driving, earnings, and vehicle requirements",
    options: ["Getting started", "Earnings & payments", "Vehicle requirements"],
  },
];

// ✅ Removed Live Chat option
const helpOptions = [
  {
    icon: Phone,
    title: "Phone Support",
    desc: "Call us for urgent issues",
    btn: "Start Call",
  },
  {
    icon: Mail,
    title: "Email Support",
    desc: "Send us a detailed message",
    btn: "Send Email",
  },
];

export default function SupportPage() {
  const [openCard, setOpenCard] = useState<"rider" | "driver" | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const refs = {
    three: useRef<HTMLDivElement>(null),
    hero: useRef<HTMLDivElement>(null),
    category: useRef<HTMLDivElement>(null),
    faq: useRef<HTMLDivElement>(null),
    help: useRef<HTMLDivElement>(null),
  };

  useLayoutEffect(() => {
    const elements = [
      refs.category.current,
      refs.faq.current,
      refs.help.current,
    ].filter(Boolean) as HTMLElement[];
    if (!elements.length) return;
    const ctx = gsap.context(() => {
      elements.forEach((el) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: "top 80%" },
          autoAlpha: 0,
          y: 50,  
          duration: 1,
          ease: "power2.out",
        });
      });
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
    }, refs.hero);
    return () => ctx.revert();
  }, [refs.category, refs.faq, refs.help, refs.hero]);

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

    const particles: THREE.Mesh[] = Array.from({ length: 40 }, () => {
      const p = new THREE.Mesh(
        new THREE.SphereGeometry(0.03, 8, 8),
        new THREE.MeshBasicMaterial({
          color: 0xffd24d,
          transparent: true,
          opacity: 0.9,
        })
      );
      p.position.set(
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 4,
        (Math.random() - 1) * 2
      );
      scene.add(p);
      return p;
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
  }, [refs.three]);

  const handleHelpBtn = (title: string) => {
    if (title === "Phone Support")
      return () => {
        window.location.href = "tel:+91-8669888996";
      };
    if (title === "Email Support")
      return () => {
        window.location.href = "mailto:hello@driwe.in";
      };
  };

  return (
    <div className="relative min-h-screen bg-black text-white ">
      <div
        ref={refs.three}
        className="absolute inset-0 -z-10 opacity-20 pointer-events-none"
      />

      {/* HERO */}
      <section
        ref={refs.hero}
        className="bg-black h-screen flex items-center justify-center relative z-10"
      >
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            How can we <span className="text-[#fcd129] ">help</span> you?
          </h1>
          <div className="mx-auto max-w-xl flex rounded-full border-2 border-white overflow-hidden bg-white">
            <input
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search how-tos and more"
              className="flex-grow px-6 py-3 rounded-l-full text-black focus:outline-none"
            />
            <button
              type="button"
              className="flex items-center justify-center w-12"
            >
              <Search className="w-5 h-5" color="#fcd129" />
            </button>
          </div>
        </div>
      </section>

      {/* CATEGORY */}
      <section
        ref={refs.category}
        className="bg-black border-t border-gray-800/50 py-20"
      >
        <div className="max-w-5xl mx-auto px-4 text-black">
          <h2 className="text-center text-[32px] font-bold mb-10 text-white">
            Choose Your Help <span className="text-yellow-400">Category</span>
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
                  whileHover={{ scale: 1.05 }}
                  className="border border-white rounded-xl p-6 text-white shadow"
                >
                  <div className="flex gap-4 items-start">
                    <div className="rounded-full p-2 bg-yellow-500">
                      <cat.icon className="w-5 h-5 text-black" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{cat.label}</h3>
                      <p className="text-sm text-white mt-2">{cat.desc}</p>
                      <button
                        className="mt-3 px-4 py-1.5 rounded-md text-sm border border-black
                                   bg-white text-black hover:bg-yellow-500 hover:text-black transition"
                        onClick={() =>
                          setOpenCard(
                            isOpen ? null : (cat.refKey as "rider" | "driver")
                          )
                        }
                      >
                        <strong>View More</strong>
                      </button>
                    </div>
                  </div>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        key={cat.refKey}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="mt-4 text-sm overflow-hidden"
                      >
                        <ul className="space-y-2">
                          {cat.options.map((option) => (
                            <li
                              key={option}
                              className="flex items-center gap-2"
                            >
                              <Check className="w-4 h-4 text-yellow-500" />{" "}
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

      {/* FAQ */}
      <section
        ref={refs.faq}
        className="bg-black border-t border-gray-800/50 py-20"
      >
        <div className="max-w-3xl mx-auto px-4 text-white">
          <h2 className="text-center text-[28px] font-bold mb-6">
            Frequently Asked <span className="text-yellow-400">Question</span>
          </h2>
          <div className="space-y-3">
            {faqs.map((f, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="border border-white/30 bg-black rounded-lg shadow-lg"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full flex justify-between items-center px-4 py-3 text-base font-medium"
                  >
                    {f.q}
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        key={`faq-${idx}`}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="px-4 pb-4 text-sm text-gray-300 overflow-hidden"
                      >
                        {f.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* HELP */}
      <section
        ref={refs.help}
        className="bg-black border-t border-gray-800/50 py-20"
      >
        <div className="max-w-5xl mx-auto px-4 text-black">
          <h2 className="text-center text-[28px] font-bold mb-6 text-white">
            Still need <span className="text-yellow-400">help?</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {helpOptions.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                whileHover={{ scale: 1.05 }}
                className="rounded-xl p-6 text-white border border-gray-300 shadow"
              >
                <div className="mb-5 text-center">
                  <div className="rounded-full px-4 py-2 bg-yellow-500 inline-flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-black" />
                  </div>
                </div>
                <h3 className="text-center font-semibold mb-1">{item.title}</h3>
                <p className="text-center text-sm text-white mb-4">
                  {item.desc}
                </p>
                <button
                  className="w-full py-2 rounded-md uppercase text-sm 
                                  border border-black bg-white text-black 
                                  hover:bg-yellow-400 hover:text-black transition"
                  onClick={handleHelpBtn(item.title)}
                >
                  <strong>{item.btn}</strong>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
