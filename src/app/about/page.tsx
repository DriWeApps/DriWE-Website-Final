
"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutUs() {
  const cycleRef = useRef<HTMLParagraphElement | null>(null);
  const journeySectionRef = useRef<HTMLDivElement | null>(null);
  const sectionsRef = useRef<Array<HTMLDivElement>>([]);

  const currentTheme = {
    primary: "#fcd129",
    secondary: "#f59e0b",
  };

  useEffect(() => {
    // Cycling "Smart/Safe/Smooth"
    const words = ["Smart", "Safe", "Smooth"];
    let i = 0;
    const cycleText = () => {
      if (!cycleRef.current) return;
      gsap.to(cycleRef.current, {
        y: -20,
        opacity: 0,
        duration: 0.5,
        ease: "power2.in",
        onComplete: () => {
          if (!cycleRef.current) return;
          i = (i + 1) % words.length;
          cycleRef.current.textContent = words[i];
          gsap.fromTo(
            cycleRef.current,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
          );
        },
      });
    };
    const interval = setInterval(cycleText, 2000);

    // Section fade-in animations
    sectionsRef.current.forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    // Horizontal Journey Animation
    if (journeySectionRef.current) {
      const track = journeySectionRef.current.querySelector(".journey-track") as HTMLElement;
      if (track) {
        gsap.to(track, {
          x: () => -(track.scrollWidth / 2 - window.innerWidth),
          ease: "none",
          scrollTrigger: {
            trigger: journeySectionRef.current,
            start: "top top",
            end: () => `+=${track.scrollWidth / 2}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Sync dots
        ScrollTrigger.create({
          trigger: journeySectionRef.current,
          start: "top top",
          end: `+=${track.scrollWidth / 2}`,
          onUpdate: (self) => {
            const progress = self.progress;
            const activeIndex = Math.min(
              Math.floor(progress * journeyFeatures.length),
              journeyFeatures.length - 1
            );
            document.querySelectorAll(".journey-dot").forEach((dot, i) => {
              dot.setAttribute("data-active", i === activeIndex ? "true" : "false");
            });
          },
        });
      }
    }

    return () => {
      clearInterval(interval);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  const handleHoverBurst = (e: React.MouseEvent<HTMLDivElement>) => {
    const burst = document.createElement("span");
    burst.className =
      "absolute w-3 h-3 rounded-full animate-ping pointer-events-none";
    burst.style.backgroundColor = currentTheme.primary;
    burst.style.left = `${e.nativeEvent.offsetX}px`;
    burst.style.top = `${e.nativeEvent.offsetY}px`;
    e.currentTarget.appendChild(burst);
    setTimeout(() => burst.remove(), 800);
  };

  const journeyFeatures = [
    {
      title: <span className="text-yellow-400">Founded with Vision</span>,
      desc: "DriWE aims to redefine safe and reliable mobility with a ride-hailing experience built on trust, innovation, and service excellence.",
    },
    {
      title: <span className="text-yellow-400">Service Availability</span>,
      desc: "DriWE services are currently available only in Pune, ensuring focused, reliable, and high-quality operations within the city.",
    },
    {
      title: <span className="text-yellow-400">Eco-Friendly Initiative</span>,
      desc: "Launched eco-friendly rides for sustainability, introducing green transportation options to reduce environmental impact.",
    },
    {
      title: <span className="text-yellow-400">Community Milestone</span>,
      desc: "Hit 5 million rides with community-focused projects, building trust and delivering reliable service to millions of users.",
    },
    {
      title: <span className="text-yellow-400">Face Verification Security</span>,
      desc: "Introduced mandatory driver face verification. After entering the OTP and before starting the ride, drivers must verify their face to ensure passenger safety.",
    },
  ];

  return (
    <>
      <main className="bg-black text-[#f9fafc] relative overflow-hidden">
        {/* Floating dreamy glowing blobs */}
        <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#fcd129]/10 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-[#fcd129]/10 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-[#fcd129]/10 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        {/* About Section */}
        <section ref={addToRefs} className="bg-black/10 py-20 text-center relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-7xl font-bold text-white mt-24">
              We Are <span className="text-yellow-400">DriWE</span>
            </h1>
            <p className="text-md md:text-xl text-gray-300 mt-6 max-w-6xl mx-auto">
              We design seamless, safe, affordable travel experiences that connect
              people effortlessly and make commuting stress-free.
            </p>
            <p ref={cycleRef} className="text-2xl font-semibold text-[#fcd129] mt-4">
              Smart
            </p>
          </div>
        </section>

        <hr className="my-20 h-px border-0 bg-gray-700" />

        {/* Mission & Vision */}
        <section ref={addToRefs} className="max-w-7xl mx-auto px-6 relative z-10">
          <h3 className="text-center text-4xl font-bold mb-4">
            Our Mission <span className="text-yellow-400">&</span> Vision
          </h3>
          <p className="text-center text-base mb-12 text-gray-400">
            Driving towards a better future for urban transportation
          </p>
          <div className="text-white flex flex-col md:flex-row gap-6">
            {[
              {
                title: <>Our <span className="text-yellow-400">Mission</span></>,
                text: "At DriWE, our mission is to make every ride smooth, safe, and affordable for our customers. We believe in complete transparency, ensuring there are no hidden charges-only a clear, honest, and reliable ride experience.",
              },
              {
                title: <>Our <span className="text-yellow-400">Vision</span></>,
                text: "Our vision is to become the world’s best and safest ride-hailing application, setting new standards in reliability, service quality, and customer experience.",
              },
            ].map((card, i) => (
              <Card
                key={i}
                className="flex-1 hover:scale-105 transition-transform duration-300 bg-gray-900/50 border-gray-700"
              >
                <CardHeader>
                  <CardTitle className="text-white py-4">{card.title}</CardTitle>
                  <CardDescription className="text-gray-300">{card.text}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        <hr className="my-20 h-px border-0 bg-gray-700" />

        {/* NEW HORIZONTAL JOURNEY SECTION */}
        <section className="relative py-32 overflow-hidden bg-black" ref={journeySectionRef}>
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 -left-40 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-amber-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <h3 className="text-center text-4xl md:text-5xl font-bold mb-4">
              Our <span className="text-yellow-400">Journey</span>
            </h3>
            <p className="text-center text-gray-400 mb-16 max-w-2xl mx-auto">
              From a bold idea in Pune to redefining safe & sustainable mobility
            </p>
          </div>

          <div className="journey-horizontal-scroll">
            <div className="journey-track flex gap-12 px-6">
              {journeyFeatures.map((feature, i) => (
                <div
                  key={i}
                  className="journey-card-minimal group relative flex-shrink-0 w-[380px] md:w-[420px]"
                  onMouseMove={handleHoverBurst}
                >
                  <div className="relative h-full bg-gradient-to-br from-gray-900/90 via-gray-900 to-gray-900/90 backdrop-blur-xl border border-gray-800 rounded-3xl p-10 overflow-hidden shadow-2xl transition-all duration-500 group-hover:scale-105 group-hover:shadow-yellow-500/30">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-amber-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
                    <div className="absolute -top-6 -left-6 w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center text-black text-3xl font-bold shadow-2xl z-10">
                      {i + 1}
                    </div>
                    <h4 className="text-2xl font-bold mt-8 mb-4">{feature.title}</h4>
                    <p className="text-gray-300 leading-relaxed">{feature.desc}</p>
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-700"></div>
                  </div>
                </div>
              ))}
              {/* Duplicate for seamless loop */}
              {journeyFeatures.map((feature, i) => (
                <div key={`dup-${i}`} className="journey-card-minimal flex-shrink-0 w-[380px] md:w-[420px]" aria-hidden="true">
                  <div className="relative h-full bg-gradient-to-br from-gray-900/90 via-gray-900 to-gray-900/90 backdrop-blur-xl border border-gray-800 rounded-3xl p-10 overflow-hidden shadow-2xl">
                    <div className="absolute -top-6 -left-6 w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center text-black text-3xl font-bold shadow-2xl">
                      {i + 1}
                    </div>
                    <h4 className="text-2xl font-bold mt-8 mb-4">{feature.title}</h4>
                    <p className="text-gray-300 leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-20 gap-3">
            {journeyFeatures.map((_, i) => (
              <div
                key={i}
                className="journey-dot w-2 h-2 bg-gray-600 rounded-full transition-all duration-500 data-[active=true]:w-10 data-[active=true]:bg-yellow-400"
                data-active="false"
              />
            ))}
          </div>
        </section>

        <hr className="my-20 h-px border-0 bg-gray-700" />

        {/* Leadership Team */}
        <section ref={addToRefs} className="bg-black py-12 px-6 rounded-lg text-center relative z-10">
          <h3 className="text-2xl font-bold mb-3">
            Leadership <span className="text-yellow-400">Team</span>
          </h3>
          <p className="text-base mb-10">Meet the visionaries driving DriWE forward</p>
          <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 justify-center">
            {[
              { name: "Imroz Khan", role: "CEO", img: "https://placehold.co/80x80/1a1a1a/fcd129?text=Imroz+K" },
              { name: "Rozina Khan", role: "Director", img: "https://placehold.co/80x80/1a1a1a/fcd129?text=Rozina+K" },
              { name: "Navid Khan", role: "Director", img: "https://placehold.co/80x80/1a1a1a/fcd129?text=Navid+K" },
            ].map((person, i) => (
              <div
                key={i}
                className="bg-gray-900 rounded-lg p-6 text-center transform transition duration-300 hover:scale-105 hover:shadow-xl"
              >
                <Image
                  src={person.img}
                  alt={person.name}
                  width={96}
                  height={96}
                  className="mx-auto rounded-full mb-3 w-24 h-24 object-cover"
                  priority
                />
                <h5 className="font-bold text-lg mb-1">{person.name}</h5>
                <p className="text-sm text-[#fcd129] font-semibold">{person.role}</p>
              </div>
            ))}
          </div>
        </section>

        <hr className="my-20 h-px border-0 bg-gray-700" />

        {/* What Our Users Say */}
        <section ref={addToRefs} className="bg-[#fcd129]/10 py-12 px-6 rounded-lg relative z-10">
          <h3 className="text-center text-2xl font-bold text-white mb-3">
            What Our <span className="text-yellow-400">Users</span> Say
          </h3>
          <p className="text-center text-base text-gray-300 mb-8">
            Real feedback from our happy riders and drivers
          </p>
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Priya Sharma", text: "DriWE has made my daily commute so much easier and affordable!" },
              { name: "Rahul Verma", text: "I love the eco-friendly ride options and smooth booking process." },
              { name: "Ananya Singh", text: "The drivers are always polite, and the service is top-notch." },
            ].map((review, i) => (
              <div
                key={i}
                className="bg-gray-900 text-white rounded-lg p-6 shadow-md text-center hover:shadow-xl hover:scale-105 transition-transform duration-300"
              >
                <p className="italic text-sm mb-4">&quot;{review.text}&quot;</p>
                <h5 className="font-bold text-lg text-yellow-400">{review.name}</h5>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* SINGLE GLOBAL STYLES - NO NESTING */}
      <style jsx global>{`
        /* Blob animation */
        @keyframes blob {
          0%, 100% { transform: scale(1) translate(0, 0); }
          33% { transform: scale(1.1) translate(10px, -20px); }
          66% { transform: scale(0.9) translate(-10px, 10px); }
        }
        .animate-blob { animation: blob 10s infinite cubic-bezier(0.4, 0, 0.2, 1); }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }

        /* Horizontal scroll container */
        .journey-horizontal-scroll {
          overflow-x: auto;
          scrollbar-width: none;
          -ms-overflow-style: none;
          padding: 2rem 0;
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
        .journey-horizontal-scroll::-webkit-scrollbar {
          display: none;
        }
        .journey-track {
          display: flex;
          width: max-content;
        }
      `}</style>
    </>
  );
}