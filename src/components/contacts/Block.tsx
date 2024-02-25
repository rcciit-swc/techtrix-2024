"use client";
import { useState } from "react";
import { IoLocationSharp } from "react-icons/io5";
import { BsPeopleFill } from "react-icons/bs";
import Committee from "./Committee";
import Location from "./Location";

const Block = () => {
  const [selected, setSelected] = useState(true);
  return (
    <div className="flex flex-col items-start mx-auto w-[90%] lg:w-1/2">
      <div className="flex flex-row items-center gap-3">
        <div
          className={`${
            selected && "bg-black text-white"
          } border-2 px-5 py-3 hover:bg-slate-200 hover:text-black cursor-pointer rounded-xl`}
          onClick={() => setSelected(true)}
        >
          <IoLocationSharp size={24} />
        </div>
        <div
          className={`${
            !selected && "bg-black text-white"
          } border-2 px-5 py-3 hover:bg-slate-200 hover:text-black  cursor-pointer rounded-xl`}
          onClick={() => setSelected(false)}
        >
          <BsPeopleFill size={24} />
        </div>
      </div>
      <div className="rounded-md border border-black bg-indigo-50 px-5 py-10 lg:px-10 lg:py-20 w-full">
        {selected ? <Location /> : <Committee />}
      </div>
    </div>
  );
};

export default Block;
