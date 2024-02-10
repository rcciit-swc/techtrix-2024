"use client"
import { Heading } from "@/components/home";
import React from "react";
import { IoSearchSharp } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";
const page = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const onClose = () => setIsOpen(false);
  return (
    <div className="flex flex-col items-center mx-auto gap-5">
      <Heading text="Manage Events" />
      <div className="flex  md:flex-row w-[90%]  gap-2 mx-auto items-center justify-center flex-wrap">
        <input
          type="text"
          placeholder="Search for Events"
          className="w-[70%] border-2 border-black rounded-full py-4 px-4"
        />
        <IoSearchSharp className="w-10 h-10" />
        <button  className="flex flex-row items-center font-semibold border-2 border-black px-5 py-2 hover:bg-white hover:text-black rounded-xl bg-black text-white gap-2 text-xl ">
          <FaPlus />
          <Link href={"/admin/manage-events/add-event"}>Add Event</Link>
        </button>

        <div className="border-2 border-black rounded-xl flex flex-row flex-wrap-reverse items-start px-5 py-5 gap-10 justify-between w-[80%]">
      <div className="flex flex-col items-start gap-5 font-semibold">
        <h1 className="text-3xl  tracking-wider">Event Name</h1>
        <h1>Category: AUTOMATA</h1>
        <div className="flex flex-row items-center gap-2 w-full justify-between flex-wrap">
          <h1>Date: 12th March, 2024</h1>
          <h1>Time: 12 PM</h1>
        </div>
        <div className="flex flex-row items-center gap-2 w-full justify-between flex-wrap">
          <h1>Fees: 400 /-</h1>
          <h1>Prize : 2000 /-</h1>
        </div>
        <h1>Venue: Baranagar</h1>

        <p>
          Description: <br />
          <span className="font-medium">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Perferendis minima optio repellendus eaque, totam reiciendis
            quisquam voluptatem adipisci maiores nemo aliquid enim provident at
            laudantium excepturi, eos asperiores, quaerat inventore sapiente
            aspernatur.
          </span>
        </p>
        <button className="border-2 border-black px-5 py-1 rounded-full bg-black text-white hover:bg-white hover:text-black">
          View Rules
        </button>
        {/* <h1>Coordinators:</h1>
        <div className='flex flex-col items-center gap-2 -mt-3 flex-semibold'>
        <h1>John Doe : +91 8337045160</h1>
        <h1>Jane Doe : +91 8337045160</h1>
        </div> */}
      </div>
      <img src={"/valorant.jpg"} alt="" className="w-80" height={0} width={0} />
    </div>
      </div>
      {isOpen && <RulesModal isOpen={isOpen} onClose={onClose} />}
    </div>
  );
};


const RulesModal = ({
  isOpen,
  onClose,
  
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
   
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Add Coordinator</h2>
            
          </div>
        </div>
      )}
    </>
  );
};

export default page;