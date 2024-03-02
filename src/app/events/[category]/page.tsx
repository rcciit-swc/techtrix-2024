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
import parse from "html-react-parser";

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
      style={{
        backgroundImage: `url(${event?.event_image_url})`,
        backgroundPosition: "center",
        backgroundSize: "contain",
        backdropFilter: "blur(10px)",
      }}
      initial={{ scale: 1 }}
      onClick={onClick}
      className="relative z-0  cursor-pointer mx-auto gap-5 p-5 md:py-10 md:px-10 w-[95%] h-auto  lg:w-[450px]  lg:h-[600px] border-4 border-white rounded-2xl"
    >
      <div className="card absolute top-0 left-0 h-full w-full z-10 flex justify-center flex-col mx-auto items-start gap-5">
        <div className="  w-full md:w-[100%]">
          <h1 className="text-black font-semibold text-xl md:text-2xl min-[1024px]:text-3xl">
            {event?.event_name!}
          </h1>
          <div className="text-black text-xs mt-5">{parse(event?.desc!)}</div>
        </div>
        <h1 className="-mb-3 font-semibold">Coordinators :</h1>
        {coordinators.length > 0 ? (
          coordinators.map((coordinator: any, index: number) => {
            return (
              <div
                key={index}
                className="flex flex-col items-start gap-2 text-sm"
              >
                <h1>
                  <span className="font-semibold text-black ">
                    {coordinator?.users?.name}
                  </span>
                </h1>
                <h1>
                  <span className="font-semibold text-black ">
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
      </div>
    </motion.div>
  );
};

const Page = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const setEventbyCategory = useEventbyCategory((state) => state.setEvents);
  var eventsbyCategory: CategoryState[] = [];
  const [loading, setLoading] = useState<boolean>(true);
  const param: any = useParams();
  const event = decodeURIComponent(param?.category!);
  useMemo(() => {
    const getEvents = async () => {
      const res = await getCategoryEvents(event!);
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

export default Page;
