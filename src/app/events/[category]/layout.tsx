import SessionProvider from "@/components/SessionProvider";
import EventWrapper from "@/components/events/EventWrapper";
import { Footer, Navbar } from "@/components/home";
import { supabase } from "@/lib";
import { generateMetadata } from "@/utils/metadata";
import type { Metadata } from "next";
import { Syncopate } from "next/font/google";

const syncopate = Syncopate({ weight: ["400", "700"], subsets: ["latin"] });

export const metadata: Metadata = generateMetadata({
  title: "Events | TechTrix 2024",
  description: "TechTrix 2024's Events",
});

export default function CategoryLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: any;
}) {
  return (
    <>
      <EventWrapper
        title={params.category}
        description="Challenge the algorithms, master the machines"
      >
        {children}
      </EventWrapper>
      <SessionProvider />
    </>
  );
}
