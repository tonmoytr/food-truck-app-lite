import Button from "@/app/components/ui/Button";
import Container from "@/app/components/ui/Container";
import Image from "next/image";
// import HeroImage from "/assets/images/landing/hero.png";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-16 lg:pt-48 lg:pb-32 overflow-hidden bg-nature-100/30">
      <Container className="relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Text Content */}
          <div className="w-full lg:w-1/2 text-center lg:text-left space-y-6">
            <div className="inline-block px-3 py-1 bg-nature-200/20 text-nature-500 rounded-full text-xs font-bold tracking-wide uppercase mb-2 border border-nature-200">
              City&apos;s Best Flavors
            </div>

            <h1 className="font-serif text-5xl lg:text-7xl leading-[1.1] text-nature-500">
              Gourmet Food, <br />
              <span className="italic text-nature-300">Curbside.</span>
            </h1>

            <p className="font-sans text-lg text-nature-400 max-w-lg mx-auto lg:mx-0 leading-relaxed opacity-90">
              Track your favorite food trucks, discover new pop-up locations,
              and view live menus in real-time across the city.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <Button className="bg-nature-400 hover:bg-nature-300 text-white shadow-lg shadow-nature-300/20">
                Find a Truck
              </Button>
              <Button
                variant="outline"
                className="border-nature-300 text-nature-500 hover:bg-nature-100"
              >
                View Schedule
              </Button>
            </div>

            {/* Social Proof */}
            {/* Social Proof with Next/Image */}
            <div className="pt-8 flex items-center justify-center lg:justify-start gap-4 text-sm text-nature-400 font-sans">
              <div className="flex -space-x-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 relative rounded-full border-2 border-white overflow-hidden"
                  >
                    <Image
                      src={`/assets/images/landing/user${i}.jpg`} 
                      alt={`Foodie User ${i}`}
                      fill
                      sizes="32px"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
              <p>Loved by 5k+ foodies</p>
            </div>
          </div>

          {/* Image Content */}
          <div className="w-full lg:w-1/2 relative">
            <div className="relative aspect-square md:aspect-4/3 rounded-2xl overflow-hidden shadow-2xl shadow-nature-400/10">
              <Image
                src="/assets/images/landing/hero.png"
                alt="Delicious street food served from a truck"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />

              {/* Floating Badge */}
              <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-lg max-w-200px border-l-4 border-nature-300">
                <p className="font-serif text-lg leading-none mb-1 text-nature-500">
                  Taco Fest
                </p>
                <p className="text-xs text-nature-400 font-sans">
                  Today at Downtown Park
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
