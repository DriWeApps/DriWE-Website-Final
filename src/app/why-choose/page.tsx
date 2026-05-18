"use client";

import React, { useRef, useLayoutEffect, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import {
  Shield,
  Clock,
  Zap,
  MapPin,
  ShieldCheck,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import BookNowButton from "@/components/BookNowButton";

gsap.registerPlugin(ScrollTrigger);

/* ----------------------- Animated Counter ----------------------- */
function AnimatedCounter({
  end,
  label,
}: {
  end: number;
  label: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    if (!ref.current) return;

    gsap.fromTo(
      ref.current,
      { innerText: 0 },
      {
        innerText: end,
        duration: 2.5,
        ease: "elastic.out(1, 0.3)",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        snap: { innerText: 1 },
        overwrite: "auto",
      }
    );
  }, [end]);

  return (
    <div className="text-center">
      <span
        ref={ref}
        className="text-4xl font-extrabold text-white"
      ></span>
      <p className="text-white mt-2">{label}</p>
    </div>
  );
}

/* ----------------------- Reusable Image Section ----------------------- */
function AnimatedImageSection({
  imgSrc,
  title,
  description,
  verticalLine = false,
}: {
  imgSrc: string;
  title: string;
  description: string;
  verticalLine?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (
      !ref.current ||
      !imageRef.current ||
      !titleRef.current ||
      !descRef.current ||
      !buttonRef.current
    ) {
      return;
    }

    gsap.fromTo(
      ref.current.children,
      {
        opacity: 0,
        y: 120,
        rotateX: -25,
        scale: 0.9,
      },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        scale: 1,
        duration: 1.4,
        ease: "power4.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    gsap.fromTo(
      imageRef.current,
      {
        y: 40,
        scale: 1.1,
        opacity: 0.8,
      },
      {
        y: -30,
        scale: 1,
        opacity: 1,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 90%",
          end: "bottom 10%",
          scrub: 1,
        },
      }
    );

    gsap.fromTo(
      titleRef.current,
      {
        opacity: 0,
        y: 40,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
        },
      }
    );

    gsap.fromTo(
      descRef.current,
      {
        opacity: 0,
        x: 80,
      },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
        },
      }
    );

    gsap.fromTo(
      buttonRef.current,
      {
        scale: 0.8,
        opacity: 0,
      },
      {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        ease: "bounce.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
        },
      }
    );

    const el = ref.current;
    const img = imageRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();

      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(el, {
        rotateY: x / 35,
        rotateX: -y / 35,
        duration: 0.4,
        ease: "power2.out",
      });

      gsap.to(img, {
        scale: 1.05,
        duration: 0.3,
      });
    };

    const reset = () => {
      gsap.to(el, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.5,
      });

      gsap.to(img, {
        scale: 1,
        duration: 0.3,
      });
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", reset);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", reset);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="relative flex flex-col md:flex-row items-center justify-between border border-yellow-500/10 py-24 px-8 bg-white shadow-2xl rounded-3xl my-12 overflow-hidden"
    >
      <div
        ref={imageRef}
        className="w-full md:w-1/3 flex justify-center mb-10 md:mb-0 relative z-10"
      >
        <Image
          src={imgSrc}
          alt={title}
          width={350}
          height={250}
          className="rounded-2xl shadow-xl object-contain"
          loading="lazy"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>

      {verticalLine && (
        <div className="hidden md:block w-1 bg-black rounded-full h-80 mx-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white to-transparent opacity-50 animate-pulse"></div>
        </div>
      )}

      <div className="w-full md:w-2/3 relative z-10">
        <h3
          ref={titleRef}
          className="text-3xl font-extrabold text-black tracking-tight"
        >
          {title}
        </h3>

        <p
          ref={descRef}
          className="text-lg md:text-xl text-black leading-relaxed mt-6 whitespace-pre-line"
        >
          {description}
        </p>

        <div ref={buttonRef} className="mt-8">
          <BookNowButton className="px-5 py-2 rounded font-semibold text-black shadow" />
        </div>
      </div>
    </div>
  );
}

/* ----------------------- Benefit Item ----------------------- */
type BenefitItemProps = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: React.ReactNode;
  description: string;
  sectionRef?: React.RefObject<HTMLDivElement>;
};

function BenefitItem({
  icon: Icon,
  title,
  description,
  sectionRef,
}: BenefitItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const iconRef = useRef<SVGSVGElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    if (!ref.current || !titleRef.current || !descRef.current) return;

    gsap.fromTo(
      ref.current,
      {
        opacity: 0,
        y: 80,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
        },
      }
    );
  }, []);

  return (
  <div
    ref={sectionRef || ref}
    className="flex flex-col gap-6 py-10 transform-gpu relative"
  >
    <div className="flex items-center gap-4 relative z-10">
      <Icon
        ref={iconRef}
        className="w-10 h-10 text-white transition-transform duration-200"
      />

      <h3
        ref={titleRef}
        className="text-2xl font-semibold text-white tracking-tight"
      >
        {title}
      </h3>
    </div>

    <p
      ref={descRef}
      className="text-lg text-white text-center max-w-3xl mx-auto relative z-10"
    >
      {description}
    </p>

    {/* White Horizontal Line After Description */}
    <div className="w-full h-[1px] bg-white opacity-80 mt-4"></div>
  </div>
);
}

/* ----------------------- Stats Section ----------------------- */
function StatsSection() {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (!ref.current) return;

    gsap.fromTo(
      ref.current.querySelectorAll(".counter"),
      {
        opacity: 0,
        scale: 0.8,
      },
      {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        stagger: 0.2,
        ease: "elastic.out(1, 0.5)",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <section
      ref={ref}
      className="py-20 px-6 md:px-20 bg-black text-white relative overflow-hidden"
    >
      <h2 className="text-5xl font-extrabold text-center mb-16 tracking-tight">
        Our <span className="text-yellow-400">Impact</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
        <div className="counter">
          <AnimatedCounter end={1000} label="Rides Completed" />
        </div>

        <div className="counter">
          <AnimatedCounter end={1000} label="Happy Customers" />
        </div>

        <div className="counter">
          <AnimatedCounter end={50} label="Places Covered" />
        </div>
      </div>
    </section>
  );
}

/* ----------------------- Typing Animation ----------------------- */
function TypingAnimation() {
  const words = React.useMemo(
    () => ["Travel", "Explore", "Connect", "Ride", "Discover"],
    []
  );

  const [currentWord, setCurrentWord] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const current = words[wordIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setCurrentWord(current.substring(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);

        if (charIndex === current.length) {
          setTimeout(() => {
            setIsDeleting(true);
          }, 1000);
        }
      } else {
        setCurrentWord(current.substring(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);

        if (charIndex === 0) {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, isDeleting ? 80 : 120);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, wordIndex, words]);

  return (
    <span className="text-yellow-400 font-bold">
      {currentWord}
    </span>
  );
}

/* ----------------------- Main Page ----------------------- */
export default function DriwePage3D() {
  const firstBenefitRef =
    useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;

  const handleGetStartedClick = () => {
    if (firstBenefitRef.current) {
      firstBenefitRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="bg-black text-white transition-colors duration-500 overflow-hidden">

      {/* Hero Section */}
      <section className="min-h-[80vh] flex flex-col justify-center items-center bg-black relative overflow-hidden px-6 sm:px-10 md:px-20">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight drop-shadow-2xl">
            <span className="text-white">Why Choose </span>

            <span className="text-yellow-400">DriWE?</span>
          </h1>

          <p className="mt-6 sm:mt-8 text-base sm:text-lg md:text-2xl opacity-90 max-w-3xl mx-auto tracking-wide">
            Where Technology Meets <TypingAnimation />
          </p>

          <button
            onClick={handleGetStartedClick}
            className="mt-8 sm:mt-10 px-8 sm:px-12 py-3 sm:py-4 bg-black border border-yellow-400 text-white font-bold rounded-full hover:shadow-[0_0_15px_rgba(255,215,0,0.8)] hover:scale-105 transition-all duration-300 text-sm sm:text-base"
          >
            Get Started
          </button>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-black text-white px-8 md:px-20 py-24 relative overflow-hidden">
        <div className="space-y-16 max-w-5xl mx-auto relative z-10">

          <BenefitItem
            icon={Clock}
            title="Always On Your Time"
            description="Punctuality is our promise. DriWE ensures rides are always on time — whether it’s a daily commute, a business trip, or a late-night ride home. Your time matters, and we’re here to keep you moving"
            sectionRef={firstBenefitRef}
          />

          <BenefitItem
            icon={Zap}
            title="Quick Booking"
            description="Your time is valuable. Skip the wait and book your ride in seconds with DriWE. Our smart system connects you to the nearest driver, ensuring faster pickups. Travel planning made effortless."
          />

          <BenefitItem
            icon={ShieldCheck}
            title="Safe & Trusted"
            description="Every ride you book comes with clear, upfront pricing. No hidden costs, no last-minute surprises. DriWE gives you transparent pricing before every ride."
          />

          <BenefitItem
            icon={Shield}
            title="Verified Drivers"
            description="Your safety is our top priority. Every driver on DriWE is trusted and reliable through strict verification and training. Every journey is secure, comfortable, and worry-free."
          />

          <BenefitItem
            icon={MapPin}
            title="Live Tracking"
            description="Your safety comes first with every ride.All drivers are carefully vetted, trained, and verified to ensure a secure and reliable experience every time."
          />

          <BenefitItem
            icon={Clock}
            title="24/7 Availability"
            description="Day or night, weekday or weekend — DriWE is always here for you. With round-the-clock service, you can count on us whenever you need a ride."
          />
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 px-6 bg-gradient-to-br from-yellow-500/10 to-yellow-400/5 backdrop-blur-xl border border-yellow-500/20 rounded-3xl shadow-[0_0_30px_rgba(250,204,21,0.08)] relative overflow-hidden">
        
        <h2 className="text-4xl md:text-5xl font-extrabold mb-16 text-white text-center tracking-tight">
          What Our <span className="text-yellow-400">Riders</span> Say
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          <Card
            className="max-w-xs sm:max-w-sm w-full mx-auto mb-16 p-6 text-center hover:scale-[1.05] transition-all duration-300"
            variant="darkGlass"
          >
            <h3 className="text-2xl font-bold mb-4">
              Rahul Mehta
            </h3>

            <p className="mb-6 text-white/80">
              Great service and reliable for business deliveries.
              Highly recommend!
            </p>
          </Card>

          <Card
            className="max-w-xs sm:max-w-sm w-full mx-auto mb-16 p-6 text-center hover:scale-[1.05] transition-all duration-300"
            variant="darkGlass"
          >
            <h3 className="text-2xl font-bold mb-4">
              Priya Singh
            </h3>

            <p className="mb-6 text-white/80">
              Affordable pricing and very comfortable.
              DriWE is my daily travel partner!
            </p>
          </Card>

          <Card
            className="max-w-xs sm:max-w-sm w-full mx-auto mb-16 p-6 text-center hover:scale-[1.05] transition-all duration-300"
            variant="darkGlass"
          >
            <h3 className="text-2xl font-bold mb-4">
              Amit Sharma
            </h3>

            <p className="mb-6 text-white/80">
              The rides are always on time and the drivers are polite.
              Best experience ever!
            </p>
          </Card>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 px-6 md:px-20 bg-black">

        <AnimatedImageSection
          imgSrc="/images/Bike image.avif"
          title="Bike Rides"
          description="Affordable and hassle-free bike rides made for your daily commute. Skip the jams, save time, and enjoy a smooth, reliable trip that’s perfect for short distances."
          verticalLine={true}
        />

        <AnimatedImageSection
          imgSrc="/images/Auto image.png"
          title="Auto Rickshaw"
          description="Efficient, safe, and cost-effective travel solutions.Perfect for short distances, designed to meet your daily needs."
          verticalLine={true}
        />

        <AnimatedImageSection
          imgSrc="/images/car image BMW.png"
          title="Car Rides"
          description="Ride stress-free in our secure and spacious cars.Perfect for casual travel or special events,our service promises reliability at every turn."
          verticalLine={true}
        />

        <AnimatedImageSection
          imgSrc="/images/miniBus.png"
          title="Bus"
          description="Enjoy stress-free travel with our safe and budget-friendly buses.Whether it’s daily office rides, family trips, or long journeys,we make every ride comfortable and reliable."
          verticalLine={true}
        />

        <AnimatedImageSection
          imgSrc="/images/TempoTata.jpg"
          title="Tempos"
          description="Dependable tempo services for all your transport needs.Ideal for small businesses, daily deliveries, or home shifting—affordable, secure, and always on time."
          verticalLine={true}
        />

        <AnimatedImageSection
          imgSrc="/images/Truck image.png"
          title="Truck"
          description="Trusted truck services for business and personal needs.We ensure safe, fast, and convenient deliveries,making transport simpler and stress-free."
          verticalLine={true}
        />
      </section>

      <StatsSection />

      {/* CTA */}
      <section className="py-24 px-8 md:px-20 bg-black text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto text-center">

          <h2 className="text-5xl md:text-6xl font-extrabold mb-8 tracking-tight">
            Ready <span className="text-yellow-400">to</span> Ride with{" "}
            <span className="text-yellow-400">DriWE?</span>
          </h2>

          <p className="max-w-3xl mx-auto mb-12 text-lg leading-relaxed text-white/80">
            Whether it’s your daily commute, a quick business delivery, or a weekend getaway, DriWE is here to make every ride smarter, safer, and more reliable. With just a few taps, you can book instantly and travel stress-free. Sit back, relax, and enjoy the journey — because with DriWE, your safety is our top priority.
          </p>

          <div className="flex justify-center">
            <BookNowButton className="px-12 py-4 rounded font-semibold text-black shadow bg-white hover:shadow-[0_0_15px_rgba(255,215,0,0.8)] hover:scale-105 transition-all" />
          </div>
        </div>
      </section>
    </div>
  );
}