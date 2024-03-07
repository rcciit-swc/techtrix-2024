import Image from "next/image";
import Link from "next/link";
import React from "react";
import { GrInstagram } from "react-icons/gr";
import { ImFacebook2 } from "react-icons/im";
import { FaGoogle } from "react-icons/fa";

const Footer = () => {
  return (
    <div className=" flex flex-col items-center mt-10">
      <div className=" bg-indigo-50 py-10 text-black w-full flex flex-row flex-wrap items-center gap-10 justify-around">
        <Image src="/rcc 1.png" width={82} height={82} alt="logo" />

        <div className="flex flex-col items-center gap-5">
          <h1 className="font-semibold text-lg">Follow us</h1>
          <div className="flex flex-row items-center gap-10">
            <Link
              href={
                "https://www.instagram.com/techtrix_official?igsh=MWx5OWE4bXQweGJlZw%3D%3D"
              }
              target="_blank"
            >
              <GrInstagram
                size={24}
                className="hover:text-pink-500 cursor-pointer"
              />
            </Link>
            <Link
              href={"https://www.facebook.com/techtrix.rcciit?mibextid=ZbWKwL"}
              target="_blank"
            >
              <ImFacebook2
                size={24}
                className="hover:text-blue-500 cursor-pointer"
              />
            </Link>
            <Link href={"https://www.rcciit.org/"} target="_blank">
              <FaGoogle
                size={24}
                className="hover:text-red-600 cursor-pointer"
              />
            </Link>
          </div>
        </div>

        <div className="flex flex-col items-center gap-3">
          <h1 className="font-semibold text-lg">Quick Links</h1>
          <div className="flex flex-row flex-wrap justify-center px-2 items-center gap-10 font-semibold">
            <Link href="/">
              <h1 className="text-sm md:text-xs lg:text-sm xl:text-sm">
                Sponsorship Brochure
              </h1>
            </Link>
            <Link href="/contacts">
              <h1 className="text-sm md:text-xs lg:text-sm xl:text-sm">
                Contacts
              </h1>
            </Link>
            <Link href="/events">
              <h1 className="text-sm md:text-xs lg:text-sm xl:text-sm">
                Events
              </h1>
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-black flex flex-row gap-2 font-semibold justify-around flex-wrap py-2 text-xs md:text-sm text-white w-full text-center">
        <div>
          © 2024 &nbsp;
          <a href="#" className="neon">
            Techtrix™
          </a>
          . All Rights Reserved.
        </div>
        <p>
          Made with <span className="text-red-600">&hearts;</span> by Techtrix
          tech team
        </p>
      </div>
    </div>
  );
};

export default Footer;
