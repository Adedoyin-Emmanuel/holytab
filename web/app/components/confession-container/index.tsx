"use client";

import { useEffect, useState } from "react";

import { Axios } from "@/config/axios";
import Confession from "@/app/components/confession";
import { useSettings } from "@/app/hooks/useSettings";
import SocialIcons from "@/app/components/social-icons";
import SettingsModal from "@/app/components/settings-modal";
import ConfessionBadge from "@/app/components/confession-badge";

interface ConfessionContainerProps {
  initialConfession: string | null;
}

const ConfessionContainer = ({
  initialConfession,
}: ConfessionContainerProps) => {
  const [confessionText, setConfessionText] = useState<string | null>(
    initialConfession
  );
  const [isLoading, setIsLoading] = useState(initialConfession === null);
  const [refreshTimer, setRefreshTimer] = useState<NodeJS.Timeout | null>(null);
  const { settings, updateSettings } = useSettings();

  const fetchNewConfession = async () => {
    try {
      console.log("Fetching new confession...");
      setIsLoading(true);

      const response = await Axios.post("/api/confessions", {
        take: 1,
        mode: "random",
      });

      console.log("API Response:", response);

      if (
        response.status === 200 &&
        response.data.success &&
        response.data.data.confessions &&
        response.data.data.confessions.length > 0
      ) {
        const newConfession = response.data.data.confessions[0];
        console.log("Setting new confession:", newConfession);
        setConfessionText(newConfession);
      } else {
        console.error("Invalid API response format:", response.data);
      }
    } catch (error) {
      console.error("Error fetching confession:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Only fetch new confession if we don't have an initial one
    if (initialConfession === null) {
      fetchNewConfession();
    }
  }, [initialConfession]);

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
  }, [settings.autoRefresh, settings.refreshInterval]);

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
        {isLoading ? (
          <div className="text-center text-lg font-medium animate-pulse">
            Loading confession...
          </div>
        ) : (
          <Confession text={confessionText || ""} />
        )}
      </section>

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

      <p className="uppercase text-sm">Share on your socials below</p>
      <SocialIcons confessionText={confessionText || ""} />
    </div>
  );
};

export default ConfessionContainer;
