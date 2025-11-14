"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger, ScrollToPlugin } from "gsap/all";

export default function TermsPage() {
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
              offsetY: 100,
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
              Terms  <span className="text-yellow-400">&</span> Conditions
            </h1>

            <p className="text-lg leading-relaxed text-slate-300 max-w-2xl mx-auto">
              By using our services, you agree to our terms and conditions. We
              are committed to maintaining transparency, ensuring fair use, and
              providing a safe and reliable experience for all users.
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
                  {[
                    { id: "acceptance", title: "Acceptance of Terms" },
                    { id: "eligibility", title: "Eligibility" },
                    {
                      id: "account",
                      title: "Account Registration and Security",
                    },
                    { id: "services", title: "Services Provided" },
                    {
                      id: "conduct",
                      title: "User Conduct and Responsibilities",
                    },
                    { id: "sharing", title: "Payment and Fees" },
                    { id: "rights", title: "Limitation of Liability" },
                    { id: "security", title: "Termination" },
                  ].map((section, index) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className="block text-sm text-slate-400 hover:text-yellow-400 transition-colors"
                    >
                      {index + 1}. {section.title}
                    </a>
                  ))}
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-8">
              {/* Intro */}
              <div className="content-card rounded-2xl border border-white bg-black p-6 shadow-lg hover:shadow-yellow-400/40 transition">
                <p className="text-lg leading-relaxed text-slate-300">
                  Welcome to Driwe! These Terms of Service (&quot;Terms&quot;)
                  govern your access to and use of the Driwe mobile application
                  (the &quot;App&quot;), our website, and all related services
                  (collectively, the &quot;Services&quot;). By accessing or
                  using the Services, you agree to be bound by these Terms. If
                  you do not agree to these Terms, do not use our Services.
                </p>
              </div>

              {/* Sections */}
              {[
                {
                  id: "acceptance",
                  title: "Acceptance of Terms",
                  number: "1",
                  content:
                    "By creating an account, accessing, or using the Driwe Services, you acknowledge that you have read, understood, and agree to be bound by these Terms, as well as our Privacy Policy.",
                },
                {
                  id: "eligibility",
                  title: "Eligibility",
                  number: "2",
                  content:
                    "You must be at least 18 years old to create an account and use the Driwe Services. By using the Services, you represent and warrant that you are at least 18 years old and capable of entering into a binding agreement.",
                },
                {
                  id: "account",
                  title: "Account Registration and Security",
                  number: "3",
                  content: (
                    <>
                      <p className="text-slate-300 mb-3">
                        To use certain features of our Services, you must create
                        an account. You agree to:
                      </p>
                      <ul className="list-disc pl-6 text-slate-300 space-y-2">
                        <li>
                          Provide accurate, current, and complete information
                          during registration
                        </li>
                        <li>Maintain and update your account information</li>
                        <li>
                          Keep your login credentials secure and confidential
                        </li>
                        <li>
                          Notify us immediately of any unauthorized use of your
                          account
                        </li>
                      </ul>
                    </>
                  ),
                },
                {
                  id: "services",
                  title: "Services Provided",
                  number: "4",
                  content: (
                    <>
                      <p className="text-slate-300 mb-3">
                        Driwe provides a platform that connects users with
                        transportation and delivery services. Our services
                        include:
                      </p>
                      <ul className="list-disc pl-6 text-slate-300 space-y-2">
                        <li>Ride booking and transportation services</li>
                        <li>Package delivery services</li>
                        <li>Real-time tracking and communication features</li>
                        <li>Payment processing services</li>
                      </ul>
                    </>
                  ),
                },
                {
                  id: "conduct",
                  title: "User Conduct and Responsibilities",
                  number: "5",
                  content: (
                    <>
                      <p className="text-slate-300 mb-3">
                        When using our Services, you agree to:
                      </p>
                      <ul className="list-disc pl-6 text-slate-300 space-y-2">
                        <li>Comply with all applicable laws and regulations</li>
                        <li>Treat drivers and other users with respect</li>
                        <li>
                          Provide accurate pickup and destination information
                        </li>
                        <li>
                          Pay all fees and charges associated with your use of
                          the Services
                        </li>
                        <li>
                          Not use the Services for illegal or unauthorized
                          purposes
                        </li>
                      </ul>
                    </>
                  ),
                },
                {
                  id: "sharing",
                  title: "Payment and Fees",
                  number: "6",
                  content:
                    "You agree to pay all fees and charges associated with your use of the Services. Payment will be processed through your chosen payment method. We reserve the right to change our pricing structure at any time with reasonable notice.",
                },
                {
                  id: "rights",
                  title: "Limitation of Liability",
                  number: "7",
                  content:
                    "To the maximum extent permitted by law, Driwe shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or relating to your use of the Services.",
                },
                {
                  id: "security",
                  title: "Termination",
                  number: "8",
                  content:
                    "We may terminate or suspend your account and access to the Services at any time, with or without notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties.",
                },
              ].map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="content-card rounded-2xl border border-white bg-black p-6 shadow-lg hover:shadow-yellow-400/40 transition"
                >
                  <h2 className="text-3xl font-bold text-white mb-4">
                    {section.number}.{" "}
                    <span className="text-yellow-400">{section.title}</span>
                  </h2>
                  <div className="text-slate-300">{section.content}</div>
                </section>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
