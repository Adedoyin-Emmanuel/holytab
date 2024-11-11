import type { Metadata } from "next";
import { Bai_Jamjuree } from "next/font/google";
import "./globals.css";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { cn } from "@/lib/utils";

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
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={cn(bai_jamjuree.className, "dark:dark-bg")}>
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
