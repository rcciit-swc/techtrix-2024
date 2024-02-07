"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { navRoutes } from "@/utils/constants/navRoutes";
import  {login}  from "@/utils/functions";
import { supabase, useUser } from "@/lib";


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const [userImg, setUserImg] = useState("");
  const user = useUser((state) => state.user);
  const setUser = useUser((state) => state.setUser);
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(undefined);
    router.push("/");
  };
  useEffect(() => {
    const readUserSession = async () => {
      const { data } = await supabase.auth.getSession();
      console.log(data);
      if (data) {
        setUserImg(data?.session?.user.user_metadata?.avatar_url);
      }
    };
    const handleScroll = () => {
      setScrolling(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    readUserSession();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [user]);

  return (
    <>
      <div className=" left-0 top-0 z-[40] w-screen lg:w-full overflow-x-hidden">
        <div
          className={`${
            scrolling || isMenuOpen ? "bg-body" : "bg-transparent"
          } flex flex-row items-center justify-between gap-20 overflow-hidden py-2 pl-2 pr-4 max-md:border-b md:mb-20 md:flex lg:px-10
          `}
        >
          <div className="flex cursor-pointer items-center font-[Poppins] text-2xl font-bold text-gray-800">
            <span className="mr-1 pt-2 text-3xl text-indigo-600">
              <Link href={"/"}>
                <img src="/rcc 1.png" className="w-16 md:w-24" alt="" />
              </Link>
            </span>
          </div>
          <div className="flex flex-row-reverse items-center justify-between gap-4 md:flex-row">
            <div
              className="flex h-full w-8 cursor-pointer flex-col items-center justify-center gap-[6px]
             md:hidden
            "
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span
                className={`block h-[2px] w-7 bg-black transition-all duration-500
              ${isMenuOpen ? "translate-y-2 rotate-45" : ""}
              `}
              ></span>
              <span
                className={`block h-[2px] w-7 bg-black transition-all duration-500
              ${isMenuOpen ? "translate-x-44 " : "translate-x-0"}
              `}
              ></span>
              <span
                className={`block h-[2px] w-7 bg-black transition-all duration-500
              ${isMenuOpen ? "-translate-y-2 -rotate-45" : ""}
              `}
              ></span>
            </div>

            <ul
              className={`fixed top-20  z-[90] w-full border-black rounded-b-xl  max-md:border-b-2  bg-gray-50 pb-12 pl-4 transition-all duration-500 ease-in md:static md:z-auto md:flex md:w-auto md:items-center md:bg-transparent md:pb-0 md:pl-0  ${
                isMenuOpen ? "block right-0" : " right-[-790px]"
              }`}
            >
              {navRoutes.map((link, index) => (
                <Link
                  href={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  key={index}
                >
                  <li
                    className={`my-4 pt-2 font-semibold duration-200 ease-linear text-xl  text-black hover:bg-black py-1 px-1 hover:text-white md:my-0 md:ml-4 md:hover:scale-105  lg:ml-8 xl:text-xl ${
                      pathname === link.path && "text-white bg-black"
                    }`}
                  >
                    {link.name}
                  </li>
                </Link>
              ))}
              <div className="flex flex-row items-center gap-5  md:ml-10 ">
                {user && (
                  <Image
                    src={userImg}
                    alt="user"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                )}
                <button
                  onClick={() => {
                    {
                      user ? handleLogout() : login();
                    }
                  }}
                  className="border-2 border-gray-500 rounded-full hover:bg-black duration-300 hover:text-white font-bold text-black px-10 py-2"
                >
                  {user ? "Logout" : "Login"}
                </button>
                {!user && (
                  <button className="border-2 border-gray-500 rounded-full hover:invert duration-300 bg-black font-bold text-white px-10 py-2">
                    Sign Up
                  </button>
                )}
              </div>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
