"use client";

import React from "react";
import { useTheme } from "next-themes";
import { Settings2, Monitor } from "lucide-react";

import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { bai_jamjuree } from "@/app/fonts";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

interface SettingsModalProps {
  autoRefresh: boolean;
  refreshInterval: number;
  onAutoRefreshChange: (enabled: boolean) => void;
  onRefreshIntervalChange: (value: number) => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  autoRefresh,
  refreshInterval,
  onAutoRefreshChange,
  onRefreshIntervalChange,
}) => {
  const { theme, setTheme } = useTheme();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="absolute top-5 right-5 p-2 rounded-lg hover:bg-[#F28C8C33] dark:hover:bg-[#F5B7001A] transition-colors">
          <Settings2 className="w-6 h-6" />
        </button>
      </DialogTrigger>
      <DialogContent className="bg-[#EBEBEB] dark:bg-[#1A1A1A] border-[#A6A6A6] dark:border-[#333333] p-8">
        <DialogHeader>
          <DialogTitle
            className={cn(
              bai_jamjuree.className,
              "text-2xl font-semibold mb-6"
            )}
          >
            Settings
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-8">
          <div className="space-y-4">
            <label
              className={cn(
                bai_jamjuree.className,
                "text-sm font-medium block"
              )}
            >
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
              <label
                className={cn(bai_jamjuree.className, "text-sm font-medium")}
              >
                Auto Refresh Confessions
              </label>
              <Switch
                checked={autoRefresh}
                onCheckedChange={onAutoRefreshChange}
                className="data-[state=checked]:bg-[#FA7272] dark:data-[state=checked]:bg-[#F5B700]"
              />
            </div>
            {autoRefresh && (
              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between">
                  <label
                    className={cn(
                      bai_jamjuree.className,
                      "text-sm font-medium"
                    )}
                  >
                    Refresh Interval
                  </label>
                  <span className={cn(bai_jamjuree.className, "text-sm")}>
                    {refreshInterval} seconds
                  </span>
                </div>
                <Slider
                  value={[refreshInterval]}
                  onValueChange={(value) => onRefreshIntervalChange(value[0])}
                  min={30}
                  max={3600}
                  step={30}
                  className="[&_[role=slider]]:bg-[#FA7272] dark:[&_[role=slider]]:bg-[#F5B700] [&_[role=slider]]:h-4 [&_[role=slider]]:w-4 [&_[data-orientation=horizontal]]:h-2"
                />
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsModal;
