import SessionProvider from "@/components/SessionProvider";
import EventWrapper from "@/components/events/EventWrapper";
import { Footer, Navbar } from "@/components/home";
import { supabase } from "@/lib";
import { allEvents } from "@/utils/constants/events";
import { generateMetadata } from "@/utils/metadata";
import type { Metadata } from "next";
import { Syncopate } from "next/font/google";

const syncopate = Syncopate({ weight: ["400", "700"], subsets: ["latin"] });

interface Params {
  params: {
    category: string;
  };
}
// export function dynamicMetadata({ params: { category } }: Params): Metadata {
//   const categoryTitle = decodeURIComponent(category);
//   const categoryDetails = allEvents.find(
//     (event) => event.title === categoryTitle
//   );
//   return {
//     title: categoryTitle,
//     description: categoryDetails?.punchLine,
//   };
// }

export const metadata: Metadata = generateMetadata({
  title: "Events | TechTrix 2024",
  description: "RCCIIT's Team for TechTrix 2024",
});
export default function CategoryLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: any;
}) {
  const categoryTitle = decodeURIComponent(params.category);
  const categoryDetails = allEvents.find(
    (event) => event.pathName === categoryTitle
  );
  return (
    <>
      <EventWrapper
        title={categoryTitle}
        description={categoryDetails?.punchLine!}
      >
        {children}
      </EventWrapper>
      <SessionProvider />
    </>
  );
}
