import React from "react";
import { Heading } from "../home";
import Link from "next/link";

const teamData = [
  {
    name: "SWC",
    path: "/team/swc",
  },
  {
    name: "Tech Team",
    path: "/team/tech",
  },
  {
    name: "Management Team",
    path: "/team/management",
  },
  {
    name: "Graphics Team",
    path: "/team/graphics",
  },
   {
     name: "Sponsorship Team",
     path: "/team/sponsorship",
   },
   {
     name: "Coverage Team",
     path: "/team/coverage",
   },
  {
    name: "Coordinators",
    path: "/team/coordinators",
  },
];
const TeamTab = ({ name }: { name: string }) => {
  return (
    <div className="bg-black text-white py-2  lg:py-2 text-xs  lg:text-sm xl:text-lg px-5 md:px-10 border-2 cursor-pointer border-black hover:bg-white hover:text-black rounded-xl  font-semibold">
      {name}
    </div>
  );
};
const TeamWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col items-center mx-auto gap-5">
      <Heading text="Team: Techtrix 2024" />
      <div className="flex flex-row mt-5 items-center gap-2 w-full mx-auto justify-center md:gap-4 lg:gap-10 flex-wrap ">
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
