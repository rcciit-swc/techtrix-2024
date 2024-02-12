import SessionProvider from "@/components/SessionProvider";
import EventWrapper from "@/components/events/EventWrapper";
import { Footer, Navbar } from "@/components/home";
import type { Metadata } from "next";
import { Syncopate } from "next/font/google";


const syncopate = Syncopate({ weight: ["400", "700"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Techtrix-2024",
  description: "Techtrix-2024",
};

export default function CategoryLayout({
  children,
  params
}: {
  children: React.ReactNode;
    params: any;
}) {
  return (
    <>
      <EventWrapper title={params.category} description="Hi">
        {children}
      </EventWrapper>
      <SessionProvider />
    </>
  );
}
