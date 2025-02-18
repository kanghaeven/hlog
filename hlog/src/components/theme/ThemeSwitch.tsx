"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
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
        <Button variant="ghost" size="icon">
          <div>{currentIcon}</div>
          <span className="sr-only">Toggle theme</span>
        </Button>
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
