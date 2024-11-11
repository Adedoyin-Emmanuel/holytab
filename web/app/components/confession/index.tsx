import localFont from "next/font/local";
import { cn } from "@/lib/utils";
import { Axios } from "@/config/axios";

const timesNewRoman = localFont({
  src: "./../../../public/fonts/timesNewRoman.ttf",
});

const Confession = async () => {
  const response = await Axios.post("/confession", {
    take: 1,
  });

  if (response.status === 200) {
    return (
      <h1
        className={cn(
          timesNewRoman.className,
          "font-normal md:text-[3.25rem] text-2xl leading-[3.74rem] tracking-[-0.02em] p-5 md:w-8/12 text-center md:leading-relaxed"
        )}
      >
        {response.data.data.confessions[0]}
      </h1>
    );
  } else {
    return (
      <h1
        className={cn(
          timesNewRoman.className,
          "font-normal md:text-[3.25rem] text-2xl leading-[3.74rem] tracking-[-0.02em] p-5 md:w-8/12 text-center md:leading-relaxed"
        )}
      >
        I am the LORD, the God of all mankind. Is anything too hard for me?
      </h1>
    );
  }
};

export default Confession;
