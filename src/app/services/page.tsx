// app/services/page.tsx
"use client";

import React, {
  forwardRef,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  motion,
  useAnimation,
  useReducedMotion,
  AnimatePresence,
  LazyMotion,
  domAnimation,
} from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { Star } from "lucide-react";
import {
  HiAcademicCap,
  HiDeviceMobile,
  HiDesktopComputer,
} from "react-icons/hi";
import { useSwipeable } from "react-swipeable";

gsap.registerPlugin(ScrollTrigger);

const isMobile = () =>
  typeof window !== "undefined" && window.innerWidth <= 768;

export interface CardSwapProps {
  width?: number | string;
  height?: number | string;
  cardDistance?: number;
  verticalDistance?: number;
  delay?: number;
  pauseOnHover?: boolean;
  onCardClick?: (idx: number) => void;
  skewAmount?: number;
  easing?: "linear" | "elastic";
  children: ReactNode;
}

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  customClass?: string;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ customClass, ...rest }, ref) => (
    <div
      ref={ref}
      role="button"
      tabIndex={0}
      {...rest}
      className={`card ${customClass ?? ""} ${rest.className ?? ""}`.trim()}
      onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter" || e.key === " ") {
          (e.currentTarget as HTMLElement).click();
        }
      }}
    />
  )
);
Card.displayName = "Card";

const promoCards = [
  {
    icon: <HiDeviceMobile size={28} />,
    headline: "Auto Rickshaw",
    description: "Navigate narrow lanes with eco-friendly three-wheelers. Perfect for quick city hops.",
    imageSrc: "/images/Auto image.png",
    rating: 4.8,
    popular: true,
  },
  {
    icon: <HiDesktopComputer size={28} />,
    headline: "City Rides",
    description: "Comfortable sedans for your daily commute. AC comfort with professional drivers.",
    imageSrc: "/images/car image service.png",
    rating: 4.9,
    popular: false,
  },
  {
    icon: <HiAcademicCap size={28} />,
    headline: "Scheduling",
    description: "Flexible scheduling options for your convenience.",
    imageSrc: "/images/GT image.png",
    rating: 4.7,
    popular: false,
  },
  {
    icon: <HiAcademicCap size={28} />,
    headline: "Goods Courier",
    description: "Reliable logistics for packages and commercial deliveries.",
    imageSrc: "/images/Truck image service.png",
    rating: 4.6,
    popular: false,
  },
];

function CarouselCard({
  icon,
  headline,
  description,
  imageSrc,
  rating,
  popular,
}: {
  icon: React.ReactNode;
  headline: string;
  description: string;
  imageSrc?: string;
  rating: number;
  popular: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (cardRef.current && !shouldReduceMotion) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, scale: 0.9, y: 20 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 95%",
            toggleActions: "play none none none",
          },
        }
      );
    }
  }, [shouldReduceMotion]);

  const getColoredHeadline = (headline: string) => {
    const wordMap: { [key: string]: { word: string; index: number } } = {
      "Auto Rickshaw": { word: "Rickshaw", index: 1 },
      "City Rides": { word: "Rides", index: 1 },
    };

    const { word, index } = wordMap[headline] || { word: "", index: -1 };
    if (!word) return <span>{headline}</span>;

    const parts = headline.split(" ");
    return (
      <>
        {parts.map((part, i) => (
          <span key={i} className={i === index ? "text-[#fcd129]" : "text-white"}>
            {part}{i < parts.length - 1 ? " " : ""}
          </span>
        ))}
      </>
    );
  };

  return (
    <motion.div
      ref={cardRef}
      className="min-w-[300px] max-w-[300px] bg-black rounded-3xl border-2 border-white/20 shadow-xl px-6 py-6 relative flex flex-col mx-3 cursor-pointer overflow-hidden group"
      whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.3 } }}
      whileTap={{ scale: 0.98 }}
    >
      {popular && (
        <div className="absolute top-4 right-4 bg-black text-white px-3 py-1 rounded-full text-xs font-bold z-10">
          POPULAR
        </div>
      )}

      {imageSrc && (
        <div className="mb-4 rounded-xl overflow-hidden relative">
          <Image
            src={imageSrc}
            alt={headline}
            width={280}
            height={160}
            className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
        </div>
      )}

      <div className="flex items-center justify-between mb-3">
        <div className="text-white-400">{icon}</div>
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 fill-white text-white" />
          <span className="text-white text-sm font-medium">{rating}</span>
        </div>
      </div>

      <h3 className="text-xl font-bold mb-2 group-hover:text-white transition-colors duration-300">
        {getColoredHeadline(headline)}
      </h3>

      <p className="text-gray-300 text-sm leading-relaxed mb-4 flex-grow">
        {description}
      </p>

      <div className="absolute bottom-0 left-0 w-full h-1 bg-[#fcd129] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
    </motion.div>
  );
}

function MotionAppleCarousel() {
  const carouselControls = useAnimation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const [autoPlay, setAutoPlay] = useState(true);

  const cardWidth = 324;
  const visibleCards = isMobile() ? 1 : 3;

  useEffect(() => {
    if (!shouldReduceMotion) {
      carouselControls.start({
        x: -currentIndex * cardWidth,
        transition: { type: "spring", stiffness: 300, damping: 30, mass: 0.8 },
      });
    }
  }, [currentIndex, carouselControls, shouldReduceMotion]);

  useEffect(() => {
    if (!autoPlay || shouldReduceMotion) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const maxIndex = promoCards.length - visibleCards;
        return prev >= maxIndex ? 0 : prev + 1;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [autoPlay, visibleCards, shouldReduceMotion]);

  const handlePrev = () => {
    setAutoPlay(false);
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
    setTimeout(() => setAutoPlay(true), 5000);
  };

  const handleNext = () => {
    setAutoPlay(false);
    setCurrentIndex((prev) =>
      Math.min(prev + 1, promoCards.length - visibleCards)
    );
    setTimeout(() => setAutoPlay(true), 5000);
  };

  const handlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
    trackMouse: false,
    delta: 10,
  });

  return (
    <section className="py-34 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <hr className="my-40 h-px border-0 bg-gray-700" />
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Choose Your <span className="text-[#fcd129]">Perfect Ride</span>
          </motion.h2>
          <motion.p
            className="text-gray-400 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            From budget-friendly autos to premium corporate fleet - we have the perfect solution for every journey
          </motion.p>
        </div>

        <div className="relative overflow-hidden" {...handlers}>
          <motion.div
            className="flex gap-6 py-8"
            animate={carouselControls}
            onHoverStart={() => setAutoPlay(false)}
            onHoverEnd={() => setAutoPlay(true)}
          >
            {promoCards.map((card, idx) => (
              <CarouselCard key={idx} {...card} />
            ))}
          </motion.div>

          <div className="flex justify-between items-center mt-8">
            <div className="flex gap-2">
              {Array.from({ length: Math.ceil(promoCards.length / visibleCards) }).map((_, idx) => (
                <motion.button
                  key={idx}
                  className="w-3 h-3 rounded-full transition-all duration-300 bg-gray-600 hover:bg-gray-500"
                  style={{ transform: "none" }} // Critical for hydration
                  suppressHydrationWarning={true} // Critical for hydration
                  onClick={() => {
                    setAutoPlay(false);
                    setCurrentIndex(idx * visibleCards);
                    setTimeout(() => setAutoPlay(true), 5000);
                  }}
                  whileHover={{ scale: 1.3 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>

            <div className="flex gap-3">
              <motion.button
                className="w-12 h-9 rounded-full bg-[#fcd129] text-black flex items-center justify-center text-xl font-bold shadow-lg hover:bg-white transition"
                onClick={handlePrev}
                disabled={currentIndex === 0}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                ←
              </motion.button>
              <motion.button
                className="w-12 h-9 rounded-full bg-[#fcd129] text-black flex items-center justify-center text-xl font-bold shadow-lg hover:bg-white transition"
                onClick={handleNext}
                disabled={currentIndex >= promoCards.length - visibleCards}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                →
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const realStories = [
  {
    name: "Rahul Varma",
    avatar: "/images/john.jpeg",
    story: "Safe and Comfortable Ride",
    fullDescription:
      "Rahul Varma had an amazing experience with our premium service. The ride was smooth, on time, and the driver was extremely courteous.",
    tripType: "Airport Drop",
    likes: 120,
  },
  {
    name: "Sajid Khan",
    avatar: "/images/lee.jpeg",
    story: "Driver was very professional",
    fullDescription:
      "Sajid Khan loved the punctuality and professionalism shown during his trip.",
    tripType: "City Ride",
    likes: 85,
  },
  {
    name: "Akash Sharma",
    avatar: "/images/alex.jpeg",
    story: "Great Conversation & Smooth Ride",
    fullDescription:
      "Akash Sharma enjoyed a wonderful ride with great conversation.",
    tripType: "Outstation",
    likes: 150,
  },
];

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [selectedStory, setSelectedStory] = useState(0);

  useEffect(() => {
    if (heroRef.current && !shouldReduceMotion) {
      gsap.fromTo(
        heroRef.current.children,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top 90%",
          },
        }
      );
    }
  }, [shouldReduceMotion]);

  return (
    <LazyMotion features={domAnimation}>
      <div className="min-h-screen bg-black">
        <section ref={heroRef} className="bg-black py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-7xl font-bold text-white mt-24">
              Our <span className="text-[#fcd129]">Services</span>
            </h1>
            <p className="text-md md:text-xl text-gray-300 mt-6 max-w-6xl mx-auto">
              From quick city rides to fleet delivery, we cover all your transport needs.
            </p>
          </div>
        </section>

        <MotionAppleCarousel />

        <section className="py-20 bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <motion.h2
                className="text-3xl md:text-4xl font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <span className="text-white">Real Stories</span>, <span className="text-[#fcd129]">Real Impact</span>
              </motion.h2>
              <motion.p
                className="text-white text-lg max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                These aren&apos;t just rides - they&apos;re moments that matter.
              </motion.p>
            </div>

            <div className="flex flex-col lg:flex-row items-start justify-between gap-12">
              <div className="lg:w-1/3 space-y-4">
                <h3 className="text-xl font-semibold text-white mb-6">Featured Stories</h3>
                {realStories.map((story, index) => (
                  <motion.div
                    key={index}
                    className={`p-4 rounded-xl cursor-pointer transition-all duration-300 border-2 ${
                      selectedStory === index
                        ? "bg-white/10 border-white/50"
                        : "bg-black border-white/20 hover:border-white/40"
                    }`}
                    onClick={() => setSelectedStory(index)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center gap-3">
                      <Image
                        src={story.avatar}
                        alt={story.name}
                        width={32}
                        height={32}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div>
                        <h4 className={`font-medium text-sm ${selectedStory === index ? "text-[#fcd129]" : "text-white"}`}>
                          {story.story}
                        </h4>
                        <p className="text-xs text-gray-400">{story.name}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="w-full lg:w-2/3">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedStory}
                    className="bg-black/80 border border-white/30 rounded-2xl p-8 shadow-2xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <Image
                        src={realStories[selectedStory].avatar}
                        alt={realStories[selectedStory].name}
                        width={64}
                        height={64}
                        className="w-16 h-16 rounded-full object-cover border-4 border-[#fcd129]"
                      />
                      <div className="ml-4">
                        <h4 className="text-2xl font-bold text-[#fcd129]">
                          {realStories[selectedStory].name}
                        </h4>
                        <p className="text-gray-400">{realStories[selectedStory].tripType}</p>
                      </div>
                    </div>
                    <p className="text-white text-lg leading-relaxed">
                      {realStories[selectedStory].fullDescription}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>
      </div>
    </LazyMotion>
  );
}