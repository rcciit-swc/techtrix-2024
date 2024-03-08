import TeamCard from "@/components/team/TeamCard";
import { teams } from "@/utils/constants/teams";
import React from "react";

const page = ({ params: { team } }: { params: { team: string } }) => {
  const teamTitle = team;
  const teamData = teams.find(
    (teamItem: any) => teamItem.id.toLowerCase() === teamTitle.toLowerCase()
  );

  return (
    <div className="flex flex-col items-center gap-10 oveflow-x-hidden">
      <div className="flex mt-5 flex-col items-center  gap-5 justify-center">
        <h1 className="text-3xl font-bold">{teamData!.category}</h1>
        <div className="flex flex-row gap-10 md:gap-32 mt-5 flex-wrap justify-center">
          {teamData!.members.map((member: any, index: number) => {
            return <TeamCard member={member} key={index} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default page;
