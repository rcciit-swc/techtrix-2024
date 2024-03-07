"use client";
import Table from "@/components/admin/Table";
import { Heading } from "@/components/home";
import { getRegisteredTeams } from "@/utils/functions/getRegisteredTeams";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { PuffLoader } from "react-spinners";

const Page = () => {
  let eventId: any = useParams().event;
  const [loading, setLoading] = useState(true);

  const [registrationData, setRegistrationData] = useState<any[]>([]);

  useEffect(() => {
    const getAllEvents = async () => {
      const data = await getRegisteredTeams({
        event_id_param: eventId!,
      });
      setRegistrationData(data);

      setLoading(false);
    };
    getAllEvents();
  }, [eventId]);

  return (
    <div className="w-full mx-auto min-h-[60vh] overflow-x-hidden flex flex-col items-center gap-10 ">
      <Heading text="Registered Teams" />
      {loading ? (
        <div className="min-h-[60vh] flex flex-col justify-center">
          <PuffLoader color={"#000"} size={100} />
        </div>
      ) : (
        <div className="overflow-x-auto px-3 w-full mx-auto">
          <Table registrationData={registrationData} />
        </div>
      )}
    </div>
  );
};

export default Page;
