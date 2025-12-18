import Container from "@/app/components/ui/Container";
import { getAllTrucks } from "@/lib/api";
import TruckSlider from "./TruckSlider";

export default async function TruckCarousel() {
  // Fetch data 
  const trucks = await getAllTrucks();

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

        {/* Pass the data to the Client Component */}
        <TruckSlider trucks={trucks} />
      </Container>
    </section>
  );
}
