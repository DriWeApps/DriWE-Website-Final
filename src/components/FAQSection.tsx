"use client";

import React, { useState } from "react";

export interface FAQItem {
  question: string;
  answer: string;
  audience: "driver" | "user" | "investor" | "all";
}

const FAQS: FAQItem[] = [
  { question: "How do I become a driver?", answer: "Sign up on our app, upload your documents, and get verified.", audience: "driver" },
  { question: "How do I book a ride?", answer: "Open the app, enter your destination, and choose your ride.", audience: "user" },
  { question: "How do investors benefit?", answer: "Investors gain from platform growth and revenue sharing.", audience: "investor" },
  { question: "Is my data secure?", answer: "Yes, we use industry-standard encryption for all data.", audience: "all" },
  { question: "How do I get paid as a driver?", answer: "Payments are made directly to your bank account every week.", audience: "driver" },
  { question: "Can I schedule rides in advance?", answer: "Yes, users can schedule rides for later.", audience: "user" },
  { question: "What is the minimum investment?", answer: "Contact our team for the latest investment options.", audience: "investor" },
  { question: "How do I contact support?", answer: "Support is available 24/7 via app chat and email.", audience: "all" },
  { question: "Are there incentives for frequent users?", answer: "Yes, we offer loyalty rewards and discounts.", audience: "user" },
  { question: "How transparent is the platform?", answer: "All transactions and metrics are visible in your dashboard.", audience: "all" },
];

const audienceLabels = {
  all: "All",
  driver: "Drivers",
  user: "Users",
  investor: "Investors",
};

const FAQSection: React.FC = () => {
  const [selected, setSelected] = useState<"all" | "driver" | "user" | "investor">("all");

  return (
    <section className="py-16 px-4 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
      <div className="flex justify-center gap-4 mb-8">
        {Object.entries(audienceLabels).map(([key, label]) => (
          <button
            key={key}
            className={`px-4 py-2 rounded-full border font-medium transition-colors ${selected === key ? "bg-[#fcd129] text-black" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"}`}
            onClick={() => setSelected(key as "all" | "driver" | "user" | "investor")}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="space-y-4">
        {FAQS.filter(faq => selected === "all" || faq.audience === selected || faq.audience === "all").map((faq, idx) => (
          <details key={idx} className="bg-white rounded-lg shadow p-4 group">
            <summary className="font-semibold cursor-pointer text-lg group-open:text-[#fcd129] transition-colors">{faq.question}</summary>
            <p className="mt-2 text-gray-700">{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
