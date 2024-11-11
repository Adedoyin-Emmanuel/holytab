"use client";
import React, { useEffect, useState } from "react";
import localFont from "next/font/local";
import { cn } from "@/lib/utils";
import { IoLogoWhatsapp, IoLogoTwitter } from "react-icons/io";
import { SiTelegram, SiReddit } from "react-icons/si";
import { FaFacebook } from "react-icons/fa";

import { Axios } from "@/config/axios";
import { Confession } from "@/interfaces";
import SettingsMenu from "@/app/components/settings";

const timesNewRoman = localFont({
  src: "./../public/fonts/timesNewRoman.ttf",
});

export default function Home() {
  const socialIcons = [
    { id: "whatsapp", icon: <IoLogoWhatsapp /> },
    { id: "facebook", icon: <FaFacebook /> },
    { id: "twitter", icon: <IoLogoTwitter /> },
    { id: "telegram", icon: <SiTelegram /> },
    { id: "reddit", icon: <SiReddit /> },
  ];

  const [confessionData, setConfessionData] = useState<Confession>();


  useEffect(() => {
    const fetchData = async () => {
      const response = await Axios.post("/confession", {
        take: 1,
      });

      if (response.status !== 200) {
      } else {
        setConfessionData(response.data.data);
      }
    };
  });

  return (
    <div className="w-screen h-screen flex items-center justify-center gap-5 flex-col">
      <SettingsMenu />
   
      <br />
      <br />
      <br />
      <br />

      <section className="w-full flex items-center flex-col">
        <section className="flex items-center gap-[6px] bg-[#F28C8C33] dark:bg-[#F5B7001A] rounded-[10px] pt-2 pr-3 pb-2 pl-3">
          <section className="bg-[#FA7272] dark:bg-[#F5B700] h-[14px] w-[14px] rounded-full "></section>
          <p className="text-sm ">CONFESSION OF THE DAY</p>
        </section>

        <h1
          className={cn(
            timesNewRoman.className,
            "font-normal md:text-[3.25rem] text-2xl leading-[3.74rem] tracking-[-0.02em] p-5 md:w-8/12 text-center md:leading-relaxed"
          )}
        >
          I am the LORD, the God of all mankind. Is anything too hard for me?
        </h1>
      </section>

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

      <p className="uppercase text-sm">Share on your socials below</p>
      <section className="flex items-center justify-center gap-10 flex-wrap">
        {socialIcons.map(({ id, icon }) => (
          <section
            key={id}
            className="md:w-16 md:h-16 w-10 h-10 border-[1px] border-black bg-[#D9D9D9] dark:border-[#F5B700] dark:bg-black rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform ease-in-out duration-150"
          >
            {React.cloneElement(icon, {
              className: "md:w-5 md:h-5 w-4 h-4 dark:text-[#F5B700]",
            })}
          </section>
        ))}
      </section>
    </div>
  );
}
