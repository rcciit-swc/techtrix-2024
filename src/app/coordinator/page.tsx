"use client";
import { Heading } from "@/components/home";
import { supabase, useUser } from "@/lib";
import { getRegisteredTeams } from "@/utils/functions/getRegisteredTeams";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Page = () => {
  const user = useUser((state) => state.user);
  const [registrationData, setRegistrationData] = useState<any>([]);
  const [coordinatingEvents, setCoordinatingEvents] = useState<any>([]);
  useEffect(() => {
    const getCoordinatingEvents = async () => {
      const userRoles = await supabase
        .from("roles")
        .select("*")
        .eq("id", user?.id!);

      const allEvents = await supabase
        .from("events")
        .select("*,event_categories(name)")
        .eq("fest_name", "Techtrix")
        .eq("year", 2024);
      const events = allEvents.data;

      if (userRoles.data?.[0].role === "super_admin") {
        setCoordinatingEvents(events);
      } else if (userRoles.data?.[0].role === "event_coordinator") {
        const coordinatingEventIds = userRoles.data.map(
          (role) => role.event_id
        );
        const coordinatingEvents = events!.filter((event: any) =>
          coordinatingEventIds.includes(event.id)
        );
        setCoordinatingEvents(coordinatingEvents);
      }
    };

    getCoordinatingEvents();
  }, [user]);

  return (
    <div className="flex flex-col mx-auto w-full justify-center items-center gap-10">
      <Heading text="Coordinator Dashboard" />
      <div className="flex flex-row flex-wrap items-center justify-center gap-20">
        {coordinatingEvents?.map((value: any, index: number) => {
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
        })}
      </div>
    </div>
  );
};

export default Page;
