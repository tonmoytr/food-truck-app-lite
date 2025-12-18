import Container from "@/app/components/ui/Container";
import {
    getHolidays,
    getLocationBySlug,
    getScheduleByLocation,
} from "@/lib/api";
import Link from "next/link";
import { notFound } from "next/navigation";

// This is a Server Component. It fetches data BEFORE the page loads.
export default async function LocationPage({ params }) {
  // 1. Get the slug from the URL (e.g., "new-york")
  const { slug } = await params;

  // 2. Fetch the specific Location Data
  const location = await getLocationBySlug(slug);

  // 3. Security Check: If city doesn't exist, show 404
  if (!location) {
    return notFound();
  }

  // 4. Fetch the events for this specific city
  const events = await getScheduleByLocation(location.id);
  const holidays = await getHolidays();

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      {/* Dynamic Hero Section for this City */}
      <section className="relative h-300px w-full bg-nature-500 text-white flex items-center justify-center overflow-hidden">
        {/* Background Image Overlay */}
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

      <Container className="py-12">
        {/* DEBUGGING SECTION: This proves our API works. 
            We will remove this when we build the real Calendar. */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
          <h2 className="text-xl font-bold mb-4 text-nature-500">
            ✅ Data Successfully Fetched for {location.name}
          </h2>
          <ul className="space-y-2 text-sm text-gray-600 font-mono">
            <li>Location ID: {location.id}</li>
            <li>Address: {location.address}</li>
            <li>Total Events Found: {events.length}</li>
            <li>Total Holidays Loaded: {holidays.length}</li>
          </ul>
        </div>

        {/* Placeholder for the Calendar Component */}
        <div className="bg-white h-600px rounded-2xl shadow-lg border border-gray-200 flex items-center justify-center">
          <p className="text-gray-400 font-serif text-xl">
            Calendar Component Will Go Here
          </p>
        </div>
      </Container>
    </main>
  );
}
