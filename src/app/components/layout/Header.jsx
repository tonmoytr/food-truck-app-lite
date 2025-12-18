import Button from "@/app/components/ui/Button";
import Container from "@/app/components/ui/Container";
import Link from "next/link";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const navLinks = [
    { name: "Locations", href: "#locations" },
    { name: "Our Trucks", href: "#trucks" },
  ];

  return (
    <header className="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-nature-100">
      <Container>
        <div className="flex justify-between items-center h-20">
          {/* Logo - Static Server HTML */}
          <Link
            href="/"
            className="font-serif text-2xl font-bold tracking-tighter text-nature-500"
          >
            STREET<span className="text-nature-300">EATS</span>
          </Link>

          {/* Desktop Nav - Static Server HTML */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="font-sans text-sm font-medium text-nature-500 hover:text-nature-300 transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <Button className="py-2 px-5 text-sm bg-nature-400 hover:bg-nature-300 text-white">
              Book a Truck
            </Button>
          </nav>

          {/* Mobile Menu - The "Client Island" */}
          <MobileMenu navLinks={navLinks} />
        </div>
      </Container>
    </header>
  );
}
