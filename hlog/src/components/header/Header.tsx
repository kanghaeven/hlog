"use client";
import { useState, useEffect } from "react";
import Hlogo from "@/components/header/Hlogo";
import ThemeSwitch from "@/components/theme/ThemeSwitch";
import Category from "@/components/header/Category";
import SearchBar from "@/components/header/SearchBar";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import MobileMenu from "@/components/header/MobileMenu";

const Header = ({ categories }: { categories: string[] }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // 스크롤이 최상단이면 무조건 보이게 설정
      if (currentScrollY === 0) {
        setIsVisible(true);
      } else {
        setIsVisible(currentScrollY <= lastScrollY);
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 bg-background transition-transform duration-300 ${
        isVisible ? "transform-none" : "-translate-y-[95%]"
      }`}
    >
      <div className="h-14 sm:h-20 flex items-center justify-between border-b-[0.1rem] px-2 sm:px-4">
        <div className="flex items-center">
          <Hlogo />
          <div className="hidden sm:block">
            <Category categories={categories} />
          </div>
          <div className="sm:hidden">
            <Category categories={categories} />
          </div>
        </div>
        <div className="flex items-center justify-center">
          <SearchBar />
          <div>
            <ThemeSwitch />
          </div>
          <div className="sm:hidden">
            <MobileMenu categories={categories} />
          </div>
        </div>
      </div>
      <ScrollProgressBar />
    </header>
  );
};

export default Header;
