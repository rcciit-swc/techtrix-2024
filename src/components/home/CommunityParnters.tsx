import React from "react";
import { Heading } from ".";
import { InfiniteMovingCards } from "../ui/infinite-moving-cards";
import { communityPartners } from "@/utils/constants/partners";

const CommunityParnters = () => {
  return (
    <div className="mx-auto flex flex-col justify-center items-center gap-10  w-full overflow-x-hidden">
      <div className="mx-auto flex flex-col justify-center my-5 items-center gap-10">
        <Heading text="Community Partners" />

        <InfiniteMovingCards items={communityPartners} />
      </div>
    </div>
  );
};

export default CommunityParnters;
