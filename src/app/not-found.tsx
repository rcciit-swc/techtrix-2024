"use client";
import { useRouter } from "next/navigation";

const NotFound = () => {
  const router = useRouter();
  return (
    <div className="text-center text-xl gap-2 md:text-3xl font-semibold items-center flex flex-col justify-center w-full mx-auto h-[60vh]">
      <h1>Coming Soon !</h1>
      <h1>Techtrix 2024 is Loading !</h1>
      <button
        onClick={() => router.push("/")}
        className="mt-10 border-2 border-gray-500 rounded-full hover:invert duration-300 bg-black font-bold text-md md:text-xl px-5 py-1 text-white md:px-10 md:py-2"
      >
        Go Home
      </button>
    </div>
  );
};
export default NotFound;
