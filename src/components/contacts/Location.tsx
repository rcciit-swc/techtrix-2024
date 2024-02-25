"use client"
import React from "react";
import Image from "next/image";

import { locations } from "@/utils/constants/location";

const Location = () => {
  return (
    <div className="flex flex-col items-start gap-10">
      <h1 className="font-got text-2xl tracking-wider text-primary lg:px-10">
        Locations
      </h1>
      <div className="mx-auto flex w-[90%] flex-col gap-10 ">

            <div>
              <div className="text-md flex flex-row gap-2 lg:px-8">
                <Image
                  src="/assets/contacts/redpin.svg"
                  height={0}
                  width={0}
                  className="w-8 lg:w-12"
                  alt="location"
                />
                <p>
                Canal S Rd, Beleghata, Kolkata, West Bengal 700015
                
                  <br />
                RCC Institute of Information Technology.
                </p>
              </div>
              <iframe
                className="mx-auto h-[300px] w-[90%] rounded-md lg:h-[500px]"
                loading="lazy"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.5625612568942!2d88.39410617493672!3d22.558053579502076!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a02768400b479b1%3A0x5ad44b718c770205!2sRCC%20INSTITUTE%20OF%20INFORMATION%20TECHNOLOGY%20(New%20Campus)!5e0!3m2!1sen!2sin!4v1708893522232!5m2!1sen!2sin"
              ></iframe>
            </div>
         
      </div>
    </div>
  );
};

export default Location;