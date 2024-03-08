import Image from "next/image";
import Heading from "./Heading";
import Link from "next/link";

const SponsorButton = ({
  title,
  background,
  textColor,
  icon,
  onClick,
  href,
}: {
  title: string;
  background: string;
  textColor: string;
  icon: string;
  onClick: () => void;
  href?: string | null | undefined | any;
}) => {
  return (
    <Link
      target="_blank"
      href={href}
      className={`flex flex-row items-center justify-between w-[50%]  hover:invert  bg-${background} border-2  lg:px-2 cursor-pointer rounded-full  duration-500 hover:scale-[101%]`}
    >
      <h1
        className={`text-${textColor} text-[8px] md:text-[10px] lg:text-xl font-semibold pl-2  cursor-pointer`}
      >
        {title}
      </h1>
      <Image
        src={icon}
        width={0}
        height={0}
        className="w-6 lg:w-10 xl:w-14 cursor-pointer hover:scale-110 duration-500"
        alt="arrow"
      />
    </Link>
  );
};
const Sponsor = () => {
  return (
    <>
      <div className=" flex flex-col  items-center w-[95%] md:w-[80%] lg:w-[70%] 2xl:w-[60%] mx-auto justify-center mt-10 mb-5">
        {/* <Heading text="Sponsors" /> */}
        <div className="mt-14 md:mt-24   relative">
          <Image
            src="/assets/sponsors/bg-frame.svg"
            width={0}
            height={0}
            className="w-[100%] md:w-[100%] bg-transparent  items-center cursor-pointer  "
            alt="frame"
          />
          <Image
            src="/assets/sponsors/gadget.svg"
            width={0}
            height={0}
            className="w-[40%] -top-16 -right-2 md:-top-20 lg:-top-24 xl:-top-40 2xl:-top-48 md:-right-10 lg:-right-14   items-center absolute cursor-pointer duration-500 hover:scale-105"
            alt="frame"
          />
          <div className="flex flex-col  absolute top-[22%]    min-[1700px]:top-[30%] left-[10%] w-[60%]">
            <h1 className="text-black text-md md:text-md lg:text-3xl xl:text-5xl font-bold ">
              interested in sponsoring this premier event?
            </h1>
            <div className="flex flex-col items-start gap-[3px] xl:mt-2 ">
              <SponsorButton
                href="https://drive.google.com/file/d/1HOmJnMt-zE72mbEHBw76h-UIjw_H4um2/view?usp=sharing"
                title="Brochure"
                background="white"
                textColor="black"
                icon="/assets/sponsors/arrow-up.svg"
                onClick={() => {}}
              />
              <SponsorButton
                href={""}
                title="Hit Us Up"
                background="black"
                textColor="white"
                icon="/assets/sponsors/arrow-right.svg"
                onClick={() => {}}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sponsor;
