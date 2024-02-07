import EventCard from "./home/EventCard";
import { eventcards } from "@/utils/constants/events";
import Heading from "./Heading";

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
            <EventCard event={event} index={index} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;
