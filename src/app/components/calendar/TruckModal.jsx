"use client";

import { Globe, Instagram, Utensils, X } from "lucide-react";
import Image from "next/image";

export default function TruckModal({ truck, date, onClose, onOpenMenu }) {
  if (!truck) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-nature-500/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header Image/Logo Area */}
        <div className="relative h-32 bg-nature-100">
          <div className="absolute inset-0 bg-nature-500/10" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/50 hover:bg-white rounded-full transition-colors z-10"
          >
            <X size={20} className="text-nature-500" />
          </button>
        </div>

        {/* Profile Section - Overlapping */}
        <div className="px-6 relative -mt-12 flex flex-col items-center text-center">
          <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white relative">
            <Image
              src={truck.logo}
              alt={truck.name}
              fill
              className="object-cover"
            />
          </div>

          <h2 className="mt-4 font-serif text-2xl font-bold text-nature-500">
            {truck.name}
          </h2>
          <p className="text-nature-400 text-sm font-medium">{date}</p>

          <p className="mt-4 text-gray-600 text-sm leading-relaxed">
            {truck.description}
          </p>
        </div>

        {/* Top Dishes */}
        <div className="px-6 py-6">
          <h3 className="text-xs font-bold uppercase tracking-widest text-nature-300 mb-3 text-center">
            Top Dishes
          </h3>
          <div className="flex flex-wrap gap-2 justify-center">
            {truck.topDishes?.map((dish, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-nature-50 text-nature-500 text-xs font-bold rounded-full border border-nature-100"
              >
                ★ {dish}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-nature-50 p-6 flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-3">
            <a
              href={truck.website}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 py-3 bg-white border border-nature-200 text-nature-500 rounded-xl font-bold text-sm hover:bg-nature-100 transition-colors"
            >
              <Globe size={16} /> Website
            </a>
            <button
              onClick={onOpenMenu}
              className="flex items-center justify-center gap-2 py-3 bg-nature-500 text-white rounded-xl font-bold text-sm hover:bg-nature-400 transition-colors shadow-md"
            >
              <Utensils size={16} /> View Menu
            </button>
          </div>

          {/* Social Links (Optional) */}
          {truck.socials?.instagram && (
            <div className="flex justify-center mt-2">
              <a
                href="#"
                className="text-nature-300 hover:text-nature-500 text-xs flex items-center gap-1"
              >
                <Instagram size={12} /> {truck.socials.instagram}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
