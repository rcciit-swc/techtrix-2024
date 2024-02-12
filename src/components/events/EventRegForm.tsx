import { useMemo, useState } from "react";
import FormElement from "../admin/FormElement";
import { eventReg } from "@/utils/functions/eventReg";
import { useParams } from "next/navigation";
import { getEventInfo } from "@/utils/functions/getEventsInfo";

const EventRegForm = ({
    isOpen,
    onClose,
  }: {
    isOpen: boolean;
    onClose: () => void;
  }) => {
    const event = decodeURIComponent(useParams().event.toLocaleString());
    const [inputs, setInputs] = useState<any>({
        teamName: '',
        transactionId: '',
        transactionSSfileName: '',
        teamLeadPhone: '',
        teamLeadEmail: '',
    })
    const [file, setFile] = useState<any>(null)
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | any>) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        setInputs((prevInputs:any) => ({
            ...prevInputs,
            transactionSSfileName: selectedFile.name,
        }));
    };
    const [eventInfo,setEventInfo] = useState<any>();
    useMemo(()=>{
        const getEvent = async ()=>{
            const res = await getEventInfo(event);
            setEventInfo(res![0])
        }
        getEvent();
        console.log(eventInfo)
    },[event])
    const minTeamMember = eventInfo?.min_team_member!;
    const maxTeamMember = eventInfo?.max_team_member!;
    const [participants, setParticipants] = useState<any>(
      generateBlankParticipants(minTeamMember)
    );
    function generateBlankParticipants(count: number) {
      const blankParticipants = [];
      for (let i = 0; i < count; i++) {
        blankParticipants.push({ phone: "", email: "" });
      }
      return blankParticipants;
    }
    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | any>,
      ) => {
        const { name, value } = e.target;
        setInputs((prevInputs:any) => ({
          ...prevInputs,
          [name]: value,
        }));
      };

      const handleEmailChange = (index: number, value: string) => {
        const updatedParticipants = [...participants];
        updatedParticipants[index].email = value;
        setParticipants(updatedParticipants);
      };
    
      const handlePhoneChange = (index: number, value: string) => {
        const updatedParticipants = [...participants];
        updatedParticipants[index].phone = value;
        setParticipants(updatedParticipants);
      };
    
      const addParticipant = () => {
        setParticipants([...participants, { phone: '', email: '' }]);
      };
      const removeParticipant = (index: number) => {
        const updatedParticipants = [...participants];
        updatedParticipants.splice(index, 1);
        setParticipants(updatedParticipants);
      };

      const validateInput = (inputName: string, inputValue: string) => {
        const errors: { [key: string]: string } = {};
        const regexPatterns: { [key: string]: RegExp } = {
          teamName: /^[a-zA-Z\s]+$/,
          transactionId: /^\d{6}$/,
          teamLeadPhone: /^\d{10}$/,
          teamLeadEmail: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        };
    
        if (!regexPatterns[inputName].test(inputValue)) {
          errors[inputName] = "Invalid input";
        }
    
        return errors;
      };


     
    return (
      <>
        {isOpen && (
          <div className="fixed  inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[50]">
            <div className={`bg-gray-100 p-4 rounded-lg ${maxTeamMember>1 ? "h-[80vh] md:h-[60vh]":"h-auto"}  w-[95%] flex flex-col items-start lg:w-[40%] `}>
              <div className="w-full flex flex-row mb-2 items-center justify-between">
                <h2 className="text-sm lg:text-lg font-semibold">Registration of Event</h2>
                <h2
                  onClick={onClose}
                  className="bg-black md:py-2 md:px-3 px-2 py-1 hover:bg-white hover:text-black border-2 border-black  text-white text-sm font-semibold rounded-full cursor-pointer"
                >
                  X
                </h2>
              </div>
  
             <div className="flex w-full overflow-x-hidden flex-col items-start gap-4 overflow-y-scroll text-sm lg:text-lg">
                <FormElement type="text" name={maxTeamMember > 1 ? "Team Name" : "Name"} value={inputs.teamName} id="teamName" onChange={handleInputChange} />
                <FormElement type="number" name={maxTeamMember>1 ? "Team Lead Phone":"Phone"} value={inputs.teamLeadPhone} id="teamLeadPhone" onChange={handleInputChange} />
                <FormElement type="email" name={maxTeamMember>1 ? "Team Lead Email":"Email"} value={inputs.teamLeadEmail} id="teamLeadEmail" onChange={handleInputChange} />
                <FormElement type="text" name="Transaction Id" value={inputs.transactionId} id="transactionId" onChange={handleInputChange} />
                <div className="flex flex-row gap-2 flex-wrap items-center">
                    <label htmlFor="transactionSSfileName" className="font-semibold">Payment Screenshot</label>
                <input type="file" id="transactionSSfileName" className="font-semibold"  onChange={handleFileChange} /> 
                </div>
                
               {maxTeamMember>1 && <div className="flex flex-col items-center gap-5">
                    <h1 className="font-semibold">Add Team Participants</h1>
                    {participants.map((participant: any, index: number) => (
        <div key={index} className="flex flex-row   items-center gap-10 flex-wrap border-2 border-black px-10 py-2 rounded-lg">
            <div className="flex flex-col  items-start gap-2">
            <label htmlFor="" className="font-semibold">Person {index+1}</label>
           
           <div className="flex flex-col items-start gap-3">
           <div className="flex flex-row flex-wrap gap-2 font-semibold">
                <label htmlFor="email">Email :</label>
            <input
            type="text"
            id="email"
            value={participant.email}
            onChange={(e) => handleEmailChange(index, e.target.value)}
            className="border-black px-2 py-1 max-md:w-full rounded-lg"
            placeholder="Email"
          />
            </div>
          
            <div className="flex flex-row flex-wrap gap-2 font-semibold">
                <label htmlFor="phone">Phone :</label>
                <input
            type="text"
            value={participant.phone}
            onChange={(e) => handlePhoneChange(index, e.target.value)}
            className="border-black px-2 py-1 max-md:w-full rounded-lg"
            placeholder="Phone"
          />
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
                    className="font-semibold border-2 border-black bg-black text-white px-5 py-2 rounded-full hover:bg-white hover:text-black"
                  >
                    Add Person
                  </button>
                )}
     
                </div>}


             </div>
             <div className="flex flex-row items-center flex-wrap justify-between w-full">
             <button
                className="border-2 mt-3 border-black px-5 py-1 rounded-full font-semibold bg-black text-white hover:bg-white hover:text-black"
                onClick={onClose}
              >
                Close
              </button>
              <button
              
                className="border-2 mt-3 border-black px-5 py-1 rounded-full font-semibold bg-black text-white hover:bg-white hover:text-black"
                onClick={()=> eventReg(inputs, participants, file, event)}
              >
                Submit
              </button>
             </div>
             
            </div>
          </div>
        )}
      </>
    );
  };


  export default EventRegForm;