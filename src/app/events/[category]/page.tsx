"use client";
import EventWrapper from "@/components/events/EventWrapper";
import { supabase } from "@/lib";
import { useEventbyCategory } from "@/lib/store/event";
import { CategoryState } from "@/types/events";
import { getCategoryEvents } from "@/utils/functions/getCategoryEvents";
import { getCoordinators } from "@/utils/functions/getCoordinators";
import { useParams, useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";
import { PuffLoader } from "react-spinners";

const EventCard = ({ event }: { event: any }) => {
  const router = useRouter();
  const [coordinators, setCoordinators] = useState<any>([]);
  useMemo(async () => {
    const res = await getCoordinators(event.id!);
    setCoordinators(res!);
  }, [event]);
  return (
    <div
      // onClick={()=>router.push(`/events/${event?.category_name}/${event?.event_name}`)}
      className="flex flex-col items-start gap-5 p-5 md:py-10 md:px-10 w-full h-auto  lg:w-[550px] justify-center lg:h-[500px] border-4 border-white rounded-2xl"
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
      {/* {coordinators.length > 0 ? (
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
      )} */}
      {/* <h1 className='font-semibold text-lg cursor-pointer'>Tap to view more {"-->"}</h1> */}
      <h1 className="font-semibold text-xl cursor-pointer text-center w-full">
        COMING SOON
      </h1>
    </div>
  );
};

const page = () => {
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
  eventsbyCategory = useEventbyCategory((state) => state.events!);
  return (
    <>
      {loading ? (
        <div className="mx-auto h-screen">
          <PuffLoader className="w-full mx-auto" color="#36d7b7" />
        </div>
      ) : (
        <div className="flex flex-row items-center justify-evenly gap-10 w-full mx-auto md:px-12 flex-wrap">
          {eventsbyCategory?.length === 0 ? (
            <h1 className="text-white font-semibold text-center text-xl w-full">
              No events announced yet !
            </h1>
          ) : (
            eventsbyCategory?.map((event, index) => {
              return (
                <>
                  <EventCard key={index} event={event} />
                </>
              );
            })
          )}
        </div>
      )}
    </>
  );
};

export default page;
