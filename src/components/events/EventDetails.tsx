"use client";
// import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import React, { useEffect, useMemo, useState } from "react";
import { IoArrowBackSharp } from "react-icons/io5";
// import { getCoordinators } from "@/utils/functions/getCoordinators";
import { PuffLoader } from "react-spinners";
import RulesModal from "../admin/RulesModal";
// import Image from "next/image";
// import EventRegForm from "./EventRegForm";
import { getEventInfo } from "@/utils/functions/getEventsInfo";
import { supabase, useUser } from "@/lib";
import { login } from "@/utils/functions";
// import { Toaster, toast } from "sonner";
import { checkIfUserRegistered } from "@/utils/functions/checkIfUserRegistered";
import { TiTick } from "react-icons/ti";
import Link from "next/link";
import dynamic from "next/dynamic";

const EventRegForm = dynamic(() => import("@/components/events/EventRegForm"), {
  ssr: false,
});

const EventDetails = ({
  eventDetails,
  onCloseEvent,
}: {
  eventDetails: any;
  onCloseEvent: () => void;
}) => {
  const user = useUser((state) => state.user);
  const [registeredEvent, setRegisteredEvent] = useState(false);
  const event = eventDetails?.event_name;
  const [isOpen, setIsOpen] = useState(false);
  const [eventInfo, setEventInfo] = useState({} as any);
  const [loading, setLoading] = useState(true);
  const [eventCategory, setEventCategory] = useState<any>(null);
  useMemo(() => {
    const getInfo = async () => {
      const res = await getEventInfo(eventDetails?.id);
      if (user) {
        const ifRegistered = await checkIfUserRegistered({
          phone_param: user?.phone!,
        });
        if (ifRegistered.find((e: any) => e.event_id === eventDetails?.id)) {
          setRegisteredEvent(true);
        }
      }

      setEventInfo(res![0]);
      setLoading(false);
    };
    getInfo();
  }, [event]);

  useEffect(() => {
    const getCategory = async () => {
      const { data: category, error } = await supabase
        .from("event_categories")
        .select("name")
        .eq("id", eventDetails.event_category_id);

      setEventCategory(category![0]?.name);
    };
    getCategory();
  }, [eventDetails]);

  const { roles } = eventInfo;
  const [regOpen, setRegOpen] = useState(false);
  const onClose = () => {
    setIsOpen(false);
    setRegOpen(false);
  };

  useEffect(() => {
    if (isOpen || regOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  });

  useEffect(() => {
    const sendReferral = async () => {
      if (typeof window !== "undefined" && window.localStorage) {
        const referral = localStorage.getItem("ref");
        await supabase
          .from("users")
          .update({
            referral_code: referral!,
          })
          .eq("id", user?.id!);
      }
    };
    sendReferral();
  }, [user]);
  return (
    <motion.div className="flex flex-col items-center -mt-10 mx-auto w-full">
      {loading ? (
        <div className="mx-auto max-lg:h-screen w-[100%]">
          <PuffLoader className="w-full mx-auto" color="#36d7b7" />
        </div>
      ) : (
        <div className="bg-white pt-20 border-2 oveflow-x-hidden relative  rounded-2xl mx-auto justify-center  md:w-[90%] px-5 lg:px-10 py-14 flex flex-row items-center gap-5 lg:gap-10 flex-wrap-reverse">
          <>
            <div className="flex flex-col w-full items-start gap-5 2xl:w-1/2">
              <button
                onClick={onCloseEvent}
                className="absolute hover:bg-black hover:text-white border-2 border-black rounded-full text-xl font-semibold left-3 top-5 sm:top-10"
              >
                <IoArrowBackSharp size={40} />
              </button>
              <h1 className="text-black font-bold text-3xl">
                {eventInfo.event_name}
              </h1>

              <div dangerouslySetInnerHTML={{ __html: eventInfo.desc }}></div>
              {eventInfo.event_name ===
                "Model and Poster Presentation (Student Innovation)" && (
                <Link
                  download={true}
                  href="/downloads/Model Template.pptx"
                  className="bg-black text-white border border-black hover:bg-white hover:text-black px-3 py-2 rounded-xl text-sm font-semibold"
                >
                  View Template
                </Link>
              )}
              <h1>
                Team Capacity :{" "}
                <span className="font-semibold">
                  {eventInfo.min_team_member == eventInfo.max_team_member
                    ? eventInfo.max_team_member
                    : eventInfo.min_team_member +
                      " to " +
                      eventInfo.max_team_member}
                </span>
              </h1>
              <h1>
                Registration Fees :{" "}
                <span className="font-semibold">
                  ₹ {eventInfo.registration_fees}
                </span>{" "}
              </h1>
              <h1>
                Event Date :{" "}
                <span className="font-semibold">{eventInfo.date}</span>
              </h1>
              <h1>
                Time : <span className="font-semibold">{eventInfo.time}</span>
              </h1>
              {roles.length > 0 ? (
                roles.map((coordinator: any, index: number) => {
                  return (
                    <div
                      key={index}
                      className="flex flex-col items-start gap-2"
                    >
                      <h1 className="text-lg lg:text-sm">
                        Coordinators:{" "}
                        <span className="font-semibold text-black">
                          {coordinator?.users?.name}
                        </span>
                      </h1>
                      <a
                        href={`tel:${coordinator?.users?.phone}`}
                        className="text-lg lg:text-sm"
                      >
                        Contact:{" "}
                        <span className="font-semibold hover:text-green-500 text-black">
                          {coordinator?.users?.phone}
                        </span>
                      </a>
                    </div>
                  );
                })
              ) : (
                <h1 className="text-red-600 text-center font-semibold">
                  No Coordinators added yet !
                </h1>
              )}

              <button
                onClick={() => setIsOpen(true)}
                className="flex flex-row items-center font-semibold border-2 border-black px-5 py-2 hover:bg-white hover:text-black rounded-xl bg-black text-white gap-2 text-xl "
              >
                Rules
              </button>
            </div>

            <div className="flex flex-col items-center gap-10">
              {eventInfo?.event_image_url && (
                <img
                  src={eventInfo.event_image_url}
                  alt=""
                  className="w-96 h-96 object-cover rounded-2xl"
                  width={0}
                  height={0}
                />
              )}
              {!registeredEvent! && eventInfo! && eventInfo!.is_open && (
                <button
                  disabled={!eventInfo.is_open}
                  onClick={async () => {
                    if (!user) {
                      login();
                    }
                    setRegOpen(true);
                  }}
                  className="flex flex-row  items-center font-semibold border-2 border-black px-5 py-2 hover:bg-black hover:text-white rounded-xl bg-white text-black gap-2 text-xl "
                >
                  Register Now
                </button>
              )}
              {!eventInfo!.is_open && (
                <button
                  disabled={!eventInfo.is_open}
                  className="flex flex-row items-center cursor-pointer font-semibold border-2 border-red-500 px-5 py-2 hover:text-red-500 rounded-xl bg-white text-red-500 gap-2 text-xl "
                >
                  Registration Closed
                </button>
              )}

              {registeredEvent! && (
                <Link href={"/dashboard"}>
                  <h1 className="text-green-600 flex flex-row items-center gap-2 border border-green-600 rounded-xl px-5 py-2 font-semibold">
                    Already Registered
                    <TiTick size={24} />
                  </h1>
                </Link>
              )}
            </div>
          </>
        </div>
      )}
      <RulesModal isOpen={isOpen} onClose={onClose} rules={eventInfo.rules} />
      <EventRegForm
        isOpen={regOpen}
        onClose={onClose}
        eventDetails={eventInfo}
        category={eventCategory}
      />
    </motion.div>
  );
};

export default EventDetails;
