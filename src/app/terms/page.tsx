
// "use client";

// import React, { useEffect } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// export default function TermsPage() {
//   useEffect(() => {
//     gsap.registerPlugin(ScrollTrigger);

//     const sections = document.querySelectorAll(
//       "section h2, section p, section ul, .table-of-contents, .card"
//     );

//     sections.forEach((section) => {
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

//     // Smooth scroll for anchor links
//     const links = document.querySelectorAll('a[href^="#"]');
//     links.forEach((link) => {
//       link.addEventListener("click", (e) => {
//         e.preventDefault();
//         const href = (e.currentTarget as HTMLAnchorElement).getAttribute("href");
//         const target = href ? document.querySelector(href) : null;
//         if (target) {
//           window.scrollTo({
//             top: (target as HTMLElement).offsetTop - 80,
//             behavior: "smooth",
//           });
//         }
//       });
//     });

//     return () => {};
//   }, []);

//   return (
//     <div className="flex min-h-screen flex-col bg-black text-white font-inter antialiased">
//       {/* Hero Section */}
//       <section className="relative w-full overflow-hidden bg-black">
//         <div className="container relative mx-auto flex h-[40vh] items-center justify-center px-4 text-center md:px-6">
//           <div className="space-y-4">
//             <h1 className="text-4xl font-bold tracking-tighter text-white sm:text-6xl md:text-7xl">
//               Terms of Service
//             </h1>
//           </div>
//         </div>
//       </section>

//       {/* Content Section */}
//       <section className="relative z-10 w-full bg-black py-16">
//         <div className="container mx-auto px-4 md:px-6">
//           <div className="grid gap-8 lg:grid-cols-4">
//             {/* Table of Contents */}
//             <div className="lg:col-span-1">
//               <div className="table-of-contents sticky top-8 rounded-xl border bg-gray-900 p-6 shadow-xl card hover:scale-[1.02] hover:shadow-yellow-400/30 transition-all duration-300">
//                 <h3 className="mb-4 text-lg font-bold text-white">
//                   Table of Content
//                 </h3>
//                 <nav className="space-y-2">
//                   {[
//                     "acceptance",
//                     "eligibility",
//                     "account",
//                     "services",
//                     "conduct",
//                     "sharing",
//                     "rights",
//                     "security",
//                   ].map((id, index) => (
//                     <a
//                       key={id}
//                       href={`#${id}`}
//                       className="block text-sm text-white transition-colors duration-200 hover:text-yellow-400"
//                     >
//                       {index + 1}.{" "}
//                       {id
//                         .charAt(0)
//                         .toUpperCase()
//                         .concat(id.slice(1).replace(/([A-Z])/g, " $1"))}
//                     </a>
//                   ))}
//                 </nav>
//               </div>
//             </div>

//             {/* Main Content */}
//             <div className="lg:col-span-3 space-y-8">
//               {/* Intro */}
//               <div className="card rounded-xl border bg-gray-900 p-6 shadow-xl hover:scale-[1.02] hover:shadow-yellow-400/30 transition-all duration-300">
//                 <p className="text-lg leading-relaxed text-white">
//                   Welcome to Driwe! These Terms of Service ("Terms") govern your
//                   access to and use of the Driwe mobile application (the "App"),
//                   our website, and all related services (collectively, the
//                   "Services"). By accessing or using the Services, you agree to
//                   be bound by these Terms. If you do not agree to these Terms,
//                   do not use our Services.
//                 </p>
//               </div>

//               {/* Sections */}
//               {[
//                 {
//                   id: "acceptance",
//                   title: "1. Acceptance of Terms",
//                   content:
//                     "By creating an account, accessing, or using the Driwe Services, you acknowledge that you have read, understood, and agree to be bound by these Terms, as well as our Privacy Policy.",
//                 },
//                 {
//                   id: "eligibility",
//                   title: "2. Eligibility",
//                   content:
//                     "You must be at least 18 years old to create an account and use the Driwe Services. By using the Services, you represent and warrant that you are at least 18 years old and capable of entering into a binding agreement.",
//                 },
//                 {
//                   id: "account",
//                   title: "3. Account Registration and Security",
//                   content: (
//                     <>
//                       <p>
//                         To use certain features of our Services, you must create
//                         an account. You agree to:
//                       </p>
//                       <ul className="list-inside list-disc space-y-2 text-white mt-2">
//                         <li>
//                           Provide accurate, current, and complete information
//                           during registration
//                         </li>
//                         <li>Maintain and update your account information</li>
//                         <li>
//                           Keep your login credentials secure and confidential
//                         </li>
//                         <li>
//                           Notify us immediately of any unauthorized use of your
//                           account
//                         </li>
//                       </ul>
//                     </>
//                   ),
//                 },
//                 {
//                   id: "services",
//                   title: "4. Services Provided",
//                   content: (
//                     <>
//                       <p>
//                         Driwe provides a platform that connects users with
//                         transportation and delivery services. Our services
//                         include:
//                       </p>
//                       <ul className="list-inside list-disc space-y-2 text-white mt-2">
//                         <li>Ride booking and transportation services</li>
//                         <li>Package delivery services</li>
//                         <li>Real-time tracking and communication features</li>
//                         <li>Payment processing services</li>
//                       </ul>
//                     </>
//                   ),
//                 },
//                 {
//                   id: "conduct",
//                   title: "5. User Conduct and Responsibilities",
//                   content: (
//                     <>
//                       <p>When using our Services, you agree to:</p>
//                       <ul className="list-inside list-disc space-y-2 text-white mt-2">
//                         <li>Comply with all applicable laws and regulations</li>
//                         <li>Treat drivers and other users with respect</li>
//                         <li>Provide accurate pickup and destination information</li>
//                         <li>
//                           Pay all fees and charges associated with your use of
//                           the Services
//                         </li>
//                         <li>
//                           Not use the Services for illegal or unauthorized
//                           purposes
//                         </li>
//                       </ul>
//                     </>
//                   ),
//                 },
//                 {
//                   id: "sharing",
//                   title: "6. Payment and Fees",
//                   content:
//                     "You agree to pay all fees and charges associated with your use of the Services. Payment will be processed through your chosen payment method. We reserve the right to change our pricing structure at any time with reasonable notice.",
//                 },
//                 {
//                   id: "rights",
//                   title: "7. Limitation of Liability",
//                   content:
//                     "To the maximum extent permitted by law, Driwe shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or relating to your use of the Services.",
//                 },
//                 {
//                   id: "security",
//                   title: "8. Termination",
//                   content:
//                     "We may terminate or suspend your account and access to the Services at any time, with or without notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties.",
//                 },
//               ].map((section) => (
//                 <section
//                   key={section.id}
//                   id={section.id}
//                   className="card rounded-xl border bg-gray-900 p-6 shadow-xl hover:scale-[1.02] hover:shadow-yellow-400/30 transition-all duration-300"
//                 >
//                   <h2 className="text-3xl font-bold mb-4">{section.title}</h2>
//                   <div className="leading-relaxed text-white">
//                     {section.content}
//                   </div>
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

import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function TermsPage() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const sections = document.querySelectorAll(
      "section h2, section p, section ul, .table-of-contents, .card"
    );

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

    // Smooth scroll for anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const href = (e.currentTarget as HTMLAnchorElement).getAttribute("href");
        const target = href ? document.querySelector(href) : null;
        if (target) {
          window.scrollTo({
            top: (target as HTMLElement).offsetTop - 80,
            behavior: "smooth",
          });
        }
      });
    });

    return () => {};
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-black text-white font-inter antialiased">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden bg-black">
        <div className="container relative mx-auto flex h-[40vh] items-center justify-center px-4 text-center md:px-6">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter text-white sm:text-6xl md:text-7xl">
              Terms of Service
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
              <div className="table-of-contents card sticky top-8 rounded-xl border bg-black p-6 shadow-xl hover:scale-[1.02] hover:shadow-yellow-400/30 transition-all duration-300">
                <h3 className="mb-4 text-lg font-bold text-white">
                  Table of Content
                </h3>
                <nav className="space-y-2">
                  {[
                    "acceptance",
                    "eligibility",
                    "account",
                    "services",
                    "conduct",
                    "sharing",
                    "rights",
                    "security",
                  ].map((id, index) => (
                    <a
                      key={id}
                      href={`#${id}`}
                      className="block text-sm text-white transition-colors duration-200 hover:text-yellow-400"
                    >
                      {index + 1}.{" "}
                      {id
                        .charAt(0)
                        .toUpperCase()
                        .concat(id.slice(1).replace(/([A-Z])/g, " $1"))}
                    </a>
                  ))}
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-8">
              {/* Intro */}
              <div className="card rounded-xl border bg-black p-6 shadow-xl hover:scale-[1.02] hover:shadow-yellow-400/30 transition-all duration-300">
        <p className="text-lg leading-relaxed text-white">
          Welcome to Driwe! These Terms of Service (&quot;Terms&quot;) govern your
          access to and use of the Driwe mobile application (the &quot;App&quot;),
                    our website, and all related services (collectively, the
                    &quot;Services&quot;). By accessing or using the Services, you agree to
                  be bound by these Terms. If you do not agree to these Terms,
                  do not use our Services.
                </p>
              </div>

              {/* Sections */}
              {[
                {
                  id: "acceptance",
                  title: "1. Acceptance of Terms",
                  content:
                    "By creating an account, accessing, or using the Driwe Services, you acknowledge that you have read, understood, and agree to be bound by these Terms, as well as our Privacy Policy.",
                },
                {
                  id: "eligibility",
                  title: "2. Eligibility",
                  content:
                    "You must be at least 18 years old to create an account and use the Driwe Services. By using the Services, you represent and warrant that you are at least 18 years old and capable of entering into a binding agreement.",
                },
                {
                  id: "account",
                  title: "3. Account Registration and Security",
                  content: (
                    <>
                      <p>
                        To use certain features of our Services, you must create
                        an account. You agree to:
                      </p>
                      <ul className="list-inside list-disc space-y-2 text-white mt-2">
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
                  title: "4. Services Provided",
                  content: (
                    <>
                      <p>
                        Driwe provides a platform that connects users with
                        transportation and delivery services. Our services
                        include:
                      </p>
                      <ul className="list-inside list-disc space-y-2 text-white mt-2">
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
                  title: "5. User Conduct and Responsibilities",
                  content: (
                    <>
                      <p>When using our Services, you agree to:</p>
                      <ul className="list-inside list-disc space-y-2 text-white mt-2">
                        <li>Comply with all applicable laws and regulations</li>
                        <li>Treat drivers and other users with respect</li>
                        <li>Provide accurate pickup and destination information</li>
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
                  title: "6. Payment and Fees",
                  content:
                    "You agree to pay all fees and charges associated with your use of the Services. Payment will be processed through your chosen payment method. We reserve the right to change our pricing structure at any time with reasonable notice.",
                },
                {
                  id: "rights",
                  title: "7. Limitation of Liability",
                  content:
                    "To the maximum extent permitted by law, Driwe shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or relating to your use of the Services.",
                },
                {
                  id: "security",
                  title: "8. Termination",
                  content:
                    "We may terminate or suspend your account and access to the Services at any time, with or without notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties.",
                },
              ].map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="card rounded-xl border bg-black p-6 shadow-xl hover:scale-[1.02] hover:shadow-yellow-400/30 transition-all duration-300"
                >
                  <h2 className="text-3xl font-bold mb-4">{section.title}</h2>
                  <div className="leading-relaxed text-white">
                    {section.content}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
