import "../app/globals.css";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="w-[100%] mx-auto relative  flex flex-row  justify-start max-lg:mt-[50px]">
      {/* <div className="flex  flex-row items-center -rotate-90  left-0 absolute bottom-0">
            <Image src={"/Line 1.svg"} alt="" width={0} height={0} className="" />
            <h1 className="text-lg  left-0">RCC INSTITUTE OF INFORMATION TECHNOLOGY</h1>
        </div> */}
      <div className="w-[80%] md:w-[75%] mx-auto relative">
        <img
          src={"/Rectangle 1.png"}
          className="w-full"
          alt=""
          width={0}
          height={0}
        />

        <img
          src="/pc-render 1.png"
          className="absolute top-10 md:top-20 right-[-10%] w-[40%] "
          alt=""
          width={0}
          height={0}
        />
        <img
          src="/keyboard 1.png"
          className="absolute top-10 md:top-20 left-[0%] w-[25%] "
          alt=""
          width={0}
          height={0}
        />
        <div className="flex flex-col items-center justify-center gap-10 absolute w-full mx-auto top-1/3">
          <h1 className="text-2xl md:text-4xl lg:text-8xl font-bold ">
            TechTrix
            <br /> 2024
          </h1>
          <img
            src="/Untitled-1 1.png"
            className="w-[40%] "
            alt=""
            width={0}
            height={0}
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
