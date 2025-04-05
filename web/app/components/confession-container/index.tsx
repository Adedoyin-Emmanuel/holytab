"use client";

import { useEffect, useState } from "react";
import SettingsModal from "@/app/components/settings-modal";
import SocialIcons from "@/app/components/social-icons";
import ConfessionBadge from "@/app/components/confession-badge";
import Confession from "@/app/components/confession";
import { Axios } from "@/config/axios";
import { useSettings } from "@/app/hooks/useSettings";

const ConfessionContainer = () => {
  const [confessionText, setConfessionText] = useState(
    "I am the LORD, the God of all mankind. Is anything too hard for me?"
  );
  const [refreshTimer, setRefreshTimer] = useState<NodeJS.Timeout | null>(null);
  const { settings, updateSettings } = useSettings();

  const fetchNewConfession = async () => {
    try {
      const response = await Axios.post("/confession", {
        take: 1,
        randomize: true,
      });

      if (response.status === 200) {
        setConfessionText(response.data.data.confessions[0]);
      }
    } catch (error) {
      console.error("Error fetching confession:", error);
    }
  };

  useEffect(() => {
    fetchNewConfession();
  }, []);

  useEffect(() => {
    if (refreshTimer) {
      clearInterval(refreshTimer);
    }

    if (settings.autoRefresh) {
      const timer = setInterval(
        fetchNewConfession,
        settings.refreshInterval * 1000
      ) as unknown as NodeJS.Timeout;
      setRefreshTimer(timer);
    }

    return () => {
      if (refreshTimer) {
        clearInterval(refreshTimer);
      }
    };
  }, [refreshTimer, settings.autoRefresh, settings.refreshInterval]);

  return (
    <div className="h-screen flex items-center justify-center gap-5 flex-col relative">
      <SettingsModal
        autoRefresh={settings.autoRefresh}
        refreshInterval={settings.refreshInterval}
        onAutoRefreshChange={(enabled) =>
          updateSettings({ autoRefresh: enabled })
        }
        onRefreshIntervalChange={(value) =>
          updateSettings({ refreshInterval: value })
        }
      />

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
  );
};

export default ConfessionContainer;
