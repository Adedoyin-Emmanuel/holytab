import { useState } from "react";
import { useTheme } from "next-themes";
import { Settings2, Monitor, Check } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { useSettings } from "@/hooks/settings";
import { useConfessionDB } from "@/hooks/confessions-db";

const SettingsModal = () => {
  const { theme, setTheme } = useTheme();
  const { settings, updateSettings } = useSettings();
  const { updateConfessions, isLoading, shouldShowBanner } = useConfessionDB();
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [updateSuccess, setUpdateSuccess] = useState<{
    count: number;
    timestamp: number;
  } | null>(null);

  const handleUpdateConfessions = async () => {
    setIsUpdating(true);
    setUpdateError(null);
    setUpdateSuccess(null);

    const CONFESSION_UPDATE_URL =
      "http://localhost:3000/api/confessions/update";

    try {
      const response = await fetch(CONFESSION_UPDATE_URL, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch confessions: ${response.statusText}`);
      }

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message || "Failed to fetch confessions");
      }

      const confessions = data.data.confessions;
      if (!confessions || confessions.length === 0) {
        throw new Error("No confessions were fetched");
      }

      await updateConfessions(confessions);
      setUpdateSuccess({
        count: confessions.length,
        timestamp: Date.now(),
      });
    } catch (error) {
      console.error("Update error:", error);
      setUpdateError(
        error instanceof Error ? error.message : "Failed to update confessions"
      );
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className={`absolute top-5 right-5 p-2 rounded-lg hover:bg-[#F28C8C33] dark:hover:bg-[#F5B7001A] transition-colors ${
            shouldShowBanner ? "hidden" : ""
          }`}
        >
          <Settings2 className="w-6 h-6" />
        </button>
      </DialogTrigger>
      <DialogContent
        className="bg-[#EBEBEB] dark:bg-[#1A1A1A] border-[#A6A6A6] dark:border-[#333333] p-8"
        aria-describedby="settings-description"
      >
        <DialogHeader>
          <DialogTitle className="bai-jamjuree text-2xl font-semibold mb-6">
            Settings
          </DialogTitle>
          <p id="settings-description" className="sr-only">
            Configure your Holy Tab settings including theme, auto-refresh, and
            confession updates
          </p>
        </DialogHeader>
        <div className="space-y-8">
          <div className="space-y-4">
            <label className="bai-jamjuree text-sm font-medium block">
              Theme
            </label>
            <div className="flex gap-3">
              <Button
                variant={theme === "light" ? "default" : "outline"}
                onClick={() => setTheme("light")}
                className={`flex-1 ${
                  theme === "light"
                    ? "bg-[#FA7272] hover:bg-[#FA7272]/90 text-white"
                    : "hover:bg-[#F28C8C33]"
                }`}
              >
                Light
              </Button>
              <Button
                variant={theme === "dark" ? "default" : "outline"}
                onClick={() => setTheme("dark")}
                className={`flex-1 ${
                  theme === "dark"
                    ? "bg-[#F5B700] hover:bg-[#F5B700]/90 text-white dark:text-black"
                    : "dark:hover:bg-[#F5B7001A]"
                }`}
              >
                Dark
              </Button>
              <Button
                variant={theme === "system" ? "default" : "outline"}
                onClick={() => setTheme("system")}
                className={`flex-1 ${
                  theme === "system"
                    ? "bg-[#FA7272] dark:bg-[#F5B700] hover:bg-[#FA7272]/90 dark:hover:bg-[#F5B700]/90 text-white dark:text-black"
                    : "hover:bg-[#F28C8C33] dark:hover:bg-[#F5B7001A]"
                }`}
              >
                <Monitor className="h-4 w-4 mr-2" />
                System
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <label className="bai-jamjuree text-sm font-medium">
                Auto Refresh Confessions
              </label>
              <Switch
                id="auto-refresh"
                checked={settings.autoRefresh}
                onCheckedChange={(checked) =>
                  updateSettings({ autoRefresh: checked })
                }
                className="data-[state=checked]:bg-[#FA7272] dark:data-[state=checked]:bg-[#F5B700]"
              />
            </div>
            {settings.autoRefresh && (
              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between">
                  <label className="bai-jamjuree text-sm font-medium">
                    Refresh Interval
                  </label>
                  <span className="bai-jamjuree text-sm">
                    {settings.refreshInterval} seconds
                  </span>
                </div>
                <Slider
                  id="refresh-interval"
                  min={30}
                  max={3600}
                  step={30}
                  value={[settings.refreshInterval]}
                  onValueChange={(value) =>
                    updateSettings({ refreshInterval: value[0] })
                  }
                  className="[&_[role=slider]]:bg-[#FA7272] dark:[&_[role=slider]]:bg-[#F5B700] [&_[role=slider]]:h-4 [&_[role=slider]]:w-4 [&_[data-orientation=horizontal]]:h-2"
                />
              </div>
            )}
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="bai-jamjuree text-lg font-medium">Confessions</h3>
            <div className="flex flex-col gap-2">
              <Button
                onClick={handleUpdateConfessions}
                disabled={isLoading || isUpdating}
                className="w-full bg-[#FA7272] hover:bg-[#FA7272]/90 dark:bg-[#F5B700] dark:hover:bg-[#F5B700]/90 text-white dark:text-black"
              >
                {isUpdating ? "Updating..." : "Check for Updates"}
              </Button>
              {updateSuccess && (
                <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                  <Check className="w-4 h-4" />
                  <span>
                    Successfully updated {updateSuccess.count} confessions at{" "}
                    {new Date(updateSuccess.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              )}
              {updateError && (
                <p className="text-sm text-red-500">{updateError}</p>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsModal;
