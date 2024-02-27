"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import FormElement from "../admin/FormElement";
import { supabase, useUser } from "@/lib";
import { validateUserReg } from "@/utils/functions/validate";
import RegFormElement from "../events/RegFormElement";

const UserRegForm = () => {
  const user = useUser((state) => state.user);
  const [inputs, setInputs] = useState({
    name: "",
    phone: "",
    roll: "",
    college: "",
    gender: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    college: "",
    roll: "",
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
      const validation = validateUserReg(inputs);

      const allFieldsEmpty = Object.values(validation).every(
        (value) => value === ""
      );
      if (allFieldsEmpty) {
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
       
        router.push("/events");
        router.refresh();
        toast.success("Registration Successful");
      }
      if (!allFieldsEmpty) {
        setErrors(validation);
        toast.error("Fill all the fields accurately !");
        return;
      }
    } catch (error) {
      console.log("Error occurred", { error });
    }
  };

  useEffect(() => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      name: user?.name!,
      phone: user?.phone!,
      roll: user?.college_roll!,
      college: user?.college!,
      gender: user?.gender!,
    }));
  }, [user]);

  return (
    <div className="flex flex-col w-full justify-center  bg-indigo-50 border rounded-xl gap-10 p-10">
      <RegFormElement
        name="Name"
        value={inputs.name}
        type="text"
        id={"name"}
        width="100%"
        onChange={handleInputChange}
      />
      {errors.name && (
        <h1 className="text-red-600 font-semibold text-xs">{errors.name}</h1>
      )}
      <div className="flex flex-row items-end gap-2">
        <div className="border border-black p-2 rounded-xl text-lg bg-white font-semibold">
          +91
        </div>
        <RegFormElement
          name="Phone"
          value={inputs.phone}
          type="text"
          id={"phone"}
          width="100%"
          onChange={handleInputChange}
        />
      </div>

      {errors.phone && (
        <h1 className="text-red-600 font-semibold text-xs">{errors.phone}</h1>
      )}
      <RegFormElement
        name="Email"
        value={user?.email!}
        type="text"
        id={"email"}
        disabled={true}
        width="100%"
        onChange={handleInputChange}
      />

      <RegFormElement
        name="College"
        value={inputs.college}
        type="text"
        id="college"
        width="100%"
        onChange={handleInputChange}
      />
      {errors.college && (
        <h1 className="text-red-600 font-semibold text-xs">{errors.college}</h1>
      )}
      <RegFormElement
        name="College Roll"
        value={inputs.roll}
        type="text"
        id="roll"
        width="100%"
        onChange={handleInputChange}
      />
      <h1 className="text-red-600 font-semibold text-xs">{errors.roll}</h1>
      <div className="flex flex-row px-3 flex-wrap items-center md:gap-5  font-semibold">
        <label htmlFor="gender">Gender : </label>
        <div className="flex flex-row flex-wrap items-center max-md:justify-between w-full  gap-10  md:items-center md:gap-16 ">
          <label className="flex flex-row items-center gap-1">
            <input
              name="gender"
              type="radio"
              value="male"
              className="text-black bg-black"
              checked={inputs.gender === "male"}
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
              className="text-black bg-black"
              checked={inputs.gender === "female"}
              onChange={handleInputChange}
              required={true}
            />
            Female
          </label>
        </div>
      </div>
      {errors.gender && (
        <h1 className="text-red-600 font-semibold text-xs">{errors.gender}</h1>
      )}
      <button
        onClick={handleSubmit}
        className="bg-black px-10 py-2 hover:bg-white hover:text-black border border-black rounded-xl md:w-1/3 mx-auto text-white font-semibold"
      >
        Submit
      </button>
      <Toaster position="bottom-right" richColors duration={4000} />
    </div>
  );
};

export default UserRegForm;
