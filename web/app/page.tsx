export default function Home() {
  return (
    <div className="w-screen h-screen flex items-center justify-center flex-col">
      <h1 className="md:text-4xl text-2xl p-5 md:w-9/12 text-center font-semibold leading-[3rem] md:leading-loose">
        Angels are constantly deployed to enforce every aspect of my salvation
        including health, finances and protection.
      </h1>

      <br />
      <button className="px-6 py-3 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300">
        New Confession
      </button>
    </div>
  );
}
