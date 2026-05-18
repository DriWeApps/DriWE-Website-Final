// 'use client';

// import React from 'react';
// import { Phone, Mail, MapPin, Linkedin } from "lucide-react"

// // Custom Threads icon component
// const ThreadsIcon = ({ className }: { className?: string }) => (
//   <svg className={className} viewBox="0 0 24 24" fill="currentColor">
//     <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.5 12.01c0-3.576.85-6.43 2.495-8.481C5.845 1.225 8.598.044 12.179.02h.014c3.581.024 6.334 1.205 8.184 3.509C21.65 5.58 22.5 8.434 22.5 12.01c0 3.576-.85 6.43-2.495 8.481C18.155 22.775 15.402 23.956 11.821 23.98h-.007l.372-.004z" />
//   </svg>
// );

// const InstagramIcon = ({ className }: { className?: string }) => (
//   <svg className={className} viewBox="0 0 24 24" fill="currentColor">
//     <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z" />
//   </svg>
// );

// const FacebookIcon = ({ className }: { className?: string }) => (
//   <svg className={className} viewBox="0 0 24 24" fill="currentColor">
//     <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
//   </svg>
// );

// export default function Footer() {
//   return (
//     <footer className="relative bg-black text-white font-poppins py-16 px-4">
//       <div 
//         className="absolute inset-0 bg-black bg-opacity-40"
//         style={{
//           backdropFilter: 'blur(20px)',
//           WebkitBackdropFilter: 'blur(20px)'
//         }}
//       ></div>

//       <div className="container mx-auto max-w-7xl relative z-10">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

//           {/* Contact Section */}
//           <div className="space-y-4">
//             <h4 className="font-semibold text-lg md:text-xl text-white">Contact</h4>

//             <div className="space-y-3 text-sm text-gray-300">

//               {/* Phone - Click to Call */}
//               <a 
//                 href="tel:+918669888996"
//                 className="flex items-center hover:text-[#fcd129] transition"
//               >
//                 <Phone className="h-4 w-4 mr-2" />
//                 +91 8669888996
//               </a>

//               {/* Email - Opens Email App */}
//               <a
//                 href="mailto:hello@driwe.in"
//                 className="flex items-center hover:text-[#fcd129] transition"
//               >
//                 <Mail className="h-4 w-4 mr-2" />
//                 hello@driwe.in
//               </a>

//               {/* Map - Opens in Google Maps */}
//               <a
//                 href="https://www.google.com/maps?q=Oneplace+8th+floor+807,+Salunke+Vihar,+Pune-411048"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex items-start hover:text-[#fcd129] transition"
//               >
//                 <MapPin className="h-4 w-4 mr-2 mt-1" />
//                 Oneplace 8th floor 807, Salunke Vihar, Pune- 411048, Maharashtra
//               </a>
//             </div>
//           </div>

//           {/* Paths */}
//           <div className="space-y-4 col-span-2">
//             <h4 className="font-semibold text-lg md:text-xl text-white">Paths</h4>

//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-2 text-sm text-gray-300">
//               <nav className="flex flex-col space-y-2">
//                 <a href="/about" className="hover:text-[#fcd129]">About</a>
//                 <a href="/contact" className="hover:text-[#fcd129]">Contact</a>
//                 <a href="/terms" className="hover:text-[#fcd129]">Terms and Conditions</a>
//                 <a href="/cancellation" className="hover:text-[#fcd129]">Cancellation Policy</a>
//                 <a href="/shippingPolicy" className="hover:text-[#fcd129]">Shipping Policy</a>
//                 <a href="/refund" className="hover:text-[#fcd129]">Refund Policy</a>
//                 <a href="/privacyPolicy" className="hover:text-[#fcd129]">Privacy Policy</a>
//               </nav>

//               <nav className="flex flex-col space-y-2">
//                 <a href="/safety" className="hover:text-[#fcd129]">Safety</a>
//                 <a href="/services" className="hover:text-[#fcd129]">Services</a>
//                 <a href="/support" className="hover:text-[#fcd129]">Support</a>
//                 <a href="/career" className="hover:text-[#fcd129]">Career</a>
//                 <a href="/why-choose" className="hover:text-[#fcd129]">Why Choose</a>
//               </nav>

//             </div>
//           </div>

//           {/* Social Media */}
//           <div className="space-y-4">
//             <h4 className="font-semibold text-lg md:text-xl text-white">Follow Us</h4>

//             <div className="flex space-x-3">
//               <a href="https://www.facebook.com/profile.php?id=61575003763571" target="_blank" className="text-gray-400 hover:text-[#fcd129]">
//                 <FacebookIcon className="h-5 w-5" />
//               </a>
//               <a href="https://www.instagram.com/driwe.in" target="_blank" className="text-gray-400 hover:text-[#fcd129]">
//                 <InstagramIcon className="h-5 w-5" />
//               </a>
//               <a href="https://www.linkedin.com/company/driwe-app" target="_blank" className="text-gray-400 hover:text-[#fcd129]">
//                 <Linkedin className="h-5 w-5" />
//               </a>
//               <a href="https://www.threads.com/@driwe.in" target="_blank" className="text-gray-400 hover:text-[#fcd129]">
//                 <ThreadsIcon className="h-5 w-5" />
//               </a>
//             </div>
//           </div>
//         </div>

//         {/* Copyright */}
//         <div className="border-t border-gray-800 mt-12 pt-6 text-center text-xs text-gray-400">
//           <p>&copy; {new Date().getFullYear()} DriWE. All rights reserved.</p>
//         </div>
//       </div>
//     </footer>
//   );
// }

'use client';

import React from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Linkedin,
  Instagram
} from "lucide-react";

// Custom Threads icon component
const ThreadsIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M18.244 11.068c-.01-.55-.045-1.084-.104-1.598-.17-1.53-.64-2.793-1.396-3.756C15.65 4.29 14.09 3.5 12.12 3.5c-2.11 0-3.81.74-5.05 2.2C5.85 7.17 5.25 9.16 5.25 11.62c0 2.44.59 4.37 1.76 5.74 1.2 1.42 2.92 2.14 5.11 2.14 1.82 0 3.31-.45 4.42-1.34 1.14-.92 1.73-2.16 1.73-3.7 0-1.28-.45-2.3-1.33-3.03-.83-.7-1.98-1.07-3.41-1.12h-.94c-.25 0-.45-.2-.45-.45s.2-.45.45-.45h.91c1.18 0 2.1-.25 2.74-.73.66-.5 1-1.23 1-2.16 0-.9-.3-1.6-.9-2.08-.58-.47-1.39-.71-2.4-.71-1.06 0-1.9.3-2.48.9-.57.58-.88 1.39-.93 2.4h-1.8c.05-1.48.54-2.67 1.46-3.54.94-.9 2.2-1.35 3.75-1.35 1.6 0 2.9.39 3.86 1.16.98.79 1.48 1.9 1.48 3.3 0 1.07-.3 1.95-.9 2.64-.3.34-.67.63-1.1.86.78.2 1.45.57 1.97 1.12.82.84 1.23 1.93 1.23 3.25 0 2-.72 3.58-2.14 4.7-1.38 1.1-3.2 1.65-5.42 1.65-2.76 0-4.92-.87-6.42-2.58C3.76 17.11 3 14.72 3 11.75c0-3.01.77-5.45 2.29-7.24C6.84 2.68 9.01 1.75 11.74 1.75c2.54 0 4.57.73 6.03 2.17 1.37 1.35 2.1 3.17 2.18 5.41h-1.71z" />
  </svg>
);

// Custom Facebook icon component
const FacebookIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M24 12.073c0-6.627-5.373-12-12-12S0 5.446 0 12.073c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="relative bg-black text-white font-poppins py-16 px-4">
      
      {/* Background Blur */}
      <div
        className="absolute inset-0 bg-black/40"
        style={{
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}
      />

      {/* Main Container */}
      <div className="container mx-auto max-w-7xl relative z-10">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Contact Section */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg md:text-xl text-white">
              Contact
            </h4>

            <div className="space-y-3 text-sm text-gray-300">

              {/* Phone */}
              <a
                href="tel:+918669888996"
                className="flex items-center hover:text-[#fcd129] transition"
              >
                <Phone className="h-4 w-4 mr-2" />
                +91 8669888996
              </a>

              {/* Email */}
              <a
                href="mailto:hello@driwe.in"
                className="flex items-center hover:text-[#fcd129] transition"
              >
                <Mail className="h-4 w-4 mr-2" />
                hello@driwe.in
              </a>

              {/* Address */}
              <a
                href="https://www.google.com/maps?q=Oneplace+8th+floor+807,+Salunke+Vihar,+Pune-411048"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start hover:text-[#fcd129] transition"
              >
                <MapPin className="h-4 w-4 mr-2 mt-1" />

                <span>
                  Oneplace 8th floor 807,
                  Salunke Vihar, Pune- 411048,
                  Maharashtra
                </span>
              </a>
            </div>
          </div>

          {/* Paths */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg md:text-xl text-white">
              Paths
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 text-sm text-gray-300">

              <nav className="flex flex-col space-y-2">
                <a href="/about" className="hover:text-[#fcd129] transition">
                  About
                </a>

                <a href="/contact" className="hover:text-[#fcd129] transition">
                  Contact
                </a>

                <a href="/terms" className="hover:text-[#fcd129] transition">
                  Terms and Conditions
                </a>

                <a href="/cancellation" className="hover:text-[#fcd129] transition">
                  Cancellation Policy
                </a>

                <a href="/shippingPolicy" className="hover:text-[#fcd129] transition">
                  Shipping Policy
                </a>

                <a href="/refund" className="hover:text-[#fcd129] transition">
                  Refund Policy
                </a>

                <a href="/privacyPolicy" className="hover:text-[#fcd129] transition">
                  Privacy Policy
                </a>
              </nav>

              <nav className="flex flex-col space-y-2">
                <a href="/safety" className="hover:text-[#fcd129] transition">
                  Safety
                </a>

                <a href="/services" className="hover:text-[#fcd129] transition">
                  Services
                </a>

                <a href="/support" className="hover:text-[#fcd129] transition">
                  Support
                </a>

                <a href="/career" className="hover:text-[#fcd129] transition">
                  Career
                </a>

                <a href="/why-choose" className="hover:text-[#fcd129] transition">
                  Why Choose
                </a>
              </nav>

            </div>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg md:text-xl text-white">
              Follow Us
            </h4>

            <div className="flex flex-wrap gap-4">

              {/* Facebook */}
              <a
                href="https://www.facebook.com/profile.php?id=61575003763571"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#1877F2] p-3 rounded-full hover:scale-110 transition duration-300"
              >
                <FacebookIcon className="h-5 w-5 text-white" />
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/driwe.in"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#E1306C] p-3 rounded-full hover:scale-110 transition duration-300"
              >
                <Instagram className="h-5 w-5 text-white" />
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/company/driwe-app"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#0A66C2] p-3 rounded-full hover:scale-110 transition duration-300"
              >
                <Linkedin className="h-5 w-5 text-white" />
              </a>

              {/* Threads */}
              <a
                href="https://www.threads.com/@driwe.in"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-3 rounded-full hover:scale-110 transition duration-300"
              >
                <ThreadsIcon className="h-5 w-5 text-black" />
              </a>

            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-12 pt-6 text-center text-xs text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} DriWE. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}