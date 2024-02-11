"use client";
import { Heading } from "@/components/home";
import React, { useEffect, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import Link from "next/link";
import EventPreview from "@/components/admin/EventPreview";
import { getEvents } from "@/utils/functions/getEvents";
import AddCoordinator from "@/components/admin/AddCoordinator";

const Page = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const [events, setEvents] = useState<any>([]);
  useEffect(() => {
    const fetchEvents = async () => {
      const data = await getEvents();
      setEvents(data);
    };
    fetchEvents();
  }, []);
  return (
    <div className="flex flex-col items-center mx-auto gap-5">
      <Heading text="Manage Events" />
      <div className="flex  md:flex-row w-full md:w-[90%]  gap-2 mx-auto items-center justify-center flex-wrap">
        <div className="w-full px-2 md:w-[60%] flex flex-row items-center gap-2">
          <input
            type="text"
            placeholder="Search for Events"
            className="w-full  border-2 border-black rounded-full py-4 px-4"
          />
          <IoSearchSharp className="w-10 h-10" />
        </div>

        <button className="flex flex-row items-center font-semibold border-2 border-black px-5 py-2 hover:bg-white hover:text-black rounded-xl bg-black text-white gap-2 text-xl ">
          <FaPlus />
          <Link href={"/admin/manage-events/add-event"}>Add Event</Link>
        </button>
        <button
          onClick={() => setIsOpen(true)}
          className="flex flex-row items-center font-semibold border-2 border-black px-5 py-2 hover:bg-white hover:text-black rounded-xl bg-black text-white gap-2 text-xl "
        >
          <FaPlus />
          Add Coordinator
        </button>

        <EventPreview events={events} />
      </div>
      {isOpen ? <AddCoordinator isOpen={isOpen} onClose={onClose} /> : null}
    </div>
  );
};

export default Page;
