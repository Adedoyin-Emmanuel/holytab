import SettingsMenu from "@/app/components/settings";
import Search from "@/app/components/search";
import SocialIcons from "@/app/components/social-icons";
import ConfessionBadge from "@/app/components/confession-badge";
import Confession from "@/app/components/confession";
import { Axios } from "@/config/axios";
import { Metadata, ResolvingMetadata } from "next";
import AnnouncementBanner from "@/app/components/announcement-banner";

export const dynamic = "force-dynamic";
export const revalidate = 10;

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  let confession =
    "Get fresh, Bible-centered confessions on every new tab. Stay inspired and rooted in faith throughout your day.";

  if (searchParams.confession) {
    const rawConfession = Array.isArray(searchParams.confession)
      ? searchParams.confession[0]
      : searchParams.confession;
    confession = decodeURIComponent(decodeURIComponent(rawConfession));
  }

  return {
    title: "Holy Tab - Daily Confessions",
    description: confession,
    openGraph: {
      title: "Holy Tab - Daily Confessions",
      description: confession,
      images: [
        {
          url: "https://holytab.adedoyin.dev/holy.png",
          width: 1080,
          height: 1080,
          alt: "Daily Confession",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Holy Tab - Daily Confessions",
      description: confession,
      images: ["https://holytab.adedoyin.dev/holy.png"],
    },
  };
}

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
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

  if (searchParams.confession) {
    const encodedConfession = Array.isArray(searchParams.confession)
      ? searchParams.confession[0]
      : searchParams.confession;
    confessionText = decodeURIComponent(decodeURIComponent(encodedConfession));
  }

  return (
    <>
      <AnnouncementBanner />
      <div className="h-screen flex items-center justify-center gap-5 flex-col">
        <SettingsMenu />

        {/* <Search /> */}

        <br />
        <br />
        <br />
        <br />

        <section className="w-full flex items-center flex-col overflow-x-hidden">
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
    </>
  );
}
