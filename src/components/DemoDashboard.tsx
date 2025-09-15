"use client";

import React, { useState } from "react";

const carTypes = [
  { name: "Mini", desc: "Affordable, compact cars for city rides." },
  { name: "Sedan", desc: "Comfortable rides for up to 4 passengers." },
  { name: "SUV", desc: "Spacious SUVs for families or groups." },
  { name: "Luxury", desc: "Premium cars for special occasions." },
];

const scheduledRides = [
  { date: "2025-09-05", time: "09:00", from: "Downtown", to: "Airport", car: "Sedan", shared: false },
  { date: "2025-09-06", time: "18:30", from: "Mall", to: "Home", car: "Mini", shared: true },
];

const userRewards = 1200;

const driverStats = {
  earnings: 5400,
  rides: 120,
  rating: 4.9,
  ecoRides: 30,
  offPeak: 20,
};

const driverWithdrawals = [
  { date: "2025-09-01", amount: 2000 },
  { date: "2025-08-25", amount: 1500 },
];

const investorMetrics = {
  totalRides: 12000,
  revenue: 320000,
  activeUsers: 3400,
  growth: 12.5,
};

export default function DemoDashboard() {
  const [tab, setTab] = useState<'user' | 'driver' | 'investor'>('user');
  const [showSchedule, setShowSchedule] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="flex justify-center gap-4 mb-8">
        <button onClick={() => setTab('user')} className={`px-4 py-2 rounded-full font-semibold border ${tab==='user' ? 'bg-[#fcd129] text-black' : 'bg-white text-gray-700 border-gray-300'}`}>User</button>
        <button onClick={() => setTab('driver')} className={`px-4 py-2 rounded-full font-semibold border ${tab==='driver' ? 'bg-[#fcd129] text-black' : 'bg-white text-gray-700 border-gray-300'}`}>Driver</button>
        <button onClick={() => setTab('investor')} className={`px-4 py-2 rounded-full font-semibold border ${tab==='investor' ? 'bg-[#fcd129] text-black' : 'bg-white text-gray-700 border-gray-300'}`}>Investor</button>
      </div>

      {/* USER TAB */}
      {tab === 'user' && (
        <div className="space-y-8">
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-bold mb-4">Book a Ride</h2>
            <form className="flex flex-col md:flex-row gap-4 items-end">
              <div className="flex flex-col flex-1">
                <label className="font-medium">From</label>
                <input className="border rounded px-3 py-2" placeholder="Pickup location" />
              </div>
              <div className="flex flex-col flex-1">
                <label className="font-medium">To</label>
                <input className="border rounded px-3 py-2" placeholder="Drop location" />
              </div>
              <div className="flex flex-col">
                <label className="font-medium">Car Type</label>
                <select className="border rounded px-3 py-2">
                  {carTypes.map((c) => <option key={c.name}>{c.name}</option>)}
                </select>
              </div>
              <div className="flex flex-col">
                <label className="font-medium">Date</label>
                <input type="date" className="border rounded px-3 py-2" />
              </div>
              <div className="flex flex-col">
                <label className="font-medium">Time</label>
                <input type="time" className="border rounded px-3 py-2" />
              </div>
              <div className="flex flex-col items-center">
                <label className="font-medium">Share Ride</label>
                <input type="checkbox" className="w-5 h-5 mt-2" />
              </div>
              <button type="button" className="bg-[#fcd129] text-black font-semibold px-6 py-2 rounded-full ml-2">Book</button>
            </form>
            <button className="mt-4 underline text-sm text-blue-600" onClick={() => setShowSchedule((v) => !v)}>
              {showSchedule ? 'Hide' : 'Show'} Scheduled Rides
            </button>
            {showSchedule && (
              <div className="mt-4">
                <h3 className="font-semibold mb-2">Scheduled Rides</h3>
                <ul className="space-y-2">
                  {scheduledRides.map((r, i) => (
                    <li key={i} className="border rounded p-2 flex flex-col md:flex-row md:items-center gap-2">
                      <span className="font-medium">{r.date} {r.time}</span>
                      <span>{r.from} → {r.to}</span>
                      <span>{r.car}</span>
                      {r.shared && <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">Shared</span>}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col md:flex-row items-center justify-between">
            <div>
              <h3 className="font-bold text-lg">Your Rewards</h3>
              <p className="text-2xl font-mono">{userRewards} pts</p>
              <button className="mt-2 bg-[#fcd129] text-black px-4 py-1 rounded-full font-semibold">Redeem</button>
            </div>
            <div className="text-sm text-gray-600 mt-4 md:mt-0">Earn points for every ride. Redeem for discounts!</div>
          </div>
        </div>
      )}

      {/* DRIVER TAB */}
      {tab === 'driver' && (
        <div className="space-y-8">
          <div className="bg-white rounded-xl shadow p-6 flex flex-col md:flex-row items-center justify-between">
            <div>
              <h3 className="font-bold text-lg">Earnings</h3>
              <p className="text-2xl font-mono">₹{driverStats.earnings}</p>
              <button className="mt-2 bg-[#fcd129] text-black px-4 py-1 rounded-full font-semibold" onClick={() => setShowWithdraw((v) => !v)}>
                {showWithdraw ? 'Hide' : 'Withdraw Earnings'}
              </button>
              {showWithdraw && (
                <div className="mt-2">
                  <h4 className="font-semibold mb-1">Withdrawals</h4>
                  <ul className="text-sm space-y-1">
                    {driverWithdrawals.map((w, i) => (
                      <li key={i}>{w.date}: ₹{w.amount}</li>
                    ))}
                  </ul>
                  <button className="mt-2 bg-blue-600 text-white px-3 py-1 rounded">Withdraw Now</button>
                </div>
              )}
            </div>
            <div className="mt-6 md:mt-0">
              <h3 className="font-bold text-lg">Stats</h3>
              <ul className="text-sm">
                <li>Total Rides: {driverStats.rides}</li>
                <li>Rating: {driverStats.rating} ⭐</li>
                <li>Eco Rides: {driverStats.ecoRides}</li>
                <li>Off-Peak Rides: {driverStats.offPeak}</li>
              </ul>
            </div>
            <div className="mt-6 md:mt-0">
              <h3 className="font-bold text-lg">Rewards</h3>
              <ul className="text-sm">
                <li>High Rating Bonus</li>
                <li>Eco-friendly Vehicle Bonus</li>
                <li>Off-Peak Bonus</li>
              </ul>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="font-bold text-lg mb-2">Training & Support</h3>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li>Watch <a href="#" className="text-blue-600 underline">training videos</a></li>
              <li>Read <a href="#" className="text-blue-600 underline">safety tips</a></li>
              <li>Contact <a href="#" className="text-blue-600 underline">24/7 support</a></li>
            </ul>
          </div>
        </div>
      )}

      {/* INVESTOR TAB */}
      {tab === 'investor' && (
        <div className="space-y-8">
          <div className="bg-white rounded-xl shadow p-6 flex flex-col md:flex-row items-center justify-between">
            <div>
              <h3 className="font-bold text-lg mb-2">Live Metrics</h3>
              <ul className="text-sm">
                <li>Total Rides: {investorMetrics.totalRides}</li>
                <li>Revenue: ₹{investorMetrics.revenue}</li>
                <li>Active Users: {investorMetrics.activeUsers}</li>
                <li>Growth: {investorMetrics.growth}%</li>
              </ul>
            </div>
            <div className="mt-6 md:mt-0">
              <h3 className="font-bold text-lg mb-2">Investment Opportunities</h3>
              <button className="bg-green-600 text-white px-4 py-2 rounded-full font-semibold">Invest Now</button>
              <p className="text-xs text-gray-500 mt-2">Micro-investment & crowdfunding options available.</p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="font-bold text-lg mb-2">Transparency</h3>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li>Platform performance and financials are updated in real-time.</li>
              <li>Revenue breakdown and growth charts available on request.</li>
              <li>Contact us for detailed reports and partnership opportunities.</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
