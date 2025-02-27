"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dot, LucideIcon, Monitor, Moon, Sun } from "lucide-react";
import React from "react";

interface DropdownItemProps {
  t: string;
  label: string;
  Icon: LucideIcon;
}

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const Item = ({ t, Icon, label }: DropdownItemProps) => (
    <DropdownMenuItem className="cursor-pointer" onClick={() => setTheme(t)}>
      <div className="flex items-center gap-2">
        <Icon /> {label}
      </div>
      {theme === t && <Dot />}
    </DropdownMenuItem>
  );

  // Determine the current theme icon
  const currentIcon =
    theme === "light" ? <Sun /> : theme === "dark" ? <Moon /> : <Monitor />;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 w-10 h-10 rounded-full hover:bg-washed hover:text-faded sm:h-14 sm:w-14">
          {currentIcon}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <Item t="light" label="Light" Icon={Sun} />
        <Item t="dark" label="Dark" Icon={Moon} />
        <Item t="system" label="System" Icon={Monitor} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeSwitch;
