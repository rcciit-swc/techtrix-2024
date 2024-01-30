import Image from "next/image";
import Heading from "./Heading";
const Sponsor = () => {
  return (
    <div className="w-[80%] mx-auto my-10 gap-6  flex-col flex justify-center items-center">
      <Heading text="Sponsors" />
      <div className="w-[80%] mx-auto my-10 gap-6  flex-col flex justify-center items-center ">
        <Image
          src="/assets/sponsors/frame.svg"
          width={0}
          height={0}
          className="w-[50%] bottom-[-90%]  items-center absolute cursor-pointer hover:border-yellow-400 duration-500 hover:scale-105"
          alt="frame"
        />
      </div>
      <div>
      <Image
          src="/assets/sponsors/gadget.svg"
          width={0}
          height={0}
          className="w-[15%] bottom-[-50%] right-[23%]  items-center absolute cursor-pointer"
          alt="frame"
        />
      </div>
    </div>
  );
};

export default Sponsor;
