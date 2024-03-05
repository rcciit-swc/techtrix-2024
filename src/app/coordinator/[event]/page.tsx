"use client";
import Table from "@/components/admin/Table";
import { Heading } from "@/components/home";
import { getRegisteredTeams } from "@/utils/functions/getRegisteredTeams";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  let eventId: any = useParams().event;

  const [registrationData, setRegistrationData] = useState<any[]>([]);

  useEffect(() => {
    const getAllEvents = async () => {
      const data = await getRegisteredTeams({
        event_id_param: eventId!,
      });
      setRegistrationData(data);
    };
    getAllEvents();
  }, [eventId]);

  return (
    <div className="w-full mx-auto min-h-[60vh] overflow-x-hidden flex flex-col items-center gap-10 ">
      <Heading text="Registered Teams" />
      <div className="overflow-x-auto px-3 w-full mx-auto">
        <Table registrationData={registrationData} />
      </div>
    </div>
  );
};

export default Page;
