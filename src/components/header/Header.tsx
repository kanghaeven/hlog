"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import useScrollDirection from "@/hooks/useScrollDirection";
import ThemeSwitch from "@/components/theme/ThemeSwitch";
import Hlogo from "@/components/header/Hlogo";
import SearchBar from "@/components/header/SearchBar";
import CategoryMenuButton1 from "@/components/header/CategoryMenuButton1";
import CategoryMenu from "@/components/header/CategoryMenu";
import ScrollProgressBar from "@/components/header/ScrollProgressBar";

const Header = ({ categories }: { categories: string[] }) => {
  const pathname = usePathname();
  const isVisible = useScrollDirection();
  const [isSearchExpanded, setIsSearchExpanded] = useState<boolean>(false);

  // 현재 페이지가 게시글 상세 페이지인지 확인
  const isPostContent = categories.some(
    (category) =>
      pathname.startsWith(`/${category}/`) && pathname.split("/").length > 2
  );

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 bg-background transition-transform duration-300 ${
        isVisible ? "transform-none" : "-translate-y-[95%]"
      }`}
    >
      <div className="h-14 md:h-20 flex items-center justify-between border-b-[0.1rem] px-2 md:px-4">
        {/* 왼쪽 영역: 로고 및 카테고리 */}
        <div className={"flex items-center"}>
          <Hlogo />
          <div className="hidden sm:block">
            <CategoryMenuButton1 categories={categories} />
          </div>
          <div className={`sm:hidden ${isSearchExpanded ? "hidden" : ""}`}>
            <CategoryMenuButton1 categories={categories} />
          </div>
        </div>

        {/* 오른쪽 영역: 검색바, 테마 스위치, 메뉴 */}
        <div className="flex items-center justify-center">
          {!isPostContent && (
            <SearchBar
              isExpanded={isSearchExpanded}
              setIsExpanded={setIsSearchExpanded}
            />
          )}
          <div className={`${isSearchExpanded ? "hidden md:block" : ""}`}>
            <ThemeSwitch />
          </div>
          <div className={`${isSearchExpanded ? "hidden md:block" : ""}`}>
            <CategoryMenu categories={categories} />
          </div>
        </div>
      </div>
      <ScrollProgressBar />
    </header>
  );
};

export default Header;
