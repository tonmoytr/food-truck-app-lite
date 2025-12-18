import Container from "@/app/components/ui/Container";
import { getLocations } from "@/lib/api"; // We use your new API Engine
import Image from "next/image";
import Link from "next/link";

export default async function LocationCards() {
  // Fetch data directly on the server
  const locations = await getLocations();

  return (
    <section id="locations" className="py-24 bg-white">
      <Container>
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-nature-300 font-bold tracking-widest uppercase text-xs">
            Where to Find Us
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-nature-500">
            Explore Our Locations
          </h2>
          <p className="text-nature-400 font-sans text-lg">
            Select your city to view live truck schedules, daily menus, and
            upcoming events.
          </p>
        </div>

        {/* The Grid - Auto-responsive */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {locations.map((loc) => (
            <Link
              key={loc.id}
              href={`/location/${loc.slug}`}
              className="group block w-full"
            >
              <div className="relative h-450px w-full rounded-3xl overflow-hidden shadow-md group-hover:shadow-2xl transition-all duration-500 ease-out">
                {/* Background Image with Zoom Effect */}
                <div className="absolute inset-0 w-full h-full">
                  <Image
                    src={loc.image}
                    alt={loc.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                {/* Dark Gradient Overlay (Always visible for text readability) */}
                <div className="absolute inset-0 bg-linear-to-t from-nature-500/90 via-nature-500/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                {/* Content Container */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                  {/* City Name - Slides up slightly on hover */}
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-nature-200 text-xs font-bold tracking-wider uppercase mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      View Schedule
                    </p>
                    <h3 className="font-serif text-3xl font-bold leading-tight mb-2">
                      {loc.name}
                    </h3>
                    <div className="h-0.5 w-12 bg-nature-300 group-hover:w-full transition-all duration-500 ease-out" />

                    {/* Address - Fades in on hover */}
                    <p className="mt-3 text-sm text-nature-100 opacity-80 group-hover:opacity-100 font-sans truncate">
                      📍 {loc.address}
                    </p>
                  </div>

                  {/* "Arrow" Button - Only appears on hover */}
                  <div className="absolute top-6 right-6 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                    <span className="text-white text-lg">↗</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
