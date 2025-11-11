"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import QRCode from "react-qr-code";
import Image from "next/image";

interface BookNowButtonProps {
  className?: string;
  children?: React.ReactNode;
}

const BookNowButton: React.FC<BookNowButtonProps> = ({
  className = "",
  children = "Book Now",
}) => {
  const [showQR, setShowQR] = useState(false);
  const [mounted, setMounted] = useState(false);

  const playStoreLink = "https://play.google.com/store/apps/developer?id=DriWE";
  const appStoreLink = "https://apps.apple.com/in/app/driwe/id6753580252";

  useEffect(() => {
    setMounted(true);
    if (showQR) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showQR]);

  const modal = showQR && mounted ? (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md z-[99999]"
        onClick={() => setShowQR(false)}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-[999999] flex items-center justify-center p-6">
        <div
          className="bg-white rounded-3xl w-full max-w-xs mx-auto py-8 px-6 shadow-2xl relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="absolute top-2 right-2 text-gray-600 hover:text-black text-3xl font-light"
            onClick={() => setShowQR(false)}
          >
            ×
          </button>

          <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">
            Download DriWE App
          </h3>

          <div className="grid grid-cols-2 gap-6">
            {/* Google Play */}
            <div className="flex flex-col items-center space-y-3">
              <div className="p-3 bg-white rounded-xl shadow-md border-3 border-gray-100 hover:border-yellow-400 transition-all">
                <QRCode value={playStoreLink} size={100} level="H" />
              </div>
              <a href={playStoreLink} target="_blank" rel="noopener noreferrer">
                <Image
                  src="/images/playstore.png"
                  alt="Google Play"
                  width={125}
                  height={48}
                  className="object-contain"
                />
              </a>
            </div>

            {/* App Store */}
            <div className="flex flex-col items-center space-y-3">
              <div className="p-3 bg-white rounded-xl shadow-md border-3 border-gray-100 hover:border-purple-400 transition-all">
                <QRCode value={appStoreLink} size={100} level="H" />
              </div>
              <a href={appStoreLink} target="_blank" rel="noopener noreferrer">
                <Image
                  src="/images/appstore.png"
                  alt="App Store"
                  width={125}
                  height={48}
                  className="object-contain"
                />
              </a>
            </div>
          </div>

          <p className="text-center mt-8 text-sm font-medium text-gray-700">
            Scan or tap to download!
          </p>
        </div>
      </div>
    </>
  ) : null;

  return (
    <>
      <button
        className={`px-8 py-4 rounded-full bg-[#fcd129] font-semibold text-black flex items-center gap-2 hover:scale-105 transition shadow-lg ${className}`}
        onClick={() => setShowQR(true)}
        type="button"
      >
        {children}
      </button>

      {/* PORTAL — THIS FIXES OVERLAP 100% */}
      {mounted && createPortal(modal, document.body)}
    </>
  );
};

export default BookNowButton;