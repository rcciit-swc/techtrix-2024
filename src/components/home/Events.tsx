import { eventcards } from "@/utils/constants/events";
import EventCard from "./EventCard";

import Heading from "./Heading";
import Link from "next/link";

const Events = () => {
  return (
    <div className="w-[80%] mx-auto gap-6  flex-col flex justify-center items-center">
      <Heading text="Events" />
      <div className="grid grid-cols-1  lg:grid-cols-[1.5fr,1fr,1fr] gap-3 md:gap-2">
        {eventcards.map((event, index) => (
          <div
            key={index}
            className={`${
              index == 0 ? " row-span-1 md:row-span-2" : "row-span-1"
            } `}
          >
            <Link href={index==0 ? `/events` :`/events/${event.pathName}` }
            ><EventCard event={event} index={index} /></Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;
