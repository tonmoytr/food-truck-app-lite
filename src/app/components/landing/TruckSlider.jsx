"use client";

import Button from "@/app/components/ui/Button";
import Image from "next/image";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";

export default function TruckSlider({ trucks }) {
  return (
    <Swiper
      modules={[Navigation, Autoplay]}
      spaceBetween={24}
      slidesPerView={1}
      navigation
      autoplay={{ delay: 3500, disableOnInteraction: false }}
      breakpoints={{
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }}
      className="pb-12"
    >
      {trucks.map((truck) => (
        <SwiperSlide key={truck.id} className="h-full">
          <div className="group relative h-100 w-full rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
            {/* Image */}
            <div className="relative h-full w-full">
              <Image
                src={truck.logo} 
                alt={truck.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-nature-500/90 via-transparent to-transparent opacity-80" />

            {/* Content */}
            <div className="absolute bottom-0 left-0 w-full p-6 text-white">
              {/* Note: We might need to add a 'cuisine' field to trucks.json later, or just remove this span if data is missing */}
              <span className="inline-block px-3 py-1 bg-nature-200 text-nature-500 text-xs font-bold rounded-full mb-3">
                Featured
              </span>
              <h3 className="font-serif text-2xl font-bold mb-4">
                {truck.name}
              </h3>
              <Button
                variant="outline"
                className="w-full border-white text-white hover:bg-white hover:text-nature-500 py-2 text-sm"
              >
                View Menu
              </Button>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
