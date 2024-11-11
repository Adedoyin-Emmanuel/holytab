import SettingsMenu from "@/app/components/settings";
import Search from "@/app/components/search";
import SocialIcons from "@/app/components/social-icons";
import ConfessionBadge from "@/app/components/confession-badge";
import Confession from "@/app/components/confession";
import { Axios } from "@/config/axios";

export default async function Home() {
  let confessionText =
    "I am the LORD, the God of all mankind. Is anything too hard for me?";

  try {
    const response = await Axios.post("/confession", {
      take: 1,
    });

    if (response.status === 200) {
      confessionText = response.data.data.confessions[0];
    }
  } catch (error) {
    console.error("Error fetching confession:", error);
  }

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
      <SocialIcons />
    </div>
  );
}
