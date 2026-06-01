// "use client";
// import { useState } from "react";
// import BookNowButton from "./BookNowButton";

// export default function PremiumBookingInterface() {
//   const [selectedService, setSelectedService] = useState('cab');

//   const services = [
//     {
//       id: 'cab',
//       name: 'DriWE Cab',
//       price: 'xxx',
//       time: '5 min',
//       rating: '4.9',
//       features: []
//     },
//     {
//   id: 'courier',
//   name: 'DriWE Courier',
//       price: 'xxx',
//       time: '3 min',
//       rating: '4.9',
//       features: []
//     }
//   ];

//   return (
//     <section className="bg-black text-white py-20 px-6">
//       <div className="max-w-6xl mx-auto">
//         <div className="text-center mb-12">
//           <h2 className="text-4xl md:text-5xl font-bold mb-4">
//             Experience <span className="text-[#fcd129]">Premium</span> Mobility
//           </h2>
//           <p className="text-gray-300 text-lg">
//             Book your ride in seconds with DriWE&apos;s intelligent platform
//           </p>
//         </div>
//         <div className="bg-gray-900 rounded-3xl p-8 border border-gray-800">
//           <div className="grid md:grid-cols-2 gap-8 mb-8">
//             <div className="space-y-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-300 mb-2">
//                   Pickup Location
//                 </label>
//                 <div className="relative">
//                   <span className="absolute left-4 top-4 text-[#fcd129]">📍</span>
//                   <input
//                     type="text"
//                     placeholder="Enter pickup location"
//                     className="w-full bg-gray-800 border border-gray-700 rounded-xl py-4 pl-12 pr-4 text-white focus:border-[#fcd129] focus:outline-none transition-colors"
//                   />
//                 </div>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-300 mb-2">
//                   Destination
//                 </label>
//                 <div className="relative">
//                   <span className="absolute left-4 top-4 text-[#fcd129]">📍</span>
//                   <input
//                     type="text"
//                     placeholder="Where to?"
//                     className="w-full bg-gray-800 border border-gray-700 rounded-xl py-4 pl-12 pr-4 text-white focus:border-[#fcd129] focus:outline-none transition-colors"
//                   />
//                 </div>
//               </div>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-300 mb-4">
//                 Select Service
//               </label>
//               <div className="space-y-4">
//                 {services.map((service) => (
//                   <div
//                     key={service.id}
//                     onClick={() => setSelectedService(service.id)}
//                     className={`p-4 rounded-xl border cursor-pointer transition-all ${
//                       selectedService === service.id
//                         ? 'border-[#fcd129] bg-[#fcd129]/10'
//                         : 'border-gray-700 hover:border-gray-600'
//                     }`}
//                   >
//                     <div className="flex justify-between items-start mb-2">
//                       <div className="flex items-center gap-3">
//                         <div className="w-8 h-8 bg-[#fcd129] rounded-full flex items-center justify-center">
//                           <span className="text-black font-bold text-sm">
//                             {service.id === 'cab' ? 'C' : 'T'}
//                           </span>
//                         </div>
//                         <div>
//                           <h3 className="font-semibold text-white">{service.name}</h3>
//                           <div className="flex items-center gap-2 text-sm text-gray-400">
//                             <span>★ {service.rating}</span>
//                             <span>• {service.time} away</span>
//                           </div>
//                         </div>
//                       </div>
//                       <span className="text-xl font-bold text-[#fcd129]">{service.price}</span>
//                     </div>
//                     <div className="flex flex-wrap gap-2">
//                       {service.features.map((feature, index) => (
//                         <span
//                           key={index}
//                           className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded-full"
//                         >
//                           {feature}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//           <div className="bg-gray-800 rounded-xl p-6 mb-6">
//             <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
//               <svg className="w-5 h-5 text-[#fcd129]" fill="currentColor" viewBox="0 0 24 24">
//                 <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
//               </svg>
//               Booking Summary
//             </h4>
//             <div className="space-y-2 text-sm">
//               <div className="flex justify-between text-gray-300">
//                 <span>Base fare</span>
//                 <span>xxx</span>
//               </div>
//               <div className="flex justify-between text-gray-300">
//                 <span>Platform fee</span>
//                 <span>xxx</span>
//               </div>
//               <div className="flex justify-between text-gray-300">
//                 <span>Service charge</span>
//                 <span>xxx</span>
//               </div>
//               <div className="border-t border-gray-700 pt-2 mt-2">
//                 <div className="flex justify-between text-white font-semibold">
//                   <span>Total Estimated Fare</span>
//                   <span className="text-[#fcd129]">xxx</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <BookNowButton className="w-full bg-[#fcd129] text-black py-4 rounded-xl font-semibold text-lg hover:bg-[#eab308] transition-colors">
//             {selectedService === 'cab' ? 'Book Cab' : 'Book Courier'}
//           </BookNowButton>
//         </div>
//       </div>
//     </section>
//   );
// }
