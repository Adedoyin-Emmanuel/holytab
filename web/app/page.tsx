"use client";
import React, { useEffect, useState } from "react";
import localFont from "next/font/local";
import { cn } from "@/lib/utils";

import { Axios } from "@/config/axios";
import { Confession } from "@/interfaces";
import SettingsMenu from "@/app/components/settings";
import Search from "@/app/components/search";
import SocialIcons from "@/app/components/social-icons";

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

      <Search />

      <br />
      <br />
      <br />
      <br />

      <section className="w-full flex items-center flex-col">
       

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
      <SocialIcons />
    </div>
  );
}
