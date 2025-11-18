'use client';

import React from 'react';
import { Phone, Mail, MapPin, Linkedin } from "lucide-react"

// Custom Threads icon component
const ThreadsIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.5 12.01c0-3.576.85-6.43 2.495-8.481C5.845 1.225 8.598.044 12.179.02h.014c3.581.024 6.334 1.205 8.184 3.509C21.65 5.58 22.5 8.434 22.5 12.01c0 3.576-.85 6.43-2.495 8.481C18.155 22.775 15.402 23.956 11.821 23.98h-.007l.372-.004z" />
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z" />
  </svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="relative bg-black text-white font-poppins py-16 px-4">
      <div 
        className="absolute inset-0 bg-black bg-opacity-40"
        style={{
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)'
        }}
      ></div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Contact Section */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg md:text-xl text-white">Contact</h4>

            <div className="space-y-3 text-sm text-gray-300">

              {/* Phone - Click to Call */}
              <a 
                href="tel:+918669888996"
                className="flex items-center hover:text-[#fcd129] transition"
              >
                <Phone className="h-4 w-4 mr-2" />
                +91 8669888996
              </a>

              {/* Email - Opens Email App */}
              <a
                href="mailto:hello@driwe.in"
                className="flex items-center hover:text-[#fcd129] transition"
              >
                <Mail className="h-4 w-4 mr-2" />
                hello@driwe.in
              </a>

              {/* Map - Opens in Google Maps */}
              <a
                href="https://www.google.com/maps?q=Oneplace+8th+floor+807,+Salunke+Vihar,+Pune-411048"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start hover:text-[#fcd129] transition"
              >
                <MapPin className="h-4 w-4 mr-2 mt-1" />
                Oneplace 8th floor 807, Salunke Vihar, Pune- 411048, Maharashtra
              </a>
            </div>
          </div>

          {/* Paths */}
          <div className="space-y-4 col-span-2">
            <h4 className="font-semibold text-lg md:text-xl text-white">Paths</h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-2 text-sm text-gray-300">
              <nav className="flex flex-col space-y-2">
                <a href="/about" className="hover:text-[#fcd129]">About</a>
                <a href="/contact" className="hover:text-[#fcd129]">Contact</a>
                <a href="/terms" className="hover:text-[#fcd129]">Terms and Conditions</a>
                <a href="/cancellation" className="hover:text-[#fcd129]">Cancellation Policy</a>
                <a href="/shippingPolicy" className="hover:text-[#fcd129]">Shipping Policy</a>
                <a href="/refund" className="hover:text-[#fcd129]">Refund Policy</a>
                <a href="/privacyPolicy" className="hover:text-[#fcd129]">Privacy Policy</a>
              </nav>

              <nav className="flex flex-col space-y-2">
                <a href="/safety" className="hover:text-[#fcd129]">Safety</a>
                <a href="/services" className="hover:text-[#fcd129]">Services</a>
                <a href="/support" className="hover:text-[#fcd129]">Support</a>
                <a href="/career" className="hover:text-[#fcd129]">Career</a>
                <a href="/why-choose" className="hover:text-[#fcd129]">Why Choose</a>
              </nav>

            </div>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg md:text-xl text-white">Follow Us</h4>

            <div className="flex space-x-3">
              <a href="https://www.facebook.com/profile.php?id=61575003763571" target="_blank" className="text-gray-400 hover:text-[#fcd129]">
                <FacebookIcon className="h-5 w-5" />
              </a>
              <a href="https://www.instagram.com/driwe.in" target="_blank" className="text-gray-400 hover:text-[#fcd129]">
                <InstagramIcon className="h-5 w-5" />
              </a>
              <a href="https://www.linkedin.com/company/driwe-app" target="_blank" className="text-gray-400 hover:text-[#fcd129]">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="https://www.threads.com/@driwe.in" target="_blank" className="text-gray-400 hover:text-[#fcd129]">
                <ThreadsIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-12 pt-6 text-center text-xs text-gray-400">
          <p>&copy; {new Date().getFullYear()} DriWE. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
