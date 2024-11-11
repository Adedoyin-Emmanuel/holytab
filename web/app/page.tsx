import localFont from "next/font/local";
import { cn } from "@/lib/utils";
import { IoLogoWhatsapp, IoLogoTwitter } from "react-icons/io";
import { SiTelegram, SiReddit } from "react-icons/si";
import { FaFacebook } from "react-icons/fa";
import { Settings, Monitor } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const timesNewRoman = localFont({
  src: "./../public/fonts/timesNewRoman.ttf",
});

export default function Home() {
  return (
    <div className="w-screen h-screen flex items-center justify-center gap-5 flex-col">
      <div className="absolute top-4 right-4">
        <DropdownMenu>
          <DropdownMenuTrigger className="p-2 rounded-full transition-colors hover:bg-gray-100 dark:hover:bg-[#F5B700] dark:hover:text-white">
            <Settings className="w-6 h-6" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              className="flex items-center gap-2"
            >
              <div className="w-4 h-4 rounded-full bg-[#fafafa] border border-gray-200" />
              <span>
                Light Mode
              </span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex items-center gap-2"
            >
              <div className="w-4 h-4 rounded-full bg-black border border-gray-600" />
              <span>
                Dark Mode
              </span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex items-center gap-2"
            >
              <Monitor className="w-4 h-4" />
              <span>
                System
              </span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <input
        placeholder="SEARCH GOOGLE"
        className="mx-auto md:w-1/3 w-11/12 h-10 bg-transparent
          border-b border-[#A6A6A6] border-r-0 border-l-0 border-t-0
          outline-none focus:outline-none
          transition-all duration-300
          focus:border-b-2
          placeholder:text-gray-500 text-sm"
      />

      <br />
      <br />
      <br />
      <br />

      <section className="w-full flex items-center flex-col">
        <section className="flex items-center gap-[6px] bg-[#F28C8C33] rounded-[10px] pt-2 pr-3 pb-2 pl-3">
          <section className="bg-[#FA7272] h-[14px] w-[14px] rounded-full"></section>
          <p className="text-sm ">CONFESSION OF THE DAY</p>
        </section>

        <h1
          className={cn(
            timesNewRoman.className,
            "font-normal md:text-[3.25rem] text-2xl leading-[3.74rem] tracking-[-0.02em] p-5 md:w-8/12 text-center md:leading-relaxed"
          )}
        >
          I am in harvest and I am unstoppable. I am ending the year with
          uncommon testimonies.
        </h1>
      </section>

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

      <section className="flex items-center justify-center gap-10 flex-wrap">
        <section className="md:w-16 md:h-16 w-10 h-10 border-[1px] border-black bg-[#D9D9D9] rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform ease-in-out duration-150">
          <IoLogoWhatsapp className="md:w-5 md:h-5 w-4 h-4" color="#000" />
        </section>

        <section className="md:w-16 md:h-16 w-10 h-10 border-[1px] border-black bg-[#D9D9D9] rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform ease-in-out duration-150">
          <FaFacebook className="md:w-5 md:h-5 w-4 h-4" color="#000" />
        </section>

        <section className="md:w-16 md:h-16 w-10 h-10 border-[1px] border-black bg-[#D9D9D9] rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform ease-in-out duration-150">
          <IoLogoTwitter className="md:w-5 md:h-5 w-4 h-4" color="#000" />
        </section>

        <section className="md:w-16 md:h-16 w-10 h-10 border-[1px] border-black bg-[#D9D9D9] rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform ease-in-out duration-150">
          <SiTelegram className="md:w-5 md:h-5 w-4 h-4" color="#000" />
        </section>

        <section className="md:w-16 md:h-16 w-10 h-10 border-[1px] border-black bg-[#D9D9D9] rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform ease-in-out duration-150">
          <SiReddit className="md:w-5 md:h-5 w-4 h-4" color="#000" />
        </section>
      </section>
    </div>
  );
}
