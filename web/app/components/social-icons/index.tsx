"use client";
import React from "react";
import { IoLogoWhatsapp, IoLogoTwitter } from "react-icons/io";
import { SiTelegram, SiReddit } from "react-icons/si";
import { FaFacebook } from "react-icons/fa";

interface SocialIconsProps {
  confessionText: string;
}

interface SocialIcon {
  id: SocialPlatform;
  icon: React.ReactElement;
  label: string;
}

type SocialPlatform =
  | "whatsapp"
  | "facebook"
  | "twitter"
  | "telegram"
  | "reddit";

const SocialIcons: React.FC<SocialIconsProps> = ({ confessionText }) => {
  const baseUrl = "https://holytab.adedoyin.dev";
  const encodedConfessionForUrl = encodeURIComponent(
    encodeURIComponent(confessionText)
  );
  const shareUrl = `${baseUrl}?confession=${encodedConfessionForUrl}`;

  const getSharingUrl = (platform: SocialPlatform): string => {
    const text = encodeURIComponent(`${confessionText}`);

    const urls: Record<SocialPlatform, string> = {
      whatsapp: `https://api.whatsapp.com/send?text=${text}%0A${shareUrl}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
      twitter: `https://twitter.com/intent/tweet?text=${text}&url=${shareUrl}`,
      telegram: `https://t.me/share/url?url=${shareUrl}&text=${text}`,
      reddit: `https://reddit.com/submit?url=${shareUrl}&title=${text}`,
    };

    return urls[platform];
  };

  const handleShare = (platform: SocialPlatform): void => {
    const url = getSharingUrl(platform);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const socialIcons: SocialIcon[] = [
    { id: "whatsapp", icon: <IoLogoWhatsapp />, label: "Share on WhatsApp" },
    { id: "facebook", icon: <FaFacebook />, label: "Share on Facebook" },
    { id: "twitter", icon: <IoLogoTwitter />, label: "Share on Twitter" },
    { id: "telegram", icon: <SiTelegram />, label: "Share on Telegram" },
    { id: "reddit", icon: <SiReddit />, label: "Share on Reddit" },
  ];

  return (
    <section className="flex items-center justify-center gap-10 flex-wrap">
      {socialIcons.map(({ id, icon, label }) => (
        <section
          key={id}
          onClick={() => handleShare(id)}
          className="md:w-16 md:h-16 w-10 h-10 border-[1px] border-black bg-[#D9D9D9] dark:border-[#F5B700] dark:bg-black rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform ease-in-out duration-150"
          role="button"
          aria-label={label}
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
