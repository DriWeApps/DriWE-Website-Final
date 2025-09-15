"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";


export default function InfiniteAdCarousel() {
  // Mock data for the ads.
  const adItems = [
    {
      id: 1,
      title: "Independent Drivers",
      description: "Join our network of independent drivers and earn more.",
      image: "/images/independent.png?width=1200&height=400",
    },
    {
      id: 2,
      title: "Refer a Friend",
      description: "Invite friends and earn a free ride for both of you.",
      image: "https://placehold.co/1200x400/F59E0B/FFFFFF?text=Refer+a+Friend",
    },
    {
      id: 3,
      title: "New Service Launched",
      description: "Try our new bike transport service in your city today.",
      image: "https://placehold.co/1200x400/F59E0B/FFFFFF?text=New+Service+Launched",
    },
    {
      id: 4,
      title: "Safety First",
      description: "Read our updated safety guidelines for a secure journey.",
      image: "https://placehold.co/1200x400/F59E0B/FFFFFF?text=Safety+First",
    },
  ];

  const carouselRef = useRef<HTMLDivElement | null>(null);
  const scrollInterval = useRef<NodeJS.Timeout | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  // We duplicate the list to create a seamless infinite loop effect.
  const duplicatedItems = [...adItems, ...adItems, ...adItems];

  // Function to scroll the carousel by one full banner width
  const scrollBy = (direction: number) => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.offsetWidth;
      carouselRef.current.scrollBy({
        left: direction * scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Auto-scroll functionality
  useEffect(() => {
    function startScrolling() {
      scrollInterval.current = setInterval(() => {
        if (carouselRef.current) {
          // Calculate the position of the second set of items
          const itemWidth = carouselRef.current.scrollWidth / 3;

          // Check if we've reached the end of the first set of duplicated items
          if (carouselRef.current.scrollLeft >= itemWidth) {
            // "Jump" back to the start of the first duplicated set instantly
            carouselRef.current.scrollLeft -= itemWidth;
          }

          // Smoothly scroll forward by one full banner width
          const scrollAmount = carouselRef.current.offsetWidth;
          carouselRef.current.scrollBy({
            left: scrollAmount,
            behavior: "smooth",
          });
        }
      }, 3000); // Scroll every 3 seconds
    }

    // Pause scrolling when the mouse is over the carousel
    if (!isHovering) {
      startScrolling();
    } else {
      if (scrollInterval.current) {
        clearInterval(scrollInterval.current);
      }
    }

    // Cleanup function to clear interval
    return () => {
      if (scrollInterval.current) {
        clearInterval(scrollInterval.current);
      }
    };
  }, [isHovering, adItems.length]);


  return (
    <>
      <div />
      <div className="bg-gray-100 py-12 font-[Inter] overflow-hidden">
        <div className="relative max-w-full px-4 sm:px-6">
          {/* Carousel Container */}
          <div
            ref={carouselRef}
            className="flex w-full overflow-x-hidden scrollbar-hide"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {/* Render duplicated items for infinite effect */}
            {duplicatedItems.map((item, index) => (
              <div
                key={index}
                className="w-full flex-shrink-0 relative bg-white rounded-lg shadow-lg"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  width={1200}
                  height={400}
                  className="rounded-t-lg object-cover w-full h-80"
                  onError={() => {}}
                />
                {/* Text and button below the image */}
                <div className="p-6 text-center">
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-sm sm:text-base text-gray-600 mb-4 max-w-xl mx-auto">{item.description}</p>
                    <button className="bg-[#fcd129] text-black px-8 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-colors">
                      Learn More
                    </button>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="absolute inset-y-0 left-0 flex items-center pl-4">
            <button
              onClick={() => scrollBy(-1)}
              className="bg-white p-3 rounded-full shadow-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-all duration-300 transform hover:scale-110 active:scale-95"
            >
              <i className="fa-solid fa-chevron-left"></i>
            </button>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-4">
            <button
              onClick={() => scrollBy(1)}
              className="bg-white p-3 rounded-full shadow-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-all duration-300 transform hover:scale-110 active:scale-95"
            >
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
