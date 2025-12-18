"use client";

import {
    addMonths,
    eachDayOfInterval,
    endOfMonth,
    endOfWeek,
    format,
    getYear,
    isSameDay,
    isSameMonth,
    isToday,
    parseISO,
    setYear,
    startOfMonth,
    startOfWeek,
    subMonths,
} from "date-fns";
import {
    Calendar as CalIcon,
    ChevronLeft,
    ChevronRight,
    Utensils,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useSwipeable } from "react-swipeable";

import MenuModal from "./MenuModal";
import TruckModal from "./TruckModal";

export default function CalendarSystem({
  events = [],
  holidays = [],
  trucks = [],
  menus = [],
}) {
  const [currentDate, setCurrentDate] = useState(new Date());

  // --- Modal State ---
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // FIX: New state to track if we opened menu directly from the calendar icon
  const [isDirectMenuAccess, setIsDirectMenuAccess] = useState(false);

  // --- Helpers ---
  const truckMap = trucks.reduce((acc, truck) => {
    acc[truck.id] = truck;
    return acc;
  }, {});

  // --- Calendar Logic ---
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);
  const calendarDays = eachDayOfInterval({ start: startDate, end: endDate });

  // --- Handlers ---
  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  const handleYearChange = (e) => {
    const newYear = parseInt(e.target.value);
    setCurrentDate(setYear(currentDate, newYear));
  };

  const handlers = useSwipeable({
    onSwipedLeft: nextMonth,
    onSwipedRight: prevMonth,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  const getDayEvents = (day) =>
    events.filter((event) => isSameDay(parseISO(event.date), day));
  const getDayHoliday = (day) =>
    holidays.find((h) => isSameDay(parseISO(h.date), day));

  // --- Interaction Handlers ---

  // 1. Open Truck Details (Standard Flow)
  const handleTruckClick = (truck, dateFormatted) => {
    setSelectedEvent({ truck, date: dateFormatted });
    setIsMenuOpen(false);
    setIsDirectMenuAccess(false); // We are NOT direct, we want the "Back" behavior
  };

  // 2. Open Menu Directly (Direct Flow)
  const handleMenuClick = (e, truck, dateFormatted) => {
    e.stopPropagation();
    setSelectedEvent({ truck, date: dateFormatted });
    setIsMenuOpen(true);
    setIsDirectMenuAccess(true); // We ARE direct, we want "Close All" behavior
  };

  // 3. Smart Close Handler
  const handleCloseMenu = () => {
    if (isDirectMenuAccess) {
      // If opened via icon, close EVERYTHING
      setSelectedEvent(null);
      setIsMenuOpen(false);
    } else {
      // If opened via Truck Modal, just go BACK to Truck Modal
      setIsMenuOpen(false);
    }
  };

  const getSelectedMenu = () => {
    if (!selectedEvent) return null;
    return menus.find((m) => m.truckId === selectedEvent.truck.id);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-2 sm:px-6 mb-20" {...handlers}>
      {/* Header & Filters */}
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-8 gap-4 bg-white p-6 rounded-2xl shadow-sm border border-nature-100">
        <div>
          <h2 className="text-3xl font-serif font-bold text-nature-500">
            {format(currentDate, "MMMM")}{" "}
            <span className="text-nature-300">
              {format(currentDate, "yyyy")}
            </span>
          </h2>
          <p className="text-nature-400 font-sans mt-1 flex items-center gap-2 text-sm">
            <CalIcon size={16} />
            Browse events by month
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <select
              value={getYear(currentDate)}
              onChange={handleYearChange}
              className="appearance-none bg-nature-50 border border-nature-200 text-nature-500 font-bold py-2 pl-4 pr-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-nature-300 cursor-pointer"
            >
              <option value={2024}>2024</option>
              <option value={2025}>2025</option>
              <option value={2026}>2026</option>
            </select>
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-nature-400 text-xs">
              ▼
            </div>
          </div>
          <div className="flex items-center gap-1 bg-nature-50 p-1 rounded-full border border-nature-200">
            <button
              onClick={prevMonth}
              className="p-2 hover:bg-white hover:shadow-sm rounded-full transition-all text-nature-500"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextMonth}
              className="p-2 hover:bg-white hover:shadow-sm rounded-full transition-all text-nature-500"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="bg-white rounded-3xl shadow-xl border border-nature-100 overflow-hidden">
        <div className="grid grid-cols-7 border-b border-nature-100 bg-nature-50/50">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div
              key={day}
              className="py-4 text-center text-xs font-bold uppercase tracking-widest text-nature-400"
            >
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 auto-rows-fr">
          {calendarDays.map((day) => {
            const dayEvents = getDayEvents(day);
            const holiday = getDayHoliday(day);
            const isSelectedMonth = isSameMonth(day, monthStart);
            const isTodayDate = isToday(day);

            return (
              <div
                key={day.toString()}
                className={`
                  min-h-35 border-b border-r border-nature-100 p-2 relative group transition-colors overflow-hidden
                  ${
                    !isSelectedMonth
                      ? "bg-gray-50/50 text-gray-300"
                      : "bg-white"
                  }
                `}
              >
                {/* Holiday Background */}
                {holiday && isSelectedMonth && (
                  <div className="hidden md:block absolute inset-0 pointer-events-none z-0">
                    <Image
                      src={holiday.image || "/images/holiday-bg.jpg"}
                      alt={holiday.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 0vw, 15vw"
                    />
                    <div className="absolute inset-0 bg-black/20 mix-blend-overlay" />
                  </div>
                )}

                {/* Date & Mobile Holiday Text */}
                <div className="flex justify-between items-start relative z-10">
                  <span
                    className={`w-7 h-7 flex items-center justify-center rounded-full text-sm font-bold ${
                      isTodayDate ? "bg-nature-500 text-white shadow-md" : ""
                    } ${holiday ? "text-amber-600" : ""}`}
                  >
                    {format(day, "d")}
                  </span>
                  {holiday && (
                    <span className="md:hidden text-[10px] font-bold text-amber-600 bg-amber-50 px-1 rounded truncate max-w-15">
                      {holiday.name}
                    </span>
                  )}
                </div>
                {/* Desktop Holiday Text */}
                {holiday && (
                  <div className="hidden md:block absolute bottom-1 right-2 text-xs font-bold text-nature-200 uppercase tracking-widest opacity-40 -rotate-12 pointer-events-none">
                    {holiday.name}
                  </div>
                )}

                {/* Events List */}
                <div className="mt-2 space-y-1.5 relative z-10">
                  {dayEvents.slice(0, 3).map((event) => {
                    const truck = truckMap[event.truckId];
                    if (!truck) return null;
                    const dateFormatted = format(day, "EEEE, MMMM do");

                    return (
                      <div
                        key={event.id}
                        onClick={() => handleTruckClick(truck, dateFormatted)}
                        className="cursor-pointer group/event"
                      >
                        <div className="pl-2 pr-1 py-1.5 rounded-lg bg-nature-50 text-nature-600 border border-nature-100 text-xs font-medium truncate hover:bg-nature-500 hover:text-white hover:shadow-md transition-all flex items-center justify-between gap-1">
                          <div className="flex items-center gap-1.5 truncate grow">
                            <span className="w-1.5 h-1.5 rounded-full bg-nature-400 group-hover/event:bg-white shrink-0"></span>
                            <span className="truncate">{truck.name}</span>
                          </div>

                          {/* Menu Icon */}
                          {truck.hasMenu && (
                            <button
                              type="button"
                              onClick={(e) =>
                                handleMenuClick(e, truck, dateFormatted)
                              }
                              className="bg-white/40 p-1 rounded hover:bg-white hover:text-nature-500 transition-colors shrink-0 z-20"
                              title="View Menu"
                            >
                              <Utensils size={11} />
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                  {dayEvents.length > 3 && (
                    <button className="w-full text-left text-[10px] font-bold text-nature-400 hover:text-nature-500 pl-2">
                      + {dayEvents.length - 3} more...
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* --- RENDER MODALS --- */}

      {/* 1. Truck Details Modal */}
      {selectedEvent && !isMenuOpen && (
        <TruckModal
          truck={selectedEvent.truck}
          date={selectedEvent.date}
          onClose={() => setSelectedEvent(null)}
          onOpenMenu={() => setIsMenuOpen(true)}
        />
      )}

      {/* 2. Full Menu Modal */}
      {selectedEvent && isMenuOpen && (
        <MenuModal
          menu={getSelectedMenu()}
          truckName={selectedEvent.truck.name}
          // FIX: Use our new Smart Close Handler
          onClose={handleCloseMenu}
        />
      )}
    </div>
  );
}
