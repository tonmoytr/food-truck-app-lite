"use client";

import Button from "@/app/components/ui/Button";
import { Printer, Share2, X } from "lucide-react";

export default function MenuModal({ menu, truckName, onClose }) {
  if (!menu) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-60 flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-nature-500/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content - Bottom Sheet on Mobile, Center Card on Desktop */}
      <div className="relative w-full max-w-2xl bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-10 sm:zoom-in-95 duration-300 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-nature-100 flex justify-between items-center bg-nature-50">
          <div>
            <h2 className="font-serif text-2xl font-bold text-nature-500">
              {truckName}
            </h2>
            <p className="text-nature-400 text-xs font-bold uppercase tracking-wider">
              Daily Menu
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 bg-white hover:bg-nature-100 rounded-full text-nature-500 transition-colors border border-nature-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Menu Content */}
        <div
          className="flex-1 overflow-y-auto p-6 space-y-8 bg-white"
          id="printable-menu"
        >
          {menu.categories?.map((category, idx) => (
            <div key={idx}>
              <h3 className="text-lg font-bold text-nature-500 border-b-2 border-nature-100 pb-2 mb-4">
                {category.name}
              </h3>
              <div className="space-y-4">
                {category.items.map((item, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-start group"
                  >
                    <div className="pr-4">
                      <h4 className="font-bold text-gray-800 group-hover:text-nature-500 transition-colors">
                        {item.name}
                      </h4>
                      <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                        {item.desc}
                      </p>
                    </div>
                    <span className="font-bold text-nature-500 whitespace-nowrap bg-nature-50 px-2 py-1 rounded text-sm">
                      {item.price}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Fixed Bottom Footer */}
        <div className="p-4 border-t border-nature-100 bg-gray-50 flex gap-3">
          <Button
            variant="outline"
            className="flex-1 border-nature-200 text-nature-500 hover:bg-white"
            onClick={onClose}
          >
            Close
          </Button>
          <Button
            className="flex-none bg-nature-100 text-nature-500 hover:bg-nature-200 px-4"
            onClick={() => alert("Share link copied!")}
          >
            <Share2 size={18} />
          </Button>
          <Button
            className="flex-none bg-nature-500 text-white hover:bg-nature-400 px-4"
            onClick={handlePrint}
          >
            <Printer size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
}
