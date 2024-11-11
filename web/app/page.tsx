"use client";

import { Axios } from "@/config/axios";
import SettingsMenu from "@/app/components/settings";
import Search from "@/app/components/search";
import SocialIcons from "@/app/components/social-icons";
import ConfessionBadge from "@/app/components/confession-badge";
import Confession from "@/app/components/confession";

export default function Home() {
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
        <Confession />
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
