// "use client";

// import React, { useEffect, useRef } from "react";
// import * as THREE from "three";
// import { gsap } from "gsap";
// import { ScrollTrigger, ScrollToPlugin } from "gsap/all";

// export default function SafetyPage() {
//   const mountRef = useRef<HTMLDivElement | null>(null);
//   const sectionsRef = useRef<HTMLDivElement[]>([]);

//   useEffect(() => {
//     gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

//     // Hero text animation
//     gsap.fromTo(
//       ".hero-text",
//       { opacity: 0, y: -20 },
//       { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
//     );

//     // Table of contents animation
//     gsap.fromTo(
//       ".table-of-contents",
//       { opacity: 0, x: -50 },
//       { opacity: 1, x: 0, duration: 1, ease: "power3.out", delay: 0.5 }
//     );

//     // Content sections animation
//     sectionsRef.current.forEach((section) => {
//       gsap.fromTo(
//         section,
//         { opacity: 0, y: 50 },
//         {
//           opacity: 1,
//           y: 0,
//           duration: 1,
//           ease: "power3.out",
//           scrollTrigger: {
//             trigger: section,
//             start: "top 85%",
//             toggleActions: "play none none none",
//           },
//         }
//       );
//     });

//     // Smooth scrolling for Table of Contents links
//     const links = document.querySelectorAll(".table-of-contents a");
//     links.forEach((link) => {
//       link.addEventListener("click", (e) => {
//         e.preventDefault();
//         const targetId = link.getAttribute("href")?.substring(1);
//         const targetElement = document.getElementById(targetId || "");
//         if (targetElement) {
//           gsap.to(window, {
//             duration: 1,
//             scrollTo: {
//               y: targetElement,
//               offsetY: 100,
//             },
//             ease: "power3.out",
//           });
//         }
//       });
//     });

//     // Three.js setup
//     const mount = mountRef.current;
//     if (!mount) return;

//     const camera = new THREE.PerspectiveCamera(
//       75,
//       mount.clientWidth / mount.clientHeight,
//       0.1,
//       1000
//     );
//     const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
//     renderer.setSize(mount.clientWidth, mount.clientHeight);
//     mount.appendChild(renderer.domElement);

//     const handleResize = () => {
//       camera.aspect = mount.clientWidth / mount.clientHeight;
//       camera.updateProjectionMatrix();
//       renderer.setSize(mount.clientWidth, mount.clientHeight);
//     };

//     window.addEventListener("resize", handleResize);

//     return () => {
//       window.removeEventListener("resize", handleResize);
//       mount.removeChild(renderer.domElement);
//     };
//   }, []);

//   const addToRefs = (el: HTMLDivElement | null) => {
//     if (el && !sectionsRef.current.includes(el)) {
//       sectionsRef.current.push(el);
//     }
//   };

//   const safetyGuidelines = [
//     {
//       id: "for-riders",
//       title: "For Riders",
//       number: "1",
//       items: [
//         "Always verify the driver and vehicle details (photo, license plate) in the app before starting the ride.",
//         "Share your trip details with family and friends using the in-app sharing feature.",
//         "Use the in-app chat or call features to communicate with your driver, keeping your personal number private.",
//         "Use the emergency SOS button for immediate assistance from our support team and local authorities.",
//         "Provide honest feedback and ratings after every ride to help us maintain a safe community.",
//         "Avoid sharing personal information and meet in well-lit, public areas if possible.",
//         "Trust your instincts—if something feels off, cancel the ride and report it.",
//       ],
//     },
//     {
//       id: "for-drivers",
//       title: "For Drivers",
//       number: "2",
//       items: [
//         "Adhere to all local traffic laws and maintain a safe driving speed.",
//         "Verify the rider's identity and destination before starting the trip.",
//         "Maintain a clean and well-maintained vehicle for a comfortable ride.",
//         "Respect all riders and follow our strict zero-tolerance policy against any form of misconduct.",
//         "In case of emergency, use the in-app SOS button for help.",
//         "Report any suspicious behavior from riders immediately.",
//         "Ensure your vehicle has necessary safety equipment like seatbelts and airbags.",
//       ],
//     },
//     {
//       id: "emergency-protocols",
//       title: "Emergency Protocols",
//       number: "3",
//       items: [
//         "<strong>SOS Button:</strong> In a safety-critical situation, the in-app SOS button instantly connects you with our safety team and shares your location with emergency services.",
//         "<strong>24/7 Support:</strong> Our dedicated support team is available around the clock to assist you with any safety concerns.",
//         "<strong>Incident Reporting:</strong> All incidents are taken seriously and thoroughly investigated to ensure a safe environment for everyone.",
//         "<strong>Location Tracking:</strong> All rides are GPS-tracked from start to finish, providing a detailed record for safety and security.",
//         "<strong>Automated Alerts:</strong> If unusual activity is detected, such as route deviations, we’ll check in automatically.",
//       ],
//     },
//     {
//       id: "safety-features",
//       title: "App Safety Features",
//       number: "4",
//       items: [
//         "Real-time trip sharing with trusted contacts.",
//         "Anonymous phone calls and messaging between riders and drivers.",
//         "Background checks for all drivers, including criminal and driving records.",
//         "Ride check feature that detects if a ride goes off course or stops unexpectedly.",
//         "In-app emergency assistance with one-tap access to local authorities.",
//         "Facial recognition for driver verification.",
//       ],
//     },
//     {
//       id: "reporting-issues",
//       title: "Reporting Issues",
//       number: "5",
//       items: [
//         "Use the in-app reporting tool to flag any safety concerns during or after a ride.",
//         "Our team reviews all reports within 24 hours and takes appropriate action.",
//         "Anonymous reporting is available for sensitive issues.",
//         "Follow-up support is provided for all reported incidents.",
//         "We collaborate with law enforcement when necessary.",
//       ],
//     },
//     {
//       id: "community-guidelines",
//       title: "Community Guidelines",
//       number: "6",
//       items: [
//         "Treat everyone with respect—no discrimination or harassment.",
//         "No weapons or illegal substances in vehicles.",
//         "Maintain hygiene and cleanliness standards.",
//         "Honest communication and punctuality are key.",
//         "Violations may result in account suspension or permanent ban.",
//         "Encourage positive interactions to build a trustworthy community.",
//       ],
//     },
//     {
//       id: "data-protection",
//       title: "How We Protect Your Data",
//       number: "7",
//       items: [
//         "All personal data is encrypted and stored securely.",
//         "We comply with GDPR and other privacy regulations.",
//         "Location data is only shared during active rides or emergencies.",
//         "Regular security audits and updates to protect against threats.",
//         "You control your data—delete or export it anytime.",
//       ],
//     },
//   ];

//   return (
//     <div className="flex min-h-screen flex-col bg-black text-white font-inter antialiased">
//       {/* Hero Section */}
//       <section className="relative w-full overflow-hidden bg-black py-20">
//         <div ref={mountRef} className="absolute inset-0 z-0"></div>
//         <div className="container relative z-10 mx-auto flex h-[40vh] items-center justify-center px-4 text-center md:px-6">
//           <div className="space-y-4">
//             <h1 className="hero-text text-4xl font-bold tracking-tighter text-white sm:text-6xl md:text-7xl">
//               With <span className="text-yellow-400">DriWE</span> Every Ride
//               Feels <span className="text-yellow-400">Secure</span>
//             </h1>
//             <p className="text-lg leading-relaxed text-slate-300 max-w-2xl mx-auto">
//               Your safety is our top priority. We&apos;re dedicated to building
//               a secure platform for every ride, with advanced features and 24/7
//               support.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Content Section */}
//       <section className="relative z-10 w-full bg-black py-16">
//         <div className="container mx-auto px-4 md:px-6">
//           <div className="grid gap-8 lg:grid-cols-4">
//             {/* Table of Contents */}
//             <div className="lg:col-span-1">
//               <div className="table-of-contents sticky top-8 rounded-2xl border border-white bg-black p-6 shadow-lg transition hover:shadow-yellow-400/40">
//                 <h3 className="mb-4 text-lg font-bold text-white">
//                   <span className="text-yellow-400">Table of Contents</span>
//                 </h3>
//                 <nav className="space-y-2">
//                   {safetyGuidelines.map((section) => (
//                     <a
//                       key={section.id}
//                       href={`#${section.id}`}
//                       className="block text-sm text-slate-400 hover:text-yellow-400 transition-colors"
//                     >
//                       {section.number}. {section.title}
//                     </a>
//                   ))}
//                 </nav>
//               </div>
//             </div>

//             {/* Main Content */}
//             <div className="lg:col-span-3 space-y-8">
//               {safetyGuidelines.map((section) => (
//                 <section
//                   key={section.id}
//                   id={section.id}
//                   ref={addToRefs}
//                   className="content-card rounded-2xl border border-white bg-black p-6 shadow-lg hover:shadow-yellow-400/40 transition"
//                 >
//                   <h2 className="text-3xl font-bold text-white mb-4">
//                     {section.number}.{" "}
//                     <span className="text-yellow-400">{section.title}</span>
//                   </h2>
//                   <ul className="list-disc pl-6 text-slate-300 space-y-2">
//                     {section.items.map((item, index) => (
//                       <li
//                         key={index}
//                         className="leading-relaxed"
//                         dangerouslySetInnerHTML={{ __html: item }}
//                       />
//                     ))}
//                   </ul>
//                 </section>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }


"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { gsap } from "gsap";

export default function SafetyPage() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.fromTo(
      ".hero-text",
      { opacity: 0, y: -20 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
      }
    );

    gsap.fromTo(
      ".hero-subtitle",
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1,
        delay: 0.5,
      }
    );

    gsap.fromTo(
      ".content-card",
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
      }
    );

    const mount = mountRef.current;
    if (!mount) return;

    const camera = new THREE.PerspectiveCamera(
      75,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });

    renderer.setSize(mount.clientWidth, mount.clientHeight);

    mount.appendChild(renderer.domElement);

    const handleResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(
        mount.clientWidth,
        mount.clientHeight
      );
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);

      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  const safetyGuidelines = [
    {
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
    <div className="min-h-screen bg-black text-white">

      {/* HERO */}
      <section className="relative py-32 overflow-hidden">

        <div
          ref={mountRef}
          className="absolute inset-0 z-0"
        />

        <div className="container relative z-10 mx-auto px-4 text-center">

          <h1 className="hero-text text-5xl md:text-7xl font-bold">
            With <span className="text-yellow-400">DriWE</span>
            {" "}Every Ride Feels{" "}
            <span className="text-yellow-400">
              Secure
            </span>
          </h1>

          <p className="hero-subtitle mt-8 text-slate-300 max-w-4xl mx-auto text-lg">
            Your safety is our top priority.
            We&apos;re dedicated to building a secure platform
            for every ride, with advanced features and
            24/7 support.
          </p>

        </div>
      </section>

      {/* CONTENT */}
      <section className="pb-20 px-4">

        <div className="container max-w-6xl mx-auto">

          <div className="content-card rounded-2xl border border-white/20 bg-black p-10 shadow-xl hover:shadow-yellow-400/40 transition">

            <div className="space-y-10 text-slate-300 leading-8">

              {safetyGuidelines.map((section) => (
                <div key={section.number}>

                  <h3 className="text-3xl text-yellow-400 font-bold mb-5">
                    {section.number}. {section.title}
                  </h3>

                  <ul className="list-disc pl-6 space-y-3">
                    {section.items.map((item, index) => (
                      <li
                        key={index}
                        dangerouslySetInnerHTML={{
                          __html: item,
                        }}
                      />
                    ))}
                  </ul>

                </div>
              ))}

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}