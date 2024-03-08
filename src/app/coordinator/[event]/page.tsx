"use client";
import FormElement from "@/components/admin/FormElement";
import Table from "@/components/admin/Table";
import { Heading } from "@/components/home";
import { getRegisteredTeams } from "@/utils/functions/getRegisteredTeams";
import { getRegsByEvent } from "@/utils/functions/getRegsByEvent";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { PuffLoader } from "react-spinners";

const Page = () => {
  let eventId: any = useParams().event;
  const [inputs, setInputs] = useState({
    teamName: "",
    name: "",
    teamLeadPhone: "",
    transactionId: "",
    membersPhone: "",
    createdAt: "",
  });
  const [loading, setLoading] = useState(true);
  const [filteredData, setFilteredData] = useState<any>([]);
  const [registrationData, setRegistrationData] = useState<any[]>([]);

  useEffect(() => {
    const getAllEvents = async () => {
      const data = await getRegsByEvent(eventId);
      setRegistrationData(data);
      setLoading(false);
    };
    getAllEvents();
  }, [eventId]);

  useEffect(() => {
    const filteredData = registrationData.filter(
      (registration: any) =>
        registration.team_lead_phone.includes(inputs.teamLeadPhone) &&
        registration.transaction_id
          .toLowerCase()
          .includes(inputs.transactionId.toLowerCase()) &&
        registration.team_name
          .toLowerCase()
          .includes(inputs.teamName.toLowerCase()) &&
        registration.team_lead_name
          .toLowerCase()
          .includes(inputs.name.toLowerCase()) &&
        new Date(registration.created_at)
          .toLocaleDateString("en-US", options)
          .includes(inputs.createdAt) &&
        registration.team_members.some((member: any) =>
          member.phone.includes(inputs.membersPhone)
        )
    );
    setFilteredData(filteredData);
  }, [inputs, registrationData]);

  const options: any = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
  };
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | any>
  ) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };
  return (
    <div className="w-full mx-auto min-h-[60vh] overflow-x-hidden flex flex-col items-center gap-10 ">
      <Heading text="Registered Teams" />
      <div className="flex flex-row items-center gap-5 w-[90%] md:w-full justify-center  flex-wrap">
        <FormElement
          name="Team Name"
          value={inputs.teamName}
          type="text"
          id="teamName"
          onChange={handleInputChange}
          width="1/3"
        />

        <FormElement
          name="Name"
          value={inputs.name}
          type="text"
          id="name"
          onChange={handleInputChange}
          width="1/3"
        />
        <FormElement
          name="Team Lead Phone"
          value={inputs.teamLeadPhone}
          type="text"
          id="teamLeadPhone"
          onChange={handleInputChange}
          width="1/3"
        />
        <FormElement
          name="Transaction ID"
          value={inputs.transactionId}
          type="text"
          id="transactionId"
          onChange={handleInputChange}
          width="1/3"
        />
        <FormElement
          name="Member Phone"
          value={inputs.membersPhone}
          type="text"
          id="membersPhone"
          onChange={handleInputChange}
          width="1/3"
        />
        <FormElement
          name="Created At"
          value={inputs.createdAt}
          type="text"
          id="createdAt"
          onChange={handleInputChange}
          width="1/3"
        />
      </div>
      {loading ? (
        <div className="min-h-[60vh] flex flex-col justify-center">
          <PuffLoader color={"#000"} size={100} />
        </div>
      ) : (
        <div className="overflow-x-auto px-3 w-full mx-auto">
          <Table registrationData={filteredData} />
        </div>
      )}
    </div>
  );
};

export default Page;
