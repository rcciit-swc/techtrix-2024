"use client";
import React, { useEffect, useState } from "react";
import { IoIosLogOut } from "react-icons/io";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { navRoutes } from "@/utils/constants/navRoutes";
import { login } from "@/utils/functions";
import { supabase, useUser } from "@/lib";
import { checkUserDetails } from "@/utils/functions/checkUserDetails";
import { checkIfUserRegistered } from "@/utils/functions/checkIfUserRegistered";

const Navbar = () => {
  const searchParams = useSearchParams();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const [userImg, setUserImg] = useState("");
  const user = useUser((state) => state.user);
  const setUser = useUser((state) => state.setUser);
  const router = useRouter();
  const pathname = usePathname();
  const [role, setRole] = useState("");
  const [showAdminDashboard, setShowAdminDashboard] = useState(false);
  const [showConvenorDashboard, setShowConvenorDashboard] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [showCoordinatorDashboard, setShowCoordinatorDashboard] =
    useState(false);
  const handleLogout = async () => {
    setShowAdminDashboard(false);
    setShowCoordinatorDashboard(false);
    setShowDashboard(false);
    await supabase.auth.signOut();
    router.refresh();

    setUser(undefined);
  };
  useEffect(() => {
    const search = searchParams.get("ref");
    if (
      typeof window !== "undefined" &&
      window.localStorage &&
      search !== null
    ) {
      localStorage.setItem("ref", search!);
    }
  }, []);
  useEffect(() => {
    const readUserSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data) {
        setShowDashboard(true);
        setUserImg(data?.session?.user.user_metadata?.avatar_url);
      }

      const { data: roleData } = await supabase
        .from("roles")
        .select()
        .match({ id: data?.session?.user?.id });

      let isSuperAdmin = false;
      let isCoordinator = false;
      let isConvenor = false;

      if (roleData) {
        for (const obj of roleData!) {
          if (obj.role === "super_admin") {
            isSuperAdmin = true;
          }
          if (obj.role === "event_coordinator") {
            isCoordinator = true;
          }
          if (obj.role === "convenor") {
            isConvenor = true;
          }
        }

        if (isSuperAdmin) {
          setShowAdminDashboard(true);
          setShowConvenorDashboard(true);
          setShowCoordinatorDashboard(false);
        } else {
          if (isConvenor) {
            setShowConvenorDashboard(true);
            setShowCoordinatorDashboard(false);
            return;
          } else {
            if (isCoordinator) {
              setShowConvenorDashboard(false);
              setShowCoordinatorDashboard(true);
            } else if (!isSuperAdmin && !isCoordinator && !isConvenor) {
              setShowCoordinatorDashboard(false);
              setShowConvenorDashboard(false);
            }
          }
        }

        setShowDashboard(true);
        setShowAdminDashboard(isSuperAdmin);
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

  const handleLogin = async () => {
    await login();

    // Show the dashboard and refresh the router
    setShowDashboard(true);
    router.refresh();
  };

  useEffect(() => {
    const sendReferral = async () => {
      if (typeof window !== "undefined" && window.localStorage) {
        const referral = localStorage.getItem("ref");
        await supabase
          .from("users")
          .update({
            referral_code: referral!,
          })
          .eq("id", user?.id!);
      }
    };
    sendReferral();
  }, [user]);

  return (
    <>
      <div className="sticky left-0 top-0 z-[40] w-screen lg:w-full overflow-x-hidden ">
        <div
          className={`${
            scrolling || isMenuOpen ? "bg-indigo-50" : "bg-white"
          } flex flex-row items-center justify-between gap-20 overflow-hidden py-1 pl-2 pr-4 max-md:border-b md:mb-14 md:flex lg:px-10
          `}
        >
          <div className="flex cursor-pointer items-center font-[Poppins] text-2xl font-bold text-gray-800">
            <span className="mr-1 pt-2 text-3xl text-indigo-600">
              <Link href={"/"}>
                <img src="/rcc 1.png" className="w-12 md:w-14 lg:w-20" alt="" />
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
              className={`fixed top-16  z-[90] w-full border-black rounded-b-xl  max-md:border-b-2  bg-gray-50 pb-6 pl-4 transition-all duration-500 ease-in md:static md:z-auto md:flex md:w-auto md:items-center md:bg-transparent md:pb-0 md:pl-0  ${
                isMenuOpen ? "block right-0" : " right-[-790px]"
              }`}
            >
              {navRoutes.map((link, index) => (
                <Link
                  href={link.path}
                  onClick={() => {
                    setIsMenuOpen(false);
                  }}
                  key={index}
                >
                  <li
                    className={`my-2 pt-2  font-semibold rounded-xl duration-200 ease-linear text-sm md:text-xs lg:text-sm  text-black hover:bg-black py-1 px-2 hover:text-white md:my-0 md:ml-2 md:hover:scale-105  lg:ml-8 xl:text-[14px] ${
                      pathname === link.path && "text-white bg-black"
                    }`}
                  >
                    {link.name}
                  </li>
                </Link>
              ))}
              {user && showDashboard && (
                <Link href={"/dashboard"}>
                  <li
                    className={`my-2 pt-2  font-semibold rounded-xl duration-200 ease-linear text-sm md:text-xs lg:text-sm  text-black hover:bg-black py-1 px-2 hover:text-white md:my-0 md:ml-2 md:hover:scale-105  lg:ml-8 xl:text-[14px] ${
                      pathname === "/dashboard" && "text-white bg-black"
                    }`}
                  >
                    Dashboard
                  </li>
                </Link>
              )}
              {user && showCoordinatorDashboard && (
                <Link href={"/coordinator"}>
                  <li
                    className={`my-2 pt-2  font-semibold rounded-xl duration-200 ease-linear text-sm md:text-xs lg:text-sm  text-black hover:bg-black py-1 px-2 hover:text-white md:my-0 md:ml-2 md:hover:scale-105  lg:ml-8 xl:text-[14px] ${
                      pathname === "/coordinator" && "text-white bg-black"
                    }`}
                  >
                    Coordinator
                  </li>
                </Link>
              )}

              {user && showConvenorDashboard && (
                <Link href={"/coordinator"}>
                  <li
                    className={`my-2 pt-2  font-semibold rounded-xl duration-200 ease-linear text-sm md:text-xs lg:text-sm  text-black hover:bg-black py-1 px-2 hover:text-white md:my-0 md:ml-2 md:hover:scale-105  lg:ml-8 xl:text-[14px] ${
                      pathname === "/coordinator" && "text-white bg-black"
                    }`}
                  >
                    Convenor
                  </li>
                </Link>
              )}

              {user && showAdminDashboard && (
                <Link
                  href={"/admin-dashboard"}
                  onClick={() => {
                    setIsMenuOpen(false);
                  }}
                >
                  <li
                    className={`my-2 pt-2  font-semibold rounded-xl duration-200 ease-linear text-sm md:text-xs lg:text-sm  text-black hover:bg-black py-1 px-2 hover:text-white md:my-0 md:ml-2 md:hover:scale-105  lg:ml-8 xl:text-[14px] ${
                      pathname === "/admin-dashboard" && "text-white bg-black"
                    }`}
                  >
                    Admin
                  </li>
                </Link>
              )}
              <div className="flex flex-row items-center gap-5  md:ml-10 ">
                {user && (
                  <Link href={"/registration"}>
                    <Image
                      src={userImg}
                      alt="user"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  </Link>
                )}
                <button
                  onClick={() => {
                    {
                      user ? handleLogout() : handleLogin();
                    }
                  }}
                  className="border-2 border-gray-500 rounded-full hover:bg-black duration-300 text-sm md:text-xs lg:text-sm xl:text-sm hover:text-white font-bold text-black px-5 lg:px-10 py-2"
                >
                  {user ? (
                    <>
                      <IoIosLogOut
                        size={24}
                        className="inline-block lg:hidden"
                      />
                      <h1 className="lg:block hidden">Logout</h1>
                    </>
                  ) : (
                    "Login"
                  )}
                </button>
                {/* {!user && (
                  <button
                    onClick={login}
                    className="border-2 border-gray-500 rounded-full hover:invert duration-300 bg-black font-bold text-white px-10 py-2"
                  >
                    Sign Up
                  </button>
                )} */}
              </div>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
