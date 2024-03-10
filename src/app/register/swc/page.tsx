"use client";
import ApproveModal from "@/components/admin/ApproveModal";
import FormElement from "@/components/admin/FormElement";
import { Heading } from "@/components/home";
import { supabase } from "@/lib";
import { getRegistrations } from "@/utils/functions/getRegistrations";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { PuffLoader } from "react-spinners";

const Page = () => {
  const [loading, setLoading] = useState(true);
  const [swcDetails, setSWCDetails] = useState<any>(null);
  const [inputs, setInputs] = useState({
    email: "",
    roll: "",
  });
  useEffect(() => {
    const getSWCDetails = async () => {
      const { data, error } = await supabase.from("swc").select("*");

      const updatedSWCDetails = await Promise.all(
        data!.map(async (swc: any) => {
          const { data: swcData, error: swcError }: { data: any; error: any } =
            await supabase.from("users").select("*").eq("email", swc.email);

          if (swcData && swcData.length > 0) {
            swc["registered"] = true;
            swc["name"] = swcData[0].name || "No Login";
            swc["phone"] = swcData[0].phone || "No Login";
          } else {
            swc["registered"] = false;
            swc["name"] = "Not Registered";
            swc["phone"] = "Not Registered";
          }

          return swc;
        })
      );

      setSWCDetails(updatedSWCDetails);
      setLoading(false);
    };

    getSWCDetails();
  }, []);

  const [filteredResults, setFilteredResults] = useState<any>([]);
  useEffect(() => {
    const filteredResults =
      swcDetails! &&
      swcDetails!.filter(
        (registration: any) =>
          registration.email
            .toLowerCase()
            .includes(inputs.email.toLowerCase()) &&
          registration.roll.toLowerCase().includes(inputs.roll.toLowerCase())
      );
    setFilteredResults(filteredResults);
  }, [swcDetails, inputs]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | any>
  ) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };
  return (
    <div className="w-full mx-auto  flex flex-col items-center gap-5 ">
      <Heading text="SWC Dashboard " />
      <div className="flex flex-row items-center gap-5 w-[90%] md:w-full justify-center  flex-wrap">
        <FormElement
          name="Email"
          value={inputs.email}
          type="email"
          id="email"
          onChange={handleInputChange}
          width="1/3"
        />
        <FormElement
          name="Roll"
          value={inputs.roll}
          type="text"
          id="roll"
          onChange={handleInputChange}
          width="1/3"
        />
      </div>

      <div className="flex flex-row flex-wrap font-semibold items-center text-center text-sm md:text-2xl gap-3  md:gap-10 justify-center"></div>
      {loading ? (
        <div className="min-h-[60vh] flex flex-col justify-center items-center">
          <PuffLoader size={40} color="#000" />{" "}
        </div>
      ) : (
        <div className="overflow-x-auto px-3 w-full mx-auto">
          <table className="w-full oveflow-x-auto table-auto border border-gray-300 rounded-xl">
            <thead>
              <tr className="text-center">
                <th>Sl. No.</th>

                <th>Email</th>
                <th>Roll</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Registered</th>
              </tr>
            </thead>
            <tbody>
              {filteredResults! &&
                filteredResults!.map((swc: any, index: number) => {
                  return (
                    <>
                      <tr
                        key={index}
                        className={
                          "bg-green-100 text-green-500 font-semibold text-center text-sm"
                        }
                      >
                        <td className="border  border-gray-300 px-4 py-3">
                          {index + 1}
                        </td>
                        <td className="border  border-gray-300 px-4 py-2">
                          {swc.email}
                        </td>
                        <td className="border  border-gray-300 px-4 py-2">
                          {swc.roll}
                        </td>
                        <td
                          className={`${
                            swc.name === "Not Registered" ||
                            swc.name === "No Login"
                              ? "text-red-500"
                              : "text-green-500"
                          } border  border-gray-300 px-4 py-2`}
                        >
                          {swc.name}
                        </td>
                        <td
                          className={`${
                            swc.phone === "Not Registered" ||
                            swc.phone === "No Login"
                              ? "text-red-500"
                              : "text-green-500"
                          } border  border-gray-300 px-4 py-2`}
                        >
                          {swc.phone}
                        </td>
                        <td
                          className={`${
                            !swc.registered ? "text-red-500" : "text-green-500"
                          } border  border-gray-300 px-4 py-2`}
                        >
                          {swc.registered ? "Yes" : "No"}
                        </td>
                      </tr>
                    </>
                  );
                })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Page;
