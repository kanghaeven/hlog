"use client";
import { useState, useEffect } from "react";
import Hlogo from "@/components/header/Hlogo";
import ThemeSwitch from "@/components/theme/ThemeSwitch";
import Category from "@/components/header/Category";
import ViewType from "@/components/header/ViewType";
import SearchBar from "@/components/header/SearchBar";
import ScrollProgressBar from "../ScrollProgressBar";

const Header = ({ categories }: { categories: string[] }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        // 스크롤 내리면 헤더를 화면 밖으로 올림
        setIsVisible(false);
      } else {
        // 스크롤 올리면 헤더가 보이도록 함
        setIsVisible(true);
      }
      setLastScrollY(window.scrollY); // 마지막 스크롤 위치 업데이트
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 bg-background transition-transform duration-300 ${
          isVisible ? "transform-none" : "-translate-y-[95%]"
        }`}
      >
        <div className="h-20 flex items-center justify-between border-b-[0.1rem]">
          <div className="flex items-center">
            <Hlogo />
            <Category categories={categories} />
          </div>
          <div className="flex items-center justify-center mx-4">
            <SearchBar />
            <ViewType />
            <ThemeSwitch />
          </div>
        </div>
        <div className="z-50 w-full">
          <ScrollProgressBar />
        </div>
      </header>
    </>
  );
};

export default Header;
