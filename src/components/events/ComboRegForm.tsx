import { useEffect, useState } from "react";
import FormElement from "../admin/FormElement";
import { eventReg } from "@/utils/functions/eventReg";
import { useParams, useRouter } from "next/navigation";
import { getEventInfo } from "@/utils/functions/getEventsInfo";
import { validateEventInputs, validateReg } from "@/utils/functions/validate";
import { EventData } from "@/types/events";
import { Toaster, toast } from "sonner";
import RegFormElement from "./RegFormElement";
import { useUser } from "@/lib";
import { comboReg } from "@/utils/functions/comboReg";

const ComboRegForm = ({
  isOpen,
  onClose,
  events,
}: {
  isOpen: boolean;
  onClose: () => void;
  events: any;
}) => {
  const router = useRouter();

  const [inputs, setInputs] = useState<any>({
    teamName: "",
    transactionId: "",
    transactionSSfileName: "",
    teamLeadPhone: "",
    teamLeadEmail: "",
    teamLeadName: "",
    referralCode: "",
  });

  const eventNames = events.map((event: any) => event! && event!.event_name!);
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

  const user = useUser((state) => state.user);

  useEffect(() => {
    if (user) {
      setInputs((prevInputs: any) => ({
        ...prevInputs,
        teamLeadPhone: user.phone,
        teamLeadEmail: user.email,
        teamName: "",
        teamLeadName: user.name,
        referralCode:
          user?.referral_code === "default" ? "" : user.referral_code!,
      }));
    }
  }, [user]);

  const [participants, setParticipants] = useState<any[]>([]);
  const [eventInputs, setEventInputs] = useState<any[]>([]);

  useEffect(() => {
    if (events && events.length > 0) {
      const initialEventInputs = events.map((event: any) => ({
        id: event && event.id,
        eventName: event && event.event_name,
        regFees: event && event.registration_fees,
        minTeamMember:
          event && event.min_team_member !== undefined && event.min_team_member,
        maxTeamMember:
          event && event.max_team_member !== undefined && event.max_team_member,
        participants: Array(
          event &&
            event.min_team_member !== undefined &&
            event.max_team_member !== null
        ).fill({
          phone: inputs.teamLeadPhone,
          email: inputs.teamLeadEmail,
          name: inputs.teamLeadName,
        }),
      }));
      setEventInputs(initialEventInputs);
    }
  }, [events, inputs.teamLeadPhone, inputs.teamLeadEmail, inputs.teamLeadName]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | any>
  ) => {
    const { name, value } = e.target;
    setInputs((prevInputs: any) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const handleEmailChange = (index: number, value: string) => {
    const updatedParticipants = [...participants];
    updatedParticipants[index].email = value;
    if (index == 0) {
      updatedParticipants[0].email = inputs.teamLeadEmail;
    }
    setParticipants(updatedParticipants);
  };

  const handleNameChange = (
    eventIndex: number,
    participantIndex: number,
    value: string
  ) => {
    const updatedEventInputs = [...eventInputs];
    updatedEventInputs[eventIndex].participants[participantIndex].name = value;
    if (participantIndex === 0) {
      updatedEventInputs[eventIndex].participants[0].name = inputs.teamLeadName;
    }
    setEventInputs(updatedEventInputs);
  };

  const handlePhoneChange = (
    eventIndex: number,
    participantIndex: number,
    value: string
  ) => {
    const updatedEventInputs = [...eventInputs];
    updatedEventInputs[eventIndex].participants[participantIndex].phone = value;
    if (participantIndex === 0) {
      updatedEventInputs[eventIndex].participants[0].phone =
        inputs.teamLeadPhone;
    }
    setEventInputs(updatedEventInputs);
  };

  const addParticipant = (eventIndex: number) => {
    const updatedEventInputs = [...eventInputs];
    updatedEventInputs[eventIndex].participants.push({ phone: "", name: "" });
    setEventInputs(updatedEventInputs);
  };

  const removeParticipant = (eventIndex: number, participantIndex: number) => {
    const updatedEventInputs = [...eventInputs];
    updatedEventInputs[eventIndex].participants.splice(participantIndex, 1);
    setEventInputs(updatedEventInputs);
  };

  const [generalErrors, setGeneralErrors] = useState<any>({});
  const [teamErrors, setTeamErrors] = useState<any>({});

  const handleSubmit = async () => {
    try {
      const res = validateEventInputs(inputs, eventInputs, file);
      const allFieldsEmpty = Object.values(res.errors).every(
        (value) => value === ""
      );

      if (allFieldsEmpty) {
        const validTeamSizes = eventInputs.every((eventInput) => {
          const participantsCount = eventInput.participants.length;
          return (
            participantsCount >= eventInput.minTeamMember &&
            participantsCount <= eventInput.maxTeamMember
          );
        });

        if (validTeamSizes) {
          await comboReg(inputs, eventInputs, file);
          toast.success("Registration Successful");
          onClose();
          router.push("/dashboard");
        } else {
          toast.error("Team size for one or more events is invalid!");
        }
      }

      if (res.errors) {
        setGeneralErrors(res.errors);
        toast.error("Fill all the fields accurately !");
      }
    } catch (err) {
      toast.error("Registration Failed !");
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[50]">
          <div
            className={`bg-gray-100 p-4 rounded-lg h-[80vh] w-[95%] flex flex-col items-start lg:w-1/2 lg:px-32 lg:py-8`}
          >
            <div className="w-full flex flex-row mb-2 items-center justify-between">
              <h2 className="text-sm lg:text-lg font-semibold">
                Registration of Event
              </h2>
              <h2
                onClick={onClose}
                className="bg-black md:py-2 md:px-3 px-2 py-1 -mr-3 hover:bg-white hover:text-black border-2 border-black text-white text-sm font-semibold rounded-full cursor-pointer"
              >
                X
              </h2>
            </div>
            <div className="flex w-full overflow-x-hidden flex-col items-start gap-4 overflow-y-scroll text-sm lg:text-lg">
              <h1 className="font-semibold">
                Register on 3 Events Together{" "}
                <span className="text-green-800">
                  {eventNames.length > 0 && `(${eventNames.join(", ")})`}
                </span>{" "}
                and Get <span className="text-green-800">100 ₹ Off</span>
              </h1>
              <RegFormElement
                type="text"
                name={"Team Name"}
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
                disabled={true}
                name={"Team Lead Phone"}
                value={inputs.teamLeadPhone}
                id="teamLeadPhone"
                onChange={handleInputChange}
                width="100%"
              />
              <h1 className="text-red-600 font-semibold text-xs">
                {generalErrors.teamLeadPhone}
              </h1>

              <RegFormElement
                type="text"
                disabled={true}
                name={"Team Lead Name"}
                value={inputs.teamLeadName}
                id="teamLeadName"
                onChange={handleInputChange}
                width="100%"
              />

              <h1 className="text-red-600 font-semibold text-xs">
                {generalErrors.teamLeadName}
              </h1>
              <RegFormElement
                type="email"
                disabled={true}
                name={"Team Lead Email"}
                value={inputs.teamLeadEmail}
                id="teamLeadEmail"
                onChange={handleInputChange}
                width="100%"
              />
              <h1 className="text-red-600 font-semibold text-xs">
                {generalErrors.teamLeadEmail}
              </h1>

              <RegFormElement
                type="text"
                name={"Referral Code"}
                disabled={user?.referral_code !== "default" ? true : false}
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
                className="mx-auto"
                height={100}
                alt=""
              />
              <h1 className="mx-auto text-center font-semibold text-lg">
                Pay Now :{" "}
                <span className="font-semibold text-green-600">
                  ₹{" "}
                  {events! &&
                    events!.reduce(
                      (total: number, event: any) =>
                        total + parseInt(event.registration_fees),
                      0
                    ) - 100}{" "}
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
              {eventInputs.map((eventInput: any, eventIndex: number) => (
                <div key={eventIndex}>
                  <h1 className="font-semibold">
                    Add Team Participants for {eventInput.eventName}
                  </h1>
                  {eventInput.participants.map(
                    (participant: any, index: number) => (
                      <div
                        key={index}
                        className="flex flex-row items-center gap-10 flex-wrap border-2 text-sm px-10 py-2 pb-5 border-gray-200 rounded-lg"
                      >
                        <div className="flex flex-col items-start gap-2">
                          <label htmlFor="" className="font-semibold">
                            {index === 0 ? "Team Lead" : `Person ${index + 1}`}
                          </label>

                          <div className="flex flex-col items-start gap-3">
                            <div className="flex flex-row flex-wrap gap-2 font-semibold">
                              <label htmlFor="name">Name :</label>
                              <input
                                type="text"
                                id="name"
                                disabled={index === 0}
                                value={
                                  index === 0
                                    ? inputs.teamLeadName
                                    : participant.name
                                }
                                onChange={(e) =>
                                  handleNameChange(
                                    eventIndex,
                                    index,
                                    e.target.value
                                  )
                                }
                                className="w-full border-b border-black px-2 py-1 max-md:w-full focus:border-b bg-transparent"
                              />
                              {teamErrors && teamErrors[eventIndex] && (
                                <h1 className="text-red-600 font-semibold text-xs">
                                  {teamErrors[eventIndex].participantName}
                                </h1>
                              )}
                            </div>

                            <div className="flex flex-row flex-wrap gap-2 font-semibold">
                              <label htmlFor="phone">Phone :</label>
                              <input
                                type="text"
                                disabled={index === 0}
                                value={
                                  index === 0
                                    ? inputs.teamLeadPhone
                                    : participant.phone
                                }
                                onChange={(e) =>
                                  handlePhoneChange(
                                    eventIndex,
                                    index,
                                    e.target.value
                                  )
                                }
                                className="w-full border-b border-black px-2 py-1 max-md:w-full focus:border-b bg-transparent"
                              />
                              {teamErrors && teamErrors[eventIndex] && (
                                <h1 className="text-red-600 font-semibold text-xs">
                                  {teamErrors[eventIndex].participantPhone}
                                </h1>
                              )}
                            </div>
                          </div>
                        </div>

                        {eventInput.participants.length >
                          eventInput.minTeamMember && (
                          <button
                            onClick={() => removeParticipant(eventIndex, index)}
                            className="border-2 border-black rounded-full px-2 py-1 text-xs font-semibold"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    )
                  )}
                  {eventInput.participants.length <
                    eventInput.maxTeamMember && (
                    <button
                      onClick={() => addParticipant(eventIndex)}
                      className="font-semibold mt-1 text-xs border-2 border-black bg-black text-white px-5 py-2 rounded-full hover:bg-white hover:text-black"
                    >
                      Add Person
                    </button>
                  )}
                </div>
              ))}
            </div>
            <div className="flex flex-row items-center pt-5 flex-wrap justify-between w-full">
              <button
                className="border-2 mt-3 border-black px-5 py-1 rounded-full font-semibold bg-black text-white hover:bg-white hover:text-black"
                onClick={onClose}
              >
                Close
              </button>
              <button
                className="border-2 mt-3 border-black px-5 py-1 rounded-full font-semibold bg-black text-white hover:bg-white hover:text-black"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
          <Toaster position="bottom-right" richColors />
        </div>
      )}
    </>
  );
};

export default ComboRegForm;