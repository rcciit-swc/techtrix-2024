import { useEffect, useMemo, useState } from "react";
// import FormElement from "../admin/FormElement";
import { eventReg } from "@/utils/functions/eventReg";
import { useParams, useRouter } from "next/navigation";
// import { getEventInfo } from "@/utils/functions/getEventsInfo";
import { validateReg } from "@/utils/functions/validate";
// import { EventData } from "@/types/events";
import { Toaster, toast } from "sonner";
import RegFormElement from "./RegFormElement";
import { supabase, useUser } from "@/lib";
import Link from "next/link";
// import { stat } from "fs";
// import Image from "next/image";

const EventRegForm = ({
  isOpen,
  onClose,
  eventDetails,
  category,
}: {
  isOpen: boolean;
  onClose: () => void;
  eventDetails: any;
  category: string;
}) => {
  const router = useRouter();
  const eventId = eventDetails?.id;
  const [inputs, setInputs] = useState<any>({
    teamName: "",
    transactionId: "",
    transactionSSfileName: "",
    teamLeadPhone: "",
    teamLeadEmail: "",
    teamLeadName: "",
    referralCode: "",
  });

  const [file, setFile] = useState<any>(null);
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | any>
  ) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setInputs((prevInputs: any) => ({
      ...prevInputs,
      transactionSSfileName: selectedFile.name,
    }));
  };
  // const [eventInfo, setEventInfo] = useState<EventData | undefined>();

  // useEffect(() => {
  //   const getEvent = async () => {
  //     const res: EventData[] | null | undefined | any = await getEventInfo(event);
  //     console.log(res);
  //     setEventInfo(res![0]);
  //   };
  //   getEvent();
  // }, [event]);

  const user = useUser((state) => state.user);
  const minTeamMember = eventDetails?.min_team_member;
  const maxTeamMember = eventDetails?.max_team_member;
  const [isSWCcleared, setIsSWCcleared] = useState<any>(null);
  useEffect(() => {
    if (user) {
      setInputs((prevInputs: any) => ({
        ...prevInputs,
        teamLeadPhone: user.phone,
        teamLeadEmail: user.email,
        teamName: maxTeamMember > 1 ? "" : user.name, // Set teamName as blank if maxTeamMember > 1
        teamLeadName: user.name,
        referralCode:
          user?.referral_code === "default" ? "" : user.referral_code!,
      }));
    }
  }, [user, maxTeamMember]);

  useEffect(() => {
    if (category === "Robotics") {
      setIsSWCcleared(false);
    } else if (category === "Gaming") {
      setIsSWCcleared(false);
    } else {
      setIsSWCcleared(user?.swc);
    }
  }, [user, category]);

  const [participants, setParticipants] = useState<any>([]);
  useEffect(() => {
    if (minTeamMember !== undefined && minTeamMember !== null) {
      const blankParticipants = [];
      for (let i = 0; i < minTeamMember; i++) {
        blankParticipants.push({ phone: "", email: "", name: "" });
      }
      setParticipants(blankParticipants);
    }
  }, [minTeamMember]);
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | any>
  ) => {
    const { name, value } = e.target;
    setInputs((prevInputs: any) => ({
      ...prevInputs,
      [name]: value,
    }));
    if (maxTeamMember == 1) {
      setInputs((prevInputs: any) => ({
        ...prevInputs,
        teamLeadName: prevInputs.teamName,
      }));
    }
  };

  const handleEmailChange = (index: number, value: string) => {
    const updatedParticipants = [...participants];
    updatedParticipants[index].email = value;
    if (index == 0) {
      updatedParticipants[0].email = inputs.teamLeadEmail;
    }
    setParticipants(updatedParticipants);
  };
  const handleNameChange = (index: number, value: string) => {
    const updatedParticipants = [...participants];
    updatedParticipants[index].name = value;
    if (index == 0) {
      updatedParticipants[0].name = inputs.teamLeadName;
    }
    setParticipants(updatedParticipants);
  };

  const handlePhoneChange = (index: number, value: string) => {
    const updatedParticipants = [...participants];
    updatedParticipants[index].phone = value;
    setParticipants(updatedParticipants);
  };

  const addParticipant = () => {
    setParticipants([...participants, { phone: "", name: "" }]);
  };
  const removeParticipant = (index: number) => {
    const updatedParticipants = [...participants];
    updatedParticipants.splice(index, 1);
    setParticipants(updatedParticipants);
  };

  const [generalErrors, setGeneralErrors] = useState<any>({});
  const [teamErrors, setTeamErrors] = useState<any>({});
  let teamMemberCountError = "";
  const handleSubmit = async () => {
    try {
      const res = validateReg(
        inputs,
        participants,
        maxTeamMember,
        file,
        isSWCcleared
      );
      console.log(res);
      // if (
      //   participants.length < minTeamMember &&
      //   participants.length > maxTeamMember
      // ) {
      //   teamMemberCountError = `Team Members should be between ${minTeamMember} and ${maxTeamMember}`;
      //   return;
      // }
      // console.log(res);
      const allFieldsEmpty =
        Object.values(res.errors).every((value) => value === "") &&
        res.teamErrors.every(
          (participant: any) =>
            participant.name === "" && participant.phone === ""
        );
      if (allFieldsEmpty) {
        await eventReg(inputs, participants, file, eventId, isSWCcleared);
        toast.success("Registration Successful");
        onClose();
        router.push("/dashboard");
      }
      if (res.errors || res.teamErrors) {
        setGeneralErrors(res.errors);
        setTeamErrors(res.teamErrors);
        toast.error("Fill all the fields accurately !");
        return;
      }
    } catch (err) {
      console.log(err);
      toast.error("Registration Failed !");
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed  inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[50]">
          <div
            className={`bg-gray-100 p-4 rounded-lg ${
              maxTeamMember > 1 && eventDetails.register_through_portal
                ? "h-[80vh] md:h-[70vh]"
                : eventDetails.register_through_portal
                ? "h-[70vh]"
                : ""
            }  w-[95%] flex flex-col items-start lg:w-1/2 lg:px-32 lg:py-8`}
          >
            <div className="w-full flex flex-row mb-2 items-center justify-between">
              <h2 className="text-sm lg:text-lg font-semibold">
                Registration of Event
              </h2>
              <h2
                onClick={onClose}
                className="bg-black md:py-2 md:px-3 px-2 py-1 -mr-3 hover:bg-white hover:text-black border-2 border-black  text-white text-sm font-semibold rounded-full cursor-pointer"
              >
                X
              </h2>
            </div>
            <h1 className="text-green-600 font-semibold text-sm mb-2">No Registration fees required if SWC paid except Robotics and Gaming Category for RCCIIT students !</h1>
            {eventDetails.register_through_portal ? (
              <div className="flex w-full overflow-x-hidden flex-col  items-start gap-4 overflow-y-scroll text-sm lg:text-lg">
                <RegFormElement
                  type="text"
                  disabled={maxTeamMember > 1 ? false : true}
                  name={maxTeamMember > 1 ? "Team Name" : "Name"}
                  value={inputs.teamName}
                  id="teamName"
                  onChange={handleInputChange}
                  width="100%"
                />
                <h1 className="text-red-600 font-semibold text-xs">
                  {generalErrors.teamName}
                </h1>
                <RegFormElement
                  type="number"
                  disabled={maxTeamMember > 1 ? true : true}
                  name={maxTeamMember > 1 ? "Team Lead Phone" : "Phone"}
                  value={inputs.teamLeadPhone}
                  id="teamLeadPhone"
                  onChange={handleInputChange}
                  width="100%"
                />
                <h1 className="text-red-600 font-semibold text-xs">
                  {generalErrors.teamLeadPhone}
                </h1>

                {maxTeamMember > 1 && (
                  <RegFormElement
                    type="text"
                    disabled={maxTeamMember > 1 ? true : true}
                    name={maxTeamMember > 1 ? "Team Lead Name" : "Name"}
                    value={inputs.teamLeadName}
                    id="teamLeadName"
                    onChange={handleInputChange}
                    width="100%"
                  />
                )}
                <h1 className="text-red-600 font-semibold text-xs">
                  {generalErrors.teamLeadName}
                </h1>
                <RegFormElement
                  type="email"
                  disabled={maxTeamMember > 1 ? true : true}
                  name={maxTeamMember > 1 ? "Team Lead Email" : "Email"}
                  value={inputs.teamLeadEmail}
                  id="teamLeadEmail"
                  onChange={handleInputChange}
                  width="100%"
                />
                <h1 className="text-red-600 font-semibold text-xs">
                  {generalErrors.teamLeadEmail}
                </h1>

                {!isSWCcleared && (
                  <>
                    <RegFormElement
                      type="text"
                      name={"Referral Code"}
                      disabled={
                        user?.referral_code !== "default" ? false : false
                      }
                      placeholder="Optional"
                      value={inputs.referralCode}
                      id="referralCode"
                      onChange={handleInputChange}
                      width="100%"
                    />
                    <h1 className="text-green-600 font-semibold text-xs">
                      Use Referral Codes for exclusive offers ! T&C Apply !
                    </h1>
                    <img
                      src={"/QR.jpg"}
                      width={350}
                      className="mx-auto "
                      height={100}
                      alt=""
                    />
                    <h1 className="mx-auto text-center font-semibold text-lg">
                      Pay Now :{" "}
                      <span className="font-semibold text-green-600">
                        ₹ {eventDetails?.registration_fees}
                      </span>
                    </h1>
                    <RegFormElement
                      type="text"
                      name="Transaction Id"
                      value={inputs.transactionId}
                      id="transactionId"
                      onChange={handleInputChange}
                      width="100%"
                    />
                    <h1 className="text-red-600 font-semibold text-xs">
                      {generalErrors.transactionId}
                    </h1>
                    <div className="flex flex-row gap-2 flex-wrap text-sm items-center">
                      <label
                        htmlFor="transactionSSfileName"
                        className="font-semibold"
                      >
                        Payment Screenshot :
                      </label>
                      <input
                        type="file"
                        id="transactionSSfileName"
                        className="font-semibold"
                        onChange={handleFileChange}
                      />
                      <h1 className="text-red-600 font-semibold text-xs">
                        {generalErrors.transactionSSfileName}
                      </h1>
                    </div>
                  </>
                )}

                {maxTeamMember > 1 && (
                  <div className="flex flex-col items-center gap-5">
                    <h1 className="font-semibold">Add Team Participants</h1>
                    {teamMemberCountError !== "" && (
                      <h1 className="text-red-600 font-semibold text-xs">
                        {teamMemberCountError}
                      </h1>
                    )}
                    {participants.map((participant: any, index: number) => (
                      <div
                        key={index}
                        className="flex flex-row   items-center gap-10 flex-wrap border-2 text-sm  px-10 py-2 pb-5 border-gray-200 rounded-lg"
                      >
                        <div className="flex flex-col  items-start gap-2">
                          <label htmlFor="" className="font-semibold">
                            {index == 0 ? "Team Lead" : `Person ${index + 1}`}
                          </label>

                          <div className="flex flex-col items-start gap-3">
                            {/* <div className="flex flex-row flex-wrap gap-2 font-semibold">
                              <label htmlFor="email">Email :</label>
                              <input
                                type="text"
                                id="email"
                                value={
                                  index == 0
                                    ? (participant.email = inputs.teamLeadEmail)
                                    : participant.email
                                }
                                disabled={index == 0 ? true : false}
                                onChange={(e) =>
                                  handleEmailChange(index, e.target.value)
                                }
                                className="border-black px-2 py-1 max-md:w-full rounded-lg"
                                placeholder="Email"
                              />
                              {teamErrors && teamErrors[index] && (
                                <h1 className="text-red-600 font-semibold text-xs">
                                  {teamErrors[index].email}
                                </h1>
                              )}
                            </div> */}

                            <div className="flex flex-row flex-wrap gap-2 font-semibold">
                              <label htmlFor="name">Name :</label>
                              <input
                                type="text"
                                id="name"
                                disabled={index == 0 ? true : false}
                                value={
                                  index == 0
                                    ? (participant.name = inputs.teamLeadName)
                                    : participant.name
                                }
                                onChange={(e) =>
                                  handleNameChange(index, e.target.value)
                                }
                                className={`w-full border-b border-black px-2 py-1 max-md:w-full focus:border-b bg-transparent `}
                              />
                              {teamErrors && teamErrors[index] && (
                                <h1 className="text-red-600 font-semibold text-xs">
                                  {teamErrors[index].name}
                                </h1>
                              )}
                            </div>

                            <div className="flex flex-row flex-wrap gap-2 font-semibold">
                              <label htmlFor="phone">Phone :</label>
                              <input
                                type="text"
                                disabled={index == 0 ? true : false}
                                value={
                                  index == 0
                                    ? (participant.phone = inputs.teamLeadPhone)
                                    : participant.phone
                                }
                                onChange={(e) =>
                                  handlePhoneChange(index, e.target.value)
                                }
                                className={`w-full border-b border-black px-2 py-1 max-md:w-full focus:border-b bg-transparent `}
                              />
                              {teamErrors && teamErrors[index] && (
                                <h1 className="text-red-600 font-semibold text-xs">
                                  {teamErrors[index].phone}
                                </h1>
                              )}
                            </div>
                          </div>
                        </div>

                        {participants.length > minTeamMember && (
                          <button
                            onClick={() => removeParticipant(index)}
                            className="border-2 border-black rounded-full px-2 py-1 text-xs font-semibold"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    ))}
                    {participants.length < maxTeamMember && (
                      <button
                        onClick={addParticipant}
                        className="font-semibold border-2 text-sm border-black bg-black text-white px-5 py-2 rounded-full hover:bg-white hover:text-black"
                      >
                        Add Person
                      </button>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center w-full">
                <Link
                  href={eventDetails.registration_link}
                  target="_blank"
                  className="border-2 mt-3 border-black px-5 py-1 rounded-full font-semibold bg-black text-white hover:bg-white hover:text-black"
                  onClick={handleSubmit}
                >
                  Fill Form
                </Link>
              </div>
            )}
            {eventDetails.register_through_portal ? (
              <div className="flex flex-row items-center pt-5 flex-wrap justify-between w-full">
                <button
                  className="border-2 mt-3 border-black px-5 py-1 rounded-full font-semibold bg-black text-white hover:bg-white hover:text-black"
                  onClick={onClose}
                >
                  Close
                </button>
                <button
                  className="border-2 mt-3 border-black px-5 py-1 rounded-full font-semibold bg-black text-white hover:bg-white hover:text-black" // hover:bg-white hover:text-black
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            ) : (
              <></>
            )}
          </div>
          <Toaster position="bottom-right" richColors />
        </div>
      )}
    </>
  );
};

export default EventRegForm;
