import type { Metadata } from "next";
import { Libre_Caslon_Text, Poppins } from "next/font/google";
import "./globals.css";


const libreCaslon = Libre_Caslon_Text({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-libre",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "STREET EATS |  A Lite Food Truck",
  description: "A dynamic food truck for all your culinary adventures.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${libreCaslon.variable} ${poppins.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
