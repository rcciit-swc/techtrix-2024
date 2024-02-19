import type { Metadata } from "next";
import { Syncopate } from "next/font/google";
import "./globals.css";
import SessionProvider from "@/components/SessionProvider";
import { Footer, Navbar } from "@/components/home";
import { generateMetadata } from "@/utils/metadata";
import SmoothScroll from "@/components/SmoothScroll";

const syncopate = Syncopate({ weight: ["400", "700"], subsets: ["latin"] });

export const metadata: Metadata = generateMetadata();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={syncopate.className}>
     
        <Navbar />
        <SmoothScroll>
        {children}
        </SmoothScroll>
        <Footer />
        <SessionProvider />
      
      </body>
    </html>
  );
}
