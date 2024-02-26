"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import FormElement from "../admin/FormElement";
import { supabase, useUser } from "@/lib";

const UserRegForm = () => {
  const user = useUser((state) => state.user);
  const [inputs, setInputs] = useState({
    name: "",
    phone: "",
    roll: "",
    college: "",
    gender: "",
  });

  const router = useRouter();
  // console.log(inputs);
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | any>
  ) => {
    const { name, value } = e.target;
    setInputs((prevInputs: any) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const { error } = await supabase
        .from("users")
        .update({
          name: inputs.name,
          college: inputs.college,
          phone: inputs.phone,
          gender: inputs.gender,
          college_roll: inputs?.roll!,
        })
        .eq("id", user?.id);
      if (error) {
        error.message.includes("duplicate key value")
          ? toast.error("Phone number already registered")
          : toast.error("There was an error submitting the form");
        throw error;
      }
      toast.success("Form submitted successfully.");
      router.push("/events");
    } catch (error) {
      // console.log("Error occurred", { error });
    }
  };
  return (
    <div className="flex flex-col w-full bg-indigo-50 border rounded-xl gap-10 p-10">
      <FormElement
        name="Name"
        value={inputs.name}
        type="text"
        id={"name"}
        width="80%"
        onChange={handleInputChange}
      />
      <FormElement
        name="Phone"
        value={inputs.phone}
        type="text"
        id={"phone"}
        width="80%"
        onChange={handleInputChange}
      />
      <FormElement
        name="Email"
        value={user?.email!}
        type="text"
        id={"email"}
        disabled={true}
        width="80%"
        onChange={handleInputChange}
      />
      <FormElement
        name="College"
        value={inputs.college}
        type="text"
        id="college"
        width="60%"
        onChange={handleInputChange}
      />
      <FormElement
        name="College Roll"
        value={inputs.roll}
        type="text"
        id="roll"
        width="60%"
        onChange={handleInputChange}
      />
      <div className="flex flex-row flex-wrap items-center md:gap-5  font-semibold">
        <label htmlFor="gender">Gender : </label>
        <div className="flex flex-row flex-wrap items-center max-md:justify-between w-full  gap-10  md:items-center md:gap-16 ">
          <label className="flex flex-row items-center gap-1">
            <input
              name="gender"
              type="radio"
              value="male"
              className="text-black"
              checked={inputs.gender === "Male"}
              onChange={handleInputChange}
              required={true}
            />
            Male
          </label>
          <label className="flex flex-row items-center gap-1">
            <input
              name="gender"
              type="radio"
              value="female"
              className="text-black"
              checked={inputs.gender === "Female"}
              onChange={handleInputChange}
              required={true}
            />
            Female
          </label>
        </div>
      </div>
      <button
        onClick={handleSubmit}
        className="bg-black px-10 py-2 hover:bg-white hover:text-black border border-black rounded-xl md:w-1/3 mx-auto text-white font-semibold"
      >
        Submit
      </button>
    </div>
  );
};

export default UserRegForm;
