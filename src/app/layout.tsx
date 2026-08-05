import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shubham Kumar - Indian Bird Guide | Himalayan Speciality Birding Tours",
  description: "Book customized birdwatching and photography tours in India with specialist guide Shubham Kumar. Explore premium birding hotspots in Sattal, Chopta, and Manglajodi.",
  keywords: ["birding tours india", "himalayan bird guide", "shubham kumar birds guide", "sattal birding", "chopta birding tours", "india birdwatching", "foreigner birding tours india"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#fbfbf9]">
        <Navbar />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
