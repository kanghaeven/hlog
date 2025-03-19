"use client";
import { useState } from "react";
import Hlogo from "@/components/header/Hlogo";
import ThemeSwitch from "@/components/theme/ThemeSwitch";
import Category from "@/components/header/Category";
import SearchBar from "@/components/header/SearchBar";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import MobileMenu from "@/components/header/MobileMenu";
import useScrollDirection from "@/hooks/useScrollDirection";

const Header = ({ categories }: { categories: string[] }) => {
  const isVisible = useScrollDirection(); // 수정된 부분
  const [isSearchExpanded, setIsSearchExpanded] = useState(false); // 상태 추가

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 bg-background transition-all duration-300 ${
        isVisible ? "transform-none" : "-translate-y-[95%]"
      }`}
    >
      <div className="h-14 md:h-20 flex items-center justify-between border-b-[0.1rem] px-2 md:px-4">
        <div className={"flex items-center"}>
          <Hlogo />
          <div className="hidden sm:block">
            <Category categories={categories} />
          </div>
          <div className={`sm:hidden ${isSearchExpanded ? "hidden" : ""}`}>
            <Category categories={categories} />
          </div>
        </div>
        <div className="flex items-center justify-center">
          <SearchBar
            isExpanded={isSearchExpanded}
            setIsExpanded={setIsSearchExpanded}
          />
          <div className={`${isSearchExpanded ? "hidden md:block" : ""}`}>
            <ThemeSwitch />
          </div>
          <div className={`md:hidden  ${isSearchExpanded ? "hidden" : ""}`}>
            <MobileMenu categories={categories} />
          </div>
        </div>
      </div>
      <ScrollProgressBar />
    </header>
  );
};

export default Header;
