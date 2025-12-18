import LocationCards from "@/app/components/landing/LocationCards";
import ContactForm from "./components/landing/ContactForm";
import Hero from "./components/landing/Hero";
import PartnerLogos from "./components/landing/PartnerLogos";
import TruckCarousel from "./components/landing/TruckCarousel";
import Header from "./components/layout/Header";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Landing Page Sections */}
      <Hero />
      <LocationCards />
      <PartnerLogos />
      <TruckCarousel />
      <ContactForm />
    </main>
  );
}
