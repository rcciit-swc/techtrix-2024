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
import { MdLocalOffer } from "react-icons/md";
import ComboRegForm from "@/components/events/ComboRegForm";

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
    <div
      style={{
        backgroundImage: `radial-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.8)), url(${event.event_image_url})`,
        backgroundSize: "cover",
        backdropFilter: "blur(10px)",
      }}
      className="relative w-full h-full flex flex-col justify-center items-center gap-5 rounded-2xl"
    >
      <motion.div
        initial={{ scale: 1 }}
        onClick={onClick}
        className="card cursor-pointer gap-5 p-5 md:py-10 md:px-10 h-auto lg:w-[450px]
      flex justify-center flex-col lg:h-[650px] border-4 border-white rounded-2xl"
      >
        {/* <div className="card absolute top-0 left-0 h-full w-full z-10 flex justify-center flex-col mx-auto items-start gap-5"> */}
        <div className="  w-full md:w-[100%]">
          <h1 className="text-white font-semibold text-xl md:text-2xl min-[1024px]:text-3xl">
            {event?.event_name!}
          </h1>
          <div className="text-white text-xs mt-5">{parse(event?.desc!)}</div>
        </div>
        <h1 className="-mb-3 font-semibold text-xl text-white">
          Coordinators :
        </h1>
        {coordinators.length > 0 ? (
          coordinators.map((coordinator: any, index: number) => {
            return (
              <div
                key={index}
                className="flex flex-col items-start gap-2 text-sm text-white"
              >
                <h1>
                  <span className="font-semibold">
                    {coordinator?.users?.name}
                  </span>
                </h1>
                <h1>
                  <span className="font-medium">
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
        <h1 className="font-semibold text-lg cursor-pointer text-white">
          Tap to view more {"-->"}
        </h1>
        {/* <h1 className="font-semibold text-xl cursor-pointer text-center w-full">
        COMING SOON
      </h1> */}
        {/* </div> */}
      </motion.div>
    </div>
  );
};

const comboEvents = [
  {
    category: "Robotics",
    events: ["Final Kick", "Robo War (15 KG)", "ROAD RASH"],
  },
];

const Page = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [comboRegOpen, setComboRegOpen] = useState(false);
  const setEventbyCategory = useEventbyCategory((state) => state.setEvents);
  var eventsbyCategory: CategoryState[] = [];
  const [loading, setLoading] = useState<boolean>(true);
  const param: any = useParams();
  const event = decodeURIComponent(param?.category!);
  let isAllOpen: boolean = true;
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
  let comboEventCategory: any;
  eventsbyCategory = useEventbyCategory((state) => state.events!);
  const comboEventDetails: any[] = useMemo(() => {
    let comboEventsArr: any[] = [];
    comboEventCategory =
      comboEvents &&
      comboEvents.find((comboEvent) => comboEvent.category === event);
    console.log(comboEventCategory);
    if (comboEventCategory) {
      comboEventsArr = comboEventCategory.events.map((event: any) => {
        return (
          eventsbyCategory &&
          eventsbyCategory.find(
            (eventCategory) => eventCategory.event_name === event
          )
        );
      });
    }
    return comboEventsArr;
  }, [event, eventsbyCategory]);

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
              <>
                {comboEvents.find(
                  (comboEvent: any) => comboEvent.category === event
                ) &&
                  isAllOpen && (
                    <button
                      onClick={() => setComboRegOpen(true)}
                      className="xl:absolute text-xs xl:text-sm flex flex-row items-center gap-5 top-0 right-0 border border-black bg-black text-white rounded-xl px-10 py-2 font-semibold hover:bg-white hover:text-black"
                    >
                      Combo Registration Offer
                      <MdLocalOffer size={20} />
                    </button>
                  )}
                {eventsbyCategory?.map((event, index) => {
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
                })}
              </>
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
      <ComboRegForm
        events={comboEventDetails}
        isOpen={comboRegOpen}
        onClose={() => setComboRegOpen(false)}
      />
    </>
  );
};

export default Page;
