"use client";

import React, { useState } from "react";
import QRCode from 'react-qr-code';
import Image from "next/image";

interface BookNowButtonProps {
  className?: string;
  children?: React.ReactNode;
}

const BookNowButton: React.FC<BookNowButtonProps> = ({ className = "", children = "Book Now" }) => {
  const [showQR, setShowQR] = useState(false);

  return (
    <>
      <button
        className={`px-8 py-4 rounded-full bg-[#fcd129] font-semibold text-black flex items-center gap-2 hover:scale-105 transition ${className}`}
        onClick={() => setShowQR((v) => !v)}
        type="button"
      >
        {children}
      </button>
      {showQR && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-white rounded-xl p-8 shadow-lg flex flex-col items-center relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-2xl"
              onClick={() => setShowQR(false)}
              aria-label="Close QR"
            >
              ×
            </button>
            <h3 className="text-lg font-bold mb-4">Download the App</h3>
            <div className="flex gap-8">
              <div className="flex flex-col items-center">
                <QRCode
                  value="https://play.google.com/store/apps/developer?id=DriWE"
                  size={120}
                  level="H"
                />
                <span className="mt-2 text-xs">Google Play</span>
              </div>
              <div className="flex flex-col items-center">
                <Image src="/images/qr-appstore.png" alt="App Store QR" width={120} height={120} />
                <span className="mt-2 text-xs">App Store</span>
              </div>
            </div>
            <p className="mt-4 text-sm text-gray-600">Scan to download our app!</p>
          </div>
        </div>
      )}
    </>
  );
};

export default BookNowButton;
