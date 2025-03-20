"use client";
import { useState } from "react";
import Hlogo from "@/components/header/Hlogo";
import ThemeSwitch from "@/components/theme/ThemeSwitch";
import Category from "@/components/header/Category";
import SearchBar from "@/components/header/SearchBar";
import ScrollProgressBar from "@/components/header/ScrollProgressBar";
import MobileMenu from "@/components/header/MobileMenu";
import useScrollDirection from "@/hooks/useScrollDirection";
import { usePathname } from "next/navigation";

const Header = ({ categories }: { categories: string[] }) => {
  const isVisible = useScrollDirection(); // 수정된 부분
  const [isSearchExpanded, setIsSearchExpanded] = useState(false); // 상태 추가
  const pathname = usePathname(); // 현재 경로 가져오기

  // 카테고리 이름이 포함되어 있고, 그 뒤에 슬러그가 있는지 확인
  const isPostPage = categories.some((category) => {
    const categoryPattern = `/${category}/`; // /카테고리이름/ 형식으로 확인
    return pathname.includes(categoryPattern) && pathname.split("/").length > 2; // 게시글 슬러그가 있는지 확인
  });

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
          {!isPostPage && ( // 게시글 페이지에서만 검색바 숨김
            <SearchBar
              isExpanded={isSearchExpanded}
              setIsExpanded={setIsSearchExpanded}
            />
          )}
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
