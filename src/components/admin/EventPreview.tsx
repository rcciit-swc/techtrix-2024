import React from "react";
import EventPreviewCard from "./EventPreviewCard";

const EventPreview = ({ events }: { events: any }) => {
  return (
    <div className="flex flex-col w-[90%] mt-5 items-center mx-auto gap-10 md:w-[80%]">
      {events.length > 0 ? (
        events.map((event: any, index: number) => {
          return <EventPreviewCard key={index} event={event} />;
        })
      ) : (
        <h1 className="text-red-600 font-semibold text-xl my-10">
          No Events has been added yet !
        </h1>
      )}
    </div>
  );
};

export default EventPreview;
