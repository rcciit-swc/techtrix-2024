"use client";
import FormElement from "@/components/admin/FormElement";
import SelectInput from "@/components/admin/SelectInput";
import { Heading } from "@/components/home";
import { supabase } from "@/lib";
import { coordinatorType, eventInputType } from "@/types/events";
import { addEvent } from "@/utils/functions";
import { getCategories } from "@/utils/functions/getCategories";
import { updateEvent } from "@/utils/functions/updateEvent";
import dynamic from "next/dynamic";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { toast } from "sonner";

const page = () => {
  const eventId = useParams().event.toLocaleString();
  const [event, setEvent] = useState<any>([]);
  useEffect(() => {
    const fetchEvent = async () => {
      const { data } = await supabase
        .from("events")
        .select("*,event_categories(name),roles(id)")
        .eq("id", eventId);

      setEvent(data![0]);
      if (data && data.length > 0) {
        setInputs((prevInputs) => ({
          ...prevInputs,
          name: data![0].event_name,
          description: data![0].desc,
          category: data![0].event_categories.name,
          date: data![0].date,
          time: data![0].time,
          minTeamSize: data![0].min_team_member,
          maxTeamSize: data![0].max_team_member,
          coordinators: [],
          price: data![0].registration_fees,
          prize: data![0].prize,
          rules: data![0].rules,
          imagePath: data![0].event_image_url,
        }));
      }
    };
    fetchEvent();
  }, [eventId]);
  const router = useRouter();
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );

  const [categories, setCategories] = useState<any>([]);
  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategories();
      console.log(data);
      setCategories(data?.map((category: any) => category.name));
    };
    fetchCategories();
  }, []);
  
  const [inputs, setInputs] = useState<eventInputType>({
    name: event?.event_name,
    description: "",
    category: "",
    date: "",
    time: "",
    minTeamSize: 1,
    maxTeamSize: 1,
    coordinators: [],
    price: "",
    prize: "",
    rules: "",
    imagePath: "",
  });
  const [error, setError] = useState("");
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | any>
  ) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };
  console.log(inputs);
  const handleQuillChange = (value: string, name: string) => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const handleAddCoordinator = (coordinator: coordinatorType) => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      coordinators: [...prevInputs.coordinators, coordinator],
    }));
  };
  const handleRemoveCoordinator = (index: number) => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      coordinators: prevInputs.coordinators.filter((_, idx) => idx !== index),
    }));
  };
  const [isCoordinatorFormOpen, setIsCoordinatorFormOpen] = useState(false);
  const openCoordinatorForm = () => {
    setIsCoordinatorFormOpen(true);
  };

  const closeCoordinatorForm = () => {
    setIsCoordinatorFormOpen(false);
  };

  const submitEvent = async () => {
    await updateEvent(inputs,eventId);
    toast.success("Event Updated Successfully !");
    router.push("/admin/manage-events");
  }
  return (
    <div className="flex flex-col items-center justify-center gap-5 w-[90%] md:w-[80%] mx-auto overflow-x-hidden">
      <Heading text={`Edit Event: ${event?.event_name}`} />
      <div className="mx-auto border-2 border-black rounded-xl bg-gray-100 flex flex-col  flex-wrap gap-10 w-full px-2 py-5  md:px-10 md:py-10">
        <div className=" flex flex-row items-center gap-8 md:gap-20 flex-wrap justify-start w-full  ">
          {/* <FormElement
            name="Category"
            value={inputs.category}
            id="category"
            onChange={(e: any) => handleInputChange(e)}
            type="text"
          /> */}

          <h1 className="text-lg font-semibold">Category: {inputs.category}</h1>
          {/* <h1 className="text-red-500">
            Use Only in case if you want to change category
          </h1> */}
          {/* <SelectInput
            name="Category"
            id="category"
            value={inputs.category}
            onChange={(e) => handleInputChange(e)}
            options={categories}
          /> */}
          <FormElement
            name="Event Name"
            value={inputs.name}
            id="name"
            onChange={(e: any) => handleInputChange(e)}
            type="text"
          />
          <FormElement
            name="Date"
            value={inputs.date}
            id="date"
            onChange={(e: any) => handleInputChange(e)}
            type="text"
          />
          <FormElement
            name="Time"
            value={inputs.time}
            id="time"
            onChange={(e: any) => handleInputChange(e)}
            type="text"
          />
          <FormElement
            name="Registration Fees"
            value={inputs.price}
            id="price"
            onChange={(e: any) => handleInputChange(e)}
            type="text"
          />
          <FormElement
            name="Prize Pool"
            value={inputs.prize}
            id="prize"
            onChange={(e: any) => handleInputChange(e)}
            type="text"
          />
          <FormElement
            name="Min Team Size"
            value={inputs.minTeamSize.toString()}
            id="minTeamSize"
            onChange={(e: any) => handleInputChange(e)}
            type="number"
          />
          <FormElement
            name="Max Team Size"
            value={inputs.maxTeamSize.toString()}
            id="maxTeamSize"
            onChange={(e: any) => handleInputChange(e)}
            type="number"
          />
          {/* <FormElement
            name="Venue"
            value={inputs.venue}
            id="venue"
            onChange={(e: any) => handleInputChange(e)}
            type="text"
          /> */}
          <FormElement
            name="Image Path"
            value={inputs.imagePath}
            id="imagePath"
            onChange={(e: any) => handleInputChange(e)}
            type="text"
          />
        </div>
        <div className="w-full flex flex-col lg:flex-row max-md:flex-wrap items-center gap-5">
          <div className="w-full lg:w-1/2 flex flex-col gap-5">
            <div className="flex flex-col items-start gap-1 w-full md:gap-5 flex-wrap justify-start">
              <label
                htmlFor={"description"}
                className="font-semibold md:text-xl"
              >
                Description :
              </label>
              <ReactQuill
                theme="snow"
                value={inputs.description}
                className="w-full border-2 border-black"
                onChange={(value) => handleQuillChange(value, "description")}
              />
            </div>

            <div className="flex flex-col items-start gap-1 w-full md:gap-5 flex-wrap justify-start">
              <label
                htmlFor={"description"}
                className="font-semibold md:text-xl"
              >
                Rules :
              </label>
              <ReactQuill
                theme="snow"
                value={inputs.rules}
                className="w-full border-2 border-black"
                onChange={(value) => handleQuillChange(value, "rules")}
              />
            </div>
          </div>
          <div className="w-full lg:w-1/2 text-center flex flex-col gap-3">
            {inputs.coordinators.length == 0 ? (
              <h1>No Coordinators Added yet !</h1>
            ) : (
              <div>
                <h2 className="font-semibold text-xl ">Coordinators</h2>
                <ul className="flex flex-col items-center gap-2">
                  {inputs.coordinators.map((coordinator, index) => (
                    <li
                      key={index}
                      className="border-2 border-black rounded-xl px-2 py-1"
                    >
                      <p className="text-black font-semibold text-lg">
                        {index + 1}. {coordinator.name}
                      </p>
                      <p className="text-black font-semibold text-lg">
                        {coordinator.phone}
                      </p>
                      <button
                        onClick={() => handleRemoveCoordinator(index)}
                        className="text-red-500 border-red-500 border-2 mt-3 rounded-full px-2  font-semibold"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <button
              onClick={openCoordinatorForm}
              className="font-semibold md:w-1/2 mx-auto text-sm md:text-lg border-2 border-black rounded-full  px-2  py-1"
            >
              ADD COORDINATOR
            </button>
            <h1 className="text-red-600 font-semibold text-xs">
              This feature is optional ! You can add coordinators seperately
              later.
            </h1>
          </div>
        </div>
        <p className="text-red-500 font-semibold text-lg">{error}</p>

        <button
          onClick={submitEvent}
          className=" md:text-xl border-2 font-semibold border-black w-1/2 md:w-1/3 mx-auto rounded-full px-2 py-1 text-black"
        >
          Submit Changes
        </button>
      </div>

      <CoordinatorForm
        isOpen={isCoordinatorFormOpen}
        onClose={closeCoordinatorForm}
        onAddCoordinator={handleAddCoordinator}
      />
    </div>
  );
};

const CoordinatorForm = ({
  isOpen,
  onClose,
  onAddCoordinator,
}: {
  isOpen: boolean;
  onClose: () => void;
  onAddCoordinator: (coordinator: coordinatorType) => void;
}) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const handleSubmit = () => {
    if (name && phone) {
      onAddCoordinator({ name, phone, email });
      setName("");
      setPhone("");
      onClose();
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Add Coordinator</h2>
            <div className="flex flex-col gap-4">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                className="border-black px-2 py-1 rounded-xl"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="border-black px-2 py-1 rounded-xl"
              />
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone"
                className="border-black  px-2 py-1 rounded-xl"
              />
              <div className="flex justify-end">
                <button
                  onClick={onClose}
                  className="bg-gray-300 px-4 py-2 rounded-md mr-2"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default page;
