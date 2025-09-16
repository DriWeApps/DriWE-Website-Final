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
// Removed unused ArrowRight import

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

    // Section animations
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
            end: "bottom 20%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    // Journey cards scroll animation
    if (journeySectionRef.current) {
      const journeyCards =
        journeySectionRef.current.querySelectorAll(".journey-card-wrap");
      const tlJourney = gsap.timeline({
        scrollTrigger: {
          trigger: journeySectionRef.current,
          start: "top 60%",
          end: "bottom 20%",
          scrub: 1,
          pinSpacing: false,
        },
      });

      journeyCards.forEach((card, index) => {
        const fromY = index % 2 === 0 ? "30%" : "-30%";
        const toY = index % 2 === 0 ? "-30%" : "30%";
        tlJourney.fromTo(
          card,
          { y: fromY, opacity: 0, scale: 0.95 },
          {
            y: toY,
            opacity: 1,
            scale: 1,
            ease: "power2.out",
            duration: 1,
          },
          index * 0.3
        );
      });
    }

    // Cleanup on unmount
    return () => {
      clearInterval(interval);
      ScrollTrigger.getAll().forEach((trigger: ScrollTrigger) =>
        trigger.kill()
      );
    };
  }, []);

  // Utility to add refs
  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  // Hover particle burst effect
  const handleHoverBurst = (e: React.MouseEvent<HTMLDivElement>) => {
    const burst = document.createElement("span");
    burst.className =
      "absolute w-2 h-2 rounded-full animate-ping opacity-50 pointer-events-none";
    burst.style.backgroundColor = currentTheme.primary;
    burst.style.left = `${e.nativeEvent.offsetX}px`;
    burst.style.top = `${e.nativeEvent.offsetY}px`;
    e.currentTarget.appendChild(burst);

    setTimeout(() => {
      burst.remove();
    }, 1000);
  };

  const journeyFeatures = [
    {
      title: <span className="text-yellow-400">Founded with Vision</span>,
      desc: "DriWe founded with a mission to make travel accessible and transform urban mobility through innovative technology solutions.",
    },
    {
      title: <span className="text-yellow-400">Multi-City Expansion</span>,
      desc: "Expanded to multiple cities with a growing driver base, establishing strong community connections across regions.",
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
      title: <span className="text-yellow-400">AI Innovation</span>,
      desc: "Innovating AI-based route optimization and safety features, leveraging cutting-edge technology for smarter transportation.",
    },
  ];

  return (
    <main className="bg-black text-[#f9fafc] relative">
      {/* Floating dreamy glowing blobs */}
      <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#fcd129]/10 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-[#fcd129]/10 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-[#fcd129]/10 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* About Section */}
      <section
        ref={addToRefs}
        className="bg-black/10 py-20 text-center relative z-10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mt-24">
            We Are <span className="text-yellow-400">DriWE</span>
          </h1>

          <p className="text-md md:text-xl text-gray-300 mt-6 max-w-6xl mx-auto">
            We design seamless, safe, affordable travel experiences that connect
            people effortlessly and make commuting stress-free.
          </p>
          <p
            ref={cycleRef}
            className="text-2xl font-semibold text-[#fcd129] mt-4"
          >
            Smart
          </p>
        </div>
        <div className="flex justify-center gap-3 mt-6 flex-wrap">
          <button className="bg-[#fcd129] text-2xl px-5 py-3 rounded-lg flex items-center gap-2 hover:bg-[#d69e2e] hover:scale-105 transition-transform duration-300 shadow hover:shadow-lg font-bold text-black">
            Join Our Team
          </button>
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
              title: (
                <>
                  Our <span className="text-yellow-400">Mission</span>
                </>
              ),
              text: "To offer dependable, reasonably priced, and safe transportation options that empower drivers, bridge communities, and lessen the impact on the environment and urban traffic.",
            },
            {
              title: (
                <>
                  Our <span className="text-yellow-400">Vision</span>
                </>
              ),
              text: "To become the world's most trusted mobility platform, creating a seamless ecosystem where technology, sustainability, and human connection drive the future of transportation.",
            },
          ].map((card, i) => (
            <Card
              key={i}
              className="flex-1 hover:scale-105 transition-transform duration-300 bg-gray-900/50 border-gray-700"
            >
              <CardHeader>
                <CardTitle className="text-white py-4">{card.title}</CardTitle>
                <CardDescription className="text-gray-300">
                  {card.text}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <hr className="my-20 h-px border-0 bg-gray-700" />

      {/* Enhanced Journey Section */}
      <section
        ref={journeySectionRef}
        className="relative bg-black py-20 px-6 overflow-hidden z-10"
      >
        {/* Reduced marquee lines */}
        <div
          className="absolute inset-0 flex flex-col justify-center gap-8 pointer-events-none z-0"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          <div className="whitespace-nowrap animate-marquee text-gray-800 text-[4rem] font-light tracking-widest opacity-10">
            {"Vision  Progress  Connection  Journey  Purpose  Growth  Impact  ".repeat(
              2
            )}
          </div>
          <div className="whitespace-nowrap animate-marquee-reverse text-gray-800 text-[4rem] font-light tracking-widest opacity-10">
            {"Vision  Progress  Connection  Journey  Purpose  Growth  Impact  ".repeat(
              2
            )}
          </div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <h3 className="text-center text-3xl font-bold mb-3">
            Our <span className="text-yellow-400">Journey</span>
          </h3>
          <p className="text-center text-base mb-12">
            From humble beginnings to a leading mobility solution
          </p>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-[#fcd129] h-full z-0"></div>
            {journeyFeatures.map((feature, i) => (
              <div
                key={i}
                className={`journey-card-wrap flex mb-16 items-center flex-col md:flex-row ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } z-10`}
              >
                <div className="w-full md:w-1/2 px-6">
                  <div
                    onMouseMove={handleHoverBurst}
                    className="group relative bg-gray-900/50 shadow-lg rounded-xl p-8 transform transition-all duration-500 hover:scale-105 hover:-translate-y-2 hover:shadow-2xl border border-gray-700"
                  >
                    <h3 className="text-xl font-semibold text-white mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed mb-6">
                      {feature.desc}
                    </p>
                  </div>
                </div>
                <div className="relative w-10 h-10 bg-[#fcd129] rounded-full z-20 shadow-lg flex items-center justify-center text-black font-bold my-4 md:my-0">
                  <span className="text-sm">{i + 1}</span>
                </div>
                <div className="w-full md:w-1/2"></div>
              </div>
            ))}
          </div>
        </div>

        {/* CSS Animations */}
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          @keyframes marqueeReverse {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0%); }
          }
          .animate-marquee {
            display: inline-block;
            animation: marquee 20s linear infinite;
          }
          .animate-marquee-reverse {
            display: inline-block;
            animation: marqueeReverse 20s linear infinite;
          }
          @keyframes blob {
            0% { transform: scale(1) translate(0, 0); }
            33% { transform: scale(1.1) translate(10px, -20px); }
            66% { transform: scale(0.9) translate(-10px, 10px); }
            100% { transform: scale(1) translate(0, 0); }
          }
          .animate-blob {
            animation: blob 10s infinite cubic-bezier(0.4, 0, 0.2, 1);
          }
          .animation-delay-2000 { animation-delay: 2s; }
          .animation-delay-4000 { animation-delay: 4s; }
        `}</style>
      </section>

      <hr className="my-20 h-px border-0 bg-gray-700" />

      {/* Leadership Team */}
      <section
        ref={addToRefs}
        className="bg-black py-12 px-6 rounded-lg text-center relative z-10"
      >
        <h3 className="text-2xl font-bold mb-3">
          Leadership <span className="text-yellow-400">Team</span>
        </h3>
        <p className="text-base mb-10">
          Meet the visionaries driving DriWe forward
        </p>

        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6 justify-center">
          {[
            {
              name: "Imroz Khan",
              role: "CEO",
              desc: "Former Uber executive with 10+ years in mobility tech",
              img: "https://placehold.co/80x80/1a1a1a/fcd129?text=Imroz+K",
            },
            {
              name: "Navid Khan",
              role: "Director",
              desc: "AI & machine learning expert from Google",
              img: "https://placehold.co/80x80/1a1a1a/fcd129?text=Navid+K",
            },
          ].map((person, i) => (
            <div
              key={i}
              className="bg-gray-900 rounded-lg p-6 text-center transform transition duration-300 hover:scale-105 hover:shadow-xl hover:-rotate-1 hover:-translate-y-1"
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
              <p className="text-sm text-[#fcd129] font-semibold mb-1">
                {person.role}
              </p>
              <p className="text-sm leading-relaxed text-gray-300">
                {person.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <hr className="my-20 h-px border-0 bg-gray-700" />

      {/* What Our Users Say */}
      <section
        ref={addToRefs}
        className="bg-[#fcd129]/10 py-12 px-6 rounded-lg relative z-10"
      >
        <h3 className="text-center text-2xl font-bold text-white mb-3">
          What Our <span className="text-yellow-400">Users</span> Say
        </h3>
        <p className="text-center text-base text-gray-300 mb-8">
          Real feedback from our happy riders and drivers
        </p>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: "Priya Sharma",
              text: "DriWe has made my daily commute so much easier and affordable!",
            },
            {
              name: "Rahul Verma",
              text: "I love the eco-friendly ride options and smooth booking process.",
            },
            {
              name: "Ananya Singh",
              text: "The drivers are always polite, and the service is top-notch.",
            },
          ].map((review, i) => (
            <div
              key={i}
              className="bg-gray-900 text-white rounded-lg p-6 shadow-md text-center hover:shadow-xl hover:scale-105 transition-transform duration-300 hover:-translate-y-1"
            >
              <p className="italic text-sm mb-4">&quot;{review.text}&quot;</p>
              <h5 className="font-bold text-lg text-yellow-400">
                {review.name}
              </h5>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
