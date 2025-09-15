"use client";

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function PrivacyPage() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo('.hero-text', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' });
    gsap.fromTo('.table-of-contents', { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 1, ease: 'power3.out', delay: 0.5 });

    const sections = document.querySelectorAll('.content-card');
    sections.forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    const mount = mountRef.current;
    if (!mount) return;

    const camera = new THREE.PerspectiveCamera(75, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const handleResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
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
              Privacy Policy
            </h1>
          
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
                <h3 className="mb-4 text-lg font-bold text-white">Table of Contents</h3>
                <nav className="space-y-2">
                  <a href="#information" className="block text-sm text-slate-400 hover:text-yellow-400 transition-colors">1. Information We Collect</a>
                  <a href="#usage" className="block text-sm text-slate-400 hover:text-yellow-400 transition-colors">2. How We Use Your Information</a>
                  <a href="#sharing" className="block text-sm text-slate-400 hover:text-yellow-400 transition-colors">3. Sharing Your Information</a>
                  <a href="#rights" className="block text-sm text-slate-400 hover:text-yellow-400 transition-colors">4. Your Rights and Choices</a>
                  <a href="#security" className="block text-sm text-slate-400 hover:text-yellow-400 transition-colors">5. Data Security</a>
                  <a href="#cookies" className="block text-sm text-slate-400 hover:text-yellow-400 transition-colors">6. Cookies & Tracking</a>
                  <a href="#children" className="block text-sm text-slate-400 hover:text-yellow-400 transition-colors">7. Children’s Privacy</a>
                  <a href="#changes" className="block text-sm text-slate-400 hover:text-yellow-400 transition-colors">8. Changes to Policy</a>
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-8">
              {/* Intro */}
              <div className="content-card rounded-2xl border border-white bg-black p-6 shadow-lg hover:shadow-yellow-400/40 transition">
                <p className="text-lg leading-relaxed text-slate-300">
                  We value your trust. This Privacy Policy explains how we collect, use, share, and protect your personal data when you use our website or services.
                </p>
              </div>

              {/* 1. Information We Collect */}
              <section id="information" className="content-card rounded-2xl border border-white bg-black p-6 shadow-lg hover:shadow-yellow-400/40 transition">
                <h2 className="text-3xl font-bold text-white mb-4">1. Information We Collect</h2>
                <p className="text-slate-300 mb-3">We may collect the following types of information:</p>
                <ul className="list-disc pl-6 text-slate-300 space-y-2">
                  <li><span className="text-yellow-400 font-semibold">Personal Information:</span> Name, email, phone number, address.</li>
                  <li><span className="text-yellow-400 font-semibold">Usage Data:</span> IP address, browser type, pages visited, time spent.</li>
                  <li><span className="text-yellow-400 font-semibold">Tracking Data:</span> Cookies, device identifiers, analytics tools.</li>
                </ul>
              </section>

              {/* 2. How We Use Your Information */}
              <section id="usage" className="content-card rounded-2xl border border-white bg-black p-6 shadow-lg hover:shadow-yellow-400/40 transition">
                <h2 className="text-3xl font-bold text-white mb-4">2. How We Use Your Information</h2>
                <ul className="list-disc pl-6 text-slate-300 space-y-2">
                  <li>To provide, operate, and improve our services.</li>
                  <li>To personalize user experience and recommendations.</li>
                  <li>To communicate updates, offers, and support messages.</li>
                  <li>To monitor usage, prevent fraud, and ensure security.</li>
                </ul>
              </section>

              {/* 3. Sharing Your Information */}
              <section id="sharing" className="content-card rounded-2xl border border-white bg-black p-6 shadow-lg hover:shadow-yellow-400/40 transition">
                <h2 className="text-3xl font-bold text-white mb-4">3. Sharing Your Information</h2>
                <p className="text-slate-300 mb-3">We do not sell your data. We may share your information with:</p>
                <ul className="list-disc pl-6 text-slate-300 space-y-2">
                  <li><span className="text-yellow-400 font-semibold">Service Providers:</span> For payment processing, analytics, and communication.</li>
                  <li><span className="text-yellow-400 font-semibold">Legal Authorities:</span> When required by law or to protect rights and safety.</li>
                  <li><span className="text-yellow-400 font-semibold">Business Transfers:</span> In the case of mergers, acquisitions, or restructuring.</li>
                </ul>
              </section>

              {/* 4. Your Rights and Choices */}
              <section id="rights" className="content-card rounded-2xl border border-white bg-black p-6 shadow-lg hover:shadow-yellow-400/40 transition">
                <h2 className="text-3xl font-bold text-white mb-4">4. Your Rights and Choices</h2>
                <ul className="list-disc pl-6 text-slate-300 space-y-2">
                  <li>Access, update, or delete your personal data.</li>
                  <li>Opt-out of promotional emails and notifications.</li>
                  <li>Control cookie preferences via browser settings.</li>
                  <li>Request data portability where applicable.</li>
                </ul>
              </section>

              {/* 5. Data Security */}
              <section id="security" className="content-card rounded-2xl border border-white bg-black p-6 shadow-lg hover:shadow-yellow-400/40 transition">
                <h2 className="text-3xl font-bold text-white mb-4">5. Data Security</h2>
                <p className="text-slate-300">
                  We implement technical, administrative, and physical safeguards to protect your data. However, no system is completely secure, and we cannot guarantee absolute security.
                </p>
              </section>

              {/* 6. Cookies and Tracking */}
              <section id="cookies" className="content-card rounded-2xl border border-white bg-black p-6 shadow-lg hover:shadow-yellow-400/40 transition">
                <h2 className="text-3xl font-bold text-white mb-4">6. Cookies & Tracking</h2>
                <p className="text-slate-300">
                  We use cookies and similar technologies to enhance your experience, analyze site performance, and deliver targeted advertisements. You may disable cookies in your browser, but some features may not function properly.
                </p>
              </section>

              {/* 7. Children’s Privacy */}
              <section id="children" className="content-card rounded-2xl border border-white bg-black p-6 shadow-lg hover:shadow-yellow-400/40 transition">
                <h2 className="text-3xl font-bold text-white mb-4">7. Children’s Privacy</h2>
                <p className="text-slate-300">
                  Our services are not directed to children under 13. We do not knowingly collect data from children. If we discover such data, we will delete it immediately.
                </p>
              </section>

              {/* 8. Changes to This Privacy Policy */}
              <section id="changes" className="content-card rounded-2xl border border-white bg-black p-6 shadow-lg hover:shadow-yellow-400/40 transition">
                <h2 className="text-3xl font-bold text-white mb-4">8. Changes to This Privacy Policy</h2>
                <p className="text-slate-300">
                  We may update this Privacy Policy from time to time. Any significant changes will be communicated via email or website notice. Please review this page periodically.
                </p>
              </section>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
