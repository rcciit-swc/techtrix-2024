import { supabase } from "@/lib";
import { Heading } from ".";
import Image from "next/image";
import Link from "next/link";

const sessions = [
  {
    image: "/assets/sessions/event2.png",
    link: "https://forms.gle/MUf2B88346g42RY6A",
    time: "03/01/2024, 11:00:00",
  },
  {
    image: "/assets/sessions/event1.png",
    link: "https://lu.ma/risein-solidity",
    time: "03/11/2024, 11:00:00",
  },
];
const SessionCard = ({ session }: { session: any }) => {
  return (
    <div className="card relative cursor-pointer  rounded-xl">
      <Image
        src={session.image}
        alt="football"
        className="rounded-xl"
        width={500}
        height={120}
      />
      <div className="card-body rounded-xl absolute bottom-[-100%] hidden  hover:flex h-full w-full flex-col items-center justify-center bg-[#1f3d4738] px-3 backdrop-blur-[5px] duration-500">
        <Link
          href={session.link}
          target="_blank"
          className="text-white border border-white text-xl font-semibold rounded-xl px-5 py-2 hover:bg-white hover:text-black"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

const Sessions = () => {
  let isOver = false;
  sessions.forEach((session) => {
    const expiryTime = new Date(session.time).getTime();
    if (expiryTime > Date.now()) {
      isOver = true;
    } else {
      isOver = false;
    }
  });

  return (
    <div className="flex flex-col items-center gap-10 mx-auto justify-center w-[80%]">
      {isOver && <Heading text="Sessions" />}
      <div className="flex flex-row items-center flex-wrap gap-20 justify-center">
        {sessions.map((session, index) => {
          const expiryTime = new Date(session.time).getTime();

          return (
            <div key={index}>
              {expiryTime > Date.now() && <SessionCard session={session} />}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sessions;
