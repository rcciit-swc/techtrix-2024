import { Heading } from "@/components/home";
import UserRegForm from "@/components/home/UserRegForm";

import React from "react";

const Page = () => {
  return (
    <div className="flex flex-col md:w-[40%] items-center justify-center gap-10  mx-auto">
      <Heading text="Registration" />
      <UserRegForm />
    </div>
  );
};

export default Page;
