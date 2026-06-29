"use client";

import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger, ScrollToPlugin } from "gsap/all";

export default function ShippingPolicyPage() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    gsap.fromTo(
      ".hero-text",
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
    );

    gsap.fromTo(
      ".hero-subtitle",
      { opacity: 0 },
      { opacity: 1, duration: 1, delay: 0.6 }
    );

    gsap.fromTo(
      ".content-card",
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
      }
    );
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">

      {/* HERO */}
      <section className="relative py-32">
        <div className="container mx-auto px-4 text-center">
          <h1 className="hero-text text-5xl md:text-7xl font-bold">
            Shipping <span className="text-yellow-400">Policy</span>
          </h1>

          <p className="hero-subtitle mt-8 text-slate-300 max-w-4xl mx-auto text-lg">
            At DriWE, we are committed to providing reliable and hassle-free
            logistics and delivery services. This Shipping Policy outlines how
            goods are picked up, transported, and delivered through our
            platform.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="pb-20 px-4">
        <div className="container max-w-6xl mx-auto">

          <div className="content-card rounded-2xl border border-white/20 bg-black p-10 shadow-xl hover:shadow-yellow-400/40 transition">

            <div className="space-y-10 text-slate-300 leading-8">

              <div>
                <h3 className="text-2xl text-yellow-400 font-bold mb-4">
                  1. Service Coverage
                </h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Our shipping services are currently available in Pune.</li>

                  <li>
                    Service availability may vary based on location, time, and
                    vehicle availability.
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl text-yellow-400 font-bold mb-4">
                  2. Order Placement & Confirmation
                </h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Users can place a shipping request via the App.</li>

                  <li>User can select the ride to make the courier.</li>

                  <li>Fill the required detail and place your drop locations.</li>

                  <li>
                    Once the request is confirmed, you will receive a booking otp
                    and driver vehicle details.
                  </li>

                  <li>
                    Orders are subject to acceptance based on vehicle
                    availability, item type, and serviceable areas.
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl text-yellow-400 font-bold mb-4">
                  3. Pick-up & Delivery
                </h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    Pick-up is done from the address provided by the customer.
                  </li>

                  <li>
                    Delivery will be made to the address specified at the time of
                    booking.
                  </li>

                  <li className="mt-4"><b>Customers must ensure that:</b></li>

                  <ul className="list-disc pl-6 space-y-2">
                    <li>Items are securely packed.</li>
                    <li>Use better quality of adhesive tape</li>
                    <li>Pick-up and drop locations are accurate and accessible.</li>
                    <li>
                      Someone is available at both locations to hand over/receive
                      the goods.
                    </li>
                  </ul>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl text-yellow-400 font-bold mb-4">
                  4. Item Restrictions
                </h3>

                <ul className="list-disc pl-6 space-y-2">
                  <li>Perishable and Food items</li>
                  <li>
                    LEDs, LCDs, plasma, OLED and any kind of television screens
                  </li>
                  <li>
                    Liquid product, livestock, perishables, live plants
                  </li>
                  <li>
                    Flammable items (firecrackers, oil cans, adhesives, paint
                    cans), explosives (arms, ammunition, fireworks, flares,
                    gunpowder, airbag inflators), fire extinguishers, electric
                    lighter/cigarette
                  </li>
                  <li>
                    Platinum, gold, silver, artificial jewelry, gem, precious,
                    semi-precious metals or stones in any form including bricks
                  </li>
                  <li>
                    Alcohol/tobacco/ medicines/drugs/poisonous goods, toxic and
                    infectious items
                  </li>
                  <li>
                    Valuable items, electronic devices, high capacity batteries
                    such as car batteries, generator batteries
                  </li>
                  <li>
                    Machinery parts containing oil, grease, fuel or batteries,
                    corrosive items
                  </li>
                  <li>
                    Radioactive material, Magnetized materials, Pressurized
                    Containers, Narcotic Substances & Medical and research
                    equipment
                  </li>
                  <li>
                    Indian postal articles such as stamps and articles like
                    coins, banknotes, currency notes, Sodexo or securities
                  </li>
                  <li>
                    Gambling devices, lottery tickets, pornographic material
                  </li>
                  <li>
                    DriWE is not responsible if any substance as mention above
                    is courier, DriWE don’t have any license to carry any of
                    this article
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl text-yellow-400 font-bold mb-4">
                  5. Delivery Timelines
                </h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Delivery times depend on distance, traffic, weather, and other operational factors.</li>
                  <li>We make reasonable efforts to ensure on-time deliveries, but delays may occur.</li>
                  <li>Estimated delivery times will be shown during booking.</li>
                </ul>

              </div>

              <div>
                <h3 className="text-2xl text-yellow-400 font-bold mb-4">
                  6. Shipping Charges
                </h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Charges are calculated based on km and timing.</li>

                  <ul className="list-disc pl-6 space-y-2">
                    <li>Distance (pick-up – stops – drop location)</li>
                    <li>Vehicle type (two-wheeler, mini truck, etc.)</li>
                    <li>
                      Additional services (waiting time, loading/unloading
                      assistance)
                    </li>
                  </ul>

                  <li>Exact charges are shown before confirming the booking.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl text-yellow-400 font-bold mb-4">
                  7. Tracking
                </h3>

                <ul className="list-disc pl-6 space-y-2">
                  <li>All shipments can be tracked live via the app.</li>
                  <li>Customers will also receive SMS/Email/Push notifications regarding order status.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl text-yellow-400 font-bold mb-4">
                  8. Cancellations
                </h3>

                <ul className="list-disc pl-6 space-y-2">
                  <li>Orders can be cancelled before vehicle dispatch at no extra charge.</li>
                  <li>Cancellation cannot be done after the parcel has been picked.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl text-yellow-400 font-bold mb-4">
                  9. Liability & Claims
                </h3>

                <ul className="list-disc pl-6 space-y-2">
                  <li>Our liability is limited to the declared value of the good.</li>
                  <li>Perishable Articles: Parties shall not tender for transportation any consignment containing perishable product shelf life of less than 7 days. DriWE shall not be liable for any loss or damage to any such consignment arising consequent to any delay in delivery.</li>
                  <li>Claims for lost or damaged items must be reported within 3 days of delivery.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl text-yellow-400 font-bold mb-4">
                  10. Customer Support
                </h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>For queries, complaints, or assistance:</li>
                  <li>Support Number : +91 86698 88996</li>
                  <li>Support Email : hello@driwe.in</li>
                </ul>
              </div>

              <div>
                <h3 className="text-3xl text-yellow-400 font-bold">
                  11. Ride / Service Policy – DriWE
                </h3>

                <div className="mt-6 whitespace-pre-line">
                  {`Welcome to DriWE! Your safe, affordable, and reliable travel partner. This Ride/Service Policy explains how our cab services operate, including booking, ride timelines, cancellations, and customer responsibilities.

- Service Coverage

DriWE currently operates in [list cities/regions].
Service availability may depend on time, location, and cab availability.

- Booking & Confirmation

Rides can be booked via the DriWE App.
Once booked, you will receive driver details, vehicle details, and fare estimate.
Booking confirmation is subject to cab availability.

- Pick-up & Drop

The driver will arrive at the pick-up location provided in the app.
Customers are requested to be at the pick-up point at the scheduled time.
Drop will only be to the destination entered at booking unless modified in-app.

- Ride Timelines

Estimated arrival times (ETA) may vary due to traffic, weather, or unforeseen conditions.
We make best efforts to ensure timely pick-up and drop, but delays may occur.

- Fare & Charges

Fares are calculated based on:
- Base fare (minimum charge).
- Distance traveled & time taken.
- Dynamic pricing (if applicable during peak hours).
Toll charges, parking fees, and state permits (if any) are payable by the rider.

- Cancellation Policy

Rides can be cancelled before the driver reaches the pick-up point at no cost.
If cancelled after driver arrival or if the rider is a no-show, cancellation charges may apply.
Refunds (if applicable) are processed within [X business days].

- Passenger Responsibilities

Ensure the pick-up and drop-off locations are accurate and accessible.
Wear seatbelts at all times during the ride.
No carrying of hazardous, illegal, or restricted items.
Treat drivers with respect and follow community guidelines.

- Safety & Tracking

All rides are GPS tracked for safety.
Share ride details with friends/family via the in-app share option.
24/7 emergency helpline available within the app.

- Liability

DriWE ensures best safety measures, but is not responsible for delays due to traffic, natural disasters, strikes, or government restrictions.
Any misconduct or violation of terms may lead to suspension of rider accounts.

- Customer Support

Support Number : +91 86698 88996
Support Email : Hello@driwe.in`}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}