import EventCard from "@/components/events/EventCard";
import { Events, Heading } from "@/components/home";
import { allEvents } from "@/utils/constants/events";
import { generateMetadata } from "@/utils/metadata";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = generateMetadata({
  title: "Events | TechTrix 2024",
  description: "Explore the events of TechTrix 2024",
});
const page = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-10">
      <Heading text="Events" />
      <div className="flex flex-row items-center gap-20  flex-wrap justify-center">
        {allEvents.map((event, index) => {
          return (
            <Link key={index} href={`/events/${event.title}`}>
              <EventCard event={event} index={index} />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default page;
