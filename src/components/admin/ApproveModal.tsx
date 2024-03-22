"use client";
import { supabase } from "@/lib";
import { approveReg } from "@/utils/functions/approveReg";
import { getImageUrl } from "@/utils/functions/getImageUrl";
import { getRegistrations } from "@/utils/functions/getRegistrations";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const ApproveModal = ({
  isOpen,
  onClose,
  data,
  setRegistrations,
}: {
  isOpen: boolean;
  onClose: () => void;
  data: any;
  setRegistrations: any;
}) => {
  const [imageUrl, setImageUrl] = useState<any>("");
  const [loaded, setLoaded] = useState(false);
  let teamType;

  if (data?.events.max_team_member > 1) {
    teamType = "Team";
  } else {
    teamType = "Individual";
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const image = await getImageUrl({
          eventId: data.event_id,
          fileName: data.transaction_ss_filename,
        });
        if (image) {
          setImageUrl(image.publicUrl);
        }
      } catch (error) {
        // console.log(error);
      }
    };
    fetchData();
  }, [data]);

  const handleAccept = async () => {
    // console.log(data.team_id)
    const { data: confirmData, error } = await supabase
      .from("teams")
      .update({ transaction_verified: true })
      .eq("team_id", data.team_id)
      .select();

    if(error){
      toast.error("Error Occured");
      onClose();
      setImageUrl("");
      setLoaded(false);
      return;
    }
    if(confirmData){
      toast.success("Team Verified");
       const updatedData = await getRegistrations();
       setRegistrations(updatedData);
       setImageUrl("");
       onClose();
       setLoaded(false);
    }
    // if (!data) {
    //   onClose();
    //   setImageUrl("");
    //   toast.error("Error Occured");
    //   setLoaded(false);
    //   return;
    // }
    // // console.log(response)
    // if (data) {
    //   toast.success("Team Verified");
    //   const updatedData = await getRegistrations();
    //   setRegistrations(updatedData);
    //   setImageUrl("");
    //   onClose();
    //   setLoaded(false);
    // }
  };
  return (
    <>
      {isOpen && (
        <div className="fixed  inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[50]">
          <div
            className={`bg-gray-100 p-4 rounded-lg h-[60%]
            w-[90%] flex flex-col items-start md:w-[30%] `}
          >
            <div className="w-full flex flex-row mb-2 items-center justify-between">
              <h2 className="text-lg font-semibold">Approve Registration</h2>
              <h2
                onClick={onClose}
                className="bg-black md:py-2 md:px-3 px-2 py-1 hover:bg-white hover:text-black border-2 border-black  text-white text-sm font-semibold rounded-full cursor-pointer"
              >
                X
              </h2>
            </div>

            <div className="h-full overflow-y-scroll flex flex-col gap-3 my-1 py-2 px-1 w-full mx-auto">
              <h1 className="font-semibold text-sm">
                Transaction ID : {data.transaction_id}
              </h1>
              <h1 className="font-semibold text-sm">
                Event Name : {data.events.event_name}
              </h1>
              <h1 className="font-semibold text-sm">Team Type : {teamType}</h1>
              <h1 className="font-semibold text-sm">
                Team Name : {data.team_name}
              </h1>
              <h1 className="font-semibold text-sm">
                Team Lead Name : {data.participations[0]?.name!}
              </h1>
              <h1 className="font-semibold text-sm">
                Team Lead Phone : {data.participations[0]?.phone!}
              </h1>

              {imageUrl && <img
                src={imageUrl && imageUrl}
                alt="Team Image"
                width={300}
                height={300}
                onLoad={() => setLoaded(true)}
                className="border-2 border-gray-600 mx-auto  rounded-lg object-cover"
              />}
            </div>
            <div className="mt-5 w-full flex flex-row items-center justify-center gap-5">
              <button
                className="w-full rounded-md bg-red-400 font-semibold px-4 py-2 text-white shadow-md hover:bg-red-600"
                onClick={() => {
                  onClose();
                  setImageUrl("");
                  setLoaded(false);
                }}
              >
                Reject
              </button>
              <button
                className="w-full rounded-md bg-green-400 px-4 py-2 text-white shadow-md hover:bg-green-600"
                onClick={handleAccept}
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ApproveModal;
