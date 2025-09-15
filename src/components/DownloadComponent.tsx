"use client";
import { useState } from "react";

export default function DownloadComponent() {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = () => {
    setIsDownloading(true);
    setTimeout(() => {
      const link = document.createElement('a');
      link.href = '/investor-presentation.pdf';
      link.download = 'DriWE-Investor-Presentation.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setIsDownloading(false);
    }, 2000);
  };

  return (
    <section className="bg-black text-white py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-900 rounded-3xl p-8 border border-gray-800 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Download <span className="text-[#fcd129]">Investor Presentation</span>
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Access our comprehensive investor presentation with detailed financial projections, market analysis, and growth strategy.
          </p>
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="bg-[#fcd129] text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#eab308] disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 inline-flex items-center gap-3"
          >
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
              />
            </svg>
            {isDownloading ? 'Preparing Download...' : 'Download Presentation'}
          </button>
          {isDownloading && (
            <div className="mt-4">
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-[#fcd129] h-2 rounded-full animate-pulse" style={{width: '100%'}}></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
