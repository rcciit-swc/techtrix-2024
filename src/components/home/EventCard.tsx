import Image from "next/image";

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
      className={`${
        index == 0 ? "w-80 h-80 lg:w-full lg:h-full" : "w-80 h-80"
      } flex flex-col relative rounded-2xl cursor-pointer `}
    >
      <div
        className={`absolute inset-0 rounded-2xl`}
        style={linearGradientStyle}
      ></div>
      <div
        className={`absolute inset-0 mix-gradient rounded-2xl`}
        style={conicGradientStyle}
      ></div>

      {index != 0 && (
        <Image
          src={event.icon!}
          width={0}
          height={0}
          className="w-32 top-10 left-5 absolute"
          alt=""
        />
      )}

      <div className="absolute w-full  bottom-[5%] px-5">
        <div
          className={` flex flex-col px-5 gap-2 items-start pb-5   font-bold ${
            index == 0
              ? "text-2xl md:text-3xl text-white lg:text-5xl"
              : "text-2xl lg:text-3xl"
          } `}
        >
          {title.map((word: any, index: number) => (
            <span key={index}>{word}</span>
          ))}
        </div>
        {index == 0 && (
          <div className="flex flex-row items-center justify-between border-2 px-2 cursor-pointer rounded-full hover:border-yellow-400 duration-500 hover:scale-105">
            <h1 className="text-white text-xl font-semibold pl-2 hover:text-orange-300 cursor-pointer">
              explore
            </h1>
            <Image
              src={event.icon!}
              width={0}
              height={0}
              className="w-14 cursor-pointer hover:scale-110 duration-500"
              alt="arrow"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default EventCard;
