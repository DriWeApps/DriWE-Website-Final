"use client";
import React, { useRef, useLayoutEffect, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { Shield, Clock, Zap, MapPin, ShieldCheck, Menu } from "lucide-react";
import { Card } from "@/components/ui/card";
import BookNowButton from "@/components/BookNowButton";

gsap.registerPlugin(ScrollTrigger);

/* ----------------------- Scroll Progress Indicator ----------------------- */
function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useLayoutEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(progress);
    };

    window.addEventListener("scroll", updateProgress);
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-black z-50">
      <div
        className="h-full bg-[#4b6cb7] transition-all duration-300"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
}

/* ----------------------- Animated Counter ----------------------- */
function AnimatedCounter({ end, label }: { end: number; label: string }) {
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
        onUpdate: () => {
          gsap.to(ref.current, {
            scale: 1.2,
            duration: 0.2,
            ease: "power2.out",
            yoyo: true,
            repeat: 1,
          });
        },
        overwrite: "auto",
      }
    );
  }, [end]);

  return (
    <div className="text-center">
      <span ref={ref} className="text-4xl font-extrabold text-white"></span>
      <p className="text-white mt-2">{label}</p>
    </div>
  );
}

/* ----------------------- Reusable 3D Section ----------------------- */
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
  const [, setIsMobile] = useState(false);

  useLayoutEffect(() => {
    // Check for mobile view
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useLayoutEffect(() => {
    if (
      !ref.current ||
      !imageRef.current ||
      !titleRef.current ||
      !descRef.current ||
      !buttonRef.current
    )
      return;

    gsap.fromTo(
      ref.current.children,
      { opacity: 0, y: 120, rotateX: -25, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        scale: 1,
        duration: 1.6,
        ease: "power4.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        overwrite: "auto",
      }
    );

    gsap.fromTo(
      imageRef.current,
      { y: 50, scale: 1.2, opacity: 0.8 },
      {
        y: -50,
        scale: 1,
        opacity: 1,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 90%",
          end: "bottom 10%",
          scrub: 1.5,
        },
        overwrite: "auto",
      }
    );

    const titleChars = titleRef.current.textContent?.split("") || [];
    titleRef.current.innerHTML = titleChars
      .map(
        (char) =>
          `<span class=\"inline-block\" style=\"opacity: 0\">${
            char === " " ? "&nbsp;" : char
          }</span>`
      )
      .join("");
    gsap.fromTo(
      titleRef.current.querySelectorAll("span"),
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.05,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
        },
        overwrite: "auto",
      }
    );

    gsap.fromTo(
      descRef.current,
      { opacity: 0, x: 100 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
        },
        overwrite: "auto",
      }
    );

    gsap.fromTo(
      buttonRef.current,
      { scale: 0.8, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        ease: "bounce.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
        },
        overwrite: "auto",
      }
    );

    const el = ref.current;
    const img = imageRef.current;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(el, {
        rotateY: x / 30,
        rotateX: -y / 30,
        boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
        duration: 0.4,
        ease: "power2.out",
        overwrite: "auto",
      });
      gsap.to(img, {
        scale: 1.15,
        filter: "brightness(1.2)",
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto",
      });
    };
    const reset = () => {
      gsap.to(el, {
        rotateX: 0,
        rotateY: 0,
        boxShadow: "0 10px 20px rgba(0,0,0,0.4)",
        duration: 0.6,
        ease: "power2.out",
        overwrite: "auto",
      });
      gsap.to(img, {
        scale: 1,
        filter: "brightness(1)",
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto",
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
      className="relative flex flex-col md:flex-row items-center justify-between border-b border-[#4b6cb7] py-24 px-8 bg-white shadow-2xl rounded-3xl transform-gpu my-12 overflow-hidden"
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
          className="rounded-2xl shadow-xl object-contain transform transition-transform duration-300"
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
          <BookNowButton className="px-5 py-2 rounded font-semibold text-black shadow " />
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

function BenefitItem({ icon: Icon, title, description, sectionRef }: BenefitItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const iconRef = useRef<SVGSVGElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    if (
      !ref.current ||
      !iconRef.current ||
      !titleRef.current ||
      !descRef.current
    )
      return;

    gsap.fromTo(
      iconRef.current,
      { opacity: 0, scale: 0, rotate: -180 },
      {
        opacity: 1,
        scale: 1,
        rotate: 0,
        duration: 1,
        ease: "bounce.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
        },
        overwrite: "auto",
      }
    );

    gsap.fromTo(
      titleRef.current,
      { opacity: 0, x: -100 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
        },
        overwrite: "auto",
      }
    );

    gsap.fromTo(
      descRef.current,
      { opacity: 0, x: 100 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
        },
        overwrite: "auto",
      }
    );

    const handleMouseEnter = () => {
      gsap.to(iconRef.current, {
        scale: 1.3,
        rotate: 360,
        duration: 0.5,
        ease: "elastic.out(1, 0.5)",
        overwrite: "auto",
      });
    };
    const handleMouseLeave = () => {
      gsap.to(iconRef.current, {
        scale: 1,
        rotate: 0,
        duration: 0.5,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    const iconNode = iconRef.current;
    iconNode?.addEventListener("mouseenter", handleMouseEnter);
    iconNode?.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      if (iconNode) {
        iconNode.removeEventListener("mouseenter", handleMouseEnter);
        iconNode.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return (
    <div
      ref={sectionRef || ref}
      className="flex flex-col gap-6 py-10 border-b border-white transform-gpu relative"
    >
      <div className="flex items-center gap-4 relative z-10">
        <Icon className="w-10 h-10 text-white transition-transform duration-200" />
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
    </div>
  );
}

/* ----------------------- Contact Form ----------------------- */
function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  const inputRefs = useRef<(HTMLInputElement | HTMLTextAreaElement)[]>([]);

  useLayoutEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(
      ref.current.querySelectorAll("label, input, textarea, button"),
      { opacity: 0, y: 100, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.4,
        ease: "power4.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        overwrite: "auto",
      }
    );

    const inputNodes = [...inputRefs.current];
    inputNodes.forEach((input) => {
      input.addEventListener("focus", () => {
        gsap.to(input, {
          boxShadow: "0 0 10px rgba(75, 108, 183, 0.8)",
          duration: 0.3,
          ease: "power2.out",
          overwrite: "auto",
        });
      });
      input.addEventListener("blur", () => {
        gsap.to(input, {
          boxShadow: "none",
          duration: 0.3,
          ease: "power2.out",
          overwrite: "auto",
        });
      });
    });
    return () => {
      inputNodes.forEach((input) => {
        input.removeEventListener("focus", () => {});
        input.removeEventListener("blur", () => {});
      });
    };
  }, []);

  useLayoutEffect(() => {
    if (!notificationRef.current || !notification) return;
    gsap.fromTo(
      notificationRef.current,
      { x: 300, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
        onComplete: () => {
          setTimeout(() => {
            gsap.to(notificationRef.current!, {
              x: 300,
              opacity: 0,
              duration: 0.5,
              ease: "power2.in",
              onComplete: () => setNotification(null),
            });
          }, 3000);
        },
      }
    );
  }, [notification]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!buttonRef.current) return;
    if (!form.name || !form.email || !form.message) {
      setNotification({ message: "Please fill all details", type: "error" });
      gsap.to(buttonRef.current, {
        x: -10,
        duration: 0.1,
        repeat: 3,
        yoyo: true,
        ease: "power2.inOut",
      });
      return;
    }
    setIsSubmitting(true);
    gsap.to(buttonRef.current, {
      scale: 0.9,
      duration: 0.2,
      ease: "power2.out",
      overwrite: "auto",
      onComplete: () => {
        gsap.to(buttonRef.current!, {
          scale: 1.2,
          duration: 0.2,
          ease: "power2.out",
          overwrite: "auto",
          onComplete: () => {
            gsap.to(buttonRef.current!, {
              scale: 1,
              duration: 0.2,
              ease: "power2.out",
              overwrite: "auto",
            });
            setNotification({ message: "Message sent successfully", type: "success" });
            setForm({ name: "", email: "", message: "" });
            setIsSubmitting(false);
          },
        });
      },
    });
  };

  return (
    <div
      ref={ref}
      className="p-8 bg-white rounded-2xl shadow-2xl transform-gpu relative overflow-hidden"
      role="form"
      aria-label="Contact form"
    >
      <h3 className="text-3xl font-bold text-black mb-6 relative z-10">
        Connect with Us
      </h3>
      <div className="space-y-5 relative z-10">
        <div className="relative">
          <label
            className={`absolute left-4 top-4 text-black transition-all duration-300 ${
              form.name ? "text-sm -top-2" : ""
            }`}
          >
            Your Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-4 pt-6 rounded-lg bg-white text-black border border-[black] focus:ring-2 focus:ring-[black] transition-all"
            required
            aria-required="true"
            ref={(el) => {
              if (el) inputRefs.current[0] = el;
            }}
          />
        </div>
        <div className="relative">
          <label
            className={`absolute left-4 top-4 text-black transition-all duration-300 ${
              form.email ? "text-sm -top-2" : ""
            }`}
          >
            Your Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-4 pt-6 rounded-lg bg-white text-black border border-[black] focus:ring-2 focus:ring-[black] transition-all"
            required
            aria-required="true"
            ref={(el) => {
              if (el) inputRefs.current[1] = el;
            }}
          />
        </div>
        <div className="relative">
          <label
            className={`absolute left-4 top-4 text-black transition-all duration-300 ${
              form.message ? "text-sm -top-2" : ""
            }`}
          >
            Your Message
          </label>
          <textarea
            name="message"
            placeholder="message"
            rows={5}
            value={form.message}
            onChange={handleChange}
            className="w-full p-4 pt-6 rounded-lg bg-white text-black border border-[black] focus:ring-2 focus:ring-[black] transition-all"
            required
            aria-required="true"
            ref={(el) => {
              if (el) inputRefs.current[2] = el;
            }}
          ></textarea>
        </div>
        <button
          ref={buttonRef}
          type="submit"
          disabled={isSubmitting}
          onClick={handleSubmit}
          className="w-full bg-black text-white font-semibold p-4 rounded-lg hover:shadow-[0_0_15px_rgba(255,215,0,0.5)] hover:scale-105 transition-all focus:ring-2 focus:ring-[#4b6cb7] relative overflow-hidden"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Sending...
            </span>
          ) : (
            "Send Message"
          )}
        </button>
        {notification && (
          <div
            ref={notificationRef}
            className={`fixed top-20 right-0 p-4 text-white text-center rounded-lg shadow-lg z-50 ${
              notification.type === "success" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {notification.message}
          </div>
        )}
      </div>
    </div>
  );
}

/* ----------------------- Stats Section ----------------------- */
function StatsSection() {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(
      ref.current,
      { opacity: 0, rotateX: -10 },
      {
        opacity: 1,
        rotateX: 0,
        duration: 1.5,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        overwrite: "auto",
      }
    );
    gsap.fromTo(
      ref.current.querySelectorAll(".counter"),
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: "elastic.out(1, 0.5)",
        stagger: 0.2,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        overwrite: "auto",
      }
    );
  }, []);

  return (
    <section
      ref={ref}
      className="py-20 px-6 md:px-20 bg-black text-white relative overflow-hidden"
    >
      <h2 className="text-5xl font-extrabold text-center mb-16 relative z-10 tracking-tight">
        Our <span className="text-yellow-400">Impact</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto relative z-10">
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
  const ref = useRef<HTMLSpanElement>(null);
  const [currentWord, setCurrentWord] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const type = () => {
      const current = words[wordIndex];
      if (isPaused) {
        setIsPaused(false);
        return;
      }
      if (isDeleting) {
        setCurrentWord(current.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
        if (charIndex === 0) {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      } else {
        setCurrentWord(current.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
        if (charIndex === current.length) {
          setIsPaused(true);
          setTimeout(() => {
            setIsDeleting(true);
          }, 1000);
          return;
        }
      }
    };
    const timer = setTimeout(type, isPaused ? 1000 : isDeleting ? 200 : 150);
    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, wordIndex, words, isPaused]);

  useLayoutEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(
      ref.current,
      { scale: 0.8, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        overwrite: "auto",
      }
    );
  }, []);

  return (
    <span ref={ref} className="text-yellow-400 font-bold" aria-live="polite">
      {currentWord}
    </span>
  );
}

/* ----------------------- Main Page ----------------------- */
export default function DriwePage3D() {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const firstBenefitRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;

  const handleGetStartedClick = () => {
    if (firstBenefitRef.current) {
      firstBenefitRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="bg-black text-white transition-colors duration-500">
      <ScrollProgress />

      {/* Hero */}
      <section
        ref={heroRef}
        className="min-h-[80vh] flex flex-col justify-center items-center bg-black relative overflow-hidden px-6 sm:px-10 md:px-20"
      >
        <div
          ref={contentRef}
          className="text-center transform-gpu max-w-xl sm:max-w-3xl mx-auto"
        >
          <h1
            ref={titleRef}
            className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight drop-shadow-2xl"
          >
            <span className="text-white">Why Choose </span>
            <span className="text-yellow-400">DriWE?</span>
          </h1>

          <p className="mt-6 sm:mt-8 text-base sm:text-lg md:text-2xl opacity-90 max-w-3xl mx-auto tracking-wide">
            Where Technology Meets <TypingAnimation />
          </p>

          <button
            ref={buttonRef}
            onClick={handleGetStartedClick}
            className="mt-8 sm:mt-10 px-8 sm:px-12 py-3 sm:py-4 bg-black text-white font-bold rounded-full hover:shadow-[0_0_15px_rgba(255,215,0,0.8)] hover:scale-105 transition-all duration-300 focus:ring-2 focus:ring-[white] relative overflow-hidden text-sm sm:text-base"
          >
            Get Started
            <span className="absolute inset-0 bg-[black] opacity-0 hover:opacity-20 transition-opacity duration-300"></span>
          </button>
        </div>
      </section>

      <section className="bg-black text-white px-8 md:px-20 py-24 relative overflow-hidden">
        <div className="space-y-16 max-w-5xl mx-auto relative z-10">
          <BenefitItem
            icon={Clock}
            title={<span className="text-yellow-400">Always On Your Time</span>}
            description="Punctuality is our promise. DriWE ensures rides are always on time — whether it’s a daily commute, a business trip, or a late-night ride home. Your time matters, and we’re here to keep you moving."
            sectionRef={firstBenefitRef}
          />
          <BenefitItem
            icon={Zap}
            title={<span className="text-yellow-400">Quick Booking</span>}
            description="Your time is valuable. Skip the wait and book your ride in seconds with DriWE. Our smart system connects you to the nearest driver, ensuring faster pickups. Travel planning made effortless."
          />
          <BenefitItem
            icon={ShieldCheck}
            title={<span className="text-yellow-400">Safe & Trusted</span>}
            description="Every ride you book comes with clear, upfront pricing. No hidden costs, no last-minute surprises. DriWE gives you transparent pricing before every ride."
          />
          <BenefitItem
            icon={Shield}
            title={<span className="text-yellow-400">Verified Drivers</span>}
            description="Your safety is our top priority. Every driver on DriWE is trusted and reliable through strict verification and training. Every journey is secure, comfortable, and worry-free."
          />
          <BenefitItem
            icon={MapPin}
            title={<span className="text-yellow-400">Live Tracking</span>}
            description="Your safety comes first with every ride.All drivers are carefully vetted, trained, and verified to ensure a secure and reliable experience every time."
          />
          <BenefitItem
            icon={Clock}
            title={<span className="text-yellow-400">24/7 Availability</span>}
            description="Day or night, weekday or weekend — DriWE is always here for you. With round-the-clock service, you can count on us whenever you need a ride."
          />
        </div>
      </section>

      <section className="py-32 px-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl relative overflow-hidden">
        <h2 className="text-5xl font-extrabold text-center mb-16 relative z-10 tracking-tight text-white">
          What Our <span className="text-yellow-400"> Riders</span> Say
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto relative z-10 px-4 sm:px-6 lg:px-8 ">
          <Card
            className="max-w-xs sm:max-w-sm w-full mx-auto mb-16 p-6 text-center hover:scale-[1.05]"
            variant="darkGlass"
          >
            <h3 className="text-2xl font-bold mb-4">Rahul Mehta</h3>
            <p className="mb-6 text-white/80">
              Great service and reliable for business deliveries. Highly
              recommend!&quot;
            </p>
          </Card>

          <Card
            className="max-w-xs sm:max-w-sm w-full mx-auto mb-16 p-6 text-center hover:scale-[1.05]"
            variant="darkGlass"
          >
            <h3 className="text-2xl font-bold mb-4">Priya Singh</h3>
            <p className="mb-6 text-white/80">
              Affordable pricing and very comfortable. DriWE is my daily travel
              partner!
            </p>
          </Card>

          <Card
            className="max-w-xs sm:max-w-sm w-full mx-auto mb-16 p-6 text-center hover:scale-[1.05]"
            variant="darkGlass"
          >
            <h3 className="text-2xl font-bold mb-4">Amit Sharma</h3>
            <p className="mb-6 text-white/80">
              The rides are always on time and the drivers are polite. Best
              experience ever!
            </p>
          </Card>
        </div>
      </section>

      <section className="py-20 px-6 md:px-20 max-w- mx-auto bg-black">
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

      <section className="py-24 px-8 md:px-20 bg-black text-white relative overflow-hidden">
        <div className="grid lg:grid-cols-2 gap-16 items-start max-w-7xl mx-auto relative z-10">
          <div>
            <h2 className="text-5xl md:text-6xl font-extrabold mb-8 tracking-tight">
              Ready <span className="text-yellow-400"> to</span> Ride with{" "}
              <span className="text-yellow-400"> DriWE?</span>
            </h2>
            <p className="max-w-xl mb-10 text-lg text-white leading-relaxed">
              Whether it’s your daily commute, a quick business delivery, or a
              weekend getaway, DriWE is here to make every ride smarter, safer,
              and more reliable. With just a few taps, you can book instantly
              and travel stress-free. Sit back, relax, and enjoy the journey —
              because with DriWE, your safety is our top priority.
            </p>
            <BookNowButton className="px-12 py-4 rounded font-semibold text-black shadow bg-white hover:shadow-[0_0_15px_rgba(255,215,0,0.8)] hover:scale-105 transition-all focus:ring-2 focus:ring-[white]" />
          </div>
          <div className="lg:sticky top-8 self-start">
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}