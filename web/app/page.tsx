import localFont from "next/font/local";
import { cn } from "@/lib/utils";

const timesNewRoman = localFont({
  src: "./../public/fonts/timesNewRoman.ttf",
});

export default function Home() {
  return (
    <div className="w-screen h-screen flex items-center justify-center flex-col">
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
        I am in harvest and I am unstoppable. I am ending the year with uncommon
        testimonies.
      </h1>

      <br />

      <br/>

      <section className="social-icons">

      </section>
    </div>
  );
}
