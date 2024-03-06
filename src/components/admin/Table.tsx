"use client";
import { supabase } from "@/lib";
import React, { useEffect, useState } from "react";
import { PuffLoader } from "react-spinners";

const Table = ({ registrationData }: { registrationData: any[] }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [loading, setLoading] = useState<boolean>(true);
  const [moderatedResults, setModeratedResults] = useState<any>([]);
  const [filteredResults, setFilteredResults] = useState<any>([]);
  const [modalData, setModalData] = useState<any>(null);
  useEffect(() => {
    registrationData &&
      registrationData.forEach(async (data) => {
        let teamLeadName: any;
        await Promise.all(
          data.team_member_phones.map(async (phone: any) => {
            const { data: names, error } = await supabase
              .from("participations")
              .select("name")
              .eq("phone", phone);

            if (!error && names && names.length > 0) {
              const phoneWithInfo = {
                phone: phone,
                name: names[0].name,
              };

              data.team_member_phones[data.team_member_phones.indexOf(phone)] =
                phoneWithInfo;
            }
            if (phone === data.team_lead_phone) {
              teamLeadName = names && names.length > 0 ? names[0].name : "";
            }
          })
        );
        data["team_lead_name"] = teamLeadName;
        setModeratedResults([...registrationData]);
      });
    setLoading(false);
  }, [registrationData]);

  useEffect(() => {
    const sortedResults = [...moderatedResults].sort((a, b) =>
      sortOrder === "asc"
        ? a.transaction_verified - b.transaction_verified
        : b.transaction_verified - a.transaction_verified
    );
    setFilteredResults(sortedResults);
  }, [sortOrder, moderatedResults]);
  const handleSort = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <>
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
            <th>College</th>
            <th>Team Name</th>
            <th>Name</th>
            <th>Team Lead Phone</th>
            <th>Transaction ID</th>
            <th>Members</th>
          </tr>
        </thead>
        <tbody>
          {!loading &&
            filteredResults! &&
            filteredResults!.map((registration: any, index: number) => {
              return (
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
                  <td className="border border-gray-300 px-4 py-2">
                    {registration.transaction_verified
                      ? "Verified"
                      : "Not Verified"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {registration.event_name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {registration.team_member_phones.length > 1
                      ? "Team"
                      : "Solo"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {registration.college}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {registration.team_name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {registration.team_lead_name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {registration?.team_lead_phone!}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {registration.transaction_id}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      onClick={() => {
                        setModalData(registration.team_member_phones);
                        setIsModalOpen(true);
                      }}
                      className="font-semibold border-black border hover:bg-white hover:text-black text-center text-xs px-5 py-2 bg-black text-white rounded-xl"
                    >
                      View Members
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      {filteredResults.length == 0 && (
        <div className="flex flex-col items-center justify-center mt-20">
          <h1 className="font-semibold text-black text-2xl">
            No Registrations yet !
          </h1>
        </div>
      )}
      <MemberModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        members={modalData}
      />
    </>
  );
};

const MemberModal = ({
  isOpen,
  onClose,
  members,
}: {
  isOpen: boolean;
  onClose: () => void;
  members: any;
}) => {
  return (
    <>
      {isOpen && (
        <div className="fixed  inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[50]">
          <div
            className={`bg-gray-100 p-4 rounded-lg h-auto
               w-[90%] flex flex-col items-start md:w-[25%] `}
          >
            <div className="w-full flex flex-row mb-2 items-center justify-between">
              <h2 className="text-lg font-semibold">Members</h2>

              <h2
                onClick={onClose}
                className="bg-black md:py-2 md:px-3 px-2 py-1 hover:bg-white hover:text-black border-2 border-black  text-white text-sm font-semibold rounded-full cursor-pointer"
              >
                X
              </h2>
            </div>

            <div className="h-full overflow-y-scroll flex flex-col items-center gap-2 my-1 py-2 px-1 w-full text-center">
              {members.map((member: any, index: number) => {
                return (
                  <div
                    key={index}
                    className="flex flex-col md:flex-row bg-green-200 flex-wrap justify-around font-semibold w-full"
                  >
                    <h1>{member.name}</h1>
                    <a
                      className="text-red-500 hover:cursor-pointer hover:opacity-70"
                      href={`tel:${member.phone}`}
                    >
                      {member.phone}
                    </a>
                    <hr className="w-full bg-black text-black font-semibold" />
                  </div>
                );
              })}
            </div>
            <button
              className="border-2 mt-3 border-black px-5 py-1 rounded-full font-semibold bg-black text-white hover:bg-white hover:text-black"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Table;
