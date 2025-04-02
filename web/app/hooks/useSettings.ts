"use client";

import { useState, useEffect } from "react";

interface Settings {
  autoRefresh: boolean;
  refreshInterval: number;
}

const defaultSettings: Settings = {
  autoRefresh: true,
  refreshInterval: 60,
};

export const useSettings = () => {
  const [settings, setSettings] = useState<Settings>(defaultSettings);

  useEffect(() => {
    const savedSettings = localStorage.getItem("holytab-settings");
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings);
        setSettings({
          autoRefresh:
            parsedSettings.autoRefresh ?? defaultSettings.autoRefresh,
          refreshInterval:
            parsedSettings.refreshInterval ?? defaultSettings.refreshInterval,
        });
      } catch (error) {
        console.error("Error parsing settings:", error);
        setSettings(defaultSettings);
      }
    }
  }, []);

  const updateSettings = (newSettings: Partial<Settings>) => {
    const updatedSettings = { ...settings, ...newSettings };
    setSettings(updatedSettings);
    localStorage.setItem("holytab-settings", JSON.stringify(updatedSettings));
  };

  return {
    settings,
    updateSettings,
  };
};
