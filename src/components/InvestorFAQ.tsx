"use client";
import { useState } from "react";

export default function InvestorFAQ() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'rider' | 'driver'>('rider');

  const faqCategories = {
    rider: [
      {
        question: "How do I book a ride with DriWE?",
        answer: "Simply open the DriWE app, enter your pickup location and destination, select your preferred ride type, and tap 'Book Now'. You'll be matched with a nearby driver within minutes."
      },
      {
        question: "What payment methods does DriWE accept?",
        answer: "DriWE accepts all major credit cards, debit cards, digital wallets (UPI, Paytm, Google Pay), and cash payments. Your payment method can be easily managed in the app settings."
      },
      {
        question: "Can I track my driver in real-time?",
        answer: "Yes! Once your ride is confirmed, you can track your driver's location in real-time on the map. You'll also receive SMS updates with driver details and estimated arrival time."
      },
      {
        question: "What if I need to cancel my ride?",
        answer: "You can cancel your ride through the app. Free cancellation is available within the first 2 minutes. After that, a small cancellation fee may apply to compensate the driver for their time."
      },
      {
        question: "Is it safe to ride with DriWE?",
        answer: "Absolutely! All our drivers undergo thorough background checks, vehicle inspections, and safety training. You can share your trip details with contacts and rate your experience after each ride."
      },
      {
        question: "Can I schedule a ride in advance?",
        answer: "Yes, you can schedule rides up to 7 days in advance. Simply select 'Schedule Ride' in the app, choose your preferred date and time, and we'll have a driver ready for you."
      }
    ],
    driver: [
      {
        question: "How do I become a DriWE driver?",
        answer: "Download the DriWE Driver app, complete your profile with required documents (license, vehicle registration, insurance), pass our background check, and attend a brief orientation session."
      },
      {
        question: "When and how do I get paid?",
        answer: "Drivers are paid weekly via direct bank transfer. You can also cash out instantly anytime with our 'Instant Pay' feature for a small convenience fee. Track all earnings in the driver app."
      },
      {
        question: "What are DriWE's commission rates?",
        answer: "DriWE charges a competitive 15-18% service fee per ride, which is lower than most competitors. You keep 82-85% of each fare, plus 100% of tips from riders."
      },
      {
        question: "Can I drive with my own schedule?",
        answer: "Yes! DriWE offers complete flexibility. Drive when you want, for as long or as little as you want. There are no minimum hour requirements or mandatory shifts."
      },
      {
        question: "What support is available for drivers?",
        answer: "We provide 24/7 driver support through the app, phone, and dedicated driver hubs. Get help with technical issues, account questions, or incident reporting anytime you need it."
      },
      {
        question: "What vehicles are eligible for DriWE?",
        answer: "Vehicles must be 2015 or newer, have 4 doors, pass our safety inspection, and have valid registration and insurance. We accept sedans, hatchbacks, and SUVs in good condition."
      }
    ]
  };

  return (
    <section className="bg-black text-white py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Frequently Asked <span className="text-[#fcd129]">Questions</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Find answers to common questions about using DriWE as a rider or driver
          </p>
        </div>
        <div className="flex justify-center gap-4 mb-12">
          {[
            { key: 'rider', label: 'Rider FAQs' },
            { key: 'driver', label: 'Driver FAQs' }
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key as 'rider' | 'driver')}
              className={`flex items-center gap-2 px-8 py-3 rounded-full transition-all duration-300 ${
                activeTab === key 
                  ? 'bg-[#fcd129] text-black font-semibold' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="space-y-4">
          {faqCategories[activeTab].map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden transition-all duration-300 hover:border-gray-700"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full flex justify-between items-center p-6 text-left hover:bg-gray-800 transition-colors"
                >
                  <h3 className="text-xl font-semibold text-white pr-4">
                    {faq.question.replace(/'/g, "&apos;")}
                  </h3>
                  <span className={`text-[#fcd129] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    ↓
                  </span>
                </button>
                {isOpen && (
                  <div className="px-6 pb-6">
                    <div className="pt-4 border-t border-gray-800">
                      <p className="text-gray-300 leading-relaxed text-lg">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className="mt-16 text-center bg-gradient-to-r from-gray-900 to-black rounded-3xl p-8 border border-gray-800">
          <h3 className="text-2xl font-bold mb-4">Still Have Questions?</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Can&apos;t find what you&apos;re looking for? Our support team is here to help 24/7
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-[#fcd129] text-black px-8 py-3 rounded-full font-semibold hover:bg-[#eab308] transition-colors">
              Contact Support
            </button>
            <button className="border border-[#fcd129] text-[#fcd129] px-8 py-3 rounded-full font-semibold hover:bg-[#fcd129] hover:text-black transition-colors">
              Live Chat
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
