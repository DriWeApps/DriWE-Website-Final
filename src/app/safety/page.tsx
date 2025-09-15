
"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SafetyPage: React.FC = () => {
  const sectionsRef = useRef<HTMLDivElement[]>([]);

  // GSAP animations (without starfield / balls)
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Enhanced GSAP animations for sections
      sectionsRef.current.forEach((section, index) => {
        gsap.fromTo(
          section,
          { opacity: 0, y: 100, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            ease: "power4.out",
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              end: "top 20%",
              scrub: 0.5,
              toggleActions: "play none none reverse",
            },
          }
        );

        // Staggered animation for card
        gsap.from(section.querySelector(".safety-card"), {
          opacity: 0,
          x: index % 2 === 0 ? -50 : 50,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
          },
        });
      });

      // Hero section animation
      gsap.fromTo(
        ".hero-section",
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.5,
          ease: "elastic.out(1, 0.5)",
        }
      );

      // Table of contents animation
      gsap.from(".toc-nav a", {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".toc-nav",
          start: "top 80%",
        },
      });
    }
  }, []);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  const safetyGuidelines = [
    {
      id: "for-riders",
      title: "For Riders",
      number: "1",
      items: [
        "Always verify the driver and vehicle details (photo, license plate) in the app before starting the ride.",
        "Share your trip details with family and friends using the in-app sharing feature.",
        "Use the in-app chat or call features to communicate with your driver, keeping your personal number private.",
        "Use the emergency SOS button for immediate assistance from our support team and local authorities.",
        "Provide honest feedback and ratings after every ride to help us maintain a safe community.",
        "Avoid sharing personal information and meet in well-lit, public areas if possible.",
        "Trust your instincts—if something feels off, cancel the ride and report it.",
      ],
    },
    {
      id: "for-drivers",
      title: "For Drivers",
      number: "2",
      items: [
        "Adhere to all local traffic laws and maintain a safe driving speed.",
        "Verify the rider's identity and destination before starting the trip.",
        "Maintain a clean and well-maintained vehicle for a comfortable ride.",
        "Respect all riders and follow our strict zero-tolerance policy against any form of misconduct.",
        "In case of emergency, use the in-app SOS button for help.",
        "Report any suspicious behavior from riders immediately.",
        "Ensure your vehicle has necessary safety equipment like seatbelts and airbags.",
      ],
    },
    {
      id: "emergency-protocols",
      title: "Emergency Protocols",
      number: "3",
      items: [
        "<strong>SOS Button:</strong> In a safety-critical situation, the in-app SOS button instantly connects you with our safety team and shares your location with emergency services.",
        "<strong>24/7 Support:</strong> Our dedicated support team is available around the clock to assist you with any safety concerns.",
        "<strong>Incident Reporting:</strong> All incidents are taken seriously and thoroughly investigated to ensure a safe environment for everyone.",
        "<strong>Location Tracking:</strong> All rides are GPS-tracked from start to finish, providing a detailed record for safety and security.",
        "<strong>Automated Alerts:</strong> If unusual activity is detected, such as route deviations, we’ll check in automatically.",
      ],
    },
    {
      id: "safety-features",
      title: "App Safety Features",
      number: "4",
      items: [
        "Real-time trip sharing with trusted contacts.",
        "Anonymous phone calls and messaging between riders and drivers.",
        "Background checks for all drivers, including criminal and driving records.",
        "Ride check feature that detects if a ride goes off course or stops unexpectedly.",
        "In-app emergency assistance with one-tap access to local authorities.",
        "Facial recognition for driver verification.",
      ],
    },
    {
      id: "reporting-issues",
      title: "Reporting Issues",
      number: "5",
      items: [
        "Use the in-app reporting tool to flag any safety concerns during or after a ride.",
        "Our team reviews all reports within 24 hours and takes appropriate action.",
        "Anonymous reporting is available for sensitive issues.",
        "Follow-up support is provided for all reported incidents.",
        "We collaborate with law enforcement when necessary.",
      ],
    },
    {
      id: "community-guidelines",
      title: "Community Guidelines",
      number: "6",
      items: [
        "Treat everyone with respect—no discrimination or harassment.",
        "No weapons or illegal substances in vehicles.",
        "Maintain hygiene and cleanliness standards.",
        "Honest communication and punctuality are key.",
        "Violations may result in account suspension or permanent ban.",
        "Encourage positive interactions to build a trustworthy community.",
      ],
    },
    {
      id: "data-protection",
      title: "How We Protect Your Data",
      number: "7",
      items: [
        "All personal data is encrypted and stored securely.",
        "We comply with GDPR and other privacy regulations.",
        "Location data is only shared during active rides or emergencies.",
        "Regular security audits and updates to protect against threats.",
        "You control your data—delete or export it anytime.",
      ],
    },
  ];

  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">
      <div className="relative z-10 p-6 md:p-12 max-w-7xl mx-auto">
        {/* Hero Section */}
        <section className="hero-section text-center py-20" ref={addToRefs}>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            With <span className="text-yellow-400">DriWE</span> Every Ride Feels{" "}
            <span className="text-yellow-400">Secure</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Your safety is our top priority. We&apos;re dedicated to building a
            secure platform for every ride, with advanced features and 24/7
            support.
          </p>
        </section>

        {/* Table of Contents and Main Content */}
        <div className="flex flex-col md:flex-row gap-12 ">
          {/* Table of Contents */}
          <aside className="w-full md:w-1/4 sticky top-12 self-start p-6 bg-black/70 border border-white rounded-xl shadow-lg backdrop-blur-md">
            <h3 className="text-lg font-bold text-white mb-4 border-b border-white pb-2">
              Table of Contents
            </h3>
            <nav className="toc-nav">
              <ul className="space-y-2">
                {safetyGuidelines.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="block text-white hover:text-yellow-400 transition-colors duration-200 flex items-center gap-2"
                    >
                      <span className="w-8 h-8 flex items-center justify-center text-yellow-400">
                        {section.number}
                      </span>
                      {section.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* Main Content Sections */}
          <div className="w-full md:w-3/4 space-y-16">
            {safetyGuidelines.map((section) => (
              <section key={section.id} id={section.id} ref={addToRefs}>
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 flex items-center justify-center text-yellow-400">
                    {section.number}
                  </span>
                  {section.title}
                </h2>
                <div className="safety-card bg-black border-2 border-white text-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1">
                  <ul className="space-y-4">
                    {section.items.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-yellow-400">•</span>
                        <p
                          className="leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: item }}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default SafetyPage;
