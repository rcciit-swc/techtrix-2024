"use client";
import { useEffect, useState } from "react";

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

const RulesModal = ({
  isOpen,
  onClose,
  rules,
}: {
  isOpen: boolean;
  onClose: () => void;
  rules: string;
}) => {
  return (
    <>
      {isOpen && (
        <div className="fixed  inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[50]">
          <div className="bg-gray-100 p-4 rounded-lg h-[80%] w-[90%] flex flex-col items-start md:w-[60%] ">
            <div className="w-full flex flex-row mb-2 items-center justify-between">
              <h2 className="text-lg font-semibold">Rules of the event</h2>

              <h2
                onClick={onClose}
                className="bg-black md:py-2 md:px-3 px-2 py-1 hover:bg-white hover:text-black border-2 border-black  text-white text-sm font-semibold rounded-full cursor-pointer"
              >
                X
              </h2>
            </div>

            <div
              className="h-full overflow-y-scroll my-1 py-2 px-1 w-full "
              dangerouslySetInnerHTML={{ __html: rules }}
            ></div>
            <button
              className="border-2 mt-3 border-black px-5 py-1 rounded-full font-semibold bg-black text-white hover:bg-white hover:text-black"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default EventPreviewCard;
