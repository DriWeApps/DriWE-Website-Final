"use client";

import React, { useState } from "react";
import { 
  Smartphone, 
  Car, 
  CreditCard, 
  Calendar, 
  MapPin, 
  TrendingUp 
} from "lucide-react";

function HowItWorks() {
  const [selectedCategory, setSelectedCategory] = useState<'Cab' | 'Courier'>('Cab');

  // Ensure content is properly structured for conditional rendering
  const categoryContent = {
    Cab: [
      {
        step: "01",
        title: "Book",
        description: "Choose your pickup and destination locations",
        icon: <Smartphone className="w-8 h-8" />
      },
      {
        step: "02", 
        title: "Ride",
        description: "Get matched with a professional driver",
        icon: <Car className="w-8 h-8" />
      },
      {
        step: "03",
        title: "Pay",
        description: "Pay securely through the app with multiple options",
        icon: <CreditCard className="w-8 h-8" />
      }
    ],
    Courier: [
      {
        step: "01",
        title: "Schedule",
  description: "Plan your courier needs in advance",
        icon: <Calendar className="w-8 h-8" />
      },
      {
        step: "02", 
  title: "Courier",
  description: "Premium vehicles for group courier delivery",
        icon: <MapPin className="w-8 h-8" />
      },
      {
        step: "03",
        title: "Arrive",
        description: "Arrive at your destination safely and on time",
        icon: <TrendingUp className="w-8 h-8" />
      }
    ]
  };

  // Debug: Add console.log to verify state changes
  console.log('Current category:', selectedCategory);
  console.log('Content for category:', categoryContent[selectedCategory]);

  return (
    <section className="bg-black text-white py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            How It <span className="text-[#fcd129]">Works</span>
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            Simple steps to experience premium cab and courier services
          </p>

          {/* FIXED Toggle Buttons with equal width and perfect alignment */}
          <div className="flex justify-center mb-12">
            <div className="bg-gray-800 p-1 rounded-full flex">
              {(['Cab', 'Courier'] as const).map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    console.log('Clicking:', category); // Debug log
                    setSelectedCategory(category);
                  }}
                  className={`flex-1 px-8 py-2 rounded-full font-semibold transition-all duration-300 text-center min-w-[120px] ${
                    selectedCategory === category
                      ? 'bg-[#fcd129] text-black'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Conditional content with proper key prop to force re-render */}
        <div key={selectedCategory} className="grid md:grid-cols-3 gap-12">
          {categoryContent[selectedCategory].map(({ step, title, description, icon }, index) => (
            <div key={`${selectedCategory}-${index}`} className="text-center">
              <div className="relative mb-8">
                {/* Icon Circle with actual icons */}
                <div className="w-24 h-24 bg-[#fcd129] rounded-full flex items-center justify-center text-black mx-auto mb-4 relative">
                  {icon}
                  {/* Step Number Badge */}
                  <div className="absolute -top-2 -right-2 w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center border-2 border-[#fcd129]">
                    <span className="text-[#fcd129] font-bold">{step}</span>
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4">{title}</h3>
              <p className="text-gray-300">{description}</p>
            </div>
          ))}
        </div>

        {/* Debug section - Remove this after testing */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          Current selection: {selectedCategory}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
