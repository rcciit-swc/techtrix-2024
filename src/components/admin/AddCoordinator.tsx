"use client";
import React, { useEffect, useState } from "react";
import FormElement from "./FormElement";
import SelectInput from "./SelectInput";
import { supabase } from "@/lib";
import { addCoordinator } from "@/utils/functions/addCoordinator";
import { getCategories } from "@/utils/functions/getCategories";
import { Toaster, toast } from "sonner";

const AddCoordinator = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [inputs, setInputs] = useState({
    email: "",
    event: "",
  });
  const [events, setEvents] = useState<any>([]);
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | any
    >
  ) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
    // console.log(name, value);
  };

  useEffect(() => {
    const getEventDetails = async () => {
      const res = await supabase
        .from("events")
        .select("id, event_name")
        .eq("fest_name", "Techtrix");
      setEvents(res.data?.map((event: any) => event.event_name));
    };
    getEventDetails();
  }, [isOpen]);

  const submitCoordinator = async () => {
    if (inputs.email === "" || inputs.event === "") {
      toast.error("Fill all fields !");
    }

    await addCoordinator(inputs);
    toast.success("Coordinator Added !");
    onClose();
  };
  return (
    <>
      {isOpen && (
        <div className="fixed  inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[50]">
          <div className="bg-gray-100 w-[90%] md:w-1/3 p-4 rounded-lg relative   flex flex-col items-start  ">
            <div className="w-full flex flex-row mb-2 items-center justify-between">
              <h2 className="text-lg font-semibold">Coordinator Addition</h2>

              <h2
                onClick={onClose}
                className="bg-black md:py-2 md:px-3 px-2 py-1 hover:bg-white hover:text-black border-2 border-black  text-white text-sm font-semibold rounded-full cursor-pointer"
              >
                X
              </h2>
            </div>
            {/* <h1 className="text-red-600 font-semibold text-xs mb-2">
              {
                "This feature is currently under production, please don't use it !"
              }
            </h1> */}

            <div className="flex flex-col items-start gap-2 my-2 w-full">
              <SelectInput
                options={events}
                onChange={(e) => {
                  handleInputChange(e);
                }}
                value={inputs.event}
                name="Choose Event"
                id="event"
              />
              <FormElement
                name="Email"
                value={inputs.email}
                type="email"
                id="email"
                onChange={(e: any) => handleInputChange(e)}
              />
            </div>
            <div className="flex flex-row flex-wrap justify-between w-full">
              <button
                className="border-2 mt-3 border-black px-5 py-1 rounded-full font-semibold bg-black text-white hover:bg-white hover:text-black"
                onClick={submitCoordinator}
              >
                Submit
              </button>
              <button
                className="border-2 mt-3 border-black px-5 py-1 rounded-full font-semibold bg-black text-white hover:bg-white hover:text-black"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      <Toaster richColors position="bottom-right" />
    </>
  );
};

export default AddCoordinator;
