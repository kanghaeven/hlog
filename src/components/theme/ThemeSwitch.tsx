"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { ThemeItemProps } from "@/types/ui";
import { Dot, SunMoon, Moon, Sun } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/common/DropdownMenu";

const ThemeSwitch = () => {
  // next-themes의 useTheme 훅을 사용하여 현재 테마와 setTheme 함수를 가져옴
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 컴포넌트가 마운트되기 전에는 렌더링을 하지 않도록 처리
  if (!mounted) return null;

  // ThemeItem 컴포넌트: 각 테마 항목을 표시하는 UI 구성 요소
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

  // 현재 테마에 맞는 아이콘을 반환하는 함수
  const currentIcon = (() => {
    if (theme === "light") return <Sun />;
    if (theme === "dark") return <Moon />;
    return <SunMoon />;
  })();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 w-10 h-10 rounded-full hover:bg-washed hover:text-faded md:h-14 md:w-14">
          {currentIcon}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <ThemeItem theme="light" label="Light" Icon={Sun} />
        <ThemeItem theme="dark" label="Dark" Icon={Moon} />
        <ThemeItem theme="system" label="System" Icon={SunMoon} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeSwitch;
