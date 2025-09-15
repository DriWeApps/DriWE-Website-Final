import Image from "next/image";
import React from "react";

export default function Download() {
  return (
    <div className="py-12 flex flex-col items-center gap-8">
      <Image
        src={"/images/download.png"} alt={"download image"}
        width={600}
        height={320}
        className="mx-auto h-auto w-full max-w-2xl object-cover rounded-xl shadow"
      />
      <div className="flex flex-col md:flex-row items-center gap-6">
        <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer">
          <Image src="/images/google-play-badge.png" alt="Get it on Google Play" width={180} height={54} />
        </a>
        <a href="https://www.apple.com/app-sto4re/" target="_blank" rel="noopener noreferrer">
          <Image src="/images/app-store-badge.png" alt="Download on the App Store" width={180} height={54} />
        </a>
        <div className="flex flex-col items-center">
          <Image src="/images/qr-playstore.png" alt="App QR" width={120} height={120} />
          <span className="mt-2 text-xs text-gray-600">Scan to download</span>
        </div>
      </div>
    </div>
  );
}