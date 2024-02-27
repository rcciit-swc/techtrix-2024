"use client";
import { Heading } from "@/components/home";
import { supabase, useUser } from "@/lib";
import { getRegbyUser } from "@/utils/functions/getRegbyUser";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { PuffLoader } from "react-spinners";

const EventRegCard = ({ teams }: { teams: any }) => {
  const [verified, setVerified] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [event, setEvent] = useState<any>("");
  const [category, setCategory] = useState<any | null | undefined>("");
  const [members, setMembers] = useState<any>([]);
  useEffect(() => {
    const getEventName = async () => {
      const { data, error } = await supabase
        .from("events")
        .select("event_name,event_categories(name)")
        .eq("id", teams.event_id);
      setEvent(data![0].event_name);

      setCategory(data![0]?.event_categories!);
      setMembers(teams.members);
      teams?.transaction_verified ? setVerified(true) : setVerified(false);
    };
    getEventName();
  }, [teams]);

  return (
    <>
      <div className="bg-white p-12 w-[90%] md:w-[60%] xl:w-auto 2xl:h-[30vh]  gap-5 font-semibold flex flex-col justify-around items-center text-sm rounded-xl">
        <div className="flex flex-row items-center gap-2 flex-wrap">
          <h1>Event :</h1> <span>{event!}</span>
        </div>
        <div className="flex flex-row text-center justify-center items-center gap-2 flex-wrap">
          <h1>Category :</h1> <span>{category.name!}</span>
        </div>
        <div className="flex flex-row items-center justify-center gap-2 flex-wrap">
          <h1>{members! && members?.length > 1 ? "Team Name" : "Name"} :</h1>{" "}
          <span>{teams.team_name}</span>
        </div>
        <div className="flex flex-row items-center justify-center gap-2 flex-wrap">
          <h1>
            {members! && members?.length > 1 ? "Team Lead Phone" : "Phone"}:
          </h1>{" "}
          <span>{teams.team_lead_phone}</span>
        </div>
        {members! && members?.length > 1 && (
          <button
            onClick={() => setIsOpen(true)}
            className="bg-black text-white border border-black rounded-xl px-3 hover:bg-white hover:text-black py-1 "
          >
            View Members
          </button>
        )}
        {verified! ? (
          <h1
            className="font-semibold bg-green-300
         px-3 py-1 rounded-xl"
          >
            Verified
          </h1>
        ) : (
          <h1
            className="font-semibold bg-red-300
         px-3 py-1 rounded-xl"
          >
            Not Verified
          </h1>
        )}
      </div>
      <MemberModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        members={teams.members}
      />
    </>
  );
};

const MemberModal = ({
  isOpen,
  onClose,
  members,
}: {
  isOpen: boolean;
  onClose: () => void;
  members: any;
}) => {
  return (
    <>
      {isOpen && (
        <div className="fixed  inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[50]">
          <div
            className={`bg-gray-100 p-4 rounded-lg h-auto
             w-[90%] flex flex-col items-start md:w-[25%] `}
          >
            <div className="w-full flex flex-row mb-2 items-center justify-between">
              <h2 className="text-lg font-semibold">Members</h2>

              <h2
                onClick={onClose}
                className="bg-black md:py-2 md:px-3 px-2 py-1 hover:bg-white hover:text-black border-2 border-black  text-white text-sm font-semibold rounded-full cursor-pointer"
              >
                X
              </h2>
            </div>

            <div className="h-full overflow-y-scroll flex flex-col items-center gap-2 my-1 py-2 px-1 w-full text-center">
              {members.map((member: any) => {
                return (
                  <div className="flex flex-col md:flex-row bg-green-200 flex-wrap justify-around font-semibold w-full">
                    <h1>{member.name}</h1>
                    <a
                      className="text-red-500 hover:cursor-pointer hover:opacity-70"
                      href={`tel:${member.phone}`}
                    >
                      {member.phone}
                    </a>
                    <hr className="w-full bg-black text-black font-semibold" />
                  </div>
                );
              })}
            </div>
            <button
              className="border-2 mt-3 border-black px-5 py-1 rounded-full font-semibold bg-black text-white hover:bg-white hover:text-black"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

const page = () => {
  const [teamData, setTeamData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const user = useUser((state) => state.user);
  useEffect(() => {
    const getData = async () => {
      const data = await getRegbyUser(user);
      setTeamData(data);
      setLoading(false);
    };
    getData();
  }, [user]);
  return (
    <div className="w-full overflow-x-hidden mx-auto flex flex-col items-center gap-10 ">
      <Heading text="Dashboard" />
      <div className="border relative md:border-slate-700 flex flex-col items-center justify-center p-5 md:p-10 gap-5 flex-wrap bg-indigo-50 w-full rounded-xl md:w-[70%]">
        <h1 className="font-semibold text-xl">Registered Events</h1>

        <div className="flex flex-row flex-wrap items-center justify-center gap-10">
          {loading ? (
            <PuffLoader
              color={"#000"}
              loading={loading}
              size={50}
              className="h-screen"
            />
          ) : teamData! && teamData!.length > 0 ? (
            teamData!.map((teams: any, index: number) => {
              return <EventRegCard teams={teams} key={index} />;
            })
          ) : (
            <div className="text-2xl font-semibold h-[50vh] my-auto justify-center items-center flex flex-col gap-5">
              <h1>No Registrations</h1>
              <Link href={"/events"}>
                <button className="bg-black text-lg text-white rounded-xl px-3 py-1 hover:bg-white border border-black hover:text-black">Register Now</button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
