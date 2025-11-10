"use client";

import React, { useState } from "react";
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

  return (
    <>
      {/* Book Now Button */}
      <button
        className={`px-8 py-4 rounded-full bg-[#fcd129] font-semibold text-black flex items-center gap-2 hover:scale-105 transition ${className}`}
        onClick={() => setShowQR((v) => !v)}
        type="button"
      >
        {children}
      </button>

      {/* QR Code Modal – Mobile-Perfect */}
      {showQR && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-xs w-full flex flex-col items-center relative text-center shadow-xl">
            {/* Close Button */}
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-2xl"
              onClick={() => setShowQR(false)}
              aria-label="Close QR"
            >
              ×
            </button>

            {/* QR Codes + Store Badges */}
            <div className="flex gap-4 items-center">
              {/* Google Play */}
              <div className="flex flex-col items-center">
                <QRCode
                  value="https://play.google.com/store/apps/developer?id=DriWE"
                  size={90}
                  level="H"
                  className="mb-2"
                />
                <Image
                  src="/images/playstore.png"
                  alt="Get it on Google Play"
                  width={110}
                  height={40}
                  className="object-contain"
                />
              </div>

              {/* App Store – Your Custom QR */}
              <div className="flex flex-col items-center">
                <Image
                  src="/images/IOS QR Code.jpg"
                  alt="Download on the App Store"
                  width={90}
                  height={90}
                  className="mb-2 object-contain rounded"
                />
                <Image
                  src="/images/appstore.png"
                  alt="Download on the App Store"
                  width={110}
                  height={40}
                  className="object-contain"
                />
              </div>
            </div>

            {/* Bottom Text */}
            <p className="mt-4 text-sm text-gray-600">
              Scan to download our app!
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default BookNowButton;