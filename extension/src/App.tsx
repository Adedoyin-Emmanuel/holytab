import { useEffect, useState } from "react";
import ConfessionBadge from "@/components/confession-badge";
import Confession from "@/components/confession";
import SettingsMenu from "@/components/settings";
import SocialIcons from "@/components/social-icons";
import Search from "@/components/search";
import "./App.css";

const App = () => {
  const [confessionText, setConfessionText] = useState(
    "I am the LORD, the God of all mankind. Is anything too hard for me?"
  );

  useEffect(() => {
    // Fetch the local JSON file
    fetch("/data/data.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data.json");
        }
        return response.json();
      })
      .then((data) => {
        // Randomly select a confession from the affirmations array
        const affirmations = data.affirmations;
        const randomConfession =
          affirmations[Math.floor(Math.random() * affirmations.length)];
        setConfessionText(randomConfession);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

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
        <Confession text={confessionText} />
      </section>

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

      <p className="uppercase text-sm">Share on your socials below</p>
      <SocialIcons confessionText={confessionText} />
    </div>
  );
};

export default App;
