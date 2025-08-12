import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import "./App.css";
import Confession from "@/components/confession";
import { useSettings } from "@/hooks/settings";
import SocialIcons from "@/components/social-icons";
import SettingsModal from "@/components/settings-modal";
import { useConfessionDB } from "@/hooks/confessions-db";
import ConfessionBadge from "@/components/confession-badge";
import AnnouncementBanner from "@/components/announcement-banner";

const App = () => {
  const [confessionText, setConfessionText] = useState("");
  const [refreshTimer, setRefreshTimer] = useState<ReturnType<
    typeof setInterval
  > | null>(null);
  const { settings } = useSettings();
  const { confessions, shouldShowBanner } = useConfessionDB();
  const { theme } = useTheme();

  const getRandomConfession = () => {
    if (confessions.length === 0) return confessionText;
    const randomIndex = Math.floor(Math.random() * confessions.length);
    return confessions[randomIndex].text;
  };

  const updateConfessionText = () => {
    setConfessionText(getRandomConfession());
  };

  useEffect(() => {
    if (confessions.length > 0 && !confessionText) {
      updateConfessionText();
    }
  }, [confessions, confessionText]);

  useEffect(() => {
    if (refreshTimer) {
      clearInterval(refreshTimer);
    }

    if (settings.autoRefresh && confessions.length > 0) {
      const timer = setInterval(
        updateConfessionText,
        settings.refreshInterval * 1000
      );
      setRefreshTimer(timer);
    }

    return () => {
      if (refreshTimer) {
        clearInterval(refreshTimer);
      }
    };
  }, [settings.autoRefresh, settings.refreshInterval, confessions]);

  useEffect(() => {
    const root = document.documentElement;
    if (
      theme === "dark" ||
      (theme === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  return (
    <div
      className={`w-screen h-screen flex items-center justify-center gap-5 flex-col relative ${
        shouldShowBanner ? "pt-16" : ""
      }`}
    >
      <AnnouncementBanner />
      <SettingsModal />

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
