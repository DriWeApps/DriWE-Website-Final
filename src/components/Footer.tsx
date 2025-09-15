'use client';

import React from 'react';
import { Phone, Mail, MapPin, Linkedin } from "lucide-react"

// Custom Threads icon component since it's not in lucide-react
const ThreadsIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.5 12.01c0-3.576.85-6.43 2.495-8.481C5.845 1.225 8.598.044 12.179.02h.014c3.581.024 6.334 1.205 8.184 3.509C21.65 5.58 22.5 8.434 22.5 12.01c0 3.576-.85 6.43-2.495 8.481C18.155 22.775 15.402 23.956 11.821 23.98h-.007l.372-.004zM12.186 2.174c-2.922.02-5.049.725-6.312 2.096C4.52 5.608 3.75 7.768 3.75 12.01s.77 6.402 2.124 7.74c1.263 1.371 3.39 2.076 6.312 2.096 2.922-.02 5.049-.725 6.312-2.096 1.354-1.338 2.124-3.498 2.124-7.74s-.77-6.402-2.124-7.74c-1.263-1.371-3.39-2.076-6.312-2.096z" />
    <path d="M16.538 7.578c-.184-.247-.42-.46-.693-.625-.546-.33-1.246-.497-2.085-.497-1.56 0-2.65.678-3.238 2.015-.294.669-.442 1.445-.442 2.309 0 .1.003.199.008.297.05 1.25.34 2.26.863 3.007.523.747 1.264 1.125 2.204 1.125.94 0 1.681-.378 2.204-1.125.523-.747.813-1.757.863-3.007.005-.098.008-.197.008-.297 0-.864-.148-1.64-.442-2.309-.588-1.337-1.678-2.015-3.238-2.015-.839 0-1.539.167-2.085.497-.273.165-.509.378-.693.625z" />
  </svg>
)

// Custom Instagram icon component for better styling
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
)

// Custom Facebook icon component for better styling
const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
)

export default function Footer() {
  return (
    <footer 
      className="relative bg-black text-white font-poppins py-16 px-4"
    >
      <div 
        className="absolute inset-0 bg-black bg-opacity-40"
        style={{
          backdropFilter: 'blur(20px)',     // Liquid glass blur effect
          WebkitBackdropFilter: 'blur(20px)', // For Safari support
        }}
      ></div>
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg md:text-xl text-white">Contact</h4>
            <div className="space-y-2 text-sm text-gray-300">
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 flex-shrink-0" />
                <span>+91 8669888996</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 flex-shrink-0" />
                <span className="break-all">hello@driwe.in</span>
              </div>
              <div className="flex items-start">
                <MapPin className="h-4 w-4 mr-2 flex-shrink-0 mt-1" />
                <span className="text-sm">Oneplace 8th floor 807, Salunke Vihar, Pune- 411048, Maharashtra</span>
              </div>
            </div>
          </div>

          {/* Paths from Image and 'test' paths */}
          <div className="space-y-4 col-span-2">
            <h4 className="font-semibold text-lg md:text-xl text-white">Paths</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-2 text-sm text-gray-300">
              <nav className="flex flex-col space-y-2">
                <a href="/about" className="hover:text-[#fcd129] transition-colors">About</a>
                <a href="/contact" className="hover:text-[#fcd129] transition-colors">Contact</a>
                <a href="/terms" className="hover:text-[#fcd129] transition-colors">Terms</a>
              </nav>
              <nav className="flex flex-col space-y-2">
                <a href="/privacy" className="hover:text-[#fcd129] transition-colors">Privacy</a>
                <a href="/safety" className="hover:text-[#fcd129] transition-colors">Safety</a>
                <a href="/services" className="hover:text-[#fcd129] transition-colors">Services</a>
                <a href="/support" className="hover:text-[#fcd129] transition-colors">Support</a>
                <a href="/why-choose" className="hover:text-[#fcd129] transition-colors">Why Choose</a>
              </nav>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg md:text-xl text-white">Follow Us</h4>
            <div className="flex space-x-3">
              <a
                href="https://www.facebook.com/profile.php?id=61575003763571"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#fcd129] transition-colors"
                aria-label="Follow us on Facebook"
              >
                <FacebookIcon className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/driwe.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#fcd129] transition-colors"
                aria-label="Follow us on Instagram"
              >
                <InstagramIcon className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/company/driwe-app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#fcd129] transition-colors"
                aria-label="Follow us on LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://www.threads.com/@driwe.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#fcd129] transition-colors"
                aria-label="Follow us on Threads"
              >
                <ThreadsIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-800 mt-12 pt-6 text-center text-xs md:text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} DriWE. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
