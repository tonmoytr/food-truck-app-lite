"use client";

import Button from "@/app/components/ui/Button";
import Container from "@/app/components/ui/Container";
import Image from "next/image";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";

// Mock Data
const trucks = [
  {
    id: 1,
    name: "Taco Titan",
    cuisine: "Mexican",
    image: "/assets/images/landing/truck.jpg", 
  },
  {
    id: 2,
    name: "Burger Bliss",
    cuisine: "American",
    image: "/assets/images/landing/truck2.jpg",
  },
  {
    id: 3,
    name: "Wok n' Roll",
    cuisine: "Asian Fusion",
    image: "/assets/images/landing/truck3.jpg",
  },
  {
    id: 4,
    name: "Crepe Escape",
    cuisine: "French",
    image: "/assets/images/landing/truck4.jpg",
  },
];

export default function TruckCarousel() {
  return (
    <section id="trucks" className="py-20 bg-nature-100/30">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 px-2">
          <div className="max-w-xl">
            <h2 className="font-serif text-4xl font-bold text-nature-500 mb-4">
              Our Featured Trucks
            </h2>
            <p className="text-nature-400 font-sans text-lg">
              Discover the rotating lineup of the city&apos;s finest mobile
              kitchens.
            </p>
          </div>
        </div>

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
              {/* FIX 1: Added brackets around height [400px] */}
              <div className="group relative h-[400px] w-full rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                {/* Image */}
                <div className="relative h-full w-full">
                  <Image
                    src={truck.image}
                    alt={truck.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>

                {/* FIX 2: Changed to bg-gradient-to-t */}
                <div className="absolute inset-0 bg-gradient-to-t from-nature-500/90 via-transparent to-transparent opacity-80" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 w-full p-6 text-white">
                  <span className="inline-block px-3 py-1 bg-nature-200 text-nature-500 text-xs font-bold rounded-full mb-3">
                    {truck.cuisine}
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
      </Container>
    </section>
  );
}
