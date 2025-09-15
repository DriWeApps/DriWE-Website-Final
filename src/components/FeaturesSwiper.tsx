"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Card, CardContent } from "@/components/ui/card";

interface Feature {
  icon: string; // we’ll use emoji for now (can replace with images later)
  title: string;
  desc: string;
}

interface FeaturesSwiperProps {
  features: Feature[];
}

const FeaturesSwiper: React.FC<FeaturesSwiperProps> = ({ features }) => {
  return (
    <Swiper
      spaceBetween={20}
      slidesPerView={1.2}
      breakpoints={{
        640: { slidesPerView: 2.2 },
        1024: { slidesPerView: 3.2 },
      }}
    >
      {features.map((f, i) => (
        <SwiperSlide key={i}>
          <Card className="rounded-2xl shadow-lg hover:shadow-xl transition-all p-4 bg-white dark:bg-neutral-900">
            <CardContent className="flex flex-col items-center text-center gap-3">
              <div className="text-4xl">{f.icon}</div>
              <h3 className="text-lg font-semibold">{f.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {f.desc}
              </p>
            </CardContent>
          </Card>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default FeaturesSwiper;
