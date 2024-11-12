"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Settings, Monitor } from "lucide-react";
import { useTheme } from "next-themes";

const SettingsMenu = () => {
  const { setTheme } = useTheme();

  return (
    <div className="absolute top-4 right-4">
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
