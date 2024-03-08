"use client";
import Image from "next/image";
import React, { useState } from "react";

const TeamCard = ({ member }: { member: any }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <>
      <div className="flex flex-col items-center gap-2 w-[300px] md:w-[350px] lg:w-[400px]">
        <Image
          src={member.image}
          alt="image"
          width={200}
          height={200}
          style={{ objectFit: "cover", objectPosition: "0 10%" }}
          className="h-72 w-72 rounded-2xl object-cover "
          onLoad={() => setLoaded(true)}
        />
        <h1 className="text-lg text-center font-bold">{member.name}</h1>
        <h1 className="text-sm text-center font-semibold">{member.role}</h1>
      </div>
    </>
  );
};

export default TeamCard;
