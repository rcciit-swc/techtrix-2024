"use client";
import { Heading } from "@/components/home";
import { supabase, useUser } from "@/lib";
import { getRegisteredTeams } from "@/utils/functions/getRegisteredTeams";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { PuffLoader } from "react-spinners";

const Page = () => {
  const user = useUser((state) => state.user);
  const [loading, setLoading] = useState(true);
  const [coordinatingEvents, setCoordinatingEvents] = useState<any>([]);
  useEffect(() => {
    const getCoordinatingEvents = async () => {
      const { data } = await supabase.auth.getSession();
      const userRoles = await supabase
        .from("roles")
        .select()
        .match({ id: data?.session?.user?.id });

      const allEvents = await supabase
        .from("events")
        .select("*,event_categories(name)")
        .eq("fest_name", "Techtrix")
        .eq("year", 2024);
      const events = allEvents.data;

      let showAllEvents = false;
      let coordinatingEventIds: any = [];
      let conveningEventCategoryIds: any = [];

      if (userRoles.data) {
        for (const obj of userRoles.data!) {
          if (obj.role === "super_admin") {
            showAllEvents = true;
            break;
          }
          if (obj.role === "event_coordinator") {
            coordinatingEventIds.push(obj.event_id);
          } else if (obj.role === "convenor") {
            conveningEventCategoryIds.push(obj.event_category_id);
          }
        }
      }

      let filteredEvents: any = [];
      if (showAllEvents) {
        filteredEvents = events;
      } else {
        const coordinatingEvents = events!.filter((event) =>
          coordinatingEventIds.includes(event.id)
        );
        const conveningEvents = events!.filter((event) =>
          conveningEventCategoryIds.includes(event.event_category_id)
        );

        filteredEvents = [...coordinatingEvents, ...conveningEvents];
      }

      setCoordinatingEvents(filteredEvents);
      setLoading(false);
    };

    getCoordinatingEvents();
  }, [user]);

  return (
    <div className="flex flex-col mx-auto w-full justify-center items-center gap-10">
      <Heading text="Management Dashboard" />
      <div className="flex flex-row min-h-[60vh] flex-wrap items-center justify-center gap-20">
        {loading ? (
          <div className=" flex flex-col justify-center items-center">
            <PuffLoader size={24} color="#000" />{" "}
          </div>
        ) : (
          coordinatingEvents?.map((value: any, index: number) => {
            return (
              <Link href={`/coordinator/${value.id}`} key={index}>
                <div
                  className="card relative w-[300px] cursor-pointer overflow-hidden rounded-md transition-all duration-500
          ease-in-out hover:scale-110 md:h-[250px] md:w-[350px]
          "
                >
                  {!value.event_image_url ? (
                    <h1 className="pt-2 text-center text-black h-full w-full flex flex-col justify-center border border-black  font-semibold md:text-xl">
                      {value.event_name}
                    </h1>
                  ) : (
                    <>
                      <img
                        src={value.event_image_url}
                        alt={value.name}
                        className="w-full h-full"
                        height={0}
                        width={0}
                      />
                      <div className="card-body absolute bottom-[-100%] flex h-full w-full flex-col items-center justify-center bg-[#1f3d4738] px-3 backdrop-blur-[5px] duration-500">
                        <h1 className="pt-2 text-center text-white font-semibold md:text-2xl">
                          {value.event_name}
                        </h1>
                      </div>
                    </>
                  )}
                </div>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Page;
