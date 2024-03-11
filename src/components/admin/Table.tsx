import React, { useState, useEffect } from "react";
import { supabase } from "@/lib";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "sonner";
import { PuffLoader } from "react-spinners";

const Table = ({ registrationData }: { registrationData: any[] }) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [filteredResults, setFilteredResults] = useState<any[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalData, setModalData] = useState<any>(null);

  useEffect(() => {
    setLoading(false);
    const sortedResults = [...registrationData].sort((a, b) =>
      sortOrder === "asc"
        ? a.transaction_verified - b.transaction_verified
        : b.transaction_verified - a.transaction_verified
    );
    setFilteredResults(sortedResults);
  }, [sortOrder, registrationData]);

  const handleSort = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value.toLowerCase();
    const filteredData = registrationData.filter((registration: any) =>
      Object.values(registration).some(
        (value) =>
          typeof value === "string" && value.toLowerCase().includes(searchValue)
      )
    );
    setFilteredResults(filteredData);
  };

  const giveAttendance = async (team_id: string) => {
    const { error } = await supabase
      .from("teams")
      .update({ attendance: true })
      .eq("team_id", team_id);

    if (error) {
      toast.error("Failed to mark attendance");
    } else {
      toast.success("Attendance marked successfully");
      router.refresh();
    }
  };

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
    <>
      <div className="flex items-center mb-5">
        {/* <input
          type="text"
          className="border border-gray-300 px-2 py-1 rounded-md mr-3"
          placeholder="Search..."
          onChange={handleSearch}
        /> */}
        {/* <button
          className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-md"
          onClick={handleSort}
        >
          Sort
        </button> */}
      </div>
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
            <th>Email</th>
            <th>Transaction ID</th>
            <th>SWC</th>
            <th>Attendance</th>
            <th>Members</th>
            <th>Create At</th>
          </tr>
        </thead>
        <tbody>
          {!loading &&
            filteredResults.map((registration: any, index: number) => (
              <tr
                key={index}
                className={
                  registration.payment_status
                    ? "bg-green-100 text-green-500 font-semibold text-center"
                    : "cursor-pointer bg-red-100 text-red-500 font-semibold text-center hover:bg-red-200 hover:text-red-600"
                }
              >
                <td className="border border-gray-300 px-4 py-2">
                  {index + 1}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {registration.payment_status ? "Verified" : "Not Verified"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {registration.event_name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {registration.team_type}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {registration.college}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {registration.team_name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {registration.team_lead_name!}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {registration?.team_lead_phone!}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {registration?.team_lead_email!}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {registration.transaction_id}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {registration.swc}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {!registration?.attendance ? (
                    <button
                      onClick={() => giveAttendance(registration.team_id)}
                      className="font-semibold border-black border hover:bg-white hover:text-black text-center text-xs px-5 py-2 bg-black text-white rounded-xl"
                    >
                      Mark Attendance
                    </button>
                  ) : (
                    "Marked"
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => {
                      setModalData(registration.team_members);
                      setIsModalOpen(true);
                    }}
                    className="font-semibold border-black border hover:bg-white hover:text-black text-center text-xs px-5 py-2 bg-black text-white rounded-xl"
                  >
                    View Members
                  </button>
                </td>
                <td className="border border-gray-300 py-2">
                  {new Date(registration.created_at).toLocaleDateString(
                    "en-US",
                    options
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {filteredResults.length === 0 && (
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

export const MemberModal = ({
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
              {members.map((member: any, index: number) => (
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
              ))}
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
