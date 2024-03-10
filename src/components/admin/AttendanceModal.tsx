"use client";
import { supabase } from "@/lib";
import parse from "html-react-parser";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "sonner";
const AttendanceModal = ({
  isOpen,
  onClose,
  teamData,
}: {
  isOpen: boolean;
  onClose: () => void;
  teamData: any;
}) => {
    const router = useRouter();
  const giveAttendance = async () => {
    const data = await supabase
      .from("teams")
      .update({
        attendance: true,
      })
      .eq("team_id", teamData.team_id);
    onClose();

    toast.success("Attendance marked successfully");
    router.refresh();
  };
  return (
    <>
      {isOpen && (
        <div className="fixed  inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[50]">
          <Toaster richColors position="bottom-right" />
          <div
            className={`bg-gray-100 p-4 rounded-lg h-auto
             w-[90%] flex flex-col items-start md:w-[50%] lg:w-[35%] `}
          >
            <div className="w-full flex flex-row mb-2 items-center justify-between">
              <h2 className="text-lg font-semibold">Rules of the event</h2>

              <h2
                onClick={onClose}
                className="bg-black md:py-2 md:px-3 px-2 py-1 hover:bg-white hover:text-black border-2 border-black  text-white text-sm font-semibold rounded-full cursor-pointer"
              >
                X
              </h2>
            </div>
            <button onClick={giveAttendance}>Give Attendance</button>
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

export default AttendanceModal;
