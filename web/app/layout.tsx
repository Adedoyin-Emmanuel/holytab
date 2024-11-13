import type { Metadata } from "next";
import { Bai_Jamjuree } from "next/font/google";
import "./globals.css";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { cn } from "@/lib/utils";
import { GoogleAnalytics } from "@next/third-parties/google";

const bai_jamjuree = Bai_Jamjuree({ subsets: ["latin"], weight: "400" });

export const metadata = {
  title: "Holy Tab",
  description:
    "Get fresh, Bible-centered confessions on every new tab. Stay inspired and rooted in faith throughout your day.",
  keywords:
    "Bible, faith, confessions, daily inspiration, Holy Tab, scripture, new tab motivation",
  author: "Emmysoft X Frames 56",
  openGraph: {
    title: "Holy Tab - Bible-Centered Confessions",
    description:
      "Stay inspired and rooted in faith with Bible-centered confessions on every new tab.",
    type: "website",
    url: "https://holytab.adedoyin.dev",
    images: [
      {
        url: "https://holytab.adedoyin.dev/holy.png",
        width: 1080,
        height: 1080,
        alt: "Holy Tab - Bible-Centered Confessions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@frames_arc",
    creator: "@Emmysoft_Tm",
    title: "Holy Tab - Bible-Centered Confessions",
    description:
      "Fresh, Bible-centered confession on every new tab. Stay inspired and rooted in faith throughout your day.",
    image: "https://holytab.adedoyin.dev/holy.png",
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <GoogleAnalytics gaId="G-JDCVFVGCF0" />
      <head />
      <body className={cn(bai_jamjuree.className, "dark:dark-bg bg-[#EBEBEB]")}>
        <NextThemesProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </NextThemesProvider>
      </body>
    </html>
  );
}
