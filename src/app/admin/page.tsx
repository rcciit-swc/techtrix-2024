"use client";
import ApproveModal from "@/components/admin/ApproveModal";
import FormElement from "@/components/admin/FormElement";
import { getRegistrations } from "@/utils/functions/getRegistrations";
import React, { useEffect, useState } from "react";

const page = () => {
  const [registrations, setRegistrations] = useState<any>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [filteredResults, setFilteredResults] = useState<any>([]);
  const [modalData, setModalData] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const [inputs, setInputs] = useState({
    phone: "",
    transactionId: "",
    eventName: "",
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
    const sortedResults: any = filteredResults
      .slice()
      .sort((a: any, b: any) => {
        if (sortOrder === "asc") {
          return a.transaction_verified - b.transaction_verified;
        } else {
          return b.transaction_verified - a.transaction_verified;
        }
      });

    setFilteredResults(sortedResults);
  }, [sortOrder, filteredResults]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRegistrations();
        setFilteredResults(data);
        setRegistrations(data);
      } catch (error) {
        console.log(error);
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
        registration.transaction_id.includes(inputs.transactionId) &&
        registration.events.event_name
          .toLowerCase()
          .includes(inputs.eventName.toLowerCase())
    );
    setFilteredResults(filteredResults);
  }, [inputs, registrations]);
  return (
    <div className="w-full mx-auto overflow-x-hidden flex flex-col items-center gap-5 ">
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
          name="Event Name"
          value={inputs.eventName}
          type="text"
          id="eventName"
          onChange={handleInputChange}
          width="1/3"
        />
      </div>

      <div className="overflow-x-auto px-3 w-full mx-auto">
        <table className="w-full table-auto border border-gray-300 rounded-xl">
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
              <th>Name</th>
              <th>Team Lead Phone</th>
              <th>Transaction ID</th>
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
                        ? "bg-green-100 text-green-500 font-semibold text-center"
                        : "cursor-pointer bg-red-100 text-red-500 font-semibold text-center hover:bg-red-200 hover:text-red-600"
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
                    <td className="border border-gray-300 px-4 py-2">
                      {registration.team_type}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {registration.team_name}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {registration?.participations[0]?.name!}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {registration?.team_lead_phone!}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {registration.transaction_id}
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
      <ApproveModal
        isOpen={open}
        onClose={onClose}
        data={modalData}
        setRegistrations={setRegistrations}
      />
    </div>
  );
};

export default page;
