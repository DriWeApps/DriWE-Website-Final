"use client";
import React, { useState, useEffect } from 'react';
import { ArrowUpCircle } from 'lucide-react';

const ScrollToTopButton = () => {
  // State to control the visibility of the button
  const [showButton, setShowButton] = useState(false);

  // Function to handle the scroll event and update state
  const handleScroll = () => {
    // Show the button if the user has scrolled more than 300px down
    if (window.scrollY > 300) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  // Function to scroll the window to the top with a smooth animation
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Set up and clean up the scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // The empty dependency array ensures this effect runs only once on mount

  return (
    <>
      {showButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 rounded-full bg-slate-900 p-3 text-white shadow-xl transition-opacity duration-300 ease-in-out hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-700 focus:ring-offset-2"
          aria-label="Scroll to top"
        >
          <ArrowUpCircle className="h-6 w-6" />
        </button>
      )}
    </>
  );
};

export default ScrollToTopButton;
