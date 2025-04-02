import { useEffect, useState } from "react";
import ConfessionBadge from "@/components/confession-badge";
import Confession from "@/components/confession";
import SettingsModal from "@/components/settings-modal";
import SocialIcons from "@/components/social-icons";
import { useSettings } from "@/hooks/useSettings";
import { useConfessionDB } from "@/hooks/useConfessionDB";
import { useTheme } from "next-themes";
import "./App.css";

const App = () => {
  const [confessionText, setConfessionText] = useState(
    "I am the LORD, the God of all mankind. Is anything too hard for me?"
  );
  const [refreshTimer, setRefreshTimer] = useState<NodeJS.Timer | null>(null);
  const { settings } = useSettings();
  const { confessions } = useConfessionDB();
  const { theme } = useTheme();

  const getRandomConfession = () => {
    if (confessions.length === 0) return confessionText;
    const randomIndex = Math.floor(Math.random() * confessions.length);
    return confessions[randomIndex].text;
  };

  const updateConfessionText = () => {
    setConfessionText(getRandomConfession());
  };

  // Initial confession on mount
  useEffect(() => {
    if (confessions.length > 0) {
      updateConfessionText();
    }
  }, [confessions]);

  // Auto refresh timer
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

  // Theme handling
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
    <div className="w-screen h-screen flex items-center justify-center gap-5 flex-col relative">
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
