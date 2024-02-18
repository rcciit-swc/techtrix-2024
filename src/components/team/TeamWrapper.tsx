import React from "react";
import { Heading } from "../home";
import Link from "next/link";

const teamData = [
  {
    name: "SWC",
    path: "/team",
  },
  {
    name: "Tech Team",
    path: "/team",
  },
  {
    name: "Graphics Team",
    path: "/team",
  },
  {
    name: "Sponsorship Team",
    path: "/team",
  },
  {
    name: "Coverage Team",
    path: "/team",
  },
  {
    name: "Coordinators",
    path: "/team",
  },
];
const TeamTab = ({ name }: { name: string }) => {
  return (
    <div className="bg-black text-white py-2 md:py-3 text-xs md:text-lg px-5 md:px-16 border-2 cursor-pointer border-black hover:bg-white hover:text-black rounded-xl  font-semibold">
      {name}
    </div>
  );
};
const TeamWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col items-center mx-auto gap-5">
      <Heading text="Team: Techtrix 2024" />
      <div className="flex flex-row items-center gap-2 w-full mx-auto justify-center md:gap-10 flex-wrap ">
        {teamData.map((team, index) => {
          return (
            <Link key={index} href={team.path}>
              <TeamTab name={team.name} />
            </Link>
          );
        })}
      </div>
        <div>{children}</div>
    </div>
  );
};

export default TeamWrapper;
