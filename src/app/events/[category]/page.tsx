"use client";
import { AnimatePresence, motion } from "framer-motion";
import EventDetails from "@/components/events/EventDetails";
import EventWrapper from "@/components/events/EventWrapper";
import { supabase } from "@/lib";
import { useEventbyCategory } from "@/lib/store/event";
import { CategoryState } from "@/types/events";
import { getCategoryEvents } from "@/utils/functions/getCategoryEvents";
import { getCoordinators } from "@/utils/functions/getCoordinators";
import { useParams, useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";
import { PuffLoader } from "react-spinners";

const EventCard = ({
  event,
  onClick,
}: {
  event: any;
  onClick: (e: any) => void;
}) => {
  const router = useRouter();
  const [coordinators, setCoordinators] = useState<any>([]);
  useMemo(async () => {
    const res = await getCoordinators(event.id!);
    setCoordinators(res!);
  }, [event]);
  return (
    <motion.div
      initial={{ scale: 1 }} // Set initial scale to 1 (normal size)
      whileHover={{ scale: 1.05 }}
      // Increase scale slightly on hover
      onClick={onClick}
      className="flex flex-col cursor-pointer items-start gap-5 p-5 md:py-10 md:px-10 w-[95%] h-auto  lg:w-[550px] justify-center lg:h-[500px] border-4 border-white rounded-2xl"
    >
      <div className="w-full md:w-[100%]">
        <h1 className="text-white font-semibold text-xl md:text-2xl min-[1024px]:text-3xl">
          {event?.event_name!}
        </h1>
        <div
          className="font-semibold"
          dangerouslySetInnerHTML={{ __html: event?.desc }}
        ></div>
      </div>
      {coordinators.length > 0 ? (
        coordinators.map((coordinator: any, index: number) => {
          return (
            <div key={index} className="flex flex-col items-start gap-2">
              <h1 className="text-lg lg:text-xl">
                Coordinators:{" "}
                <span className="font-semibold text-black">
                  {coordinator?.users?.name}
                </span>
              </h1>
              <h1 className="text-lg lg:text-xl">
                Contact:{" "}
                <span className="font-semibold text-black">
                  {coordinator?.users?.phone}
                </span>
              </h1>
            </div>
          );
        })
      ) : (
        <h1 className="text-red-600 font-semibold">
          No Coordinators added yet !
        </h1>
      )}
      <h1 className="font-semibold text-lg cursor-pointer">
        Tap to view more {"-->"}
      </h1>
      {/* <h1 className="font-semibold text-xl cursor-pointer text-center w-full">
        COMING SOON
      </h1> */}
    </motion.div>
  );
};

const page = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const setEventbyCategory = useEventbyCategory((state) => state.setEvents);
  var eventsbyCategory: CategoryState[] = [];
  const [loading, setLoading] = useState<boolean>(true);
  const event = useParams();
  useMemo(() => {
    const getEvents = async () => {
      const res = await getCategoryEvents(event?.category);
      setEventbyCategory(res!);
      setLoading(false);
    };
    getEvents();
  }, [event]);
  const eventCardRef = React.useRef(null);
  const handleEventCardClick = (event: any, eventCardRef: any) => {
    setSelectedEvent(event);
  };
  eventsbyCategory = useEventbyCategory((state) => state.events!);
  return (
    <>
      {loading ? (
        <div className="mx-auto h-screen">
          <PuffLoader className="w-full mx-auto" color="#36d7b7" />
        </div>
      ) : (
        <div className="w-full">
          <div className="flex flex-row items-center  justify-evenly gap-10 w-full mx-auto md:px-12 flex-wrap">
            {eventsbyCategory?.length === 0 ? (
              <h1 className="text-white font-semibold text-center text-xl w-full">
                No events announced yet !
              </h1>
            ) : (
              eventsbyCategory?.map((event, index) => {
                return (
                  <div key={index}>
                    {!selectedEvent && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        transition={{ ease: "linear", delay: 0 }}
                        ref={eventCardRef}
                      >
                        <EventCard
                          event={event}
                          onClick={() =>
                            handleEventCardClick(event, eventCardRef)
                          }
                        />
                      </motion.div>
                    )}
                  </div>
                );
              })
            )}

            <AnimatePresence>
              {selectedEvent && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ ease: "linear", delay: 0.2 }}
                >
                  <EventDetails
                    eventDetails={selectedEvent}
                    onCloseEvent={() => setSelectedEvent(null)}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}
    </>
  );
};

export default page;
