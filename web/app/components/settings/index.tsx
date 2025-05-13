"use client";
import { useTheme } from "next-themes";
import { Settings, Monitor } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";

const SettingsMenu = () => {
  const { setTheme } = useTheme();

  return (
    <div className="fixed md:top-14 top-28 right-6 z-10">
      <DropdownMenu>
        <DropdownMenuTrigger className="p-2 rounded-full transition-colors hover:bg-gray-100 dark:hover:bg-[#F5B700] dark:hover:text-white">
          <Settings className="w-6 h-6" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            className="flex items-center gap-2"
            onClick={() => setTheme("light")}
          >
            <div className="w-4 h-4 rounded-full bg-[#fafafa] border border-gray-200" />
            <span>Light Mode</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex items-center gap-2"
            onClick={() => setTheme("dark")}
          >
            <div className="w-4 h-4 rounded-full bg-black border border-gray-600" />
            <span>Dark Mode</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex items-center gap-2"
            onClick={() => setTheme("system")}
          >
            <Monitor className="w-4 h-4" />
            <span>System</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default SettingsMenu;
