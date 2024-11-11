"use client";
import React, { useEffect, useState } from "react";

import { Axios } from "@/config/axios";
import { Confession } from "@/interfaces";
import SettingsMenu from "@/app/components/settings";
import Search from "@/app/components/search";
import SocialIcons from "@/app/components/social-icons";
import ConfessionBadge from "@/app/components/confession-badge";


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
        <ConfessionBadge />
      
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
