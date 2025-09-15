"use client";

import React from "react";
import Image from "next/image";

const TransparencySection: React.FC = () => (
  <section className="py-16 px-4 max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
    <div className="flex-1">
      <h2 className="text-3xl font-bold mb-4">Transparency & Trust</h2>
      <p className="text-gray-700 mb-4">
        We believe in full transparency for all users, drivers, and investors. Our platform provides real-time metrics, clear pricing, and open access to ride and payment histories. Investors can track platform growth and revenue in their dashboard.
      </p>
      <ul className="list-disc pl-6 text-gray-600 space-y-2">
        <li>Real-time ride and payment tracking</li>
        <li>Clear commission and fee structure</li>
        <li>Open access to platform performance metrics</li>
        <li>24/7 support for all stakeholders</li>
      </ul>
      <a href="#investor-dashboard" className="inline-block mt-6 bg-[#fcd129] text-black font-semibold px-6 py-2 rounded-full shadow hover:bg-yellow-400 transition">See Live Metrics</a>
    </div>
    <div className="flex-1 flex justify-center">
      <Image src="/images/transparent-dashboard.png" alt="Transparency Dashboard" width={350} height={220} className="rounded-xl shadow" />
    </div>
  </section>
);

export default TransparencySection;
