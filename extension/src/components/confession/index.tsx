import { cn } from "@/lib/utils";

const Confession = ({ text }: { text: string }) => {
  return (
    <h1
      className={cn(
        "timesNewRoman",
        "font-normal md:text-[3.25rem] text-2xl leading-[3.5rem] tracking-[-0.02em] p-5 md:w-8/12 text-center md:leading-[4rem]"
      )}
    >
      {text}
    </h1>
  );
};

export default Confession;
