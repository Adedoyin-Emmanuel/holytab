import type { Metadata } from "next";
import { Bai_Jamjuree } from "next/font/google";
import "./globals.css";

const bai_jamjuree = Bai_Jamjuree({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Holy Tab",
  description:
    "Fresh, Bible-centered confession on every new tab. Stay inspired and rooted in faith throughout your day",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={bai_jamjuree.className}>{children}</body>
    </html>
  );
}
