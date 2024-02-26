import React from "react";
const EventCard = ({ event, index }: { event: any; index: number }) => {
  const conicGradientStyle = {
    background: event.conic,
  };
  const linearGradientStyle = {
    background: event.linear,
  };

  const title = event.title.split(" ");

  return (
    <div
      className={`
        w-[300px] h-[300px] lg:w-[400px] lg:h-[400px] xl:w-[450px] xl:h-[450px]
       flex flex-col relative  rounded-2xl cursor-pointer `}
    >
      <div
        className={`absolute inset-0 rounded-2xl`}
        style={linearGradientStyle}
      ></div>
      <div
        className={`absolute inset-0 mix-gradient rounded-2xl`}
        style={conicGradientStyle}
      ></div>

      {/* <img src={event.image} alt="" className="z-[10]" /> */}
      <div className="absolute w-full  bottom-[5%] px-5">
        <div
          className={` flex flex-col px-5 gap-2 items-start pb-5 text-white  font-bold 
             text-2xl lg:text-4xl
          } `}
        >
          {title.map((word: any, index: number) => (
            <span key={index}>{word}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventCard;
