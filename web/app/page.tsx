import { Metadata, ResolvingMetadata } from "next";
import AnnouncementBanner from "@/app/components/announcement-banner";
import ConfessionContainer from "@/app/components/confession-container";

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

export default function Home() {
  return (
    <>
      <AnnouncementBanner />
      <ConfessionContainer />
    </>
  );
}
