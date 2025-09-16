'use client';
import InvestorFAQ from "@/components/InvestorFAQ";
import PremiumBookingInterface from "@/components/PremiumBookingInterface";
import HowItWorks from "@/components/HowItWorks";

import React, { useState, useRef, useEffect } from 'react';
import { Star, Rocket, Shield, CreditCard, Bus, Smartphone, Zap, Globe, Briefcase, Code, Palette } from 'lucide-react';
import gsap from 'gsap';

import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import IntroAnimation from '@/components/IntroAnimation';

// Theme and icon types used throughout the page
interface Theme {
  primary: string;
  secondary: string;
  bg: string;
  bgLight: string;
  text: string;
  textMuted: string;
  accent: string;
  gradient: string;
  glowColor: string;
}

type IconType = React.FC<React.SVGProps<SVGSVGElement>>;
interface FeatureWithIcon {
  icon: IconType;
  title: string;
  desc: string;
}

type HeroSwitchProps = {
  mode: string;
  setMode: React.Dispatch<React.SetStateAction<string>>;
  theme: Theme;
  heroTabs: string[];
};

const HeroSwitch: React.FC<HeroSwitchProps> = ({ mode, setMode, theme, heroTabs }) => {
  return (
    <div className="flex justify-center mb-12">
      {heroTabs.map((tab: string) => (
        <button
          key={tab}
          onClick={() => setMode(tab)}
          className={`px-6 py-2 rounded-full font-bold transition-colors duration-300 ${
            mode === tab ? 'text-black' : 'text-white/60'
          }`}
          style={{ background: mode === tab ? theme.gradient : 'transparent' }}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

const FeaturesSection: React.FC<{ features: FeatureWithIcon[] }> = ({ features }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if GSAP is available before proceeding
    if (typeof window === 'undefined' || !gsap || !ScrollTrigger) return;
    
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(gsap.utils.toArray(containerRef.current?.children || []), {
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, [features]);

  return (
    <section className="py-32 relative">
      <div className="container mx-auto px-6">
        <h2 className="text-5xl font-black text-center mb-20">
  Key <span className="text-yellow-400">Features</span>
</h2>

        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature: FeatureWithIcon, i: number) => (
            <div key={i} className="p-8 rounded-3xl backdrop-blur-xl border border-white/10 text-center"
              style={{
                background: "linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)"
              }}>
              <div className="text-5xl mb-4 flex items-center justify-center">
                <feature.icon className="w-12 h-12" style={{ color: 'inherit' }} />
              </div>
              <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
              <p className="text-white/60">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Import the individual components
import TaxiHero from '../components/TaxiHero';
import TransportHero from '../components/TransportHero';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import StatsSection from '../components/StatsSection';

const themes: Record<string, Theme> = {
  taxi: {
    primary: '#FFD700',
    secondary: '#FCD129',
    bg: '#0A0A0B',
    bgLight: '#111114',
    text: '#FFFFFF',
    textMuted: '#FFFFFF',
    accent: '#FFD700',
    gradient: 'linear-gradient(135deg, #FCD129 0%, #FCD129 100%)',
    glowColor: '#FFD700',
  },
  transport: {
    primary: '#9241d3',
    secondary: '#A855F7',
    bg: '#0A0A0B',
    bgLight: '#111114',
    text: '#FFFFFF',
    textMuted: '#E5E5E5',
    accent: '#A855F7',
    gradient: 'linear-gradient(135deg, #9241d3 0%, #A855F7 100%)',
    glowColor: '#9241d3',
  },
};

const heroTabs = ['Taxi', 'Transport'];

// Main Component
export default function UltraModernLanding() {
  const [mode, setMode] = useState<string>('Taxi');
  const theme = mode === 'Taxi' ? themes.taxi : themes.transport;
  const testimonialsRef = useRef<HTMLElement>(null);
  const testimonialCardsRef = useRef<(HTMLDivElement | null)[]>([]);
  
  // Add ref for booking section
  const bookingRef = useRef<HTMLDivElement>(null);

  // Function to scroll to booking section
  const scrollToBooking = () => {
    bookingRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  useEffect(() => {
    // Check if GSAP is available before proceeding
    if (typeof window === 'undefined' || !gsap || !ScrollTrigger) return;

    // Use a GSAP context to manage animations and ensure cleanup
    const ctx = gsap.context(() => {
      // Testimonial section heading animation
      gsap.from('.testimonial-heading', {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.testimonial-heading',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      // Testimonial cards animation
      testimonialCardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.from(card, {
          opacity: 0,
          y: 50,
          duration: 0.8,
          ease: 'power3.out',
          delay: i * 0.2,
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        });
      });
    }, testimonialsRef);
    // Cleanup function for GSAP context
    return () => ctx.revert();
  }, [mode, theme]);

  const taxiFeatures: FeatureWithIcon[] = [
    { icon: Rocket, title: 'Instant Booking', desc: 'Fast matching connects you with the driver in seconds' },
    { icon: Shield, title: 'Safety First', desc: 'Real-time tracking, verified drivers, and 24/7 support' },
    { icon: CreditCard, title: 'Smart Payments', desc: 'Transparent payments directly to the driver' },
    { icon: Star, title: 'Best Experience', desc: 'Premium vehicles, best drivers and best treatment' },
  ];

  const transportFeatures: FeatureWithIcon[] = [
    { icon: Bus, title: 'Smart Routes', desc: 'Optimized paths across mobilities' },
    { icon: Smartphone, title: 'One App', desc: 'Unified platform for all transport modes with real-time updates' },
    { icon: Zap, title: 'Lightning Fast', desc: 'Quick transfers and minimal wait times with smart scheduling' },
    { icon: Globe, title: 'Eco-Friendly', desc: 'Sustainable transport options to reduce your carbon footprint' },
  ];

  const features = mode === 'Taxi' ? taxiFeatures : transportFeatures;

  return (
    <div
      className="min-h-screen text-white relative overflow-x-hidden bg-black"
      style={{ background: theme.bg }}
    >
      <IntroAnimation />
      {/* Hero Switch */}
      <div className="pt-18 pb-12">
        <HeroSwitch mode={mode} setMode={setMode} theme={theme} heroTabs={heroTabs} />
      </div>
      {/* Hero Sections */}
      {mode === 'Taxi' ? (
        <TaxiHero key="taxi" theme={theme} />
      ) : (
        <TransportHero key="transport" theme={theme} />
      )}
      {/* Features Section */}
      <FeaturesSection features={features} />
      {/* Stats Section */}
      <StatsSection />
      {/* Testimonials Section */}
      <section ref={testimonialsRef} className="py-32 relative z-10">
        <div className="container mx-auto px-6">
          <h2 className="text-5xl font-black text-center mb-20 testimonial-heading">
            What Our <span className="text-yellow-400">Users</span> Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sakshi Patel',
                role: 'Business Executive',
                avatar: Briefcase,
                content: 'DriWE completely transformed my daily commute. The AI routing is incredible!'
              },
              {
                name: 'Diksha Jagtap',
                role: 'Tech Entrepreneur',
                avatar: Code,
                content: 'The 3D visualization and real-time updates make this the best transport app ever built.'
              },
              {
                name: 'Vaishali Patil',
                role: 'Designer',
                avatar: Palette,
                content: 'Beautiful interface, seamless experience. This is the future of transportation!'
              }
            ].map((testimonial, i) => (
              <div
                key={i}
                ref={el => { testimonialCardsRef.current[i] = el; }}
                style={{ background: `linear-gradient(135deg, ${theme.primary}10, ${theme.secondary}10)` }}
                className="p-8 rounded-3xl backdrop-blur-xl border border-white/10"
              >
                <div className="hoverable-card">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-gray-700 to-gray-800 flex items-center justify-center text-2xl mr-4">
                      {React.createElement(testimonial.avatar, { className: 'w-8 h-8', style: { color: theme.primary } })}
                    </div>
                    <div>
                      <div className="font-bold text-white">{testimonial.name}</div>
                      <div className="text-white/60">{testimonial.role}</div>
                    </div>
                  </div>
                  <p className="text-white/80 leading-relaxed mb-6">&quot;{testimonial.content}&quot;</p>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section - UPDATED WITH SCROLL FUNCTIONALITY */}
      <section className="py-20 bg-black to-black text-center relative">
        <div className="flex justify-center mt-12">
          <Card className="w-[26rem] mx-auto mb-20 p-8 text-center shadow-2xl rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20">
            <h3 className="text-3xl font-extrabold mb-4 text-white">
              Ready to Ride with <span className="text-[#fcd129]">DriWE</span>
            </h3>
            <p className="mb-6 text-lg text-gray-300 leading-relaxed">
              Experience the future of transportation today.  
              Download the app and start your journey in just a tap!
            </p>
            <Button 
              onClick={scrollToBooking}
              className="rounded-full 
                       bg-[#fcd129] 
                       hover:bg-[#fcd129]
                       text-black 
                       px-8 py-4 
                       flex items-center gap-2 
                       border border-[#fcd129]/50 
                       transition-transform 
                       duration-200 
                       hover:scale-105"
            >
              Get Started
            </Button>
          </Card>
        </div>
      </section>
      
      {/* New Components from layout.tsx */}
      <InvestorFAQ />
      
      {/* Add ref to PremiumBookingInterface for scrolling */}
      <div ref={bookingRef}>
        <PremiumBookingInterface />
      </div>
      
      <HowItWorks />
    </div>
  );
}
