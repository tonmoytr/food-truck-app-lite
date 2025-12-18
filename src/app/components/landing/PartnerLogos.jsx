import Container from "@/app/components/ui/Container";
import Image from "next/image";

// Mock Partners - Need logos named partner1.png, partner2.png, etc.
const partners = [
  { id: 1, name: "City Council", logo: "/assets/images/landing/partner.svg" },
  { id: 2, name: "Food Safety", logo: "/assets/images/landing/partner2.svg" },
  { id: 3, name: "Local Farms", logo: "/assets/images/landing/partner3.svg" },
  { id: 4, name: "Eco Friendly", logo: "/assets/images/landing/partner4.svg" },
  { id: 5, name: "Best Eats", logo: "/assets/images/landing/partner5.svg" },
];

export default function PartnerLogos() {
  return (
    <section className="py-12 border-t border-nature-100 bg-white">
      <Container>
        <p className="text-center text-sm font-bold tracking-wider text-nature-300 uppercase mb-8">
          Trusted By Our Partners
        </p>

        <div className="flex flex-wrap justify-center gap-8 md:gap-16 items-center opacity-70">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="relative w-24 h-12 md:w-32 md:h-16 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                width={280}
                height={100}
                className="object-contain"
                sizes="150px"
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
