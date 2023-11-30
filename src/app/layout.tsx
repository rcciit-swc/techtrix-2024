import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Metadata } from "next";
import { Syncopate } from "next/font/google";
import "./globals.css";

const syncopate = Syncopate({ weight: ["400", "700"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Techtrix-2024",
  description: "Techtrix-2024",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={syncopate.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
