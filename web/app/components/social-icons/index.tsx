"use client";
import React from "react";
import { IoLogoWhatsapp, IoLogoTwitter } from "react-icons/io";
import { SiTelegram, SiReddit } from "react-icons/si";
import { FaFacebook } from "react-icons/fa";


const SocialIcons = () => {
  const socialIcons = [
    { id: "whatsapp", icon: <IoLogoWhatsapp /> },
    { id: "facebook", icon: <FaFacebook /> },
    { id: "twitter", icon: <IoLogoTwitter /> },
    { id: "telegram", icon: <SiTelegram /> },
    { id: "reddit", icon: <SiReddit /> },
  ];

  return (
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
  );
};

export default SocialIcons;
