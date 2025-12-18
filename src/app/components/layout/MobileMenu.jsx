"use client";

import Button from "@/app/components/ui/Button";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function MobileMenu({ navLinks }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      {/* Toggle Button */}
      <button
        className="text-nature-500 hover:text-nature-400"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Dropdown Overlay */}
      {isOpen && (
        <div className="absolute top-20 left-0 w-full bg-white border-b border-nature-200 shadow-xl p-6 flex flex-col space-y-6 animate-in slide-in-from-top-5 duration-200">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-lg font-medium text-nature-500 hover:text-nature-300 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Button className="w-full bg-nature-400 hover:bg-nature-300 text-white">
            Book a Truck
          </Button>
        </div>
      )}
    </div>
  );
}
