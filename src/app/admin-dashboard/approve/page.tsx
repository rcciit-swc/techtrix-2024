"use client";
import ApproveModal from "@/components/admin/ApproveModal";
import FormElement from "@/components/admin/FormElement";
import { supabase } from "@/lib";
import { getRegistrations } from "@/utils/functions/getRegistrations";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { PuffLoader } from "react-spinners";

const Page = () => {
  const [registrations, setRegistrations] = useState<any>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [filteredResults, setFilteredResults] = useState<any>([]);
  const [modalData, setModalData] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const [inputs, setInputs] = useState({
    phone: "",
    transactionId: "",
    eventName: "",
    createdAt: "",
    swc: "",
    teamLeadName: "",
    teamLeadEmail: "",
    college: "",
  });
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | any>
  ) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };
  useEffect(() => {
    const sortedResults = [...filteredResults].sort((a, b) =>
      sortOrder === "asc"
        ? a.transaction_verified - b.transaction_verified
        : b.transaction_verified - a.transaction_verified
    );
    setFilteredResults(sortedResults);
  }, [sortOrder, JSON.stringify(filteredResults)]);

  const [loading, setLoading] = useState(true);
  const [swcCount, setSwcCount] = useState(0);
  const [nonSwcCount, setNonSwcCount] = useState(0);
  const [collegeRegCount, setCollegeRegCount] = useState(0);
  const [outCollegeRegCount, setOutCollegeRegCount] = useState(0);
  useMemo(() => {
    const fetchData = async () => {
      try {
        const data = await getRegistrations();
        setFilteredResults(data);
        setRegistrations(data);
        setLoading(false);
        const swcPaidRegistrationsCount = data.filter(
          (res: any) => res.swc === "Yes"
        ).length;
        setSwcCount(swcPaidRegistrationsCount);
        const nonswcPaidRegistrationsCount = data.filter(
          (res: any) => res.swc === "No"
        ).length;
        setNonSwcCount(nonswcPaidRegistrationsCount);

        const collegeRegs = data.filter(
          (res: any) =>
            res.college.toLowerCase().includes("rcciit") ||
            res.college
              .toLowerCase()
              .includes("rcc institute of information technology")
        ).length;
        setOutCollegeRegCount(data.length - collegeRegs);
        setCollegeRegCount(collegeRegs);
      } catch (error) {
        // console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleSort = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const onClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    const filteredResults = registrations.filter(
      (registration: any) =>
        registration.team_lead_phone.includes(inputs.phone) &&
        registration.team_lead_email.includes(inputs.teamLeadEmail) &&
        registration.transaction_id.includes(inputs.transactionId) &&
        registration.swc.toLowerCase().includes(inputs.swc.toLowerCase()) &&
        registration.college
          .toLowerCase()
          .includes(inputs.college.toLowerCase()) &&
        registration.team_lead_name
          .toLowerCase()
          .includes(inputs.teamLeadName.toLowerCase()) &&
        registration.events.event_name
          .toLowerCase()
          .includes(inputs.eventName.toLowerCase()) &&
        new Date(registration.created_at)
          .toLocaleDateString("en-US", options)
          .includes(inputs.createdAt)
    );
    setFilteredResults(filteredResults);
  }, [inputs, registrations]);
  const options: any = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
  };

  return (
    <div className="w-full mx-auto  flex flex-col items-center gap-5 ">
      <h1 className="font-semibold text-4xl text-center">Admin Dashboard</h1>
      <div className="flex flex-row items-center gap-5 w-[90%] md:w-full justify-center  flex-wrap">
        <FormElement
          name="Phone"
          value={inputs.phone}
          type="text"
          id="phone"
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
          name="College"
          value={inputs.college}
          type="text"
          id="college"
          onChange={handleInputChange}
          width="1/3"
        />
        <FormElement
          name="Event Name"
          value={inputs.eventName}
          type="text"
          id="eventName"
          onChange={handleInputChange}
          width="1/3"
        />
        <FormElement
          name="Time"
          value={inputs.createdAt}
          type="text"
          id="createdAt"
          onChange={handleInputChange}
          width="1/3"
        />
        <FormElement
          name="SWC"
          value={inputs.swc}
          type="text"
          id="swc"
          onChange={handleInputChange}
          width="1/3"
        />
        <FormElement
          name="Team Lead Name"
          value={inputs.teamLeadName}
          type="text"
          id="teamLeadName"
          onChange={handleInputChange}
          width="1/3"
        />
        <FormElement
          name="Team Lead Email"
          value={inputs.teamLeadEmail}
          type="text"
          id="teamLeadEmail"
          onChange={handleInputChange}
          width="1/3"
        />
      </div>

      <div className="flex flex-row flex-wrap font-semibold items-center text-center text-sm md:text-2xl gap-3  md:gap-10 justify-center">
        <h1>
          SWC Paid Registrations :{" "}
          <span className="text-green-600">{swcCount}</span>{" "}
        </h1>
        <h1>
          SWC Paid Registrations :{" "}
          <span className="text-red-600">{nonSwcCount} </span>
        </h1>
      </div>
      <div className="flex flex-row flex-wrap font-semibold items-center text-center text-sm md:text-2xl gap-3  md:gap-10 justify-center">
        <h1>
          College Inside Reg :{" "}
          <span className="text-green-600">{collegeRegCount}</span>{" "}
        </h1>
        <h1>
          College Outside Reg :{" "}
          <span className="text-red-600">{outCollegeRegCount} </span>
        </h1>
      </div>
      {loading ? (
        <div className="min-h-[60vh] flex flex-col justify-center items-center">
          <PuffLoader size={40} color="#000" />{" "}
        </div>
      ) : (
        <div className="overflow-x-auto px-3 w-full mx-auto">
          <table className="w-full oveflow-x-auto table-auto border border-gray-300 rounded-xl">
            <thead>
              <tr className="text-center">
                <th>Sl. No.</th>
                <th
                  className="px-4 py-2 flex items-center cursor-default"
                  onClick={handleSort}
                >
                  Payment Status
                  {sortOrder === "asc" ? (
                    <span className="ml-1">▲</span>
                  ) : (
                    <span className="ml-1">▼</span>
                  )}
                </th>
                <th>Event Name</th>
                <th>Type</th>
                <th>Team Name</th>
                <th>College</th>
                <th>Name</th>
                <th>Team Lead Phone</th>
                <th>Team Lead Email</th>
                <th>Transaction ID</th>
                <th>Registered at</th>
                <th>SWC</th>
              </tr>
            </thead>
            <tbody>
              {filteredResults.map((registration: any, index: number) => {
                return (
                  <>
                    <tr
                      key={index}
                      className={
                        registration.transaction_verified
                          ? "bg-green-100 text-green-500 font-semibold text-center text-sm"
                          : "cursor-pointer bg-red-100 text-red-500 font-semibold text-sm text-center hover:bg-red-200 hover:text-red-600"
                      }
                    >
                      <td className="border  border-gray-300 px-4 py-2">
                        {index + 1}
                      </td>
                      <td
                        className="border border-gray-300 px-4 py-2"
                        onClick={() => {
                          if (!registration.transaction_verified) {
                            setModalData(registration);
                            setOpen(true);
                          }
                        }}
                      >
                        {registration.transaction_verified
                          ? "Verified"
                          : "Not Verified"}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {registration.events.event_name}
                      </td>
                      <td className="border border-gray-300 px-2 py-2">
                        {registration.team_type}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {registration.team_name}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {registration.college}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {registration?.team_lead_name!}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {registration?.team_lead_phone!}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {registration?.team_lead_email!}
                      </td>
                      <td className="border border-gray-300  py-2">
                        {registration.transaction_id}
                      </td>
                      <td className="border border-gray-300 py-2">
                        {new Date(registration.created_at).toLocaleDateString(
                          "en-US",
                          options
                        )}
                      </td>
                      <td
                        className={`${
                          registration.swc === "No" ? "text-red-600" : ""
                        } border border-gray-300 py-2`}
                      >
                        {registration.swc}
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      <ApproveModal
        isOpen={open}
        onClose={onClose}
        data={modalData}
        setRegistrations={setRegistrations}
      />
    </div>
  );
};

export default Page;
