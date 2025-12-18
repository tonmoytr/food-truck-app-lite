import CalendarSystem from "@/app/components/calendar/CalendarSystem"; // Import the new component
import Container from "@/app/components/ui/Container";
import {
    getAllMenus,
    getAllTrucks,
    getHolidays,
    getLocationBySlug,
    getScheduleByLocation,
} from "@/lib/api";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function LocationPage({ params }) {
  // Use await for params in Next.js 16
  const { slug } = await params;

  // Fetch Data
  const location = await getLocationBySlug(slug);
  if (!location) return notFound();

  //   const events = await getScheduleByLocation(location.id);
  //   const holidays = await getHolidays();
  //   const trucks = await getAllTrucks();
  //   const menus = await getAllMenus()

  const [events, holidays, trucks, menus] = await Promise.all([
    getScheduleByLocation(location.id),
    getHolidays(),
    getAllTrucks(),
    getAllMenus(),
  ]);

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      {/* Hero Section */}
      <section className="relative h-75 w-full bg-nature-500 text-white flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: `url(${location.image})` }}
        />
        <div className="relative z-10 text-center space-y-4">
          <h1 className="font-serif text-5xl font-bold">{location.name}</h1>
          <p className="text-xl font-sans text-nature-100">
            Food Truck Schedule & Events
          </p>
          <Link
            href="/"
            className="inline-block mt-4 text-sm underline hover:text-nature-200"
          >
            ← Back to Home
          </Link>
        </div>
      </section>

      <Container className="py-12 -mt-10 relative z-20">
        {/* Pass 'trucks' to the component */}
        <CalendarSystem
          events={events}
          holidays={holidays}
          trucks={trucks}
          menus={menus}
        />
      </Container>
    </main>
  );
}
