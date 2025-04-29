import { Metadata, ResolvingMetadata } from "next";
import AnnouncementBanner from "@/app/components/announcement-banner";
import ConfessionContainer from "@/app/components/confession-container";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";
export const revalidate = 10;

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

// Function to get a random confession from the data file
async function getRandomConfession() {
  try {
    const dataPath = path.join(process.cwd(), "app/data/data.json");
    const fileContent = fs.readFileSync(dataPath, "utf-8");
    const data = JSON.parse(fileContent);
    const confessions = data.affirmations || [];

    if (confessions.length === 0) {
      return null;
    }

    // Get a random confession
    const randomIndex = Math.floor(Math.random() * confessions.length);
    return confessions[randomIndex];
  } catch (error) {
    console.error("Error loading confession:", error);
    return null;
  }
}

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
  } else {
    const randomConfession = await getRandomConfession();
    if (randomConfession) {
      confession = randomConfession;
    }
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

export default async function Home() {
  const initialConfession = await getRandomConfession();

  return (
    <>
      <AnnouncementBanner />
      <ConfessionContainer initialConfession={initialConfession} />
    </>
  );
}
