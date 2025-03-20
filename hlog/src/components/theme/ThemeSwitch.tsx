"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dot, Monitor, Moon, Sun } from "lucide-react";
import { ThemeItemProps } from "@/types/types";

const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 컴포넌트가 마운트되기 전에는 렌더링을 하지 않도록 처리
  if (!mounted) return null;

  const ThemeItem = ({ theme: themeValue, Icon, label }: ThemeItemProps) => (
    <DropdownMenuItem
      className="cursor-pointer"
      onClick={() => setTheme(themeValue)}
    >
      <div className="flex items-center gap-2">
        <Icon /> {label}
      </div>
      {theme === themeValue && <Dot />}
    </DropdownMenuItem>
  );

  const currentIcon = (() => {
    if (theme === "light") return <Sun />;
    if (theme === "dark") return <Moon />;
    return <Monitor />;
  })();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 w-10 h-10 rounded-full hover:bg-washed hover:text-faded md:h-14 md:w-14">
          {currentIcon}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <ThemeItem theme="light" label="Light" Icon={Sun} />
        <ThemeItem theme="dark" label="Dark" Icon={Moon} />
        <ThemeItem theme="system" label="System" Icon={Monitor} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeSwitch;
