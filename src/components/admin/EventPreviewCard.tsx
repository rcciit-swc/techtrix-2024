"use client";
import { useEffect, useState } from "react";
import RulesModal from "./RulesModal";

const EventPreviewCard = ({ event }: { event: any }) => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  return (
    <>
      <div className="border-2 border-black rounded-xl flex flex-col-reverse lg:flex-row  items-center lg:items-start px-5 py-5 gap-10 justify-between w-[95%] mx-1 md:w-[80%]">
        <div className="flex flex-col items-start gap-5 font-semibold">
          <h1 className="text-3xl  tracking-wider">{event.event_name}</h1>
          <h1>Category: {event.event_categories.name}</h1>
          <div className="flex flex-row items-center gap-2 md:gap-10 w-full justify-between flex-wrap">
            <h1>Date: {event.date}</h1>
            <h1>Time: {event.time}</h1>
          </div>
          <div className="flex flex-row items-center gap-2 w-full justify-between flex-wrap">
            <h1>Fees: {event.registration_fees} /-</h1>
            <h1>Prize : {event.prize} /-</h1>
          </div>

          <div className="flex flex-col items-start gap-2 w-full justify-between flex-wrap">
            <h1>Minimum Team Size : {event.min_team_member} /-</h1>
            <h1>Maximum Team Size : {event.max_team_member} /-</h1>
          </div>

          <div>
            Description: <br />
            <div
              className="font-medium "
              dangerouslySetInnerHTML={{ __html: event.desc }}
            ></div>
          </div>

          <button
            onClick={() => setIsOpen(true)}
            className="border-2 border-black px-5 py-1 rounded-full bg-black text-white hover:bg-white hover:text-black"
          >
            View Rules
          </button>
          {/* <h1>Coordinators:</h1>
  <div className='flex flex-col items-center gap-2 -mt-3 flex-semibold'>
  <h1>John Doe : +91 8337045160</h1>
  <h1>Jane Doe : +91 8337045160</h1>
  </div> */}
        </div>
        <img
          src={event.event_image_url}
          alt=""
          className="w-80"
          height={0}
          width={0}
        />
      </div>
      <RulesModal isOpen={isOpen} onClose={onClose} rules={event.rules} />
    </>
  );
};



export default EventPreviewCard;
