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
  title: "STREET EATS | A Lite Food Truck",
  description: "A dynamic food truck for all your culinary adventures.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // FIX: Inject variables here so they are globally available
    <html lang="en" className={`${libreCaslon.variable} ${poppins.variable}`}>
      {/* Now "font-sans" works because the variable exists in the parent scope.
         We keep "font-sans" here to force the body to use it.
      */}
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}

// import type { Metadata } from "next";
// import { Libre_Caslon_Text, Poppins } from "next/font/google";
// import "./globals.css";

// const libreCaslon = Libre_Caslon_Text({
//   subsets: ["latin"],
//   weight: ["400", "700"],
//   variable: "--font-libre",
// });

// const poppins = Poppins({
//   subsets: ["latin"],
//   weight: ["300", "400", "600"],
//   variable: "--font-poppins",
// });

// export const metadata: Metadata = {
//   title: "STREET EATS |  A Lite Food Truck",
//   description: "A dynamic food truck for all your culinary adventures.",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{ children: React.ReactNode }>) {
//   return (
//     <html lang="en">
//       <body
//         className={`${libreCaslon.variable} ${poppins.variable} antialiased`}
//       >
//         {children}
//       </body>
//     </html>
//   );
// }
