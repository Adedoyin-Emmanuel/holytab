"use client";
import React, { useEffect, useState } from "react";
import localFont from "next/font/local";
import { cn } from "@/lib/utils";


import { Axios } from "@/config/axios";
import { Confession } from "@/interfaces";
import SettingsMenu from "@/app/components/settings";

const timesNewRoman = localFont({
  src: "./../public/fonts/timesNewRoman.ttf",
});

export default function Home() {


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
     
    </div>
  );
}
